# 44 · Un destino con dos lecturas

Acto 9 · Escritorio y copia autorizada de tienda · día 0 · hito 44 después de las 10:00 (sin duración impuesta)

**De: Lara**

Un enlace de seguimiento decide adónde volver después de una consulta. Su comprobación antigua busca una palabra conocida dentro de la dirección, pero una URL tiene partes con funciones distintas. Vamos a separar esquema, credenciales si existieran, host, puerto y ruta antes de comparar el destino real. Solo usaremos los dos orígenes locales del caso. La guía mostrará cómo una palabra puede estar en la ruta sin determinar el host. Observa la cabecera Location y la navegación final. La corrección debe analizar la URL y comprobar su origen completo, conservando el retorno legítimo a la tienda.

**Importa porque:** un enlace de seguimiento acepta una dirección de retorno que parece de la tienda, pero se interpreta de otra manera.

**Reutiliza:** 01, 11, 41

**Añade S44:** comprobar el destino efectivo de una URL frente a una regla de confianza.

**Objetivo:** comparar direcciones de laboratorio parecidas y observar su destino final. La guía enseña antes las partes necesarias de la URL.

**Estado inicial:** fixture campaign-v1 y snapshot propio 44; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Que una dirección contenga la palabra tienda garantiza su origen?

## Apoyo guiado

1. La confianza depende del origen efectivo, no de una subcadena.
2. Compara destino analizado y cabecera Location del seguimiento.
3. Usa los dos ejemplos locales entregados, variando origen y ruta.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. La confianza depende del origen efectivo, no de una subcadena.
2. Compara destino analizado y cabecera Location del seguimiento.
3. Usa los dos ejemplos locales entregados, variando origen y ruta.
4. Prueba retorno legítimo a4311/tienda y retorno a4312/tienda. El filtro vulnerable por palabra acepta ambos; el analizador corregido permite solo origen4311 y rechaza el auxiliar.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Location vulnerable navega al auxiliar local no autorizado; corregida rechaza ese origen y conserva retorno tienda.

**No basta:** Elegir un sitio externo o juzgar el destino solo por texto del enlace.

**Cuaderno:** EV-44; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

ver una palabra confiable dentro de una dirección no determina su origen. El enlace pertenece a las notificaciones de Mercurio.

El origen resultante de analizar la URL y el destino efectivo permitido.

**Pregunta:** ¿Qué dato debe compararse con la lista de confianza?

**Corrección:** Analizador URL con base fija y lista exacta de orígenes y rutas de retorno previstas.

**Prueba positiva:** Retorno a tienda autorizada funciona.

**Prueba negativa:** Retorno al auxiliar se rechaza aunque contenga tienda.

**Enlace:** OBJ-44 · Destino real y aviso logístico.

**Recuperación:** Reconstruir fixtures de chapter-44/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-44.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
