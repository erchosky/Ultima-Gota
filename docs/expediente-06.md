# 06 · La promoción retirada

Acto 2 · Escritorio y copia autorizada de tienda · día 0 · hito 06 después de las 10:00 (sin duración impuesta)

**De: Lara**

La revisión del precio queda guardada. Mara ha autorizado mirar la campaña Verano sin colas porque todavía está enlazada desde una ficha pública. Una página puede cargar archivos JavaScript: instrucciones que recibe el navegador para hacer funcionar partes de la interfaz. Esos archivos pueden leerse, aunque no tengan un botón propio. Vamos a abrir únicamente el recurso que carga esta página y buscar una palabra de pruebas indicada en el encargo. Si encontramos datos de acceso, aún no sabremos si sirven. Conservaremos el lugar exacto del hallazgo y pediremos la comprobación de la cuenta ficticia correspondiente antes de sacar conclusiones.

**Importa porque:** la página de la campaña ya no está en el catálogo, pero su referencia sigue en la ficha revisada.

**Reutiliza:** 01, 04, 05

**Añade S06:** buscar una palabra en un recurso JavaScript que la propia página ha cargado.

**Objetivo:** abrir el recurso público indicado por la página y buscar un término de pruebas. Enseña qué es JavaScript solo en la medida necesaria para reconocer el dato.

**Estado inicial:** fixture campaign-v1 y snapshot propio 06; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Retirar un enlace del catálogo borra también los archivos que sigue sirviendo su página?

## Apoyo guiado

1. Lo que se distribuye al navegador deja de ser secreto para quien recibe el recurso.
2. Abre el enlace de verano y mira el recurso JavaScript que carga en Red.
3. En el recurso público, usa buscar y escribe demo; conserva dirección y fragmento mínimo.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Lo que se distribuye al navegador deja de ser secreto para quien recibe el recurso.
2. Abre el enlace de verano y mira el recurso JavaScript que carga en Red.
3. En el recurso público, usa buscar y escribe demo; conserva dirección y fragmento mínimo.
4. Abre /campanas/verano-sin-colas y su /assets/verano-demo.js desde Red. Busca demo y registra las credenciales de laboratorio junto a la URL, ocultando la contraseña en el cuaderno.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

GET reciente del recurso autorizado y valores de demo.pera contrastados con fixtures; evidencia indica procedencia pública.

**No basta:** Credencial adivinada sin recurso o leer archivos de profesor como parte del reto.

**Cuaderno:** EV-06; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

un archivo enviado al navegador puede leerse aunque no tenga un botón en pantalla. Lara autoriza comprobar exclusivamente esa cuenta.

Demuestra exposición de esas credenciales; su vigencia necesita una prueba posterior autorizada.

**Pregunta:** ¿Qué demuestra encontrar una contraseña en ese archivo público?

**Corrección:** Retirar credenciales de recursos públicos y revocar la cuenta tras comprobarla en copia. El 07 usa una copia de práctica identificada.

**Prueba positiva:** La página de campaña sigue cargando sin credenciales en su recurso corregido.

**Prueba negativa:** El bundle corregido no contiene los valores de acceso.

**Enlace:** OBJ-06 · Credenciales ficticias de demo.pera con procedencia.

**Recuperación:** Reconstruir fixtures de chapter-06/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-06.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido completo verificado en Chromium. Comparaciones06/07/10 en copias separadas; controles08/09 comprobados como comportamiento correcto. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-act-two-validation.json.
