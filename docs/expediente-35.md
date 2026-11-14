# 35 · La última botella

Acto 7 · Escritorio y copia autorizada de tienda · día 0 · hito 35 después de las 10:00 (sin duración impuesta)

**De: Sam**

Solo queda una botella de Mango del puerto. Dos reservas de laboratorio casi simultáneas terminaron aceptadas. Si las hacemos una detrás de otra, la segunda debería ver el stock actualizado; al solaparse podrían leer ambas la misma unidad antes de descontarla. La mesa ofrece un lanzador de dos solicitudes, limitado a este producto y a esta copia. Mostrará lectura, comprobación y actualización para que puedas comparar el orden. No es una herramienta para generar carga. Probaremos primero reservas secuenciales y después concurrentes, restaurando la misma unidad entre pruebas. La corrección tendrá que permitir exactamente una reserva y dejar un stock coherente.

**Importa porque:** dos reservas ficticias se hicieron casi al mismo tiempo sobre una única unidad.

**Reutiliza:** 11, 31, 34

**Añade S35:** comparar solicitudes secuenciales y dos solicitudes concurrentes.

**Objetivo:** usar un lanzador didáctico limitado a dos peticiones al propio escenario. Visualiza el orden de lectura, comprobación y actualización.

**Estado inicial:** fixture campaign-v1 y snapshot propio 35; cuentas Alba, Bruno. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Pueden dos solicitudes leer el mismo stock si se comprueba antes de actualizar?

## Apoyo guiado

1. El orden de lectura y escritura puede romper una condición.
2. Usa el lanzador acotado a dos reservas del producto4.
3. Compara dos peticiones secuenciales con dos solapadas desde stock1.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. El orden de lectura y escritura puede romper una condición.
2. Usa el lanzador acotado a dos reservas del producto4.
3. Compara dos peticiones secuenciales con dos solapadas desde stock1.
4. Restablece stock1 entre corridas. Ejecuta secuencial y concurrente con barrera didáctica: vulnerable acepta dos; corregida acepta una mediante actualización atómica condicionada a stock positivo.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Eventos de dos solicitudes reales con barrera: secuencial1, concurrente vulnerable2, corregida1 y stock0.

**No basta:** Lanzar una solicitud o inferir carrera de un error genérico.

**Cuaderno:** EV-35; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

explicar condición de carrera sin exigir generar carga masiva. Un albarán de las reservas abre la revisión de archivos.

Que comprobar disponibilidad y reservar no queden separadas frente a otra solicitud.

**Pregunta:** ¿Qué protege la operación atómica?

**Corrección:** Transacción o actualización condicionada atómica con comprobación de filas afectadas.

**Prueba positiva:** Una reserva con stock1 se confirma.

**Prueba negativa:** Segunda reserva concurrente se rechaza y nunca hay sobreventa.

**Enlace:** OBJ-35 · Albarán de reserva y árbol de documentos.

**Recuperación:** Reconstruir fixtures de chapter-35/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-35.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
