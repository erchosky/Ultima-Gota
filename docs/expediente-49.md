# 49 · Que no vuelva con la próxima oferta

Acto 10 · Copias corregida y regresión · día 0 · hito 49 después de las 10:00 (sin duración impuesta)

**De: Nico**

La próxima oferta puede cambiar código y volver a introducir algo que ya corregimos. Vamos a convertir tus pruebas en una comprobación repetible. El constructor pide identidad, acción, resultado esperado y dato que debe permanecer protegido; no exige escribir un programa desde cero. Probaremos la suite en dos copias etiquetadas. Una contiene una regresión sembrada y debe fallar por el motivo correcto. La otra conserva las correcciones y debe superar los casos positivos y negativos. Guarda la definición y sus resultados. Que todos esos casos pasen no demuestra ausencia de cualquier fallo: indica exactamente qué comportamientos quedarán vigilados cuando vuelva a cambiar la tienda.

**Importa porque:** Nico teme que una promoción futura reintroduzca los fallos ya corregidos.

**Reutiliza:** 15, 24, 31, 32, 33, 34, 35, 47, 48

**Añade S49:** convertir pruebas manuales conocidas en una comprobación de regresión repetible.

**Objetivo:** usar un constructor sencillo de casos: identidad, acción, resultado esperado y dato que debe permanecer protegido. Genera una suite ejecutable del proyecto, sin exigir al alumno programarla desde cero.

**Estado inicial:** fixture campaign-v1 y snapshot propio 49; cuentas Alba, Bruno, demo.pera, almacen.sam. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Una suite que nunca detecta la regresión sembrada demuestra que cubre ese fallo?

## Apoyo guiado

1. Una comprobación útil debe fallar ante el defecto que pretende detectar.
2. Usa el constructor limitado de casos y las copias corregida/regresión.
3. Define identidad, objeto, resultado y campo protegido por cada prueba.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Una comprobación útil debe fallar ante el defecto que pretende detectar.
2. Usa el constructor limitado de casos y las copias corregida/regresión.
3. Define identidad, objeto, resultado y campo protegido por cada prueba.
4. Construye casos de pedido propio/ajeno, capacidad, búsqueda, cupón y transición. Ejecuta en corregida y regresión de propiedad sembrada: debe señalar acceso ajeno indebido y conservar resultados legítimos. Exporta suite declarativa.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Suite declarativa ejecutada por runner: pasa corregida y falla control de propietario en copia sembrada; no ejecuta código libre.

**No basta:** Aceptar suite vacía, inspeccionar solo nombre de versión o ejecutar scripts arbitrarios.

**Cuaderno:** EV-49; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

una suite cubre los casos definidos, no demuestra ausencia de cualquier fallo. Sus resultados acompañan al informe final.

Que pasan los casos definidos, sin garantizar ausencia de cualquier vulnerabilidad.

**Pregunta:** ¿Qué demuestra que toda la suite pase?

**Corrección:** Mantener suite versionada de casos autorizados y comparar resultados en cambios futuros.

**Prueba positiva:** Todos los flujos legítimos definidos pasan.

**Prueba negativa:** Regresión de propiedad provoca fallo específico.

**Enlace:** OBJ-49 · Suite ejecutable declarativa y resultados de regresión.

**Recuperación:** Reconstruir fixtures de chapter-49/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-49.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
