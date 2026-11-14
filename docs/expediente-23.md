# 23 · Dos preguntas, dos respuestas

Acto 5 · Escritorio y copia autorizada de tienda · día 0 · hito 23 después de las 10:00 (sin duración impuesta)

**De: Lara**

La diferencia con la comilla se repite. Ahora necesitamos una prueba más precisa: dos entradas que solo cambien una condición explicada, una verdadera y otra falsa. Te mostraré cómo se construye la consulta de esta copia y qué significan los operadores usados. Trabajamos únicamente con los productos ficticios de la tabla conocida. Si el resultado sigue la condición introducida como instrucción, tendremos una demostración de que el buscador mezcla datos y lógica. Guarda ambas respuestas, no solo la más llamativa. No hace falta buscar otras bases ni recopilar información adicional para responder a la pregunta de este expediente.

**Importa porque:** hay que comprobar si el buscador mezcla datos introducidos con instrucciones de consulta.

**Reutiliza:** 05, 21, 22

**Añade S23:** contrastar una condición verdadera y una falsa dentro del escenario de inyección.

**Objetivo:** completar una pareja de entradas explicadas que produzcan resultados distintos sobre productos ficticios. La guía enseña los operadores necesarios antes del intento.

**Estado inicial:** fixture campaign-v1 y snapshot propio 23; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Qué diferencia esperarías entre una condición verdadera y otra falsa si alteran la consulta?

## Apoyo guiado

1. Dos condiciones opuestas permiten contrastar una hipótesis concreta.
2. Usa la consulta de productos y la pareja explicada en la mesa.
3. Mantén la estructura y cambia solo 1=1 por 1=2.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Dos condiciones opuestas permiten contrastar una hipótesis concreta.
2. Usa la consulta de productos y la pareja explicada en la mesa.
3. Mantén la estructura y cambia solo 1=1 por 1=2.
4. En esta consulta didáctica usa la pareja exacta de la guía: comilla, OR 1=1 y comentario frente a comilla, OR 1=2 y comentario. Compara conjuntos de productos y repite.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Consulta vulnerable SQLite ejecutada realmente; pareja verdadera devuelve seis productos y falsa ninguno, con eventos del run.

**No basta:** Un error de sintaxis, respuesta de otra ejecución o solo una condición.

**Cuaderno:** EV-23; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

distinguir un fallo demostrado de una sospecha. No se requiere enumerar otras bases ni extraer todos sus datos.

La entrada ha alterado la lógica de selección de la consulta en esta copia.

**Pregunta:** ¿Qué demuestra que el resultado siga la condición enviada?

**Corrección:** Sustituir interpolación por parámetro SQL; la entrada ocupa un valor.

**Prueba positiva:** Búsqueda pera sigue encontrando producto 2.

**Prueba negativa:** Pareja de entradas no altera condiciones en versión parametrizada.

**Enlace:** OBJ-23 · Prueba contrastada de alteración de lógica.

**Recuperación:** Reconstruir fixtures de chapter-23/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-23.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
