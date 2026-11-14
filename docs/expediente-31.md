# 31 · La letra pequeña del cupón

Acto 7 · Escritorio y copia autorizada de tienda · día 0 · hito 31 después de las 10:00 (sin duración impuesta)

**De: Mara**

Antes de revisar descuentos quiero que compartamos la misma regla. El cupón PRIMERBRINDIS ofrece un diez por ciento si el subtotal alcanza veinte euros, una vez por cuenta, y termina al comenzar el día uno. El descuento se calcula sobre el subtotal de productos antes de descuentos, en céntimos, con redondeo a la baja. No hemos acordado restricciones por sabor, barrio ni día de registro. Convierte estas condiciones en casos que podamos comprobar. La mesa preparará carritos ficticios a ambos lados del mínimo y del plazo. También necesitamos distinguir un primer uso de un intento posterior de la misma cuenta.

**Importa porque:** una promoción promete un uso por cuenta y un importe mínimo. Mara quiere saber qué significa cumplirla.

**Reutiliza:** 02, 03, 04, 05, 15

**Añade S31:** convertir una regla de negocio escrita en condiciones comprobables.

**Objetivo:** construir una tabla pequeña con casos válidos e inválidos para un cupón de pruebas.

**Estado inicial:** fixture campaign-v1 y snapshot propio 31; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Un subtotal de 19,99 euros cumple el mínimo de veinte?

## Apoyo guiado

1. Cada condición escrita necesita al menos un caso que la distinga.
2. Consulta la ficha central de PRIMERBRINDIS en el cuaderno.
3. Forma casos para mínimo, cuenta, fecha y redondeo.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Cada condición escrita necesita al menos un caso que la distinga.
2. Consulta la ficha central de PRIMERBRINDIS en el cuaderno.
3. Forma casos para mínimo, cuenta, fecha y redondeo.
4. Prueba 1999 y2000 céntimos, cuenta sin uso/con uso y reloj antes/en día1 00:00. Para subtotal2009 verifica descuento200. No añadas restricciones de producto.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Tabla cubre mínimo1999/2000, uso previo, expiración exacta y redondeo con resultados esperados correctos.

**No basta:** Inventar una condición o probar solo el caso válido.

**Cuaderno:** EV-31; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

una anomalía de negocio depende de la regla acordada. El equipo está preparado para revisar quién decide el precio final.

Porque un fallo de negocio se demuestra frente a una regla explícita.

**Pregunta:** ¿Por qué escribimos primero las condiciones?

**Corrección:** Centralizar regla y reutilizarla en correo, interfaz, servidor y pruebas.

**Prueba positiva:** Cuenta sin uso con subtotal2000 antes del vencimiento obtiene200.

**Prueba negativa:** 1999, uso previo o plazo vencido deniegan cupón.

**Enlace:** OBJ-31 · Tabla de reglas de PRIMERBRINDIS.

**Recuperación:** Reconstruir fixtures de chapter-31/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-31.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
