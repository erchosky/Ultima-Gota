# 08 · Cómo recuerda la tienda quién eres

Acto 2 · Escritorio y copia autorizada de tienda · día 0 · hito 08 después de las 10:00 (sin duración impuesta)

**De: Lara**

Has abierto otra ficha y la tienda sigue recordando demo.pera. No has escrito la contraseña otra vez. La aplicación ha creado una sesión: una relación temporal que permite reconocer peticiones posteriores. En esta copia se identifica mediante una cookie, un pequeño dato que el navegador conserva y envía al host correspondiente. La cookie de sesión no es la contraseña. Vamos a observar cuándo aparece y cómo acompaña una consulta de perfil. Como está marcada HttpOnly, no intentaremos leerla desde código de la página. Usaremos Almacenamiento y las cabeceras de Red, sin copiar su valor completo a las notas.

**Importa porque:** el jugador abre otra ficha y la tienda continúa reconociendo la cuenta de pruebas.

**Reutiliza:** 02, 07

**Añade S08:** localizar la cookie o mecanismo de sesión que usa esta implementación.

**Objetivo:** identificar su nombre, cuándo aparece y en qué peticiones se utiliza. Explica que una sesión no es la contraseña. Si se eligen cookies HttpOnly, enséñalas en la herramienta correcta; no prometas leerlas con JavaScript.

**Estado inicial:** fixture campaign-v1 y snapshot propio 08; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Tendrá el navegador la cookie de esta sesión antes de iniciar el acceso?

## Apoyo guiado

1. Compara el estado anterior y posterior al acceso, sin confundir sesión y contraseña.
2. Mira Cookies en Almacenamiento para el host de la tienda y Cabeceras en la petición de perfil.
3. Anota nombre y atributos de la cookie y vincula la petición al usuario devuelto.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Compara el estado anterior y posterior al acceso, sin confundir sesión y contraseña.
2. Mira Cookies en Almacenamiento para el host de la tienda y Cabeceras en la petición de perfil.
3. Anota nombre y atributos de la cookie y vincula la petición al usuario devuelto.
4. En una sesión limpia comprueba ausencia de ug_store, entra con demo.pera y consulta /api/me. Localiza ug_store en Almacenamiento y su envío en Red; anota HttpOnly y la identidad, no el valor.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Eventos de acceso y perfil en la misma sesión; alumno identifica ug_store, creación tras login y envío posterior. No se afirma observar directamente la pestaña.

**No basta:** Anotar ug_classroom o tratar el valor de cookie como contraseña.

**Cuaderno:** EV-08; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

la sesión explica la continuidad entre páginas y prepara una comprobación de cierre de sesión.

Permite al servidor enlazar peticiones con la sesión creada al autenticar; no contiene necesariamente la contraseña.

**Pregunta:** ¿Para qué sirve la cookie de sesión en este flujo?

**Corrección:** Mantener cookie de sesión opaca y HttpOnly; demostrar que JavaScript de página no la lee.

**Prueba positiva:** Perfil autenticado devuelve demo.pera.

**Prueba negativa:** Sin cookie de tienda no se devuelve el perfil privado.

**Enlace:** OBJ-08 · Ficha de sesión sin valor secreto.

**Recuperación:** Reconstruir fixtures de chapter-08/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-08.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido completo verificado en Chromium. Comparaciones06/07/10 en copias separadas; controles08/09 comprobados como comportamiento correcto. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-act-two-validation.json.
