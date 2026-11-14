import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';
import { requireValue, text } from '../../shared/http.ts';
import { storeOrigin } from '../../shared/runtime.ts';
import type { Campaign, Evidence } from '../../shared/types.ts';
import { control, eventsFor } from './store-client.ts';
export const browserAvailable=()=>existsSync(chromium.executablePath());
export async function validate(c:Campaign,n:number,input:any):Promise<Evidence> {
  const e=c.entries[n];requireValue(e?.runId&&e.prediction,'Primero registra una predicción y prepara este escenario.',409);
  const {run,events}=await eventsFor(e.runId);
  requireValue(run.campaign===c.id&&run.generation===c.generation&&run.chapter===n,'La prueba pertenece a otra campaña o ejecución.',409);
  const pear=events.filter(x=>x.productId===2&&x.identity==='anonymous');
  requireValue(pear.length,'Falta una petición real al producto 2. Abre la tienda desde este expediente y carga esa ficha.');
  const expected=text(input.expected),observed=text(input.observed),fields=input.fields;
  requireValue(fields&&typeof fields==='object'&&!Array.isArray(fields),'Completa los datos concretos de la observación.');
  const last=pear.at(-1)!;
  switch(n){
    case 1:
      requireValue(events.some(x=>x.productId===1&&x.seq<last.seq),'Carga primero la ficha1 y cambia su identificador para pedir la2.');
      requireValue(fields.productId===2&&fields.name===last.name,'Contrasta el identificador y el nombre recibidos, no un texto editado.');break;
    case 2:
      requireValue(fields.method===last.method&&fields.resource===storeOrigin+last.resource&&fields.productId===2,'Comprueba método, dirección completa y producto en la petición de datos, no en una imagen.');break;
    case 3:
      requireValue(fields.productId===2&&fields.priceCents===last.priceCents&&fields.visibleCents===240&&fields.expectedCents===210,'Distingue precio recibido, visible y esperado. Anota céntimos: 2,10 € son 210.');break;
    case 4:
      requireValue(pear.length>=2,'Necesitamos una consulta nueva después de recargar para contrastar la edición local.');
      requireValue(typeof fields.editedText==='string'&&fields.editedText.trim().length>0&&fields.editedText.length<120&&fields.editedText!==last.name,'Describe el texto que editaste localmente. No detectamos el inspector; contrastamos tu observación.');
      requireValue(fields.restoredName===last.name&&fields.serverName===last.name,'Compara nombre tras recargar y nombre de la respuesta del servidor.');break;
    case 5:
      requireValue(fields.productId===2&&fields.priceCents===210&&fields.visibleCents===240&&fields.expectedCents===210,'Revisa las tres fuentes: hoja, respuesta y pantalla antes de corregir.');
      requireValue(typeof fields.steps==='string'&&fields.steps.trim().length>=20,'Escribe pasos concretos que permitan repetir la consulta.');break;
  }
  return {id:randomUUID(),chapter:n,campaignId:c.id,runId:e.runId,generation:c.generation,virtualTime:`Día 0 · revisión después de las 10:00 · expediente ${String(n).padStart(2,'0')}`,identity:'anonymous',resource:storeOrigin+last.resource,requestRefs:events.slice(-500).map(x=>x.requestId),expected,observed,kind:'observed',fields};
}
export async function verifyCorrection(runId:string) {
  requireValue(browserAvailable(),'Falta el navegador de comprobación. En la carpeta del proyecto ejecuta npx playwright install chromium y vuelve a probar.',503);
  const evaluatorOrigin=process.env.UG_EVALUATOR_STORE_ORIGIN??storeOrigin;
  const {ticket}=await control(`/runs/${runId}/ticket`,{});
  const browser=await chromium.launch({headless:true});
  try {
    const context=await browser.newContext(); const page=await context.newPage();
    const failures:string[]=[];page.on('pageerror',e=>failures.push(e.message));
    await page.goto(`${evaluatorOrigin}/launch?ticket=${encodeURIComponent(ticket)}`);
    await page.locator('[data-product="2"]').waitFor();
    const before=await page.locator('[data-price]').textContent();
    await control(`/runs/${runId}/correction`,{});
    await page.reload();await page.locator('[data-edition="corrected"]').waitFor();
    const after=await page.locator('[data-price]').textContent();
    await page.locator('h1').evaluate(el=>{el.textContent='Edición local de prueba';});
    await page.reload();await page.locator('[data-product="2"]').waitFor();
    const restored=await page.locator('h1').textContent();
    await page.goto(evaluatorOrigin+'/producto?id=1');await page.locator('[data-product="1"]').waitFor();
    const other=await page.locator('[data-price]').textContent();
    requireValue(before?.includes('2,40')&&after?.includes('2,10')&&other?.includes('1,80')&&restored==='Pera del huerto'&&!failures.length,'La prueba de corrección no ha dado todos los resultados esperados. Reintenta el escenario.',409);
    return {runId,engine:'Chromium aislado',before,after,legitimateProduct:other,localEditReverted:restored,checks:['Precio de pera corregido','Precio de naranja conservado','Edición local no persiste'],at:new Date().toISOString()};
  } finally {await browser.close();}
}
