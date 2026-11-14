# Inventario editorial de conductas deliberadas

Documento de profesor; no se publica en la tienda ni se envía al modo alumno. Los capítulos 01–10 están implementados y comprobados en Chromium; las demás filas siguen como diseño pendiente. Las fichas separadas contienen solución, pruebas y errores frecuentes.

| Capítulos | Comportamiento y alcance | Corrección prevista |
|---|---|---|
| 01–05 | ID público normal, observación de datos y error de presentación del precio de pera; no ataque demostrado | Renderizado desde respuesta correcta |
| 06–07 | Credenciales ficticias en recurso público y cuenta todavía activa en copia | Retirada del recurso sensible y revocación |
| 08–09 | Cookie/sesión y logout que funciona; no fallo obligado | Mantener invalidación real y separación del aula |
| 10–11 | Lectura ajena de pedido por ID, con sesión de Alba; reenvío como herramienta | Propiedad o permiso explícito por objeto |
| 12–13 | Preferencia normal y campo interno aceptado por asignación masiva | Lista de campos permitidos y control separado de capacidades |
| 14–15 | Error con detalle interno; verificación conjunta de controles de pedidos/perfil | Error público mínimo y pruebas positivas/negativas |
| 16 | Cantidad fuera de rango aceptada en pedido sin cobro | Regla de servidor para entero1–20 |
| 17–18 | Interpretación HTML y seguimiento de entrada a destino; no acreditan ejecución | Destino de texto cuando no se requiere marcado |
| 19–20 | DOM XSS y XSS almacenado de marca local, en contextos de laboratorio | Tratamiento de texto y política explícita de marcado |
| 21–24 | SELECT didáctico; error de comilla como indicio; condición SQL que altera filas de productos | Consulta parametrizada real |
| 25 | Clasificación de evidencia y alcance; sin nueva vulnerabilidad | Evitar conclusiones que exceden fuentes |
| 26 | Diferencia pública de respuesta revela cuenta de prueba | Mensaje uniforme y buzón interno |
| 27–30 | Token sin vínculo, reutilización, caducidad y sesiones antiguas; cada caso aísla una propiedad | Vínculo servidor, consumo atómico, plazo y política de revocación |
| 31–32 | Regla de cupón explícita y confianza en precio del cliente | Regla única y precio de catálogo en servidor |
| 33 | Reintento de una operación duplica descuento | Idempotencia y consumo por cuenta en transacción |
| 34 | Cuenta de almacén puede saltar un estado necesario | Máquina de estados con rol y precondiciones |
| 35 | Dos reservas leen una unidad y ambas se aceptan | Reserva atómica condicionada |
| 36–37 | Ruta frente a objeto; escape de carpeta pública solo en árbol virtual | Normalización y contención tras resolver en ese árbol |
| 38–39 | Etiqueta aceptada solo por nombre y servida con tratamiento indebido | Formato/tamaño/almacenamiento y política de descarga/origen |
| 40 | Muestra CSV copiada a publicación pública; distinta del original de soporte | Exclusión del build público y autorización de descarga interna |
| 41 | Políticas CORS comparadas sin eliminar permisos | Origen exacto y autorización independiente |
| 42 | Preferencia modificada desde otro origen del mismo sitio con cookie | Token ligado a sesión y Origin exacto |
| 43 | Previsualización del servidor alcanza intranet ficticia indebida para negocio | Destinos permitidos más guardián independiente del recinto |
| 44 | Retorno validado por subcadena acepta origen auxiliar | Analizar URL y comprobar origen efectivo |
| 45 | Notificación logística sin firma modifica pedido preparado | HMAC sobre cuerpo exacto y control de reintento separado |
| 46–48 | Correlación, ramas históricas y priorización; sin defecto nuevo | Mantener procedencia, límites y criterios explícitos |
| 49 | Regresión de propiedad sembrada únicamente en copia | Suite declarativa que falla allí y pasa en corregida |
| 50 | Transferencia de fallos conocidos con IDs nuevos, sin técnica nueva | Controles y regresión; informe con límites |

Solo los eventos canónicos enlazados a las 08:50–09:05 permiten respaldar las ramas históricas indicadas. El evento logístico de las09:10 queda sin relación demostrada con visitante-17 y el reintento de las09:15 es operativo legítimo. No se atribuyen los demás hallazgos al incidente.

Este inventario no es un informe de vulnerabilidades reales de un sistema desplegado.
