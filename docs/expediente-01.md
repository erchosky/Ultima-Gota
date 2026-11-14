# 01 · La ficha equivocada

Acto 1 · Escritorio y copia autorizada de tienda · día 0 · hito 01 después de las 10:00 (sin duración impuesta)

**De: Sam**

Hola. Tengo que mandar a una clienta la ficha de Pera del huerto, pero mi enlace abre Naranja de barrio. Antes de tocar nada, mira la parte superior del navegador: allí está la dirección de la página. Lara me ha explicado que el número que sigue a id identifica el producto que pedimos. Trabajamos en una copia de la tienda y estas fichas son públicas. No hace falta entrar en una cuenta. Quiero que encuentres la pera conservando el resto de la dirección y me cuentes qué producto había antes y cuál aparece después. Te dejo las referencias conocidas: naranja, 1; pera, 2.

**Importa porque:** Sam ha recibido un enlace al zumo de pera que abre el de naranja. Necesita enviar a un cliente la ficha correcta.

**Reutiliza:** ningún capítulo previo

**Añade S01:** reconocer y modificar un parámetro `id` en una dirección.

**Objetivo:** abrir una ficha, localizar el identificador y cambiarlo por el de otro producto conocido. Enseña dónde escribir la dirección y qué parte conservar.

**Estado inicial:** fixture campaign-v1 y snapshot propio 01; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** Si cambias solo id=1 por id=2, ¿qué ficha esperas recibir?

## Apoyo guiado

1. Una dirección puede contener un número que selecciona un producto. Cambiarlo no altera el producto guardado.
2. Mira la barra de direcciones de la pestaña de la tienda, después de producto?.
3. Localiza id=1 y compara ese número con la lista de Sam.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Una dirección puede contener un número que selecciona un producto. Cambiarlo no altera el producto guardado.
2. Mira la barra de direcciones de la pestaña de la tienda, después de producto?.
3. Localiza id=1 y compara ese número con la lista de Sam.
4. Abre /producto?id=1, selecciona la barra de direcciones, cambia únicamente 1 por 2 y pulsa Intro. Anota el nombre recibido.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Dos consultas nuevas de productos 1 y 2; respuesta de 2 con id=2 y nombre Pera del huerto; observación del alumno coincide.

**No basta:** Renombrar el título en pantalla sin solicitar producto 2.

**Cuaderno:** EV-01; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

identificar productos por número es un funcionamiento normal. Sam entrega una lista de referencias; una presenta un precio extraño.

No. El identificador selecciona un producto público; todavía no hemos comprobado permisos.

**Pregunta:** ¿Consultar otra ficha pública demuestra por sí solo un fallo de permisos?

**Corrección:** No hay vulnerabilidad que corregir. Conservar selección por ID y respuesta coherente.

**Prueba positiva:** Consultar producto 2 devuelve pera.

**Prueba negativa:** Consultar ID inexistente no devuelve datos de otro producto.

**Enlace:** OBJ-01 · Lista de referencias de Sam.

**Recuperación:** Reconstruir fixtures de chapter-01/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-01.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y validador probado; recorrido completo comprobado en Chromium. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-validation.json.
