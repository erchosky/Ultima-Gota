# 10 · Ese pedido no es mío

Acto 2 · Escritorio y copia autorizada de tienda · día 0 · hito 10 después de las 10:00 (sin duración impuesta)

**De: Alba**

Soy Alba. Al consultar mi pedido apareció información que no reconocía y envié una captura a Mara. Vera ha preparado dos cuentas ficticias para repetir la comprobación con permiso. Mi pedido es el 203; el 204 pertenece a Bruno. Primero comprueba quién reconoce el servidor y consulta el pedido propio. Después cambia únicamente el identificador del pedido manteniendo mi sesión. Contrasta por separado el acceso del propietario. No necesitas adivinar números ni buscar más clientes. Quiero saber si la tienda comprueba quién puede ver cada pedido, con una prueba mínima que no convierta mi queja en una explicación inventada de todo el incidente.

**Importa porque:** Alba afirma haber visto el pedido de Bruno. Vera proporciona dos cuentas y dos pedidos ficticios con propietarios conocidos.

**Reutiliza:** 01, 02, 03, 07, 08, 09

**Añade S10:** comprobar autorización por objeto entre dos cuentas.

**Objetivo:** consultar el pedido propio de Alba y cambiar únicamente el identificador por el de Bruno, manteniendo la sesión de Alba. Después contrastar con la sesión del propietario.

**Estado inicial:** fixture campaign-v1 y snapshot propio 10; cuentas Alba, Bruno. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Estar autenticada como Alba debería permitir leer el pedido 204 de Bruno?

## Apoyo guiado

1. Conocer el número de un objeto no concede permiso sobre él.
2. Compara la identidad de Mi cuenta con el propietario de los pedidos 203 y 204.
3. Mantén sesión de Alba y cambia el identificador de 203 a 204 en la consulta.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Conocer el número de un objeto no concede permiso sobre él.
2. Compara la identidad de Mi cuenta con el propietario de los pedidos 203 y 204.
3. Mantén sesión de Alba y cambia el identificador de 203 a 204 en la consulta.
4. Entra como Alba, comprueba /api/me, abre /pedido?id=203 y cambia a 204. Conserva la respuesta con ownerId de Bruno y repite 204 como Bruno en otra sesión autorizada.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Sesión Alba recibe pedido204 propietario Bruno; control Alba203 y Bruno204 válidos, todos del run activo.

**No basta:** Acceso a 204 solo como Bruno, números adivinados o cambio del texto del propietario.

**Cuaderno:** EV-10; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

presenta IDOR tras explicar el fallo en lenguaje sencillo. Los pedidos incluyen una referencia al conector Mercurio.

El servidor debe comprobar autorización de esa cuenta sobre el pedido solicitado: conocer el ID no basta.

**Pregunta:** ¿Qué comprobación falta aunque la cuenta haya iniciado sesión?

**Corrección:** Comprobar ownerId o capacidad explícita antes de serializar el pedido. Se consolidará en el 15.

**Prueba positiva:** Alba consulta 203 y Bruno consulta 204.

**Prueba negativa:** Alba no obtiene datos de 204 en la versión corregida.

**Enlace:** OBJ-10 · Muestra mínima del acceso cruzado y referencia Mercurio.

**Recuperación:** Reconstruir fixtures de chapter-10/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-10.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido completo verificado en Chromium. Comparaciones06/07/10 en copias separadas; controles08/09 comprobados como comportamiento correcto. Firefox, Docker y prueba con persona principiante pendientes. Ver reports/browser-act-two-validation.json.
