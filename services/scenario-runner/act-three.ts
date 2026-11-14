import { randomUUID } from 'node:crypto';
import { chromium } from 'playwright';
import { jsonFile,storeOrigin } from '../../shared/runtime.ts';
import { redactLabText } from '../../shared/lab-secrets.ts';
import { requireValue,text } from '../../shared/http.ts';
import type { Campaign,Evidence,StoreEvent,PatchReport } from '../../shared/types.ts';
import { control,eventsFor } from './store-client.ts';
import { browserAvailable } from './act-one.ts';
const fixtures=jsonFile('content/es/campaign/fixtures.json');
function orderPair(events:StoreEvent[],blocked:boolean){return events.some(e=>e.kind==='order'&&e.orderId===204&&e.userId==='user-alba'&&e.status===(blocked?403:200)&&events.some(p=>p.kind==='order'&&p.orderId===203&&p.status===200&&p.userId==='user-alba'&&p.authSessionRef===e.authSessionRef&&p.seq<e.seq));}
function preferencePair(events:StoreEvent[]){return events.some(e=>e.kind==='profile-update'&&e.userId==='user-demo-pera'&&e.status===200&&e.preference==='daily'&&!e.internalField&&events.some(p=>p.kind==='profile'&&p.authSessionRef===e.authSessionRef&&p.seq>e.seq&&p.preference==='daily'));}
function escalation(events:StoreEvent[]){return events.some(e=>e.kind==='profile-update'&&e.status===200&&e.internalField&&e.supportAccess&&e.userId==='user-demo-pera'&&events.some(before=>before.kind==='support'&&before.status===403&&before.authSessionRef===e.authSessionRef&&before.seq<e.seq)&&events.some(after=>after.kind==='support'&&after.status===200&&after.authSessionRef===e.authSessionRef&&after.seq>e.seq)&&events.some(p=>p.kind==='profile'&&p.authSessionRef===e.authSessionRef&&p.seq>e.seq&&p.supportAccess));}
function blockedEscalation(events:StoreEvent[]){return events.some(e=>e.kind==='profile-update'&&e.status===400&&e.internalField&&e.userId==='user-demo-pera'&&events.some(p=>p.kind==='profile'&&p.authSessionRef===e.authSessionRef&&p.seq>e.seq&&p.supportAccess===false)&&events.some(p=>p.kind==='support'&&p.authSessionRef===e.authSessionRef&&p.seq>e.seq&&p.status===403));}
export async function validateActThree(c:Campaign,n:number,input:any):Promise<Evidence>{
  const entry=c.entries[n];requireValue(entry?.runId&&entry.prediction,'Prepara este escenario con una predicción.',409);
  const {run,events}=await eventsFor(entry.runId);requireValue(run.campaign===c.id&&run.generation===c.generation&&run.chapter===n,'La evidencia no pertenece a esta ejecución.',409);
  const f=input.fields;requireValue(f&&typeof f==='object'&&!Array.isArray(f),'Completa las observaciones concretas.');let saved:Record<string,string|number>={},identity='demo.pera',resource='/api/profile',refs=events;
  if(n===11){
    const first=events.find(e=>e.requestId===f.requestOne),second=events.find(e=>e.requestId===f.requestTwo);
    requireValue(first&&second&&first.seq<second.seq&&first.kind==='order'&&second.kind==='order'&&first.status===200&&second.status===200&&first.resource===second.resource&&first.userId==='user-alba'&&first.authSessionRef===second.authSessionRef,'Necesitamos dos peticiones equivalentes recibidas en orden, con referencias distintas y la misma sesión de Alba.');
    requireValue(f.method==='GET'&&f.actorName==='Alba'&&f.resource===storeOrigin+first.resource,'Comprueba método, dirección e identidad de las dos consultas.');
    saved={method:'GET',actorName:'Alba',resource:f.resource,requestOne:first.requestId,requestTwo:second.requestId};identity='Alba';resource=first.resource;refs=[first,second];
  }
  if(n===12){requireValue(preferencePair(events),'Falta guardar daily y leerlo después en el perfil de esa misma sesión.');requireValue(f.name==='demo.pera'&&f.preference==='daily','Anota la identidad y la preferencia persistida, no una edición local.');saved={name:'demo.pera',preference:'daily'};}
  if(n===13){requireValue(escalation(events),'Compara soporte denegado antes, actualización del campo interno y soporte permitido después con la misma sesión; consulta también el perfil persistido.');requireValue(f.name==='demo.pera'&&f.fieldName==='supportAccess'&&f.accessBefore==='denied'&&f.accessAfter==='allowed'&&f.persistedCapability==='yes','Distingue campo interno, preferencia y efecto real en el recurso restringido.');saved={name:'demo.pera',fieldName:'supportAccess',accessBefore:'denied',accessAfter:'allowed',persistedCapability:'yes'};resource='/api/support/summary';}
  if(n===14){
    requireValue(events.some(e=>e.kind==='support'&&e.status===200&&e.identity==='soporte.vera')&&events.some(e=>e.kind==='support'&&e.status===401&&e.identity==='anonymous')&&events.some(e=>e.kind==='support'&&e.status===403&&e.identity==='demo.pera')&&events.some(e=>e.kind==='integration-preview'&&e.status===400&&e.internalDetail)&&events.some(e=>e.kind==='missing-product'&&e.status===404)&&events.some(e=>e.kind==='legacy-support'&&e.status===200&&e.allowed===false),'Faltan respuestas reales de los seis casos: soporte válido, sin sesión, sin permiso, formato de referencia incorrecto, recurso ausente y denegación con200.');
    requireValue(f.allowedStatus===200&&f.anonymousStatus===401&&f.forbiddenStatus===403&&f.invalidStatus===400&&f.missingStatus===404&&f.legacyStatus===200&&f.legacyMeaning==='denied'&&f.internalDetail==='mercurio/catalog','Contrasta código y contenido: hay dos200 con significados diferentes y un detalle interno innecesario.');
    saved={allowedStatus:200,anonymousStatus:401,forbiddenStatus:403,invalidStatus:400,missingStatus:404,legacyStatus:200,legacyMeaning:'denied',internalDetail:'mercurio/catalog'};identity='soporte.vera / demo.pera / anonymous';resource='/api/integration/preview';
  }
  if(n===15){
    requireValue(entry.comparisonRunId,'Prepara la copia corregida propuesta antes de contrastar las parejas.',409);
    const corrected=await eventsFor(entry.comparisonRunId);requireValue(corrected.run.campaign===c.id&&corrected.run.generation===c.generation&&corrected.run.chapter===15,'La comparación pertenece a otra ejecución.',409);
    requireValue(orderPair(events,false)&&escalation(events),'En la práctica falta reproducir acceso ajeno y cambio de capacidad con sus controles previos.');
    requireValue(orderPair(corrected.events,true)&&preferencePair(corrected.events)&&blockedEscalation(corrected.events),'En la copia corregida comprueba pedido propio, ajeno denegado, preferencia persistida y capacidad bloqueada sin cambiar el perfil.');
    requireValue(f.ownAccess==='allowed'&&f.foreignAccess==='denied'&&f.preferenceResult==='saved'&&f.permissionResult==='blocked','Completa las cuatro conclusiones de las parejas de pruebas.');
    saved={ownAccess:'allowed',foreignAccess:'denied',preferenceResult:'saved',permissionResult:'blocked'};identity='Alba / demo.pera';refs=[...events,...corrected.events];
  }
  return {id:randomUUID(),chapter:n,campaignId:c.id,runId:entry.runId,generation:c.generation,virtualTime:`Día0 · revisión después de las10:00 · expediente${n}`,identity,resource:storeOrigin+resource,requestRefs:refs.slice(-500).map(e=>e.requestId),expected:redactLabText(text(input.expected)),observed:redactLabText(text(input.observed)),kind:'observed',fields:saved};
}
export async function verifyActThreeCorrection(runId:string,n:number):Promise<PatchReport>{
  requireValue(browserAvailable(),'Instala Chromium para comprobar la corrección.',503);
  const copy=await control(`/runs/${runId}/comparison`,{}),origin=process.env.UG_EVALUATOR_STORE_ORIGIN??storeOrigin;
  let browser:Awaited<ReturnType<typeof chromium.launch>>|undefined;const checks:string[]=[];
  try{
    browser=await chromium.launch({headless:true});const context=await browser.newContext(),page=await context.newPage();await page.goto(origin+'/launch?ticket='+copy.ticket);
    const login=async(name:string)=>{const a=fixtures.accounts.find((a:any)=>a.name===name);const response=await context.request.post(origin+'/api/login',{headers:{Origin:storeOrigin},data:{username:a.name,password:a.password}});requireValue(response.ok(),'No entra la cuenta de control autorizada.',409);};
    const patch=(body:any)=>context.request.patch(origin+'/api/profile',{headers:{Origin:storeOrigin},data:body});
    if(n===13||n===15){
      await login('demo.pera');requireValue((await patch({notificationPreference:'daily'})).status()===200,'La preferencia legítima dejó de guardarse.',409);
      requireValue((await patch({supportAccess:true})).status()===400,'El campo interno sigue modificable.',409);
      const profile=await(await context.request.get(origin+'/api/me')).json();requireValue(profile.notificationPreference==='daily'&&profile.supportAccess===false,'El perfil corregido no conserva preferencias y capacidades esperadas.',409);
      requireValue((await context.request.get(origin+'/api/support/summary')).status()===403,'La cuenta cliente conserva acceso indebido a soporte.',409);
      await page.reload();await page.locator('[data-profile="user-demo-pera"]').waitFor();requireValue(await page.locator('[data-support-access]').textContent()==='No','La página no refleja el perfil corregido.',409);
      checks.push('Preferencia daily se guarda y persiste','Campo interno rechazado sin conceder soporte','Cliente sigue sin acceso al recurso restringido');
    }
    if(n===14||n===15){
      await login('demo.pera');const valid=await context.request.post(origin+'/api/integration/preview',{headers:{Origin:storeOrigin},data:{reference:'CAT-6'}}),invalid=await context.request.post(origin+'/api/integration/preview',{headers:{Origin:storeOrigin},data:{reference:7}});const body=await invalid.json();
      requireValue(valid.status()===200&&invalid.status()===400&&!('internalRoute'in body)&&!('trace'in body),'La corrección de errores no conserva el uso legítimo o filtra detalles.',409);checks.push('Referencia válida conserva resultado útil','Referencia mal formada recibe400 sin ruta ni traza interna');
    }
    if(n===15){
      await login('Alba');const own=await context.request.get(origin+'/api/orders?id=203'),foreign=await context.request.get(origin+'/api/orders?id=204');const body=await foreign.json();requireValue(own.status()===200&&foreign.status()===403&&!('items'in body)&&!('ownerId'in body),'No se preserva propiedad y acceso legítimo.',409);
      await login('Bruno');requireValue((await context.request.get(origin+'/api/orders?id=204')).status()===200,'Bruno no conserva su pedido.',409);
      await login('soporte.vera');requireValue((await context.request.get(origin+'/api/support/summary')).status()===200,'La cuenta de soporte legítima no conserva su función.',409);
      checks.push('Alba conserva203 y no recibe datos de204','Bruno conserva204 sin cambiar propietario','Cuenta de soporte autorizada conserva su función');
    }
    return {runId,engine:'Chromium aislado',checks,at:new Date().toISOString(),scope:n===15?'Parejas comprobadas de forma independiente; controles consolidados en el estado principal de la campaña.':'Propuesta en copia separada; práctica original conservada.'};
  }finally{await browser?.close();await control(`/runs/${copy.runId}/retire`,{});}
}
