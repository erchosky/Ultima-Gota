# 45 · El mensaje sin firma

Acto 9 · Escritorio y copia autorizada de tienda · día 0 · hito 45 después de las 10:00 (sin duración impuesta)

**De: Nico**

Una notificación logística cambió el estado de un pedido y necesitamos comprobar si el servicio verificó su procedencia. Mercurio puede firmar mensajes: un valor calculado con un secreto compartido permite detectar modificaciones y comprobar que el emisor conoce ese secreto. No tienes que implementar criptografía ni conocer el secreto del servicio. La mesa prepara un mensaje legítimo, uno alterado y otro sin firma. Usa un pedido en estado preparado y compara qué acepta cada versión. La transición de estados ya está corregida, así que no confundiremos este problema con saltarse un paso. La firma tampoco resolverá por sí sola la repetición de un mensaje válido.

**Importa porque:** una notificación logística hizo avanzar un pedido; hay que saber si provenía realmente del proveedor.

**Reutiliza:** 12, 15, 33, 34

**Añade S45:** comprobar autenticidad e integridad de un mensaje firmado por el servicio ficticio.

**Objetivo:** comparar un mensaje legítimo, uno modificado y otro sin firma. Explica la finalidad de una firma de mensaje sin exigir implementar criptografía.

**Estado inicial:** fixture campaign-v1 y snapshot propio 45; cuentas proveedor.mercurio. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Un mensaje con formato correcto demuestra que lo envió Mercurio?

## Apoyo guiado

1. Formato válido, autenticidad y repetición son controles separados.
2. Mira cuerpo exacto y resultado de verificación en el receptor logístico.
3. Compara mensaje firmado, alterado y sin firma sobre snapshots equivalentes.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Formato válido, autenticidad y repetición son controles separados.
2. Mira cuerpo exacto y resultado de verificación en el receptor logístico.
3. Compara mensaje firmado, alterado y sin firma sobre snapshots equivalentes.
4. Envía muestras preparadas con firma válida, cuerpo modificado y firma ausente. Vulnerable acepta sin autenticar; corregida verifica HMAC del cuerpo exacto, rechaza alterado/ausente y permite legítimo.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Tres mensajes reales por versión con preestado preparado; resultado de autenticidad y transición persistida contrastados.

**No basta:** Rechazo causado solo por estado incompatible o fabricar firma en cliente.

**Cuaderno:** EV-45; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

autenticidad no resuelve por sí sola repeticiones; relaciona ese límite con el capítulo 33. Los registros de este caso abren la investigación final.

No; autenticidad e integridad no sustituyen idempotencia ni control de repetición.

**Pregunta:** ¿Una firma válida evita recibir dos veces el mismo mensaje?

**Corrección:** HMAC-SHA256 servidor sobre bytes del cuerpo, comparación segura y control de operación separado.

**Prueba positiva:** Mensaje firmado legítimo pasa a enviado.

**Prueba negativa:** Alterado o sin firma no cambia el pedido corregido.

**Enlace:** OBJ-45 · Registro no autenticado de las 09:10, sin atribución personal.

**Recuperación:** Reconstruir fixtures de chapter-45/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-45.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
