# 47 · Cómo pudo encadenarse

Acto 10 · Copia histórica aislada · día 0 · hito 47 después de las 10:00 (sin duración impuesta)

**De: Lara**

Abrimos una copia histórica etiquetada. Las correcciones principales siguen guardadas y este escenario no las deshace. Reproduce el acceso con las credenciales expuestas y documenta dos ramas. Una llega a un pedido ajeno por falta de comprobación de propiedad; la otra añade una capacidad interna y después accede a la exportación de soporte. Comprueba sus dependencias en lugar de dibujar una única cadena obligatoria. La ampliación de permisos no era necesaria para el fallo de pedidos. Diferencia lo que reproduces ahora de los registros que respaldan el uso histórico. Nos detendremos en los objetos ficticios previstos, con su alcance mínimo demostrado.

**Importa porque:** el equipo necesita demostrar un recorrido completo desde la promoción antigua hasta el acceso indebido de la cuenta de pruebas.

**Reutiliza:** 06, 07, 08, 09, 10, 11, 12, 13, 40, 46

**Añade S47:** construir y verificar un recorrido de ataque con sus dependencias y posibles ramas.

**Objetivo:** trabajar en una copia histórica etiquetada, conservando las correcciones del mundo principal. Reproducir las credenciales expuestas y la sesión resultante; comprobar la rama de pedidos ajenos y la de ampliación de permisos seguida de acceso a la exportación. Registrar los límites de lo demostrado.

**Estado inicial:** fixture campaign-v1 y snapshot propio 47; cuentas demo.pera. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Es necesario concederse soporte para aprovechar un IDOR que afecta a cualquier cliente?

## Apoyo guiado

1. Un recorrido puede tener ramas con requisitos distintos.
2. Mira la copia histórica y el grafo del46.
3. Comprueba recurso de soporte antes y después del cambio de capacidades.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Un recorrido puede tener ramas con requisitos distintos.
2. Mira la copia histórica y el grafo del46.
3. Comprueba recurso de soporte antes y después del cambio de capacidades.
4. Recupera demo.pera del archivo, crea sesión y consulta204 como cliente. En otra rama verifica exportación soporte denegada, envía supportAccess:true y vuelve a exportación. Enlaza cada salto con evento nuevo.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Archivo→login y dos ramas reales; IDOR funciona sin soporte, exportación requiere capacidad; mundo principal conserva parches.

**No basta:** Llamar lineal a ambas ramas o confundir muestra pública del40 con exportación soporte.

**Cuaderno:** EV-47; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

la cadena se detiene en los datos ficticios previstos. Mara necesita decidir qué corregir primero.

Demuestra posibilidad técnica; el uso histórico necesita sus registros independientes.

**Pregunta:** ¿La reproducción actual demuestra por sí sola qué ocurrió a las08:55?

**Corrección:** Revocar credenciales, restringir campos, comprobar propiedad y autorización de exportación; controles independientes.

**Prueba positiva:** Clientes consultan pedidos propios y soporte autorizado su exportación.

**Prueba negativa:** Cadena histórica no alcanza datos privados en mundo corregido.

**Enlace:** OBJ-47 · Grafo de dependencias e impactos demostrados.

**Recuperación:** Reconstruir fixtures de chapter-47/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-47.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
