# 46 · El hilo entre las peticiones

Acto 10 · Escritorio y copia autorizada de tienda · día 0 · hito 46 después de las 10:00 (sin duración impuesta)

**De: Lara**

Tenemos registros de acceso, perfil, pedidos y logística que se solapan en el reloj. Para unirlos necesitamos algo más que cercanía temporal. Cada petición tiene una referencia; algunas comparten sesión y otras un identificador de operación. La mesa conserva el origen de cada registro y señala dónde falta una relación. Filtra el conjunto y reconstruye una secuencia respaldada. Busca también el reintento legítimo que no debemos mezclar con visitante-17. Una dirección de laboratorio o un nombre de archivo no identifica a una persona. Al cerrar este caso podrás abrir una copia histórica aislada para reproducir las ramas que la evidencia permite investigar.

**Importa porque:** Lara entrega registros de accesos, perfiles, pedidos y Mercurio con eventos que se solapan.

**Reutiliza:** 07, 08, 09, 10, 25, 33, 45

**Añade S46:** correlacionar eventos con identificadores de petición, sesión y operación, reconociendo sus límites.

**Objetivo:** filtrar un conjunto manejable y enlazar los registros de la misma operación sin identificar personas solo por una IP.

**Estado inicial:** fixture campaign-v1 y snapshot propio 46; cuentas reviewer. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Dos eventos cercanos en el tiempo pertenecen necesariamente a la misma operación?

## Apoyo guiado

1. Correlaciona por referencias estables y conserva los huecos.
2. Filtra registros por sessionRef, requestId y operationId.
3. Une acceso, perfil y pedido; contrasta Mercurio por separado.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Correlaciona por referencias estables y conserva los huecos.
2. Filtra registros por sessionRef, requestId y operationId.
3. Une acceso, perfil y pedido; contrasta Mercurio por separado.
4. Relaciona hist-session-17 entre08:52,08:54,08:55 y09:05; conserva descarga08:50 vinculada por actor sintético. Separa retry09:15 op-mercurio-7 y deja09:10 sin relación demostrada con esa sesión.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Grafo de eventos respeta sessionRef/actorRef/operationId; excluye reintento y conserva incertidumbre de09:10.

**No basta:** Unir por IP o por hora como prueba de identidad personal.

**Cuaderno:** EV-46; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

conservar procedencia y reloj de cada evidencia. Se desbloquea una copia histórica aislada para reproducir la cadena inicial.

Relaciona actividad de esa sesión, sin identificar por sí solo a una persona física.

**Pregunta:** ¿Qué permite afirmar un sessionRef compartido?

**Corrección:** Mejorar trazabilidad manteniendo minimización; sin inventar relaciones faltantes.

**Prueba positiva:** Secuencia con identificadores coincidentes se reconstruye.

**Prueba negativa:** Evento de operación distinta no se integra por proximidad temporal.

**Enlace:** OBJ-46 · Grafo parcial y autorización de copia histórica.

**Recuperación:** Reconstruir fixtures de chapter-46/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-46.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
