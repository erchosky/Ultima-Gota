import { IMPLEMENTED_CHAPTERS } from '../../shared/campaign.ts';
import { randomUUID } from 'node:crypto';
import { classroomData, openDatabase } from '../../shared/runtime.ts';
import { requireValue } from '../../shared/http.ts';
import type { Campaign } from '../../shared/types.ts';
export const db=openDatabase(classroomData);
db.exec(`CREATE TABLE IF NOT EXISTS owners(id TEXT PRIMARY KEY,active TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY,owner TEXT NOT NULL,csrf TEXT NOT NULL,professor INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS campaigns(id TEXT PRIMARY KEY,owner TEXT NOT NULL,data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS snapshots(id TEXT PRIMARY KEY,owner TEXT NOT NULL,campaign TEXT NOT NULL,generation INTEGER NOT NULL,data TEXT NOT NULL,reason TEXT NOT NULL);`);
export interface Session {id:string;owner:string;csrf:string;professor:number}
export function freshCampaign(alias='Aprendiz'):Campaign {return {id:randomUUID(),generation:1,alias,createdAt:new Date().toISOString(),archived:false,entries:{},notes:[],patches:[]};}
export function save(owner:string,c:Campaign){db.prepare('INSERT INTO campaigns VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data WHERE owner=excluded.owner').run(c.id,owner,JSON.stringify(c));}
export function createSession():Session {
  const owner=randomUUID(),c=freshCampaign(); const s={id:randomUUID(),owner,csrf:randomUUID(),professor:0};
  db.exec('BEGIN IMMEDIATE');try {save(owner,c);db.prepare('INSERT INTO owners VALUES(?,?)').run(owner,c.id);db.prepare('INSERT INTO sessions VALUES(?,?,?,0)').run(s.id,owner,s.csrf);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}return s;
}
export function session(id:string|undefined):Session|undefined {return id?db.prepare('SELECT * FROM sessions WHERE id=?').get(id) as unknown as Session|undefined:undefined;}
export function campaign(s:Session):Campaign {
  const row=db.prepare('SELECT c.data FROM campaigns c JOIN owners o ON c.id=o.active WHERE o.id=? AND c.owner=?').get(s.owner,s.owner) as {data:string}|undefined;
  requireValue(row,'No se encuentra la campaña. Abre el diagnóstico.',409);return JSON.parse(row.data);
}
export function allCampaigns(s:Session):Campaign[] {return (db.prepare('SELECT data FROM campaigns WHERE owner=?').all(s.owner) as {data:string}[]).map(r=>JSON.parse(r.data));}
export function snapshot(s:Session,c:Campaign,reason:string) {db.prepare('INSERT INTO snapshots VALUES(?,?,?,?,?,?)').run(randomUUID(),s.owner,c.id,c.generation,JSON.stringify(c),reason);}
export function activate(s:Session,c:Campaign) {
  db.exec('BEGIN IMMEDIATE');try {const old=campaign(s);old.archived=true;save(s.owner,old);c.archived=false;save(s.owner,c);db.prepare('UPDATE owners SET active=? WHERE id=?').run(c.id,s.owner);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
}
export function activeChapter(c:Campaign) {for(let n=1;n<=IMPLEMENTED_CHAPTERS;n++)if(!c.entries[n]?.completed)return n;return IMPLEMENTED_CHAPTERS+1;}
export function entry(c:Campaign,n:number){return c.entries[n]??={hints:[]};}
