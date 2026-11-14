# 29 · El reloj del enlace

Acto 6 · Escritorio y copia autorizada de tienda · día 0 · hito 29 después de las 10:00 (sin duración impuesta)

**De: Vera**

La autorización de recuperación tiene un plazo de diez minutos de reloj del escenario. No vamos a esperar ese tiempo ni cambiar la fecha del equipo. La mesa permite preparar copias equivalentes antes y después del límite, con tokens sin utilizar. Esto importa porque el caso anterior ya invalida un token consumido: reutilizarlo no nos permitiría saber si también caduca correctamente. Anota hora de emisión, hora límite y momento de cada intento. Probaremos también el instante exacto de vencimiento. Queremos una regla clara, no una impresión de que un enlace parecía demasiado viejo cuando lo abrió alguien.

**Importa porque:** una cuenta recibió un enlace hace demasiado tiempo, pero el formulario parece aceptarlo.

**Reutiliza:** 15, 27, 28

**Añade S29:** verificar la caducidad de un token con un reloj virtual del escenario.

**Objetivo:** repetir una recuperación antes y después de su plazo usando el control temporal del laboratorio. No cambies la fecha del sistema operativo ni hagas esperar minutos reales.

**Estado inicial:** fixture campaign-v1 y snapshot propio 29; cuentas Alba. Sesión nueva identificada y runId nuevo.

**Predicción:** Si el límite es 600 segundos, ¿debe aceptarse un token exactamente a los 600?

## Apoyo guiado

1. Mantén token sin consumir para aislar la condición temporal.
2. Usa el reloj virtual de la mesa y copias equivalentes del token.
3. Prueba justo antes, en el límite y después.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Mantén token sin consumir para aislar la condición temporal.
2. Usa el reloj virtual de la mesa y copias equivalentes del token.
3. Prueba justo antes, en el límite y después.
4. Con snapshots equivalentes y tokens sin usar, intenta a +599, +600 y +601 segundos. En corregida solo +599 funciona; registra expiresAt y now en cada copia.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Tres copias con token no consumido prueban frontera; corregida acepta599, deniega600/601, vulnerable acepta expirado.

**No basta:** Usar el token ya consumido del caso28 o cambiar reloj del sistema.

**Cuaderno:** EV-29; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

el tiempo es una condición de autorización. Vera pregunta por las sesiones que ya estaban abiertas.

Para medir caducidad sin que el rechazo se explique por uso previo.

**Pregunta:** ¿Por qué usamos copias con tokens sin consumir?

**Corrección:** Verificar now < expiresAt en servidor con reloj del escenario.

**Prueba positiva:** Token a599 segundos permite recuperación.

**Prueba negativa:** Token a600 y601 no la permite.

**Enlace:** OBJ-29 · Tabla de frontera temporal.

**Recuperación:** Reconstruir fixtures de chapter-29/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-29.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
