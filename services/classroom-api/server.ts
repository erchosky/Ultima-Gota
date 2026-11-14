import { redactLabText } from '../../shared/lab-secrets.ts';
import express, { type Request,type RequestHandler } from 'express';
import { resolve } from 'node:path';
import { randomBytes,randomUUID } from 'node:crypto';
import { bindAddress,classroomOrigin,root,storeOrigin,jsonFile } from '../../shared/runtime.ts';
import { cookie,equalSecret,errorHandler,HttpError,requireValue,text } from '../../shared/http.ts';
import * as repo from './repository.ts';
import { authorChapter,chapterView,correctAnswer,teacherChapter } from './content.ts';
import { control } from '../scenario-runner/store-client.ts';
import { validate,verifyCorrection,browserAvailable } from '../scenario-runner/act-one.ts';
import { validateActFour,verifyActFourCorrection } from '../scenario-runner/act-four.ts';
import { validateActThree,verifyActThreeCorrection } from '../scenario-runner/act-three.ts';
import { validateActTwo,verifyActTwoCorrection } from '../scenario-runner/act-two.ts';
import { IMPLEMENTED_CHAPTERS,CONTENT_VERSION,PATCH_CHAPTERS } from '../../shared/campaign.ts';
import { importCampaign } from './recovery.ts';
const app=express();app.disable('x-powered-by');app.use(express.json({limit:'2mb'}));
const professorCode=process.env.UG_PROFESSOR_CODE??randomBytes(8).toString('hex');
console.log(`Acceso local de profesor (solo si lo eliges): ${professorCode}`);
app.use((req,res,next)=>{
  requireValue(req.headers.host===new URL(classroomOrigin).host,'Abre el escritorio desde '+classroomOrigin+'. El host de la tienda no comparte esta sesión.',403);
  res.set({'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"});next();
});
app.get('/health',(_req,res)=>res.json({ok:true,service:'classroom',contentVersion:CONTENT_VERSION}));
const requestSessions=new WeakMap<Request,repo.Session>();
function getSession(req:Request){const s=requestSessions.get(req)??repo.session(cookie(req,'ug_classroom'));requireValue(s,'La sesión del escritorio ha caducado. Recarga para recuperar tu campaña.',401);return s;}
app.use('/api',(req,res,next)=>{
  let s=repo.session(cookie(req,'ug_classroom'));
  if(!s&&req.method==='GET'&&req.path==='/state'){s=repo.createSession();res.cookie('ug_classroom',s.id,{httpOnly:true,sameSite:'strict',path:'/',maxAge:31_536_000_000});}
  requireValue(s,'Recarga el escritorio para iniciar la sesión.',401);
  requestSessions.set(req,s);
  if(req.method!=='GET'){
    requireValue(req.headers.origin===classroomOrigin,'Esta operación debe iniciarse desde el escritorio autorizado.',403);
    requireValue(req.is('application/json'),'Utiliza el formulario JSON del escritorio.',415);
    requireValue(equalSecret(req.headers['x-ug-csrf'] as string,s.csrf),'La protección del formulario ha cambiado. Recarga y vuelve a intentarlo.',403);
  }
  next();
});
// Mantener el turno hasta acabar el trabajo, incluso si la pestaña cierra la conexión.
const queues=new Map<string,Promise<void>>();
function post(path:string,handler:RequestHandler){
  app.post(path,async(req,res,next)=>{
    const {owner}=getSession(req),prior=queues.get(owner)??Promise.resolve();
    let release!:()=>void;const current=new Promise<void>(r=>{release=r;});queues.set(owner,current);
    await prior;
    try{await handler(req,res,next);}catch(error){next(error);}
    finally{release();if(queues.get(owner)===current)queues.delete(owner);}
  });
}
app.get('/api/state',(req,res)=>{
  const s=getSession(req),c=repo.campaign(s),active=repo.activeChapter(c);
  res.json({csrf:s.csrf,campaign:c,active,implementedChapters:IMPLEMENTED_CHAPTERS,storeOrigin,professor:!!s.professor,chapters:Array.from({length:IMPLEMENTED_CHAPTERS},(_,i)=>({number:i+1,title:i+1<=active?authorChapter(i+1).title:'Expediente bloqueado',unlocked:i+1<=active,completed:!!c.entries[i+1]?.completed})),archives:repo.allCampaigns(s).filter(x=>x.id!==c.id).map(x=>({id:x.id,alias:x.alias,createdAt:x.createdAt,generation:x.generation}))});
});
app.get('/api/chapters/:n',(req,res)=>res.json(chapterView(repo.campaign(getSession(req)),Number(req.params.n))));
app.get('/api/glossary',(req,res)=>{const c=repo.campaign(getSession(req)),max=Math.min(repo.activeChapter(c),IMPLEMENTED_CHAPTERS);res.json(jsonFile<any[]>('content/es/glossary/terms.json').filter(t=>Number(t.introducedIn.slice(3))<=max));});
app.get('/api/diagnostics',async(req,res)=>{
  const c=repo.campaign(getSession(req));let store=false;try{const health=await control('/health');store=health.ok===true&&health.dataMatch===true;}catch{}
  const needsBrowser=PATCH_CHAPTERS.includes(repo.activeChapter(c)),available=browserAvailable();
  res.json({ok:store&&(!needsBrowser||available),checks:[{label:store?'La tienda responde y sus datos coinciden':'La tienda no responde o sus datos no corresponden al escenario',ok:store},{label:'Progreso independiente disponible',ok:true},...(needsBrowser?[{label:available?'Navegador de comprobación instalado':'Falta el navegador de comprobación: ejecuta npx playwright install chromium',ok:available}]:[])],campaignId:c.id,generation:c.generation,origins:{classroom:classroomOrigin,store:storeOrigin},limits:['No detectamos tu pestaña de herramientas ni la configuración de un proxy.','Si usas proxy, distingue su error de un servicio caído o una sesión reiniciada.']});
});
post('/api/profile',(req,res)=>{const s=getSession(req),c=repo.campaign(s);c.alias=text(req.body.alias,40);repo.save(s.owner,c);res.json({ok:true});});
function chapterContext(req:Request){const s=getSession(req),c=repo.campaign(s),n=Number(req.params.n);chapterView(c,n);return {s,c,n,e:repo.entry(c,n)};}
post('/api/chapters/:n/start',async(req,res)=>{
  const {s,c,n,e}=chapterContext(req);const prediction=text(req.body.prediction,512);
  const health=await control('/health');requireValue(health.ok&&health.scenarioVersion===1&&health.dataMatch,'Los datos de la tienda no corresponden a la versión de este escenario. Conservamos tu progreso; revisa el diagnóstico.',409);
  const setup=await control('/prepare',{campaignId:c.id,generation:c.generation,chapter:n,worldPatches:c.patches});
  e.runId=setup.runId;e.comparisonRunId=undefined;e.prediction=prediction;if(!e.completed){e.technical=false;e.understood=false;e.evidence=undefined;}
  repo.save(s.owner,c);res.json({launchUrl:storeOrigin+'/launch?ticket='+setup.ticket,message:'Escenario preparado. Se conservan tus notas y logros anteriores.'});
});
post('/api/chapters/:n/launch',async(req,res)=>{const {e}=chapterContext(req);requireValue(e.runId,'Prepara primero este escenario.',409);const {ticket}=await control(`/runs/${e.runId}/ticket`,{});res.json({launchUrl:storeOrigin+'/launch?ticket='+ticket});});
app.get('/api/chapters/:n/hints/:level',(req,res)=>{const {n,e}=chapterContext(req),level=Number(req.params.level);requireValue(Number.isInteger(level)&&e.hints.includes(level),'Solicita primero esa pista desde el expediente.',403);res.json(jsonFile(`content/es/chapters/chapter-${String(n).padStart(2,'0')}/hint-${level}.json`));});
post('/api/chapters/:n/hints',(req,res)=>{const {s,c,n,e}=chapterContext(req),level=Number(req.body.level);requireValue(Number.isInteger(level)&&level>=1&&level<=4,'Elige una pista del1 al4.');if(!e.hints.includes(level))e.hints.push(level);repo.save(s.owner,c);res.json(jsonFile(`content/es/chapters/chapter-${String(n).padStart(2,'0')}/hint-${level}.json`));});
post('/api/chapters/:n/evidence',async(req,res)=>{const {s,c,n,e}=chapterContext(req);const evidence=await (n<=5?validate:n<=10?validateActTwo:n<=15?validateActThree:validateActFour)(c,n,req.body);e.evidence=evidence;e.technical=true;repo.save(s.owner,c);res.json({message:'Comportamiento contrastado con peticiones de esta ejecución.',evidence});});
post('/api/chapters/:n/correction',async(req,res)=>{
  const {s,c,n,e}=chapterContext(req);requireValue(PATCH_CHAPTERS.includes(n)&&e.technical&&e.runId,'Primero contrasta la evidencia de este expediente.',409);
  requireValue(e.evidence?.runId===e.runId,'Contrasta una evidencia de esta ejecución antes de comprobar la corrección.',409);
  const report=e.patchReport?.runId===e.runId?e.patchReport:await (n===5?verifyCorrection(e.runId):n<=10?verifyActTwoCorrection(e.runId,n):n<=15?verifyActThreeCorrection(e.runId,n):verifyActFourCorrection(e.runId,n));e.patch=true;e.patchReport=report;const patch=n===5?'price-rendering':n===6?'credential-resource':n===7?'demo-account-revoked':null;if(patch&&!c.patches.includes(patch))c.patches.push(patch);if(n===15)for(const control of ['order-ownership','profile-allowlist','public-errors'])if(!c.patches.includes(control))c.patches.push(control);
  const more=n===16?'quantity-rule':n===19?'dom-message-text':n===20?'review-text':null;if(more&&!c.patches.includes(more))c.patches.push(more);
  repo.save(s.owner,c);res.json({message:'Corrección comprobada en navegador aislado.',report});
});
post('/api/chapters/:n/comparison-link',async(req,res)=>{const {s,c,n,e}=chapterContext(req);requireValue(n===15&&e.runId,'Prepara el expediente15 antes de comparar versiones.',409);let setup;if(e.comparisonRunId){setup=await control(`/runs/${e.comparisonRunId}/ticket`,{});}else{setup=await control(`/runs/${e.runId}/comparison`,{});e.comparisonRunId=setup.runId;repo.save(s.owner,c);}res.json({launchUrl:storeOrigin+'/launch?ticket='+setup.ticket,message:'Copia corregida preparada. Cierra la pestaña de práctica antes de abrirla: las pestañas comparten cookies de tienda.'});});
post('/api/chapters/:n/understanding',(req,res)=>{
  const {s,c,n,e}=chapterContext(req);requireValue(e.technical&&e.evidence&&e.evidence.runId===e.runId,'Primero demuestra el comportamiento con una evidencia de esta ejecución.',409);
  requireValue(!PATCH_CHAPTERS.includes(n)||(e.patch&&e.patchReport?.runId===e.runId),'Falta comprobar la corrección propuesta para esta ejecución.',409);
  requireValue(correctAnswer(n,req.body.answer),teacherChapter(n).feedbackOnIncorrect);
  const newlyCompleted=!e.completed;e.understood=true;e.completed=true;e.learnedAt??=new Date().toISOString();repo.save(s.owner,c);
  res.json({message:newlyCompleted?'Comprensión comprobada. Expediente completado.':'La comprobación se ha repetido; conservas tu logro anterior.',chapter:chapterView(c,n)});
});

post('/api/chapters/:n/accounts',(req,res)=>{
  const {c,n}=chapterContext(req);requireValue(n>=7&&n<=IMPLEMENTED_CHAPTERS&&![18,19].includes(n),'Este caso no requiere acceso a una cuenta.',403);
  requireValue(c.entries[6]?.completed,'Recupera primero el hallazgo autorizado del expediente06.',403);
  const names=n===20?['Alba','Bruno']:n===15?['Alba','Bruno','demo.pera','soporte.vera']:n===14?['demo.pera','soporte.vera']:n===10||n===11?['Alba','Bruno']:['demo.pera'];
  res.json({accounts:jsonFile('content/es/campaign/fixtures.json').accounts.filter((a:any)=>names.includes(a.name)).map((a:any)=>({name:a.name,password:a.password})),notice:'Credenciales exclusivamente ficticias de una copia autorizada. Se muestran solo por tu elección.'});
});

post('/api/notes',(req,res)=>{
  const s=getSession(req),c=repo.campaign(s),chapter=Number(req.body.chapter);chapterView(c,chapter);
  requireValue(['observed','hypothesis','limitation'].includes(req.body.kind),'Elige observado, hipótesis o limitación.');
  requireValue(c.notes.length<1000,'Este cuaderno admite1000 notas. Exporta una copia antes de crear otra campaña.');
  c.notes.push({id:randomUUID(),chapter,expected:redactLabText(text(req.body.expected)),observed:redactLabText(text(req.body.observed)),kind:req.body.kind,at:new Date().toISOString()});repo.save(s.owner,c);res.json({message:'Nota guardada.'});
});
app.get('/api/export',(req,res)=>{const c=repo.campaign(getSession(req));res.attachment('ultima-gota-progreso.json').json({format:'ug-progress/1',contentVersion:CONTENT_VERSION,campaign:c});});
post('/api/campaigns/new',(req,res)=>{const s=getSession(req),old=repo.campaign(s);repo.snapshot(s,old,'new-campaign');const c=repo.freshCampaign(text(req.body.alias??'Aprendiz',40));repo.activate(s,c);res.json({message:'Campaña nueva creada. La anterior queda archivada.'});});
post('/api/campaigns/reset',(req,res)=>{
  const s=getSession(req),c=repo.campaign(s);requireValue(req.body.confirm==='RESTABLECER','Escribe RESTABLECER después de ofrecer exportar tu progreso.');
  const old=structuredClone(c);old.id=randomUUID();old.alias=c.alias+' · antes de restablecer';old.archived=true;
  repo.db.exec('BEGIN IMMEDIATE');try{repo.snapshot(s,c,'reset');repo.save(s.owner,old);c.generation++;c.entries={};c.notes=[];c.patches=[];repo.save(s.owner,c);repo.db.exec('COMMIT');}catch(e){repo.db.exec('ROLLBACK');throw e;}
  res.json({message:'Campaña restablecida. La copia anterior permanece en el archivo recuperable.'});
});
post('/api/campaigns/import',(req,res)=>{const s=getSession(req),c=importCampaign(req.body);repo.save(s.owner,c);res.json({message:'Exportación recuperada como copia archivada. La campaña activa conserva su estado.',archiveId:c.id});});
post('/api/campaigns/restore',(req,res)=>{const s=getSession(req);const c=repo.allCampaigns(s).find(x=>x.id===req.body.id);requireValue(c,'No existe ese archivo en tu escritorio.',404);const copy=importCampaign({format:'ug-progress/1',contentVersion:CONTENT_VERSION,campaign:c});repo.activate(s,copy);res.json({message:'Progreso recuperado en una copia nueva. No se han concedido logros nuevos.'});});
post('/api/professor',(req,res)=>{const s=getSession(req);requireValue(equalSecret(req.body.code,professorCode),'El código de profesor no coincide con el mostrado en la terminal.',403);repo.db.prepare('UPDATE sessions SET professor=1 WHERE id=?').run(s.id);res.json({message:'Modo profesor activado explícitamente.'});});
post('/api/professor/exit',(req,res)=>{repo.db.prepare('UPDATE sessions SET professor=0 WHERE id=?').run(getSession(req).id);res.json({ok:true});});
app.get('/api/professor/chapters/:n',(req,res)=>{requireValue(getSession(req).professor,'Activa explícitamente el modo profesor.',403);const n=Number(req.params.n);requireValue(Number.isInteger(n)&&n>=1&&n<=IMPLEMENTED_CHAPTERS,'Solución no disponible en esta versión.',404);res.json(teacherChapter(n));});
app.use(express.static(resolve(root,'dist/classroom'),{index:false}));
app.get('/',(_req,res)=>res.sendFile(resolve(root,'dist/classroom/index.html')));
app.use((_req,res)=>res.status(404).json({error:'Este recurso no está disponible.'}));app.use(errorHandler);
const server=app.listen(Number(new URL(classroomOrigin).port),bindAddress,()=>console.log(`Escritorio: ${classroomOrigin}`));
process.on('SIGTERM',()=>{server.close();repo.db.close();process.exit(0);});
