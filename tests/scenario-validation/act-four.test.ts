import { before,after,test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { makeClient,startLab } from '../support/lab.ts';
import { prepare,finish,evidence } from '../support/complete-act-one.ts';
import { login } from '../support/complete-act-two.ts';
import { exercise,toChapter,fields16,fields17 } from '../support/act-four.ts';
import { demoPayload,FORMAT_SAMPLE } from '../../shared/act-four.ts';
let lab:Awaited<ReturnType<typeof startLab>>;
before(async()=>{lab=await startLab();});after(async()=>{await lab?.stop();});
test('16 hereda controles del15, persiste cero y corrige límites sin cambiar pedido rechazado',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,16);const s=await prepare(c,lab.store,16),copy=(await s.request('/api/context')).data;assert.deepEqual(copy.priorControls,{orders:true,profile:true,errors:true});assert.equal((await s.request('/assets/verano-demo.js')).data.includes('const demo'),false);
 await login(s,'Alba');assert.equal((await s.request('/api/orders?id=203')).status,200);assert.equal((await s.request('/api/orders?id=204')).status,403);await login(s,'Bruno');assert.equal((await s.request('/api/orders?id=204')).status,200);
 await login(s,'demo.pera');assert.equal((await s.request('/api/profile',{supportAccess:true},{},'PATCH')).status,400);assert.equal((await s.request('/api/integration/preview',{reference:7})).data.internalRoute,undefined);
 assert.equal((await c.request('/api/chapters/16/evidence',evidence(fields16))).status,400);await s.request('/api/practice/orders',{productId:2,quantity:0});assert.equal((await s.request('/api/practice/orders?id=901')).data.quantity,0);
 await finish(c,16,fields16);assert.ok((await c.request('/api/state')).data.campaign.patches.includes('quantity-rule'));
 const old=s.cookie;await prepare(c,lab.store,16);assert.equal((await s.request('/api/practice/orders?id=901',undefined,{Cookie:old})).status,403);
});
test('17 exige dato persistido y comprueba HTML/literal en navegador independiente',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,17);const s=await prepare(c,lab.store,17);await login(s,'demo.pera');assert.equal((await c.request('/api/chapters/17/evidence',evidence(fields17))).status,400);
 assert.equal((await s.request('/api/practice/descriptions',{productId:2,value:'<script>alert(1)</script>'},{},'PATCH')).status,400);
 await s.request('/api/practice/descriptions',{productId:2,value:FORMAT_SAMPLE},{},'PATCH');await s.request('/api/practice/descriptions');await finish(c,17,fields17);assert.equal((await c.request('/api/state')).data.campaign.entries[17].evidence.verification.engine,'Chromium aislado');
});
test('18 exige marcador único delrun y fragmento público; no acredita copiar nombres sin cargarlo',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,18);const result=await exercise(c,lab.store,18);assert.equal((await result.store.request('/api/practice/demonstration')).status,403);
 assert.equal((await c.request('/api/chapters/18/evidence',evidence({...result.fields,marker:'MARCA-DE-OTRA-COPIA'}))).status,400);await finish(c,18,result.fields);assert.equal((await c.request('/api/state')).data.active,19);
});
test('19 reproduce ejecución real, mantiene recinto opaco y rechaza entradas/nonce ajenos',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,19);const result=await exercise(c,lab.store,19),s=result.store,query=(v:string)=>'/practice/frame?'+new URLSearchParams({copy:result.copy.copyId,mode:'message',mensaje:v});
 assert.equal((await s.request(query('<img src="https://example.com/" onerror="fetch(\'/api/me\')">'))).status,400);assert.equal((await s.request(query(demoPayload('DEMO-ajeno')))).status,400);
 const browser=await chromium.launch();try{const ctx=await browser.newContext(),p=await ctx.newPage();const launch=await c.request('/api/chapters/19/launch',{});await p.goto(launch.data.launchUrl);await p.goto(lab.store+'/campanas/mensaje?'+new URLSearchParams({mensaje:result.fields.input as string}));const frame=p.frameLocator('iframe');await frame.locator('#marca[data-demo="'+result.copy.demoNonce+'"]').waitFor({state:'attached'});assert.equal(await p.locator('iframe').getAttribute('sandbox'),'allow-scripts');
 const isolation=await frame.locator('html').evaluate(()=>{let cookie=false,parentAccess=false;try{document.cookie;cookie=true;}catch{}try{parent.document.body;parentAccess=true;}catch{}return {cookie,parentAccess};});assert.deepEqual(isolation,{cookie:false,parentAccess:false});assert.equal(await frame.locator('html').evaluate(async(_el,url)=>{try{await fetch(url);return true;}catch{return false;}},lab.store+'/health'),false);assert.equal((await ctx.cookies()).some(k=>k.name==='ug_classroom'),false);
 const header=await s.request(query(result.fields.input as string));assert.match(header.headers.get('content-security-policy')!,/sandbox allow-scripts/);assert.match(header.headers.get('content-security-policy')!,/unsafe-hashes/);assert.equal(header.headers.get('content-security-policy')!.includes('unsafe-inline'),false);
 }finally{await browser.close();}
 assert.equal((await c.request('/api/chapters/19/evidence',evidence({...result.fields,input:FORMAT_SAMPLE}))).status,400);await finish(c,19,result.fields);assert.ok((await c.request('/api/state')).data.campaign.patches.includes('dom-message-text'));
});
test('20 distingue autora/lector, carga reseña exacta en limpio y recupera contenido3/4 tras reinicio',async()=>{
 const c=makeClient(lab.classroom);await toChapter(c,lab.store,20);const s=await prepare(c,lab.store,20),copy=(await s.request('/api/context')).data;await login(s,'Alba');const review=await s.request('/api/reviews',{productId:2,text:demoPayload(copy.demoNonce)}),fields={reviewId:review.data.id,authorName:'Alba',readerName:'Bruno',effect:'local-mark'};
 await s.request('/api/reviews?productId=2');assert.equal((await c.request('/api/chapters/20/evidence',{...evidence(fields),resuelto:true})).status,400);
 await login(s,'Bruno');await s.request('/api/reviews?productId=2');await s.request('/practice/frame?'+new URLSearchParams({copy:copy.copyId,mode:'review',reviewId:review.data.id}));
 assert.equal((await c.request('/api/chapters/20/evidence',evidence({...fields,reviewId:'inventada'}))).status,400);await lab.restart();await finish(c,20,fields);const state=(await c.request('/api/state')).data;assert.equal(state.active,21);assert.ok(state.campaign.patches.includes('review-text'));
 const current=(await c.request('/api/export')).data;assert.equal(current.contentVersion,4);const imported=await c.request('/api/campaigns/import',current);assert.equal(imported.status,200);await c.request('/api/campaigns/restore',{id:imported.data.archiveId});assert.equal((await c.request('/api/state')).data.campaign.entries[20].completed,true);assert.equal((await c.request('/api/state')).data.campaign.entries[19].evidence.verification.engine,'Chromium aislado');
 current.contentVersion=3;assert.equal((await c.request('/api/campaigns/import',current)).status,400);for(let n=16;n<=20;n++)delete current.campaign.entries[n];current.campaign.patches=current.campaign.patches.filter((v:string)=>!['quantity-rule','dom-message-text','review-text'].includes(v));const old=await c.request('/api/campaigns/import',current);assert.equal(old.status,200);await c.request('/api/campaigns/restore',{id:old.data.archiveId});assert.equal((await c.request('/api/state')).data.active,16);
});
