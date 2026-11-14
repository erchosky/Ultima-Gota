# 25 · Lo sabemos, lo suponemos

Acto 5 · Escritorio y copia autorizada de tienda · día 0 · hito 25 después de las 10:00 (sin duración impuesta)

**De: Mara**

Hemos encontrado varios problemas y necesito entender cuáles tienen relación demostrada con la queja inicial. No quiero que una lista de fallos se convierta en una historia que no podemos sostener. Lara ha preparado unos pocos registros históricos y tus pruebas de revisión. Colócalos por su tiempo y por su origen: una reproducción de hoy no es un registro de lo sucedido antes de las diez. Algunas frases describen hechos; otras son hipótesis o preguntas abiertas. Conserva al menos una incertidumbre explícita. El buscador vulnerable merece corrección, pero en los registros disponibles no aparece una prueba de su uso durante aquel incidente.

**Importa porque:** Mara pregunta si todos los fallos encontrados fueron utilizados durante el susto inicial.

**Reutiliza:** 05, 15, 20, 21, 22, 23, 24

**Añade S25:** ordenar evidencias por tiempo y separar hechos, hipótesis y preguntas abiertas.

**Objetivo:** clasificar un conjunto pequeño de registros auténticos del escenario y conclusiones propuestas. Detectar una conclusión que no está respaldada.

**Estado inicial:** fixture campaign-v1 y snapshot propio 25; cuentas reviewer. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Encontrar una vulnerabilidad hoy demuestra que fue utilizada antes de las diez?

## Apoyo guiado

1. Distingue cuándo ocurrió algo de cuándo lo reprodujiste.
2. Mira las etiquetas de procedencia y reloj de cada evidencia.
3. Ordena registros históricos y separa tus experimentos de revisión.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Distingue cuándo ocurrió algo de cuándo lo reprodujiste.
2. Mira las etiquetas de procedencia y reloj de cada evidencia.
3. Ordena registros históricos y separa tus experimentos de revisión.
4. Ordena archivo08:50, acceso08:52 y perfil08:54; clasifica la reproducción de pedidos como prueba actual y la atribución de SQLi al incidente como no respaldada. Conserva la incertidumbre sobre identidad.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Orden parcial correcto, procedencia de cada tarjeta y al menos una limitación; no atribuye SQLi/XSS históricos.

**No basta:** Pegar todas las vulnerabilidades en la línea histórica.

**Cuaderno:** EV-25; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

el buscador vulnerable es un hallazgo; no aparece evidencia de su abuso histórico. Una petición de Vera abre la revisión de recuperación de cuentas.

Evidencia histórica que lo conecte; reproducir una posibilidad no demuestra su uso pasado.

**Pregunta:** ¿Qué falta para atribuir un hallazgo al incidente?

**Corrección:** No aplica parche nuevo; corregir conclusiones que excedan sus fuentes.

**Prueba positiva:** Registros con hora y fuente se conservan.

**Prueba negativa:** Una IP o autor de código no se acepta como identidad personal.

**Enlace:** OBJ-25 · Línea temporal parcial y autorización de recuperación.

**Recuperación:** Reconstruir fixtures de chapter-25/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-25.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
