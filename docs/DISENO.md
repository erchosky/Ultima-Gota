# Diseño de campaña · versión 0.1

Fecha editorial: 25 de octubre de 2026. Diseño completo de los 50 capítulos. Implementación vigente: 01–20 funcionales y comprobados en Chromium; consultar ESTADO.md y los informes.

## Promesa

Una tienda pequeña necesita entender por qué Alba ha visto un pedido ajeno. El aprendiz comienza identificando productos y termina entregando una investigación con pruebas y límites. El bucle es encargo → recuerdo útil → predicción → experimento → observación → evidencia → explicación → comprobación de la corrección. No hay puntuación por rapidez, intentos ni pistas.

La biblia y los datos compartidos están en `content/es/campaign/`. Cada expediente tiene una ficha JSON editable, cuatro pistas separadas, un plan de escenario y una solución de profesor. Los textos de los mensajes son nuevos; el contrato pedagógico original se conserva como referencia editorial.

## Personajes

Lara acompaña y exige pruebas con paciencia. Mara decide sobre continuidad de ventas y privacidad. Nico explica las prisas técnicas y corrige controles concretos. Vera prepara cuentas y buzones ficticios autorizados. Sam aporta inventario, albaranes y discrepancias de entrega. Ivo es autor de parte del código antiguo; no existe evidencia que permita atribuirle el incidente. Alba y Bruno conservan siempre sus pedidos. Mercurio es un conector, y visitante-17 una etiqueta sintética sin identidad personal conocida.

## Tres capas de verdad

Cada evidencia declara `kind`: reproducción observada, registro histórico, hipótesis o limitación. Una reproducción actual demuestra posibilidad técnica; un registro histórico respalda un evento en su alcance concreto. El estado de conocimiento del personaje y las correcciones de la tienda se guardan por separado de las habilidades.

La cronología completa es información editorial de profesor. Al inicio solo se conoce la queja y la necesidad de aprender a consultar productos. El 06 descubre el archivo; el 07 prueba la vigencia actual de la cuenta; el 13 aporta un extracto histórico de permisos; el 25 ordena una cronología parcial; el 33 distingue el reintento legítimo; el 45 presenta la notificación no autenticada; el 46 correlaciona el conjunto. No se identifica una persona ni se atribuyen SQLi, XSS o archivos al incidente sin registros.

## Decisiones y tensiones resueltas

| ID | Tensión del encargo | Decisión de diseño | Verificación pendiente |
|---|---|---|---|
| D01 | 02–05 necesitan una discrepancia consistente y un enlace a verano. | Producto 2: servidor y hoja 210 céntimos; presentación antigua 240. Su ficha referencia la campaña del producto 6. El 05 corrige el renderizado; el servidor nunca tenía 240. | Recorrido inicial y regresión de presentación. |
| D02 | Una edición del inspector no puede observarse de forma fiable desde otra página. | Se evalúan datos anotados y nueva respuesta real tras recargar. La edición local se declara como observación del alumno; no se promete telemetría del inspector. | UX principiante y comprobación de límites del validador. |
| D03 | El 40 revisa publicación pública; el 47 exige una rama con ampliación de permisos. | Hay dos recursos: copia publicada por error `muestra-publicada.csv` (40) y exportación de soporte `muestra-soporte.csv` (histórico 09:05 y 47). Ambos son muestras ficticias pequeñas. En el histórico, soporte es necesario para la exportación, pero nunca para aprovechar el IDOR de pedidos. | Matriz de rutas, cuentas y copias. |
| D04 | Corregir el mundo y volver a explotar no deben contradecirse. | Las correcciones se agregan al mundo principal. Reproducciones posteriores usan copias identificadas, con versión, semilla y etiqueta visibles. Los casos 47 y 49 nunca modifican la versión principal. | Pruebas de transición y recuperación. |
| D05 | Cookie aislada por host y CSRF real sin desactivar el navegador. | Escritorio en `localhost`; tienda en `127.0.0.1`; auxiliar en el mismo host de tienda y otro puerto. Cookies sin Domain. El auxiliar comparte cookies de tienda por host, pero no las de escritorio. El 42 comprueba CSRF entre orígenes del mismo sitio. | Prueba real en Firefox de envío de cookies, Origin y bloqueo corregido. |
| D06 | El fallo de archivos debe comportarse realmente sin leer el anfitrión. | Árbol virtual en memoria con semántica POSIX; nunca se pasa la entrada a `fs.readFile`. Se atraviesa una carpeta pedagógica dentro del árbol, no el sistema de archivos del contenedor. | Corpus de rutas codificadas, absolutas, enlaces y separadores. |
| D07 | Una SSRF debe emitir una solicitud real y estar confinada. | El servicio vulnerable consulta exclusivamente dos destinos fijos del recinto; un guardián de salida independiente solo permite IP/puertos internos declarados. Un destino es indebido según la regla de negocio pero permitido por el recinto. Sin URL externa, redirecciones ni resolución arbitraria. | Restricción de salida real en Docker y pruebas negativas. |
| D08 | Un intento anterior no debe completar una copia recién iniciada. | Evidencias enlazadas a campaña, generación de campaña, escenario, ejecución, versión y secuencia. Reiniciar escenario cambia `runId`. Los logros anteriores se conservan como históricos. | Integración, reenvío y restauración. |
| D09 | Modo profesor explícito sin seguridad absoluta frente al dueño del equipo. | Acceso local deliberado mediante código aleatorio impreso en terminal, sesión propia y confirmación de entrada. Soluciones fuera de bundles y respuestas de alumno. El dueño puede leer los archivos fuente. | Pruebas de API, bundle, source maps y caché. |
| D10 | El caso 11 no debe exigir comandos que aún no se enseñaron. | Firefox de escritorio como navegador didáctico de referencia, con «Reenviar» y «Editar y reenviar». Ningún paso inicial exige consola, curl ni Burp. | Versión concreta y compatibilidad al implementar. |
| D11 | Ejercicios de tiempo frente a recuperación de campaña. | El reloj de cada escenario es independiente. El cupón vence en día 1 a las 00:00; recuperación dura 600 s y vence cuando `now >= expiresAt`. Cambiar reloj nunca altera eventos canónicos ni reloj del sistema. | Límites exactos, reinicio y concurrencia. |
| D12 | Restablecimiento e importación pueden resucitar estados viejos. | La campaña tiene generación monotónica y lápida de restablecimiento. Importar una exportación antigua exige restaurarla como copia archivada, con ID nuevo; no sustituye la generación activa. | Pruebas de cookies antiguas y exportaciones manipuladas. |
| D13 | Una novedad por caso y herramientas auxiliares necesarias. | Breves apoyos explican el mecanismo antes de exigirlo: JSON, tokens, cabeceras, firma y lanzador de dos peticiones. No se califican como competencias nuevas adicionales ni se asumen conocimientos de programación. | Simulación del recorrido y posteriormente prueba con principiante. |
| D14 | 50 expedientes finales frente a primera entrega por etapas. | La Etapa 1 terminó el diseño de los 50 sin marcar escenarios funcionales. La Etapa 2 implementa 01–05 y el resto continúa por actos. | Criterios de salida de cada etapa. |
| D15 | La automatización de Firefox no encuentra el perfil en este macOS. | El Acto I se comprueba íntegramente en Chromium; la ayuda conserva pasos de Firefox y añade Chromium. No se acredita Firefox ni Docker sin ejecutarlos. | Repetir en Firefox y Kali cuando el entorno permita arrancarlos. |

Son resoluciones reversibles dentro del alcance recibido. No se detectó una contradicción que requiera cambiar los 50 capítulos, contratar servicios o pedir acceso adicional.

## Microhabilidades y ayuda

Cada expediente introduce S01…S50 con verbo observable, utiliza habilidades previas en acciones concretas y entrega un objeto trazable al siguiente caso. El mapa distingue introducción, práctica guiada y transferencia. La ayuda sigue disponible en todos los actos. La última habilidad integra y comunica; no añade otra vulnerabilidad.

Las respuestas abiertas usan criterios estructurados. El texto libre queda en el informe para lectura humana; el programa no fingirá comprenderlo con IA. El 48 admite órdenes alternativos que cumplan restricciones. El 50 pide seleccionar evidencia, alcance, medida y limitación, además de redactar dos mensajes legibles.

## Continuidad

Aplicar una corrección a la copia de revisión es un evento persistente. Reintentar restaura datos y sesiones del escenario, manteniendo logros y notas. Si falta un objeto, se reconstruye únicamente desde un checkpoint ya ganado. Los secretos de laboratorio se guardan como referencias y se muestran solo por decisión del alumno. Ningún correo sale del laboratorio.

La duración total no se anuncia. Los instantes posteriores a las 10:00 son marcas editoriales de orden del relato; no miden el tiempo del alumno.

Los datos iniciales de ejercicios son fixtures pedagógicos frescos, no una afirmación de que todos los pedidos estaban en estado creado a las 10:00 del incidente. El histórico conserva sus propios estados y registros; la copia del 47 parte de las 08:49, antes de la actividad sintética, para reproducirla. La equivalencia entre conjuntos conserva propietarios y reglas. En el 50 una copia de transferencia vuelve a sembrar únicamente fallos ya conocidos de propiedad, precio y cupón; el mundo principal sigue corregido.

## Decisiones de la implementación del ActoII

- **D16:** ug_lab identifica la copia, ug_store autentica la cuenta. La separación permite enseñar en08 la aparición de una cookie real al entrar. Ambas pertenecen al host de tienda; ug_classroom sigue en localhost. Comprobado con cookies del navegador y document.cookie para HttpOnly. Referencia técnica: [cookies HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies).
- **D17:** las comparaciones06/07/10 usan una copia de validación separada. Retirar la credencial pública y revocar la cuenta se registran como correcciones; el control de pedidos del10 es propuesta hasta15. No se deshacen parches para continuar la historia.
- **D18:** checkpoint06 conserva procedencia y referencia, no el secreto en exportaciones. Una petición explícita recupera la credencial de laboratorio del fixture si el checkpoint ya fue ganado. Exportaciones antiguas de contenido1 se importan como archivo, sin alterar generación activa.
- **D19:** las mutaciones del aula se serializan hasta que termine el handler, no hasta que se cierre la conexión HTTP. Evita que un navegador que cancele una comparación permita que su resultado sobrescriba una nota posterior.

01–20 están implementados y comprobados en Chromium. Las decisiones de arquitectura para los otros30 siguen siendo propuestas sin verificación ejecutable.

## Decisiones de la implementación del Acto III

- **D20:** la mesa didáctica utiliza XMLHttpRequest y repite exactamente método, ruta y cuerpo con la misma sesión, generando eventos nuevos. El11 conserva el aprendizaje de reenvío sin exigir programación. Se prueba también Network.replayXHR nativo mediante CDP. La [opción documentada de Chrome](https://developer.chrome.com/docs/devtools/network/reference) para editar como fetch abre consola; no es un paso básico del alumno. [ReplayXHR en CDP](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-replayXHR) es una sonda distinta del menú visual. D10 queda concretada por esta alternativa; Firefox continúa pendiente.
- **D21:**14 compara seis respuestas para obtener cinco códigos distintos. Dos200 tienen significados diferentes; no se sustituye la denegación real por una tarjeta inventada. La integración y el detalle mercurio/catalog son ficticios y locales.
- **D22:**15 exige evidencia de práctica y propuesta en ejecuciones separadas de la misma campaña/generación. El alumno diseña y realiza parejas, y el runner las contrasta de forma independiente, incluyendo Bruno, soporte legítimo y errores limpios. El aula conserva order-ownership, profile-allowlist y public-errors; las prácticas antiguas siguen etiquetadas.
- **D23:** una corrección ya comprobada no depende de aprobar después la comprensión. Reintentar conserva informe y corrección; la acreditación de evidencia actual exige el run nuevo. Exportar/importar conserva la corrección histórica sin inventar un logro. Contenido3 admite hasta15; las versiones1/2 siguen limitadas a05/10.

Se revisaron componentes React con la guía react-best-practices: etiquetas semánticas, efectos con dependencias estables para identidad de copia, formularios controlados, estado local sin duplicar datos de autorización y solicitudes paralelas independientes. Las decisiones de autorización se mantienen en el servidor. Axe cubre la mesa del11 y las comprobaciones previas; no es una auditoría completa de accesibilidad.

## Decisiones de la implementación del Acto IV

- **D24:** el16 persiste un pedido de práctica901 separado de203/204. Producto2 fijo, sin cobro, quantity como único campo variable. La comparación conserva1/20 y rechaza0/negativo/fracción/21 sin mutar el pedido anterior.
- **D25:** HTML se representa exclusivamente en un marco con origen opaco. Tanto el atributo iframe como la cabecera CSP aplican sandbox allow-scripts; se excluye allow-same-origin. Solo se aceptan muestras acotadas. La política de scripts usa nonce de bootstrap y hash de un manejador local, con unsafe-hashes; no abre unsafe-inline ni eval. Referencias técnicas: [CSP script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src), [CSP nivel3](https://www.w3.org/TR/CSP/). Los controles concretos se prueban en Chromium, no se extrapolan a navegadores pendientes.
- **D26:** postMessage actualiza únicamente la indicación visual de la tienda y exige la ventana del marco actual. El aula nunca acepta ese mensaje como logro.17/18 reproducen representación en contexto limpio;19 carga la entrada exacta;20 entra como Bruno y lee la referencia exacta de reseña almacenada por Alba. Marca manual, formato sin ejecución y referencia inventada quedan rechazados.
- **D27:**16/17 conservan demo.pera en copia explícitamente anterior a revocación; pedidos, perfil y errores mantienen los controles del15. Desde18 continúa revocada. Las correcciones principales nuevas son quantity-rule, dom-message-text y review-text. Las comparaciones17/18 prueban propuestas de texto sin atribuir al formato una vulnerabilidad ni cerrar el caso19 por anticipado.
- **D28:** contenido4 conserva importaciones1/2/3 con límites05/10/15. Informes de reproducción se exportan como datos históricos; su recuperación no sustituye eventos nuevos. El código público del18 coincide con el que se inserta en el marco, no es una explicación decorativa.

Revisión React: componentes separados para marco, explicación progresiva y pantallas de práctica; mensajes escuchados solo durante el ciclo de vida del marco; campos controlados y renders textuales fuera del recinto. Axe motivó nombres distintos de regiones main en tienda y marco. No se acredita una auditoría completa con lector de pantalla.
