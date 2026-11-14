import { randomBytes,randomUUID,scryptSync,timingSafeEqual } from 'node:crypto';
import { db,hash,token,type Run } from './db.ts';
import { jsonFile } from '../../shared/runtime.ts';
db.exec(`CREATE TABLE IF NOT EXISTS lab_users(run TEXT NOT NULL,id TEXT NOT NULL,name TEXT NOT NULL,salt TEXT NOT NULL,password_hash TEXT NOT NULL,PRIMARY KEY(run,id));
CREATE TABLE IF NOT EXISTS auth_sessions(hash TEXT PRIMARY KEY,ref TEXT NOT NULL UNIQUE,run TEXT NOT NULL,user_id TEXT NOT NULL,revoked INTEGER NOT NULL DEFAULT 0,expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS lab_orders(run TEXT NOT NULL,id INTEGER NOT NULL,owner TEXT NOT NULL,data TEXT NOT NULL,PRIMARY KEY(run,id));`);
const authColumns=new Set((db.prepare('PRAGMA table_info(auth_sessions)').all() as {name:string}[]).map(r=>r.name));
if(!authColumns.has('expires'))db.exec('ALTER TABLE auth_sessions ADD COLUMN expires INTEGER NOT NULL DEFAULT 0');
const userColumns=new Set((db.prepare('PRAGMA table_info(lab_users)').all() as {name:string}[]).map(r=>r.name));
if(!userColumns.has('preference'))db.exec("ALTER TABLE lab_users ADD COLUMN preference TEXT NOT NULL DEFAULT 'none'");
if(!userColumns.has('support_access'))db.exec('ALTER TABLE lab_users ADD COLUMN support_access INTEGER NOT NULL DEFAULT 0');
if(!userColumns.has('role'))db.exec("ALTER TABLE lab_users ADD COLUMN role TEXT NOT NULL DEFAULT 'customer'");
interface AccountFixture {id:string;name:string;password:string;role:string}
export const accountFixtures=jsonFile('content/es/campaign/fixtures.json').accounts as AccountFixture[];
export function seedAccounts(runId:string,chapter:number) {
  if(chapter<7)return;
  const names=chapter>=15?['Alba','Bruno','demo.pera','soporte.vera']:chapter===14?['demo.pera','soporte.vera']:chapter===10||chapter===11?['Alba','Bruno']:chapter===7?['demo.pera','Alba']:['demo.pera'];
  for(const a of accountFixtures.filter(a=>names.includes(a.name))){const salt=randomBytes(16).toString('hex');db.prepare('INSERT INTO lab_users(run,id,name,salt,password_hash,role,support_access) VALUES(?,?,?,?,?,?,?)').run(runId,a.id,a.name,salt,scryptSync(a.password,salt,64).toString('hex'),a.role,a.role==='support'?1:0);}
  if(([10,11].includes(chapter)||chapter>=15)){const fixtures=jsonFile('content/es/campaign/fixtures.json');for(const order of fixtures.orders){const item=fixtures.products.find((p:any)=>p.id===3);const data={...order,customerName:accountFixtures.find(a=>a.id===order.ownerId)!.name,items:[{productId:3,name:item.name,quantity:10,unitPriceCents:item.priceCents}],integration:'Mercurio',demoOnly:true};db.prepare('INSERT INTO lab_orders VALUES(?,?,?,?)').run(runId,order.id,order.ownerId,JSON.stringify(data));}}
}
export function login(run:Run,username:string,password:string){
  const a=db.prepare('SELECT * FROM lab_users WHERE run=? AND lower(name)=lower(?)').get(run.id,username) as {id:string;name:string;salt:string;password_hash:string}|undefined;
  if(!a||run.account_disabled&&a.id==='user-demo-pera')return undefined;
  if(!timingSafeEqual(scryptSync(password,a.salt,64),Buffer.from(a.password_hash,'hex')))return undefined;
  const value=token(),ref=randomUUID();db.prepare('INSERT INTO auth_sessions(hash,ref,run,user_id,expires) VALUES(?,?,?,?,?)').run(hash(value),ref,run.id,a.id,Date.now()+86_400_000);return {value,ref,userId:a.id,name:a.name};
}
export function identity(run:Run,value:string|undefined){
  if(!value)return undefined;
  const found=db.prepare('SELECT s.ref,u.id AS userId,u.name FROM auth_sessions s JOIN lab_users u ON u.id=s.user_id AND u.run=s.run WHERE s.hash=? AND s.run=? AND s.revoked=0 AND s.expires>?').get(hash(value),run.id,Date.now()) as {ref:string;userId:string;name:string}|undefined;
  return found&&!(run.account_disabled&&found.userId==='user-demo-pera')?found:undefined;
}
export function disableAccount(runId:string){db.prepare('UPDATE auth_sessions SET revoked=1 WHERE run=? AND user_id=?').run(runId,'user-demo-pera');}
export function revoke(value:string){db.prepare('UPDATE auth_sessions SET revoked=1 WHERE hash=?').run(hash(value));}
