# 02 · El precio fantasma

Acto 1 · Escritorio y copia autorizada de tienda · día 0 · hito 02 después de las 10:00 (sin duración impuesta)

**De: Lara**

La ficha de pera ya abre donde queríamos. Sam conserva una hoja que indica 2,10 euros, pero en la página aparecen 2,40. Aún no sabemos dónde nace la diferencia. El navegador pide datos a la tienda y luego los presenta; esas peticiones se pueden observar en una herramienta llamada Red. Te mostraré cómo abrirla antes de recargar. Habrá varias filas porque la página también pide imágenes y estilos. Hoy solo necesitamos encontrar la petición del producto 2 y copiar su dirección y su método, la palabra que indica el tipo de petición. Leeremos su contenido en el próximo caso.

**Importa porque:** la ficha de un producto y la hoja de almacén muestran precios diferentes. Lara pide comprobar qué está consultando el navegador.

**Reutiliza:** 01

**Añade S02:** localizar una petición concreta en la pestaña Red del navegador.

**Objetivo:** abrir Red, cargar la ficha por su identificador y seleccionar la petición de datos correspondiente. Explica cómo distinguirla de imágenes y estilos sin exigir conocerlos de antemano.

**Estado inicial:** fixture campaign-v1 y snapshot propio 02; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Verás una sola petición al recargar una ficha con imagen y datos?

## Apoyo guiado

1. Una página puede pedir varias piezas; necesitamos la de datos del producto.
2. Abre Red en las herramientas de Firefox antes de recargar la ficha.
3. Busca la fila cuya dirección incluye /api/products e id=2; no el archivo de imagen.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Una página puede pedir varias piezas; necesitamos la de datos del producto.
2. Abre Red en las herramientas de Firefox antes de recargar la ficha.
3. Busca la fila cuya dirección incluye /api/products e id=2; no el archivo de imagen.
4. Pulsa Ctrl+Mayús+E (Cmd+Opción+E en macOS), recarga /producto?id=2 y selecciona /api/products?id=2. Copia URL y método de Cabeceras.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Consulta reciente de producto 2 y anotación de URL exacta, método GET e ID 2 contrastados con el evento del servidor.

**No basta:** Anotar una petición de imagen o usar un registro de una ejecución anterior.

**Cuaderno:** EV-02; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

la página provoca peticiones. El cuaderno conserva la petición para investigar su respuesta.

El navegador solicita datos, imágenes y otros recursos por separado.

**Pregunta:** ¿Por qué hay varias filas en Red al abrir una ficha?

**Corrección:** No se diagnostica todavía la causa del precio. Se conserva la petición correcta para leerla.

**Prueba positiva:** El evento de datos corresponde al producto 2.

**Prueba negativa:** La URL de una imagen no se acredita como consulta de producto.

**Enlace:** OBJ-02 · Referencia de petición de producto 2.

**Recuperación:** Reconstruir fixtures de chapter-02/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-02.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y validador probado; recorrido completo comprobado en Chromium. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-validation.json.
