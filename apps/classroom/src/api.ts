let csrf='';
export const setCsrf=(value:string)=>{csrf=value;};
export async function api<T=any>(path:string,body?:unknown):Promise<T>{
  const response=await fetch(path,{method:body===undefined?'GET':'POST',headers:body===undefined?{}:{'Content-Type':'application/json','X-UG-CSRF':csrf},body:body===undefined?undefined:JSON.stringify(body)});
  const data=await response.json();if(!response.ok)throw new Error(data.error??'No se ha podido completar la operación.');return data;
}
