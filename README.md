# Última Gota

Un laboratorio local en español para aprender ciberseguridad investigando una historia. Una tienda ficticia, sus personajes y sus problemas conectan cada práctica con un caso concreto.

Hay 50 expedientes escritos y 20 capítulos implementados. Los capítulos 21–50 todavía necesitan escenarios ejecutables. Las vulnerabilidades de práctica forman parte del material didáctico; utiliza una copia local autorizada.

[Qué es y para qué sirve](#qué-es-y-para-qué-sirve) · [Estado real de esta entrega](#estado-real-de-esta-entrega) · [Qué significa «mejorarlo» aquí](#qué-significa-mejorarlo-aquí) · [Personajes y continuidad](#personajes-y-continuidad) · [Instalar y arrancar](#instalar-y-arrancar) · [Dónde está cada cosa](#dónde-está-cada-cosa)

---

## Qué es y para qué sirve

Última Gota es una pequeña tienda de zumos con tienda física, almacén y una web que ha crecido entre promociones, integraciones y arreglos urgentes. Una clienta, Alba, avisa de que al consultar su pedido ha visto información de Bruno. Mara, la dueña, necesita entender qué ha pasado antes de ampliar el negocio.

El jugador entra como aprendiz del equipo de revisión, acompañado por Lara. Trabaja en una copia autorizada de la tienda. Primero aprende a reconocer una dirección y consultar productos; más adelante investiga peticiones, sesiones, permisos y otros comportamientos. Cada expediente conecta una necesidad de la tienda con una habilidad nueva y utiliza parte de lo aprendido antes.

La idea es que el jugador entienda **por qué existe cada función, por qué alguien la necesita, qué observa y qué puede concluir**. La historia debe dar sentido a las prácticas: no limitarse a decorar una lista de ejercicios.

El recorrido combina encargo, predicción, experimento, observación, evidencia, explicación y comprobación. Hay buzón, pistas, cuaderno, glosario y un modo profesor explícito. El laboratorio también enseña a comparar correcciones, pero esa comparación forma parte del ejercicio: no hay que arreglar de antemano todas las copias vulnerables y dejar al alumno sin nada que investigar.

## Estado real de esta entrega

- **50 expedientes diseñados y con contenido escrito**, organizados en 10 actos.
- **Capítulos 01–20 implementados.** La documentación e informes existentes recogen pruebas de integración y recorridos en Chromium.
- **Capítulos 21–50 pendientes de escenarios ejecutables.** Tener su ficha, sus pistas o su plan no significa que ya se puedan jugar.
- Firefox, Safari, Kali, Docker y la experiencia con una persona principiante tienen límites o verificaciones pendientes descritos en [ESTADO.md](docs/ESTADO.md).

Este ZIP conserva el estado del proyecto al empaquetarlo. La preparación del ZIP y de estas guías no implementa capítulos ni constituye una nueva comprobación de funcionamiento del juego. El historial técnico está en [el README anterior](docs/README-TECNICO-ORIGINAL.md), [ESTADO.md](docs/ESTADO.md), `progress.md` y `reports/`.

## Qué significa «mejorarlo» aquí

La prioridad de esta entrega es mejorar la experiencia narrativa y educativa:

- Explicar mejor cómo nació la web y cómo llegó a su situación actual, respetando los hechos ya establecidos.
- Dar a los personajes motivaciones, voz y necesidades reconocibles.
- Conectar cada encargo con lo ocurrido antes y con la siguiente investigación.
- Enseñar cada concepto antes de pedir que se utilice, con ejemplos y pistas progresivas.
- Hacer que el jugador descubra y razone, sin entregarle automáticamente la solución.

No hace falta reescribir el proyecto para eso. Los textos están principalmente en archivos JSON editables. Una revisión de lore no autoriza una refactorización general, eliminar fallos de práctica, completar automáticamente expedientes, cambiar validadores ni sustituir peticiones reales por una simulación visual.

La guía para IA concreta qué puede editarse y qué contratos deben conservarse. Incluye un encargo listo para copiar.

## Personajes y continuidad

| Personaje | Papel en la historia |
| --- | --- |
| Lara | Mentora paciente: explica lo necesario y pide pruebas antes de aceptar conclusiones. |
| Mara | Dueña de la tienda: necesita proteger a sus clientes y mantener el negocio. |
| Nico | Desarrollador: conoce las decisiones técnicas y las prisas que las motivaron. |
| Vera | Soporte: aporta casos y ayuda con cuentas ficticias autorizadas. |
| Sam | Almacén: conecta productos, inventario, pedidos y entregas. |
| Ivo | Antiguo colaborador: su código es relevante, sin que eso demuestre una intención maliciosa. |
| Alba y Bruno | Clientes ficticios cuyos pedidos permiten aprender sobre privacidad y propiedad. |

Mercurio es una integración ficticia de catálogo y logística. `visitante-17` es una etiqueta en registros del laboratorio; no identifica a una persona.

El relato diferencia una observación actual, una hipótesis, un registro histórico y una limitación. Encontrar un fallo durante la revisión no demuestra que se utilizara en el incidente. La cronología completa es material editorial y de profesor, no una introducción que deba mostrarse al alumno.

## Instalar y arrancar

Este es un **ZIP del proyecto sin dependencias instaladas**. No es una aplicación autónoma ni funciona abriendo un HTML con doble clic.

Necesitas Node.js **22.18 o posterior de la rama 22**, npm e Internet para descargar los paquetes y Chromium durante la instalación. Las versiones requeridas están en `package.json` y `package-lock.json`; esos archivos se incluyen porque permiten reconstruir el entorno.

Descomprime el ZIP y abre una terminal dentro de la carpeta `Ultima-Gota/`:

```sh
npm ci
npx playwright install chromium
npm run build
npm start
```

Abre el escritorio en **http://localhost:4310**. Abre la tienda desde el enlace del expediente; utiliza **http://127.0.0.1:4311**. Conserva esos nombres: la separación entre el aula y la tienda forma parte del funcionamiento del laboratorio. El puerto 4313 es un canal interno entre servicios.

Para detenerlo, pulsa **Ctrl+C** en la terminal. Si cambias código, detén, ejecuta `npm run build` y arranca otra vez. `npm run dev` construye y arranca, pero no ofrece recarga automática.

No necesita cuentas externas, claves de proveedores, correo real, pagos reales ni una IA para jugar. Algunas comprobaciones internas necesitan el Chromium instalado mediante Playwright.

La ejecución crea `.runtime/` con bases SQLite y una clave interna propia de esa instalación. El ZIP no incluye el progreso, las sesiones ni la clave de la instalación de origen. Si quieres trasladar una partida, utiliza la exportación del juego. No borres `.runtime/` para reintentar: usa las acciones del aula.

Consulta [INSTALACION.md](docs/INSTALACION.md) para recuperación, modo profesor, Docker y máquinas virtuales. La configuración Docker se incluye, pero su ejecución no está acreditada en la documentación de esta versión.

## Dónde está cada cosa

| Ruta | Contenido |
| --- | --- |
| `content/es/chapters/` | Fichas de expedientes, entradas narrativas, objetivos, cierres y pistas. |
| `content/es/classroom/` | Apoyos didácticos de los cuatro actos implementados. |
| `content/es/campaign/` | Actos, habilidades, objetos, cronología y datos ficticios compartidos. Parte contiene revelaciones futuras. |
| `content/es/glossary/` | Glosario para principiantes. |
| `content/es/instructor/` | Material de profesor y soluciones; no mostrar por defecto al alumno. |
| `scenarios/` | Planes y datos de los escenarios; algunos todavía no son ejecutables. |
| `apps/classroom/` | Interfaz del escritorio de investigación. |
| `apps/storefront/` | Interfaz de la tienda ficticia. |
| `services/` | APIs del aula y tienda, persistencia y comprobación de escenarios. |
| `shared/`, `contracts/`, `config/` | Tipos, contratos, estado compartido y topología. |
| `tests/`, `scripts/` | Pruebas, arranque y utilidades. |
| `docs/` | Especificación, diseño, catálogo, arquitectura y estado. |
| `reports/`, `output/` | Informes y capturas anteriores, incluidos para conservar evidencia e historial. |
| `dist/` | Compilación existente; se recomienda regenerarla con `npm run build`. |

## Qué incluye y qué se ha excluido del ZIP

Se conserva el código, el contenido, las configuraciones, el archivo de versiones, la documentación, las pruebas y la evidencia existente. También se incluyen las guías de esta entrega y un inventario `MANIFIESTO-ARCHIVO.json` con tamaño y SHA-256 de cada archivo del paquete, salvo el propio manifiesto.

Se excluyen `node_modules/`, navegadores descargados, cachés, sesiones de automatización, archivos del sistema, datos SQLite de ejecución, archivos de entorno privados y claves internas. Esos elementos no forman parte del código compartible. El archivo de versiones `package-lock.json` sí se conserva. No se han eliminado dependencias necesarias del código ni convertido la aplicación en un proyecto sin bibliotecas.

Los informes y capturas contienen datos ficticios del laboratorio y pueden mostrar detalles de soluciones. Son material de desarrollo y profesor, no contenido para desbloquear al principio de la partida.

## Comprobar cambios futuros

Con las dependencias y Chromium instalados:

```sh
npm run typecheck
npm run build
npm run test:integration
npm run test:browser:all
npm run test:design
```

La comprobación documental utiliza también Python 3. Los informes existentes describen ejecuciones anteriores; una IA debe indicar qué comprobó después de sus cambios y qué sigue pendiente, sin presentar resultados antiguos como pruebas nuevas.

Para continuar, lee [LEEME-PARA-IA.md](LEEME-PARA-IA.md), [DISENO.md](docs/DISENO.md), [CATALOGO.md](docs/CATALOGO.md) y [ESTADO.md](docs/ESTADO.md). La [especificación original](docs/ESPECIFICACION-ORIGINAL.md) conserva la premisa y el recorrido completo.
