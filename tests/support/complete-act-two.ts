import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { makeClient } from './lab.ts';
import { completeActOne,prepare,finish } from './complete-act-one.ts';
const fixture=JSON.parse(await readFile('content/es/campaign/fixtures.json','utf8'));
export const account=(name:string)=>fixture.accounts.find((a:any)=>a.name===name) as {id:string;name:string;password:string};
export async function login(store:ReturnType<typeof makeClient>,name:string){const a=account(name);assert.equal((await store.request('/api/login',{username:a.name,password:a.password})).status,200);}
export async function completeActTwo(c:ReturnType<typeof makeClient>,origin:string){
 await completeActOne(c,origin);
 for(let n=6;n<=10;n++){
  const store=await prepare(c,origin,n),demo=account('demo.pera');
  if(n===6){await store.request('/assets/verano-demo.js');await finish(c,n,{username:demo.name,password:demo.password,resource:origin+'/assets/verano-demo.js'});}
  if(n===7){await login(store,'demo.pera');await store.request('/api/me');await finish(c,n,{userId:demo.id,name:demo.name});}
  if(n===8){await store.request('/api/me');await login(store,'demo.pera');await store.request('/api/me');await finish(c,n,{cookieName:'ug_store',cookieHttpOnly:'yes',accessBefore:'denied',accessAfter:'allowed',name:demo.name});}
  if(n===9){await login(store,'demo.pera');await store.request('/api/me');await store.request('/api/logout',{});await store.request('/api/me');await finish(c,n,{name:demo.name,accessBefore:'allowed',accessAfter:'denied'});}
  if(n===10){await login(store,'Alba');await store.request('/api/me');await store.request('/api/orders?id=203');await store.request('/api/orders?id=204');await store.request('/api/logout',{});await login(store,'Bruno');await store.request('/api/me');await store.request('/api/orders?id=204');await finish(c,n,{actorName:'Alba',ownOrderId:203,foreignOrderId:204,ownerName:'Bruno',controlName:'Bruno',resource:origin+'/api/orders?id=204'});}
 }
}
