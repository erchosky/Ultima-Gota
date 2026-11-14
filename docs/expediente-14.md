# 14 · Una respuesta que cuenta demasiado

Acto 3 · Escritorio y copia autorizada de tienda · día 0 · hito 14 después de las 10:00 (sin duración impuesta)

**De: Vera**

Los mensajes de error que recibe soporte no son fáciles de comparar. Algunas respuestas dicen poco y otra muestra información interna de Mercurio. Vamos a preparar una tabla pequeña con peticiones válidas, sin sesión, sin permiso y con datos mal formados. Cada respuesta tiene un estado HTTP, un número que orienta sobre el resultado, y un cuerpo que puede aportar detalles. Lara te dará una referencia para 200, 400, 401, 403 y 404. No decidas solo por el número: una aplicación puede responder 200 con un mensaje de denegación. Busca qué contenido realmente aparece y qué información no necesitaba conocer quien hizo la consulta.

**Importa porque:** soporte recibe errores confusos y algunos mensajes revelan detalles de la integración.

**Reutiliza:** 03, 11, 12, 13

**Añade S14:** interpretar una tabla pequeña de estados HTTP y distinguir un error útil de una filtración interna.

**Objetivo:** comparar solicitudes válidas, sin sesión, sin permiso y con formato incorrecto. Introduce 200, 400, 401, 403 y 404 con sus límites; no deduzcas autorización solo por el número.

**Predicción:** ¿Un estado 200 garantiza que una operación privada se haya permitido?

## Apoyo guiado

1. Código y contenido son observaciones distintas.
2. Compara seis respuestas reales en la mesa: hay cinco códigos distintos porque dos casos devuelven200.
3. Compara estado, mensaje y presencia de detalles internos ficticios.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Código y contenido son observaciones distintas.
2. Usa la tabla de respuestas del diagnóstico de soporte.
3. Compara estado, mensaje y presencia de detalles internos ficticios.
4. Ejecuta seis casos: soporte con Vera200; sin sesión401; cliente403; referencia numérica400; producto999404; legado200 con allowed:false. Anota los cinco códigos y la ruta ficticia mercurio/catalog del error.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Seis eventos reales, cinco códigos distintos,200 permitido y200 denegado; contenido interno ficticio observado.

**No basta:** Clasificar cualquier 500 como inyección.

**Cuaderno:** EV-14; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre

un 200 puede contener una denegación y un error no demuestra inyección. Nico prepara una corrección verificable.

Una filtración concreta de información interna, sin demostrar acceso a ese servicio.

**Pregunta:** ¿Qué demuestra el detalle interno que aparece en el error?

**Corrección:** Errores públicos mínimos con referencia de diagnóstico y detalles solo en registro interno ficticio.

**Prueba positiva:** Entrada válida devuelve resultado útil.

**Prueba negativa:** Entrada mal formada no filtra ruta ni traza.

**Enlace:** OBJ-14 · Tabla de respuestas para la corrección.

**Recuperación:** Reconstruir fixtures de chapter-14/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-14.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido verificado en Chromium. Reenvío nativo por CDP probado; menú visual no acreditado. Firefox, Docker y principiante pendientes. Ver reports/browser-act-three-validation.json.
