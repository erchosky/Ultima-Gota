# 04 · Una página, dos capas

Acto 1 · Escritorio y copia autorizada de tienda · día 0 · hito 04 después de las 10:00 (sin duración impuesta)

**De: Lara**

Ya tenemos una diferencia concreta. Antes de pedir una corrección vamos a conocer la otra capa: los elementos que forman la página. El inspector permite seleccionar un texto y ver el elemento que lo presenta. Una edición allí cambia tu vista local, como corregir una etiqueta de papel sobre una fotografía. No guarda automáticamente nada en la tienda. Selecciona el nombre del producto y prueba una marca que puedas reconocer. Después recarga y vuelve a consultar los datos. En la misma ficha hay una referencia discreta a la campaña de verano; observa su enlace sin adelantarte todavía a investigar su contenido.

**Importa porque:** la referencia de la campaña aparece entre los datos recibidos, pero apenas se ve en la ficha.

**Reutiliza:** 01, 02, 03

**Añade S04:** localizar un elemento de la página con el inspector de elementos.

**Objetivo:** seleccionar el nombre del producto y reconocer el elemento que lo presenta. Probar una edición local inocua de su texto.

**Estado inicial:** fixture campaign-v1 y snapshot propio 04; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Seguirá tu nombre editado al recargar y pedir los datos otra vez?

## Apoyo guiado

1. El inspector modifica la representación local; una petición nueva permite contrastarla.
2. Haz clic derecho sobre Pera del huerto y elige Inspeccionar. Busca el elemento del nombre.
3. Edita solo su texto con una marca inocua, anótala y recarga.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. El inspector modifica la representación local; una petición nueva permite contrastarla.
2. Haz clic derecho sobre Pera del huerto y elige Inspeccionar. Busca el elemento del nombre.
3. Edita solo su texto con una marca inocua, anótala y recarga.
4. Cambia el texto del nombre a Pera de prueba en el inspector. Recarga: el nombre original vuelve y la respuesta conserva id=2. Localiza el enlace de campaña en la ficha.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Alumno declara edición local y restauración; consulta nueva confirma id y nombre originales y referencia pública de campaña. No se afirma detectar el uso del inspector.

**No basta:** Aceptar un texto del DOM como prueba de persistencia o fingir telemetría de DevTools.

**Cuaderno:** EV-04; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

editar la pantalla no modifica automáticamente el servidor. En el elemento de la campaña aparece una referencia pública a su página antigua.

La página vuelve a construirse con los datos recibidos; aquella edición era local.

**Pregunta:** ¿Por qué vuelve el nombre original aunque editases el elemento?

**Corrección:** No se corrige la herramienta ni se trata su edición como fallo. La discrepancia de precio sigue pendiente del 05.

**Prueba positiva:** Recarga devuelve nombre original.

**Prueba negativa:** Edición local no cambia la fila de producto persistida.

**Enlace:** OBJ-04 · Enlace público a /campanas/verano-sin-colas.

**Recuperación:** Reconstruir fixtures de chapter-04/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-04.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y validador probado; recorrido completo comprobado en Chromium. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-validation.json.
