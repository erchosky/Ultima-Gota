# 40 · La caja de exportaciones

Acto 8 · Escritorio y copia autorizada de tienda · día 0 · hito 40 después de las 10:00 (sin duración impuesta)

**De: Vera**

Una referencia del documento anterior apunta a una muestra de exportación. Debería estar restringida, pero quizá se copió a la publicación pública cuando se preparó una demostración. Buscaremos únicamente el recurso citado y conservaremos una muestra mínima que permita demostrar el acceso. No hace falta descargar más archivos. Existe también una exportación de soporte con control propio; no son la misma ruta. La corrección debe retirar la copia pública y conservar la descarga autorizada donde corresponda. Encontrar un archivo concreto no demuestra que se extrajera toda la base ni que este acceso ocurriera durante el incidente histórico.

**Importa porque:** una carpeta de exportaciones contiene datos ficticios que no deben ser públicos y un recurso conserva una referencia a ella.

**Reutiliza:** 06, 10, 36, 37, 38, 39

**Añade S40:** verificar que un recurso interno no se distribuye en la publicación pública.

**Objetivo:** localizar una exportación concreta siguiendo la referencia del caso y comprobar su acceso sin permisos; después verificar la configuración corregida.

**Estado inicial:** fixture campaign-v1 y snapshot propio 40; cuentas anonymous, soporte.vera, demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Ocultar el enlace impediría abrir una ruta pública que ya conocemos?

## Apoyo guiado

1. La publicación debe excluir recursos internos; ocultar enlaces no controla acceso.
2. Sigue la referencia de la etiqueta al recurso concreto.
3. Prueba sin sesión y compara con la descarga autorizada de soporte.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. La publicación debe excluir recursos internos; ocultar enlaces no controla acceso.
2. Sigue la referencia de la etiqueta al recurso concreto.
3. Prueba sin sesión y compara con la descarga autorizada de soporte.
4. Solicita /exports/muestra-publicada.csv sin sesión. En corregida debe estar ausente; soporte.vera conserva /api/support/exports/muestra-soporte.csv y cliente recibe denegación. Guarda solo muestra mínima.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Acceso anónimo a copia pública vulnerable; retirada corregida y exportación soporte permitida solo a rol autorizado.

**No basta:** Equiparar esta copia pública al acceso histórico de soporte o afirmar extracción completa.

**Cuaderno:** EV-40; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

ocultar el enlace no protege el archivo. Una referencia de integración conecta la exportación con servicios internos de Mercurio.

Acceso a ese recurso y contenido concreto, no descargas adicionales ni toda la base.

**Pregunta:** ¿Qué alcance demuestra el archivo accesible?

**Corrección:** Excluir exportación del build público y servir versión interna por ruta autorizada.

**Prueba positiva:** Soporte descarga muestra-soporte.

**Prueba negativa:** Anónimo no obtiene copia pública ni exportación interna.

**Enlace:** OBJ-40 · Muestra mínima y mapa de servicios de Mercurio.

**Recuperación:** Reconstruir fixtures de chapter-40/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-40.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
