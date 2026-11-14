import assert from 'node:assert/strict';
import { makeClient } from './lab.ts';
import { toChapter,preference,patch,escalate,fields } from './act-three.ts';
import { prepare,finish } from './complete-act-one.ts';
import { login } from './complete-act-two.ts';
export async function completeActThree(c:ReturnType<typeof makeClient>,origin:string){
 await toChapter(c,origin,15);const practice=await prepare(c,origin,15);await login(practice,'Alba');await practice.request('/api/orders?id=203');await practice.request('/api/orders?id=204');await escalate(practice);
 const link=await c.request('/api/chapters/15/comparison-link',{});assert.equal(link.status,200);const corrected=makeClient(origin);await corrected.request(link.data.launchUrl.replace(origin,''));await login(corrected,'Alba');await corrected.request('/api/orders?id=203');await corrected.request('/api/orders?id=204');await login(corrected,'demo.pera');await preference(corrected);await patch(corrected,{supportAccess:true});await corrected.request('/api/me');await corrected.request('/api/support/summary');await finish(c,15,fields[15]);
}
