import assert from 'node:assert/strict';
import { makeClient } from './lab.ts';
import { prepare,finish } from './complete-act-one.ts';
import { login,completeActTwo } from './complete-act-two.ts';
export const fields:Record<number,Record<string,string|number>>={12:{name:'demo.pera',preference:'daily'},13:{name:'demo.pera',fieldName:'supportAccess',accessBefore:'denied',accessAfter:'allowed',persistedCapability:'yes'},14:{allowedStatus:200,anonymousStatus:401,forbiddenStatus:403,invalidStatus:400,missingStatus:404,legacyStatus:200,legacyMeaning:'denied',internalDetail:'mercurio/catalog'},15:{ownAccess:'allowed',foreignAccess:'denied',preferenceResult:'saved',permissionResult:'blocked'}};
export const patch=(store:ReturnType<typeof makeClient>,body:unknown)=>store.request('/api/profile',body,{},'PATCH');
export async function preference(store:ReturnType<typeof makeClient>){assert.equal((await patch(store,{notificationPreference:'daily'})).status,200);assert.equal((await store.request('/api/me')).data.notificationPreference,'daily');}
export async function escalate(store:ReturnType<typeof makeClient>){await login(store,'demo.pera');assert.equal((await store.request('/api/support/summary')).status,403);assert.equal((await patch(store,{supportAccess:true})).status,200);assert.equal((await store.request('/api/me')).data.supportAccess,true);assert.equal((await store.request('/api/support/summary')).status,200);}
export async function exercise(c:ReturnType<typeof makeClient>,origin:string,n:number){
 const store=await prepare(c,origin,n);let observed=fields[n];
 if(n===11){await login(store,'Alba');const a=await store.request('/api/orders?id=204'),b=await store.request('/api/orders?id=204');observed={actorName:'Alba',method:'GET',resource:origin+'/api/orders?id=204',requestOne:a.headers.get('x-lab-request')!,requestTwo:b.headers.get('x-lab-request')!};}
 if(n===12){await login(store,'demo.pera');await preference(store);}
 if(n===13)await escalate(store);
 if(n===14){await login(store,'soporte.vera');await store.request('/api/support/summary');await store.request('/api/logout',{});await store.request('/api/support/summary');await login(store,'demo.pera');await store.request('/api/support/summary');await store.request('/api/integration/preview',{reference:7});await store.request('/api/products?id=999');await store.request('/api/legacy/support');}
 return {store,fields:observed};
}
export async function toChapter(c:ReturnType<typeof makeClient>,origin:string,target:number){await completeActTwo(c,origin);for(let n=11;n<target;n++){const result=await exercise(c,origin,n);await finish(c,n,result.fields);}}
