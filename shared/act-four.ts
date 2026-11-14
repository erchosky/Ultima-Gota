/** Muestras acotadas del laboratorio: no se aceptan programas arbitrarios. */
export const FORMAT_SAMPLE='<strong>PERA</strong>';
export const demoHandler=(nonce:string)=>`document.getElementById('marca').dataset.demo='${nonce}'`;
export const demoPayload=(nonce:string)=>`<img src="/demo/imagen-inexistente" onerror="${demoHandler(nonce)}">`;
export function plainContent(value:unknown):value is string{return typeof value==='string'&&value.length>=1&&value.length<=120&&/^[\p{L}\p{N} .,¡!¿?:_\-]+$/u.test(value);}
export function boundedContent(value:unknown,nonce:string,execution=false):value is string{return plainContent(value)||value===FORMAT_SAMPLE||execution&&value===demoPayload(nonce);}
