# 41 · Dos ventanas, dos orígenes

Acto 9 · Escritorio y copia autorizada de tienda · día 0 · hito 41 después de las 10:00 (sin duración impuesta)

**De: Lara**

La tienda y la página auxiliar de proveedores tienen direcciones parecidas, pero puertos distintos. Un origen se compone de esquema, host y puerto. El navegador compara esos datos para aplicar ciertas restricciones. Vamos a observar una lectura desde la página auxiliar hacia la tienda con una configuración CORS permitida y otra denegada. CORS es la política con la que el servidor indica al navegador qué origen puede leer una respuesta. No sustituye los permisos de la cuenta. Anota por separado si la petición llegó al servidor y si el código de la página pudo leer el contenido; son preguntas distintas.

**Importa porque:** la tienda y su panel de proveedores usan direcciones distintas del laboratorio.

**Reutiliza:** 02, 03, 08

**Añade S41:** reconocer un origen como combinación de esquema, nombre y puerto y comprobar una política CORS concreta.

**Objetivo:** comparar una lectura entre dos orígenes de laboratorio con configuraciones permitida y denegada.

**Estado inicial:** fixture campaign-v1 y snapshot propio 41; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Que el servidor reciba una petición significa que otra página pueda leer su respuesta?

## Apoyo guiado

1. Enviar y leer son efectos distintos; origen incluye puerto.
2. Compara 127.0.0.1:4311 con 127.0.0.1:4312 y las cabeceras CORS.
3. Usa la lectura preparada desde el auxiliar con origen permitido y denegado.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Enviar y leer son efectos distintos; origen incluye puerto.
2. Compara 127.0.0.1:4311 con 127.0.0.1:4312 y las cabeceras CORS.
3. Usa la lectura preparada desde el auxiliar con origen permitido y denegado.
4. Con sesión de tienda, ejecuta lectura desde auxiliar4312 a tienda4311. Contrasta Allow-Origin exacto y credenciales con ausencia de permiso. Registra recepción y resultado de lectura en navegador.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Eventos de servidor y navegador limpio distinguen solicitud recibida de cuerpo legible en dos políticas; permisos privados se mantienen.

**No basta:** Acreditar lectura solo por ver status200 en servidor.

**Cuaderno:** EV-41; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

el navegador aplica ciertas restricciones; el servidor sigue necesitando permisos. Vera aporta una página externa ficticia del aula.

No; controla lectura entre orígenes en navegador y no reemplaza autorización del recurso.

**Pregunta:** ¿CORS autoriza a una cuenta a leer pedidos ajenos?

**Corrección:** Lista exacta de orígenes permitidos y autorización independiente.

**Prueba positiva:** Origen autorizado lee recurso para su cuenta.

**Prueba negativa:** Origen denegado no lee cuerpo y cuenta sin permiso sigue denegada.

**Enlace:** OBJ-41 · Mapa de orígenes y formulario externo ficticio.

**Recuperación:** Reconstruir fixtures de chapter-41/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-41.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
