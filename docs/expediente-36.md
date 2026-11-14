# 36 · Seguir la ruta del albarán

Acto 8 · Escritorio y copia autorizada de tienda · día 0 · hito 36 después de las 10:00 (sin duración impuesta)

**De: Sam**

El enlace de un albarán abre un documento que no esperaba. Hasta ahora has cambiado identificadores de productos y pedidos, pero este servicio también recibe una ruta de archivo. Una ruta describe una posición dentro de carpetas; no es lo mismo que el número comercial del pedido. La mesa mostrará un árbol pequeño y completamente ficticio. Localiza qué documento solicita el enlace y a quién pertenece. Compara también quién puede descargarlo. No intentes salir de la carpeta todavía: encontrar una ruta no demuestra que el servicio permita atravesar sus límites. Necesitamos distinguir primero selección de documento, propiedad y ubicación.

**Importa porque:** Sam envía un enlace de descarga que apunta al albarán equivocado.

**Reutiliza:** 01, 02, 03, 10

**Añade S36:** distinguir un identificador de negocio de una ruta de archivo utilizada por un servicio.

**Objetivo:** observar la descarga y reconocer sus partes con un pequeño árbol de carpetas ficticias. Verificar también quién debería poder descargar el documento.

**Estado inicial:** fixture campaign-v1 y snapshot propio 36; cuentas Alba, Bruno. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Un nombre de archivo demuestra quién tiene permiso para descargarlo?

## Apoyo guiado

1. Identidad comercial, ubicación y autorización son datos distintos.
2. Mira el enlace del albarán y el árbol virtual del almacén.
3. Relaciona pedido203, propietarioAlba y ruta de su albarán.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Identidad comercial, ubicación y autorización son datos distintos.
2. Mira el enlace del albarán y el árbol virtual del almacén.
3. Relaciona pedido203, propietarioAlba y ruta de su albarán.
4. Como Alba descarga /public/albaran-203.txt en el árbol de práctica. Registra ruta, documentId y propietario; compara con una descarga de Bruno denegada por propiedad.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Consulta real del documento correcto y relación ruta/documentId/orderId/ownerId; control de acceso cruzado.

**No basta:** Afirmar recorrido de rutas solo por ver barras en un parámetro.

**Cuaderno:** EV-36; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

un parámetro de archivo merece reglas diferentes de un número de producto. Lara propone comprobar el límite de la carpeta.

La ruta expresa ubicación en un árbol; el identificador nombra un objeto de negocio.

**Pregunta:** ¿Qué diferencia una ruta de un identificador de pedido?

**Corrección:** Mantener catálogo de documentos con propiedad y no derivar permiso del nombre.

**Prueba positiva:** Alba descarga su albarán203.

**Prueba negativa:** Alba no descarga documento204 de Bruno.

**Enlace:** OBJ-36 · Mapa del almacén virtual.

**Recuperación:** Reconstruir fixtures de chapter-36/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-36.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
