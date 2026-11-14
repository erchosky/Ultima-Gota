# 20 · La reseña que permaneció

Acto 4 · Escritorio y copia autorizada de tienda · día 0 · hito 20 después de las 10:00 (sin duración impuesta)

**De: Vera**

La reseña de pruebas sigue apareciendo después de recargar. Quiero saber si otra persona recibiría también su contenido, no solo quien la escribió. Disponemos de dos usuarios ficticios y una copia separada de la tienda. Guarda la muestra inocua que ya entiendes y abre la reseña desde la segunda sesión. El efecto seguirá limitado a la marca local de demostración. La mesa reproducirá la carga desde lo almacenado, sin reutilizar el navegador que envió el texto. Después probaremos la presentación corregida. Nada de esto demuestra que una reseña se utilizara durante el incidente; es una revisión nueva de una función relacionada.

**Importa porque:** Vera recibe una reseña de pruebas con contenido que se conserva al recargar.

**Reutiliza:** 12, 17, 18, 19

**Añade S20:** comprobar si una entrada peligrosa se almacena y afecta a otra sesión de laboratorio.

**Objetivo:** guardar la reseña y abrirla con un segundo usuario ficticio. El efecto se limita a la marca de demostración.

**Predicción:** ¿Podría una entrada guardada afectar a una sesión que nunca la envió?

## Apoyo guiado

1. Comprueba persistencia y recepción desde otra sesión.
2. Revisa la reseña almacenada en la ficha del producto 2.
3. Guarda la muestra y carga el producto como el segundo usuario.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Comprueba persistencia y recepción desde otra sesión.
2. Revisa la reseña almacenada en la ficha del producto 2.
3. Guarda la muestra y carga el producto como el segundo usuario.
4. Como Alba guarda la muestra explicada en reseña de pruebas. Carga esa reseña como Bruno en contexto limpio. Verifica marca y almacenamiento; en corregida no debe ejecutarse.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Reseña persistida por Alba y ejecutada al cargar como Bruno; navegador limpio, versión corregida impide ejecución.

**No basta:** Ejecutar solo en sesión emisora o enviar la marca como logro.

**Cuaderno:** EV-20; identidad, recurso, reloj, petición, esperado, observado y reproducción independiente cuando corresponde.

## Cierre

comparar el origen del dato en los dos tipos de XSS, sin atribuirlos al incidente histórico. El equipo amplía la revisión al buscador del catálogo.

La entrada se almacena y se entrega después a otra sesión.

**Pregunta:** ¿Qué cambia respecto al caso del mensaje de dirección?

**Corrección:** Renderizar reseña como texto; política de formato solo si el producto la necesita.

**Prueba positiva:** Reseña corriente persiste y puede leerse.

**Prueba negativa:** Muestra almacenada no ejecuta en segunda sesión corregida.

**Enlace:** OBJ-20 · Informe de reseña y encargo del buscador.

**Recuperación:** Reconstruir fixtures de chapter-20/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-20.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y recorrido Chromium verificado. Ejecución de marca local reproducida dentro del marco de origen opaco con entrada acotada. No se acredita Docker, Firefox ni prueba con principiante. Ver reports/browser-act-four-validation.json.
