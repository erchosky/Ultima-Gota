import { before,after,test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { makeClient,startLab } from '../support/lab.ts';
import { completeActOne,prepare,finish,evidence } from '../support/complete-act-one.ts';
const fixture=JSON.parse(await readFile('content/es/campaign/fixtures.json','utf8'));
const account=(name:string)=>fixture.accounts.find((a:any)=>a.name===name),demo=account('demo.pera');
let lab:Awaited<ReturnType<typeof startLab>>;
before(async()=>{lab=await startLab();});after(async()=>{await lab?.stop();});
async function toChapter(client:ReturnType<typeof makeClient>,target:number){
  await completeActOne(client,lab.store);
  for(let n=6;n<target;n++){
    const store=await prepare(client,lab.store,n);
    if(n===6){await store.request('/assets/verano-demo.js');await finish(client,n,{username:demo.name,password:demo.password,resource:lab.store+'/assets/verano-demo.js'});}
    if(n===7){await store.request('/api/login',{username:demo.name,password:demo.password});await store.request('/api/me');await finish(client,n,{userId:demo.id,name:demo.name});}
    if(n===8){await store.request('/api/me');await store.request('/api/login',{username:demo.name,password:demo.password});await store.request('/api/me');await finish(client,n,{cookieName:'ug_store',cookieHttpOnly:'yes',accessBefore:'denied',accessAfter:'allowed',name:demo.name});}
    if(n===9){await store.request('/api/login',{username:demo.name,password:demo.password});await store.request('/api/me');await store.request('/api/logout',{});await store.request('/api/me');await finish(client,n,{name:demo.name,accessBefore:'allowed',accessAfter:'denied'});}
  }
}
test('Capítulos bloqueados y contenidos futuros no entregan credenciales',async()=>{
  const c=makeClient(lab.classroom);await c.init();
  assert.equal((await c.request('/api/chapters/6')).status,403);assert.equal((await c.request('/api/chapters/11')).status,403);
  assert.equal((await c.request('/api/chapters/7/accounts',{})).status,403);
  const publicScript=await fetch(lab.store+'/assets/verano-demo.js');assert.equal((await publicScript.text()).includes(demo.password),false);
  const state=JSON.stringify((await c.request('/api/state')).data);assert.equal(state.includes(demo.password),false);
});
test('06 exige recurso real y credencial correcta; conserva evidencia sin contraseña',async()=>{
  const c=makeClient(lab.classroom);await toChapter(c,6);const store=await prepare(c,lab.store,6);
  const fields={username:demo.name,password:demo.password,resource:lab.store+'/assets/verano-demo.js'};
  assert.equal((await c.request('/api/chapters/6/evidence',evidence(fields))).status,400);
  const source=await store.request('/assets/verano-demo.js');assert.match(source.headers.get('content-type')!,/javascript/);assert.ok(source.data.includes(demo.password));
  assert.equal((await c.request('/api/chapters/6/evidence',evidence({...fields,password:'DEMO-incorrecta'}))).status,400);
  await finish(c,6,fields);
  const state=(await c.request('/api/state')).data;assert.equal(state.active,7);assert.equal(JSON.stringify(state).includes(demo.password),false);assert.ok(state.campaign.patches.includes('credential-resource'));
  const exported=JSON.stringify((await c.request('/api/export')).data);assert.equal(exported.includes(demo.password),false);
  const requested=await c.request('/api/chapters/7/accounts',{});assert.equal(requested.data.accounts[0].password,demo.password);
  assert.ok((await c.request('/api/state')).data.campaign.entries[6].patchReport.checks.length>=2);
});
test('07 requiere sesión y perfil del servidor; revocación se comprueba en copia separada',async()=>{
  const c=makeClient(lab.classroom);await toChapter(c,7);const store=await prepare(c,lab.store,7);
  assert.equal((await c.request('/api/chapters/7/evidence',evidence({name:demo.name,userId:demo.id}))).status,400);
  assert.equal((await store.request('/api/login',{username:demo.name,password:'DEMO-incorrecta'})).status,401);
  const logged=await store.request('/api/login',{username:demo.name,password:demo.password});assert.equal(logged.status,200);assert.ok(logged.headers.get('set-cookie')?.includes('HttpOnly'));
  const profile=(await store.request('/api/me')).data;assert.deepEqual(profile,{name:demo.name,userId:demo.id});assert.equal('password' in profile,false);
  assert.equal((await c.request('/api/chapters/7/evidence',evidence({name:profile.name,userId:profile.userId}))).status,200);
  const [comparison,note]=await Promise.all([c.request('/api/chapters/7/correction',{}),c.request('/api/notes',{chapter:7,kind:'observed',expected:'Conservar también la nota durante la comparación.',observed:'Trabajo de revisión y nota concurrentes.'})]);
  assert.equal(comparison.status,200);assert.equal(note.status,200);assert.equal((await c.request('/api/state')).data.campaign.notes.length,1);
  await finish(c,7,{name:profile.name,userId:profile.userId});
  assert.equal((await store.request('/api/me')).status,200);assert.ok((await c.request('/api/state')).data.campaign.patches.includes('demo-account-revoked'));
});
test('08 cookie de cuenta aparece al entrar y no se confunde con la copia',async()=>{
  const c=makeClient(lab.classroom);await toChapter(c,8);const store=await prepare(c,lab.store,8);
  assert.ok(store.cookie.includes('ug_lab='));assert.equal(store.cookie.includes('ug_store='),false);
  assert.equal((await store.request('/api/me')).status,401);
  await store.request('/api/login',{username:demo.name,password:demo.password});await store.request('/api/me');assert.ok(store.cookie.includes('ug_store='));
  const fields={cookieName:'ug_store',cookieHttpOnly:'yes',accessBefore:'denied',accessAfter:'allowed',name:demo.name};
  assert.equal((await c.request('/api/chapters/8/evidence',evidence({...fields,cookieName:'ug_lab'}))).status,400);
  await finish(c,8,fields);
});
test('Cancelar una comparación no permite que sobrescriba una nota posterior',async()=>{
  const c=makeClient(lab.classroom);await toChapter(c,7);const store=await prepare(c,lab.store,7);
  await store.request('/api/login',{username:demo.name,password:demo.password});await store.request('/api/me');
  assert.equal((await c.request('/api/chapters/7/evidence',evidence({name:demo.name,userId:demo.id}))).status,200);
  const abort=new AbortController();
  const request=fetch(lab.classroom+'/api/chapters/7/correction',{method:'POST',headers:{Cookie:c.cookie,Origin:lab.classroom,'Content-Type':'application/json','X-UG-CSRF':c.csrf},body:'{}',signal:abort.signal}).catch(error=>{assert.equal(error.name,'AbortError');});
  await new Promise(r=>setTimeout(r,80));abort.abort();await request;
  const note=await c.request('/api/notes',{chapter:7,kind:'limitation',expected:'La nota debe conservarse después del trabajo cancelado.',observed:'La conexión del navegador se cerró durante una comparación.'});assert.equal(note.status,200);
  const state=(await c.request('/api/state')).data;assert.equal(state.campaign.entries[7].patch,true);assert.equal(state.campaign.notes.length,1);
});
test('09 revoca sesión real: cookie antigua no recupera acceso y nuevo acceso legítimo funciona',async()=>{
  const c=makeClient(lab.classroom);await toChapter(c,9);const store=await prepare(c,lab.store,9);
  await store.request('/api/login',{username:demo.name,password:demo.password});await store.request('/api/me');const old=store.cookie;
  await store.request('/api/logout',{});assert.equal(store.cookie.includes('ug_store='),false);assert.equal((await store.request('/api/me')).status,401);
  assert.equal((await store.request('/api/me',undefined,{Cookie:old})).status,401);
  await finish(c,9,{name:demo.name,accessBefore:'allowed',accessAfter:'denied'});
  await store.request('/api/login',{username:demo.name,password:demo.password});assert.equal((await store.request('/api/me')).status,200);assert.notEqual(store.cookie,old);
});
test('10 verifica Alba203→204, control Bruno y corrección sin cambiar propietarios',async()=>{
  const c=makeClient(lab.classroom);await toChapter(c,10);const store=await prepare(c,lab.store,10);
  const fields={actorName:'Alba',ownOrderId:203,foreignOrderId:204,ownerName:'Bruno',controlName:'Bruno',resource:lab.store+'/api/orders?id=204'};
  const bruno=account('Bruno'),alba=account('Alba');
  await store.request('/api/login',{username:bruno.name,password:bruno.password});await store.request('/api/me');await store.request('/api/orders?id=204');
  assert.equal((await c.request('/api/chapters/10/evidence',evidence(fields))).status,400);
  await store.request('/api/logout',{});await store.request('/api/login',{username:alba.name,password:alba.password});await store.request('/api/me');
  assert.equal((await store.request('/api/orders?id=203')).data.ownerId,'user-alba');
  const foreign=await store.request('/api/orders?id=204');assert.equal(foreign.status,200);assert.equal(foreign.data.ownerId,'user-bruno');assert.equal(foreign.data.viewerName,'Alba');
  await finish(c,10,fields);const state=(await c.request('/api/state')).data;assert.equal(state.active,11);assert.equal(state.campaign.entries[10].evidence.identity,'Alba / Bruno (control)');
  assert.equal(state.campaign.patches.includes('order-ownership'),false);assert.equal((await store.request('/api/orders?id=204')).data.ownerId,'user-bruno');
  const oldRunCookie=store.cookie;await prepare(c,lab.store,10);assert.equal((await store.request('/api/me',undefined,{Cookie:oldRunCookie})).status,403);
});
test('Se recuperan checkpoint06 y exportación1 sin revelar secretos en el progreso',async()=>{
  const c=makeClient(lab.classroom);await completeActOne(c,lab.store);const old=(await c.request('/api/export')).data;old.contentVersion=1;
  const imported=await c.request('/api/campaigns/import',old);assert.equal(imported.status,200);assert.equal((await c.request('/api/campaigns/restore',{id:imported.data.archiveId})).status,200);assert.equal((await c.request('/api/state')).data.active,6);
  const store=await prepare(c,lab.store,6);await store.request('/assets/verano-demo.js');await finish(c,6,{username:demo.name,password:demo.password,resource:lab.store+'/assets/verano-demo.js'});
  const export2=(await c.request('/api/export')).data;assert.equal(export2.contentVersion,4);
  await c.request('/api/campaigns/reset',{confirm:'RESTABLECER'});const generation=(await c.request('/api/state')).data.campaign.generation;
  const copy=await c.request('/api/campaigns/import',export2);assert.equal(copy.status,200);assert.equal((await c.request('/api/state')).data.campaign.generation,generation);
  await c.request('/api/campaigns/restore',{id:copy.data.archiveId});await lab.restart();
  assert.equal((await c.request('/api/state')).data.active,7);assert.equal((await c.request('/api/chapters/7/accounts',{})).data.accounts[0].password,demo.password);
  assert.equal(JSON.stringify((await c.request('/api/state')).data).includes(demo.password),false);
});
