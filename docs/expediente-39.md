# 39 · Descargar o interpretar

Acto 8 · Escritorio y copia autorizada de tienda · día 0 · hito 39 después de las 10:00 (sin duración impuesta)

**De: Nico**

Aceptar una etiqueta y entregarla al navegador son dos fases distintas. Ahora tenemos un documento de marcado inocuo que no ejecuta instrucciones. Compararemos dos respuestas del mismo contenido: una se interpreta en pantalla y la otra se ofrece como descarga. Verás las cabeceras Content-Type y Content-Disposition, que indican tipo y disposición. También importa desde qué origen se sirve, porque no todo se resuelve con una sola cabecera. Guarda el contenido de referencia y el comportamiento observado en el navegador. No extrapoles este ejemplo a cualquier tipo de archivo: queremos documentar precisamente qué cambió en este contexto de laboratorio.

**Importa porque:** una etiqueta de demostración se abre en el navegador cuando debería descargarse como archivo.

**Reutiliza:** 17, 36, 38

**Añade S39:** interpretar las cabeceras de tipo de contenido y disposición de una descarga.

**Objetivo:** comparar dos respuestas para el mismo contenido inocuo y observar cómo cambia el tratamiento del navegador.

**Estado inicial:** fixture campaign-v1 y snapshot propio 39; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿El mismo contenido puede descargarse o interpretarse según cómo se sirva?

## Apoyo guiado

1. Almacenamiento y entrega tienen controles diferentes.
2. Compara cabeceras de las dos rutas de descarga preparadas.
3. Observa tipo, disposición y origen junto al efecto visible.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Almacenamiento y entrega tienen controles diferentes.
2. Compara cabeceras de las dos rutas de descarga preparadas.
3. Observa tipo, disposición y origen junto al efecto visible.
4. Carga la muestra HTML inocua inline como text/html y después como attachment con tipo fijo de descarga en origen auxiliar. Compara cabeceras y comportamiento en contexto limpio.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Misma muestra/hash, cabeceras registradas y navegador distingue interpretación de descarga en configuración concreta.

**No basta:** Atribuir toda protección a nosniff o afirmar ejecución JavaScript inexistente.

**Cuaderno:** EV-39; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

almacenar y servir son fases distintas. Una referencia en los documentos apunta a una exportación antigua.

Que esta combinación de tipo, disposición y origen produce el tratamiento observado para esta muestra.

**Pregunta:** ¿Qué podemos afirmar sobre la descarga corregida?

**Corrección:** Origen auxiliar sin cookies del aula, attachment, tipo previsto y nosniff como defensa complementaria.

**Prueba positiva:** Descarga autorizada mantiene bytes de la muestra.

**Prueba negativa:** Contenido de etiqueta no se interpreta como página de tienda.

**Enlace:** OBJ-39 · Cabeceras y referencia de exportación antigua.

**Recuperación:** Reconstruir fixtures de chapter-39/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-39.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
