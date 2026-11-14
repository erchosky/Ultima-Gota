# 28 · Un enlace para una sola vez

Acto 6 · Escritorio y copia autorizada de tienda · día 0 · hito 28 después de las 10:00 (sin duración impuesta)

**De: Lara**

El vínculo con el destinatario ya está comprobado. Ahora tenemos otra pregunta: qué ocurre si alguien vuelve a usar el mismo enlace después de completar una recuperación. Un token puede pertenecer a la cuenta correcta y aun así durar más de lo debido porque no se invalida al usarlo. Vamos a realizar una recuperación y repetirla con otra contraseña ficticia, manteniendo el mismo token y destinatario. Consulta el resultado real de ambos intentos. La copia de este caso conserva el vínculo corregido para que no confundamos dos fallos. El siguiente expediente se ocupará del paso del tiempo; hoy solo investigamos el consumo de la autorización.

**Importa porque:** un enlace utilizado continúa circulando en el buzón interno.

**Reutiliza:** 11, 27

**Añade S28:** comprobar que una autorización de recuperación deja de servir tras usarse.

**Objetivo:** utilizar una vez el enlace y repetir el mismo intento con un nuevo valor ficticio, observando las respuestas.

**Estado inicial:** fixture campaign-v1 y snapshot propio 28; cuentas Alba. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Un token ya utilizado debería aceptar otro cambio de contraseña?

## Apoyo guiado

1. Uso único y caducidad son propiedades independientes.
2. Revisa el mismo token en la petición de completar recuperación.
3. Tras el primer uso repite con otro valor de contraseña ficticia.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Uso único y caducidad son propiedades independientes.
2. Revisa el mismo token en la petición de completar recuperación.
3. Tras el primer uso repite con otro valor de contraseña ficticia.
4. Usa token de Alba una vez con DEMO-cambio-1! y repite con DEMO-cambio-2!. Contrasta acceso y número de cambios en vulnerable y corregida.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Vulnerable registra dos cambios con mismo token; corregida solo uno y permite el primer acceso legítimo.

**No basta:** Usar dos tokens distintos o confundir expiración con consumo.

**Cuaderno:** EV-28; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

invalidar tras usar y caducar con el tiempo son propiedades diferentes. El siguiente caso comprueba la segunda.

El consumo atómico del token tras un primer uso correcto.

**Pregunta:** ¿Qué propiedad bloquea la segunda utilización inmediata?

**Corrección:** Marcar token consumido en la misma transacción que cambia la contraseña.

**Prueba positiva:** Primer uso funciona para su destinatario.

**Prueba negativa:** Segundo uso no vuelve a cambiar contraseña.

**Enlace:** OBJ-28 · Registro de consumo y plazo del token.

**Recuperación:** Reconstruir fixtures de chapter-28/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-28.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
