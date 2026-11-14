import express from 'express';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { bindAddress, root, serviceKey, storeOrigin, jsonFile } from '../../shared/runtime.ts';
import { cookie, equalSecret, errorHandler, requireValue } from '../../shared/http.ts';
import { db, hash, token, product, record, runForSession, ticket, recordEvent } from './db.ts';
import { actTwo,activeRun } from './act-two.ts';
import { actThree } from './act-three.ts';
import { actFour } from './act-four.ts';
import { seedAccounts,disableAccount,identity } from './accounts.ts';
import { IMPLEMENTED_CHAPTERS } from '../../shared/campaign.ts';
const key=serviceKey();
const app=express(); app.disable('x-powered-by');
app.use(express.json({limit:'16kb'}));
app.use((_req,res,next)=>{res.set({'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"});next();});
app.use((req,_res,next)=>{if(req.headers['x-ug-copy'])requireValue(activeRun(req)?.id===req.headers['x-ug-copy'],'Has activado otra copia. Recarga la pestaña antes de enviar peticiones.',409);next();});
app.get('/health',(_req,res)=>res.json({ok:true,service:'store',scenarioVersion:1}));
app.get('/launch',(req,res)=>{
  const value=String(req.query.ticket??'');
  const found=db.prepare('SELECT t.run,r.chapter FROM tickets t JOIN runs r ON r.id=t.run WHERE t.hash=? AND t.expires>? AND r.active=1').get(hash(value),Date.now()) as {run:string;chapter:number}|undefined;
  requireValue(found,'Este enlace de práctica ha caducado o ya se utilizó. Vuelve al expediente y abre la tienda otra vez.',409);
  db.prepare('DELETE FROM tickets WHERE hash=?').run(hash(value));
  const sid=token(); db.prepare('INSERT INTO sessions VALUES(?,?)').run(hash(sid),found.run);
  res.clearCookie('ug_store',{httpOnly:true,sameSite:'lax',path:'/'});
  res.cookie('ug_lab',sid,{httpOnly:true,sameSite:'lax',path:'/',maxAge:86_400_000});
  res.redirect([18,19].includes(found.chapter)?'/campanas/mensaje?mensaje=MARCA-INICIAL':found.chapter===6?'/campanas/verano-sin-colas':found.chapter>=7?'/mi-cuenta':`/producto?id=${found.chapter===1?1:2}`);
});
app.get('/api/context',(req,res)=>{
  const run=activeRun(req);
  res.json({active:!!run,chapter:run?.chapter,copyId:run?.id,controls:run?.chapter===15?(run.orders_checked&&run.profile_allowlist?'corrected':'practice'):undefined,...(run&&run.chapter>=16?{marker:'MARCA-PERA-'+run.id.slice(0,8),...(run.chapter>=19?{demoNonce:run.demo_nonce}:{}),priorControls:{orders:!!run.orders_checked,profile:!!run.profile_allowlist,errors:!!run.error_clean},legacyAccount:[16,17].includes(run.chapter)}:{}),edition:run?.corrected?'corrected':'legacy',label:run?'Copia de práctica autorizada':'Vista pública · abre un expediente para registrar pruebas'});
});
app.get('/api/catalog',(_req,res)=>res.json([1,2,3,4,5,6].map(id=>{const p=product(id)!;return {id:p.id,name:p.name};})));
app.get('/api/products',(req,res)=>{
  const id=Number(req.query.id); const p=Number.isSafeInteger(id)?product(id):undefined;
  if(!p){const current=activeRun(req);if(current&&current.chapter>=14){const user=identity(current,cookie(req,'ug_store'));res.set('X-Lab-Request',recordEvent(current,{kind:'missing-product',resource:`/api/products?id=${id}`,method:'GET',identity:user?.name??'anonymous',status:404}).requestId);}}
  requireValue(p,'No existe esa ficha. Vuelve al catálogo y utiliza una referencia conocida.',404);
  const sid=cookie(req,'ug_lab')??cookie(req,'ug_store'), run=activeRun(req);
  requireValue(!sid||run,'Este escenario se ha reiniciado. Abre la tienda desde el expediente actual.',409);
  if(run)res.set('X-Lab-Request',record(run,p).requestId);
  res.json({id:p.id,name:p.name,priceCents:p.priceCents,publicCampaignRef:p.publicCampaignRef});
});
app.use(actTwo);app.use(actThree);app.use(actFour);
app.use(express.static(resolve(root,'dist/storefront'),{index:false}));
app.get(['/','/producto','/mi-cuenta','/mis-pedidos','/pedido','/campanas/verano-sin-colas','/mesa','/practica/pedidos','/practica/descripciones','/campanas/mensaje','/resenas'],(_req,res)=>res.sendFile(resolve(root,'dist/storefront/index.html')));
app.use((_req,res)=>res.status(404).json({error:'Este recurso no está disponible en el acto actual.'}));
app.use(errorHandler);
const control=express();control.disable('x-powered-by');control.use(express.json({limit:'16kb'}));
control.use((req,_res,next)=>{requireValue(equalSecret(req.headers.authorization,`Bearer ${key}`),'Acceso interno denegado.',403);next();});
control.get('/health',(_req,res)=>{
  const fixtures=jsonFile('content/es/campaign/fixtures.json').products;
  const count=(db.prepare('SELECT COUNT(*) AS count FROM products').get() as {count:number}).count;
  const dataMatch=count===fixtures.length&&fixtures.every((expected:any)=>{const actual=product(expected.id);return actual?.id===expected.id&&actual?.name===expected.name&&actual?.priceCents===expected.priceCents;});
  res.json({ok:dataMatch,scenarioVersion:1,dataMatch});
});
control.post('/prepare',(req,res)=>{
  const {campaignId,generation,chapter,worldPatches}=req.body;
  requireValue(typeof campaignId==='string'&&campaignId.length<100&&Number.isSafeInteger(generation)&&Number.isInteger(chapter)&&chapter>=1&&chapter<=IMPLEMENTED_CHAPTERS,'Escenario interno no válido.');
  const runId=randomUUID();
  db.exec('BEGIN IMMEDIATE');
  try {db.prepare('UPDATE runs SET active=0 WHERE campaign=?').run(campaignId);const patches=Array.isArray(worldPatches)?worldPatches:[];const inherited=(name:string,after:number)=>chapter>after&&patches.includes(name)?1:0;
    db.prepare('INSERT INTO runs(id,campaign,generation,chapter,corrected,resource_clean,account_disabled,orders_checked,profile_allowlist,error_clean,quantity_checked,message_text,review_text,demo_nonce) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(runId,campaignId,generation,chapter,inherited('price-rendering',5),chapter===6?0:1,[16,17].includes(chapter)?0:inherited('demo-account-revoked',15),inherited('order-ownership',15),inherited('profile-allowlist',15),inherited('public-errors',15),inherited('quantity-rule',16),inherited('dom-message-text',19),inherited('review-text',20),'DEMO-'+randomUUID());seedAccounts(runId,chapter);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
  res.json({runId,ticket:ticket(runId),version:1});
});
control.get('/runs/:id/events',(req,res)=>{
  const run=db.prepare('SELECT * FROM runs WHERE id=? AND active=1').get(req.params.id);requireValue(run,'El escenario ya no está activo.',409);
  const events=(db.prepare('SELECT seq,data FROM events WHERE run=? ORDER BY seq').all(req.params.id) as {seq:number;data:string}[]).map(r=>({...JSON.parse(r.data),seq:r.seq}));res.json({run,events});
});
control.post('/runs/:id/ticket',(req,res)=>{requireValue(db.prepare('SELECT id FROM runs WHERE id=? AND active=1').get(req.params.id),'El escenario ya no está activo.',409);res.json({ticket:ticket(req.params.id)});});
control.post('/runs/:id/correction',(req,res)=>{requireValue(db.prepare('SELECT id FROM runs WHERE id=? AND active=1 AND chapter=5').get(req.params.id),'La corrección corresponde al expediente05 activo.',409);db.prepare('UPDATE runs SET corrected=1 WHERE id=?').run(req.params.id);res.json({corrected:true});});
control.post('/runs/:id/comparison',(req,res)=>{
  const run=db.prepare('SELECT * FROM runs WHERE id=? AND active=1').get(req.params.id) as any;
  requireValue(run&&[6,7,10,13,14,15,16,17,18,19,20].includes(run.chapter),'Este expediente no prepara una comparación separada.',409);
  const id=randomUUID();db.exec('BEGIN IMMEDIATE');try{
    db.prepare('INSERT INTO runs(id,campaign,generation,chapter,corrected,resource_clean,account_disabled,orders_checked,profile_allowlist,error_clean,quantity_checked,description_text,message_text,review_text,demo_nonce) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(id,run.campaign,run.generation,run.chapter,run.corrected,1,run.chapter===7?1:run.account_disabled,run.orders_checked||([10,15].includes(run.chapter)?1:0),run.profile_allowlist||([13,15].includes(run.chapter)?1:0),run.error_clean||([14,15].includes(run.chapter)?1:0),run.quantity_checked||(run.chapter===16?1:0),run.chapter===17?1:run.description_text,[18,19].includes(run.chapter)?1:run.message_text,run.chapter===20?1:run.review_text,'DEMO-'+randomUUID());
    seedAccounts(id,run.chapter);if(run.chapter===7)disableAccount(id);db.exec('COMMIT');
  }catch(e){db.exec('ROLLBACK');throw e;}res.json({runId:id,ticket:ticket(id)});
});
control.post('/runs/:id/retire',(req,res)=>{db.prepare('UPDATE runs SET active=0 WHERE id=?').run(req.params.id);res.json({ok:true});});
control.use(errorHandler);
const servers=[app.listen(Number(new URL(storeOrigin).port),bindAddress,()=>console.log(`Tienda: ${storeOrigin}`)),control.listen(Number(process.env.UG_CONTROL_PORT??4313),bindAddress)];
process.on('SIGTERM',()=>{servers.forEach(s=>s.close());db.close();process.exit(0);});
