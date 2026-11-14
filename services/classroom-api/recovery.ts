import { redactLabText } from '../../shared/lab-secrets.ts';
import { IMPLEMENTED_CHAPTERS,PATCH_CHAPTERS } from '../../shared/campaign.ts';
import { randomUUID } from 'node:crypto';
import { requireValue, text } from '../../shared/http.ts';
import type { Campaign, Entry, Note } from '../../shared/types.ts';
/** Una importación es una copia histórica explícita; nunca sobreescribe campaña o generación. */
export function importCampaign(data:any):Campaign {
  requireValue(data?.format==='ug-progress/1'&&[1,2,3,4].includes(data.contentVersion),'La exportación no tiene una versión compatible.');
  const limit=Math.min(data.contentVersion*5,IMPLEMENTED_CHAPTERS);
  const c=data.campaign;
  requireValue(c&&typeof c==='object'&&!Array.isArray(c)&&typeof c.id==='string'&&/^[a-f0-9-]{36}$/.test(c.id),'La campaña de origen no es válida.');
  requireValue(Number.isSafeInteger(c.generation)&&c.generation>=1&&c.entries&&typeof c.entries==='object'&&!Array.isArray(c.entries),'La generación o el progreso no tienen el formato esperado.');
  requireValue(Array.isArray(c.notes)&&c.notes.length<=1000&&Array.isArray(c.patches),'Las notas no tienen el formato esperado.');
  const entries:Record<string,Entry>={},importedId=randomUUID();let previous=true;
  for(const key of Object.keys(c.entries))requireValue(/^(?:[1-9]|1[0-9]|20)$/.test(key)&&Number(key)<=limit,'La exportación incluye capítulos no compatibles con esta versión.');
  for(let n=1;n<=IMPLEMENTED_CHAPTERS;n++){
    const original=c.entries[n];if(!original){previous=false;continue;}
    requireValue(original&&typeof original==='object'&&Array.isArray(original.hints)&&original.hints.every((h:unknown)=>Number.isInteger(h)&&Number(h)>=1&&Number(h)<=4),'Las pistas importadas no son válidas.');
    const completed=original.completed===true;
    requireValue(!completed||previous,'Los capítulos completados no forman una progresión compatible.');
    requireValue(!completed||(original.technical===true&&original.understood===true&&(!PATCH_CHAPTERS.includes(n)||original.patch===true)),'Un logro importado carece de sus comprobaciones históricas.');
    const e:Entry={hints:[...new Set<number>(original.hints)],completed,technical:completed,understood:completed,patch:original.patch===true&&!!original.patchReport&&PATCH_CHAPTERS.includes(n)};
    if(original.prediction)e.prediction=text(original.prediction,512);
    if(original.evidence){
      const source=original.evidence;requireValue(source.chapter===n&&Array.isArray(source.requestRefs)&&source.requestRefs.length<=500,'La evidencia no corresponde a su capítulo.');
      const allowed=['productId','name','method','resource','priceCents','visibleCents','expectedCents','editedText','restoredName','serverName','steps','username','password','userId','cookieName','cookieHttpOnly','accessBefore','accessAfter','actorName','ownOrderId','foreignOrderId','ownerName','controlName','requestOne','requestTwo','preference','fieldName','persistedCapability','allowedStatus','anonymousStatus','forbiddenStatus','invalidStatus','missingStatus','legacyStatus','legacyMeaning','internalDetail','ownAccess','foreignAccess','preferenceResult','permissionResult','quantity','persisted','input','literal','formatted','execution','marker','entry','transform','destination','sink','effect','reviewId','authorName','readerName'];
      requireValue(source.fields&&typeof source.fields==='object'&&!Array.isArray(source.fields),'La evidencia no incluye sus datos estructurados.');
      const fields=Object.fromEntries(Object.entries(source.fields).map(([key,value])=>{requireValue(allowed.includes(key),'La evidencia contiene un campo desconocido.');requireValue((typeof value==='string'&&value.length<=4000)||(typeof value==='number'&&Number.isFinite(value)),'La evidencia contiene un valor no compatible.');return [key,key==='password'?'[credencial ficticia oculta]':value];})) as Record<string,string|number>;
      e.evidence={id:randomUUID(),chapter:n,campaignId:importedId,sourceCampaignId:c.id,runId:'historical-import',generation:1,virtualTime:text(source.virtualTime,200),identity:text(source.identity,100),resource:text(source.resource,300),requestRefs:source.requestRefs.map((v:unknown)=>text(v,100)),expected:redactLabText(text(source.expected)),observed:redactLabText(text(source.observed)),kind:'observed',fields,historical:true};
    }
    if(original.evidence?.verification){const v=original.evidence.verification;requireValue(Array.isArray(v.checks)&&v.checks.length<=10,'La reproducción histórica tiene un formato incorrecto.');if(e.evidence)e.evidence.verification={engine:text(v.engine,100),checks:v.checks.map((x:unknown)=>text(x,300))};}
    if(original.learnedAt)e.learnedAt=text(original.learnedAt,100);
    if(original.patchReport&&PATCH_CHAPTERS.includes(n)&&e.patch){
      const r=original.patchReport;
      requireValue(Array.isArray(r.checks)&&r.checks.length<=10,'El informe de corrección no tiene un formato compatible.');
      e.patchReport={runId:'historical-import',engine:text(r.engine,100),checks:r.checks.map((x:unknown)=>text(x,300)),at:text(r.at,100),...(r.scope?{scope:text(r.scope,500)}:{})};
      for(const key of ['before','after','legitimateProduct','localEditReverted'] as const)if(r[key]!=null)e.patchReport[key]=text(r[key],100);
    }
    entries[n]=e;previous=completed;
  }
  const notes:Note[]=c.notes.map((v:any)=>{requireValue(Number.isInteger(v.chapter)&&v.chapter>=1&&v.chapter<=limit&&['observed','hypothesis','limitation'].includes(v.kind),'Hay una nota con capítulo o categoría no compatible.');return {id:randomUUID(),chapter:v.chapter,expected:redactLabText(text(v.expected)),observed:redactLabText(text(v.observed)),kind:v.kind,at:new Date().toISOString()};});
  requireValue(c.patches.every((p:unknown)=>['price-rendering','credential-resource','demo-account-revoked','order-ownership','profile-allowlist','public-errors','quantity-rule','dom-message-text','review-text'].includes(String(p))),'La exportación contiene una corrección desconocida.');
  return {id:importedId,generation:1,alias:text(c.alias,100).slice(0,32)+' · copia',createdAt:new Date().toISOString(),archived:true,entries,notes,patches:c.patches.filter((p:string)=>p==='price-rendering'?entries[5]?.patch:p==='credential-resource'?entries[6]?.patch:p==='demo-account-revoked'?entries[7]?.patch:p==='quantity-rule'?entries[16]?.patch:p==='dom-message-text'?entries[19]?.patch:p==='review-text'?entries[20]?.patch:entries[15]?.patch),restoreMessage:'Progreso recuperado como copia histórica. No se han concedido logros nuevos.'};
}
