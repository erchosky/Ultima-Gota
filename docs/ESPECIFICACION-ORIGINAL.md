# PROMPT MAESTRO — ÚLTIMA GOTA: LOS 50 EXPEDIENTES

Actúa como un equipo de diseño de videojuegos educativos, enseñanza de ciberseguridad, narrativa interactiva, desarrollo web y pruebas. Construye una aplicación educativa original, ejecutable y mantenible llamada **Última Gota: los 50 expedientes**.

Lee este documento entero antes de diseñar o programar. Es la especificación del proyecto. El catálogo de 50 capítulos es obligatorio: puedes ajustar su implementación para que funcione, pero conserva su orden pedagógico, su función narrativa y sus dependencias. Detecta y documenta cualquier contradicción antes de consolidarla en código.

## 1. Qué estamos construyendo y para quién

Un juego web narrativo de ciberseguridad para una persona que empieza completamente desde cero. Está inspirado en la idea de aprender investigando una aplicación vulnerable, pero tiene identidad, historia, interfaz y contenidos propios. No copies la marca, los textos, los personajes ni el catálogo de retos de Juice Shop.

El alumno habla español y puede no saber qué son una URL, HTML, una petición HTTP, una cookie, una base de datos o las herramientas de desarrollo. No presupongas conocimientos de programación, Linux, redes ni seguridad. Enseña cada concepto antes de exigirlo.

La experiencia central es: **leer un caso → recordar lo aprendido → probar una hipótesis → observar una consecuencia → reunir una prueba → entender el fallo → comprobar su corrección**.

El aprendizaje será acumulativo. En los primeros capítulos debe reconocerse claramente A → A+B → A+B+C. Más adelante mantén un conjunto de habilidades fundamentales y añade una microhabilidad por capítulo. Reutiliza las habilidades cuando tengan una función real en el caso. Evita convertir cada misión avanzada en una repetición mecánica de todos los pasos de las anteriores.

Los fallos deben existir en el comportamiento de una aplicación de laboratorio. Cambiar un texto, pulsar un botón llamado «hackear» o reproducir una animación no constituye resolver una vulnerabilidad.

## 2. Alcance y límites del entorno

- Todo ocurre con cuentas, pedidos, productos, correos, credenciales y pagos ficticios.
- La instalación inicial es local y accesible desde el navegador. Docker debe publicar los servicios únicamente en la interfaz local por defecto.
- Las peticiones de los ejercicios se limitan a los servicios del laboratorio. Los escenarios de solicitudes a otros servicios utilizan una intranet ficticia aislada.
- No se necesitan cuentas externas, correo real, pagos reales, claves de proveedores ni servicios de inteligencia artificial.
- Las contraseñas de los personajes son datos de laboratorio y nunca se reutilizan fuera de él.
- Las herramientas de los ejercicios de archivos solo pueden acceder a una colección de archivos ficticios. No deben permitir leer archivos del equipo anfitrión.
- Las cargas de los ejercicios de ejecución en navegador tienen efectos inocuos, como mostrar una marca de demostración. No se requiere exfiltrar datos reales.
- No incluyas malware, persistencia en el sistema operativo, ataques a servicios ajenos ni pasos que necesiten privilegios sobre el equipo anfitrión.
- No afirmes que el aislamiento es infalible. Verifica sus límites y documenta lo que no se ha comprobado.

## 3. Premisa y promesa narrativa

**Última Gota** es una pequeña tienda de zumos con tienda física, almacén y una web que ha crecido demasiado deprisa. Lleva años encadenando promociones temporales, integraciones de proveedores y arreglos urgentes.

El juego comienza a las 10:00 del «día 0». Una clienta ficticia, **Alba**, ha enviado una captura: al consultar su pedido ha visto información de otro cliente, **Bruno**. La dueña necesita entender lo ocurrido antes de ampliar el negocio.

El jugador entra como **aprendiz del equipo de revisión**, acompañado por una mentora. El trabajo comienza en una copia autorizada de la tienda. Su primera tarea es comprender cómo se consultan los productos; todavía no está preparado para investigar pedidos y permisos.

Cada capítulo es un expediente que llega al buzón interno. Algunos investigan el incidente inicial y otros revisan funciones relacionadas que podrían estar afectadas. El relato debe distinguir siempre entre:

1. Un hecho observado en una prueba.
2. Una hipótesis del equipo.
3. Una evidencia histórica del incidente.
4. Una limitación que todavía impide concluir algo.

No conviertas todos los errores en acciones de un mismo atacante. El desenlace mostrará una combinación de accesos indebidos y fallos operativos. Descubrir una vulnerabilidad no demuestra que alguien la utilizara durante el incidente.

## 4. Personajes y voz

- **Lara, mentora de seguridad:** paciente, concreta y rigurosa. Enseña a observar y pide una prueba antes de aceptar una conclusión. Nunca ridiculiza al alumno.
- **Mara, dueña de la tienda:** plantea necesidades comprensibles: proteger pedidos, evitar cobros incorrectos y poder seguir vendiendo. No domina la terminología técnica.
- **Nico, desarrollador de la web:** conoce el sistema y reconoce decisiones tomadas con prisas. No es el villano ni un personaje incompetente por definición.
- **Vera, soporte al cliente:** aporta correos ficticios y ayuda a reproducir problemas con cuentas autorizadas.
- **Sam, responsable de almacén:** detecta diferencias entre productos, pedidos y entregas.
- **Ivo, antiguo colaborador:** construyó parte de una promoción y del conector Mercurio. Su código antiguo es relevante, pero eso no demuestra que causara intencionadamente el incidente.
- **Alba y Bruno:** clientes ficticios utilizados para enseñar propiedad de los pedidos y privacidad.
- **Mercurio:** nombre de una integración ficticia de catálogo y logística. No es una persona ni un enemigo mágico.
- **visitante-17:** etiqueta de un actor sintético en ciertos registros históricos. No se conoce su identidad personal.

El jugador puede elegir un alias. Los textos usan español natural y frases claras. Introduce el término técnico junto a una explicación sencilla. Evita párrafos de jerga, bromas que confundan el objetivo y felicitaciones exageradas.

## 5. Biblia del incidente: hechos canónicos

Usa una línea temporal coherente, expresada con el reloj ficticio del laboratorio. No la reveles completa al inicio.

- **Antes del día 0:** una promoción dejó un archivo JavaScript público con credenciales de una cuenta ficticia de pruebas. La cuenta seguía activa.
- **08:50:** un actor etiquetado como visitante-17 descargó ese archivo. Su dirección de laboratorio o etiqueta de sesión no basta para identificar a una persona.
- **08:52:** una sesión de ese actor inició sesión con la cuenta de pruebas.
- **08:54:** esa sesión aprovechó una actualización de perfil que aceptaba un campo interno de permisos que el cliente no debía poder decidir.
- **08:55:** la sesión consultó un pedido ajeno. Otra comprobación independiente de Alba encontró el fallo de acceso por identificador y originó su queja.
- **09:05:** la sesión accedió a una exportación de demostración que debía estar restringida. Los registros muestran el alcance concreto que puede demostrarse, sin inventar descargas adicionales.
- **09:10:** se recibió una notificación logística de prueba sin autenticidad correctamente verificada. Su relación con el actor anterior solo se afirma si las evidencias construidas para el juego la respaldan.
- **09:15:** un reintento legítimo de Mercurio provocó un descuento duplicado. Este hecho es un fallo operativo distinto y sirve para enseñar que proximidad temporal no equivale a causalidad.
- **10:00:** comienza la revisión guiada del jugador en la copia del laboratorio.

Cada registro, captura, correo y estado de pedido debe concordar con estos hechos. Si cambias un hecho durante el desarrollo, actualiza todas sus referencias y pruebas. Los fallos adicionales de la campaña son hallazgos de revisión; no los atribuyas al incidente sin evidencia.

### Datos de referencia compartidos

Mantén un inventario central para que los ejemplos no cambien de nombre o propietario entre capítulos:

- Productos base: 1, Naranja de barrio; 2, Pera del huerto; 3, Manzana fresca; 4, Mango del puerto; 5, Limón con jengibre; 6, Mezcla de verano, asociado a la campaña antigua.
- La campaña antigua se llama **Verano sin colas**. Su archivo de demostración es público porque se distribuyó con esa página, no porque el jugador tenga acceso administrativo al servidor.
- Cuentas de referencia: Alba, Bruno y demo.pera. La cuenta demo.pera solo tiene facultades de cliente al inicio.
- Pedidos de referencia: 203 pertenece a Alba; 204 pertenece a Bruno; 205 pertenece a demo.pera. No cambies el propietario para facilitar una validación.
- Las funciones de soporte y proveedor usan cuentas distintas y privilegios explícitos. Los campos internos de permisos nunca se confunden con preferencias editables del perfil.
- El cupón de práctica se llama **PRIMERBRINDIS**. Sus condiciones se definen en un único lugar y se reutilizan en correo, interfaz, servidor y pruebas.
- El expediente del incidente se identifica como **UG-001**. Cada evidencia añade un identificador estable propio.

Define las contraseñas ficticias y los identificadores adicionales en los fixtures. Utiliza credenciales claramente de demostración. Los capítulos posteriores pueden cambiar identificadores para comprobar transferencia de aprendizaje, conservando los propietarios y relaciones declarados para ese escenario.

## 6. Reglas pedagógicas obligatorias

### Una novedad medible por capítulo

Define la nueva habilidad con un verbo observable: localizar, cambiar, comparar, reenviar, clasificar, verificar o explicar. «Aprender seguridad» y «usar las herramientas del navegador» son demasiado amplios.

Si una misión necesita tres conceptos desconocidos, introduce apoyos previos o reduce su alcance. Los capítulos finales pueden combinar muchas habilidades, pero su novedad será una competencia de investigación, priorización o comunicación.

### Repetición con significado

Cada capítulo declara las habilidades previas que utiliza, con sus números de capítulo. La reutilización debe formar parte de la prueba que el jugador realiza, no limitarse a una frase de recordatorio.

Como regla de diseño, recupera una habilidad poco después de introducirla y vuelve a utilizarla en un contexto distinto más adelante. Lleva un mapa de dependencias y una matriz de introducción, práctica guiada y aplicación independiente.

No exijas que un novato adivine una herramienta, una palabra, una ruta o un formato que nunca se ha explicado ni dejado descubrir con pistas suficientes.

### Ayuda que disminuye

- Primer contacto: objetivo concreto, demostración breve y un paso cada vez.
- Práctica: recordatorio de la herramienta y una pista opcional.
- Transferencia: otro contexto, con el objetivo y las evidencias necesarias.
- Evaluación: combinación de habilidades enseñadas; el alumno elige el orden.

El modo guiado puede estar activado durante toda la campaña. Utilizar una pista no resta puntos ni bloquea el avance.

### Bucle de comprensión

Antes de una acción relevante, pide una predicción sencilla. Después, pide observar qué cambió. Al cerrar el caso, incluye una pregunta breve sobre el motivo del resultado. Una respuesta incorrecta debe producir una explicación útil y permitir reintentar.

La explicación de cierre debe incluir el comportamiento observado, su causa, su impacto dentro del escenario, una corrección y una prueba de que esa corrección conserva el uso legítimo.

## 7. Estructura exacta de cada expediente

Implementa cada capítulo con estos campos y contenidos reales:

1. Identificador y título.
2. Acto, ubicación y momento narrativo.
3. Remitente y mensaje inicial de entre 80 y 160 palabras como objetivo editorial.
4. Motivo por el que el caso importa para la tienda.
5. Conocimientos previos y acciones que se repiten.
6. Una microhabilidad nueva.
7. Objetivo práctico observable.
8. Estado inicial reproducible y cuentas autorizadas necesarias.
9. Pregunta de predicción.
10. Pasos guiados disponibles, separados de la solución.
11. Cuatro pistas progresivas: concepto, zona, acción y guía explícita.
12. Prueba técnica de éxito y condiciones que no bastan para resolverlo.
13. Evidencia que conserva el cuaderno.
14. Explicación de cierre y pregunta de comprensión.
15. Corrección aplicable y prueba positiva y negativa cuando proceda.
16. Pista u objeto que conecta con el siguiente capítulo.
17. Punto de recuperación y procedimiento de reinicio del escenario.
18. Solución de profesor, oculta por defecto y separada del contenido del alumno.

Los objetivos de extensión son editoriales, no una excusa para rellenar. Escribe todos los contenidos de los capítulos que implementes. No sustituyas el texto de una misión por «generar después» y la marques como terminada.

## 8. Catálogo obligatorio de 50 capítulos

Los apartados siguientes son el contrato mínimo de cada capítulo. Debes desarrollarlos con la estructura anterior y convertirlos en acciones y estados verificables.

### ACTO I — APRENDER A MIRAR

La tienda parece una web corriente. Lara enseña a formular preguntas y observar respuestas. Estos capítulos preparan el incidente; no presentan cada cambio de producto como una vulnerabilidad.

#### Capítulo 01 — La ficha equivocada
- **Historia:** Sam ha recibido un enlace al zumo de pera que abre el de naranja. Necesita enviar a un cliente la ficha correcta.
- **Repite:** nada; es la entrada para principiantes.
- **Añade:** reconocer y modificar un parámetro `id` en una dirección.
- **Acción:** abrir una ficha, localizar el identificador y cambiarlo por el de otro producto conocido. Enseña dónde escribir la dirección y qué parte conservar.
- **Éxito y prueba:** la petición solicita el segundo producto y la ficha muestra su identidad. Cambiar únicamente un texto visible no cuenta.
- **Comprensión y enlace:** identificar productos por número es un funcionamiento normal. Sam entrega una lista de referencias; una presenta un precio extraño.

#### Capítulo 02 — El precio fantasma
- **Historia:** la ficha de un producto y la hoja de almacén muestran precios diferentes. Lara pide comprobar qué está consultando el navegador.
- **Repite:** localizar y cambiar el identificador del capítulo 01.
- **Añade:** localizar una petición concreta en la pestaña Red del navegador.
- **Acción:** abrir Red, cargar la ficha por su identificador y seleccionar la petición de datos correspondiente. Explica cómo distinguirla de imágenes y estilos sin exigir conocerlos de antemano.
- **Éxito y prueba:** registrar la dirección, el método visible y el producto solicitado. El método se observa; todavía no se modifica.
- **Comprensión y enlace:** la página provoca peticiones. El cuaderno conserva la petición para investigar su respuesta.

#### Capítulo 03 — Lo que llegó de verdad
- **Historia:** Nico necesita saber si el servidor envió el precio incorrecto o si la página está mostrando mal el dato.
- **Repite:** identificador y selección de la petición, capítulos 01–02.
- **Añade:** localizar un campo concreto dentro de una respuesta JSON.
- **Acción:** leer la respuesta y encontrar `id`, nombre y precio. Presenta JSON como datos organizados, con un ejemplo pequeño y un glosario contextual.
- **Éxito y prueba:** comparar el precio recibido con el visible y adjuntar la diferencia concreta. No basta con abrir cualquier respuesta.
- **Comprensión y enlace:** distinguir datos recibidos y presentación. La respuesta menciona una antigua campaña de verano.

#### Capítulo 04 — Una página, dos capas
- **Historia:** la referencia de la campaña aparece entre los datos recibidos, pero apenas se ve en la ficha.
- **Repite:** localizar producto, petición y campo de respuesta, capítulos 01–03.
- **Añade:** localizar un elemento de la página con el inspector de elementos.
- **Acción:** seleccionar el nombre del producto y reconocer el elemento que lo presenta. Probar una edición local inocua de su texto.
- **Éxito y prueba:** observar que la edición cambia la pantalla, pero no el producto devuelto por el servidor; recargar restaura el texto.
- **Comprensión y enlace:** editar la pantalla no modifica automáticamente el servidor. En el elemento de la campaña aparece una referencia pública a su página antigua.

#### Capítulo 05 — La primera prueba útil
- **Historia:** Mara necesita un resumen para corregir el precio y evitar que cada persona describa un problema diferente.
- **Repite:** dirección, Red, respuesta e inspector, capítulos 01–04.
- **Añade:** registrar una evidencia reproducible separando esperado y observado.
- **Acción:** completar una ficha con producto, pasos, valor esperado, valor recibido y prueba de que una edición local no altera los datos.
- **Éxito y prueba:** otra ejecución controlada reproduce el resultado con esos datos. El alumno elige una conclusión respaldada por la evidencia.
- **Comprensión y enlace:** todavía no se ha demostrado un ataque. Mara autoriza revisar la campaña antigua que quedó enlazada.

### ACTO II — LO QUE LA PROMOCIÓN DEJÓ ATRÁS

El jugador reutiliza la observación para encontrar datos que la tienda distribuye a los navegadores. El acto termina reproduciendo la queja de Alba con dos cuentas ficticias.

#### Capítulo 06 — La promoción retirada
- **Historia:** la página de la campaña ya no está en el catálogo, pero su referencia sigue en la ficha revisada.
- **Repite:** seguir identificadores y localizar referencias, capítulos 01 y 04; documentar, capítulo 05.
- **Añade:** buscar una palabra en un recurso JavaScript que la propia página ha cargado.
- **Acción:** abrir el recurso público indicado por la página y buscar un término de pruebas. Enseña qué es JavaScript solo en la medida necesaria para reconocer el dato.
- **Éxito y prueba:** encontrar el usuario y la contraseña ficticios de una cuenta de demostración y registrar el recurso que los contiene.
- **Comprensión y enlace:** un archivo enviado al navegador puede leerse aunque no tenga un botón en pantalla. Lara autoriza comprobar exclusivamente esa cuenta.

#### Capítulo 07 — Una cuenta que seguía viva
- **Historia:** nadie sabe si las credenciales de la campaña siguen funcionando. Vera confirma que la cuenta es de pruebas.
- **Repite:** localizar el archivo y recuperar las credenciales, capítulo 06; observar la respuesta, capítulo 03.
- **Añade:** iniciar sesión y reconocer la identidad con la que se trabaja.
- **Acción:** introducir las credenciales de laboratorio y comprobar el nombre y los datos mínimos de la cuenta autenticada.
- **Éxito y prueba:** el servidor establece una sesión de esa cuenta y el perfil corresponde a su identidad. Mostrar una pantalla de bienvenida falsa no cuenta.
- **Comprensión y enlace:** unas credenciales expuestas importan si todavía conceden acceso. El cuaderno conserva la identidad, con la contraseña oculta por defecto.

#### Capítulo 08 — Cómo recuerda la tienda quién eres
- **Historia:** el jugador abre otra ficha y la tienda continúa reconociendo la cuenta de pruebas.
- **Repite:** iniciar sesión y observar peticiones, capítulos 02 y 07.
- **Añade:** localizar la cookie o mecanismo de sesión que usa esta implementación.
- **Acción:** identificar su nombre, cuándo aparece y en qué peticiones se utiliza. Explica que una sesión no es la contraseña. Si se eligen cookies HttpOnly, enséñalas en la herramienta correcta; no prometas leerlas con JavaScript.
- **Éxito y prueba:** comparar el estado anterior y posterior al acceso y vincularlo con la identidad del servidor.
- **Comprensión y enlace:** la sesión explica la continuidad entre páginas y prepara una comprobación de cierre de sesión.

#### Capítulo 09 — Cerrar la puerta
- **Historia:** Vera comparte un equipo de atención y quiere saber qué ocurre al cerrar sesión.
- **Repite:** inicio de sesión, cookie y petición de perfil, capítulos 07–08 y 02–03.
- **Añade:** comparar el acceso a un mismo recurso antes y después de cerrar sesión.
- **Acción:** consultar el perfil autenticado, cerrar sesión y volver a abrir el mismo recurso desde la interfaz, observando la nueva petición en Red. Todavía no exijas editar ni reenviar peticiones manualmente.
- **Éxito y prueba:** registrar identidad válida antes del cierre y ausencia de acceso privado después. Clasificar todavía con lenguaje sencillo: acceso permitido o denegado.
- **Comprensión y enlace:** el escenario base de cierre funciona; no lo declares vulnerable por obligación. Lara prepara dos cuentas para la queja original.

#### Capítulo 10 — Ese pedido no es mío
- **Historia:** Alba afirma haber visto el pedido de Bruno. Vera proporciona dos cuentas y dos pedidos ficticios con propietarios conocidos.
- **Repite:** cambiar identificadores, inspeccionar petición y respuesta, comprobar identidad, capítulos 01–03 y 07–09.
- **Añade:** comprobar autorización por objeto entre dos cuentas.
- **Acción:** consultar el pedido propio de Alba y cambiar únicamente el identificador por el de Bruno, manteniendo la sesión de Alba. Después contrastar con la sesión del propietario.
- **Éxito y prueba:** la cuenta equivocada recibe datos del pedido ajeno y el cuaderno demuestra propietario, sesión y recurso. No basta con adivinar un número.
- **Comprensión y enlace:** presenta IDOR tras explicar el fallo en lenguaje sencillo. Los pedidos incluyen una referencia al conector Mercurio.

### ACTO III — LO QUE EL SERVIDOR ACEPTA

La revisión pasa de observar a reproducir y modificar peticiones. Se investiga por qué una cuenta de pruebas pudo adquirir facultades que no le correspondían.

#### Capítulo 11 — Repetir sin volver a empezar
- **Historia:** Nico necesita una reproducción exacta del acceso indebido para localizar el fallo.
- **Repite:** localizar la petición y comprobar identidad y propietario, capítulos 02 y 10.
- **Añade:** reenviar una petición desde las herramientas del navegador.
- **Acción:** utilizar la función compatible con el navegador elegido para repetir una consulta. Enseña primero el reenvío sin cambios.
- **Éxito y prueba:** el servidor recibe una segunda petición equivalente, con un identificador de prueba distinto y la misma sesión.
- **Comprensión y enlace:** una petición puede repetirse fuera del botón que la originó. Nico entrega un caso autorizado de actualización de perfil.

#### Capítulo 12 — El contenido del sobre
- **Historia:** una preferencia del perfil no se guarda como se espera y es necesario reproducir el envío.
- **Repite:** capturar, leer y reenviar, capítulos 02–03 y 11.
- **Añade:** modificar un campo permitido en el cuerpo JSON de una petición.
- **Acción:** cambiar una preferencia inocua de la cuenta de pruebas y reenviar conservando el resto de la estructura. Diferencia dirección, método y cuerpo con ejemplos visuales.
- **Éxito y prueba:** el servidor guarda la preferencia y una consulta posterior la devuelve.
- **Comprensión y enlace:** manipular una petición autorizada no implica por sí mismo un fallo. La respuesta contiene también un campo interno de capacidades que requiere revisión.

#### Capítulo 13 — Un permiso que nadie te dio
- **Historia:** el historial de la cuenta de pruebas muestra un cambio inesperado en sus capacidades de soporte.
- **Repite:** editar JSON y comprobar resultados, capítulos 12 y 03; revisar permisos, capítulo 10.
- **Añade:** comprobar si el servidor acepta un campo interno que el cliente no debe controlar.
- **Acción:** en la copia del escenario, añadir a la actualización de perfil un campo interno de capacidad de soporte y comprobar su efecto en un recurso ficticio restringido.
- **Éxito y prueba:** se demuestra un cambio real de autorización causado por ese campo, sin acceso al sistema anfitrión.
- **Comprensión y enlace:** explicar asignación masiva y listas explícitas de campos permitidos. La capacidad obtenida aparece en los registros históricos de las 08:54.

#### Capítulo 14 — Una respuesta que cuenta demasiado
- **Historia:** soporte recibe errores confusos y algunos mensajes revelan detalles de la integración.
- **Repite:** reenvío, variación de datos y lectura de respuesta, capítulos 03 y 11–12.
- **Añade:** interpretar una tabla pequeña de estados HTTP y distinguir un error útil de una filtración interna.
- **Acción:** comparar solicitudes válidas, sin sesión, sin permiso y con formato incorrecto. Introduce 200, 400, 401, 403 y 404 con sus límites; no deduzcas autorización solo por el número.
- **Éxito y prueba:** clasificar respuestas por código y contenido, identificando un mensaje que expone información ficticia innecesaria.
- **Comprensión y enlace:** un 200 puede contener una denegación y un error no demuestra inyección. Nico prepara una corrección verificable.

#### Capítulo 15 — Corregido, pero comprobado
- **Historia:** Nico limita los campos de perfil y aplica la comprobación de propiedad a los pedidos.
- **Repite:** los casos de los capítulos 10 y 13 y la interpretación del 14.
- **Añade:** diseñar una pareja de pruebas: uso legítimo permitido y abuso denegado.
- **Acción:** activar la versión corregida en la copia del caso y repetir ambas parejas de pruebas.
- **Éxito y prueba:** la cuenta conserva su función normal, no cambia capacidades internas y no consulta pedidos ajenos. Se verifican estado y contenido.
- **Comprensión y enlace:** la corrección entra en la continuidad del mundo. Un informe de productos trae una descripción con formato extraño.

### ACTO IV — CUANDO EL TEXTO SE CONVIERTE EN ACCIÓN

Se enseña primero la diferencia entre controles de pantalla, texto y marcado. Después se aborda ejecución en el navegador con efectos inocuos y pruebas locales.

#### Capítulo 16 — El botón no es la regla
- **Historia:** Sam cree que la cantidad mínima está protegida porque el formulario no permite ciertos valores.
- **Repite:** reenviar y modificar el cuerpo, capítulos 11–12; contrastar permitido y denegado, capítulo 15.
- **Añade:** comprobar si una regla de entrada se valida también en el servidor.
- **Acción:** enviar en un pedido ficticio un valor que el formulario limita y verificar el resultado persistido. El escenario no realiza cobros.
- **Éxito y prueba:** identificar aceptación indebida en la versión vulnerable y rechazo en la corregida, preservando una cantidad válida.
- **Comprensión y enlace:** los controles del formulario ayudan al usuario; la regla de negocio debe verificarse al recibir la petición. Un campo de descripción presenta un comportamiento distinto.

#### Capítulo 17 — ¿Texto o formato?
- **Historia:** una descripción de producto altera su aspecto al incluir caracteres de marcado.
- **Repite:** editar un dato autorizado y observar pantalla y respuesta, capítulos 04, 12 y 16.
- **Añade:** distinguir texto mostrado literalmente de HTML interpretado.
- **Acción:** usar un marcador de formato inocuo y comparar dos campos: uno que lo trata como texto y otro como marcado.
- **Éxito y prueba:** documentar el efecto y el dato recibido, sin afirmar ejecución de JavaScript.
- **Comprensión y enlace:** interpretar HTML no demuestra automáticamente XSS. Lara pide seguir el recorrido del dato antes de probar más.

#### Capítulo 18 — El camino del mensaje
- **Historia:** una página de la campaña muestra un mensaje tomado de su dirección.
- **Repite:** parámetros, inspector y diferencia entre texto y marcado, capítulos 01, 04 y 17.
- **Añade:** seguir el recorrido de un dato controlable hasta el lugar donde se inserta en la página.
- **Acción:** cambiar un marcador reconocible, observar dónde aparece y usar una vista guiada del fragmento relevante del código cliente. Explica entrada, transformación y destino.
- **Éxito y prueba:** identificar el origen y el destino reales del marcador. No se exige comprender todo el archivo ni escribir JavaScript.
- **Comprensión y enlace:** el destino elegido interpreta contenido. El siguiente caso comprobará una consecuencia concreta.

#### Capítulo 19 — Una acción que la página no esperaba
- **Historia:** Lara autoriza comprobar si el recorrido anterior puede ejecutar una acción inocua en el navegador del laboratorio.
- **Repite:** rastrear el dato y reconocer HTML, capítulos 17–18; guardar evidencia, capítulo 05.
- **Añade:** demostrar ejecución de JavaScript provocada por una entrada no confiable.
- **Acción:** construir o completar progresivamente una carga de demostración que muestre una marca local. Explica cada fragmento antes de exigir su uso.
- **Éxito y prueba:** un navegador de validación aislado reproduce la ejecución desde la entrada vulnerable. Escribir la marca manualmente en consola no resuelve el caso.
- **Comprensión y enlace:** introducir XSS basado en DOM en relación con el recorrido observado. Una reseña de producto plantea si el dato puede persistir.

#### Capítulo 20 — La reseña que permaneció
- **Historia:** Vera recibe una reseña de pruebas con contenido que se conserva al recargar.
- **Repite:** edición autorizada, marcado y demostración inocua, capítulos 12 y 17–19.
- **Añade:** comprobar si una entrada peligrosa se almacena y afecta a otra sesión de laboratorio.
- **Acción:** guardar la reseña y abrirla con un segundo usuario ficticio. El efecto se limita a la marca de demostración.
- **Éxito y prueba:** la ejecución se reproduce al cargar el contenido almacenado en la otra sesión y desaparece con la corrección adecuada.
- **Comprensión y enlace:** comparar el origen del dato en los dos tipos de XSS, sin atribuirlos al incidente histórico. El equipo amplía la revisión al buscador del catálogo.

### ACTO V — PREGUNTARLE BIEN A LOS DATOS

Se introduce lo mínimo de bases de datos para entender una consulta y una inyección. Los ejemplos usan una base de productos de laboratorio y no implican extracción de contraseñas reales.

#### Capítulo 21 — La libreta del almacén
- **Historia:** Sam necesita entender cómo el buscador selecciona productos de su inventario.
- **Repite:** consultar fichas, observar peticiones y respuestas, capítulos 01–03.
- **Añade:** leer una consulta SELECT sencilla como una selección de filas con una condición.
- **Acción:** comparar una tabla de productos ficticios con el resultado del buscador en una vista didáctica. Presenta tabla, fila, columna y condición con ejemplos pequeños.
- **Éxito y prueba:** predecir qué filas devuelve una consulta sencilla y comprobarlas en la aplicación.
- **Comprensión y enlace:** esta vista es una lección explícita, no un acceso secreto a soluciones futuras. Una búsqueda con un carácter especial se comporta de forma inesperada.

#### Capítulo 22 — Una comilla fuera de sitio
- **Historia:** el buscador falla con un nombre de producto que contiene una comilla.
- **Repite:** reenvío, modificación de entrada y lectura de errores, capítulos 11–12 y 14; consulta sencilla, capítulo 21.
- **Añade:** aislar un carácter de entrada que cambia el comportamiento de una consulta vulnerable.
- **Acción:** comparar una búsqueda normal y otra con una variación mínima, repitiendo para descartar un fallo casual.
- **Éxito y prueba:** registrar una diferencia reproducible compatible con una construcción incorrecta de la consulta.
- **Comprensión y enlace:** un error sugiere una hipótesis; todavía no demuestra acceso a datos ajenos. Lara propone contrastarla con una condición controlada.

#### Capítulo 23 — Dos preguntas, dos respuestas
- **Historia:** hay que comprobar si el buscador mezcla datos introducidos con instrucciones de consulta.
- **Repite:** selección de filas, variación mínima y evidencia, capítulos 21–22 y 05.
- **Añade:** contrastar una condición verdadera y una falsa dentro del escenario de inyección.
- **Acción:** completar una pareja de entradas explicadas que produzcan resultados distintos sobre productos ficticios. La guía enseña los operadores necesarios antes del intento.
- **Éxito y prueba:** el resultado cambia de forma consistente con la condición y el servidor confirma el recorrido vulnerable.
- **Comprensión y enlace:** distinguir un fallo demostrado de una sospecha. No se requiere enumerar otras bases ni extraer todos sus datos.

#### Capítulo 24 — Datos que vuelven a ser datos
- **Historia:** Nico sustituye la construcción de la consulta por parámetros.
- **Repite:** la pareja de pruebas del capítulo 23 y las pruebas positivas del 15.
- **Añade:** comprobar que una consulta parametrizada trata la entrada como un valor.
- **Acción:** repetir búsquedas legítimas y entradas del ejercicio anterior en ambas versiones.
- **Éxito y prueba:** las búsquedas válidas siguen funcionando y las entradas ya no alteran la lógica. Una vista didáctica explica la separación sin exigir editar el servidor.
- **Comprensión y enlace:** validar entrada y parametrizar resuelven problemas distintos. La revisión genera evidencias que deben ordenarse temporalmente.

#### Capítulo 25 — Lo sabemos, lo suponemos
- **Historia:** Mara pregunta si todos los fallos encontrados fueron utilizados durante el susto inicial.
- **Repite:** registrar pruebas, comprobar fallos y correcciones, capítulos 05, 15 y 20–24.
- **Añade:** ordenar evidencias por tiempo y separar hechos, hipótesis y preguntas abiertas.
- **Acción:** clasificar un conjunto pequeño de registros auténticos del escenario y conclusiones propuestas. Detectar una conclusión que no está respaldada.
- **Éxito y prueba:** construir una línea temporal parcial consistente, conservando explícitamente una incertidumbre.
- **Comprensión y enlace:** el buscador vulnerable es un hallazgo; no aparece evidencia de su abuso histórico. Una petición de Vera abre la revisión de recuperación de cuentas.

### ACTO VI — RECUPERAR SIN REGALAR ACCESO

La tienda dispone de un buzón ficticio de pruebas. Los mensajes nunca salen del laboratorio. Este acto distingue contraseña, sesión y autorización de recuperación.

#### Capítulo 26 — Un correo que revela demasiado
- **Historia:** Vera observa que el formulario de recuperación responde de manera diferente según la dirección introducida.
- **Repite:** modificar una entrada y comparar respuestas, capítulos 12, 14 y 22.
- **Añade:** comprobar si una respuesta revela la existencia de una cuenta.
- **Acción:** usar dos direcciones ficticias proporcionadas, una registrada y otra inexistente, manteniendo las demás condiciones.
- **Éxito y prueba:** identificar la diferencia de contenido o estado diseñada para el ejercicio. No uses diferencias temporales minúsculas ni conclusiones estadísticas sin base.
- **Comprensión y enlace:** conocer que una cuenta existe es una filtración concreta, distinta de tomar su control. Vera habilita el buzón de esa cuenta de pruebas.

#### Capítulo 27 — Un enlace con destinatario
- **Historia:** los enlaces de recuperación de dos cuentas deben cambiar únicamente la contraseña de su destinatario.
- **Repite:** identificadores, sesión y comparación entre cuentas, capítulos 01, 07–10 y 26.
- **Añade:** comprobar que un token de recuperación está vinculado a una cuenta concreta.
- **Acción:** solicitar enlaces para las dos cuentas del escenario y comprobar el vínculo entre token, destinatario y cambio autorizado. Todos los secretos son ficticios.
- **Éxito y prueba:** demostrar el defecto de vinculación previsto en la versión vulnerable y su ausencia en la corregida.
- **Comprensión y enlace:** un token es una autorización limitada, no una contraseña universal. La mentora pide comprobar cuánto dura esa autorización.

#### Capítulo 28 — Un enlace para una sola vez
- **Historia:** un enlace utilizado continúa circulando en el buzón interno.
- **Repite:** recuperar la cuenta y reenviar una petición, capítulos 27 y 11.
- **Añade:** comprobar que una autorización de recuperación deja de servir tras usarse.
- **Acción:** utilizar una vez el enlace y repetir el mismo intento con un nuevo valor ficticio, observando las respuestas.
- **Éxito y prueba:** demostrar reutilización indebida en la copia vulnerable y rechazo en la corregida, conservando el primer uso legítimo.
- **Comprensión y enlace:** invalidar tras usar y caducar con el tiempo son propiedades diferentes. El siguiente caso comprueba la segunda.

#### Capítulo 29 — El reloj del enlace
- **Historia:** una cuenta recibió un enlace hace demasiado tiempo, pero el formulario parece aceptarlo.
- **Repite:** comprobar vínculo y uso único, capítulos 27–28; comparar permitido y denegado, capítulo 15.
- **Añade:** verificar la caducidad de un token con un reloj virtual del escenario.
- **Acción:** repetir una recuperación antes y después de su plazo usando el control temporal del laboratorio. No cambies la fecha del sistema operativo ni hagas esperar minutos reales.
- **Éxito y prueba:** documentar el límite temporal y el comportamiento a ambos lados. El validador debe controlar las condiciones de frontera.
- **Comprensión y enlace:** el tiempo es una condición de autorización. Vera pregunta por las sesiones que ya estaban abiertas.

#### Capítulo 30 — La sesión que se quedó dentro
- **Historia:** una cuenta ha cambiado su contraseña tras el incidente, pero podría conservar una sesión anterior.
- **Repite:** cookies, identidad, recuperación y reenvío, capítulos 08–11 y 27–29.
- **Añade:** comprobar la revocación de sesiones previas después de una recuperación de seguridad.
- **Acción:** mantener dos sesiones de prueba, recuperar la cuenta desde una y consultar un recurso desde la anterior.
- **Éxito y prueba:** la política del caso exige revocación: la versión corregida invalida la sesión antigua y permite un nuevo acceso legítimo.
- **Comprensión y enlace:** explica que la política debe ser explícita. La revisión de accesos termina y Sam trae un problema de descuentos duplicados.

### ACTO VII — LAS REGLAS DEL NEGOCIO

Se aplican las herramientas aprendidas a precios, cupones y estados de pedidos. El caso de Mercurio distingue abuso y reintento legítimo sin atribuciones precipitadas.

#### Capítulo 31 — La letra pequeña del cupón
- **Historia:** una promoción promete un uso por cuenta y un importe mínimo. Mara quiere saber qué significa cumplirla.
- **Repite:** leer peticiones y conservar evidencias, capítulos 02–05 y 15.
- **Añade:** convertir una regla de negocio escrita en condiciones comprobables.
- **Acción:** construir una tabla pequeña con casos válidos e inválidos para un cupón de pruebas.
- **Éxito y prueba:** cada condición declarada tiene una prueba observable y el alumno evita inventar restricciones que la promoción no contiene.
- **Comprensión y enlace:** una anomalía de negocio depende de la regla acordada. El equipo está preparado para revisar quién decide el precio final.

#### Capítulo 32 — ¿Quién decide el precio?
- **Historia:** un carrito envía datos de precio junto a las cantidades, y una factura de pruebas parece incorrecta.
- **Repite:** modificar JSON, comparar estados y aplicar reglas, capítulos 12, 16 y 31.
- **Añade:** comprobar que el servidor calcula el precio a partir de sus datos autorizados.
- **Acción:** variar el precio enviado manteniendo producto y cantidad, y consultar el total persistido del pedido ficticio.
- **Éxito y prueba:** la copia vulnerable confía en el precio recibido; la corregida lo recalcula y conserva una compra normal. No hay cobros reales.
- **Comprensión y enlace:** un total cambiado solo en pantalla no demuestra fraude. Sam aporta dos usos del mismo cupón.

#### Capítulo 33 — El descuento que volvió
- **Historia:** hay pedidos con un cupón que debía utilizarse una sola vez.
- **Repite:** regla de un solo uso, reenvío y comprobación persistida, capítulos 28, 31–32 y 11.
- **Añade:** verificar que un reintento de una operación no aplica dos veces el mismo efecto.
- **Acción:** reenviar una operación ya aceptada con el mismo identificador de operación, dentro de un pedido ficticio.
- **Éxito y prueba:** medir número de aplicaciones y total real del pedido antes y después. La corrección conserva un único efecto pese al reintento.
- **Comprensión y enlace:** introducir idempotencia con un ejemplo sencillo. Un registro identifica el reintento legítimo de Mercurio, sin demostrar intención maliciosa.

#### Capítulo 34 — Un pedido que saltó un paso
- **Historia:** un pedido aparece enviado sin haber completado las comprobaciones necesarias.
- **Repite:** editar peticiones, comprobar permisos y aplicar reglas, capítulos 10–15 y 31.
- **Añade:** verificar que una transición entre estados de un pedido está permitida.
- **Acción:** representar los estados del pedido y probar una transición válida y otra que salta una condición necesaria.
- **Éxito y prueba:** la versión vulnerable acepta el salto y la corregida lo rechaza en el servidor, aunque el cliente envíe el estado deseado.
- **Comprensión y enlace:** el botón visible no define por sí solo las transiciones válidas. Almacén pregunta qué sucede con la última unidad disponible.

#### Capítulo 35 — La última botella
- **Historia:** dos reservas ficticias se hicieron casi al mismo tiempo sobre una única unidad.
- **Repite:** operaciones, condiciones y estado persistido, capítulos 11, 31 y 34.
- **Añade:** comparar solicitudes secuenciales y dos solicitudes concurrentes.
- **Acción:** usar un lanzador didáctico limitado a dos peticiones al propio escenario. Visualiza el orden de lectura, comprobación y actualización.
- **Éxito y prueba:** reproducir la sobreventa en condiciones controladas y demostrar que una corrección transaccional acepta una sola reserva.
- **Comprensión y enlace:** explicar condición de carrera sin exigir generar carga masiva. Un albarán de las reservas abre la revisión de archivos.

### ACTO VIII — ARCHIVOS QUE NO DEBÍAN SALIR

Los archivos pertenecen a un almacén ficticio aislado. Los ejercicios conservan el comportamiento real de rutas y respuestas dentro de ese recinto.

#### Capítulo 36 — Seguir la ruta del albarán
- **Historia:** Sam envía un enlace de descarga que apunta al albarán equivocado.
- **Repite:** parámetros, Red y propiedad de los pedidos, capítulos 01–03 y 10.
- **Añade:** distinguir un identificador de negocio de una ruta de archivo utilizada por un servicio.
- **Acción:** observar la descarga y reconocer sus partes con un pequeño árbol de carpetas ficticias. Verificar también quién debería poder descargar el documento.
- **Éxito y prueba:** identificar el documento y la comprobación de acceso necesaria. Encontrar una ruta no implica que pueda atravesarse.
- **Comprensión y enlace:** un parámetro de archivo merece reglas diferentes de un número de producto. Lara propone comprobar el límite de la carpeta.

#### Capítulo 37 — Fuera de la carpeta
- **Historia:** el servicio de documentos podría permitir salir de la carpeta pública del almacén.
- **Repite:** observar y modificar rutas, capítulo 36; comparar permitido y denegado, capítulo 15.
- **Añade:** comprobar la normalización de rutas y el límite de un directorio autorizado.
- **Acción:** construir una ruta relativa dentro del almacén ficticio y acceder a un documento de pruebas que queda fuera de la carpeta permitida.
- **Éxito y prueba:** el acceso cruza ese límite en la versión vulnerable y queda bloqueado en la corregida. Nunca se permite alcanzar archivos reales del contenedor o anfitrión.
- **Comprensión y enlace:** el fallo es de recorrido de rutas; eliminar una secuencia concreta no demuestra una solución completa. Aparece una función de subida de etiquetas.

#### Capítulo 38 — El nombre no demuestra el contenido
- **Historia:** los proveedores suben etiquetas y el formulario decide qué acepta por el nombre del archivo.
- **Repite:** controles de cliente y petición modificable, capítulos 16 y 11–12.
- **Añade:** contrastar extensión, tipo declarado y contenido de un archivo inocuo.
- **Acción:** usar archivos de demostración proporcionados con combinaciones conocidas de nombre y contenido, sin ejecutables ni malware.
- **Éxito y prueba:** demostrar qué criterio aplica realmente el servidor y que la versión corregida valida el formato previsto con límites de tamaño y almacenamiento.
- **Comprensión y enlace:** ningún indicador aislado garantiza que un archivo sea adecuado. La revisión continúa con la forma de servirlo al navegador.

#### Capítulo 39 — Descargar o interpretar
- **Historia:** una etiqueta de demostración se abre en el navegador cuando debería descargarse como archivo.
- **Repite:** HTML y texto, archivos y respuestas, capítulos 17, 36 y 38.
- **Añade:** interpretar las cabeceras de tipo de contenido y disposición de una descarga.
- **Acción:** comparar dos respuestas para el mismo contenido inocuo y observar cómo cambia el tratamiento del navegador.
- **Éxito y prueba:** vincular las cabeceras y el contexto de origen con el comportamiento concreto. No atribuyas a una única cabecera la solución de todos los problemas de archivos.
- **Comprensión y enlace:** almacenar y servir son fases distintas. Una referencia en los documentos apunta a una exportación antigua.

#### Capítulo 40 — La caja de exportaciones
- **Historia:** una carpeta de exportaciones contiene datos ficticios que no deben ser públicos y un recurso conserva una referencia a ella.
- **Repite:** búsqueda en recursos, permisos y descargas, capítulos 06, 10 y 36–39.
- **Añade:** verificar que un recurso interno no se distribuye en la publicación pública.
- **Acción:** localizar una exportación concreta siguiendo la referencia del caso y comprobar su acceso sin permisos; después verificar la configuración corregida.
- **Éxito y prueba:** el alumno conserva la mínima muestra necesaria del acceso indebido. La versión corregida restringe el recurso y mantiene una descarga autorizada cuando corresponde.
- **Comprensión y enlace:** ocultar el enlace no protege el archivo. Una referencia de integración conecta la exportación con servicios internos de Mercurio.

### ACTO IX — EN QUIÉN CONFÍA CADA COMPONENTE

Se amplía el modelo a varios orígenes y servicios, siempre ficticios y aislados. Enseña primero qué lado hace la petición y qué lado decide.

#### Capítulo 41 — Dos ventanas, dos orígenes
- **Historia:** la tienda y su panel de proveedores usan direcciones distintas del laboratorio.
- **Repite:** peticiones, cookies y respuestas, capítulos 02–03 y 08.
- **Añade:** reconocer un origen como combinación de esquema, nombre y puerto y comprobar una política CORS concreta.
- **Acción:** comparar una lectura entre dos orígenes de laboratorio con configuraciones permitida y denegada.
- **Éxito y prueba:** observar si el navegador permite leer la respuesta. Distinguir enviar una petición de poder leerla y no presentar CORS como sustituto de autorización.
- **Comprensión y enlace:** el navegador aplica ciertas restricciones; el servidor sigue necesitando permisos. Vera aporta una página externa ficticia del aula.

#### Capítulo 42 — Una acción desde otra página
- **Historia:** la página del aula puede provocar una operación en la tienda mientras una cuenta de pruebas tiene sesión abierta.
- **Repite:** cookies, método, permisos y origen, capítulos 08, 11–15 y 41.
- **Añade:** verificar la autenticidad de una operación iniciada desde otro origen en un escenario CSRF.
- **Acción:** utilizar un formulario local preparado con una acción inocua sobre la cuenta de pruebas. Elige una topología local compatible con el comportamiento de cookies del navegador y documéntala.
- **Éxito y prueba:** reproducir la operación indebida en la configuración vulnerable y su bloqueo en la corregida, conservando la operación iniciada legítimamente en la tienda.
- **Comprensión y enlace:** explica token, cookies y verificación de origen según lo implementado. No inventes un éxito si el navegador impide el envío.

#### Capítulo 43 — La tienda visita por ti
- **Historia:** la función de previsualizar imágenes de proveedores hace que el servidor consulte una dirección recibida del usuario.
- **Repite:** modificar una entrada y leer respuestas, capítulos 12 y 03; distinguir componentes, capítulo 41.
- **Añade:** comprobar desde qué componente se realiza una petición y qué servicios puede alcanzar.
- **Acción:** dirigir la previsualización a un servicio ficticio de intranet permitido únicamente dentro de la red del ejercicio.
- **Éxito y prueba:** los registros muestran una petición real del servidor al servicio de laboratorio y una respuesta interna expuesta. La corrección impide ese destino y conserva una imagen autorizada.
- **Comprensión y enlace:** introducir SSRF tras observar el flujo. El entorno bloquea destinos externos, metadatos de nube reales y el anfitrión.

#### Capítulo 44 — Un destino con dos lecturas
- **Historia:** un enlace de seguimiento acepta una dirección de retorno que parece de la tienda, pero se interpreta de otra manera.
- **Repite:** partes de la dirección, reenvío y orígenes, capítulos 01, 11 y 41.
- **Añade:** comprobar el destino efectivo de una URL frente a una regla de confianza.
- **Acción:** comparar direcciones de laboratorio parecidas y observar su destino final. La guía enseña antes las partes necesarias de la URL.
- **Éxito y prueba:** demostrar una redirección a un origen local no autorizado por una validación incorrecta y su rechazo tras analizar la URL correctamente.
- **Comprensión y enlace:** ver una palabra confiable dentro de una dirección no determina su origen. El enlace pertenece a las notificaciones de Mercurio.

#### Capítulo 45 — El mensaje sin firma
- **Historia:** una notificación logística hizo avanzar un pedido; hay que saber si provenía realmente del proveedor.
- **Repite:** cuerpo de petición, transiciones de estado y pruebas positivas y negativas, capítulos 12, 15 y 34.
- **Añade:** comprobar autenticidad e integridad de un mensaje firmado por el servicio ficticio.
- **Acción:** comparar un mensaje legítimo, uno modificado y otro sin firma. Explica la finalidad de una firma de mensaje sin exigir implementar criptografía.
- **Éxito y prueba:** la versión vulnerable acepta un mensaje no autenticado; la corregida verifica correctamente la firma y conserva el flujo legítimo.
- **Comprensión y enlace:** autenticidad no resuelve por sí sola repeticiones; relaciona ese límite con el capítulo 33. Los registros de este caso abren la investigación final.

### ACTO X — CERRAR UN CASO CON PRUEBAS

La dificultad final consiste en elegir, conectar, corregir y explicar. No introduzcas una vulnerabilidad nueva que requiera conocimientos no enseñados.

#### Capítulo 46 — El hilo entre las peticiones
- **Historia:** Lara entrega registros de accesos, perfiles, pedidos y Mercurio con eventos que se solapan.
- **Repite:** línea temporal, identidad y evidencias mínimas, capítulos 25, 07–10 y 45.
- **Añade:** correlacionar eventos con identificadores de petición, sesión y operación, reconociendo sus límites.
- **Acción:** filtrar un conjunto manejable y enlazar los registros de la misma operación sin identificar personas solo por una IP.
- **Éxito y prueba:** reconstruir al menos una secuencia correcta y excluir una coincidencia temporal engañosa.
- **Comprensión y enlace:** conservar procedencia y reloj de cada evidencia. Se desbloquea una copia histórica aislada para reproducir la cadena inicial.

#### Capítulo 47 — Cómo pudo encadenarse
- **Historia:** el equipo necesita demostrar un recorrido completo desde la promoción antigua hasta el acceso indebido de la cuenta de pruebas.
- **Repite:** credenciales expuestas, sesión, asignación masiva, pedidos y exportaciones, capítulos 06–13 y 40; correlación, capítulo 46.
- **Añade:** construir y verificar un recorrido de ataque con sus dependencias y posibles ramas.
- **Acción:** trabajar en una copia histórica etiquetada, conservando las correcciones del mundo principal. Reproducir las credenciales expuestas y la sesión resultante; comprobar la rama de pedidos ajenos y la de ampliación de permisos seguida de acceso a la exportación. Registrar los límites de lo demostrado.
- **Éxito y prueba:** todos los eslabones tienen evidencia y las dependencias declaradas son reales. No afirmes que ampliar permisos era necesario para un IDOR que ya podía aprovechar cualquier cliente. La reproducción muestra posibilidad técnica; los registros históricos determinan el uso demostrado.
- **Comprensión y enlace:** la cadena se detiene en los datos ficticios previstos. Mara necesita decidir qué corregir primero.

#### Capítulo 48 — Qué arreglamos primero
- **Historia:** la tienda tiene recursos limitados y necesita un orden de trabajo que reduzca el riesgo sin romper las ventas.
- **Repite:** impactos demostrados, cadenas, reglas y correcciones, capítulos 15, 25, 31 y 47.
- **Añade:** priorizar una corrección justificando impacto, condiciones de explotación y efecto sobre la cadena.
- **Acción:** ordenar un pequeño conjunto de medidas, distinguir contención temporal y corrección de raíz y explicar una dependencia.
- **Éxito y prueba:** se acepta más de un orden razonable si cumple restricciones y la justificación está respaldada. No exijas adivinar una única lista editorial.
- **Comprensión y enlace:** aplica las medidas elegidas a la copia de revisión y prepara su comprobación conjunta.

#### Capítulo 49 — Que no vuelva con la próxima oferta
- **Historia:** Nico teme que una promoción futura reintroduzca los fallos ya corregidos.
- **Repite:** pruebas positivas y negativas, reglas y reproducción de casos, capítulos 15, 24, 31–35 y 47–48.
- **Añade:** convertir pruebas manuales conocidas en una comprobación de regresión repetible.
- **Acción:** usar un constructor sencillo de casos: identidad, acción, resultado esperado y dato que debe permanecer protegido. Genera una suite ejecutable del proyecto, sin exigir al alumno programarla desde cero.
- **Éxito y prueba:** la suite detecta una regresión sembrada en una copia aislada y pasa sobre la versión corregida manteniendo los usos legítimos.
- **Comprensión y enlace:** una suite cubre los casos definidos, no demuestra ausencia de cualquier fallo. Sus resultados acompañan al informe final.

#### Capítulo 50 — La reapertura
- **Historia:** Mara prepara la nueva campaña de ventas y pide una revisión final y una explicación comprensible de lo ocurrido.
- **Repite:** observación, sesión, autorización, datos, reglas, evidencias y regresión mediante un caso nuevo construido únicamente con habilidades enseñadas.
- **Añade:** comunicar una conclusión final con alcance, evidencias, correcciones verificadas y riesgo pendiente.
- **Acción:** resolver una investigación final con identificadores y productos nuevos, ejecutar las comprobaciones pertinentes y completar un informe breve para Mara y otro técnico para Nico.
- **Éxito y prueba:** los datos privados ficticios quedan protegidos, los flujos legítimos funcionan y las conclusiones distinguen incidente probado, hallazgos de revisión y límites de la evidencia.
- **Comprensión y epílogo:** Lara reconoce la autonomía adquirida. Mara reabre la tienda con medidas comprobadas. Se conserva una lista honesta de cuestiones pendientes y el jugador puede volver a cualquier copia de práctica sin alterar el cierre de la campaña.

## 9. Coherencia entre capítulos y evolución del mundo

Mantén tres registros separados:

- **Habilidades aprendidas:** qué acciones puede resolver el alumno y con qué ayuda.
- **Conocimiento narrativo:** qué sabe el personaje en ese punto y qué sigue siendo una hipótesis.
- **Estado de la tienda:** qué fallos se han verificado y qué correcciones se han aplicado.

Un personaje no puede usar información que el jugador todavía no ha descubierto. Un objeto del cuaderno debe indicar su origen y los casos en los que se utiliza.

Una corrección aplicada permanece en la continuidad principal. Para volver a practicar un fallo, crea una copia de práctica identificada como tal. Los capítulos 47 y 49 utilizan copias históricas o de regresión expresamente etiquetadas. No reviertas silenciosamente el mundo ni finjas que el equipo ha olvidado su trabajo.

Para los actos posteriores, los fallos nuevos pueden existir en otro flujo o componente: corregir la lectura de pedidos no implica haber corregido automáticamente exportaciones, subida de archivos o recepción de eventos. Documenta qué control se corrige en qué ruta.

Cada objeto de enlace debe tener utilidad concreta. Una referencia de campaña permite encontrar una página; unas credenciales autorizadas permiten comprobar una cuenta; un identificador de operación permite correlacionar registros. Evita llaves arbitrarias que solo abren un capítulo porque el diseñador lo dice.

Las decisiones del jugador pueden cambiar el tono de una respuesta o el orden de revisión de medidas equivalentes. No implementes ramas que exijan producir decenas de historias adicionales para completar la campaña principal. El desenlace factual se sostiene en las evidencias.

## 10. Dificultad y autonomía

Divide la campaña en estos niveles de apoyo, sin bloquear la ayuda a quien la necesite:

| Capítulos | Apoyo por defecto | Lo que se espera |
|---|---|---|
| 01–05 | Un paso cada vez y vocabulario explicado al aparecer. | Observar, cambiar un dato y describir el resultado. |
| 06–10 | Recordatorios visibles y herramientas concretas. | Repetir acciones y contrastar identidades. |
| 11–20 | Objetivo, entorno preparado y pistas opcionales. | Reproducir peticiones y distinguir dato, pantalla y ejecución. |
| 21–30 | Demostración de conceptos nuevos y práctica guiada disponible. | Probar hipótesis y condiciones de autorización. |
| 31–40 | Casos con varias condiciones y evidencias incompletas pero suficientes. | Comprobar reglas, archivos y límites. |
| 41–45 | Diagramas de flujo y ayuda para distinguir componentes. | Razonar sobre orígenes, servicios y confianza. |
| 46–50 | Objetivos abiertos con criterios explícitos de evidencia. | Elegir pruebas, conectar hechos y comunicar límites. |

No uses el número de intentos o la rapidez como prueba de comprensión. No penalices copiar una parte de una carga después de explicarla. La evaluación mide el resultado y la explicación, no velocidad de escritura.

Los tiempos se presentan como orientativos y se calibran con pruebas de uso. No anuncies una duración total exacta sin haberla medido. El alumno puede pausar cualquier capítulo y volver a su punto de recuperación.

## 11. Buzón, pistas y cuaderno

### Buzón de casos

Es una bandeja interna del juego, sin conexión a correo real. Debe permitir abrir el encargo, releer mensajes anteriores y ver adjuntos ficticios. Los mensajes se desbloquean por eventos de campaña verificables.

Separa los mensajes del relato de los avisos de funcionamiento del laboratorio. Un error de conexión no debe aparecer como una acusación del personaje o una pista falsa.

Ejemplo de correo inicial, que debes adaptar y mantener coherente:

> **De:** Lara, revisión de seguridad  
> **Asunto:** Antes de mirar pedidos, vamos a conocer la tienda
>
> Hola. Mara nos ha pasado la captura de Alba, la clienta que vio un pedido ajeno. Lo investigaremos, pero primero necesito que sepas cómo pide información esta web. Estamos en una copia de pruebas: puedes explorar sin modificar pedidos reales. Sam tiene un problema pequeño para empezar. El enlace que utiliza para enseñar el zumo de pera abre otro producto. Vamos a mirar la dirección, localizar el número que identifica el producto y comprobar qué cambia al modificarlo. Al terminar quiero que puedas contarme qué pediste y qué respondió la tienda. Si una herramienta no funciona, abre el diagnóstico; eso es un problema del laboratorio y lo revisaremos por separado.

### Pistas progresivas

Cada pista conserva la pregunta que el alumno debe resolver:

1. **Concepto:** qué conviene pensar o comparar.
2. **Zona:** dónde está la información pertinente.
3. **Acción:** qué prueba pequeña realizar.
4. **Guía explícita:** secuencia completa explicada, disponible por elección.

La solución final y los nombres internos de validación no deben filtrarse en los mensajes iniciales, atributos visibles ni respuestas de configuración del modo alumno.

### Cuaderno de investigación

Debe incluir:

- Evidencias con capítulo, fecha virtual, identidad de prueba y recurso.
- Campo «Esperaba…» y campo «He observado…».
- Hechos confirmados, hipótesis y preguntas pendientes.
- Objetos narrativos y relaciones entre ellos.
- Habilidades presentadas, practicadas y aplicadas de forma independiente.
- Glosario contextual con ejemplos ya vistos.
- Copia de los resultados de pruebas de corrección.
- Exportación y recuperación del progreso y las notas.

Oculta por defecto los valores de credenciales ficticias ya descubiertas y permite mostrarlos para retomar un ejercicio. No introduzcas credenciales reales en el cuaderno ni en registros de diagnóstico.

## 12. Interfaz y accesibilidad

Diseña tres espacios claros:

1. **La tienda:** catálogo, productos, cuentas, pedidos, reseñas, promociones y documentos.
2. **El escritorio del aprendiz:** buzón, capítulo actual, cuaderno, glosario y progreso.
3. **La mesa de revisión:** herramientas didácticas y comparación entre estado vulnerable y corregido, cuando el capítulo las desbloquee.

El estilo debe parecer una tienda pequeña con un escritorio de investigación. Usa una identidad cálida, etiquetas de envíos, notas de almacén y estados de pedidos como motivos visuales. Evita una pantalla llena de código verde, alarmas permanentes y decoraciones que dificulten leer.

Requisitos concretos:

- Texto legible y tamaño ajustable; contraste suficiente.
- Navegación por teclado, foco visible y etiquetas accesibles.
- Estados expresados con texto además de color.
- Animaciones discretas y respeto a movimiento reducido.
- Ayuda visible sin tapar la acción que se debe realizar.
- Mensajes de error que indican qué ocurrió y qué puede hacerse.
- Diseño adaptable para leer y consultar notas en pantallas pequeñas. Los ejercicios con herramientas de desarrollo requieren un navegador de escritorio; indícalo con claridad.
- Barra de progreso basada en capítulos realmente completados y habilidades verificadas.
- Distinción visible entre «observado», «demostrado», «comprendido» y «corrección verificada».

No muestres avisos de éxito al restaurar una partida como si el jugador hubiera resuelto otra vez los retos. Usa un único mensaje de recuperación del progreso.

## 13. Modo alumno y modo profesor

El modo alumno recibe solo el contenido desbloqueado y las pistas solicitadas. El servidor debe filtrar los datos; ocultar las soluciones con CSS no es suficiente.

El modo profesor contiene la solución, el comportamiento vulnerable, la corrección, el método de validación y errores frecuentes. Su acceso es explícito y no se utiliza como atajo accidental en la campaña.

El propietario del equipo puede inspeccionar archivos y modificar el laboratorio. No afirmes que puedes impedirlo de forma absoluta. El objetivo es preservar el aprendizaje normal y evitar filtraciones involuntarias, no crear un sistema de vigilancia o un mecanismo antitrampas invasivo.

No abras el código del validador al enseñar JavaScript cliente. Los recursos públicos que se inspeccionan en un reto se preparan para ese objetivo y no incluyen soluciones completas de capítulos futuros.

## 14. Arquitectura y organización del proyecto

Si existe un repositorio previo, inspecciona sus instrucciones y conserva las decisiones útiles. Si se parte de cero, usa como propuesta inicial:

- Interfaz con React y TypeScript, construida con Vite.
- Servicios con Node.js, TypeScript y Express.
- SQLite para los datos ficticios y una base separada para el progreso.
- Docker Compose para una instalación reproducible.
- Pruebas de navegador con Playwright y pruebas de integración de los servicios.

Verifica las versiones compatibles de las dependencias cuando implementes; no inventes versiones actuales. Evita añadir infraestructura o servicios de pago sin una necesidad demostrada.

Separa responsabilidades en módulos equivalentes a:

```text
apps/
  classroom/               # Buzón, progreso, ayuda y cuaderno.
  storefront/              # Interfaz de la tienda ficticia.
services/
  classroom-api/           # Campaña, persistencia y acceso a pistas.
  store-api/               # Comportamientos de negocio del laboratorio.
  scenario-runner/         # Preparación, reloj virtual y evaluación.
  mock-intranet/           # Servicios ficticios para casos internos.
content/
  es/
    campaign/              # Biblia narrativa y cronología.
    chapters/              # Un módulo o carpeta por capítulo.
    glossary/              # Vocabulario y ejemplos.
    instructor/            # Soluciones, excluidas del modo alumno.
scenarios/
  chapter-01/              # Datos, condiciones y comprobaciones.
  ...
  chapter-50/
tests/
  learning-flows/
  scenario-validation/
  reset-and-recovery/
docs/
```

Adapta la estructura cuando sea necesario, explicando el motivo. No concentres las 50 misiones en un componente enorme ni mezcles diálogos con lógica de validación.

Usa identificadores estables para capítulos, habilidades, evidencias, personajes, pistas y eventos. Los textos deben poder editarse sin tocar la lógica del servidor.

El escritorio de aprendizaje y su persistencia no deben compartir tablas ni privilegios con las rutas vulnerables de la tienda. Las vulnerabilidades pertenecen a escenarios delimitados. Los servicios internos no publican puertos innecesarios.

Los orígenes de tienda, escritorio y páginas auxiliares deben estar definidos explícitamente. Aísla las cookies del escritorio de los escenarios vulnerables mediante nombres, hosts y configuración adecuados, no solo mediante puertos: las cookies no se aíslan por puerto.

Para los capítulos de varios orígenes, documenta y prueba la topología real y el comportamiento de cookies. El objetivo es que los ejercicios funcionen en el navegador admitido, sin requerir desactivar sus protecciones globales.

Incluye una configuración central de direcciones y puertos. El inicio debe indicar cuáles abrir desde Kali y distinguirlas de las direcciones del anfitrión si se ejecuta dentro de una máquina virtual. Evita depender de nombres de dominio que el usuario no haya configurado. Si un nombre es necesario, compruébalo y explica su configuración.

## 15. Definición de capítulos y validación

Define contratos tipados para Chapter, Skill, Evidence, Scenario, Hint y ValidationResult, o equivalentes. Un capítulo debe declarar al menos:

```text
id
act
title
prerequisites
reusedSkills
newSkill
narrativeEntry
learningObjective
scenarioVersion
fixtures
allowedAccounts
predictionQuestion
guidedSteps
hints[4]
evidenceRequirements
successValidator
falsePositiveChecks
debrief
understandingCheck
patchVerification
nextNarrativeArtifact
checkpointPolicy
```

No declares una interfaz para simular que el contenido está completo: cada capítulo implementado necesita sus datos, comportamiento y pruebas reales.

### Validación técnica

- Abrir una página, leer una pista o pulsar «completar» no resuelve por sí solo un caso técnico.
- Verifica estado del servidor, identidad, objeto y efecto observado según corresponda.
- Un cambio en pantalla no equivale a un cambio persistido.
- Recibir un error no equivale a demostrar inyección.
- Interpretar HTML no equivale a ejecutar JavaScript.
- Un archivo accesible demuestra el acceso concreto; no autoriza afirmar que se extrajo toda la base.
- En casos de navegador, combina evidencia del servidor con reproducción en un navegador aislado cuando haga falta comprobar ejecución o restricciones del origen.
- Las evaluaciones no pueden solicitar direcciones arbitrarias externas ni utilizar el navegador del evaluador para alcanzar servicios ajenos al laboratorio.
- Los validadores deben diferenciar sesiones y escenarios y evitar acreditar peticiones antiguas como éxitos nuevos.
- Una petición genérica del cliente que diga «reto resuelto» no es un validador.

Algunas acciones, como abrir una pestaña concreta de las herramientas de desarrollo del navegador, no se pueden observar de forma fiable desde la propia web. No finjas detectarlas. Comprueba un dato que el alumno deba localizar allí y contrástalo con la petición real, explicando que se evalúa la observación resultante.

En decisiones abiertas, como priorización y redacción, usa criterios explícitos y respuestas estructuradas cuando sea necesario. Permite varias conclusiones defendibles. No anuncies evaluación semántica inteligente si no has implementado un mecanismo real; no se necesita una API de IA para la primera versión.

### Estados de un capítulo

Usa estados claros: bloqueado, disponible, en curso, comportamiento demostrado, comprensión comprobada y completado. Un capítulo se completa cuando se cumplen sus criterios técnicos y didácticos. Para una lección sin vulnerabilidad, el criterio técnico puede ser localizar y comparar datos correctos.

La ayuda recibida se puede registrar para orientar el repaso, sin humillar al alumno ni reducir su avance.

## 16. Persistencia, reinicio y recuperación

El progreso se guarda en un volumen o almacenamiento persistente independiente del estado reiniciable de la tienda. Las cookies de sesión no constituyen la única copia de la campaña.

Implementa tres acciones diferentes y explica su alcance antes de ejecutarlas:

1. **Reintentar este escenario:** restaura sus datos de prueba; conserva capítulos, habilidades y notas.
2. **Crear una campaña nueva:** crea otro identificador y conserva la anterior como archivo recuperable.
3. **Restablecer esta campaña:** reinicia su avance con confirmación explícita, ofrece exportación previa y conserva una copia recuperable según una política documentada.

No realices borrados permanentes como parte de una comprobación rutinaria. No borres otras aplicaciones o contenedores para preparar este laboratorio.

Reiniciar los servicios conserva el progreso. Si se crean datos de escenario nuevos, el sistema reconcilia el checkpoint sin volver a conceder logros. No restaura una campaña reseteada desde una cookie antigua.

Versiona las exportaciones de progreso. Valida su estructura, su campaña y su compatibilidad antes de importar. Una importación recupera logros como datos históricos y no emite 50 notificaciones de retos recién superados.

Si falta un objeto narrativo necesario, recupéralo desde el checkpoint del caso que lo generó, sin regalar la solución de casos posteriores ni dejar al alumno bloqueado. El cuaderno nunca debe depender de recordar una contraseña copiada hace veinte capítulos.

Los cambios de reloj de los capítulos temporales pertenecen al escenario y no afectan al sistema operativo, al progreso de campaña ni a otros capítulos.

## 17. Diagnóstico del laboratorio

Antes de iniciar un capítulo, comprueba únicamente lo que necesita:

- Servicios y dependencias disponibles.
- Versión y datos del escenario correctos.
- Cuenta y sesión coherentes con el ejercicio.
- Direcciones, puerto y red interna accesibles.
- Motor de validación operativo.
- Ausencia de otro escenario incompatible ejecutándose sobre los mismos datos.

Presenta resultados comprensibles: «La tienda no responde», «La cuenta de pruebas no se ha preparado» o «El escenario utiliza datos de una versión anterior».

La autorreparación puede restaurar el escenario después de informar de qué hará y sin borrar el progreso. Conserva un diagnóstico técnico exportable, limitado a datos ficticios y sin secretos reales.

Si el alumno usa un proxy de pruebas, distingue fallo del proxy, error de resolución, redirección, sesión incorrecta y servicio caído. No atribuyas automáticamente cualquier problema al navegador.

El botón «Necesito ayuda: la herramienta no funciona» no consume pistas educativas. Muestra la diferencia entre un obstáculo técnico y una prueba que no confirma la hipótesis.

## 18. Pruebas y criterios de aceptación

Para cada capítulo implementado verifica:

1. El estado inicial se reproduce desde cero.
2. Los prerrequisitos apuntan solo a capítulos anteriores y a habilidades realmente enseñadas.
3. La acción necesaria produce el resultado previsto.
4. Un intento incorrecto razonable no concede el logro.
5. La evidencia identifica el recurso y la cuenta correctos.
6. Las pistas no resuelven inadvertidamente otro capítulo.
7. La corrección bloquea la conducta indebida y mantiene el uso legítimo cuando aplica.
8. Reintentar restaura los datos adecuados y conserva el avance.
9. Restaurar una partida no genera nuevos logros ni pierde notas.
10. Los mensajes, objetos y tiempos concuerdan con la historia.

Añade pruebas globales que verifiquen:

- Hay exactamente 50 capítulos, sin duplicados ni huecos.
- Los diez actos contienen cinco capítulos cada uno.
- El grafo de dependencias no tiene ciclos ni referencias inexistentes.
- Cada microhabilidad declarada tiene una introducción y un uso observable.
- Las habilidades fundamentales reaparecen con significado.
- El modo alumno no recibe soluciones del modo profesor.
- La tienda vulnerable no puede modificar directamente la base de progreso.
- El restablecimiento y la importación no resucitan campañas antiguas por accidente.
- Los servicios no quedan publicados en interfaces de red no previstas.
- Las solicitudes internas, archivos y evaluadores respetan el recinto del laboratorio.
- Los controles de acceso por teclado y el foco de diálogos funcionan.

Para evaluar enseñanza, realiza recorridos con un perfil de principiante: ¿la instrucción dice dónde mirar?, ¿se ha explicado el término?, ¿hay una pista suficiente?, ¿se entiende qué demuestra el resultado? Una simulación del desarrollador no sustituye una prueba con una persona principiante; distingue ambas en el informe.

Registra pruebas ejecutadas, resultado y limitaciones. No uses «verificado» para contenido revisado solo de forma conceptual.

## 19. Forma de trabajar y entregas

Mantén un registro durable del estado del proyecto y avanza por etapas coherentes. Resuelve decisiones reversibles dentro de esta especificación sin pedir confirmación por cada detalle. Consulta solo contradicciones o decisiones que cambien de forma importante el alcance, coste, acceso o experiencia acordada.

### Etapa 1 — Diseño completo y comprobado

Entrega primero:

- Biblia narrativa, personajes y cronología canónica.
- Ficha pedagógica y narrativa de los 50 capítulos, con las cuatro pistas y cierres previstos.
- Mapa de habilidades y dependencias.
- Registro de evidencias y objetos narrativos: origen, uso y recuperación.
- Plano de pantallas y recorrido inicial.
- Arquitectura, límites de aislamiento y plan de validación.
- Plan de implementación por actos con criterios de finalización.

Revisa que la historia y la progresión sean coherentes antes de extender el código. Corrige contradicciones detectadas y deja las decisiones documentadas.

### Etapa 2 — Primera experiencia completa, capítulos 01–05

Implementa una sección vertical real: inicio, buzón, tienda, escenarios, cuaderno, pistas, validación, guardado, reinicio y cierre del acto. Comprueba el recorrido en el navegador. Debe enseñar algo a una persona que nunca ha usado las herramientas de desarrollo.

### Etapa 3 — Ampliación por actos

Implementa 06–10, después 11–15 y así sucesivamente hasta 46–50, conservando los contratos y las pruebas. Valida cada acto y la transición desde el anterior antes de marcarlo terminado.

Todos los 50 capítulos forman parte del objetivo final. Una primera entrega de cinco capítulos es un avance de implementación; no la presentes como cumplimiento de la campaña completa.

### Etapa 4 — Revisión integral

Revisa continuidad narrativa, autonomía progresiva, consistencia de términos, recuperación, aislamiento y experiencia desde una campaña vacía. Corrige los problemas encontrados y diferencia lo probado de lo pendiente.

No intentes aparentar una campaña terminada creando 50 tarjetas con páginas vacías. Distingue siempre estos estados de implementación: diseñado, contenido escrito, escenario funcional, validador probado y recorrido completo verificado.

Al terminar cada etapa, informa de qué funciona, cómo se ha comprobado, qué falta y cuál es el siguiente trabajo concreto. Si el entorno obliga a detener una ejecución, guarda el estado de forma que otro turno pueda continuar sin inventar lo realizado.

## 20. Entregables finales del proyecto

- Código fuente modular y textos editables.
- Campaña de 50 capítulos funcionales con diez actos.
- Instalación local reproducible y documentación en español.
- Configuración de direcciones y puertos y explicación para una instalación en Kali.
- Modo alumno y documentación del modo profesor.
- Guardado persistente, exportación, recuperación y reinicios diferenciados.
- Glosario y cuaderno de investigación.
- Pruebas automatizadas pertinentes y resultados de validación.
- Inventario de vulnerabilidades deliberadas y alcance de cada una, separado del contenido del alumno.
- Explicación de aislamiento, limitaciones conocidas y tareas pendientes.
- Un recorrido inicial que una persona principiante pueda completar siguiendo la propia aplicación.

## 21. Errores de diseño que debes evitar

- Introducir una herramienta sin enseñar a abrirla y localizar lo relevante.
- Repetir una secuencia que ya no aporta información al caso.
- Colocar una contraseña en un sitio arbitrario solo para conectar dos ejercicios.
- Acusar a un personaje porque escribió código vulnerable.
- Presentar un error HTTP o una versión de biblioteca como prueba suficiente de una vulnerabilidad.
- Confundir autenticación, autorización, política del navegador y lógica de negocio.
- Requerir comandos o programación que el currículo no ha enseñado.
- Pedir al alumno reconstruir pistas perdidas que el juego debería conservar.
- Abrir la interfaz de administración de la campaña como parte de un reto vulnerable.
- Volver vulnerable la tienda principal en secreto para reutilizar un ejercicio.
- Medir habilidad por tiempo, intentos o cantidad de pistas.
- Declarar resuelto un ejercicio porque el alumno pulsó un botón.
- Afirmar que un flujo funciona sin haberlo recorrido y observado.
- Terminar el relato con una atribución o un alcance de exposición que las pruebas no respaldan.

## 22. Primera respuesta que espero al recibir este prompt

Confirma brevemente que has entendido el juego y empieza la Etapa 1 con trabajo concreto. Formula preguntas solo si falta una decisión que realmente impide avanzar; para el resto utiliza los criterios de este documento y deja los supuestos claros.

No reduzcas el proyecto a una lista genérica de vulnerabilidades. Mantén el hilo de Última Gota, el aprendizaje acumulativo, las pruebas reproducibles y la honestidad sobre lo que está implementado.

**La meta final es que el alumno pueda decir: «Entiendo qué estoy probando, puedo demostrar lo que ocurre y sé comprobar una corrección», mientras completa una historia que conserva el sentido desde el primer enlace de producto hasta el cierre del incidente.**