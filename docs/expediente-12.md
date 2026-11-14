# 12 · El contenido del sobre

Acto 3 · Escritorio y copia autorizada de tienda · día 0 · hito 12 después de las 10:00 (sin duración impuesta)

**De: Nico**

La cuenta de pruebas permite elegir cómo recibir avisos del laboratorio. Vera seleccionó resumen diario, pero quiere confirmar qué se guarda. Vamos a mirar la petición de actualización de perfil. Además de dirección y método, tiene un cuerpo: los datos que envía dentro del mensaje. Está escrito en JSON, el formato que ya leíste al revisar precios. Te mostraré la estructura y el campo notificationPreference antes de editarlo. Cambia solo esa preferencia autorizada, reenvía y consulta el perfil otra vez. No tomes la respuesta del envío como única prueba: queremos ver que el valor permanece en una lectura posterior.

**Importa porque:** una preferencia del perfil no se guarda como se espera y es necesario reproducir el envío.

**Reutiliza:** 02, 03, 11

**Añade S12:** modificar un campo permitido en el cuerpo JSON de una petición.

**Objetivo:** cambiar una preferencia inocua de la cuenta de pruebas y reenviar conservando el resto de la estructura. Diferencia dirección, método y cuerpo con ejemplos visuales.

**Predicción:** ¿Cambiar una preferencia en el cuerpo bastará para verla guardada al consultar después?

## Apoyo guiado

1. Distingue datos enviados y estado persistido.
2. Selecciona PATCH del perfil y abre Editar y reenviar.
3. Cambia solo notificationPreference conservando el JSON válido.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Distingue datos enviados y estado persistido.
2. Selecciona PATCH del perfil y abre Editar y reenviar.
3. Cambia solo notificationPreference conservando el JSON válido.
4. Envía notificationPreference con valor daily en PATCH /api/profile y consulta GET /api/me. Compara el valor persistido con el enviado.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

PATCH permitido de demo.pera y GET posterior devuelven notificationPreference=daily.

**No basta:** Editar la interfaz sin persistencia o JSON inválido.

**Cuaderno:** EV-12; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre

manipular una petición autorizada no implica por sí mismo un fallo. La respuesta contiene también un campo interno de capacidades que requiere revisión.

No; guardar una preferencia permitida es una función legítima.

**Pregunta:** ¿Modificar una petición autorizada demuestra por sí solo vulnerabilidad?

**Corrección:** Lista de preferencias permitidas; conservar edición normal.

**Prueba positiva:** daily persiste en perfil.

**Prueba negativa:** Valor fuera del conjunto permitido no se guarda.

**Enlace:** OBJ-12 · Perfil con preferencia e información de capacidades.

**Recuperación:** Reconstruir fixtures de chapter-12/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-12.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido verificado en Chromium. Reenvío nativo por CDP probado; menú visual no acreditado. Firefox, Docker y principiante pendientes. Ver reports/browser-act-three-validation.json.
