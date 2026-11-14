# 37 · Fuera de la carpeta

Acto 8 · Escritorio y copia autorizada de tienda · día 0 · hito 37 después de las 10:00 (sin duración impuesta)

**De: Lara**

Ya conocemos la carpeta pública del almacén ficticio. Ahora comprobaremos si una ruta relativa puede salir de esa carpeta y alcanzar un documento reservado del mismo árbol de pruebas. La guía explica qué significa subir al nivel anterior antes de pedir que construyas la ruta. El árbol vive dentro del ejercicio: no representa carpetas reales de tu ordenador y ninguna entrada se pasará al lector de archivos del sistema. Compara una descarga permitida con el intento de cruzar el límite y conserva la respuesta mínima necesaria. La corrección debe normalizar y comprobar el destino completo, no limitarse a borrar una secuencia de caracteres.

**Importa porque:** el servicio de documentos podría permitir salir de la carpeta pública del almacén.

**Reutiliza:** 15, 36

**Añade S37:** comprobar la normalización de rutas y el límite de un directorio autorizado.

**Objetivo:** construir una ruta relativa dentro del almacén ficticio y acceder a un documento de pruebas que queda fuera de la carpeta permitida.

**Estado inicial:** fixture campaign-v1 y snapshot propio 37; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Comprobar solo el comienzo de una ruta basta si después se normaliza?

## Apoyo guiado

1. Compara la ubicación final normalizada con la raíz autorizada.
2. Mira public y reservado en el árbol virtual.
3. Construye una ruta que suba un nivel dentro del árbol de pruebas.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Compara la ubicación final normalizada con la raíz autorizada.
2. Mira public y reservado en el árbol virtual.
3. Construye una ruta que suba un nivel dentro del árbol de pruebas.
4. En vulnerable solicita ../reservado/nota-mercurio.txt desde public. En corregida verifica rechazo y descarga pública legítima. Ninguna ruta se resolverá sobre el sistema real.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Lectura virtual cruza public hacia reservado en vulnerable; corregida bloquea; guardián de árbol impide cualquier archivo real.

**No basta:** Un error de ruta o lectura del host para demostrar el caso.

**Cuaderno:** EV-37; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

el fallo es de recorrido de rutas; eliminar una secuencia concreta no demuestra una solución completa. Aparece una función de subida de etiquetas.

Puede haber representaciones equivalentes; importa el destino normalizado y su pertenencia a la raíz.

**Pregunta:** ¿Por qué eliminar un único patrón no demuestra una solución completa?

**Corrección:** Resolver sobre árbol virtual y exigir contención en public tras normalización; permisos por documento.

**Prueba positiva:** Documento público autorizado sigue accesible.

**Prueba negativa:** Rutas relativas equivalentes y absolutas fuera de public no lo son.

**Enlace:** OBJ-37 · Nota sintética y formulario de etiquetas.

**Recuperación:** Reconstruir fixtures de chapter-37/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-37.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
