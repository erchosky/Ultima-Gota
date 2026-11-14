# Última Gota: los 50 expedientes

Juego narrativo de ciberseguridad en español, para empezar desde cero. **Los cuatro primeros actos, capítulos 01–20, ya funcionan localmente.** Los 50 están diseñados; los 30 restantes todavía no tienen escenarios ejecutables.

## Arrancar

Con Node 22.18+ de la rama 22:

```sh
npm ci
npx playwright install chromium
npm run build
npm start
```

Abrir **[el escritorio](http://localhost:4310)**. La tienda usa **[127.0.0.1:4311](http://127.0.0.1:4311)**; abrirla desde el expediente vincula las peticiones al escenario.

[Instalación, recuperación, profesor y Kali](docs/INSTALACION.md). Docker Compose está preparado, pero **no se ha ejecutado** aquí.

## Qué puedes hacer

Investigar fichas y peticiones reales, comparar JSON y pantalla, contrastar una edición local, investigar la campaña antigua, autenticar cuentas ficticias, comprobar cookies y logout y reproducir el acceso ajeno a pedidos. En11–15 puedes reenviar solicitudes XHR, editar una preferencia JSON, contrastar una capacidad interna, comparar estados HTTP y comprobar controles corregidos con pruebas permitidas y denegadas. En16–20 se investigan cantidades, texto y formato, el recorrido del mensaje y dos demostraciones locales de ejecución JavaScript en marco aislado, incluida una reseña entre sesiones. Las correcciones se contrastan sin deshacer los controles anteriores. Incluye buzón, pistas sin penalización, cuaderno, glosario, SQLite, exportación, archivo, reintentos y restablecimiento con confirmación. Las soluciones de profesor se entregan por separado con acceso explícito.

El recorrido de01–20 está probado en Chromium con Playwright. Firefox no pudo arrancar en la automatización de esta máquina. Todavía no se ha realizado una prueba con una persona principiante.

## Documentación y contenido editable

- [Estado real y siguiente trabajo](docs/ESTADO.md).
- [Catálogo de los 50 expedientes](docs/CATALOGO.md).
- [Diseño y decisiones](docs/DISENO.md), [habilidades](docs/HABILIDADES.md) y [evidencias](docs/EVIDENCIAS.md).
- [Pantallas](docs/PANTALLAS.md), [arquitectura](docs/ARQUITECTURA.md) y [plan de validación](docs/VALIDACION.md).

Textos en content/es/; los apoyos se editan en content/es/classroom/act-one-support.json, act-two-support.json act-three-support.json y act-four-support.json. Dos aplicaciones React, dos procesos Express y dos almacenamientos SQLite separados. El runner contrasta peticiones y usa un navegador aislado para verificar la presentación corregida.

## Comprobar

```sh
npm run typecheck
npm run build
npm run test:integration
npm run test:browser:all
npm run test:design
```

reports/ conserva resultados y capturas. Los tests utilizan datos temporales. La [especificación original](docs/ESPECIFICACION-ORIGINAL.md) se sigue por etapas, sin presentar el Acto I como campaña completa.
