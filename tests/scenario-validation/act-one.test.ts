import { before,after,test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { startLab,makeClient } from '../support/lab.ts';
let lab:Awaited<ReturnType<typeof startLab>>;
before(async()=>{lab=await startLab();});after(async()=>{await lab?.stop();});
const payload=(fields:Record<string,unknown>)=>({expected:'Espero contrastar una respuesta real con su presentación.',observed:'He observado la respuesta concreta de esta ejecución.',fields});
async function prepare(classroom:ReturnType<typeof makeClient>,n:number){const result=await classroom.request(`/api/chapters/${n}/start`,{prediction:'Creo que la respuesta y la pantalla pueden compararse.'});assert.equal(result.status,200);const store=makeClient(lab.store);const path=result.data.launchUrl.replace(lab.store,'');assert.equal((await store.request(path)).status,302);return store;}
async function understand(client:ReturnType<typeof makeClient>,n:number){const answer=['a','b','c'][(n+1)%3];const r=await client.request(`/api/chapters/${n}/understanding`,{answer});assert.equal(r.status,200,JSON.stringify(r.data));}

test('Alumno recibe solo contenido desbloqueado y ninguna solución privada',async()=>{
  const client=makeClient(lab.classroom);assert.equal((await client.init()).status,200);
  const chapter=(await client.request('/api/chapters/1')).data;
  assert.equal(chapter.title,'La ficha equivocada');assert.equal(chapter.entry.hints.length,0);
  for(const key of ['solution','understandingAnswer','successValidator','falsePositiveChecks','hintIds'])assert.equal(Object.hasOwn(chapter,key),false,key);
  assert.equal((await client.request('/api/chapters/2')).status,403);
  assert.equal((await client.request('/api/chapters/6')).status,403);
  assert.equal((await client.request('/api/chapters/1/hints/4')).status,403);
  assert.equal((await client.request('/api/professor/chapters/1')).status,403);
  for(const path of ['/content/es/instructor/chapter-01.json','/docs/ESPECIFICACION-ORIGINAL.md','/scenarios/chapter-01/plan.json'])assert.equal((await client.request(path)).status,404);
  const hint=await client.request('/api/chapters/1/hints',{level:1});assert.equal(hint.status,200);assert.equal(hint.data.level,1);
});
test('Origin, CSRF y canal de control rechazan escrituras ajenas',async()=>{
  const client=makeClient(lab.classroom);await client.init();
  assert.equal((await client.request('/api/profile',{alias:'Otro'},{Origin:lab.store})).status,403);
  assert.equal((await client.request('/api/profile',{alias:'Otro'},{'X-UG-CSRF':'incorrecto'})).status,403);
  assert.equal((await fetch(lab.control+'/health')).status,403);
  assert.equal((await fetch(lab.store+'/api/export')).status,404);
});
test('Identificador, nombre y peticiones reales; un botón y una pantalla editada no bastan',async()=>{
  const client=makeClient(lab.classroom);await client.init();
  assert.equal((await client.request('/api/chapters/1/evidence',payload({productId:2,name:'Pera del huerto'}))).status,409);
  const store=await prepare(client,1);
  assert.equal((await client.request('/api/chapters/1/evidence',payload({productId:2,name:'Pera del huerto'}))).status,400);
  await store.request('/api/products?id=1');await store.request('/api/products?id=2');
  assert.equal((await store.request('/api/products?id=999')).status,404);
  assert.equal((await client.request('/api/chapters/1/evidence',payload({productId:2,name:'Pera editada'}))).status,400);
  const good=await client.request('/api/chapters/1/evidence',payload({productId:2,name:'Pera del huerto'}));assert.equal(good.status,200);assert.equal(good.data.evidence.identity,'anonymous');
  assert.equal((await client.request('/api/chapters/1/understanding',{answer:'a'})).status,400);
  await understand(client,1);assert.equal((await client.request('/api/chapters/2')).status,200);
});
test('Recorrido técnico01–05 verifica datos y corrección real en navegador',async()=>{
  const client=makeClient(lab.classroom);await client.init();
  for(let n=1;n<=5;n++){
    const store=await prepare(client,n);
    if(n===1)await store.request('/api/products?id=1');
    const response=await store.request('/api/products?id=2');assert.equal(response.data.priceCents,210);
    if(n===4)await store.request('/api/products?id=2');
    const fields:Record<number,Record<string,unknown>>={1:{productId:2,name:'Pera del huerto'},2:{productId:2,method:'GET',resource:lab.store+'/api/products?id=2'},3:{productId:2,priceCents:210,visibleCents:240,expectedCents:210},4:{editedText:'Pera de prueba',restoredName:'Pera del huerto',serverName:'Pera del huerto'},5:{productId:2,priceCents:210,visibleCents:240,expectedCents:210,steps:'Abrir producto2, mirar Respuesta y comparar hoja y pantalla.'}};
    if(n===2)assert.equal((await client.request('/api/chapters/2/evidence',payload({...fields[n],method:'POST'}))).status,400);
    if(n===2)assert.equal((await client.request('/api/chapters/2/evidence',payload({...fields[n],resource:lab.store+'/assets/imagen.png'}))).status,400);
    if(n===3)assert.equal((await client.request('/api/chapters/3/evidence',payload({...fields[n],priceCents:240}))).status,400);
    assert.equal((await client.request(`/api/chapters/${n}/evidence`,payload(fields[n]))).status,200);
    if(n===5){assert.equal((await client.request('/api/chapters/5/understanding',{answer:'a'})).status,409);const correction=await client.request('/api/chapters/5/correction',{});assert.equal(correction.status,200,JSON.stringify(correction.data));assert.equal(correction.data.report.engine,'Chromium aislado');const repeated=await client.request('/api/chapters/5/correction',{});assert.equal(repeated.status,200);assert.equal(repeated.data.report.at,correction.data.report.at);}
    await understand(client,n);
  }
  const state=(await client.request('/api/state')).data;assert.equal(state.active,6);assert.equal(Object.values(state.campaign.entries).filter((e:any)=>e.completed).length,5);
  assert.deepEqual(state.campaign.patches,['price-rendering']);
  assert.ok(state.campaign.entries[5].patchReport);assert.equal(state.campaign.entries[5].evidence.campaignId,state.campaign.id);
  const exported=(await client.request('/api/export')).data;assert.equal(exported.format,'ug-progress/1');
  await lab.restart();const after=(await client.request('/api/state')).data;assert.equal(after.campaign.id,state.campaign.id);assert.equal(after.active,6);
});
test('Reintentar invalida eventos anteriores y conserva notas y logros',async()=>{
  const client=makeClient(lab.classroom);await client.init();const oldStore=await prepare(client,1);await oldStore.request('/api/products?id=1');await oldStore.request('/api/products?id=2');
  await client.request('/api/chapters/1/evidence',payload({productId:2,name:'Pera del huerto'}));await understand(client,1);
  await client.request('/api/notes',{chapter:1,kind:'hypothesis',expected:'Esperaba conservar el avance.',observed:'La nota es independiente del escenario.'});
  const before=(await client.request('/api/state')).data;
  await prepare(client,1);
  assert.equal((await oldStore.request('/api/products?id=2')).status,409);
  assert.equal((await client.request('/api/chapters/1/evidence',payload({productId:2,name:'Pera del huerto'}))).status,400);
  const after=(await client.request('/api/state')).data;assert.equal(after.campaign.notes.length,1);assert.equal(after.campaign.entries[1].completed,true);assert.notEqual(after.campaign.entries[1].runId,before.campaign.entries[1].runId);
});
test('Restablecer requiere confirmación y una importación antigua solo crea archivo',async()=>{
  const client=makeClient(lab.classroom);await client.init();await client.request('/api/notes',{chapter:1,kind:'limitation',expected:'Conservar nota.',observed:'No he probado la hipótesis.'});
  const exported=(await client.request('/api/export')).data;
  assert.equal((await client.request('/api/campaigns/reset',{confirm:'sí'})).status,400);
  assert.equal((await client.request('/api/campaigns/reset',{confirm:'RESTABLECER'})).status,200);
  const reset=(await client.request('/api/state')).data;assert.equal(reset.campaign.generation,2);assert.equal(reset.campaign.notes.length,0);assert.equal(reset.archives.length,1);
  assert.equal((await client.request('/api/campaigns/import',exported)).status,200);
  const active=(await client.request('/api/state')).data;assert.equal(active.campaign.id,reset.campaign.id);assert.equal(active.campaign.generation,2);assert.equal(active.campaign.notes.length,0);
  assert.equal((await client.request('/api/campaigns/import',{...exported,format:'wrong'})).status,400);
  const archive=active.archives.find((a:any)=>a.id!==reset.archives[0].id);assert.ok(archive);
  assert.equal((await client.request('/api/campaigns/restore',{id:archive.id})).status,200);
  const restored=(await client.request('/api/state')).data;assert.notEqual(restored.campaign.id,reset.campaign.id);assert.equal(restored.campaign.notes.length,1);
});
test('Nueva campaña archiva la anterior y el modo profesor exige entrada explícita',async()=>{
  const client=makeClient(lab.classroom);await client.init();const before=(await client.request('/api/state')).data;
  await client.request('/api/campaigns/new',{alias:'Revisión nueva'});const after=(await client.request('/api/state')).data;assert.notEqual(after.campaign.id,before.campaign.id);assert.ok(after.archives.some((a:any)=>a.id===before.campaign.id));
  assert.equal((await client.request('/api/professor',{code:'incorrecto'})).status,403);
  assert.equal((await client.request('/api/professor',{code:lab.professorCode})).status,200);assert.equal((await client.request('/api/professor/chapters/1')).status,200);
  await client.request('/api/professor/exit',{});assert.equal((await client.request('/api/professor/chapters/1')).status,403);
});
test('Bundles públicos excluyen contenido de profesor y capítulos futuros',async()=>{
  const {readdir}=await import('node:fs/promises');
  for(const app of ['classroom','storefront'])for(const file of await readdir(`dist/${app}/assets`)){
    if(!file.endsWith('.js'))continue;const source=await readFile(`dist/${app}/assets/${file}`,'utf8');
    // Nombres de campos de la vista de profesor no son contenidos privados.
    // Comprobamos datos y texto de solución reales, no la presencia de una clave de esquema.
    for(const marker of ['DEMO-Pera-Verano!','hist-session-17','falsePositiveChecks','Abre /producto?id=1, selecciona la barra de direcciones, cambia únicamente 1 por 2'])assert.equal(source.includes(marker),false,marker);
  }
});
