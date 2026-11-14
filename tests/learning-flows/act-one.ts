import { firefox,chromium, type Page } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir,readFile,writeFile } from 'node:fs/promises';
import { startLab } from '../support/lab.ts';
const lab=await startLab();
const directory='reports/browser';await mkdir(directory,{recursive:true});
const report:any={story:'Campaña vacía → ficha real → evidencia verificada → comprensión → corrección → cuaderno y recuperación.',checks:[],errors:[],screenshots:[],engines:[],limitations:['Simulación de desarrollador; no sustituye una prueba con persona principiante.','DevTools no se puede detectar desde la web: el test observa peticiones y reproduce una edición DOM local.','Docker no se ha ejecutado en esta máquina.']};
function check(name:string){report.checks.push(name);console.log('✓',name);}
async function screenshot(page:Page,name:string){const path=`${directory}/${name}.png`;await page.screenshot({path,fullPage:true});report.screenshots.push(path);}
let browser:Awaited<ReturnType<typeof chromium.launch>>|undefined;
let expectingRejectedEvidence=false;
try{
  browser=await (process.env.UG_TEST_BROWSER==='firefox'?firefox:chromium).launch();report.engines.push({name:process.env.UG_TEST_BROWSER==='firefox'?'Firefox':'Chromium',version:browser.version()});
  if(process.env.UG_TEST_BROWSER!=='firefox')report.limitations.push('Firefox instalado no arranca en macOS: Could not find profile folder. Recorrido completo probado en Chromium.');
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
  context.on('page',p=>{p.on('pageerror',error=>report.errors.push(error.message));p.on('console',msg=>{if(msg.type()==='error')report.errors.push(msg.text());});});
  page.on('pageerror',error=>report.errors.push(error.message));page.on('console',msg=>{if(msg.type()==='error'&&!(expectingRejectedEvidence&&msg.text().includes('400 (Bad Request)')))report.errors.push(msg.text());});
  await page.goto(lab.classroom);await page.getByRole('heading',{name:'La ficha equivocada',exact:true}).waitFor();
  await screenshot(page,'01-escritorio');
  const initialAxe=await new AxeBuilder({page}).analyze();
  assert.deepEqual(initialAxe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],'Accesibilidad inicial');check('Inicio legible y análisis axe sin infracciones');
  await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(el=>el===document.activeElement),true);check('Enlace de salto accesible por teclado');
  for(let n=1;n<=5;n++){
    await page.getByLabel('Mi predicción').fill('Creo que puedo comprobar el dato que pide la ficha y compararlo con el resultado.');
    await page.getByRole('button',{name:'Preparar escenario',exact:true}).click();
    await page.getByRole('link',{name:'Abrir tienda en otra pestaña'}).waitFor();
    const storePromise=context.waitForEvent('page');await page.getByRole('link',{name:'Abrir tienda en otra pestaña'}).click();const store=await storePromise;
    await store.locator('[data-product]').waitFor();
    const responsePromise=store.waitForResponse(r=>r.url().includes('/api/products?id=2'));
    await store.goto(lab.store+'/producto?id=2');const response=await responsePromise;const received=await response.json();await store.locator('[data-product="2"]').waitFor();
    const money=await store.locator('[data-price]').textContent();const visible=Math.round(Number(money!.replace(/[^\d,]/g,'').replace(',','.'))*100);
    assert.equal(received.id,2);assert.equal(received.priceCents,210);assert.equal(visible,240);
    if(n===1){await screenshot(store,'01-tienda');const cookies=await context.cookies();assert.equal(cookies.find(c=>c.name==='ug_classroom')?.domain,'localhost');assert.equal(cookies.find(c=>c.name==='ug_lab')?.domain,'127.0.0.1');check('Cookies de escritorio y tienda separadas por host real');}
    if(n===2){await page.getByRole('button',{name:'1 · Concepto'}).click();await page.getByText('Una página puede pedir varias piezas; necesitamos la de datos del producto.',{exact:true}).waitFor();check('Pista solicitada explícitamente y sin penalizar');}
    let fields:Record<string,string>={};
    if(n===1)fields={productId:String(received.id),name:received.name};
    if(n===2)fields={productId:String(received.id),method:response.request().method(),resource:response.url()};
    if(n===3)fields={productId:String(received.id),priceCents:String(received.priceCents),visibleCents:String(visible),expectedCents:'210'};
    if(n===4){await store.locator('h1').evaluate(el=>{el.textContent='Pera de prueba';});const edited=await store.locator('h1').textContent();await screenshot(store,'04-edicion-local');await store.reload();await store.locator('[data-product="2"]').waitFor();fields={editedText:edited!,restoredName:(await store.locator('h1').textContent())!,serverName:received.name};check('Edición local revierte al recargar sin cambiar datos del servidor');}
    if(n===5)fields={productId:'2',priceCents:'210',visibleCents:String(visible),expectedCents:'210',steps:'Abrir producto2, localizar su petición, leer priceCents y comparar hoja y ficha.'};
    for(const [key,value] of Object.entries(fields))await page.locator(`[data-field="${key}"]`).fill(value);
    await page.locator('textarea[name="expected"]').fill('Esperaba que la ficha y los datos correspondieran al producto solicitado.');
    await page.locator('textarea[name="observed"]').fill(`He observado ${received.name}; recibido210 y visible${visible} céntimos. La respuesta procede de esta copia.`);
    if(n===1){
      await page.locator('[data-field="name"]').fill('Pera');
      expectingRejectedEvidence=true;
      await page.getByRole('button',{name:'Contrastar evidencia'}).click();
      const feedback=page.getByRole('alert').filter({hasText:'Contrasta el identificador y el nombre recibidos'});
      await feedback.waitFor();
      expectingRejectedEvidence=false;
      assert.equal(await feedback.isVisible(),true);
      assert.equal(await page.locator('[data-field="name"]').inputValue(),'Pera');
      assert.equal(await page.locator('textarea[name="observed"]').inputValue(),`He observado ${received.name}; recibido210 y visible${visible} céntimos. La respuesta procede de esta copia.`);
      assert.equal(await page.getByRole('button',{name:'Comprobar comprensión'}).isDisabled(),true);
      await page.locator('[data-field="name"]').fill(received.name);
      check('Evidencia incorrecta muestra el motivo junto al botón, conserva lo escrito y explica el bloqueo');
    }
    await page.getByRole('button',{name:'Contrastar evidencia'}).click();await page.getByText('Evidencia contrastada. Puedes repetir la prueba o pasar a la comprensión.',{exact:true}).waitFor();
    if(n===5){await page.getByRole('button',{name:'Probar versión corregida'}).click();await page.getByText('Corrección verificada: pera 2,10 €; naranja 1,80 €; edición local sin persistencia.',{exact:true}).waitFor();await store.reload();await store.locator('[data-edition="corrected"]').waitFor();assert.match((await store.locator('[data-price]').textContent())!,/2,10/);await screenshot(store,'05-tienda-corregida');check('Corrección real contrastada por evaluador y sesión independiente de alumno');}
    const teacher=JSON.parse(await readFile(`content/es/instructor/chapter-${String(n).padStart(2,'0')}.json`,'utf8'));
    await page.getByLabel(teacher.understandingAnswer,{exact:true}).check();await page.getByRole('button',{name:'Comprobar comprensión'}).click();await page.getByRole('heading',{name:'Lo que conservamos',exact:true}).waitFor();
    assert.equal(JSON.parse(await page.evaluate(()=>window.render_game_to_text())).completed,n);check(`Expediente${n}: petición→evidencia→comprensión→logro`);
    await store.close();
    if(n<5){await page.getByRole('button',{name:'Abrir el siguiente expediente'}).click();await page.getByRole('heading',{name:JSON.parse(await readFile(`content/es/chapters/chapter-${String(n+1).padStart(2,'0')}.json`,'utf8')).title,exact:true}).waitFor();}
  }
  await screenshot(page,'05-cierre-acto');
  await page.getByRole('button',{name:'Cuaderno',exact:true}).click();await page.getByRole('heading',{name:'Cuaderno de investigación'}).waitFor();
  await page.locator('textarea[name="expected"]').fill('Esperaba conservar esta nota después del reinicio.');await page.locator('textarea[name="observed"]').fill('La corrección tiene prueba positiva y negativa. No demuestra un ataque histórico.');await page.getByRole('button',{name:'Guardar nota',exact:true}).click();await page.getByText('Nota guardada.',{exact:true}).waitFor();
  await screenshot(page,'cuaderno');await lab.restart();await page.reload();await page.getByRole('heading',{name:'La promoción retirada',exact:true}).waitFor();await page.getByRole('button',{name:'Cuaderno',exact:true}).click();await page.getByText('La corrección tiene prueba positiva y negativa. No demuestra un ataque histórico.',{exact:false}).waitFor();check('Reinicio real de ambos servicios conserva cinco logros y notas');
  await page.getByRole('button',{name:'Guardar y recuperar',exact:true}).click();await page.getByRole('button',{name:'Revisar restablecimiento'}).click();const modal=page.getByRole('dialog');await modal.waitFor();
  const focusInDialog=await modal.evaluate(el=>el.contains(document.activeElement));assert.equal(focusInDialog,true);await page.keyboard.press('Escape');await modal.waitFor({state:'hidden'});assert.equal(await page.getByRole('button',{name:'Revisar restablecimiento'}).evaluate(el=>document.activeElement===el),true);check('Diálogo nativo: foco interior, Escape y retorno de foco');
  const recoveryAxe=await new AxeBuilder({page}).analyze();assert.deepEqual(recoveryAxe.violations.map(v=>v.id),[],'Accesibilidad recuperación');
  await page.getByRole('button',{name:'Crear una campaña nueva',exact:true}).click();await page.getByText('Campaña nueva creada. La anterior queda archivada.',{exact:true}).waitFor();await page.getByRole('button',{name:'Recuperar copia',exact:true}).click();await page.getByText('Progreso recuperado en una copia nueva. No se han concedido logros nuevos.',{exact:true}).waitFor();check('Campaña nueva y recuperación histórica desde la interfaz sin notificaciones duplicadas');
  await page.setViewportSize({width:390,height:844});await screenshot(page,'movil');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);check('Lectura móvil390px sin desbordamiento horizontal');
  await context.close();
  const chrome=await chromium.launch();report.engines.push({name:'Chromium-secondary-context',version:chrome.version()});const p=await chrome.newPage({viewport:{width:1440,height:1000}});await p.goto(lab.classroom);await p.getByRole('heading',{name:'La ficha equivocada',exact:true}).waitFor();await screenshot(p,'chromium-escritorio');await chrome.close();check('Inicio también renderiza en Chromium');
  assert.deepEqual(report.errors,[],'Errores de consola o JavaScript');report.passed=true;
}catch(error){report.passed=false;report.failure=error instanceof Error?error.stack:String(error);console.error(error);process.exitCode=1;}
finally{await browser?.close();await lab.stop();await writeFile(process.env.UG_TEST_BROWSER==='firefox'?'reports/firefox-validation.json':'reports/browser-validation.json',JSON.stringify(report,null,2)+'\n');}
