# 38 · El nombre no demuestra el contenido

Acto 8 · Escritorio y copia autorizada de tienda · día 0 · hito 38 después de las 10:00 (sin duración impuesta)

**De: Sam**

Los proveedores suben etiquetas de botellas y el formulario acepta nombres terminados en png. Un nombre no demuestra qué hay dentro de un archivo. Hemos preparado tres muestras inocuas: una imagen real, un texto renombrado y una imagen con tipo declarado diferente. La guía explica extensión, tipo enviado y contenido antes de comparar. No necesitas crear archivos ni ejecutar ninguno. Observa qué acepta realmente el servidor, no solo lo que permite elegir el formulario. La versión corregida tendrá que limitar tamaño y formato, generar un nombre propio y almacenar fuera de la publicación directa, conservando la subida legítima de una etiqueta.

**Importa porque:** los proveedores suben etiquetas y el formulario decide qué acepta por el nombre del archivo.

**Reutiliza:** 11, 12, 16

**Añade S38:** contrastar extensión, tipo declarado y contenido de un archivo inocuo.

**Objetivo:** usar archivos de demostración proporcionados con combinaciones conocidas de nombre y contenido, sin ejecutables ni malware.

**Estado inicial:** fixture campaign-v1 y snapshot propio 38; cuentas proveedor.mercurio. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Renombrar un texto a etiqueta.png lo convierte en una imagen?

## Apoyo guiado

1. Nombre, tipo declarado y bytes son señales distintas.
2. Usa las muestras suministradas y observa la petición de subida.
3. Compara combinaciones conocidas sin ejecutar contenido.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Nombre, tipo declarado y bytes son señales distintas.
2. Usa las muestras suministradas y observa la petición de subida.
3. Compara combinaciones conocidas sin ejecutar contenido.
4. Sube png válido, texto con nombre png e imagen con tipo declarado incongruente. En vulnerable documenta criterio por nombre; en corregida acepta solo formato decodificable y tamaño permitido.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Matriz de tres muestras con hashes conocidos y estados persistidos; corregida valida formato, tamaño y nombre generado.

**No basta:** Cambiar solo extensión en pantalla o subir archivos ajenos.

**Cuaderno:** EV-38; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

ningún indicador aislado garantiza que un archivo sea adecuado. La revisión continúa con la forma de servirlo al navegador.

El formato real permitido, límites y almacenamiento seguro; un tipo declarado tampoco basta.

**Pregunta:** ¿Qué debe comprobarse además de la extensión?

**Corrección:** Decodificar y recodificar imagen de muestra, límite1MiB y nombre generado fuera del directorio público.

**Prueba positiva:** PNG válido pequeño se guarda como etiqueta.

**Prueba negativa:** Texto renombrado, discrepancia no admitida o exceso de tamaño se rechazan.

**Enlace:** OBJ-38 · Matriz de muestras y referencia de descarga.

**Recuperación:** Reconstruir fixtures de chapter-38/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-38.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
