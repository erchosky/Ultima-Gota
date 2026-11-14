import { chromium,firefox,type Page } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir,readFile,writeFile } from 'node:fs/promises';
import { makeClient,startLab } from '../support/lab.ts';
import { completeActOne } from '../support/complete-act-one.ts';
const lab=await startLab(),directory='reports/browser-act-two';await mkdir(directory,{recursive:true});
const report:any={story:'Transición05→06; archivo público→cuenta→cookie→logout→pedido ajeno; correcciones y recuperación.',checks:[],errors:[],expectedDenials:[],screenshots:[],passed:false,limitations:['Recorrido automatizado de desarrollador; pendiente prueba con persona principiante.','No detectamos DevTools: contrastamos peticiones y observaciones.','Docker, Kali y Firefox siguen sin verificación en este entorno.']};
let browser:Awaited<ReturnType<typeof chromium.launch>>|undefined,currentPage:Page|undefined;
const check=(name:string)=>{report.checks.push(name);console.log('✓',name);};
async function shot(page:Page,name:string){const path=`${directory}/${name}.png`;await page.screenshot({path,fullPage:true});report.screenshots.push(path);}
try{
  browser=await(process.env.UG_TEST_BROWSER==='firefox'?firefox:chromium).launch();report.engine=process.env.UG_TEST_BROWSER==='firefox'?'Firefox':'Chromium';report.browserVersion=browser.version();
  const client=makeClient(lab.classroom);await completeActOne(client,lab.store);
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  const [name,value]=client.cookie.split('=');await context.addCookies([{name,value,domain:'localhost',path:'/',httpOnly:true,sameSite:'Strict'}]);
  context.on('page',p=>{p.on('pageerror',error=>report.errors.push(error.message));p.on('console',msg=>{if(msg.type()==='error'){if(/401|403/.test(msg.text()))report.expectedDenials.push(msg.text());else report.errors.push(msg.text());}});});
  const page=await context.newPage();currentPage=page;await page.goto(lab.classroom);await page.getByRole('heading',{name:'La promoción retirada',exact:true}).waitFor();
  await page.getByRole('button',{name:/La primera prueba útil/}).click();await page.getByRole('heading',{name:'La primera prueba útil',exact:true}).waitFor();await page.getByRole('button',{name:'Abrir el siguiente expediente'}).click();await page.getByRole('heading',{name:'La promoción retirada',exact:true}).waitFor();check('Campaña del ActoI abre la transición05→06 sin perder la corrección del precio');
  let demo:{name:string;password:string}|undefined;
  async function fillEvidence(fields:Record<string,string>){for(const [key,value]of Object.entries(fields)){const field=page.locator(`[data-field="${key}"]`);if(await field.evaluate(el=>el.tagName==='SELECT'))await field.selectOption(value);else await field.fill(value);}await page.locator('textarea[name="expected"]').fill('Esperaba un acceso limitado a la cuenta y el objeto autorizados.');await page.locator('textarea[name="observed"]').fill('He observado el comportamiento de esta copia mediante peticiones nuevas y su identidad.');await page.getByRole('button',{name:'Contrastar evidencia'}).click();await page.getByText('Evidencia contrastada. Puedes repetir la prueba o pasar a la comprensión.',{exact:true}).waitFor();}
  async function signin(store:Page,account:{name:string;password:string}){await store.getByLabel('Usuario de laboratorio').fill(account.name);await store.getByLabel('Contraseña de laboratorio',{exact:true}).fill(account.password);await store.getByRole('button',{name:'Iniciar sesión',exact:true}).click();await store.locator('[data-account-name]').filter({hasText:account.name}).waitFor();}
  for(let n=6;n<=10;n++){
    await page.getByLabel('Mi predicción').fill('Creo que el servidor distinguirá la sesión, el recurso y sus permisos.');await page.getByRole('button',{name:'Preparar escenario',exact:true}).click();await page.getByRole('link',{name:'Abrir tienda en otra pestaña'}).waitFor();
    const opened=context.waitForEvent('page');await page.getByRole('link',{name:'Abrir tienda en otra pestaña'}).click();const store=await opened;
    if(n===6){
      await store.getByRole('heading',{name:'Verano sin colas',exact:true}).waitFor();await store.locator('[data-summer-status][data-loaded="yes"]').waitFor();
      const source=await(await context.request.get(lab.store+'/assets/verano-demo.js')).text(),match=source.match(/const demo = (.+);/);assert.ok(match);const found=JSON.parse(match[1]);demo={name:found.user,password:found.password};
      await fillEvidence({username:demo.name,password:demo.password,resource:lab.store+'/assets/verano-demo.js'});await shot(store,'06-campana-publica');
      await store.goto(lab.store+'/producto?id=2');await store.locator('[data-product="2"]').waitFor();assert.match((await store.locator('[data-price]').textContent())!,/2,10/);check('Recurso público real contiene el dato de práctica; la corrección de precio del05 permanece');
    }else{
      await store.getByRole('heading',{name:'Mi cuenta',exact:true}).waitFor();
      const before=await context.cookies(lab.store);assert.equal(before.some(c=>c.name==='ug_store'),false);assert.ok(before.some(c=>c.name==='ug_lab'));
      await page.getByRole('button',{name:'Recuperar credenciales ficticias',exact:true}).click();const secretInput=page.getByLabel(n===10?'Contraseña ficticia de Alba':'Contraseña ficticia de demo.pera',{exact:true});await secretInput.waitFor();assert.equal(await secretInput.getAttribute('type'),'password');
      if(n<10){assert.equal(await secretInput.inputValue(),demo!.password);await signin(store,demo!);}
      if(n===7){const profile=await(await context.request.get(lab.store+'/api/me')).json();await fillEvidence({name:profile.name,userId:profile.userId});await shot(store,'07-perfil-autenticado');check('Cuenta real reconocida por /api/me y credencial recuperada oculta por defecto');}
      if(n===8){
        const cookies=await context.cookies(lab.store),cookie=cookies.find(c=>c.name==='ug_store');assert.ok(cookie?.httpOnly);assert.equal(cookie.domain,'127.0.0.1');assert.equal((await store.evaluate(()=>document.cookie)).includes('ug_store'),false);
        await store.goto(lab.store+'/producto?id=3');await store.locator('[data-product="3"]').waitFor();await store.getByRole('link',{name:'Mi cuenta',exact:true}).click();await store.locator('[data-profile="user-demo-pera"]').waitFor();
        await fillEvidence({cookieName:'ug_store',cookieHttpOnly:'yes',accessBefore:'denied',accessAfter:'allowed',name:'demo.pera'});check('ug_store aparece tras entrar, es HttpOnly y conserva identidad al navegar');
      }
      if(n===9){
        await store.getByRole('button',{name:'Cerrar sesión',exact:true}).click();await store.getByText('Sesión cerrada. Vuelve a consultar el perfil para contrastar el acceso.',{exact:true}).waitFor();await store.getByRole('button',{name:'Volver a consultar mi perfil'}).click();await store.getByText('Acceso privado denegado. No hay una sesión de cuenta válida.',{exact:true}).waitFor();assert.equal((await context.cookies(lab.store)).some(c=>c.name==='ug_store'),false);
        await fillEvidence({name:'demo.pera',accessBefore:'allowed',accessAfter:'denied'});await shot(store,'09-cierre-verificado');check('Cierre elimina la cookie y una nueva petición pierde acceso privado');
      }
      if(n===10){
        const alba={name:'Alba',password:await secretInput.inputValue()},bruno={name:'Bruno',password:await page.getByLabel('Contraseña ficticia de Bruno',{exact:true}).inputValue()};
        await signin(store,alba);await store.getByRole('link',{name:'Mis pedidos',exact:true}).click();await store.getByRole('link',{name:'Abrir pedido 203'}).click();await store.locator('[data-order="203"]').waitFor();assert.equal(await store.locator('[data-owner]').textContent(),'Alba');
        await store.goto(lab.store+'/pedido?id=204');await store.locator('[data-order="204"]').waitFor();assert.equal(await store.locator('[data-viewer]').textContent(),'Alba');assert.equal(await store.locator('[data-owner]').textContent(),'Bruno');await shot(store,'10-acceso-cruzado');
        const a11y=await new AxeBuilder({page:store}).analyze();assert.deepEqual(a11y.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);
        await store.getByRole('link',{name:'Mi cuenta',exact:true}).click();await store.getByRole('button',{name:'Cerrar sesión',exact:true}).click();await signin(store,bruno);await store.goto(lab.store+'/pedido?id=204');await store.locator('[data-order="204"]').waitFor();assert.equal(await store.locator('[data-viewer]').textContent(),'Bruno');assert.equal(await store.locator('[data-owner]').textContent(),'Bruno');
        await fillEvidence({actorName:'Alba',ownOrderId:'203',foreignOrderId:'204',ownerName:'Bruno',controlName:'Bruno',resource:lab.store+'/api/orders?id=204'});check('IDOR reproducido: Alba recibe204 de Bruno, que conserva propietario; control Bruno confirmado');
      }
    }
    if([6,7,10].includes(n)){await page.getByRole('button',{name:'Probar versión corregida'}).click();await page.getByText('Comparación verificada en copia separada. Los resultados quedan en el cuaderno.',{exact:true}).waitFor();check(`Corrección${n} contrastada con prueba legítima y negativa en copia aislada`);}
    const teacher=JSON.parse(await readFile(`content/es/instructor/chapter-${String(n).padStart(2,'0')}.json`,'utf8'));await page.getByLabel(teacher.understandingAnswer,{exact:true}).check();await page.getByRole('button',{name:'Comprobar comprensión'}).click();await page.getByRole('heading',{name:'Lo que conservamos',exact:true}).waitFor();assert.equal(JSON.parse(await page.evaluate(()=>window.render_game_to_text())).completed,n);check(`Expediente${n} completa evidencia y comprensión`);
    await store.close();if(n<10){await page.getByRole('button',{name:'Abrir el siguiente expediente'}).click();await page.getByRole('heading',{name:JSON.parse(await readFile(`content/es/chapters/chapter-${String(n+1).padStart(2,'0')}.json`,'utf8')).title,exact:true}).waitFor();}
  }
  await shot(page,'10-cierre-acto');await page.getByRole('button',{name:'Cuaderno',exact:true}).click();await page.getByRole('heading',{name:'Cuaderno de investigación'}).waitFor();assert.equal(await page.locator('input[type="password"]').count(),0);await shot(page,'cuaderno-actos-I-II');
  await page.getByRole('button',{name:'Recuperar credenciales ficticias',exact:true}).click();assert.equal(await page.getByLabel('Contraseña ficticia de demo.pera',{exact:true}).getAttribute('type'),'password');
  await lab.restart();await page.reload();await page.getByRole('heading',{name:'Repetir sin volver a empezar',exact:true}).waitFor();assert.equal(JSON.parse(await page.evaluate(()=>window.render_game_to_text())).completed,10);check('Reinicio real conserva diez expedientes y permite recuperar el objeto de credenciales');
  await page.getByRole('button',{name:'Guardar y recuperar',exact:true}).click();const exported=await(await context.request.get(lab.classroom+'/api/export')).json();assert.equal(exported.contentVersion,4);assert.equal(JSON.stringify(exported).includes(demo!.password),false);
  await page.getByRole('button',{name:'Crear una campaña nueva',exact:true}).click();await page.getByText('Campaña nueva creada. La anterior queda archivada.',{exact:true}).waitFor();await page.getByRole('button',{name:'Recuperar copia',exact:true}).click();await page.getByText('Progreso recuperado en una copia nueva. No se han concedido logros nuevos.',{exact:true}).waitFor();assert.equal(JSON.parse(await page.evaluate(()=>window.render_game_to_text())).completed,10);check('Archivo y recuperación de los diez capítulos sin contraseñas ni logros nuevos en exportación');
  await page.setViewportSize({width:390,height:844});await shot(page,'movil-actos-I-II');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));check('Lectura móvil sin desbordamiento horizontal');
  assert.deepEqual(report.errors,[]);report.passed=true;await context.close();
}catch(error){report.failure=error instanceof Error?error.stack:String(error);console.error(error);process.exitCode=1;if(currentPage&&!currentPage.isClosed())await shot(currentPage,'fallo').catch(()=>{});}
finally{await browser?.close();await lab.stop();await writeFile(process.env.UG_TEST_BROWSER==='firefox'?'reports/firefox-act-two.json':'reports/browser-act-two-validation.json',JSON.stringify(report,null,2)+'\n');}
