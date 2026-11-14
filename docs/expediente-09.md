# 09 · Cerrar la puerta

Acto 2 · Escritorio y copia autorizada de tienda · día 0 · hito 09 después de las 10:00 (sin duración impuesta)

**De: Vera**

En soporte compartimos un equipo de pruebas y necesitamos saber qué deja de estar accesible al salir. Ya has visto cómo la sesión mantiene una identidad entre páginas. Ahora consulta el perfil, cierra sesión con el botón de la tienda y vuelve a pedir el mismo perfil desde la interfaz. No hace falta editar ni reenviar nada manualmente. Observa una petición nueva en Red, porque una pantalla que quedó abierta puede conservar texto antiguo. En este caso esperamos que el cierre funcione. Encontrar un comportamiento correcto también es una conclusión útil, siempre que conservemos la identidad anterior y la respuesta posterior.

**Importa porque:** Vera comparte un equipo de atención y quiere saber qué ocurre al cerrar sesión.

**Reutiliza:** 02, 03, 07, 08

**Añade S09:** comparar el acceso a un mismo recurso antes y después de cerrar sesión.

**Objetivo:** consultar el perfil autenticado, cerrar sesión y volver a abrir el mismo recurso desde la interfaz, observando la nueva petición en Red. Todavía no exijas editar ni reenviar peticiones manualmente.

**Estado inicial:** fixture campaign-v1 y snapshot propio 09; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Una página antigua con tu nombre significa que el servidor sigue aceptando la sesión?

## Apoyo guiado

1. Contrasta acceso privado mediante una petición nueva, no con una pantalla antigua.
2. Usa Mi cuenta antes de salir y vuelve a ella después del botón Cerrar sesión.
3. Compara las dos peticiones de perfil y la identidad de la primera.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Contrasta acceso privado mediante una petición nueva, no con una pantalla antigua.
2. Usa Mi cuenta antes de salir y vuelve a ella después del botón Cerrar sesión.
3. Compara las dos peticiones de perfil y la identidad de la primera.
4. Con demo.pera consulta /api/me, pulsa Cerrar sesión y vuelve a Mi cuenta. Registra perfil permitido antes y respuesta denegada en la consulta nueva posterior.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

GET /api/me autenticado, logout que invalida sesión y GET nuevo denegado con la sesión anterior sin datos privados.

**No basta:** Ver el nombre antiguo en una pestaña sin enviar otra petición.

**Cuaderno:** EV-09; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

el escenario base de cierre funciona; no lo declares vulnerable por obligación. Lara prepara dos cuentas para la queja original.

No. Las pruebas muestran que el cierre invalida el acceso privado de esa sesión.

**Pregunta:** ¿Tenemos que encontrar una vulnerabilidad en este cierre?

**Corrección:** Conservar invalidación del servidor y eliminación de cookie; no introducir un fallo artificial.

**Prueba positiva:** Una sesión nueva legítima vuelve a consultar su propio perfil.

**Prueba negativa:** La sesión cerrada no vuelve a obtener perfil.

**Enlace:** OBJ-09 · Comparación antes/después y cuentas autorizadas Alba/Bruno.

**Recuperación:** Reconstruir fixtures de chapter-09/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-09.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido completo verificado en Chromium. Comparaciones06/07/10 en copias separadas; controles08/09 comprobados como comportamiento correcto. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-act-two-validation.json.
