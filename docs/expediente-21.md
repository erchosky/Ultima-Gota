# 21 · La libreta del almacén

Acto 5 · Escritorio y copia autorizada de tienda · día 0 · hito 21 después de las 10:00 (sin duración impuesta)

**De: Sam**

Mi libreta tiene una fila por producto y varias columnas, como identificador, nombre y precio. La base de datos organiza información de una forma parecida. En la mesa veremos una tabla de seis productos y una consulta SELECT sencilla: pide algunas columnas de las filas que cumplen una condición. Primero predecirás qué productos coinciden y después lo comprobarás en el buscador preparado. Esta vista es una lección autorizada, no una entrada oculta al servidor. No necesitas programar consultas nuevas ni conocer otras tablas. Quiero que puedas relacionar una condición concreta con las filas que realmente devuelve la aplicación.

**Importa porque:** Sam necesita entender cómo el buscador selecciona productos de su inventario.

**Reutiliza:** 01, 02, 03

**Añade S21:** leer una consulta SELECT sencilla como una selección de filas con una condición.

**Objetivo:** comparar una tabla de productos ficticios con el resultado del buscador en una vista didáctica. Presenta tabla, fila, columna y condición con ejemplos pequeños.

**Estado inicial:** fixture campaign-v1 y snapshot propio 21; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Qué filas cumplirán la condición id <= 2 en la tabla de seis productos?

## Apoyo guiado

1. Una condición selecciona filas; las columnas indican qué datos se muestran.
2. Mira la tabla didáctica y su consulta SELECT.
3. Predice los identificadores antes de ejecutar la consulta preparada.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Una condición selecciona filas; las columnas indican qué datos se muestran.
2. Mira la tabla didáctica y su consulta SELECT.
3. Predice los identificadores antes de ejecutar la consulta preparada.
4. Selecciona la consulta SELECT id,name FROM products WHERE id <= 2 y predice 1 y 2. Ejecuta desde la mesa y contrasta esas dos filas con las fichas.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Predicción estructurada y consulta real acotada devuelven exactamente productos 1 y 2.

**No basta:** Elegir filas sin ejecutar la comprobación o pedir otras tablas.

**Cuaderno:** EV-21; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

esta vista es una lección explícita, no un acceso secreto a soluciones futuras. Una búsqueda con un carácter especial se comporta de forma inesperada.

Filtra qué filas se incluyen en el resultado.

**Pregunta:** ¿Qué hace la condición de esta consulta?

**Corrección:** No hay fallo; mantener vistas didácticas de consultas fijas.

**Prueba positiva:** Consulta preparada devuelve filas 1 y 2.

**Prueba negativa:** Mesa no acepta SQL arbitrario.

**Enlace:** OBJ-21 · Tabla del catálogo y búsqueda con comilla.

**Recuperación:** Reconstruir fixtures de chapter-21/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-21.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
