# 33 · El descuento que volvió

Acto 7 · Escritorio y copia autorizada de tienda · día 0 · hito 33 después de las 10:00 (sin duración impuesta)

**De: Sam**

Aparece dos veces el descuento en un pedido de pruebas. Mercurio reenvía una operación cuando no sabe si llegó la respuesta anterior; ese reintento puede ser legítimo. Queremos que volver a recibir el mismo identificador no aplique otra vez su efecto. Esa propiedad se llama idempotencia. Usaremos una operación ya aceptada y conservaremos su identificador al reenviarla. Anota total y número de aplicaciones antes y después. Un registro histórico de las 09:15 muestra un reintento de Mercurio; no lo mezcles con una acusación contra visitante-17 solo porque ambos aparecen durante la misma mañana. Primero demuestra el comportamiento del descuento.

**Importa porque:** hay pedidos con un cupón que debía utilizarse una sola vez.

**Reutiliza:** 11, 28, 31, 32

**Añade S33:** verificar que un reintento de una operación no aplica dos veces el mismo efecto.

**Objetivo:** reenviar una operación ya aceptada con el mismo identificador de operación, dentro de un pedido ficticio.

**Estado inicial:** fixture campaign-v1 y snapshot propio 33; cuentas demo.pera, proveedor.mercurio. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Debería un reintento con el mismo operationId descontar otra vez?

## Apoyo guiado

1. Repetir la recepción no debe repetir un efecto ya confirmado.
2. Compara operationId, aplicaciones y total del pedido205 de práctica.
3. Reenvía exactamente la operación de cupón aceptada.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Repetir la recepción no debe repetir un efecto ya confirmado.
2. Compara operationId, aplicaciones y total del pedido205 de práctica.
3. Reenvía exactamente la operación de cupón aceptada.
4. Con subtotal2000 y PRIMERBRINDIS reenvía op-mercurio-7: vulnerable aplica400 en total; corregida mantiene200 y una aplicación. Comprueba también otra operación de la misma cuenta.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Mismo operationId produce doble efecto vulnerable, único efecto corregido; otro ID no elude límite por cuenta.

**No basta:** Dos IDs distintos presentados como un mismo reintento.

**Cuaderno:** EV-33; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

introducir idempotencia con un ejemplo sencillo. Un registro identifica el reintento legítimo de Mercurio, sin demostrar intención maliciosa.

Puede ser una recuperación legítima de entrega; los registros lo distinguen del actor sintético.

**Pregunta:** ¿Por qué el reintento no demuestra intención maliciosa?

**Corrección:** Clave única de operación y consumo del cupón por cuenta en una transacción.

**Prueba positiva:** Primera aplicación produce descuento200.

**Prueba negativa:** Reintento y nuevo ID de cuenta consumida no duplican descuento.

**Enlace:** OBJ-33 · Registro del reintento legítimo de las 09:15.

**Recuperación:** Reconstruir fixtures de chapter-33/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-33.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
