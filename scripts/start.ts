import { IMPLEMENTED_CHAPTERS } from '../shared/campaign.ts';
import { existsSync,mkdirSync,readFileSync,writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
const directory=resolve('.runtime');mkdirSync(directory,{recursive:true});
const keyPath=resolve(directory,'service.key');
if(!existsSync(keyPath))writeFileSync(keyPath,randomBytes(32).toString('hex'),{mode:0o600,flag:'wx'});
if(!existsSync('dist/classroom/index.html'))throw new Error('Ejecuta npm run build antes de npm start.');
const key=readFileSync(keyPath,'utf8').trim();
const children=['services/store-api/server.ts','services/classroom-api/server.ts'].map(file=>spawn(process.execPath,['--import','tsx',file],{stdio:'inherit',env:{...process.env,UG_SERVICE_KEY:key}}));
let stopping=false;function stop(){if(stopping)return;stopping=true;children.forEach(c=>c.kill('SIGTERM'));}
for(const signal of ['SIGINT','SIGTERM'] as const)process.on(signal,stop);
children.forEach(c=>c.on('exit',code=>{if(!stopping){process.exitCode=code||1;stop();}}));
console.log(`Laboratorio local · datos ficticios · 01–${String(IMPLEMENTED_CHAPTERS).padStart(2,'0')} implementados · ${IMPLEMENTED_CHAPTERS+1}–50 en diseño.`);
