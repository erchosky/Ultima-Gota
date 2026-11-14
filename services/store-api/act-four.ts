import { Router,type Request,type Response } from 'express';
import { randomUUID } from 'node:crypto';
import { cookie,requireValue,text } from '../../shared/http.ts';
import { boundedContent,FORMAT_SAMPLE,demoPayload } from '../../shared/act-four.ts';
import { jsonFile,storeOrigin } from '../../shared/runtime.ts';
import { db,recordEvent,type Run } from './db.ts';
import { activeRun } from './act-two.ts';
import { identity } from './accounts.ts';
import { messageSource,practiceFrame } from './practice-frame.ts';
export const actFour=Router();
db.exec(`CREATE TABLE IF NOT EXISTS practice_orders(run TEXT PRIMARY KEY,owner TEXT NOT NULL,quantity REAL NOT NULL);
CREATE TABLE IF NOT EXISTS practice_content(run TEXT NOT NULL,kind TEXT NOT NULL,value TEXT NOT NULL,PRIMARY KEY(run,kind));
CREATE TABLE IF NOT EXISTS practice_reviews(id TEXT PRIMARY KEY,run TEXT NOT NULL,author TEXT NOT NULL,session_ref TEXT NOT NULL,value TEXT NOT NULL);`);
function needed(req:Request,chapters:number[]){const run=activeRun(req);requireValue(run&&chapters.includes(run.chapter),'Este recurso necesita la copia del expediente correspondiente.',403);return run;}
function userFor(req:Request,run:Run){const user=identity(run,cookie(req,'ug_store'));requireValue(user,'Inicia sesión con una cuenta autorizada.',401);return user;}
function origin(req:Request){requireValue(req.headers.origin===storeOrigin,'Envía la petición desde la tienda del laboratorio.',403);}
function event(req:Request,res:Response,run:Run,details:Parameters<typeof recordEvent>[1]){const user=identity(run,cookie(req,'ug_store'));const e=recordEvent(run,{...details,identity:user?.name??'anonymous',userId:user?.userId,authSessionRef:user?.ref});res.set('X-Lab-Request',e.requestId);return e;}
export function reviewFor(run:string,id:string){return db.prepare('SELECT * FROM practice_reviews WHERE run=? AND id=?').get(run,id) as {id:string;run:string;author:string;session_ref:string;value:string}|undefined;}
actFour.post('/api/practice/orders',(req,res)=>{
 const run=needed(req,[16]),user=userFor(req,run);origin(req);const body=req.body,q=body?.quantity;
 const valid=body&&Object.keys(body).every(k=>['productId','quantity'].includes(k))&&body.productId===2&&typeof q==='number'&&Number.isFinite(q)&&Math.abs(q)<=1000&&(!run.quantity_checked||Number.isInteger(q)&&q>=1&&q<=20);
 event(req,res,run,{kind:'practice-order-write',method:'POST',resource:'/api/practice/orders',identity:user.name,status:valid?201:400,...(typeof q==='number'&&Number.isFinite(q)?{quantity:q}:{})});
 requireValue(valid,'La cantidad debe ser un número entero entre1 y20; conserva productId:2 y no añadas otros campos.');
 db.prepare('INSERT INTO practice_orders VALUES(?,?,?) ON CONFLICT(run) DO UPDATE SET quantity=excluded.quantity,owner=excluded.owner').run(run.id,user.userId,q);res.status(201).json({id:901,productId:2,quantity:q,demoOnly:true,charged:false});
});
actFour.get('/api/practice/orders',(req,res)=>{
 const run=needed(req,[16]),user=userFor(req,run);requireValue(req.query.id==='901','Usa el identificador de práctica901.',404);const row=db.prepare('SELECT owner,quantity FROM practice_orders WHERE run=?').get(run.id) as {owner:string;quantity:number}|undefined;requireValue(row&&row.owner===user.userId,'No hay un pedido propio de práctica.',404);
 event(req,res,run,{kind:'practice-order-read',method:'GET',resource:'/api/practice/orders?id=901',identity:user.name,status:200,quantity:row.quantity});res.json({id:901,productId:2,quantity:row.quantity,charged:false});
});
actFour.patch('/api/practice/descriptions',(req,res)=>{
 const run=needed(req,[17]),user=userFor(req,run);origin(req);requireValue(req.body?.productId===2&&Object.keys(req.body).every(k=>['productId','value'].includes(k))&&boundedContent(req.body.value,run.demo_nonce),'Usa texto corriente o el marcador de formato explicado.');
 db.prepare("INSERT INTO practice_content VALUES(?,'description',?) ON CONFLICT(run,kind) DO UPDATE SET value=excluded.value").run(run.id,req.body.value);event(req,res,run,{kind:'description-write',method:'PATCH',resource:'/api/practice/descriptions',identity:user.name,status:200,input:req.body.value});res.json({saved:true});
});
actFour.get('/api/practice/descriptions',(req,res)=>{
 const run=needed(req,[17]),user=userFor(req,run);const row=db.prepare("SELECT value FROM practice_content WHERE run=? AND kind='description'").get(run.id) as {value:string}|undefined,value=row?.value??'Descripción de práctica';event(req,res,run,{kind:'description-read',method:'GET',resource:'/api/practice/descriptions',identity:user.name,status:200,input:value});res.json({productId:2,literal:value,formatted:value});
});
actFour.get('/assets/mensaje-leccion.js',(req,res)=>{const run=needed(req,[18,19]);event(req,res,run,{kind:'message-source',method:'GET',resource:'/assets/mensaje-leccion.js',identity:'anonymous',status:200});res.type('application/javascript').send(messageSource(!!run.message_text));});
actFour.get('/api/practice/demonstration',(req,res)=>{
 const run=needed(req,[19,20]),lesson=jsonFile('content/es/chapters/chapter-19/demonstration.json');res.json({title:lesson.title,explanation:lesson.explanation,sample:demoPayload(run.demo_nonce),nonce:run.demo_nonce,limits:lesson.limits});
});
actFour.post('/api/reviews',(req,res)=>{
 const run=needed(req,[20]),user=userFor(req,run);origin(req);requireValue(req.body?.productId===2&&Object.keys(req.body).every(k=>['productId','text'].includes(k))&&boundedContent(req.body.text,run.demo_nonce,true),'Usa una reseña de texto o la muestra local explicada, para productId:2.');
 const id=randomUUID();db.prepare('INSERT INTO practice_reviews VALUES(?,?,?,?,?)').run(id,run.id,user.userId,user.ref,req.body.text);event(req,res,run,{kind:'review-write',method:'POST',resource:'/api/reviews',identity:user.name,status:201,reviewId:id,input:req.body.text});res.status(201).json({id,productId:2,saved:true});
});
actFour.get('/api/reviews',(req,res)=>{
 const run=needed(req,[20]),user=userFor(req,run);requireValue(req.query.productId==='2','Las reseñas de este caso pertenecen al producto2.',404);const rows=db.prepare('SELECT id,author,value FROM practice_reviews WHERE run=? ORDER BY rowid DESC LIMIT 30').all(run.id) as {id:string;author:string;value:string}[];
 for(const r of rows)event(req,res,run,{kind:'review-read',method:'GET',resource:'/api/reviews?productId=2',identity:user.name,status:200,reviewId:r.id,input:r.value});res.json({productId:2,reviews:rows.map(r=>({id:r.id,authorId:r.author,text:r.value}))});
});
actFour.get('/practice/frame',(req,res)=>{
 const run=needed(req,[17,18,19,20]);requireValue(req.query.copy===run.id,'Esta vista pertenece a otra copia. Recarga desde el expediente.',409);
 const mode=String(req.query.mode);let value='',reviewId:string|undefined;
 if(mode==='description'){requireValue(run.chapter===17,'Abre la ficha de descripciones.',403);userFor(req,run);value=(db.prepare("SELECT value FROM practice_content WHERE run=? AND kind='description'").get(run.id) as {value:string}|undefined)?.value??'Descripción de práctica';}
 else if(mode==='message'){requireValue([18,19].includes(run.chapter),'Abre el mensaje de campaña.',403);value=text(req.query.mensaje,400);requireValue(boundedContent(value,run.demo_nonce,run.chapter===19),'Esta práctica admite texto, el marcador explicado y,desde19,la muestra local de demostración.');}
 else if(mode==='review'){requireValue(run.chapter===20,'Abre las reseñas de práctica.',403);userFor(req,run);reviewId=String(req.query.reviewId);const r=reviewFor(run.id,reviewId);requireValue(r,'No existe esa reseña en esta copia.',404);value=r.value;}
 else requireValue(false,'No existe ese modo de práctica.',404);
 const kind=mode as 'description'|'message'|'review';event(req,res,run,{kind:kind+'-render',method:'GET',resource:'/practice/frame',identity:'anonymous',status:200,input:value,reviewId,sink:kind==='description'?run.description_text?'textContent':'innerHTML':kind==='message'?run.message_text?'textContent':'innerHTML':run.review_text?'textContent':'innerHTML'});
 const frame=practiceFrame(run,kind,value);res.set('Content-Security-Policy',frame.csp).type('html').send(frame.html);
});
actFour.get('/demo/imagen-inexistente',(_req,res)=>res.status(404).type('text').send('Imagen ficticia inexistente.'));
