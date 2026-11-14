# 05 · La primera prueba útil

Acto 1 · Escritorio y copia autorizada de tienda · día 0 · hito 05 después de las 10:00 (sin duración impuesta)

**De: Mara**

Necesito un resumen que Nico pueda reproducir sin tener que preguntarte qué pantalla estabas mirando. Indica el producto, cómo llegaste a él y de dónde procede cada cifra. La hoja de Sam, la respuesta de datos y la ficha no son la misma fuente. Incluye también lo que ocurrió al editar el nombre localmente y recargar. Con esa prueba podremos cambiar la presentación y comprobar que otra ficha continúa funcionando. No necesito que busquemos un culpable: por ahora tenemos una discrepancia y un modo de reproducirla. Cuando cerremos esta revisión autorizo investigar la página antigua de verano que encontramos enlazada.

**Importa porque:** Mara necesita un resumen para corregir el precio y evitar que cada persona describa un problema diferente.

**Reutiliza:** 01, 02, 03, 04

**Añade S05:** registrar una evidencia reproducible separando esperado y observado.

**Objetivo:** completar una ficha con producto, pasos, valor esperado, valor recibido y prueba de que una edición local no altera los datos.

**Estado inicial:** fixture campaign-v1 y snapshot propio 05; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** Si corregimos solo la presentación, ¿debería cambiar el precio guardado del producto?

## Apoyo guiado

1. Una evidencia útil permite repetir el resultado y distingue esperado de observado.
2. Completa la ficha del cuaderno usando la hoja, la respuesta y la pantalla del producto 2.
3. Anota los pasos y los tres precios antes de probar la versión corregida.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Una evidencia útil permite repetir el resultado y distingue esperado de observado.
2. Completa la ficha del cuaderno usando la hoja, la respuesta y la pantalla del producto 2.
3. Anota los pasos y los tres precios antes de probar la versión corregida.
4. Registra producto 2, esperado 210, recibido 210 y visible 240 céntimos; repite la carga. Prueba el renderizado corregido y verifica también producto 1. Concluye fallo de presentación.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Reproducción nueva del precio; evidencia estructurada completa; versión corregida muestra 210 y producto 1 conserva 180; comprensión excluye ataque no probado.

**No basta:** Pulsar completar con un texto genérico o atribuir manipulación histórica sin registro.

**Cuaderno:** EV-05; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

todavía no se ha demostrado un ataque. Mara autoriza revisar la campaña antigua que quedó enlazada.

Solo demuestran un fallo reproducible de presentación. No tenemos evidencia de que alguien lo provocara durante el incidente.

**Pregunta:** ¿Qué podemos concluir sobre un ataque con estas pruebas?

**Corrección:** Mostrar el precio recibido con conversión monetaria consistente y retirar el valor de promoción incrustado.

**Prueba positiva:** Productos 1 y 2 muestran 180 y 210 céntimos respectivamente.

**Prueba negativa:** Cambiar el DOM no altera los valores persistidos.

**Enlace:** OBJ-05 · Autorización de Mara para revisar la campaña antigua.

**Recuperación:** Reconstruir fixtures de chapter-05/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-05.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y validador probado; recorrido completo comprobado en Chromium. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-validation.json.
