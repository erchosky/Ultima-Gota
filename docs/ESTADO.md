# Estado durable del proyecto

Actualización: 26 de octubre de2026 · versión0.5.0.

## Objetivo y estado real

Campaña final de50 expedientes. **El objetivo completo sigue pendiente.** Los50 están diseñados y escritos. **Actos I, II, III y IV:01–20 funcionales, con integración y recorridos Chromium aprobados.** 21–50 conservan contenido y planes, sin escenarios ejecutables.

## Implementado

- Escritorio React/Express localhost:4310, tienda React/Express127.0.0.1:4311, control autenticado4313 de loopback. SQLite de progreso y tienda separados. Sin cuentas reales ni claves de proveedores.
- 01–05: productos, peticiones, JSON/pantalla, edición local declarada y corrección de presentación comprobada en navegador aislado.
- 06–10: recurso público ficticio, login/perfil, cookies reales, revocación de sesión al salir y acceso cruzado Alba203→Bruno204. Propietarios inmutables. Precio corregido heredado después05.
- 11: mesa didáctica con XHR real, reenvío sin cambios, referencias distintas y misma sesión. El servidor rechaza reutilizar una referencia o mezclar sesiones. También probado Network.replayXHR nativo por CDP; no se acredita menú visual de DevTools ni Firefox.
- 12: PATCH /api/profile acepta notificationPreference y GET /api/me confirma persistencia. No se trata como vulnerabilidad.
- 13: supportAccess modifica una capacidad real en copia vulnerable; /api/support/summary pasa de403 a200. Campo role desconocido se rechaza. Comparación corregida permite preferencia y bloquea asignación interna. Extracto mínimo histórico de08:54 tras completar, sin atribución personal ni cronología completa.
- 14: seis respuestas reales para cinco códigos: Vera/soporte200, anónimo401, cliente403, referencia numérica400, producto999404 y ruta heredada200 con allowed:false. Error vulnerable muestra mercurio/catalog ficticio; propuesta limpia conserva resultado válido.
- 15: práctica y propuesta corregida en runs separados de la misma campaña/generación. Alumno reproduce fallos y prueba parejas. Un tercer contexto independiente comprueba pedido propio, ajeno sin datos, Bruno204, preferencia persistida, capacidad bloqueada, soporte legítimo y error sin ruta/traza. Se conservan order-ownership, profile-allowlist y public-errors en campaign.patches.
- 16: pedido901 separado de203/204. Formulario1–20 frente a quantity0 persistido; comparación acepta1/20 y rechaza0,-1,0.5,21 sin cambiar la línea anterior. Sin cobros.
- 17: descripción guardada idéntica en campo literal y campo que crea strong. Reproducción limpia, sin equiparar formato con ejecución.
- 18: marca única en parámetro mensaje, URLSearchParams, #mensaje e innerHTML. El fragmento público coincide con el que se ejecuta en el marco.
- 19: muestra explicada progresivamente, manejador de imagen local y marca con identificador de ejecución. Se rechaza marca manual; Chromium limpio reproduce desde la entrada. Propuesta textContent conserva texto y evita efecto.
- 20: reseña persistida por Alba, leída y representada como Bruno en otra sesión; evaluador limpio abre esa referencia exacta. Propuesta muestra reseña como texto. No se atribuye este hallazgo al incidente histórico.
- Cuaderno, pistas, glosario, modo profesor explícito, archivo, reintento, reset con confirmación y recuperación. Contenido versión4 conserva formato ug-progress/1; acepta versiones1/2/3 limitadas a05/10/15. Correcciones ya comprobadas sobreviven sin comprensión y tras reintento/importación, sin acreditar evidencia nueva.
- Contraseñas ficticias fuera de progreso ordinario/exportaciones: solo se recuperan por elección explícita tras checkpoint06 y se muestran en campos password. Sesiones guardan hash, referencia, revocación y vencimiento24h.

## Evidencia ejecutada

- Typecheck y build de ambas aplicaciones correctos.
- **26/26 integración** en reports/integration.tap. Incluye scopes de campaña/ejecución, sesiones, recuperación1/2/3/4 y cancelación de comparación sin perder nota concurrente.
- **ActoI:16**, **ActoII:17**, **ActoIII:17**, **ActoIV:21** comprobaciones en reports/browser-validation.json, reports/browser-act-two-validation.json reports/browser-act-three-validation.json y reports/browser-act-four-validation.json. Cero errores inesperados; denegaciones previstas separadas.
- Capturas inspeccionadas en reports/browser-act-three/ y reports/browser-act-four/, con cuerpos y estados de las respuestas, escritorio y móvil. Axe de la mesa11 y descripciones17 y comprobaciones de actos anteriores. No equivale a auditoría con lector de pantalla.
- Cliente original de develop-web-game ejecutado en escritorio, mesa11 y campaña18; estados y capturas en output/act-three-client-* y output/act-four-client-message/. La mesa anónima devuelve401 esperado; no se confunde con fallo de JavaScript.
- Integridad documental del catálogo y estados en reports/design-checks.json. No sustituye pruebas HTTP.

## Decisiones y rutas que no hay que perder

1. ug_lab identifica la copia; ug_store autentica cuenta; ug_classroom pertenece a localhost. Cada launch limpia la cuenta. Fallback de copia0.2 conservado sin borrar bases.
2. Nuevas tablas/columnas aditivas en store-api/accounts.ts y db.ts. Perfil, soporte y errores en store-api/act-three.ts; validación/comparación en scenario-runner/act-three.ts. No cambiar propietarios203 Alba,204 Bruno,205 demo.
3. Comparaciones no retiran el run de práctica. Las del verificador se retiran al terminar conservando registros. En15 comparisonRunId referencia la copia del alumno. X-UG-Copy evita enviar desde una pestaña vinculada a otra copia; cerrar práctica antes de abrir propuesta.
4. Las mutaciones del aula siguen serializadas hasta terminar el handler aunque el navegador cancele la conexión. No volver a ligar liberación de cola al evento close.
5. El11 utiliza mesa sin consola. La documentación Chrome «Edit and resend as fetch» abre Console; CDP ReplayXHR y menú visual son pruebas distintas. D20–D23 en DISENO.md documentan ajustes.
6. Importaciones conservan correcciones históricas sin runs activos. No son prueba antitrampas ni nuevas peticiones. Al reintentar, patchCurrent requiere informe del run nuevo; el control principal anterior permanece.
7. Apoyos por acto en content/es/classroom/act-{one,two,three,four}-support.json. No enviar soluciones completas, validadores ni cronología editorial al alumno. La API publica solo lo desbloqueado/pedido.
8. Mantener informes Chromium y Firefox separados. La carpeta inicial no es un repositorio Git; no se ha creado uno ni publicado nada.

9. Recinto de contenido: store-api/practice-frame.ts, atributo y CSP sandbox allow-scripts sin allow-same-origin. Bootstrap con nonce CSP privado de respuesta; hash únicamente del manejador local. El demo_nonce público del run es distinto. Sin unsafe-inline, eval ni destinos de conexión.
10. shared/act-four.ts admite texto corriente, strong fijo y muestra exacta de marca cuando procede. No ampliar a JavaScript arbitrario ni debilitar la CSP principal para enseñar variantes. Entrada en URL real del marco; datos almacenados serializados de forma segura.
11. postMessage solo actualiza la indicación visual y comprueba e.source. La acreditación17–20 viene de scenario-runner/act-four.ts en contexto nuevo, desde SQLite o ruta fija, sin cookie de aula. Evidence.verification conserva reproducción y se importa como histórica.
12. Nuevas tablas practice_orders, practice_content y practice_reviews por run; quantity_checked, description_text, message_text, review_text y demo_nonce son columnas aditivas.16/17 usan demo.pera en copia anterior a revocación;18+ hereda revocación.
13. campaign.patches incorpora quantity-rule en16, dom-message-text en19 y review-text en20. Las comparaciones17/18 son propuestas que no afirman que el formato sea XSS. Conservar las correcciones del15 y los propietarios originales.

## Límites vigentes

Firefox no arranca aquí («Could not find profile folder»); no se repite sin cambio de entorno. Docker daemon/Compose no disponibles: configuración revisada, sin build ni ejecución acreditados. Pendientes Safari, Kali, lector de pantalla y persona principiante. Procesos locales comparten usuario del sistema; aislamiento de contenedores/red futura no probado.

Las muestras de ejecución del19/20 son locales y acotadas dentro del marco; no acreditan una tienda de producción ni XSS arbitrario. Todavía no hay SQLi, archivos, SSRF ni auxiliar4312 ejecutables. Conservar30 capítulos pendientes.

## Siguiente fase concreta · ActoV21–25

1. Leer fichas21–25 y sus contratos.21: tabla/fila/columna y SELECT fijo que devuelve1/2.22: repetir alternancia búsqueda normal/comilla, conservando la conclusión de hipótesis.23: pareja verdadera/falsa ejecutada en SQLite.24: parametrización comparada con uso legítimo.25: cronología parcial y separación de hechos/hipótesis/límites.
2. Usar un catálogo de práctica SQLite separado por run, sembrado con productos ficticios. La tabla products actual almacena JSON: no adaptar a ciegas la consulta docente sobre ese esquema. Nunca apuntar SQL de alumno a la base de progreso, secretos o credenciales.
3. Restringir la mesa docente a consultas/muestras previstas;21 no acepta SQL arbitrario. La inyección didáctica debe ejecutar una consulta real del catálogo acotado. Conservar control de propiedad, perfil, errores, cantidades y destinos de texto del20.
4.25 debe mostrar solo el subconjunto canónico autorizado de timeline.json. El cambio de soporte08:54 ya se reveló en13. No atribuir SQLi ni XSS al incidente sin evidencia; no identificar a visitante-17 ni mostrar registros futuros.
5. Ampliar shared/campaign.ts a25 y contenido5 junto a implementación. recovery.ts tiene límite regex20 y cálculo de5 capítulos por versión: añadir compatibilidad4→20 deliberadamente. Mantener Evidence.verification y correcciones históricas al recuperar/reintentar.
6. Añadir módulo de escenario y apoyos act-five separados. Las parejas manuales24 requerirán ampliar comparison-link más allá de15 si el contrato pide realizarlas en ambas copias.
7. Probar transición20→21, consultas reales, entrada mínima, parejas, parametrización, cronología sin datos futuros, recuperación y regresión01–20. Actualizar indicadores21–25 solo tras evidencia. Mantener informes y cliente original de la skill.

Arranque: npm start después de npm run build; instrucciones en README.md e INSTALACION.md. Los servicios temporales de pruebas se retiran al terminar. No hace falta aprobación adicional para continuar el encargo local.
