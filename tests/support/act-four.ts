import assert from 'node:assert/strict';
import { makeClient } from './lab.ts';
import { completeActThree } from './complete-act-three.ts';
import { prepare,finish } from './complete-act-one.ts';
import { login } from './complete-act-two.ts';
import { FORMAT_SAMPLE,demoPayload } from '../../shared/act-four.ts';
export const fields16={name:'demo.pera',productId:2,quantity:0,persisted:'yes'};
export const fields17={input:FORMAT_SAMPLE,literal:'literal',formatted:'strong',execution:'not-demonstrated'};
export async function exercise(c:ReturnType<typeof makeClient>,origin:string,n:number){
 const store=await prepare(c,origin,n),copy=(await store.request('/api/context')).data;let fields:Record<string,string|number>={};
 if(n===16){await login(store,'demo.pera');await store.request('/api/practice/orders',{productId:2,quantity:0});await store.request('/api/practice/orders?id=901');fields=fields16;}
 if(n===17){await login(store,'demo.pera');await store.request('/api/practice/descriptions',{productId:2,value:FORMAT_SAMPLE},{},'PATCH');await store.request('/api/practice/descriptions');fields=fields17;}
 if(n===18){await store.request('/assets/mensaje-leccion.js');await store.request('/practice/frame?'+new URLSearchParams({copy:copy.copyId,mode:'message',mensaje:copy.marker}));fields={marker:copy.marker,entry:'mensaje',transform:'URLSearchParams',destination:'#mensaje',sink:'innerHTML'};}
 if(n===19){const input=demoPayload(copy.demoNonce);await store.request('/practice/frame?'+new URLSearchParams({copy:copy.copyId,mode:'message',mensaje:input}));fields={input,effect:'local-mark'};}
 if(n===20){await login(store,'Alba');const review=await store.request('/api/reviews',{productId:2,text:demoPayload(copy.demoNonce)});assert.equal(review.status,201);await login(store,'Bruno');await store.request('/api/reviews?productId=2');await store.request('/practice/frame?'+new URLSearchParams({copy:copy.copyId,mode:'review',reviewId:review.data.id}));fields={reviewId:review.data.id,authorName:'Alba',readerName:'Bruno',effect:'local-mark'};}
 return {store,copy,fields};
}
export async function toChapter(c:ReturnType<typeof makeClient>,origin:string,n:number){await completeActThree(c,origin);for(let i=16;i<n;i++){const result=await exercise(c,origin,i);await finish(c,i,result.fields);}}
