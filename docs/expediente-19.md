# 19 · Una acción que la página no esperaba

Acto 4 · Escritorio y copia autorizada de tienda · día 0 · hito 19 después de las 10:00 (sin duración impuesta)

**De: Lara**

Ya has localizado el recorrido del mensaje y sabes que su destino interpreta contenido. Autorizo comprobar una consecuencia concreta en esta copia: que una entrada provoque una marca de demostración mediante JavaScript. La guía explicará cada fragmento de la muestra antes de pedir que lo uses. No buscamos enviar datos ni afectar a otras páginas. La mesa repetirá la prueba en un navegador aislado, empezando desde la entrada que guardes. Escribir una marca con el inspector o la consola no demostraría este recorrido. Después compararemos con el destino corregido y conservaremos la diferencia, junto con el límite de que solo hemos probado esta página de laboratorio.

**Importa porque:** Lara autoriza comprobar si el recorrido anterior puede ejecutar una acción inocua en el navegador del laboratorio.

**Reutiliza:** 05, 17, 18

**Añade S19:** demostrar ejecución de JavaScript provocada por una entrada no confiable.

**Objetivo:** construir o completar progresivamente una carga de demostración que muestre una marca local. Explica cada fragmento antes de exigir su uso.

**Predicción:** ¿Una marca escrita manualmente demostraría que el mensaje ejecuta instrucciones?

## Apoyo guiado

1. La ejecución debe proceder de la entrada no confiable.
2. Usa la página y destino que seguiste en el 18.
3. Completa la muestra inocua explicada y conserva su URL de entrada.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. La ejecución debe proceder de la entrada no confiable.
2. Usa la página y destino que seguiste en el 18.
3. Completa la muestra inocua explicada y conserva su URL de entrada.
4. En la copia vulnerable usa la muestra de imagen con onerror que establece data-demo en #marca. Pide reproducción aislada desde la URL; compara con textContent corregido. Abre la demostración LESSON-19 para leer cada fragmento y copiar la muestra ya explicada con el nonce de tu ejecución.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Evaluador limpio carga la entrada del run, observa ejecución de la marca ligada al nonce y la bloquea en corregida.

**No basta:** HTML interpretado sin ejecución o marca escrita manualmente.

**Cuaderno:** EV-19; identidad, recurso, reloj, petición, esperado, observado y reproducción independiente cuando corresponde.

## Cierre

introducir XSS basado en DOM en relación con el recorrido observado. Una reseña de producto plantea si el dato puede persistir.

Aquí una entrada provoca ejecución de JavaScript y el navegador aislado reproduce ese recorrido.

**Pregunta:** ¿Qué diferencia esta prueba de la negrita del 17?

**Corrección:** Destino textContent para mensaje; mantener entrada como texto.

**Prueba positiva:** Mensaje inocuo legible.

**Prueba negativa:** Muestra de ejecución no produce marca en corregida.

**Enlace:** OBJ-19 · Prueba local de ejecución y encargo de reseña.

**Recuperación:** Reconstruir fixtures de chapter-19/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-19.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y recorrido Chromium verificado. Ejecución de marca local reproducida dentro del marco de origen opaco con entrada acotada. No se acredita Docker, Firefox ni prueba con principiante. Ver reports/browser-act-four-validation.json.
