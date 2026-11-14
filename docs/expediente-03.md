# 03 · Lo que llegó de verdad

Acto 1 · Escritorio y copia autorizada de tienda · día 0 · hito 03 después de las 10:00 (sin duración impuesta)

**De: Nico**

Gracias por localizar la petición. Ahora necesito separar lo que envió la tienda de lo que dibujó la página. Al seleccionar esa fila verás una sección llamada Respuesta. Su contenido usa JSON: una forma de ordenar datos con nombres y valores. Por ejemplo, id identifica el producto y priceCents indica su precio en céntimos. Cien céntimos son un euro. No tienes que escribir código ni modificar nada. Busca el nombre, el identificador y el precio del producto 2. Después compara ese precio con la hoja de Sam y con la cifra que sigue apareciendo en la ficha. Conserva los tres valores con sus fuentes.

**Importa porque:** Nico necesita saber si el servidor envió el precio incorrecto o si la página está mostrando mal el dato.

**Reutiliza:** 01, 02

**Añade S03:** localizar un campo concreto dentro de una respuesta JSON.

**Objetivo:** leer la respuesta y encontrar `id`, nombre y precio. Presenta JSON como datos organizados, con un ejemplo pequeño y un glosario contextual.

**Estado inicial:** fixture campaign-v1 y snapshot propio 03; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿El precio que ves en la ficha tiene que coincidir necesariamente con el recibido?

## Apoyo guiado

1. Distingue el dato recibido de la forma de presentarlo; los céntimos necesitan conversión.
2. En la petición del producto 2, abre Respuesta y localiza priceCents.
3. Compara id, name y priceCents con el título y el precio de la ficha.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Distingue el dato recibido de la forma de presentarlo; los céntimos necesitan conversión.
2. En la petición del producto 2, abre Respuesta y localiza priceCents.
3. Compara id, name y priceCents con el título y el precio de la ficha.
4. Recarga producto 2, abre su respuesta y anota id=2, Pera del huerto y 210 céntimos. Compáralos con 2,40 € visibles y 2,10 € de la hoja.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Petición actual id=2; JSON priceCents=210; alumno registra recibido 210, visible 240 y esperado 210 con unidad céntimos.

**No basta:** Leer el JSON de otro producto o afirmar que el servidor envió 240.

**Cuaderno:** EV-03; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

distinguir datos recibidos y presentación. La respuesta menciona una antigua campaña de verano.

En la presentación de esta ficha: el dato recibido coincide con la hoja, pero la cifra visible difiere.

**Pregunta:** ¿En qué capa apunta la diferencia observada de 210 frente a 240 céntimos?

**Corrección:** La corrección de presentación se aplicará en el 05 tras reunir una reproducción.

**Prueba positiva:** Respuesta de producto 2 mantiene priceCents=210.

**Prueba negativa:** Una respuesta de producto 1 no sustituye esta evidencia.

**Enlace:** OBJ-03 · Comparación de precios y referencia a Verano sin colas.

**Recuperación:** Reconstruir fixtures de chapter-03/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-03.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y validador probado; recorrido completo comprobado en Chromium. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-validation.json.
