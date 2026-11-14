# 26 · Un correo que revela demasiado

Acto 6 · Escritorio y copia autorizada de tienda · día 0 · hito 26 después de las 10:00 (sin duración impuesta)

**De: Vera**

El formulario de recuperación contesta de manera distinta a dos direcciones de prueba. Una pertenece a una cuenta y la otra no existe. Ambas están preparadas dentro del laboratorio y no enviarán correo fuera de él. Vamos a mantener todo igual salvo la dirección y comparar contenido y estado. No necesitamos medir diferencias diminutas de tiempo ni probar listas de personas. Si podemos distinguir la cuenta existente, habremos demostrado una filtración concreta. Eso no significa conocer su contraseña ni poder entrar en ella. Después habilitaré el buzón ficticio necesario para revisar qué autorización contienen los enlaces de recuperación.

**Importa porque:** Vera observa que el formulario de recuperación responde de manera diferente según la dirección introducida.

**Reutiliza:** 12, 14, 22

**Añade S26:** comprobar si una respuesta revela la existencia de una cuenta.

**Objetivo:** usar dos direcciones ficticias proporcionadas, una registrada y otra inexistente, manteniendo las demás condiciones.

**Estado inicial:** fixture campaign-v1 y snapshot propio 26; cuentas anonymous. Sesión nueva identificada y runId nuevo.

**Predicción:** ¿Una respuesta distinta puede revelar que una cuenta existe sin conceder acceso?

## Apoyo guiado

1. Existencia de cuenta y control de cuenta son conclusiones diferentes.
2. Compara respuestas del formulario de recuperación.
3. Usa las dos direcciones ficticias entregadas por Vera.
4. Registra Esperaba… y He observado… con la petición de esta ejecución; solicita contrastar la evidencia.

## Cuatro pistas disponibles por elección

1. Existencia de cuenta y control de cuenta son conclusiones diferentes.
2. Compara respuestas del formulario de recuperación.
3. Usa las dos direcciones ficticias entregadas por Vera.
4. Solicita recuperación para alba@ug.invalid y ausente@ug.invalid, con iguales condiciones. Compara status y mensaje en vulnerable; en corregida deben ser públicos equivalentes.

## Contrato de prueba (documento de diseño; no se envía íntegro al alumno)

Dos solicitudes preparadas difieren en vulnerable y son equivalentes en corregida; evidencia no afirma toma de cuenta.

**No basta:** Cronometrar variaciones mínimas o probar direcciones no suministradas.

**Cuaderno:** EV-26; identidad, recurso, reloj, petición, esperado, observado y categoría de conocimiento.

## Cierre previsto

conocer que una cuenta existe es una filtración concreta, distinta de tomar su control. Vera habilita el buzón de esa cuenta de pruebas.

La existencia de una cuenta concreta, sin demostrar acceso a ella.

**Pregunta:** ¿Qué información se ha filtrado?

**Corrección:** Respuesta pública uniforme; entrega solo en buzón interno del destinatario.

**Prueba positiva:** Cuenta existente recibe mensaje interno.

**Prueba negativa:** Cuenta inexistente no se distingue por mensaje público.

**Enlace:** OBJ-26 · Acceso autorizado al buzón ficticio.

**Recuperación:** Reconstruir fixtures de chapter-26/v1 en nuevo runId; recuperar objetos de capítulos previos ya completados.

[Solución de profesor separada](../content/es/instructor/chapter-26.json). No se publica en el bundle del alumno.

**Estado:** contenido escrito; comportamiento, validador y recorrido pendientes de implementación.
