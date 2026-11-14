# 42 · Una acción desde otra página

Acto 9 · Escritorio y copia autorizada de tienda · día 0 · hito 42 después de las 10:00 (sin duración impuesta)

**De: Vera**

La página auxiliar contiene un formulario que puede enviarse a la tienda. Queremos saber si una cuenta con sesión abierta podría sufrir un cambio de preferencia iniciado desde ese otro origen. Las cookies pertenecen al host y no se separan solo por puerto. Usaremos dos orígenes del mismo sitio local para observar el envío real sin desactivar protecciones del navegador. Antes de probarlo, la mesa mostrará esquema, host, puerto y cookie esperada. No anticipes éxito: si el navegador no envía lo necesario, el diagnóstico debe explicarlo. Después compararemos el control de autenticidad con una operación legítima iniciada dentro de la tienda.

**Importa porque:** la página del aula puede provocar una operación en la tienda mientras una cuenta de pruebas tiene sesión abierta.

**Reutiliza:** 08, 11, 12, 13, 14, 15, 41

**Añade S42:** verificar la autenticidad de una operación iniciada desde otro origen en un escenario CSRF.

**Objetivo:** utilizar un formulario local preparado con una acción inocua sobre la cuenta de pruebas. Elige una topología local compatible con el comportamiento de cookies del navegador y documéntala.

**Estado inicial:** fixture campaign-v1 y snapshot propio 42; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Puede una página de otro puerto iniciar una operación con la sesión de la tienda?

## Apoyo guiado

1. Tener sesión no demuestra que la acción la haya iniciado la página autorizada.
2. Mira formulario del auxiliar, cookie ug_store y Origin de la petición.
3. Prueba un cambio inocuo de preferencia con y sin control de autenticidad.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Tener sesión no demuestra que la acción la haya iniciado la página autorizada.
2. Mira formulario del auxiliar, cookie ug_store y Origin de la petición.
3. Prueba un cambio inocuo de preferencia con y sin control de autenticidad.
4. Como demo.pera abre formulario en4312 que envía a4311. Vulnerable cambia preferencia con cookie. Corregida exige token y Origin exacto; rechaza auxiliar y permite formulario legítimo de tienda.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Navegador real envía cookie desde auxiliar y cambia estado vulnerable; corregida bloquea por autenticidad y permite operación propia.

**No basta:** Suponer envío de cookie, usar fetch como sustituto del formulario o desactivar seguridad global.

**Cuaderno:** EV-42; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

explica token, cookies y verificación de origen según lo implementado. No inventes un éxito si el navegador impide el envío.

Porque hay que comprobar la autenticidad de una operación sensible además de la cuenta que la recibe.

**Pregunta:** ¿Por qué no basta con que exista una sesión válida?

**Corrección:** Token CSRF ligado a sesión y comprobación exacta de Origin para operaciones mutables.

**Prueba positiva:** Formulario de tienda con token cambia preferencia.

**Prueba negativa:** Formulario auxiliar sin autenticidad no cambia estado.

**Enlace:** OBJ-42 · Comparación de componentes que inician acciones.

**Recuperación:** Reconstruir fixtures de chapter-42/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-42.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
