// Módulo exclusivo de servidor. Nunca importarlo desde las aplicaciones React.
import { jsonFile } from './runtime.ts';
const passwords=jsonFile('content/es/campaign/fixtures.json').accounts.map((a:any)=>a.password) as string[];
export function redactLabText(text:string){return passwords.reduce((result,p)=>result.replaceAll(p,'[credencial ficticia oculta]'),text);}
