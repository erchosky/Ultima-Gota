# 22 · Una comilla fuera de sitio

Acto 5 · Escritorio y copia autorizada de tienda · día 0 · hito 22 después de las 10:00 (sin duración impuesta)

**De: Sam**

Al probar una búsqueda con una comilla obtuve un error que no aparece con pera. No sabemos todavía si el carácter cambia la consulta o si ocurrió otro problema. La tabla del caso anterior nos ayuda a describir lo que esperábamos encontrar. Vamos a comparar una entrada normal con una variación mínima, repitiendo ambas en la misma copia. Conserva la entrada exacta, el estado y el contenido de la respuesta. Un error será una observación que merece investigar, pero no nos autoriza a decir que accedimos a datos ajenos. Necesitamos aislar la diferencia antes de intentar una explicación más fuerte.

**Importa porque:** el buscador falla con un nombre de producto que contiene una comilla.

**Reutiliza:** 11, 12, 14, 21

**Añade S22:** aislar un carácter de entrada que cambia el comportamiento de una consulta vulnerable.

**Objetivo:** comparar una búsqueda normal y otra con una variación mínima, repitiendo para descartar un fallo casual.

**Estado inicial:** fixture campaign-v1 y snapshot propio 22; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Un error al introducir una comilla demuestra por sí solo una inyección explotable?

## Apoyo guiado

1. Varía una sola cosa y repite para descartar un fallo casual.
2. Mira entrada y respuesta de /api/search en Red.
3. Compara pera con pera seguida de una comilla.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Varía una sola cosa y repite para descartar un fallo casual.
2. Mira entrada y respuesta de /api/search en Red.
3. Compara pera con pera seguida de una comilla.
4. Ejecuta pera, pera con comilla, pera y pera con comilla. Registra las cuatro entradas y respuestas de la misma ejecución sin concluir extracción de datos.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Cuatro eventos alternados con diferencia estable de respuesta asociada a comilla; conclusión expresa hipótesis.

**No basta:** Un único error o atribuir acceso a contraseñas.

**Cuaderno:** EV-22; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

un error sugiere una hipótesis; todavía no demuestra acceso a datos ajenos. Lara propone contrastarla con una condición controlada.

Una diferencia reproducible compatible con construcción incorrecta; falta demostrar alteración de lógica.

**Pregunta:** ¿Qué conclusión permite esta comparación?

**Corrección:** La parametrización se verificará en el 24; por ahora conservar hipótesis y reproducción.

**Prueba positiva:** Búsqueda normal devuelve pera.

**Prueba negativa:** Un error aislado no acredita inyección demostrada.

**Enlace:** OBJ-22 · Pareja mínima para contrastar la consulta.

**Recuperación:** Reconstruir fixtures de chapter-22/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-22.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
