import { randomUUID } from 'node:crypto';
import { chromium } from 'playwright';
import { jsonFile,storeOrigin } from '../../shared/runtime.ts';
import { requireValue,text } from '../../shared/http.ts';
import type { Campaign,Evidence,StoreEvent,PatchReport } from '../../shared/types.ts';
import { control,eventsFor } from './store-client.ts';
import { browserAvailable } from './act-one.ts';
const fixtures=jsonFile('content/es/campaign/fixtures.json');
const demo=fixtures.accounts.find((a:any)=>a.name==='demo.pera');
const redact=(value:string)=>fixtures.accounts.reduce((v:string,a:any)=>v.replaceAll(a.password,'[credencial ficticia oculta]'),value);
export async function validateActTwo(c:Campaign,n:number,input:any):Promise<Evidence>{
  const entry=c.entries[n];requireValue(entry?.runId&&entry.prediction,'Prepara este escenario con una predicción.',409);
  const {run,events}=await eventsFor(entry.runId);
  requireValue(run.campaign===c.id&&run.generation===c.generation&&run.chapter===n,'Esta prueba no pertenece a la ejecución activa.',409);
  const fields=input.fields;requireValue(fields&&typeof fields==='object'&&!Array.isArray(fields),'Completa los datos concretos de tu observación.');
  let refs:StoreEvent[]=[],identity='anonymous',resource='';let saved:Record<string,string|number>={};
  const profiles=events.filter(e=>e.kind==='profile'),logins=events.filter(e=>e.kind==='login'&&e.status===200);
  if(n===6){
    refs=events.filter(e=>e.kind==='campaign-resource'&&e.resource==='/assets/verano-demo.js');requireValue(refs.length,'Falta una petición real al archivo público de la campaña.');
    requireValue(fields.username===demo.name&&fields.password===demo.password&&fields.resource===storeOrigin+'/assets/verano-demo.js','Contrasta usuario, contraseña ficticia y dirección del recurso que los contiene.');
    resource='/assets/verano-demo.js';saved={username:demo.name,password:'[credencial ficticia oculta]',resource:fields.resource};
  }
  if(n===7){
    const profile=profiles.find(p=>p.status===200&&p.userId===demo.id&&logins.some(l=>l.authSessionRef===p.authSessionRef&&l.seq<p.seq));
    requireValue(profile,'Falta un inicio de sesión real de demo.pera y una consulta posterior de su perfil con la misma sesión.');
    requireValue(fields.userId===demo.id&&fields.name===demo.name,'Comprueba el identificador y el nombre recibidos del perfil.');
    refs=events.filter(e=>e.authSessionRef===profile.authSessionRef);identity=demo.name;resource='/api/me';saved={userId:fields.userId,name:fields.name};
  }
  if(n===8){
    const login=logins.find(l=>l.userId===demo.id&&profiles.some(p=>p.status===401&&p.seq<l.seq));
    const after=login&&profiles.find(p=>p.status===200&&p.authSessionRef===login.authSessionRef&&p.seq>login.seq);
    requireValue(login&&after,'Compara el perfil sin sesión antes del acceso y el perfil de demo.pera después de entrar.');
    requireValue(fields.cookieName==='ug_store'&&fields.cookieHttpOnly==='yes'&&fields.accessBefore==='denied'&&fields.accessAfter==='allowed'&&fields.name===demo.name,'Revisa nombre de cookie, atributo HttpOnly e identidad. No copies el valor de la cookie ni lo confundas con la contraseña.');
    refs=events;identity=demo.name;resource='/api/me';saved={cookieName:'ug_store',cookieHttpOnly:'yes',accessBefore:'denied',accessAfter:'allowed',name:demo.name};
  }
  if(n===9){
    const logout=events.find(e=>e.kind==='logout'&&e.userId===demo.id&&e.revoked&&profiles.some(p=>p.status===200&&p.authSessionRef===e.authSessionRef&&p.seq<e.seq));
    requireValue(logout&&profiles.some(p=>p.status===401&&p.seq>logout.seq),'Falta consultar el perfil, cerrar esa sesión y volver a pedir el perfil con acceso denegado.');
    requireValue(fields.name===demo.name&&fields.accessBefore==='allowed'&&fields.accessAfter==='denied','Compara acceso permitido antes y denegado después mediante peticiones nuevas.');
    refs=events;identity='demo.pera → anonymous';resource='/api/me';saved={name:demo.name,accessBefore:'allowed',accessAfter:'denied'};
  }
  if(n===10){
    const orders=events.filter(e=>e.kind==='order'&&e.status===200);
    const foreign=orders.find(e=>e.orderId===204&&e.userId==='user-alba'&&e.ownerId==='user-bruno'&&orders.some(p=>p.orderId===203&&p.userId==='user-alba'&&p.ownerId==='user-alba'&&p.authSessionRef===e.authSessionRef&&p.seq<e.seq));
    const owner=orders.find(e=>e.orderId===204&&e.userId==='user-bruno'&&e.ownerId==='user-bruno');
    requireValue(foreign&&owner&&profiles.some(p=>p.userId==='user-alba'&&p.authSessionRef===foreign.authSessionRef&&p.seq<foreign.seq)&&profiles.some(p=>p.userId==='user-bruno'&&p.authSessionRef===owner.authSessionRef&&p.seq<owner.seq),'Necesitamos identidad Alba, pedido propio203 y ajeno204 sin cambiar su sesión; después contrasta204 con identidad Bruno.');
    requireValue(fields.actorName==='Alba'&&fields.ownOrderId===203&&fields.foreignOrderId===204&&fields.ownerName==='Bruno'&&fields.controlName==='Bruno'&&fields.resource===storeOrigin+'/api/orders?id=204','Identifica la cuenta que recibió los datos, los dos pedidos, su propietario y el recurso exacto.');
    refs=events;identity='Alba / Bruno (control)';resource='/api/orders?id=204';saved={actorName:'Alba',ownOrderId:203,foreignOrderId:204,ownerName:'Bruno',controlName:'Bruno',resource:fields.resource};
  }
  requireValue(refs.length,'Todavía no hay evidencia de este comportamiento.');
  return {id:randomUUID(),chapter:n,campaignId:c.id,runId:entry.runId,generation:c.generation,virtualTime:`Día0 · revisión autorizada · expediente${n}`,identity,resource:storeOrigin+resource,requestRefs:refs.slice(-500).map(e=>e.requestId),expected:redact(text(input.expected)),observed:redact(text(input.observed)),kind:'observed',fields:saved};
}
export async function verifyActTwoCorrection(runId:string,n:number):Promise<PatchReport>{
  requireValue(browserAvailable(),'Instala el navegador de comprobación con npx playwright install chromium.',503);
  const setup=await control(`/runs/${runId}/comparison`,{}),origin=process.env.UG_EVALUATOR_STORE_ORIGIN??storeOrigin;
  let browser:Awaited<ReturnType<typeof chromium.launch>>|undefined;const checks:string[]=[];
  try{
    browser=await chromium.launch({headless:true});
    const context=await browser.newContext(),page=await context.newPage();
    await page.goto(origin+'/launch?ticket='+setup.ticket);
    if(n===6){
      await page.getByRole('heading',{name:'Verano sin colas',exact:true}).waitFor();
      await page.locator('[data-summer-status][data-loaded="yes"]').waitFor();
      const source=await (await context.request.get(origin+'/assets/verano-demo.js')).text();
      requireValue(!source.includes(demo.password)&&!source.includes(demo.name),'El recurso corregido todavía contiene credenciales.',409);
      checks.push('Página de campaña sigue funcionando','Recurso público servido sin usuario ni contraseña de demo.pera');
    }
    if(n===7){
      const denied=await context.request.post(origin+'/api/login',{headers:{Origin:storeOrigin},data:{username:demo.name,password:demo.password}});
      requireValue(denied.status()===401,'La cuenta de pruebas sigue permitiendo acceso en la copia revocada.',409);
      const alba=fixtures.accounts.find((a:any)=>a.name==='Alba');
      const positive=await context.request.post(origin+'/api/login',{headers:{Origin:storeOrigin},data:{username:alba.name,password:alba.password}});requireValue(positive.ok(),'La cuenta autorizada de control no puede entrar.',409);
      await page.reload();await page.locator('[data-profile="user-alba"]').waitFor();
      checks.push('Credencial expuesta no crea sesión en copia corregida','Cuenta autorizada de control conserva acceso real a su perfil');
    }
    if(n===10){
      for(const name of ['Alba','Bruno']){
        const a=fixtures.accounts.find((v:any)=>v.name===name);await context.request.post(origin+'/api/login',{headers:{Origin:storeOrigin},data:{username:a.name,password:a.password}});
        const own=await context.request.get(origin+`/api/orders?id=${name==='Alba'?203:204}`);requireValue(own.status()===200&&(await own.json()).ownerId===a.id,'El acceso propio dejó de funcionar.',409);
        if(name==='Alba'){const wrong=await context.request.get(origin+'/api/orders?id=204');const body=await wrong.json();requireValue(wrong.status()===403&&!('ownerId' in body)&&!('items' in body),'La copia corregida expone el pedido ajeno.',409);}
      }
      await page.goto(origin+'/pedido?id=204');await page.locator('[data-order="204"]').waitFor();
      checks.push('Alba conserva su pedido203','Alba no recibe datos de204','Bruno conserva su pedido204');
    }
    return {runId,engine:'Chromium aislado',checks,at:new Date().toISOString(),scope:n===10?'Propuesta en copia separada. La consolidación del control de pedidos corresponde al expediente15.':'Comparación en copia corregida; la práctica original queda identificada.'};
  }finally{await browser?.close();await control(`/runs/${setup.runId}/retire`,{});}
}
