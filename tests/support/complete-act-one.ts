import assert from 'node:assert/strict';
import { PATCH_CHAPTERS } from '../../shared/campaign.ts';
import { makeClient } from './lab.ts';
export const evidence=(fields:Record<string,unknown>)=>({expected:'Espero contrastar los datos de esta copia autorizada.',observed:'He conservado una observación y sus peticiones reales.',fields});
export async function prepare(client:ReturnType<typeof makeClient>,storeOrigin:string,n:number){
  const result=await client.request(`/api/chapters/${n}/start`,{prediction:'Creo que puedo contrastar esta hipótesis con las respuestas de la tienda.'});assert.equal(result.status,200,JSON.stringify(result.data));
  const store=makeClient(storeOrigin);assert.equal((await store.request(result.data.launchUrl.replace(storeOrigin,''))).status,302);return store;
}
export async function finish(client:ReturnType<typeof makeClient>,n:number,fields:Record<string,unknown>){
  const validation=await client.request(`/api/chapters/${n}/evidence`,evidence(fields));assert.equal(validation.status,200,JSON.stringify(validation.data));
  if(PATCH_CHAPTERS.includes(n)){const correction=await client.request(`/api/chapters/${n}/correction`,{});assert.equal(correction.status,200,JSON.stringify(correction.data));}
  assert.equal((await client.request(`/api/chapters/${n}/understanding`,{answer:['a','b','c'][(n+1)%3]})).status,200);
}
export async function completeActOne(client:ReturnType<typeof makeClient>,origin:string){
  await client.init();
  for(let n=1;n<=5;n++){
    const store=await prepare(client,origin,n);if(n===1)await store.request('/api/products?id=1');await store.request('/api/products?id=2');if(n===4)await store.request('/api/products?id=2');
    const fields:Record<number,Record<string,unknown>>={1:{productId:2,name:'Pera del huerto'},2:{productId:2,method:'GET',resource:origin+'/api/products?id=2'},3:{productId:2,priceCents:210,visibleCents:240,expectedCents:210},4:{editedText:'Pera de prueba',restoredName:'Pera del huerto',serverName:'Pera del huerto'},5:{productId:2,priceCents:210,visibleCents:240,expectedCents:210,steps:'Abrir ficha2, leer su respuesta y comparar con la hoja y la pantalla.'}};
    await finish(client,n,fields[n]);
  }
}
