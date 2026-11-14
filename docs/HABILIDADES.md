# Habilidades, dependencias y recuperación

Cada fila es una microhabilidad introducida una vez. Las dependencias de desbloqueo incluyen el capítulo anterior y las habilidades usadas. El avance es secuencial, pero el 50 combina familias de habilidades sin obligar a repetir 49 ejercicios.

I = introducción; P = recuperación guiada cercana; A = aplicación en otro contexto posterior. La ayuda siempre sigue disponible: A no significa prohibir pistas.

| Habilidad | Acción observable | I | P | A |
|---|---|---|---|---|
| S01 | reconocer y modificar un parámetro `id` en una dirección. | UG-01 | UG-02, UG-03, UG-04, UG-05, UG-06 | UG-10, UG-18, UG-21, UG-27, UG-36, UG-44, UG-50 |
| S02 | localizar una petición concreta en la pestaña Red del navegador. | UG-02 | UG-03, UG-04, UG-05 | UG-08, UG-09, UG-10, UG-11, UG-12, UG-21, UG-31, UG-36, UG-41, UG-50 |
| S03 | localizar un campo concreto dentro de una respuesta JSON. | UG-03 | UG-04, UG-05, UG-07 | UG-09, UG-10, UG-12, UG-13, UG-14, UG-21, UG-31, UG-36, UG-41, UG-43, UG-50 |
| S04 | localizar un elemento de la página con el inspector de elementos. | UG-04 | UG-05, UG-06 | UG-17, UG-18, UG-31 |
| S05 | registrar una evidencia reproducible separando esperado y observado. | UG-05 | UG-06 | UG-19, UG-23, UG-25, UG-31, UG-50 |
| S06 | buscar una palabra en un recurso JavaScript que la propia página ha cargado. | UG-06 | UG-07 | UG-40, UG-47 |
| S07 | iniciar sesión y reconocer la identidad con la que se trabaja. | UG-07 | UG-08, UG-09, UG-10 | UG-27, UG-46, UG-47, UG-50 |
| S08 | localizar la cookie o mecanismo de sesión que usa esta implementación. | UG-08 | UG-09, UG-10 | UG-27, UG-30, UG-41, UG-42, UG-46, UG-47, UG-50 |
| S09 | comparar el acceso a un mismo recurso antes y después de cerrar sesión. | UG-09 | UG-10 | UG-27, UG-30, UG-46, UG-47 |
| S10 | comprobar autorización por objeto entre dos cuentas. | UG-10 | UG-11, UG-13, UG-15 | UG-27, UG-34, UG-36, UG-40, UG-46, UG-47, UG-50 |
| S11 | reenviar una petición desde las herramientas del navegador. | UG-11 | UG-12, UG-14, UG-16 | UG-22, UG-28, UG-30, UG-33, UG-34, UG-35, UG-38, UG-42, UG-44, UG-47, UG-50 |
| S12 | modificar un campo permitido en el cuerpo JSON de una petición. | UG-12 | UG-13, UG-14, UG-16, UG-17 | UG-20, UG-22, UG-26, UG-32, UG-34, UG-38, UG-42, UG-43, UG-45, UG-47, UG-50 |
| S13 | comprobar si el servidor acepta un campo interno que el cliente no debe controlar. | UG-13 | UG-15 | UG-34, UG-42, UG-47 |
| S14 | interpretar una tabla pequeña de estados HTTP y distinguir un error útil de una filtración interna. | UG-14 | UG-15 | UG-22, UG-26, UG-34, UG-42 |
| S15 | diseñar una pareja de pruebas: uso legítimo permitido y abuso denegado. | UG-15 | UG-16 | UG-24, UG-25, UG-29, UG-31, UG-34, UG-37, UG-42, UG-45, UG-48, UG-49, UG-50 |
| S16 | comprobar si una regla de entrada se valida también en el servidor. | UG-16 | UG-17 | UG-32, UG-38 |
| S17 | distinguir texto mostrado literalmente de HTML interpretado. | UG-17 | UG-18, UG-19, UG-20 | UG-39 |
| S18 | seguir el recorrido de un dato controlable hasta el lugar donde se inserta en la página. | UG-18 | UG-19, UG-20 | — |
| S19 | demostrar ejecución de JavaScript provocada por una entrada no confiable. | UG-19 | UG-20 | — |
| S20 | comprobar si una entrada peligrosa se almacena y afecta a otra sesión de laboratorio. | UG-20 | UG-25 | — |
| S21 | leer una consulta SELECT sencilla como una selección de filas con una condición. | UG-21 | UG-22, UG-23, UG-25 | — |
| S22 | aislar un carácter de entrada que cambia el comportamiento de una consulta vulnerable. | UG-22 | UG-23, UG-25, UG-26 | — |
| S23 | contrastar una condición verdadera y una falsa dentro del escenario de inyección. | UG-23 | UG-24, UG-25 | — |
| S24 | comprobar que una consulta parametrizada trata la entrada como un valor. | UG-24 | UG-25 | UG-49 |
| S25 | ordenar evidencias por tiempo y separar hechos, hipótesis y preguntas abiertas. | UG-25 | — | UG-46, UG-48, UG-50 |
| S26 | comprobar si una respuesta revela la existencia de una cuenta. | UG-26 | UG-27 | — |
| S27 | comprobar que un token de recuperación está vinculado a una cuenta concreta. | UG-27 | UG-28, UG-29, UG-30 | — |
| S28 | comprobar que una autorización de recuperación deja de servir tras usarse. | UG-28 | UG-29, UG-30, UG-33 | — |
| S29 | verificar la caducidad de un token con un reloj virtual del escenario. | UG-29 | UG-30 | — |
| S30 | comprobar la revocación de sesiones previas después de una recuperación de seguridad. | UG-30 | — | — |
| S31 | convertir una regla de negocio escrita en condiciones comprobables. | UG-31 | UG-32, UG-33, UG-34, UG-35 | UG-48, UG-49, UG-50 |
| S32 | comprobar que el servidor calcula el precio a partir de sus datos autorizados. | UG-32 | UG-33 | UG-49, UG-50 |
| S33 | verificar que un reintento de una operación no aplica dos veces el mismo efecto. | UG-33 | — | UG-45, UG-46, UG-49, UG-50 |
| S34 | verificar que una transición entre estados de un pedido está permitida. | UG-34 | UG-35 | UG-45, UG-49, UG-50 |
| S35 | comparar solicitudes secuenciales y dos solicitudes concurrentes. | UG-35 | — | UG-49 |
| S36 | distinguir un identificador de negocio de una ruta de archivo utilizada por un servicio. | UG-36 | UG-37, UG-39, UG-40 | — |
| S37 | comprobar la normalización de rutas y el límite de un directorio autorizado. | UG-37 | UG-40 | — |
| S38 | contrastar extensión, tipo declarado y contenido de un archivo inocuo. | UG-38 | UG-39, UG-40 | — |
| S39 | interpretar las cabeceras de tipo de contenido y disposición de una descarga. | UG-39 | UG-40 | — |
| S40 | verificar que un recurso interno no se distribuye en la publicación pública. | UG-40 | — | UG-47 |
| S41 | reconocer un origen como combinación de esquema, nombre y puerto y comprobar una política CORS concreta. | UG-41 | UG-42, UG-43, UG-44 | — |
| S42 | verificar la autenticidad de una operación iniciada desde otro origen en un escenario CSRF. | UG-42 | — | — |
| S43 | comprobar desde qué componente se realiza una petición y qué servicios puede alcanzar. | UG-43 | — | — |
| S44 | comprobar el destino efectivo de una URL frente a una regla de confianza. | UG-44 | — | — |
| S45 | comprobar autenticidad e integridad de un mensaje firmado por el servicio ficticio. | UG-45 | UG-46 | — |
| S46 | correlacionar eventos con identificadores de petición, sesión y operación, reconociendo sus límites. | UG-46 | UG-47, UG-50 | — |
| S47 | construir y verificar un recorrido de ataque con sus dependencias y posibles ramas. | UG-47 | UG-48, UG-49, UG-50 | — |
| S48 | priorizar una corrección justificando impacto, condiciones de explotación y efecto sobre la cadena. | UG-48 | UG-49, UG-50 | — |
| S49 | convertir pruebas manuales conocidas en una comprobación de regresión repetible. | UG-49 | UG-50 | — |
| S50 | comunicar una conclusión final con alcance, evidencias, correcciones verificadas y riesgo pendiente. | UG-50 | — | Cierre integrador |

La matriz es un plan editorial, no una medición de aprendizaje. El próximo control de UX comprobará que cada referencia se utiliza realmente y que no hay microhabilidades asumidas sin apoyo. Las habilidades especializadas pueden recuperarse en otra evidencia del mismo caso; no se añade repetición mecánica solo para llenar columnas.
