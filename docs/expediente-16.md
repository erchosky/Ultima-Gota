# 16 · El botón no es la regla

Acto 4 · Escritorio y copia autorizada de tienda · día 0 · hito 16 después de las 10:00 (sin duración impuesta)

**De: Sam**

El formulario de pedido no me deja bajar de una unidad. Pensé que eso garantizaba la regla, pero ahora sé que el navegador envía una petición que puede modificarse. Necesito comprobar dónde se decide de verdad. Usaremos un pedido de práctica sin cobros y una cantidad que el formulario no admite. Después consultaremos lo guardado en el servidor. No cambies precio, producto ni cuenta; así podremos atribuir la diferencia al único campo que estamos investigando. Compara también una cantidad válida en la versión corregida. La regla que hemos acordado es sencilla: cantidades enteras entre una y veinte unidades.

**Importa porque:** Sam cree que la cantidad mínima está protegida porque el formulario no permite ciertos valores.

**Reutiliza:** 11, 12, 15

**Añade S16:** comprobar si una regla de entrada se valida también en el servidor.

**Objetivo:** enviar en un pedido ficticio un valor que el formulario limita y verificar el resultado persistido. El escenario no realiza cobros.

**Predicción:** ¿El mínimo del formulario obliga por sí solo al servidor a rechazar cero?

## Apoyo guiado

1. Un control de pantalla puede evitarse reenviando la petición.
2. Mira quantity en el cuerpo del pedido de práctica.
3. Conserva producto y cuenta; varía únicamente la cantidad.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Un control de pantalla puede evitarse reenviando la petición.
2. Mira quantity en el cuerpo del pedido de práctica.
3. Conserva producto y cuenta; varía únicamente la cantidad.
4. Envía quantity=0 en la copia vulnerable y consulta el pedido. En corregida verifica rechazo de 0 y aceptación de 1, sin cobro real.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Cantidad 0 persiste en vulnerable; corregida la rechaza y conserva pedido legítimo quantity=1.

**No basta:** Que el formulario impida escribir cero sin probar el servidor.

**Cuaderno:** EV-16; identidad, recurso, reloj, petición, esperado, observado y reproducción independiente cuando corresponde.

## Cierre

los controles del formulario ayudan al usuario; la regla de negocio debe verificarse al recibir la petición. Un campo de descripción presenta un comportamiento distinto.

En el servidor, además de ayudar al usuario desde el formulario.

**Pregunta:** ¿Dónde debe aplicarse la regla de cantidad?

**Corrección:** Validar entero entre 1 y 20 antes de crear el pedido.

**Prueba positiva:** quantity=1 produce una línea válida.

**Prueba negativa:** 0, negativos, fracciones y 21 no se guardan.

**Enlace:** OBJ-16 · Comparación de reglas y campo de descripción.

**Recuperación:** Reconstruir fixtures de chapter-16/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-16.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y recorrido Chromium verificado. Cantidad persistida y límites de servidor contrastados. No se acredita Docker, Firefox ni prueba con principiante. Ver reports/browser-act-four-validation.json.
