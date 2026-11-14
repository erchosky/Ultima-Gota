# 24 · Datos que vuelven a ser datos

Acto 5 · Escritorio y copia autorizada de tienda · día 0 · hito 24 después de las 10:00 (sin duración impuesta)

**De: Nico**

He cambiado el buscador para enviar tu entrada como un valor separado de la instrucción de consulta. Eso se llama parametrizar. No vamos a darlo por bueno por el nombre del cambio. Repite la pareja del expediente anterior y una búsqueda normal en las dos versiones. La vista didáctica mostrará dónde queda el valor sin pedirte editar el servidor. Una corrección útil debe impedir que la entrada cambie la lógica y conservar búsquedas válidas, incluidos caracteres que puedan formar parte de un nombre. Guarda resultados y expectativas; estas pruebas servirán luego para comprobar que una promoción nueva no devuelve el mismo fallo.

**Importa porque:** Nico sustituye la construcción de la consulta por parámetros.

**Reutiliza:** 15, 23

**Añade S24:** comprobar que una consulta parametrizada trata la entrada como un valor.

**Objetivo:** repetir búsquedas legítimas y entradas del ejercicio anterior en ambas versiones.

**Estado inicial:** fixture campaign-v1 y snapshot propio 24; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Una entrada con palabras de consulta debería cambiar la lógica al tratarse como valor?

## Apoyo guiado

1. Separar instrucción y valor evita interpretar el valor como SQL.
2. Compara las versiones del buscador en la mesa.
3. Repite la pareja del 23 y después busca pera normalmente.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Separar instrucción y valor evita interpretar el valor como SQL.
2. Compara las versiones del buscador en la mesa.
3. Repite la pareja del 23 y después busca pera normalmente.
4. En corregida envía las entradas verdadera y falsa del 23: ambas son datos sin coincidencia. Busca pera y confirma producto2. Contrasta con vulnerable y guarda las tres pruebas.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Tres pruebas en ambas versiones; corregida conserva búsqueda y no cambia lógica con la pareja.

**No basta:** Bloquear toda búsqueda o filtrar solo una palabra.

**Cuaderno:** EV-24; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

validar entrada y parametrizar resuelven problemas distintos. La revisión genera evidencias que deben ordenarse temporalmente.

No; separa datos e instrucción sin depender de prohibir un carácter concreto.

**Pregunta:** ¿Parametrizar equivale a prohibir toda comilla?

**Corrección:** Consulta parametrizada, sin concatenación del valor a SQL.

**Prueba positiva:** Pera devuelve id2 y texto con comilla se maneja como dato.

**Prueba negativa:** Entradas de lógica no amplían resultados.

**Enlace:** OBJ-24 · Resultados de corrección del buscador.

**Recuperación:** Reconstruir fixtures de chapter-24/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-24.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
