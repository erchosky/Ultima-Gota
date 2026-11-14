import type { ErrorRequestHandler, Request } from 'express';
import { timingSafeEqual } from 'node:crypto';
export class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }
export function requireValue(test: unknown, message: string, status = 400): asserts test {
  if (!test) throw new HttpError(status, message);
}
export function text(value: unknown, max = 4000): string {
  requireValue(typeof value === 'string' && value.trim().length > 0 && value.length <= max, 'Falta un texto válido o supera el tamaño permitido.');
  return value.trim();
}
export function cookie(req: Request, name: string) {
  return req.headers.cookie?.split(';').map(v => v.trim()).find(v => v.startsWith(name + '='))?.slice(name.length + 1);
}
export function equalSecret(a: string | undefined, b: string) {
  if (typeof a!=='string' || !a || Buffer.byteLength(a) !== Buffer.byteLength(b)) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpError) res.status(error.status).json({error: error.message});
  else if (error?.type === 'entity.too.large') res.status(413).json({error: 'El archivo o mensaje supera el tamaño permitido.'});
  else if (error instanceof SyntaxError) res.status(400).json({error: 'El mensaje JSON no tiene un formato válido.'});
  else { console.error('Error interno del laboratorio:', error instanceof Error ? error.message : 'desconocido'); res.status(500).json({error: 'No se ha podido completar la operación. Abre el diagnóstico del laboratorio.'}); }
};
