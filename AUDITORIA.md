# Auditoría del proyecto · Última Gota (Etapa 1)

Fecha: 25 de octubre de 2026. Alcance: los 475 ficheros del repositorio (documentación, `content/es`, `scenarios`, `contracts`, `config`, `scripts`, `tests`, `reports`), contrastados con [ESPECIFICACION-ORIGINAL.md](docs/ESPECIFICACION-ORIGINAL.md).

El proyecto está en **etapa de diseño**: no hay aplicación ejecutable. Por eso la auditoría revisa la integridad y coherencia del diseño, su calidad pedagógica, la seguridad de la arquitectura propuesta y la calidad de las herramientas de comprobación. No se ha probado ningún comportamiento en tiempo de ejecución, porque todavía no existe.

## Resultado general

| Área | Valoración |
|---|---|
| Integridad estructural (50 capítulos, 10 actos, 200 pistas, dependencias) | Correcta |
| Coherencia con la biblia y los fixtures canónicos | Correcta |
| Honestidad sobre lo que está implementado | Muy buena |
| Diseño pedagógico (ayuda, pistas, comprensión) | **3 defectos altos** |
| Seguridad de la arquitectura propuesta | 3 lagunas medias |
| Calidad editorial | Defectos menores y sistemáticos |
| Herramientas y mantenimiento | Mejorables (sin git ni CI) |

Lo que convendría hacer antes de la Etapa 2 es corregir los defectos altos (A1–A3). Están en los datos y se trasladarían tal cual a la aplicación.

## Comprobaciones ejecutadas

- `python3 -m unittest discover -s tests/design`: **20/20 tests superados** (Python 3.15.0).
- Los 475 ficheros JSON se parsean sin errores.
- Comprobaciones cruzadas propias, sin modificar el proyecto:
  - Mapa de habilidades: `skills.json`, la columna I/P/A de `HABILIDADES.md` y el `reusedSkills` de los capítulos coinciden.
  - Objetos: `objects.json`, `EVIDENCIAS.md` y `nextNarrativeArtifact` coinciden.
  - Capítulo, plan y fixture: recurso, cuentas, `checkpointPolicy` y referencias de fixture coinciden en los 50 casos.
  - Las claves del JSON coinciden con `contracts/campaign.ts`, con una excepción (B5).
  - La cronología de `timeline.json` coincide con la biblia de la especificación (08:50 → 10:00).
  - El texto narrativo de las fichas `docs/expediente-xx.md` coincide con el JSON.

## Hallazgos

### Altos

**A1. Las pistas 1–3 se muestran siempre, sin que el alumno las pida (50 de 50 capítulos).**
`guidedSteps[0..2]` es literalmente igual a `hint-1..3`. Ejemplo: [chapter-01.json](content/es/chapters/chapter-01.json) frente a [hint-1.json](content/es/chapters/chapter-01/hint-1.json). `StudentChapterView` en [campaign.ts](contracts/campaign.ts) envía `guidedSteps` por defecto, así que concepto, zona y acción llegan sin pedirlos y el sistema de pistas por elección queda anulado. Va contra la §7.10 y la §11 de la especificación (pasos guiados separados; pistas progresivas disponibles por elección).
*Corrección:* reescribir `guidedSteps` como apoyo propio, que no repita las pistas, y añadir un test que impida que coincidan.

**A2. Una respuesta incorrecta revela la respuesta correcta (50 de 50).**
En `content/es/instructor/chapter-xx.json`, `feedbackOnIncorrect` empieza copiando `understandingAnswer`. El reintento de comprensión se vuelve trivial. La §6 de la especificación pide una explicación útil, no la solución.
*Corrección:* dar un feedback que oriente según el error (qué comparar o qué fuente revisar) sin dar la conclusión. Añadir un test de que `understandingAnswer not in feedbackOnIncorrect`.

**A3. La ayuda no disminuye a lo largo de la campaña.**
Los 50 capítulos tienen la misma estructura de apoyo: 4 pasos guiados (concepto, zona, acción y registro) visibles. No hay ningún campo de nivel de apoyo por acto. La §6 («Ayuda que disminuye») y la tabla de la §10 piden pasar de «un paso cada vez» en 01–05 a «objetivos abiertos con criterios explícitos» en 46–50.
*Corrección:* añadir `supportLevel` al contrato, reducir `guidedSteps` progresivamente y comprobarlo con un test.

### Medios

**M1. Hay habilidades que se introducen y nunca se reutilizan.**
- S30, S42 (CSRF), S43 (SSRF) y S44 (destino de URL) no aparecen en ningún capítulo posterior, ni siquiera en el 50. El acto IX queda sin transferencia.
- S25, S33, S35 y S40 no tienen práctica guiada cercana.
- 23 habilidades no tienen aplicación independiente.

La §6 pide recuperar cada habilidad poco después y reutilizarla en otro contexto, y la §18 pide un «uso observable» de cada microhabilidad.

**M2. Las comprobaciones de falso positivo son en gran parte relleno.**
En los 50 planes, 2 de las 3 entradas de `falsePositiveChecks` son genéricas e idénticas («Peticiones previas al run actual…» y «resuelto=true…»). El test `assertGreaterEqual(len(...), 3)` se cumple de forma artificial: cada capítulo solo tiene un falso positivo específico. Interesaría documentar al menos dos «intentos incorrectos razonables» propios de cada caso (§18.4).

**M3. `completionRequires` es idéntico en los 50 capítulos.**
Siempre incluye `requiredPatchPairVerified`, también en capítulos donde el propio diseño dice que no hay corrección:
- 01: «No hay vulnerabilidad que corregir»
- 02–04: la corrección se aplaza al 05
- 22: se aplaza al 24
- 25: «No aplica parche nuevo»
- 46: mejora de trazabilidad

Un validador construido con estos datos exigiría pruebas inexistentes. La §15 permite que una lección sin vulnerabilidad se complete localizando y comparando datos.

**M4. Arquitectura: no hay defensa frente a webs externas que ataquen los servicios en loopback.**
[ARQUITECTURA.md](docs/ARQUITECTURA.md) publica servicios **deliberadamente vulnerables** en `127.0.0.1` y `localhost`, pero no exige validar la cabecera `Host`. Cualquier web que el alumno visite en el mismo navegador podría usar *DNS rebinding* contra la tienda (por ejemplo, la previsualización SSRF del 43, o lecturas sin sesión) o contra el aula.
*Corrección:* lista blanca estricta de `Host` (`localhost:4310`, `127.0.0.1:4311`, `127.0.0.1:4312`) en todos los servicios, rechazar `Origin` desconocidos también en GET sensibles y documentar la limitación. Recomendar un perfil de navegador dedicado.

**M5. La inyección SQL (21–24) podría saltarse otros capítulos.**
La arquitectura pone usuarios, sesiones, pedidos y productos en una misma base de tienda por ejecución. Con un `UNION SELECT`, cosa que el alumno puede descubrir, se leerían sesiones o credenciales y se saltarían los capítulos 07–13 y 26–30. Tampoco se define el endurecimiento de SQLite.
*Corrección:* usar para el buscador una conexión de solo lectura a un fichero o vista que solo contenga `products`. Además: API de sentencia única (sin *stacked queries*), `load_extension` desactivado, `SQLITE_DBCONFIG_DEFENSIVE` y `trusted_schema=OFF`.

**M6. Las contraseñas ficticias se pueden adivinar.**
En [fixtures.json](content/es/campaign/fixtures.json) siguen el patrón `DEMO-<Rol>-<Nombre>!`. Tras ver `DEMO-Pera-Verano!` en el 06, se pueden deducir `DEMO-Soporte-Vera!` o `DEMO-Proveedor-Mercurio!` y saltarse la asignación masiva (13) o la autorización de exportaciones (40).
*Corrección:* generar las contraseñas aleatoriamente en cada ejecución, guardar en la base de la tienda solo hashes y mostrar las cuentas autorizadas desde el cuaderno.

**M7. No hay control de versiones ni integración continua.**
El directorio no es un repositorio git, así que no hay historial ni forma de revertir cambios en 475 ficheros editados a mano. `.gitignore` existe pero no se usa. Recomendado: `git init`, un primer commit y un flujo de CI que ejecute los tests de diseño.

### Bajos

- **B1. Faltan espacios antes de números (~80 casos).** Ejemplos: «las09:10», «pedido204», «Alba303», «a4311», «Etapa1», «zoom200 %», «fichas01–05». Aparecen en 11 ficheros de contenido del alumno (sobre todo `hint-4.json` de 11, 15, 32, 36, 42, 44 y 50), en `timeline.json` y en casi todos los documentos.
- **B2. Campos que empiezan en minúscula.** `debrief` (49/50), `learningObjective` (50/50) y `evidenceRequirements.observation` (50/50) están escritos como fragmentos y se leen mal en las fichas Markdown («## Cierre previsto» seguido de «identificar…»).
- **B3. Las fichas `docs/expediente-xx.md` muestran la respuesta antes de la pregunta.** En «Cierre previsto», `understandingAnswer` aparece justo antes de «**Pregunta:**». No hay script generador en el repositorio, así que fichas y JSON pueden divergir con el tiempo (hoy coinciden).
- **B4. La solución de profesor no aporta nada nuevo (49/50).** `solution` es idéntica a `hint-4` en todos los capítulos salvo el 19. Debería añadir algo: valores esperados exactos, cómo verificarlos y variantes válidas.
- **B5. El contrato TypeScript no se comprueba.**
  - No hay `tsconfig` y nunca se compila.
  - El JSON no se valida contra él.
  - `chapter-19.json` tiene `supportResources`, que no está en el contrato.
  - Los tipos `` `UG-${string}` `` y `` `S${string}` `` son demasiado laxos.
  - `isolationProfile` no tiene un valor para la copia de transferencia del 50.
- **B6. Faltan términos en el glosario.** No tienen entrada: nonce (19), consola (19), HMAC (45), código de estado HTTP (14) ni Herramientas de desarrollo / pestaña Red (02). «XSS» se menciona en el cierre del 17, antes de su entrada (19).
- **B7. Lectura de ficheros sin `encoding='utf-8'`.** `read_text()` no fija la codificación en [test_campaign.py](tests/design/test_campaign.py) ni en [check_design.py](scripts/check_design.py). En Windows con Python < 3.15 fallará con el texto en español, y el README solo pide «Python 3».
- **B8. `check_design.py` escribe valores fijos en el informe.** `hints: 200`, `acts: 10` y la fecha están escritos a mano, no calculados, y se escriben en [design-checks.json](reports/design-checks.json).
- **B9. Detalles menores.**
  - `mainWorldPolicy` está en inglés e idéntica en los 50 fixtures, también donde no hay ajustes vulnerables.
  - En el 01, «una clienta» (mensaje) frente a «un cliente» (`whyItMatters`).
  - En `hint-2` del 01, «después de producto?.» tiene una puntuación confusa.

## Puntos fuertes

- **Estado honesto.** Todos los indicadores dicen `functionalScenario=false` y un test impide afirmar lo contrario. Así lo exige la §19.
- **Decisiones técnicas correctas** (D01–D14):
  - CSRF entre orígenes *del mismo sitio* con `SameSite=Lax` (4312→4311 en la misma IP), sin desactivar protecciones del navegador.
  - Árbol de ficheros virtual para el *path traversal*.
  - SSRF con guardián de salida independiente.
  - XSS con `img onerror`, que sí se ejecuta con `innerHTML`, a diferencia de `<script>`.
  - Fronteras de caducidad 599/600/601 coherentes con `now < expiresAt`.
  - Barrera determinista para la condición de carrera.
  - HMAC sobre los bytes exactos del cuerpo.
- **Separación aula/tienda por host**, con cookies sin `Domain` y la del aula `Strict` y `HttpOnly`.
- **No se atribuye el incidente a nadie sin evidencia**: hay tests sobre `visitor-17`, el reintento legítimo de las 09:15 y el evento logístico sin relación demostrada.
- **Inventario central único** de productos, propietarios y cupón, verificado por tests, y una sonda SQLite real de la pareja verdadera/falsa.

## Cobertura OWASP Top 10 (2021)

| Categoría | Capítulos |
|---|---|
| A01 Control de acceso roto | 10, 13, 15, 36–37, 40, 42, 44 |
| A02 Fallos criptográficos | 45 (firma). Falta la aleatoriedad o entropía de los tokens |
| A03 Inyección | 17–24 (XSS, SQLi) |
| A04 Diseño inseguro | 31–35 (lógica de negocio) |
| A05 Configuración insegura | 14, 39, 41 |
| A06 Componentes vulnerables | **Sin cubrir** (coherente con la §21, que desaconseja usar versiones como prueba) |
| A07 Fallos de identificación y autenticación | 06–09, 26–30 |
| A08 Integridad de software y datos | 45 |
| A09 Registro y monitorización | 46 (parcial, como competencia de análisis) |
| A10 SSRF | 43 |

La cadena de suministro (A06:2021 / A03:2025) es la única familia sin ningún tratamiento. Si se quiere, podría tratarse en el 06 o el 40 como «recurso de terceros publicado», sin contradecir la §21.

## Siguientes pasos recomendados (antes de la Etapa 2)

1. `git init` y primer commit (M7).
2. Corregir A1–A3 en los datos y añadir los tests que los protejan.
3. Ajustar `completionRequires` por capítulo (M3) y escribir falsos positivos específicos (M2).
4. Añadir a [ARQUITECTURA.md](docs/ARQUITECTURA.md): validación de `Host`, aislamiento y endurecimiento de la base del buscador, y contraseñas por ejecución (M4–M6).
5. Pasada editorial automática de espacios y mayúsculas (B1–B2), y script generador de `docs/expediente-xx.md` (B3).
6. Planificar la reutilización de S30 y S42–S44 en 46–50 (M1).
