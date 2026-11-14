import { randomBytes, createHash, randomUUID } from 'node:crypto';
import { jsonFile, openDatabase, storeData } from '../../shared/runtime.ts';
import type { Product, StoreEvent } from '../../shared/types.ts';
export const db = openDatabase(storeData);
db.exec(`CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS runs(id TEXT PRIMARY KEY,campaign TEXT NOT NULL,generation INTEGER NOT NULL,chapter INTEGER NOT NULL,corrected INTEGER NOT NULL DEFAULT 0,active INTEGER NOT NULL DEFAULT 1);
CREATE TABLE IF NOT EXISTS tickets(hash TEXT PRIMARY KEY,run TEXT NOT NULL,expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(hash TEXT PRIMARY KEY,run TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS events(seq INTEGER PRIMARY KEY AUTOINCREMENT,run TEXT NOT NULL,data TEXT NOT NULL);`);
// Migración aditiva: no elimina escenarios ni las bases de progreso existentes.
const columns=new Set((db.prepare('PRAGMA table_info(runs)').all() as {name:string}[]).map(r=>r.name));
for(const column of ['resource_clean','account_disabled','orders_checked','profile_allowlist','error_clean','quantity_checked','description_text','message_text','review_text'])if(!columns.has(column))db.exec(`ALTER TABLE runs ADD COLUMN ${column} INTEGER NOT NULL DEFAULT 0`);
if(!columns.has('demo_nonce'))db.exec("ALTER TABLE runs ADD COLUMN demo_nonce TEXT NOT NULL DEFAULT ''");
const fixture = jsonFile('content/es/campaign/fixtures.json');
for (const product of fixture.products) db.prepare('INSERT OR IGNORE INTO products VALUES(?,?)').run(product.id,JSON.stringify(product));
export const hash = (value:string) => createHash('sha256').update(value).digest('hex');
export const token = () => randomBytes(32).toString('hex');
export function product(id:number):Product|undefined {
  const row = db.prepare('SELECT data FROM products WHERE id=?').get(id) as {data:string}|undefined;
  return row ? JSON.parse(row.data) : undefined;
}
export function ticket(run:string) {
  const value=token(); db.prepare('INSERT INTO tickets VALUES(?,?,?)').run(hash(value),run,Date.now()+120_000); return value;
}
export interface Run {id:string;chapter:number;corrected:number;campaign:string;generation:number;resource_clean:number;account_disabled:number;orders_checked:number;profile_allowlist:number;error_clean:number;quantity_checked:number;description_text:number;message_text:number;review_text:number;demo_nonce:string}
export function runForSession(value:string|undefined) {
  if (!value) return undefined;
  return db.prepare('SELECT r.* FROM runs r JOIN sessions s ON s.run=r.id WHERE s.hash=? AND r.active=1').get(hash(value)) as unknown as Run|undefined;
}
export function recordEvent(run:{id:string;corrected:number}, details:Omit<StoreEvent,'seq'|'requestId'|'runId'|'phase'|'at'>) {
  const event:Omit<StoreEvent,'seq'>={...details,requestId:randomUUID(),runId:run.id,phase:run.corrected?'corrected':'legacy',at:new Date().toISOString()};
  db.prepare('INSERT INTO events(run,data) VALUES(?,?)').run(run.id,JSON.stringify(event));return event;
}
export function record(run:{id:string;corrected:number}, p:Product) {
  return recordEvent(run,{kind:'product',productId:p.id,name:p.name,priceCents:p.priceCents,method:'GET',resource:`/api/products?id=${p.id}`,identity:'anonymous',status:200});
}
