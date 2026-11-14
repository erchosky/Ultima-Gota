# 27 · Un enlace con destinatario

Acto 6 · Escritorio y copia autorizada de tienda · día 0 · hito 27 después de las 10:00 (sin duración impuesta)

**De: Vera**

Un enlace de recuperación lleva un token: un valor que autoriza una acción limitada. No es la contraseña y no debería permitir actuar sobre cualquier cuenta. He preparado buzones ficticios de Alba y Bruno para que podamos comparar destinatarios con permiso. Solicita ambos enlaces, conserva sus referencias ocultando los valores y comprueba qué cuenta cambia realmente al usarlos. La guía explica dónde aparece el destinatario y cómo contrastarlo con el token. Usaremos contraseñas claramente de demostración. La prueba debe verificar un acceso posterior, porque un mensaje de cambio correcto no garantiza por sí solo que se modificara la cuenta esperada.

**Importa porque:** los enlaces de recuperación de dos cuentas deben cambiar únicamente la contraseña de su destinatario.

**Reutiliza:** 01, 07, 08, 09, 10, 26

**Añade S27:** comprobar que un token de recuperación está vinculado a una cuenta concreta.

**Objetivo:** solicitar enlaces para las dos cuentas del escenario y comprobar el vínculo entre token, destinatario y cambio autorizado. Todos los secretos son ficticios.

**Estado inicial:** fixture campaign-v1 y snapshot propio 27; cuentas Alba, Bruno. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Un token de Alba debería autorizar cambiar la contraseña de Bruno?

## Apoyo guiado

1. La autorización limitada debe quedar vinculada a su destinatario.
2. Compara token y accountId en el flujo de recuperación.
3. Mantén el token y cambia solo el destinatario en la copia.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. La autorización limitada debe quedar vinculada a su destinatario.
2. Compara token y accountId en el flujo de recuperación.
3. Mantén el token y cambia solo el destinatario en la copia.
4. Solicita enlaces de Alba y Bruno. En vulnerable combina token de Alba con accountId de Bruno y verifica el cambio mediante login. En corregida recházalo y permite el token de Bruno para Bruno.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Contraseña de Bruno cambia con token de Alba en vulnerable; combinación rechazada en corregida y destinatario legítimo funciona.

**No basta:** Ver un éxito de formulario sin comprobar cuenta afectada.

**Cuaderno:** EV-27; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

un token es una autorización limitada, no una contraseña universal. La mentora pide comprobar cuánto dura esa autorización.

El vínculo servidor entre token y cuenta, no un accountId libre enviado por el cliente.

**Pregunta:** ¿Qué debe determinar la cuenta autorizada?

**Corrección:** Resolver destinatario desde el token y contrastar cualquier identificador recibido.

**Prueba positiva:** Token de Bruno cambia solo Bruno.

**Prueba negativa:** Token de Alba no cambia Bruno.

**Enlace:** OBJ-27 · Ficha de autorización token-destinatario.

**Recuperación:** Reconstruir fixtures de chapter-27/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-27.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
