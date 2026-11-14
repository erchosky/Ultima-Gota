# 17 · ¿Texto o formato?

Acto 4 · Escritorio y copia autorizada de tienda · día 0 · hito 17 después de las 10:00 (sin duración impuesta)

**De: Nico**

Hay dos campos de descripción en nuestra ficha de pruebas. Uno muestra lo escrito tal cual; el otro interpreta unas etiquetas como formato. Vamos a comparar ambos con el mismo marcador inocuo. Una etiqueta HTML organiza o presenta contenido de la página; por ejemplo, puede hacer que una palabra se vea destacada. Eso no significa necesariamente ejecutar instrucciones JavaScript. Conserva el texto enviado y observa cómo lo representa cada campo. Puedes recargar para comprobar que no estás mirando una edición local del inspector. Antes de probar consecuencias mayores necesitamos describir con precisión si vemos texto literal o una estructura de página interpretada.

**Importa porque:** una descripción de producto altera su aspecto al incluir caracteres de marcado.

**Reutiliza:** 04, 12, 16

**Añade S17:** distinguir texto mostrado literalmente de HTML interpretado.

**Objetivo:** usar un marcador de formato inocuo y comparar dos campos: uno que lo trata como texto y otro como marcado.

**Predicción:** ¿Ver una palabra en negrita demuestra que se ejecutó JavaScript?

## Apoyo guiado

1. Formato interpretado y ejecución son efectos distintos.
2. Compara los dos campos de la ficha de pruebas.
3. Envía el mismo marcador de formato a ambos.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Formato interpretado y ejecución son efectos distintos.
2. Compara los dos campos de la ficha de pruebas.
3. Envía el mismo marcador de formato a ambos.
4. Usa <strong>PERA</strong> en los campos de prueba. Comprueba texto literal en uno y elemento strong en otro, contrastando el dato recibido con el inspector.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Entrada idéntica, respuesta confirmada y representación literal frente a elemento strong en navegador.

**No basta:** Acreditar XSS solo porque se muestra negrita.

**Cuaderno:** EV-17; identidad, recurso, reloj, petición, esperado, observado y reproducción independiente cuando corresponde.

## Cierre

interpretar HTML no demuestra automáticamente XSS. Lara pide seguir el recorrido del dato antes de probar más.

Interpretación de HTML; aún no demuestra ejecución de JavaScript.

**Pregunta:** ¿Qué demuestra la etiqueta interpretada?

**Corrección:** Usar texto literal cuando no se necesita marcado; si se permite formato, una política explícita de saneamiento.

**Prueba positiva:** Texto corriente se muestra correctamente.

**Prueba negativa:** Etiqueta se conserva literal en campo de texto.

**Enlace:** OBJ-17 · Marcador de formato y referencia al mensaje de campaña.

**Recuperación:** Reconstruir fixtures de chapter-17/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-17.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional y recorrido Chromium verificado. Representación real reproducida en marco de origen opaco; entrada acotada. No se acredita Docker, Firefox ni prueba con principiante. Ver reports/browser-act-four-validation.json.
