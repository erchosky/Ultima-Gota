Original prompt: Construir Última Gota: los 50 expedientes siguiendo docs/ESPECIFICACION-ORIGINAL.md. La primera entrega diseñó los 50; el usuario autoriza continuar: «Dale caña».

## Etapa 2 · en curso

Implementar 01–05 con dos procesos, SQLite separado, contenido filtrado, pruebas de peticiones reales, cuaderno y recuperación. Mantener 06–50 como diseñados hasta implementar cada acto. Docker está instalado pero su daemon no responde; no se ha alterado ni iniciado otra aplicación para resolverlo.

Usar DOM accesible para el juego de investigación, no un canvas que convierta lectura y formularios en una imagen. Exponer render_game_to_text y advanceTime para el cliente de pruebas; no hay reloj de animación relevante en este acto.

## Etapa2 implementada

- Apps React separadas, APIs Express, SQLite independiente, tickets de un uso, eventos por run/campaña/generación y validación01–05.
- Corrección del precio comprobada con Chromium aislado; informe persistido en cuaderno/exportación.
- Exportación/importación, archivo, restablecimiento confirmado y recuperación; sesiones y progreso sobreviven reinicio.
- 8 pruebas de integración y recorrido Chromium completo; axe inicio/recuperación, teclado/foco y móvil. Capturas en reports/browser.
- Se corrigió arranque de primera sesión, contraste y nombres de landmarks. Un test de bundle se ajustó para distinguir nombres de campos de contenido privado real.
- Firefox falla al iniciar con «Could not find profile folder» aun con perfil nuevo. Docker daemon y Compose no disponibles. No se afirma verificación de ninguno.
- Siguiente:06–10 y transición desde05; no alterar los otros45 estados hasta implementar y probar.

Comprobación final: typecheck/build correctos; 8/8 integración, 16 comprobaciones del recorrido Chromium y 20/20 integridad documental. Cliente original de la skill ejecutado sobre escritorio y tienda; estados y capturas inspeccionados sin errores de consola. No se creó repositorio Git: la carpeta inicial no lo era.

## Acto II · implementación en curso

06–10: rutas de campaña y recurso público preparado, tablas aditivas de usuarios/pedidos/sesiones por ejecución, login/logout/perfil y acceso por objeto. Separamos ug_lab (copia) y ug_store (cuenta) para no fingir ausencia de sesión antes del acceso en08. Validadores específicos y comparaciones en copias separadas para06/07/10. Precio corregido se hereda después de05. Contenido de ayuda separado y compatibilidad de exportaciones versión1→2. Pendiente: ejecutar integración y navegador, corregir fallos y actualizar indicadores SOLO tras pruebas. No se ha acreditado todavía ningún nuevo capítulo como verificado.

## ActoII terminado ·0.3.0

06–10 funcionales: recurso JavaScript público de copia, cuenta demo, sesiones reales, ug_lab/ug_store separadas, logout y acceso cruzado Alba203/Bruno204. Comparaciones06/07/10 aisladas; precio heredado desde05; campo interno de permisos todavía NO implementado. Credencial de laboratorio ocultada en progreso/exportaciones y recuperada explícitamente desde checkpoint06.

Verificado: typecheck/build;16/16 integración (incluye cancelación de comparación+nota concurrente); recorridos Chromium de01–05 (16 comprobaciones) y06–10 (17), cero errores inesperados. Se corrigieron región de estado sin landmark y foco al cambiar de pantalla. Capturas inspeccionadas. No se ha reintentado Firefox ni Docker sin cambio del entorno.

Para continuar sin reconstruir contexto: docs/ESTADO.md contiene decisiones D16–D19 y pasos del ActoIII11–15. Extender seedAccounts/roles, no cambiar propietarios; conservar compatibilidad de contenido1/2 y añadir versión nueva. Resolver primero el reenvío del11 sin fingir compatibilidad Firefox ni exigir consola a un principiante. Estados11–50 siguen pendientes.

## Acto III · cierre de implementación0.4.0

11–15 implementados y recorrido propio Chromium aprobado (17 comprobaciones): mesa XHR con referencias nuevas, reenvío nativo CDP comprobado, PATCH de preferencia persistida, supportAccess con autorización real, seis casos para cinco estados HTTP y dos copias de práctica/corrección en15. No se acredita el menú visual de DevTools ni Firefox. La opción documentada de Chrome «Edit and resend as fetch» abre consola: la mesa didáctica evita exigir programación no enseñada.

Se conserva un extracto histórico mínimo de08:54 tras completar13, sin revelar toda la línea temporal. Permisos se controlan en servidor; los nombres/roles no se pueden autoasignar. Nuevas columnas aditivas y exportación de contenido3; acepta1/2 limitadas a05/10. Corrección confirmada antes de comprensión se conserva en recuperación/reintento sin conceder un logro nuevo. X-UG-Copy rechaza pestañas de otra copia.

En curso: regresión completa, inspección de capturas, actualización documental e indicadores; no convertir16–50 en implementados. Siguiente fase: Acto IV16–20. El escenario nuevo deberá heredar los tres controles del15 desde campaign.patches, con copia histórica etiquetada cuando precise un fallo antiguo.

## ActoIII terminado ·0.4.0

Verificación final: typecheck/build correctos;21/21 integración; ActosI/II/III con16/17/17 comprobaciones Chromium;20/20 integridad documental. Cliente original de la skill ejecutado en escritorio y mesa11, capturas/estados inspeccionados. Su401 al consultar perfil sin cuenta es esperado y está conservado, no un error JS. Capturas de15 muestran400 de campo interno, perfil false+daily y soporte403. Recorridos con cuentas ficticias validan actividad real; no menú visual, Firefox ni Docker.

Indicadores11–15 actualizados solo tras pruebas. README,INSTALACION,CATALOGO,DISENO,ARQUITECTURA,VALIDACION y fichas11–15 sincronizados. Estado de continuación en docs/ESTADO.md:16–20, controles del15 heredados, recinto XSS independiente y compatibilidad de contenido3→4. Preview propio detenido al cerrar; arrancar con npm start. No repositorio Git ni publicación externa.

## ActoIV · implementación en curso26/10

16–20: regla quantity, HTML literal/formato, recorrido URL→destino, ejecución DOM y reseña persistida. Recinto decidido: iframe con sandbox allow-scripts (sin allow-same-origin), CSP propia con bootstrap nonce y hash de UN manejador local. Entrada acotada a texto, strong fijo y muestra de marca con nonce del run; no JavaScript arbitrario. CSP principal permanece estricta. Validadores reproducirán desde datos/entrada en contexto limpio, no confiarán en postMessage del alumno.

Nuevas tablas de práctica separadas; control de propiedad/perfil/errores del15 heredado en16+. Cuenta demo16/17 solo en copia etiquetada anterior a revocación. Contenido4 conservará importación3 limitada a15. Todavía no acreditados nuevos capítulos: pruebas y UI pendientes.

## ActoIV · pruebas de escenarios y recorrido propio aprobadas

Los5 casos nuevos de integración pasan tras corregir la espera del marcador: #marca no tiene caja visible; se observa el atributo unido al DOM y el resultado textual, no waitFor visible. La ejecución era real. Axe detectó landmarks sin nombres únicos entre tienda y marco; ahora se etiquetan ambos. Recorrido Chromium del acto:21 comprobaciones; detecta marca manual sin entrada como falso positivo, muestra real, cookies/parent inaccesibles, segunda sesión, reinicio y recuperación. Sin solicitudes exteriores ni errores inesperados. Capturas y cliente original inspeccionados. Regresión01–20 y documentación en curso.

## ActoIV terminado ·0.5.0

01–20 funcionales;21–50 continúan diseñados. Regresión completa:26/26 integración; cuatro recorridos Chromium con16/17/17/21 comprobaciones, sin errores inesperados;20/20 integridad documental. Capturas de literal/formato, muestra real, reseña en Bruno y móvil inspeccionadas. Cliente original ejecutado sobre18, estado y captura coherentes y sin errores. Añadida sonda de connect-src bloqueado al marco; cookies y documento padre inaccesibles comprobados.

Nuevos controles principales: quantity-rule16, dom-message-text19, review-text20. El marco usa sandbox opaco, bootstrapnonce y hash del manejador; demo_nonce público distinto. Solo se admite texto, strong fijo y muestra exacta local: no ampliar a JS arbitrario. El20 lee referencia exacta del servidor como Bruno en limpio. Importación1/2/3/4 conserva límites05/10/15/20, reproducciones históricas y correcciones.

Se corrigió espera de atributo en marca sin caja visible y nombres de landmarks. No se ocultaron errores JS como éxito. Documentación y estados16–20 sincronizados. Para seguir: docs/ESTADO.md, ActoV21–25. Catálogo de práctica SQLite con consultas reales acotadas, comparación parametrizada y cronología parcial sin atribuir abuso SQLi/XSS histórico. Mantener controles heredados, pruebas anteriores y compatibilidad4→5. Firefox/Docker/Kali/Safari y ensayo humano siguen pendientes. No repositorio Git ni publicación externa.

## Corrección de mensajes de evidencia · 26/10

En el expediente 01 se reprodujo un rechazo: faltaba cargar el producto 2 en la copia vinculada y, después, el nombre anotado no coincidía con «Pera del huerto». Los errores de contraste se mostraban al inicio de la página y podían quedar fuera de la vista. Ahora aparecen junto al botón; se explica el bloqueo de comprensión y se pide copiar el nombre completo. Comprobados typecheck, build y recorrido Chromium 01–05, incluida una prueba de rechazo y conservación de campos. La pestaña abierta necesita recargarse para recibir el cambio; el texto del formulario aún no enviado se perderá al recargar.
