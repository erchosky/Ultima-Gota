# 13 · Un permiso que nadie te dio

Acto 3 · Escritorio y copia autorizada de tienda · día 0 · hito 13 después de las 10:00 (sin duración impuesta)

**De: Lara**

El perfil devuelve también capacidades internas. No son preferencias personales: deciden qué funciones puede usar una cuenta. En una copia histórica aparece un cambio de capacidades a las 08:54, pero todavía debemos entender el mecanismo. Nico ha preparado una actualización de perfil vulnerable y un recurso ficticio reservado a soporte. Vamos a comprobar si enviar un campo adicional puede cambiar una autorización que el cliente no debería decidir. La cuenta comenzará como cliente, igual que antes. Primero registra la denegación inicial y después contrasta el efecto de la actualización. No confundas el nombre que muestra el perfil con un permiso realmente utilizado por el servidor.

**Importa porque:** el historial de la cuenta de pruebas muestra un cambio inesperado en sus capacidades de soporte.

**Reutiliza:** 03, 10, 12

**Añade S13:** comprobar si el servidor acepta un campo interno que el cliente no debe controlar.

**Objetivo:** en la copia del escenario, añadir a la actualización de perfil un campo interno de capacidad de soporte y comprobar su efecto en un recurso ficticio restringido.

**Predicción:** ¿Una cuenta cliente debería poder concederse una capacidad interna editando su perfil?

## Apoyo guiado

1. El servidor debe distinguir preferencias y capacidades internas.
2. Compara la actualización del perfil con la comprobación del recurso de soporte.
3. Prueba el campo de capacidad explicado por Nico y vuelve al recurso restringido.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. El servidor debe distinguir preferencias y capacidades internas.
2. Compara la actualización del perfil con la comprobación del recurso de soporte.
3. Prueba el campo de capacidad explicado por Nico y vuelve al recurso restringido.
4. En la copia vulnerable, registra soporte denegado a demo.pera. Añade supportAccess:true a PATCH /api/profile y vuelve a /api/support/summary. Comprueba permiso persistido y acceso real.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Capacidad inicial false, PATCH la cambia a true y recurso soporte antes denegado resulta accesible en la misma sesión.

**No basta:** Cambiar solo el alias a soporte o obtener un error.

**Cuaderno:** EV-13; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre

explicar asignación masiva y listas explícitas de campos permitidos. La capacidad obtenida aparece en los registros históricos de las 08:54. Extracto histórico entregado por Nico: a las 08:54 una sesión obtuvo supportAccess mediante una actualización de perfil. Este registro no identifica a una persona ni convierte tu reproducción actual en aquel evento.

Impide que una actualización de preferencias asigne capacidades internas.

**Pregunta:** ¿Por qué una lista de campos permitidos evita este cambio?

**Corrección:** Aceptar únicamente campos editables y autorizar capacidades en flujo administrativo separado.

**Prueba positiva:** Preferencia daily sigue guardándose.

**Prueba negativa:** supportAccess enviado por cliente no cambia permisos.

**Enlace:** OBJ-13 · Extracto histórico de cambio a las 08:54.

**Recuperación:** Reconstruir fixtures de chapter-13/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-13.json). No se publica en el bundle del alumno.

**Estado:** escenario funcional, validador probado y recorrido verificado en Chromium. Reenvío nativo por CDP probado; menú visual no acreditado. Firefox, Docker y principiante pendientes. Ver reports/browser-act-three-validation.json.
