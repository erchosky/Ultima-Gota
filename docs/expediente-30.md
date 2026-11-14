# 30 · La sesión que se quedó dentro

Acto 6 · Escritorio y copia autorizada de tienda · día 0 · hito 30 después de las 10:00 (sin duración impuesta)

**De: Vera**

Hemos definido una política para recuperaciones de seguridad: cambiar la contraseña debe revocar todas las sesiones previas de la cuenta. No todas las aplicaciones eligen la misma política, por eso la dejamos escrita antes de probarla. Abre dos sesiones independientes de Alba. Desde el flujo autorizado de recuperación cambia su contraseña; después consulta el perfil con la sesión que estaba abierta antes. Conserva las identidades y referencias, sin copiar los valores secretos de cookies. Un acceso nuevo con la contraseña nueva debe funcionar. Si la sesión antigua sigue dentro en la copia vulnerable, tendremos una prueba de revocación incompleta, aunque el cambio de contraseña haya sido correcto.

**Importa porque:** una cuenta ha cambiado su contraseña tras el incidente, pero podría conservar una sesión anterior.

**Reutiliza:** 08, 09, 11, 27, 28, 29

**Añade S30:** comprobar la revocación de sesiones previas después de una recuperación de seguridad.

**Objetivo:** mantener dos sesiones de prueba, recuperar la cuenta desde una y consultar un recurso desde la anterior.

**Estado inicial:** fixture campaign-v1 y snapshot propio 30; cuentas Alba. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Cambiar una contraseña invalida automáticamente cualquier sesión ya creada?

## Apoyo guiado

1. La política de revocación debe ejecutarse expresamente.
2. Prepara dos contextos de navegador con Alba.
3. Tras recuperar la cuenta vuelve a pedir perfil desde la sesión anterior.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. La política de revocación debe ejecutarse expresamente.
2. Prepara dos contextos de navegador con Alba.
3. Tras recuperar la cuenta vuelve a pedir perfil desde la sesión anterior.
4. Abre sesiones A y B de Alba; realiza recuperación y consulta /api/me con A antigua. Compara rechazo en corregida y acceso nuevo con clave recién establecida.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Sesión antigua sigue válida en vulnerable; corregida invalida A/B y nuevo login legítimo funciona.

**No basta:** Cerrar a mano la sesión antigua antes de comprobarla.

**Cuaderno:** EV-30; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

explica que la política debe ser explícita. La revisión de accesos termina y Sam trae un problema de descuentos duplicados.

Para demostrar revocación de lo previo sin bloquear la cuenta recuperada.

**Pregunta:** ¿Por qué comprobamos un acceso nuevo además del antiguo?

**Corrección:** Incrementar versión de sesiones de cuenta al completar recuperación de seguridad.

**Prueba positiva:** Login nuevo con clave actual funciona.

**Prueba negativa:** Sesión anterior no obtiene perfil privado.

**Enlace:** OBJ-30 · Política de revocación y aviso de descuentos.

**Recuperación:** Reconstruir fixtures de chapter-30/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-30.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
