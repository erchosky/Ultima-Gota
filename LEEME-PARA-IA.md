# Guía para una IA: enriquecer Última Gota sin vaciar el juego

## Intención de esta entrega

Quiero mejorar el lore y la experiencia de aprender: entender por qué existe la tienda, por qué se construyó así su web, qué necesita cada personaje y cómo una investigación lleva a la siguiente. Quiero que el jugador aprenda nuevas cosas mediante sus propias pruebas.

«Mejorar» no significa resolver los retos por el jugador, eliminar las vulnerabilidades preparadas ni reescribir la aplicación. El encargo por defecto es narrativo y pedagógico. Esta guía no es una orden para implementar todos los trabajos pendientes de la documentación.

## Lee antes de editar

1. `README.md`: propósito, arranque y estado de la entrega.
2. `docs/ESTADO.md`: comportamiento implementado, límites y decisiones técnicas vigentes.
3. `docs/DISENO.md` y `docs/ESPECIFICACION-ORIGINAL.md`: premisa, personajes, reglas de continuidad y progresión.
4. `docs/CATALOGO.md`, `docs/HABILIDADES.md` y las fichas de los capítulos afectados.
5. `content/es/campaign/acts.json`, `objects.json` y `skills.json`: conexiones y dependencias.
6. `content/es/campaign/timeline.json` y material de profesor solo para contrastar coherencia editorial. No trasladar sus revelaciones al contenido inicial del alumno.

Los archivos históricos pueden describir etapas anteriores. Para el estado implementado, contrasta `docs/ESTADO.md` con el código y las fichas. Hay 50 expedientes escritos y solo 01–20 tienen escenarios ejecutables en esta entrega.

## Qué desarrollar

- Contexto comprensible de la tienda y de sus funciones: quién las necesita y qué problema cotidiano resuelven.
- Motivaciones y voces distintas para Mara, Lara, Nico, Vera y Sam, sin convertir a nadie en una caricatura.
- Transiciones que expliquen qué quedó probado, qué sigue sin saberse y por qué llega el siguiente encargo.
- Relaciones entre promociones antiguas, catálogo, almacén, soporte y pedidos, respetando el canon existente.
- Enseñanza gradual de conceptos: explicar lo mínimo antes de exigirlo, usar una novedad principal por expediente y reutilizar conocimientos con sentido.
- Pistas de menor a mayor ayuda. La entrada narrativa debe plantear una necesidad; no revelar inmediatamente el mecanismo exacto del fallo ni su solución.
- Cierres que relacionen una observación con lo aprendido, evitando felicitaciones vacías y conclusiones que no estén demostradas.

Prioriza `narrativeEntry`, `whyItMatters`, `debrief` y los textos visibles de apoyo. También puedes mejorar explicaciones y pistas manteniendo lo que piden, su dificultad gradual y sus condiciones de desbloqueo. Revisa cómo se consume cada campo antes de cambiarlo: algunos textos y valores también participan en comprobaciones.

Puedes proponer contexto nuevo compatible con lo establecido. Diferencia las propuestas de lore de los hechos ya canónicos; no inventes registros históricos para hacer que una teoría parezca demostrada.

## Contratos que debes conservar

### Práctica y corrección

Las copias vulnerables permiten observar los problemas que se enseñan. Las versiones corregidas permiten comparar resultados cuando el expediente lo pide. El mundo principal puede conservar las correcciones ganadas y las copias históricas pueden mantener fallos anteriores con una etiqueta clara.

Conserva esas tres funciones. No apliques una corrección global que impida reproducir el ejercicio. Tampoco deshagas las correcciones que el alumno ya consiguió. Un error accidental que impide jugar es distinto de una vulnerabilidad didáctica: identifica esa diferencia antes de proponer tocar código. Para este encargo de lore, registra los problemas técnicos fuera de alcance y deja su implementación para una petición expresa.

### Investigación real

Mantén peticiones, respuestas, persistencia, sesiones y comprobaciones reales. No sustituyas las pruebas por un botón que complete el caso, una animación, una coincidencia de texto o una respuesta que el programa acepte sin observar el comportamiento relevante.

Las soluciones siguen en el material de profesor. No las incorpores por defecto a las pantallas del alumno ni desbloquees pistas o expedientes automáticamente.

### Continuidad y hechos

- Alba conserva el pedido 203; Bruno, el 204; demo.pera, el 205. Los datos de otros escenarios no deben reasignarse para facilitar una validación.
- Ivo es un antiguo colaborador, no un culpable demostrado. Mercurio es una integración. `visitante-17` no tiene una identidad personal conocida.
- Distingue prueba actual, registro histórico, hipótesis y limitación. Un hallazgo de revisión no demuestra su explotación durante el incidente.
- Respeta qué conoce cada personaje y qué puede conocer el alumno en cada capítulo. La cronología completa no se revela al inicio.
- Conserva el orden de los 50 expedientes y sus dependencias. Una mejora narrativa no debe exigir una técnica que aún no se ha enseñado.

### Funcionamiento y alcance

En una revisión de lore, conserva identificadores, claves JSON, rutas, nombres de campos técnicos, recursos de referencia, respuestas esperadas, validadores, estados de implementación y condiciones de avance. No renombres datos que el alumno debe copiar exactamente sin revisar primero todos sus consumidores.

No cambies la arquitectura, las dependencias ni el diseño visual como efecto secundario de mejorar textos. No marques 21–50 como funcionales por ampliar sus fichas. Conserva compatibilidad del progreso, exportaciones, reintentos y correcciones acumuladas.

Todo sigue siendo un laboratorio local con información ficticia. Mantén el aislamiento del contenido de práctica y sus efectos acotados. No añadas servicios externos, cuentas reales ni una API de IA para narrar la historia.

## Ejemplo del tipo de mejora buscado

**Caso existente:** Sam necesita enviar la ficha de Pera del huerto y su enlace abre Naranja de barrio. El alumno aprende a reconocer el parámetro `id` de la dirección.

**Posible mejora narrativa:** explicar brevemente qué está preparando Sam y por qué necesita enviar esa ficha, dar una intervención breve a Lara y conectar la lista que entrega Sam con la discrepancia de precio que se investigará después. Ese contexto es una propuesta editorial, no un nuevo hecho del incidente.

**Se conserva:** referencias 1 y 2, nombres exactos, consulta real de productos, observación antes/después y requisito de evidencia. No se convierte el cambio normal de identificador de un producto público en una vulnerabilidad ni se completa el caso por el alumno.

## Forma de trabajar y entregar

1. Resume la premisa y detecta los puntos donde falta motivación o conexión. Indica los archivos y capítulos afectados.
2. Mejora por bloques pequeños y coherentes. Mantén el JSON válido y los contratos existentes; evita alargar cada pantalla hasta dificultar la lectura.
3. Comprueba que cada encargo explica quién necesita algo, por qué lo necesita, qué sabe el jugador y qué acción puede intentar con sus conocimientos actuales.
4. Contrasta pistas y cierres con el caso anterior y el siguiente. No adelantes hechos ni confundas una hipótesis con una conclusión.
5. Ejecuta las comprobaciones del proyecto adecuadas al cambio. Si afecta al recorrido o a textos que las pruebas comparan, comprueba también esos recorridos. No rebajes validadores ni pruebas para ocultar una regresión.
6. Entrega los archivos modificados, explica qué mejora cada cambio y distingue comprobaciones nuevas de informes históricos. Señala lo que no pudiste probar.

## Encargo listo para copiar a otra IA

```text
Revisa este proyecto, Última Gota: los 50 expedientes. Lee primero README.md,
LEEME-PARA-IA.md, docs/ESTADO.md, docs/DISENO.md y la especificación original.

Quiero enriquecer el lore y la experiencia educativa: el porqué de la tienda y
su web, las motivaciones de los personajes, las conexiones entre expedientes y
la forma de introducir conceptos nuevos a una persona que empieza desde cero.
Quiero que investigar tenga sentido dentro de la historia y que el jugador
aprenda observando, probando y razonando.

Trabaja sobre los textos y apoyos editables. Conserva el canon, los hechos
históricos y sus límites, la revelación gradual, el orden y los contratos de
los ejercicios. Introduce contexto nuevo solo si es compatible y señala qué
es una propuesta editorial.

Las vulnerabilidades intencionadas son material de práctica: consérvalas en
sus copias. Mantén también las versiones corregidas y las correcciones ganadas.
No soluciones retos por el alumno, no reveles respuestas de profesor y no
cambies arquitectura, validadores, progreso ni aislamiento para mejorar el lore.
Si detectas errores técnicos ajenos al encargo, descríbelos por separado.

Hay 50 expedientes escritos, pero solo 01–20 tienen escenarios ejecutables.
No confundas ampliar la narración con implementar los demás capítulos.

Empieza por localizar problemas de motivación y continuidad, aplica mejoras
concretas por bloques y comprueba que no rompen los ejercicios. Al terminar,
explica qué archivos cambiaste, qué aporta cada mejora, qué verificaste y qué
sigue pendiente. No presentes pruebas antiguas como validación nueva.
```
