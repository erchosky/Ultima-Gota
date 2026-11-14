# Pantallas y recorrido de inicio

## Lenguaje visual

Fondo crema, tinta oscura, naranja tostado para acciones y verde oscuro para confirmaciones con texto. Referencias: etiquetas de almacén, sobres de casos y fichas de inventario. Texto base de 18 px, ancho de lectura de 68 caracteres, escala de texto 100–150 %; verificar además zoom al 200 % sin pérdidas. Ningún estado depende solo del color. No hay efectos de terminal ni alertas permanentes.

## Plano

```text
ESCRITORIO · localhost:4310
┌ Alias · campaña · capítulos completados/50 · ayuda técnica ┐
│ Buzón | Expediente actual | Cuaderno | Glosario             │
│ Remitente, contexto y motivo                              │
│ Objetivo → Predicción → Abrir tienda (otra pestaña)         │
│ Ayuda de un paso → Pistas elegidas                         │
│ Esperaba… / He observado… / Adjuntar evidencia             │
│ Observado · Demostrado · Comprendido · Corrección          │
└ Diagnóstico | Guardar/exportar | Recuperación              ┘

TIENDA · 127.0.0.1:4311
┌ Última Gota · Catálogo · Mi cuenta · Mis pedidos           ┐
│ Etiqueta «COPIA AUTORIZADA · escenario / versión»          │
│ Productos, ficha, campaña, reseñas o documentos            │
│ Nombre de identidad ficticia · cerrar sesión              │
└ Vuelta al expediente: enlace sin tokens ni progreso        ┘

MESA DE REVISIÓN · dentro del escritorio
┌ Escenario activo · versión · diagnóstico                  ┐
│ Copia vulnerable | Copia corregida · comparación           │
│ Caso positivo · Caso negativo · resultados reales         │
│ Herramienta didáctica desbloqueada para el caso            │
└ Reintentar escenario · alcance explicado                  ┘
```

La mesa es interfaz del escritorio y su API no acepta órdenes desde la tienda. El árbol virtual, lanzador concurrente y constructor de regresión no son terminales genéricas. Solo ejecutan acciones declaradas del caso.

## Primer recorrido, 01–05

1. Inicio explica el laboratorio ficticio, el guardado y la necesidad de navegador de escritorio. Elegir alias o continuar como Aprendiz. No hay contraseña de cuenta externa.
2. El buzón solo tiene el mensaje de Lara/Sam y el expediente 01. La captura de Alba se menciona sin enseñar la cronología completa. Abrirlo deja el estado «en curso».
3. Se explica dirección: la barra de la ventana, con ejemplo `http://127.0.0.1:4311/producto?id=1`. La parte `id=1` pide el producto número 1. Predecir antes de cambiarlo.
4. Abrir tienda en pestaña real, cambiar solo 1 por 2 y anotar qué identidad aparece. La evidencia debe corresponder a una petición nueva a producto 2. Ningún botón de la tienda completa el caso.
5. La pregunta «¿Esto demuestra un fallo de permisos?» ofrece explicación y reintento; la respuesta válida reconoce identificación normal. Se entrega una lista de referencias.
6. El 02 enseña abrir Red: menú de Firefox → Más herramientas → Herramientas de desarrollo → Red, o Ctrl+Mayús+E (macOS: Cmd+Opción+E). Abrir antes de recargar. Elegir la petición de datos `/api/products?id=2`, diferenciándola de una imagen por dirección y tipo. Anotar método, URL e ID.
7. El 03 enseña JSON con un ejemplo de tres campos, abre Respuesta y compara 210 céntimos con 2,40 € en pantalla. El formulario aclara céntimos y moneda. Un precio recibido no es un precio editado en el inspector.
8. El 04 enseña seleccionar un elemento y modificar su texto localmente. Anotar la edición, recargar y volver a consultar los datos. Explicar que la página reconstruye su presentación. La discrepancia 2,40 persiste hasta la corrección del 05.
9. El 05 reconstruye la evidencia: hoja y servidor 2,10; pantalla 2,40; pasos; recurso y petición. La mesa reproduce con esos datos, corrige el renderizado y comprueba que producto 1 sigue mostrando su precio. El informe reconoce un fallo de presentación sin evidencia de ataque.
10. Cierre del acto: cinco capítulos completados si hay pruebas y comprensión; habilidades mostradas con su procedencia. El buzón habilita la revisión autorizada de la página de verano.

## Accesibilidad y errores

Enlaces de salto, landmarks, encabezados ordenados, etiquetas asociadas a controles, foco visible de 3 px y navegación completa por teclado. El diálogo de restablecer retiene foco, vuelve al control que lo abrió y admite Escape. En móvil, pestañas en lugar de columnas; la tienda y el cuaderno siguen legibles. Se explica que los experimentos con Red necesitan escritorio.

Las ayudas se despliegan en flujo, sin tapar la tienda. Animación opcional y breve; `prefers-reduced-motion` la elimina. Los mensajes de validación dicen qué dato falta y de qué ejecución procede. El diagnóstico separa servicio caído, sesión equivocada y prueba que no confirma la hipótesis. «Necesito ayuda: la herramienta no funciona» no consume pistas.

Reintentar muestra alcance y conserva notas; crear campaña archiva la anterior; restablecer ofrece exportación y pide confirmación explícita. Una importación muestra una sola notificación «Progreso recuperado». No hay sonidos ni celebraciones por cada logro restaurado.

Este plano es un diseño textual, no una captura ni una interfaz probada.
