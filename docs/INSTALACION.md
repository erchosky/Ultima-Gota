# Instalar y usar la primera experiencia

Versión 0.5.0: capítulos 01–20 funcionales. Los otros 30 tienen diseño y contenido, pero no escenarios ejecutables.

## Ejecución local comprobada

Requisitos: Node.js 22.18 o posterior de la rama 22 y npm. Probado con Node 22.23.2 en macOS ARM64. No requiere cuentas, claves de proveedores ni IA.

Desde esta carpeta:

```sh
npm ci
npx playwright install chromium
npm run build
npm start
```

Abrir **http://localhost:4310** para el escritorio. La tienda está en **http://127.0.0.1:4311**. La primera petición prepara una campaña local. Escribe una predicción, prepara el escenario y abre el enlace de tienda en otra pestaña. El enlace se usa una vez; «Generar otro enlace» permite retomarlo.

Mantén esos dos nombres: cambiar localhost por 127.0.0.1 en el escritorio elimina la separación prevista y el servidor lo rechaza. No requiere DNS externo ni editar hosts. El puerto 4313 es un canal local autenticado entre servicios, no una página del alumno. El auxiliar 4312 pertenece a actos posteriores y aún no arranca.

Los capítulos05,06,07,10,13–20 utilizan Chromium instalado por Playwright para comprobar la corrección en un contexto limpio. El alumno puede usar Chromium para los veinte primeros capítulos. La ayuda incluye instrucciones de Firefox; su automatización no pudo arrancar en esta máquina y sigue pendiente. No se ha desactivado ninguna protección del navegador del usuario.

`npm run dev` construye y arranca; no incluye recarga automática. Tras modificar código, detener con Ctrl+C, construir y arrancar. Reiniciar conserva el progreso. Node puede indicar que `node:sqlite` es experimental en la rama 22; se han probado las operaciones utilizadas.

## Qué se guarda

- `.runtime/classroom/progress.sqlite`: campañas, notas, evidencias, resultados de corrección, sesiones y archivo recuperable.
- `.runtime/store/store.sqlite`: productos, escenarios, sesiones de tienda y peticiones.
- `.runtime/service.key`: clave local generada para el canal entre servicios; no se imprime ni se exporta.

No borres `.runtime/` para reintentar. Hay tres acciones distintas:

1. **Reintentar este escenario:** nueva ejecución de práctica; conserva notas y logros.
2. **Crear una campaña nueva:** otro identificador; conserva la anterior en el archivo.
3. **Restablecer esta campaña:** exige escribir RESTABLECER, ofrece exportación y conserva una copia previa; incrementa la generación activa.

Importar valida `ug-progress/1` y compatibilidad; añade una copia archivada. Recuperarla crea otro ID con logros históricos. No sobrescribe la generación activa desde una cookie vieja. Las copias se conservan indefinidamente: no hay borrado permanente ni limpieza automática.

SQLite conserva el progreso, pero la cookie del aula identifica el archivo del navegador. Si la borras, no se adopta automáticamente otra campaña local: usa una exportación para recuperarla como copia. Exporta antes de cambiar de equipo o navegador.

## Modo profesor

La terminal muestra un código local distinto del secreto entre servicios. Entra por «Acceso de profesor» e introdúcelo expresamente. La solución se solicita a una ruta protegida; no viaja con el contenido normal del alumno. Salir revoca ese acceso de la sesión.

El propietario puede inspeccionar sus archivos fuente. El control evita revelaciones involuntarias durante el aprendizaje; no impide al dueño leer el proyecto.

## Docker: configuración preparada, ejecución pendiente

No responde el daemon y este equipo tampoco tiene el subcomando Compose. Se revisaron sintaxis YAML y publicaciones de loopback, **no se construyó ni arrancó la imagen**.

Cuando Docker y Compose estén disponibles:

```sh
sh scripts/preparar-docker.sh
docker compose up --build
```

El preparador crea una clave y un archivo de entorno privado en `.runtime/`, sin imprimir su contenido. Compose publica solo `127.0.0.1:4310` y `127.0.0.1:4311`; no publica 4313. Cada servicio monta únicamente su volumen. El evaluador accede a `http://store:4311` dentro de la red, mientras el alumno conserva las URL locales. Esto no certifica la topología de los capítulos posteriores de varios orígenes.

No usar `docker compose down -v` para reiniciar: elimina volúmenes. No hace falta borrar otras aplicaciones ni sus contenedores.

## Desde Kali o una máquina virtual

Loopback pertenece al sistema donde abres el navegador. Si ejecutas dentro de Kali, abre las URL allí. Si corre en macOS, abre el escritorio en macOS: localhost dentro de Kali no apunta al anfitrión. Kali y cualquier túnel explícito requieren una comprobación propia; no se publica sobre toda la red como solución automática.

## Comprobaciones

```sh
npm run typecheck
npm run build
npm run test:integration
npm run test:browser:all
npm run test:design
```

Los tests crean bases temporales y no borran tu progreso. El recorrido usa Chromium. Para intentar Firefox: `npx playwright install firefox` y `UG_TEST_BROWSER=firefox npm run test:browser`. Un fallo de arranque no se presenta como resultado aprobado.

Informes: `reports/integration.tap`, `reports/browser-validation.json` (Chromium), `reports/firefox-validation.json` (intento fallido de Firefox), capturas en `reports/browser/` y `reports/design-checks.json`.

Dependencias fijadas en package-lock.json. Compatibilidad consultada en [Vite](https://vite.dev/guide/) y [SQLite de Node 22](https://nodejs.org/download/release/latest-jod/docs/api/sqlite.html); los resultados locales se respaldan con las pruebas del proyecto.

## Actualizar desde0.2,0.3 o0.4 sin perder progreso

No borres las bases. Detén el laboratorio, ejecuta `npm run build` y arranca con `npm start`. La migración de tienda añade tablas y columnas; las campañas del aula mantienen sus IDs y generaciones. Las exportaciones de contenido versión1 (01–05) se aceptan como copias; contenido2 (01–10) también se acepta; contenido3 (01–15) también se acepta; las nuevas usan contenido versión4 (01–20), con el mismo contenedor de formato ug-progress/1.

`ug_lab` identifica la copia de práctica y no autentica una cuenta. `ug_store` se crea al iniciar sesión y se elimina al salir; el servidor revoca además su sesión. Los valores de ambas cookies son opacos. Se verifica HttpOnly en navegador y el rechazo de una cookie antigua tras logout.

Las credenciales de demo.pera se recuperan solo tras completar06 y pedirlas expresamente. El progreso y las exportaciones guardan una referencia con valor oculto, no la contraseña. La recuperación vuelve a proporcionar únicamente datos ficticios del fixture.

Las comparaciones06/07/10 crean una copia de validación separada y la retiran al terminar, conservando sus registros. La práctica de07–09 lleva etiqueta anterior a la revocación. La propuesta de autorización de pedidos del10 no se consolida en el mundo principal antes del15.

Pruebas: `reports/browser-validation.json` (ActoI) y `reports/browser-act-two-validation.json` (ActoII), más `reports/integration.tap`. `npm run test:browser:all` recorre los cuatro actos en contextos de prueba independientes.

## Mesa de peticiones del Acto III

En11 entra como Alba y abre «Mesa de peticiones». Envía una consulta y utiliza «Reenviar última sin cambios»: son solicitudes XHR reales, cada una con una referencia del servidor. Puedes observarlas en Red. No necesitas consola. En Chromium se probó además Network.replayXHR mediante CDP; el menú visual de DevTools no se ha recorrido y Firefox sigue pendiente.

En12 cambia solo notificationPreference a daily en el cuerpo JSON, después consulta /api/me. En13 supportAccess es una capacidad interna y tiene un efecto real sobre soporte. En14 haz seis consultas para comparar cinco códigos diferentes y dos significados distintos de200. Son recursos y cuentas ficticios del propio recinto.

En15 reproduce primero los fallos. Cierra la pestaña de práctica antes de preparar y abrir la propuesta corregida desde el escritorio: las pestañas de tienda comparten cookies. La cabecera X-UG-Copy impide enviar desde una mesa que quedó vinculada a otra copia. Las parejas se contrastan con eventos del servidor y un navegador independiente antes de consolidar controles.

Las correcciones comprobadas permanecen en la campaña aunque falte la comprensión o se reintente el escenario. Recuperar una copia conserva esos informes como históricos y exige peticiones de una ejecución nueva para acreditar otra comprobación.

Pruebas de11–15: reports/browser-act-three-validation.json y reports/integration.tap. Capturas en reports/browser-act-three/. npm run test:browser:act-three ejecuta solo este recorrido; test:browser:all ejecuta los tres.

## Acto IV: cantidades, HTML y muestras locales

16: entra como demo.pera, compara el límite del formulario con quantity:0 en la mesa y consulta el pedido901. La versión corregida acepta enteros1–20 y no cambia lo guardado ante un rechazo. Nunca hay cobros.

17: abre Descripciones y guarda el mismo marcador strong en los dos campos. Recarga y compara texto literal con estructura de formato. Ver negrita no acredita ejecución.18: cambia la marca única del parámetro mensaje y abre el fragmento público que se ejecuta en el marco.

19: pide la muestra explicada en la tienda y lee sus cinco fragmentos antes de usarla. El nonce de demostración pertenece al run y es público; no es la clave del servicio ni el nonce CSP del script de arranque. Carga la muestra desde la dirección. El escritorio debe reproducirla en Chromium limpio; modificar manualmente la marca no da el logro.

20: guarda la muestra como Alba en Reseñas, conserva su referencia y vuelve a cargarla como Bruno. La comprobación abre esa referencia exacta del servidor en otro contexto. La representación corregida conserva reseñas de texto y elimina la ejecución de la muestra.

El contenido se representa en un iframe sandbox allow-scripts, sin allow-same-origin. Su CSP permite el bootstrap con nonce y exclusivamente el hash del manejador de demostración. La entrada queda limitada a texto corriente, strong fijo y muestra exacta local. No se admite JavaScript arbitrario. El efecto es solo una marca dentro del marco. La CSP del aula y de la tienda principal sigue estricta.

Pruebas: reports/browser-act-four-validation.json y reports/integration.tap; capturas en reports/browser-act-four/. npm run test:browser:act-four recorre este acto. El cliente original de la skill se ejecuta además cuando existe en la instalación de Codex; las pruebas propias funcionan sin depender de esa ruta.
