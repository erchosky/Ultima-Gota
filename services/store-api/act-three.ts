import { Router } from 'express';
import { cookie,requireValue } from '../../shared/http.ts';
import { storeOrigin } from '../../shared/runtime.ts';
import { db,recordEvent } from './db.ts';
import { activeRun } from './act-two.ts';
import { identity } from './accounts.ts';
export const actThree=Router();
actThree.patch('/api/profile',(req,res)=>{
  const run=activeRun(req);requireValue(run&&run.chapter>=12,'Abre el expediente de actualización de perfil.',403);
  requireValue(req.headers.origin===storeOrigin,'Envía el perfil desde la tienda de laboratorio.',403);
  const user=identity(run,cookie(req,'ug_store'));requireValue(user,'Inicia sesión con una cuenta autorizada.',401);
  const body=req.body,internal=body&&Object.hasOwn(body,'supportAccess');
  const record=(status:number,extra:Record<string,any>={})=>{const e=recordEvent(run,{kind:'profile-update',resource:'/api/profile',method:'PATCH',identity:user.name,userId:user.userId,authSessionRef:user.ref,status,internalField:!!internal,...extra});res.set('X-Lab-Request',e.requestId);};
  const valid=body&&typeof body==='object'&&!Array.isArray(body)&&Object.keys(body).length>0&&Object.keys(body).every(k=>['notificationPreference','supportAccess'].includes(k))&&(!Object.hasOwn(body,'notificationPreference')||['none','daily','weekly'].includes(body.notificationPreference))&&(!internal||typeof body.supportAccess==='boolean');
  if(!valid||internal&&(run.chapter===12||run.chapter===14||run.profile_allowlist)){record(400);res.status(400).json({error:internal?'El campo interno no es una preferencia editable.':'Formato de perfil no válido. Conserva JSON y una preferencia permitida.'});return;}
  db.exec('BEGIN IMMEDIATE');try{
    if(Object.hasOwn(body,'notificationPreference'))db.prepare('UPDATE lab_users SET preference=? WHERE run=? AND id=?').run(body.notificationPreference,run.id,user.userId);
    if(internal)db.prepare('UPDATE lab_users SET support_access=? WHERE run=? AND id=?').run(body.supportAccess?1:0,run.id,user.userId);
    db.exec('COMMIT');
  }catch(e){db.exec('ROLLBACK');throw e;}
  const current=db.prepare('SELECT preference,support_access FROM lab_users WHERE run=? AND id=?').get(run.id,user.userId) as {preference:string;support_access:number};
  record(200,{preference:current.preference,supportAccess:!!current.support_access});res.json({saved:true});
});
actThree.get(['/api/support/summary','/api/legacy/support'],(req,res)=>{
  const run=activeRun(req);requireValue(run&&run.chapter>=13,'Este recurso pertenece a un expediente posterior.',403);
  const user=identity(run,cookie(req,'ug_store'));
  const row=user?db.prepare('SELECT role,support_access FROM lab_users WHERE run=? AND id=?').get(run.id,user.userId) as {role:string;support_access:number}:undefined;
  const allowed=!!row&&(row.role==='support'||!!row.support_access),legacy=req.path==='/api/legacy/support';
  const status=legacy?200:!user?401:allowed?200:403;
  const e=recordEvent(run,{kind:legacy?'legacy-support':'support',method:'GET',resource:req.path,identity:user?.name??'anonymous',userId:user?.userId,authSessionRef:user?.ref,status,allowed,supportAccess:!!row?.support_access});res.set('X-Lab-Request',e.requestId);
  if(!allowed){res.status(status).json({allowed:false,error:!user?'Acceso denegado: no hay sesión de cuenta.':'Acceso denegado: falta una capacidad de soporte autorizada.'});return;}
  res.status(status).json({allowed:true,caseRef:'SOP-DEMO-001',integration:'Mercurio',message:'Resumen restringido de soporte. Todos los datos son ficticios.'});
});
actThree.post('/api/integration/preview',(req,res)=>{
  const run=activeRun(req);requireValue(run&&run.chapter>=14,'Este recurso pertenece a un expediente posterior.',403);
  requireValue(req.headers.origin===storeOrigin,'Inicia la petición desde la tienda de laboratorio.',403);
  const user=identity(run,cookie(req,'ug_store'));requireValue(user,'Inicia sesión con una cuenta autorizada.',401);
  const valid=req.body?.reference==='CAT-6',status=valid?200:400;
  const e=recordEvent(run,{kind:'integration-preview',method:'POST',resource:'/api/integration/preview',identity:user.name,userId:user.userId,authSessionRef:user.ref,status,internalDetail:!valid&&!run.error_clean});res.set('X-Lab-Request',e.requestId);
  res.status(status).json(valid?{reference:'CAT-6',productId:6,message:'Referencia ficticia encontrada.'}:run.error_clean?{error:'La referencia no tiene el formato permitido.',diagnosticRef:e.requestId}:{error:'Referencia no válida.',internalRoute:'mercurio/catalog',trace:'DemoCatalogConnector.parseReference (solo laboratorio)'});
});
