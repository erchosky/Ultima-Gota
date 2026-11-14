# 11 · Repetir sin volver a empezar

Acto 3 · Escritorio y copia autorizada de tienda · día 0 · hito 11 después de las 10:00 (sin duración impuesta)

**De: Nico**

Tu prueba del pedido ajeno permite localizar el control que falta. Para comparar versiones necesito repetir la misma petición sin volver a navegar por todas las pantallas. Hemos preparado una mesa que envía consultas reales desde el navegador y permite reenviar la última sin cambios. Conserva la sesión de Alba y comprueba que la dirección y el método siguen iguales. Cada ejecución tendrá una referencia nueva, aunque consulte el mismo objeto. Esa diferencia nos ayuda a distinguir una prueba repetida de una captura antigua. También puedes observar las dos filas en Red. La respuesta puede parecer idéntica; lo importante es que el servidor reciba otra consulta equivalente.

**Importa porque:** Nico necesita una reproducción exacta del acceso indebido para localizar el fallo.

**Reutiliza:** 02, 10

**Añade S11:** reenviar una petición real sin cambios desde la mesa del navegador.

**Objetivo:** Repetir una consulta con la misma sesión y contrastar dos referencias nuevas; la mesa es el mecanismo probado sin consola.

**Predicción:** ¿Reenviar sin cambios produce otra petición o solo vuelve a enseñar la respuesta guardada?

## Apoyo guiado

1. Mismo contenido no significa mismo evento.
2. Abre la Mesa de peticiones como Alba y selecciona GET /api/orders?id=204.
3. Envía la consulta y pulsa Reenviar última sin cambios. Compara referencias, método y dirección.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Repetir una consulta requiere otro envío al servidor, no otra captura.
2. Abre Mesa de peticiones como Alba; selecciona GET /api/orders?id=204.
3. Pulsa Enviar petición y después Reenviar última sin cambios.
4. Conserva las dos referencias X-Lab-Request distintas. Anota GET, dirección completa, Alba y las referencias en orden.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Dos eventos distintos con mismo método, objeto y sesión Alba, dentro del run actual.

**No basta:** Contar dos capturas de la misma respuesta.

**Cuaderno:** EV-11; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre

una petición puede repetirse fuera del botón que la originó. Nico entrega un caso autorizado de actualización de perfil.

Demuestran dos solicitudes recibidas, aunque su contenido coincida.

**Pregunta:** ¿Por qué conservamos dos referencias distintas?

**Corrección:** No hay fallo nuevo; mantener el reenvío como herramienta de reproducción.

**Prueba positiva:** Reenvío equivalente genera evento nuevo.

**Prueba negativa:** Un evento antiguo no acredita repetición.

**Enlace:** OBJ-11 · Petición reproducible para Nico.

**Recuperación:** Reconstruir fixtures de chapter-11/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-11.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido verificado en Chromium. Reenvío nativo por CDP probado; menú visual no acreditado. Firefox, Docker y principiante pendientes. Ver reports/browser-act-three-validation.json.
