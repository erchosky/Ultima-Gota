# 18 · El camino del mensaje

Acto 4 · Escritorio y copia autorizada de tienda · día 0 · hito 18 después de las 10:00 (sin duración impuesta)

**De: Lara**

La campaña de práctica muestra un mensaje que toma de su dirección. Quiero seguir el recorrido de una marca reconocible antes de intentar ninguna acción del navegador. Llamaremos entrada al lugar donde tú decides el dato y destino al lugar donde termina presentado. Una transformación es lo que ocurre entre ambos, por ejemplo decodificar una parte de la dirección. Abriremos un fragmento pequeño del código público preparado para esta lección. No necesitas leer toda la aplicación ni buscar el validador. Cambia una marca, identifica dónde aparece y relaciona esa observación con las líneas que reciben y colocan el mensaje en la página.

**Importa porque:** una página de la campaña muestra un mensaje tomado de su dirección.

**Reutiliza:** 01, 04, 17

**Añade S18:** seguir el recorrido de un dato controlable hasta el lugar donde se inserta en la página.

**Objetivo:** cambiar un marcador reconocible, observar dónde aparece y usar una vista guiada del fragmento relevante del código cliente. Explica entrada, transformación y destino.

**Predicción:** ¿Dónde esperas encontrar la marca que cambies en el parámetro mensaje?

## Apoyo guiado

1. Sigue un dato identificable desde su entrada hasta su destino.
2. Mira el parámetro mensaje y el fragmento público del mensaje de campaña.
3. Cambia la marca y localiza el elemento cuyo contenido varía.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Sigue un dato identificable desde su entrada hasta su destino.
2. Mira el parámetro mensaje y el fragmento público del mensaje de campaña.
3. Cambia la marca y localiza el elemento cuyo contenido varía.
4. Usa mensaje=MARCA-PERA, encuentra #mensaje y relaciona URLSearchParams con la asignación a innerHTML en el fragmento didáctico. Registra entrada, transformación y destino.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Consulta con marcador único del run; mapa correcto parámetro mensaje→decodificación→#mensaje/innerHTML reproducido en navegador.

**No basta:** Nombrar cualquier función sin vincular el marcador observado.

**Cuaderno:** EV-18; identidad, recurso, reloj, petición, esperado, observado y reproducción independiente cuando corresponde.

## Cierre

el destino elegido interpreta contenido. El siguiente caso comprobará una consecuencia concreta.

El destino que inserta el valor mediante innerHTML.

**Pregunta:** ¿Qué parte decide tratar la entrada como contenido de página?

**Corrección:** Cambiar a textContent para este mensaje que solo necesita texto.

**Prueba positiva:** Mensaje normal conserva su contenido legible.

**Prueba negativa:** Marcado se muestra como texto y no crea elementos.

**Enlace:** OBJ-18 · Mapa del recorrido del mensaje.

**Recuperación:** Reconstruir fixtures de chapter-18/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-18.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y recorrido Chromium verificado. Representación real reproducida en marco de origen opaco; entrada acotada. No se acredita Docker, Firefox ni prueba con principiante. Ver reports/browser-act-four-validation.json.
