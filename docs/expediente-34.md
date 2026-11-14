# 34 · Un pedido que saltó un paso

Acto 7 · Escritorio y copia autorizada de tienda · día 0 · hito 34 después de las 10:00 (sin duración impuesta)

**De: Sam**

Un pedido de práctica figura enviado, pero no pasó por preparado. Hemos dibujado sus estados válidos: creado, pagado, preparado y enviado. No hay cobro real; pagado es un estado ficticio del laboratorio. El servicio de almacén solo debe pasar de preparado a enviado con la cuenta autorizada. Como ya corregimos la propiedad de lectura, no vamos a volver a romperla: el nuevo caso trata de una transición distinta. Prueba el salto y una transición legítima con la misma cuenta de almacén. Mira el estado persistido y no el texto del botón, porque el botón visible no define las reglas del servidor.

**Importa porque:** un pedido aparece enviado sin haber completado las comprobaciones necesarias.

**Reutiliza:** 10, 11, 12, 13, 14, 15, 31

**Añade S34:** verificar que una transición entre estados de un pedido está permitida.

**Objetivo:** representar los estados del pedido y probar una transición válida y otra que salta una condición necesaria.

**Estado inicial:** fixture campaign-v1 y snapshot propio 34; cuentas almacen.sam. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Puede saltarse creado→enviado porque el cliente mande el estado final?

## Apoyo guiado

1. Una transición necesita estado anterior y autorización apropiados.
2. Mira el diagrama y el endpoint de transiciones de almacén.
3. Compara salto con el paso preparado→enviado.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Una transición necesita estado anterior y autorización apropiados.
2. Mira el diagrama y el endpoint de transiciones de almacén.
3. Compara salto con el paso preparado→enviado.
4. Con almacen.sam envía creado→enviado en la copia vulnerable; en corregida comprueba rechazo. Prepara un pedido y prueba preparado→enviado permitido, sin cambiar propietarios.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Salto persiste en vulnerable; corregida bloquea y permite preparado→enviado con almacén autorizado.

**No basta:** Leer el botón deshabilitado sin probar la ruta.

**Cuaderno:** EV-34; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

el botón visible no define por sí solo las transiciones válidas. Almacén pregunta qué sucede con la última unidad disponible.

Identidad autorizada, estado actual y transición permitida.

**Pregunta:** ¿Qué debe comprobar el servidor además del estado pedido?

**Corrección:** Máquina de estados con control de rol y precondiciones por transición.

**Prueba positiva:** Almacén envía pedido preparado.

**Prueba negativa:** Pedido creado no puede pasar directamente a enviado.

**Enlace:** OBJ-34 · Diagrama de estados y aviso de última unidad.

**Recuperación:** Reconstruir fixtures de chapter-34/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-34.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
