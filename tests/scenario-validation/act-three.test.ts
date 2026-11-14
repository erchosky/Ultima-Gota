import { before,after,test } from 'node:test';
import assert from 'node:assert/strict';
import { makeClient,startLab } from '../support/lab.ts';
import { prepare,finish,evidence } from '../support/complete-act-one.ts';
import { login } from '../support/complete-act-two.ts';
import { toChapter,exercise,patch,preference,escalate,fields } from '../support/act-three.ts';
let lab:Awaited<ReturnType<typeof startLab>>;
before(async()=>{lab=await startLab();});after(async()=>{await lab?.stop();});
test('11 exige dos solicitudes nuevas de la misma sesión, no dos capturas ni un marcador cliente',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,11);const s=await prepare(c,lab.store,11);await login(s,'Alba');
 const a=await s.request('/api/orders?id=204'),ref=a.headers.get('x-lab-request')!;const f={actorName:'Alba',method:'GET',resource:lab.store+'/api/orders?id=204',requestOne:ref,requestTwo:ref};
 assert.equal((await c.request('/api/chapters/11/evidence',{...evidence(f),resuelto:true})).status,400);
 await s.request('/api/logout',{});await login(s,'Alba');const b=await s.request('/api/orders?id=204');f.requestTwo=b.headers.get('x-lab-request')!;assert.equal((await c.request('/api/chapters/11/evidence',evidence(f))).status,400);
 f.requestOne=f.requestTwo;f.requestTwo=(await s.request('/api/orders?id=204')).headers.get('x-lab-request')!;await finish(c,11,f);assert.equal((await c.request('/api/state')).data.active,12);
});
test('12 persiste solo preferencia autorizada; formato incorrecto y capacidades no conceden logro',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,12);const s=await prepare(c,lab.store,12);await login(s,'demo.pera');
 assert.equal((await c.request('/api/chapters/12/evidence',evidence(fields[12]))).status,400);
 for(const body of [{role:'support'},{supportAccess:true},{notificationPreference:'root'},{notificationPreference:'daily',role:'support'},[]])assert.equal((await patch(s,body)).status,400);
 assert.equal((await s.request('/api/me')).data.notificationPreference,'none');await preference(s);await finish(c,12,fields[12]);
});
test('13 demuestra capacidad real y comparación permite preferencia mientras bloquea asignación interna',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,13);const s=await prepare(c,lab.store,13);await login(s,'demo.pera');
 assert.equal((await patch(s,{role:'support'})).status,400);assert.equal((await c.request('/api/chapters/13/evidence',evidence(fields[13]))).status,400);
 await escalate(s);await finish(c,13,fields[13]);const state=(await c.request('/api/state')).data;assert.ok(state.campaign.entries[13].patchReport.checks.length>=3);assert.equal(state.campaign.patches.includes('profile-allowlist'),false);
 const reveal=(await c.request('/api/chapters/13')).data;assert.match(reveal.debrief,/08:54/);assert.equal((await c.request('/api/chapters/14')).data.debrief,undefined);
});
test('14 conserva seis observaciones reales: dos200 distintos,401,403,400 y404',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,14);const s=await prepare(c,lab.store,14);
 await login(s,'demo.pera');assert.equal((await s.request('/api/support/summary')).status,403);const invalid=await s.request('/api/integration/preview',{reference:7});assert.equal(invalid.status,400);assert.equal(invalid.data.internalRoute,'mercurio/catalog');await s.request('/api/products?id=999');const legacy=await s.request('/api/legacy/support');assert.equal(legacy.status,200);assert.equal(legacy.data.allowed,false);
 assert.equal((await c.request('/api/chapters/14/evidence',evidence(fields[14]))).status,400);
 await s.request('/api/logout',{});assert.equal((await s.request('/api/support/summary')).status,401);await login(s,'soporte.vera');assert.equal((await s.request('/api/support/summary')).status,200);await finish(c,14,fields[14]);
});
test('15 separa práctica y propuesta, rechaza pestaña antigua, conserva controles y recupera versiones1/2/3',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,15);const export2=(await c.request('/api/export')).data;export2.contentVersion=2;delete export2.campaign.entries[11];delete export2.campaign.entries[12];delete export2.campaign.entries[13];delete export2.campaign.entries[14];delete export2.campaign.entries[15];
 const s=await prepare(c,lab.store,15);await login(s,'Alba');assert.equal((await s.request('/api/orders?id=203')).status,200);assert.equal((await s.request('/api/orders?id=204')).data.ownerId,'user-bruno');await escalate(s);
 assert.equal((await c.request('/api/chapters/15/evidence',evidence(fields[15]))).status,409);
 const oldCopy=(await s.request('/api/context')).data.copyId,link=await c.request('/api/chapters/15/comparison-link',{});const fixed=makeClient(lab.store);await fixed.request(link.data.launchUrl.replace(lab.store,''));assert.equal((await fixed.request('/api/me',undefined,{'X-UG-Copy':oldCopy})).status,409);
 await login(fixed,'Alba');assert.equal((await fixed.request('/api/orders?id=203')).status,200);const denied=await fixed.request('/api/orders?id=204');assert.equal(denied.status,403);assert.equal('ownerId'in denied.data,false);
 await login(fixed,'demo.pera');await preference(fixed);assert.equal((await patch(fixed,{supportAccess:true})).status,400);assert.equal((await fixed.request('/api/me')).data.supportAccess,false);assert.equal((await fixed.request('/api/support/summary')).status,403);
 assert.equal((await c.request('/api/chapters/15/evidence',evidence(fields[15]))).status,200);assert.equal((await c.request('/api/chapters/15/correction',{})).status,200);
 const partial=(await c.request('/api/export')).data;assert.equal(!!partial.campaign.entries[15].completed,false);assert.ok(partial.campaign.patches.includes('profile-allowlist'));
 await finish(c,15,fields[15]);await lab.restart();const state=(await c.request('/api/state')).data;assert.equal(state.campaign.entries[15].completed,true);assert.ok(state.campaign.patches.includes('order-ownership'));
 const exported=(await c.request('/api/export')).data;assert.equal(exported.contentVersion,4);const imported=await c.request('/api/campaigns/import',exported);assert.equal(imported.status,200);await c.request('/api/campaigns/restore',{id:imported.data.archiveId});assert.equal((await c.request('/api/state')).data.campaign.entries[15].completed,true);
 const p=await c.request('/api/campaigns/import',partial);assert.equal(p.status,200);await c.request('/api/campaigns/restore',{id:p.data.archiveId});assert.ok((await c.request('/api/state')).data.campaign.patches.includes('profile-allowlist'));
 await prepare(c,lab.store,15);assert.equal((await c.request('/api/chapters/15/understanding',{answer:'b'})).status,409);const retried=(await c.request('/api/export')).data;const retryCopy=await c.request('/api/campaigns/import',retried);assert.equal(retryCopy.status,200);await c.request('/api/campaigns/restore',{id:retryCopy.data.archiveId});assert.ok((await c.request('/api/state')).data.campaign.patches.includes('order-ownership'));
 const old=await c.request('/api/campaigns/import',export2);assert.equal(old.status,200);await c.request('/api/campaigns/restore',{id:old.data.archiveId});assert.equal((await c.request('/api/state')).data.active,11);
 export2.campaign.entries[11]={hints:[],completed:false};assert.equal((await c.request('/api/campaigns/import',export2)).status,400);
});
