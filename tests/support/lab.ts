import { spawn } from 'node:child_process';
import { mkdtemp,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { createServer } from 'node:net';
import { randomBytes } from 'node:crypto';
export async function freePort(){const server=createServer();await new Promise<void>(r=>server.listen(0,'127.0.0.1',r));const port=(server.address() as {port:number}).port;await new Promise<void>(r=>server.close(()=>r()));return port;}
export async function startLab(){
  const [a,b,c]=await Promise.all([freePort(),freePort(),freePort()]);
  const directory=await mkdtemp(resolve(tmpdir(),'ultima-gota-test-'));
  const classroom=`http://localhost:${a}`,store=`http://127.0.0.1:${b}`,control=`http://127.0.0.1:${c}`,key=randomBytes(32).toString('hex');
  const env={...process.env,UG_ROOT:process.cwd(),UG_CLASSROOM_ORIGIN:classroom,UG_STORE_ORIGIN:store,UG_CONTROL_ORIGIN:control,UG_CONTROL_PORT:String(c),UG_SERVICE_KEY:key,UG_CLASSROOM_DATA:resolve(directory,'classroom/progress.sqlite'),UG_STORE_DATA:resolve(directory,'store/store.sqlite'),UG_PROFESSOR_CODE:'DEMO-professor-test-code'};
  let logs='';
  function boot(file:string){const child=spawn(process.execPath,['--import','tsx',file],{env,stdio:['ignore','pipe','pipe']});child.stdout.on('data',v=>{logs+=String(v).replaceAll(env.UG_PROFESSOR_CODE,'[código local]');});child.stderr.on('data',v=>{logs+=v;});return child;}
  let children=[boot('services/store-api/server.ts'),boot('services/classroom-api/server.ts')];
  async function ready(){for(let i=0;i<80;i++){try{if((await fetch(classroom+'/health')).ok&&(await fetch(store+'/health')).ok)return;}catch{}await new Promise(r=>setTimeout(r,100));}throw new Error('No arranca laboratorio de pruebas: '+logs);}
  async function stopChildren(){await Promise.all(children.map(child=>new Promise<void>(r=>{if(child.exitCode!==null){r();return;}child.once('exit',()=>r());child.kill('SIGTERM');})));}
  await ready();
  return {classroom,store,control,directory,logs:()=>logs,professorCode:env.UG_PROFESSOR_CODE,
    restart:async()=>{await stopChildren();children=[boot('services/store-api/server.ts'),boot('services/classroom-api/server.ts')];await ready();},
    stop:async()=>{await stopChildren();await rm(directory,{recursive:true,force:true});}};
}
export function makeClient(origin:string){
  const jar=new Map<string,string>();let csrf='';
  const cookies=()=>Array.from(jar,([k,v])=>k+'='+v).join('; ');
  return {get cookie(){return cookies();},get csrf(){return csrf;},
    async request(path:string,body?:unknown,extra:Record<string,string>={},method?:string){
      const response=await fetch(origin+path,{method:method??(body===undefined?'GET':'POST'),headers:{...(cookies()?{Cookie:cookies()}:{}),...(body===undefined?{}:{Origin:origin,'Content-Type':'application/json','X-UG-CSRF':csrf}),...extra},body:body===undefined?undefined:JSON.stringify(body),redirect:'manual'});
      for(const set of response.headers.getSetCookie()){const pair=set.split(';')[0],index=pair.indexOf('=');const name=pair.slice(0,index),value=pair.slice(index+1);if(value)jar.set(name,value);else jar.delete(name);}
      const raw=await response.text();let data:any;try{data=JSON.parse(raw);}catch{data=raw;}
      if(data?.csrf)csrf=data.csrf;
      return {status:response.status,data,headers:response.headers};
    },
    async init(){return this.request('/api/state');}
  };
}
