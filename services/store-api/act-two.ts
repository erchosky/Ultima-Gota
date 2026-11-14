import { Router, type Request } from 'express';
import { cookie,requireValue,text } from '../../shared/http.ts';
import { storeOrigin } from '../../shared/runtime.ts';
import { db,runForSession,recordEvent,type Run } from './db.ts';
import { login,identity,revoke,accountFixtures } from './accounts.ts';
export const actTwo=Router();
export const activeRun=(req:Request)=>runForSession(cookie(req,'ug_lab'))??runForSession(cookie(req,'ug_store'));
function needed(req:Request,min:number){const run=activeRun(req);requireValue(run&&run.chapter>=min,'Abre este escenario desde su expediente autorizado.',403);return run;}
function event(run:Run,details:Parameters<typeof recordEvent>[1],res:any){const e=recordEvent(run,details);res.set('X-Lab-Request',e.requestId);}
actTwo.get('/assets/verano-demo.js',(req,res)=>{
  const run=activeRun(req),exposed=run?.chapter===6&&!run.resource_clean;
  if(run&&run.chapter>=6)event(run,{kind:'campaign-resource',method:'GET',resource:'/assets/verano-demo.js',identity:'anonymous',status:200},res);
  const demo=accountFixtures.find(a=>a.name==='demo.pera')!;
  const source=`// Verano sin colas · archivo público de demostración.\n${exposed?`const demo = ${JSON.stringify({user:demo.name,password:demo.password})};\n`:'// Promoción sin credenciales de acceso.\n'}document.querySelector('[data-summer-status]')?.setAttribute('data-loaded', 'yes');\n`;
  res.type('application/javascript').send(source);
});
actTwo.post('/api/login',(req,res)=>{
  const run=needed(req,7);requireValue(req.headers.origin===storeOrigin,'Inicia el acceso desde la tienda de laboratorio.',403);
  const result=login(run,text(req.body.username,80),text(req.body.password,100));
  if(!result){event(run,{kind:'login',method:'POST',resource:'/api/login',identity:'anonymous',status:401},res);res.status(401).json({error:'Esas credenciales de laboratorio no conceden acceso en esta copia.'});return;}
  res.cookie('ug_store',result.value,{httpOnly:true,sameSite:'lax',path:'/',maxAge:86_400_000});
  event(run,{kind:'login',method:'POST',resource:'/api/login',identity:result.name,userId:result.userId,authSessionRef:result.ref,status:200},res);res.json({ok:true});
});
actTwo.get('/api/me',(req,res)=>{
  const run=needed(req,7),user=identity(run,cookie(req,'ug_store'));
  const settings=user&&run.chapter>=12?db.prepare('SELECT preference,support_access,role FROM lab_users WHERE run=? AND id=?').get(run.id,user.userId) as {preference:string;support_access:number;role:string}:undefined;
  event(run,{kind:'profile',method:'GET',resource:'/api/me',identity:user?.name??'anonymous',userId:user?.userId,authSessionRef:user?.ref,status:user?200:401,...(settings?{preference:settings.preference,supportAccess:!!settings.support_access}:{})},res);
  if(!user){res.status(401).json({error:'Acceso privado denegado. No hay una sesión de cuenta válida.'});return;}
  res.json({userId:user.userId,name:user.name,...(settings?{notificationPreference:settings.preference,supportAccess:!!settings.support_access,role:settings.role}:{})});
});
actTwo.post('/api/logout',(req,res)=>{
  const run=needed(req,7);requireValue(req.headers.origin===storeOrigin,'Cierra la sesión desde la tienda de laboratorio.',403);
  const value=cookie(req,'ug_store'),user=identity(run,value);
  if(value)revoke(value);
  res.clearCookie('ug_store',{httpOnly:true,sameSite:'lax',path:'/'});
  event(run,{kind:'logout',method:'POST',resource:'/api/logout',identity:user?.name??'anonymous',userId:user?.userId,authSessionRef:user?.ref,revoked:!!user,status:200},res);res.json({ok:true});
});
actTwo.get('/api/my-orders',(req,res)=>{
  const run=needed(req,10),user=identity(run,cookie(req,'ug_store'));requireValue(user,'Inicia sesión con una cuenta autorizada para ver sus pedidos.',401);
  const orders=db.prepare('SELECT id FROM lab_orders WHERE run=? AND owner=? ORDER BY id').all(run.id,user.userId);res.json({name:user.name,orders});
});
actTwo.get('/api/orders',(req,res)=>{
  const run=needed(req,10),user=identity(run,cookie(req,'ug_store')),id=Number(req.query.id);
  const row=Number.isSafeInteger(id)?db.prepare('SELECT owner,data FROM lab_orders WHERE run=? AND id=?').get(run.id,id) as {owner:string;data:string}|undefined:undefined;
  const status=!user?401:!row?404:run.orders_checked&&row.owner!==user.userId?403:200;
  event(run,{kind:'order',method:'GET',resource:`/api/orders?id=${id}`,identity:user?.name??'anonymous',userId:user?.userId,authSessionRef:user?.ref,orderId:id,ownerId:status===200?row?.owner:undefined,status},res);
  requireValue(status===200,status===401?'Inicia sesión para consultar el pedido.':status===403?'Acceso denegado: este pedido pertenece a otra cuenta.':'No existe ese pedido en esta copia.',status);
  res.json({...JSON.parse(row!.data),viewerName:user!.name});
});
