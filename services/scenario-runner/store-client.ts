import { controlOrigin, serviceKey } from '../../shared/runtime.ts';
import { HttpError } from '../../shared/http.ts';
import type { StoreEvent } from '../../shared/types.ts';
export async function control<T=any>(path:string,body?:unknown):Promise<T> {
  let response:Response;
  try {response=await fetch(controlOrigin+path,{method:body===undefined?'GET':'POST',headers:{Authorization:`Bearer ${serviceKey()}`,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(8000)});}
  catch {throw new HttpError(503,'La tienda no responde. Comprueba que el servicio está iniciado; no has perdido tu progreso.');}
  const data=await response.json() as any;
  if(!response.ok)throw new HttpError(response.status,data.error??'El escenario no está disponible.');return data;
}
export const eventsFor=(runId:string)=>control<{events:StoreEvent[];run:{id:string;campaign:string;generation:number;chapter:number;corrected:number;demo_nonce:string}}>(`/runs/${runId}/events`);
