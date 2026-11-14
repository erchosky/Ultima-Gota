# 32 · ¿Quién decide el precio?

Acto 7 · Escritorio y copia autorizada de tienda · día 0 · hito 32 después de las 10:00 (sin duración impuesta)

**De: Sam**

En el carrito viajan producto, cantidad y un dato de precio. Quiero comprobar si el servidor usa su catálogo o confía en lo que manda la página. Trabajaremos con una factura de práctica sin pago real. Mantén el producto y la cantidad; cambia solo el precio del cuerpo y consulta después el total que quedó guardado. Si editas una cifra de la pantalla no sabremos nada sobre la factura. Usa como referencia la ficha del producto y las reglas que acabamos de escribir. Después comprobaremos una compra normal en la copia corregida para asegurarnos de que recalcular no rompe la venta legítima.

**Importa porque:** un carrito envía datos de precio junto a las cantidades, y una factura de pruebas parece incorrecta.

**Reutiliza:** 12, 16, 31

**Añade S32:** comprobar que el servidor calcula el precio a partir de sus datos autorizados.

**Objetivo:** variar el precio enviado manteniendo producto y cantidad, y consultar el total persistido del pedido ficticio.

**Estado inicial:** fixture campaign-v1 y snapshot propio 32; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Debe decidir el total el precio enviado por el navegador o el catálogo del servidor?

## Apoyo guiado

1. El cliente puede proponer datos, pero el servidor decide el precio autorizado.
2. Mira unitPriceCents en el pedido de práctica.
3. Conserva producto2 y cantidad2 al variar el precio.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. El cliente puede proponer datos, pero el servidor decide el precio autorizado.
2. Mira unitPriceCents en el pedido de práctica.
3. Conserva producto2 y cantidad2 al variar el precio.
4. Envía producto2, quantity2 y unitPriceCents=1. Lee total persistido: vulnerable2 frente a corregida420 céntimos. Repite compra normal a210.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Vulnerable persiste total2; corregida recalcula420 para misma identidad, producto y cantidad.

**No basta:** Editar solo el total visible o aplicar otro cupón.

**Cuaderno:** EV-32; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

un total cambiado solo en pantalla no demuestra fraude. Sam aporta dos usos del mismo cupón.

El total persistido consultado después, manteniendo las demás condiciones.

**Pregunta:** ¿Qué prueba que el precio enviado afectó al negocio?

**Corrección:** Ignorar precios del cliente y calcular con catálogo autorizado en servidor.

**Prueba positiva:** Compra normal de dos peras total420.

**Prueba negativa:** Precio cliente de1 no reduce total corregido.

**Enlace:** OBJ-32 · Factura de prueba y referencia de operación.

**Recuperación:** Reconstruir fixtures de chapter-32/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-32.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
