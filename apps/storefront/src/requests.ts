export interface RequestTemplate {method:string;path:string;body:string}
export interface ObservedRequest extends RequestTemplate {requestId:string;status:number;response:string}
export function templates(chapter:number):RequestTemplate[]{
  if(chapter===16)return [{method:'POST',path:'/api/practice/orders',body:'{"productId":2,"quantity":1}'},{method:'GET',path:'/api/practice/orders?id=901',body:''}];
  if(chapter===17)return [{method:'PATCH',path:'/api/practice/descriptions',body:'{"productId":2,"value":"PERA"}'},{method:'GET',path:'/api/practice/descriptions',body:''}];
  if(chapter===20)return [{method:'POST',path:'/api/reviews',body:'{"productId":2,"text":"Una reseña de prueba."}'},{method:'GET',path:'/api/reviews?productId=2',body:''}];
  if(chapter===11)return [{method:'GET',path:'/api/orders?id=204',body:''},{method:'GET',path:'/api/orders?id=203',body:''}];
  const items:RequestTemplate[]=[{method:'GET',path:'/api/me',body:''},{method:'PATCH',path:'/api/profile',body:'{"notificationPreference":"none"}'}];
  if(chapter>=13)items.push({method:'GET',path:'/api/support/summary',body:''});
  if(chapter>=14)items.push({method:'POST',path:'/api/integration/preview',body:'{"reference":"CAT-6"}'},{method:'GET',path:'/api/products?id=999',body:''},{method:'GET',path:'/api/legacy/support',body:''});
  if(chapter===15)items.push({method:'GET',path:'/api/orders?id=203',body:''},{method:'GET',path:'/api/orders?id=204',body:''});
  return items;
}
const key=(copy:string)=>'ug-requests/'+copy;
export function history(copy:string):ObservedRequest[]{try{return JSON.parse(sessionStorage.getItem(key(copy))??'[]');}catch{return [];}}
export function labRequest(copy:string,chapter:number,request:RequestTemplate):Promise<ObservedRequest>{
  if(!templates(chapter).some(t=>t.path===request.path&&t.method===request.method))return Promise.reject(new Error('Esta mesa solo envía los recursos previstos del expediente.'));
  return new Promise((resolve,reject)=>{
    const xhr=new XMLHttpRequest();xhr.open(request.method,request.path,true);xhr.withCredentials=true;xhr.timeout=10000;xhr.setRequestHeader('X-UG-Copy',copy);
    if(request.method!=='GET')xhr.setRequestHeader('Content-Type','application/json');
    xhr.onerror=()=>reject(new Error('No llega la respuesta. Revisa el diagnóstico del laboratorio.'));xhr.ontimeout=()=>reject(new Error('La tienda no respondió a tiempo.'));
    xhr.onload=()=>{const observation={...request,requestId:xhr.getResponseHeader('X-Lab-Request')??'',status:xhr.status,response:xhr.responseText};const all=history(copy);sessionStorage.setItem(key(copy),JSON.stringify([...all,observation].slice(-30)));resolve(observation);};
    xhr.send(request.method==='GET'?null:request.body);
  });
}
