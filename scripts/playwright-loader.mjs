import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
// Ejecuta el cliente original de la skill con Playwright del proyecto, sin modificar la skill.
export async function resolveHook(specifier,context,nextResolve){
  return nextResolve(specifier==='playwright'?pathToFileURL(resolve(process.cwd(),'node_modules/playwright/index.mjs')).href:specifier,context);
}
export {resolveHook as resolve};
