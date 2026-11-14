import { readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
export const root = resolve(process.env.UG_ROOT ?? process.cwd());
export function jsonFile<T = any>(path: string): T { return JSON.parse(readFileSync(resolve(root, path), 'utf8')); }
const topology = jsonFile('config/topology.json');
export const classroomOrigin = process.env.UG_CLASSROOM_ORIGIN ?? topology.origins.classroom;
export const storeOrigin = process.env.UG_STORE_ORIGIN ?? topology.origins.storefront;
export const bindAddress = process.env.UG_BIND ?? topology.bindAddress;
export const controlOrigin = process.env.UG_CONTROL_ORIGIN ?? 'http://127.0.0.1:4313';
export function openDatabase(path: string) {
  mkdirSync(dirname(path), {recursive: true});
  const db = new DatabaseSync(path);
  db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
  return db;
}
export const storeData = process.env.UG_STORE_DATA ?? resolve(root, '.runtime/store/store.sqlite');
export const classroomData = process.env.UG_CLASSROOM_DATA ?? resolve(root, '.runtime/classroom/progress.sqlite');
export const serviceKey = () => {
  const key = process.env.UG_SERVICE_KEY ?? readFileSync(process.env.UG_SERVICE_KEY_FILE ?? resolve(root, '.runtime/service.key'), 'utf8').trim();
  if (key.length < 32) throw new Error('Falta la clave interna del laboratorio. Inicia con npm start.');
  return key;
};
