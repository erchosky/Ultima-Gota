# 07 · Una cuenta que seguía viva

Acto 2 · Escritorio y copia autorizada de tienda · día 0 · hito 07 después de las 10:00 (sin duración impuesta)

**De: Vera**

Confirmo que demo.pera es una cuenta de pruebas nuestra. Puedes comprobar estas credenciales en la copia preparada; no las uses en ningún otro lugar. Al iniciar sesión, la tienda debería mostrar con qué identidad estás trabajando. Una bienvenida no basta: consulta también el perfil recibido del servidor y compáralo con la cuenta que introdujiste. No vamos a abrir pedidos ajenos todavía. Si una contraseña no funciona, el diagnóstico distinguirá un escenario sin preparar de una respuesta que deniega el acceso. Guarda la identidad y la referencia del recurso del que salieron los datos; el cuaderno mantendrá el secreto oculto cuando cierres el caso.

**Importa porque:** nadie sabe si las credenciales de la campaña siguen funcionando. Vera confirma que la cuenta es de pruebas.

**Reutiliza:** 03, 06

**Añade S07:** iniciar sesión y reconocer la identidad con la que se trabaja.

**Objetivo:** introducir las credenciales de laboratorio y comprobar el nombre y los datos mínimos de la cuenta autenticada.

**Estado inicial:** fixture campaign-v1 y snapshot propio 07; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Una pantalla que dice bienvenida basta para saber qué cuenta reconoce el servidor?

## Apoyo guiado

1. Una sesión válida debe corresponder a una identidad comprobable del servidor.
2. Usa el formulario de acceso de la tienda y después Mi cuenta.
3. Introduce solo las credenciales encontradas y compara la respuesta de perfil con demo.pera.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Una sesión válida debe corresponder a una identidad comprobable del servidor.
2. Usa el formulario de acceso de la tienda y después Mi cuenta.
3. Introduce solo las credenciales encontradas y compara la respuesta de perfil con demo.pera.
4. Inicia sesión con demo.pera y la clave de su objeto recuperado del 06. Consulta /api/me y registra userId y nombre devueltos. No cambies de cuenta durante la comprobación.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Sesión creada realmente para user-demo-pera y consulta /api/me con ese mismo identificador de sesión.

**No basta:** Una bienvenida editada o un perfil de Alba en otra sesión.

**Cuaderno:** EV-07; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

unas credenciales expuestas importan si todavía conceden acceso. El cuaderno conserva la identidad, con la contraseña oculta por defecto.

Confirma que las credenciales expuestas conceden acceso a la cuenta de pruebas en esta copia.

**Pregunta:** ¿Qué añade esta prueba al hallazgo del archivo?

**Corrección:** Desactivar la cuenta expuesta en el mundo principal; conservar una copia autorizada para las lecciones de sesión.

**Prueba positiva:** Una cuenta ficticia activa autorizada puede entrar.

**Prueba negativa:** La credencial revocada no permite crear sesión en el mundo corregido.

**Enlace:** OBJ-07 · Identidad autenticada demo.pera.

**Recuperación:** Reconstruir fixtures de chapter-07/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-07.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido completo verificado en Chromium. Comparaciones06/07/10 en copias separadas; controles08/09 comprobados como comportamiento correcto. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-act-two-validation.json.
