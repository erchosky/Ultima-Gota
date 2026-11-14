# 43 · La tienda visita por ti

Acto 9 · Escritorio y copia autorizada de tienda · día 0 · hito 43 después de las 10:00 (sin duración impuesta)

**De: Sam**

La previsualización de imágenes de proveedores acepta una dirección y la consulta por nosotros. Hasta ahora muchas peticiones salían del navegador; esta función hace una desde el servidor. El mapa del laboratorio contiene un catálogo autorizado y un servicio interno ficticio que no debería mostrarse en esa función. Solo esos destinos están disponibles para el ejercicio. Cambia la selección al servicio interno y observa tanto la respuesta como el registro de recepción. No escribas direcciones de otros equipos ni servicios externos. Si aparece información interna, tendremos que comprobar qué componente la pidió y qué control de negocio debía limitar su destino.

**Importa porque:** la función de previsualizar imágenes de proveedores hace que el servidor consulte una dirección recibida del usuario.

**Reutiliza:** 03, 12, 41

**Añade S43:** comprobar desde qué componente se realiza una petición y qué servicios puede alcanzar.

**Objetivo:** dirigir la previsualización a un servicio ficticio de intranet permitido únicamente dentro de la red del ejercicio.

**Estado inicial:** fixture campaign-v1 y snapshot propio 43; cuentas proveedor.mercurio. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Qué equipo hace la consulta de previsualización: tu navegador o el servicio de tienda?

## Apoyo guiado

1. Sigue el flujo completo y separa origen de la petición de su destino.
2. Consulta el diagrama y los dos destinos sintéticos del selector.
3. Selecciona intranet y contrasta el registro de recepción.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Sigue el flujo completo y separa origen de la petición de su destino.
2. Consulta el diagrama y los dos destinos sintéticos del selector.
3. Selecciona intranet y contrasta el registro de recepción.
4. Envía el destino fijo intranet:4400/estado a la previsualización vulnerable; registra solicitud real de tienda e información expuesta. En corregida deniega intranet y permite catalog:4400/imagen.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Servicio interno registra requestId originado por tienda, cuerpo expuesto vulnerable, destino denegado corregido; catálogo legítimo funciona.

**No basta:** Una respuesta simulada sin solicitud o cualquier destino ajeno al recinto.

**Cuaderno:** EV-43; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

introducir SSRF tras observar el flujo. El entorno bloquea destinos externos, metadatos de nube reales y el anfitrión.

El servidor realiza una solicitud controlada por entrada que alcanza un destino indebido para la función.

**Pregunta:** ¿Por qué este comportamiento se llama SSRF?

**Corrección:** Lista de destinos de negocio autorizados más guardián independiente de salida del recinto.

**Prueba positiva:** Imagen del catálogo sintético sigue disponible.

**Prueba negativa:** Intranet indebida y cualquier destino externo no se consultan en corregida.

**Enlace:** OBJ-43 · Traza servidor→intranet y enlace de seguimiento.

**Recuperación:** Reconstruir fixtures de chapter-43/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-43.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
