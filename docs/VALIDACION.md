# Plan de implementación y validación

## Estado de las pruebas

En Etapa 1 solo se ejecutan comprobaciones documentales y sondas pequeñas sobre mecanismos del diseño. El resultado reproducible se guarda en `reports/design-checks.json`. Un test de contenido que pasa no valida un servidor, una cookie, una vulnerabilidad o una experiencia de aprendizaje.

Cada `scenarios/chapter-xx/plan.json` declara el estado y resultado que habrá que comprobar. Los indicadores de cada plan distinguen los20 funcionales de los30 todavía pendientes.

## Diez comprobaciones por escenario al implementarlo

1. Preparar desde cero, verificar versión, cuentas y recurso, y registrar runId nuevo.
2. Reutilizar solo habilidades introducidas antes y una microhabilidad nueva.
3. Ejecutar acción real; comprobar estado persistido, identidad, objeto y efecto específico.
4. Probar el falso positivo de su plan: no debe conceder logro.
5. Evidencia enlazada a cuenta, recurso, petición, campaña, generación y ejecución correctos.
6. Solicitar pistas por nivel; no revelar futuros casos ni solución por defecto.
7. Aplicar corrección; uso legítimo permitido y abuso denegado cuando corresponda.
8. Reintentar escenario; restaura datos y conserva notas/logros.
9. Reiniciar servicios y recuperar partida; no crea logros nuevos ni pierde notas.
10. Comparar mensajes, objetos, tiempos y correcciones con fixtures canónicos.

El criterio técnico de 01–09 es observar y contrastar datos, no forzar una vulnerabilidad en cada capítulo. La edición del inspector se registra como declaración del alumno apoyada por respuesta nueva; no se simula detección de DevTools. Una predicción equivocada no bloquea: se registra y se contrasta. La comprensión sí debe corregirse mediante explicación y reintento.

## Plan por actos

| Entrega | Trabajo concreto | Criterio de salida |
|---|---|---|
| Etapa1 | Biblia,50 fichas,200 pistas,50 cierres,dependencias,objetos,pantallas,arquitectura y planes | Integridad documental sin huecos y revisión de tensiones; ejecución sigue pendiente. |
| ActoI ·01–05 | Dos aplicaciones,API aula/tienda,SQLite separado,productos reales,cuaderno,pistas,guardado,reintento y precio discrepante | Recorrido limpio en Firefox; cambio de ID real; evidencia contra servidor; exportar/importar y reiniciar sin pérdida; cierre sin atribución de ataque. |
| ActoII ·06–10 | Archivo público preparado,login,cookie,logout y acceso cruzado | Sesiones reales; logout revoca; Alba/Bruno conservan propietarios; acceso ajeno contrastado; transición desde05 y secretos recuperables. |
| ActoIII ·11–15 | Reenvío,cuerpo,capacidad interna,estados y correcciones | Eventos nuevos por petición; cambio de capacidad afecta recurso; parejas legítimo/abuso; principales correcciones persistentes. |
| ActoIV ·16–20 | Cantidades,texto/HTML,trazado,DOM XSS y almacenado | Efecto real en navegador limpio; HTML no acredita ejecución; contextoB para almacenado; ningún acceso a cookies del aula. |
| ActoV ·21–25 | SQLite del catálogo,consulta acotada,comparación,inyección,parametrización y cronología | Consulta real con pareja verdadera/falsa; parámetros preservan búsqueda; clasificación distingue hipótesis e historia. |
| ActoVI ·26–30 | Buzón ficticio,tokens,vínculo,consumo,tiempo y revocación | Ningún correo exterior; fronteras599/600/601; sesiones previas revocadas por política; primer uso y login nuevo legítimos. |
| ActoVII ·31–35 | Cupón central,precio,idempotencia,estados y dos reservas | Condiciones compartidas; totals persistidos; operationId único y uso por cuenta; carrera reproducible con dos peticiones; corrección atómica. |
| ActoVIII ·36–40 | Documentos virtuales,contención,subidas,descargas y publicación | Ningún acceso a fs real; corpus de rutas; muestras conocidas; tipo/disposición/origen observados; exportaciones pública/soporte diferenciadas. |
| ActoIX ·41–45 | Auxiliar,CORS,CSRF,SSRF confinada,retornos y firma | Topología real probada; enviar≠leer; cookies sin desactivar navegador; solicitud servidor→intranet real; firma sobre bytes; negativos sin red externa. |
| ActoX ·46–50 | Correlación,ramas históricas,prioridades,suite y transferencia | Copias no revierten mundo principal; órdenes alternativos; suite detecta regresión; informe con fuentes y límites; IDs nuevos sin habilidad no enseñada. |
| Etapa4 | Campaña vacía→epílogo,continuidad,recuperación y aislamiento | Revisión integral documentada, sin tarjetas vacías ni logros por botones; fallos reparados y pendientes identificados. |

No se empieza un acto posterior como terminado hasta comprobar la transición desde el anterior. Cada escenario tendrá indicadores separados: diseñado, contenido escrito, funcional, validador probado y recorrido verificado.

## Suites previstas

Integración: servicios contra SQLite temporal; prueba negativa del control vulnerable y su variante corregida. Reinicio/recuperación: escenarios y campañas en directorio temporal, sin borrar datos del usuario. Navegador: Playwright con Firefox y contextos limpios, capturas y errores de consola. Red: mapa real de puertos publicados, resoluciones, cookies y destinos denegados; Docker no publica internos.

Progreso: importación inválida, versión incompatible, campaña ajena, generación antigua, cookie previa a reset, notas preservadas y un único mensaje de recuperación. Store API sin archivo ni credencial de progreso. Aula no acepta Origin de tienda en escritura. Ninguna ruta permite invocar una función interna del runner desde entrada del alumno.

Contenidos: API alumno solo proyecta datos desbloqueados; JSON de soluciones, claves correctas, planes privados, IDs de validadores, source maps y cronología futura no se filtran en respuestas o bundles. Solicitar hint4 es deliberado; no habilita pistas de capítulos bloqueados. El debrief se entrega tras la prueba correspondiente, no junto al mensaje inicial.

Navegador sensible: cargas de XSS pasan por reproducción del recorrido en contexto aislado; CORS prueba recepción y lectura separadas; CSRF prueba envío real de cookie y persistencia; SSRF registra origen real y destino. Un `resuelto=true` no sirve en ninguna suite.

Accesibilidad: teclado desde inicio hasta cierre, foco de diálogos, retorno de foco, labels, contraste medido, zoom200 %, movimiento reducido y lectura móvil. No se anuncian estas propiedades como verificadas hasta recorrerlas.

## Evaluación abierta sin IA

48: medidas con IDs,evidencias,contención/raíz,dependencia y prueba legítima. Aceptar permutaciones que cubran las dos ramas; ofrecer feedback por criterio incumplido. 50: informe con secciones de hecho histórico, hallazgo actual, evidencia, alcance, corrección, prueba legítima y limitación. Verificar asociaciones estructuradas y resultados reales. El texto libre complementa la explicación y requiere lectura humana si se pretende juzgar calidad narrativa.

## Prueba de enseñanza

Primero simulación del desarrollador con perfil de principiante: instrucciones para abrir herramienta, término explicado, pista suficiente y comprensión de lo demostrado. Después prueba con una persona principiante, con consentimiento, sin medir habilidad por rapidez ni pistas. Registrar por separado observaciones y cambios. Una simulación no sustituye esa prueba y aún no se ha realizado ninguna de las dos sobre una aplicación.

## Resultado de la ampliación06–10

16 pruebas de integración pasan (incluyen ActoI y ActoII). Recorridos Chromium separados:16 comprobaciones del ActoI y17 del ActoII, con transición05→06 desde progreso ganado por peticiones reales. Capturas y resultados en reports/browser-act-two-validation.json y reports/browser-act-two/.

Los401 esperados antes de entrar y después de salir se registran como denegaciones previstas, separados de errores JavaScript/consola inesperados. En08 se contrasta la observación del alumno con eventos de login/perfil; el navegador comprueba además HttpOnly y la ausencia de ug_store antes del acceso. No se afirma observar la pestaña de DevTools.

Los casos06/07/10 exigen comparación corregida antes de completar. El09 demuestra comportamiento correcto sin introducir un fallo artificial. Ninguna reproducción identifica a visitante-17 ni demuestra uso histórico de un fallo adicional. Pendientes Firefox, Docker, Kali y ensayo con persona principiante.

## Resultado de la ampliación11–15

21 pruebas de integración en reports/integration.tap: repetición con referencias distintas y misma sesión, rechazo entre sesiones, persistencia de preferencia, asignación interna con efecto real, seis casos HTTP, dos copias por campaña/generación, rechazo de pestaña antigua, comparación independiente y recuperación de contenido1/2/3. Las pruebas anteriores incluyen cancelación/concurrencia y sesiones revocadas.

reports/browser-act-three-validation.json registra17 comprobaciones Chromium: transición10→11; reenvío desde mesa y ReplayXHR por CDP;12–15 con formularios reales; cuentas y estados; parejas legítimo/abuso; reinicio, exportación y lectura móvil. Se han inspeccionado capturas. No se acredita uso del menú visual, Firefox ni una prueba humana. Las denegaciones esperadas se registran aparte de errores inesperados.

El15 conserva controles de propiedad, campos permitidos y mensajes públicos. Las pruebas positivas incluyen Alba203, Bruno204, soporte legítimo, preferencia daily y referencia CAT-6. Las negativas verifican ausencia de datos ajenos, capacidad sin modificar y error sin ruta/traza. Reintentar o recuperar no elimina controles comprobados ni concede evidencia nueva.

## Resultado de la ampliación16–20

26/26 pruebas de integración en reports/integration.tap. Los cinco casos nuevos comprueban herencia del15, límites y persistencia del pedido901, dato idéntico literal/formato, marcador único y fuente pública, muestra/nonce ajenos rechazados, reproducción real y origen opaco, segunda cuenta, referencia exacta y recuperación3/4.

reports/browser-act-four-validation.json registra21 comprobaciones Chromium: transición15→16; formularios y mesa; contraste literal/strong; recorrido del dato; rechazo de marca manual; explicación progresiva; ejecución de muestra; impedimento de cookies/documento padre; reseña Alba→Bruno; correcciones16–20; móvil, reinicio y recuperación. Cero solicitudes exteriores y errores inesperados en el recorrido. Los404 de imagen inexistente y denegaciones de cuenta son esperados y separados.

Se han inspeccionado capturas y el cliente original de develop-web-game sobre el18. Axe del17 se ejecuta tras etiquetar las regiones principales; no equivale a accesibilidad humana completa. El20 no usa como prueba el navegador de la emisora: el runner abre como Bruno una referencia exacta de reseña persistida. Las propuestas textContent conservan texto corriente y evitan el efecto de la muestra conocida.

Esta validación cubre las muestras acotadas del recinto. No es una evaluación de XSS arbitrario en una tienda de producción ni prueba que ese fallo se usara en el incidente histórico. Firefox, Safari, Kali y Docker siguen pendientes.
