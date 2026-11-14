# 15 · Corregido, pero comprobado

Acto 3 · Escritorio y copia autorizada de tienda · día 0 · hito 15 después de las 10:00 (sin duración impuesta)

**De: Nico**

He preparado dos cambios: limitar los campos del perfil y comprobar la propiedad de cada pedido. Que una prueba indebida deje de funcionar no basta si también rompemos lo que sí debe permitirse. Necesitamos parejas de comprobaciones. Alba debe seguir viendo el 203 y no el 204; demo.pera debe guardar una preferencia, pero no concederse soporte. La mesa mostrará claramente la versión de cada copia. Registra tanto el resultado permitido como el denegado, mirando contenido y estado. Si ambas parejas se comportan como esperamos, conservaremos estas correcciones en la continuidad de la tienda y practicaremos los fallos antiguos en copias identificadas.

**Importa porque:** Nico limita los campos de perfil y aplica la comprobación de propiedad a los pedidos.

**Reutiliza:** 10, 13, 14

**Añade S15:** diseñar una pareja de pruebas: uso legítimo permitido y abuso denegado.

**Objetivo:** activar la versión corregida en la copia del caso y repetir ambas parejas de pruebas.

**Predicción:** ¿Bastaría con bloquear todas las consultas para considerar corregido el control de pedidos?

## Apoyo guiado

1. Una corrección debe conservar el uso legítimo.
2. Compara pedidos y perfil en las dos versiones de la mesa.
3. Forma una pareja permitida/denegada por cada control.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Una corrección debe conservar el uso legítimo.
2. Compara pedidos y perfil en las dos versiones de la mesa.
3. Forma una pareja permitida/denegada por cada control.
4. En corregida verifica Alba203 permitido y Alba204 sin datos; después daily permitido y supportAccess rechazado sin cambio. Contrasta con la copia vulnerable del caso.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Cuatro pruebas corregidas y comparación vulnerable; propietario y capacidades persistidas correctos.

**No basta:** Solo comprobar rechazo o confiar en una insignia de corregido.

**Cuaderno:** EV-15; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre

la corrección entra en la continuidad del mundo. Un informe de productos trae una descripción con formato extraño.

Porque rechazar el abuso no demuestra que el uso autorizado siga funcionando.

**Pregunta:** ¿Por qué necesitamos la prueba positiva?

**Corrección:** Consolidar controles de propiedad y lista de campos permitidos en mundo principal.

**Prueba positiva:** Alba203 y preferencia daily funcionan.

**Prueba negativa:** Alba204 y escalado de capacidades quedan denegados.

**Enlace:** OBJ-15 · Acta de correcciones y descripción de producto con formato.

**Recuperación:** Reconstruir fixtures de chapter-15/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-15.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido verificado en Chromium. Reenvío nativo por CDP probado; menú visual no acreditado. Firefox, Docker y principiante pendientes. Ver reports/browser-act-three-validation.json.
