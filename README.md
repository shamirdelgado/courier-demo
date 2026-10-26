# Courier Demo

Demostración de una plataforma para casilleros que reciben compras en Estados Unidos y las envían a Costa Rica. Está dirigida a dueños de casilleros pequeños y medianos que hoy trabajan con Excel y WhatsApp, y permite explorar la experiencia de sus clientes.

**Demo:** https://shamirdelgado.github.io/courier-demo/

## Qué puedes ver

- [Para casilleros](paginas/para-casilleros.html): propuesta, alcance, proceso de trabajo y contacto directo para agendar una demo.
- Portal de clientes con casillero de ejemplo, paquetes y filtros.
- Registro y acceso simulados, rastreo por etapas y prealertas con factura local opcional.
- Cotizador con conversión kg/lb, mínimos, manejo, seguro e impuestos de ejemplo.
- [Privacidad](paginas/privacidad.html), ayuda y preguntas frecuentes.

La demo es un sitio estático con HTML, CSS y JavaScript, sin compilación ni backend. Los formularios solo se procesan en memoria: no se envían ni se guardan datos, contraseñas o archivos; no se usan cookies, analítica ni almacenamiento local o de sesión. La factura opcional (JPG, PNG o PDF, hasta 2 MB) se revisa únicamente en el navegador. Usa datos inventados.

“Agenda una demo” abre un borrador en tu aplicación de correo; tú decides si lo envías. El alojamiento puede procesar registros técnicos y los sitios externos tienen sus propias políticas.

## Qué se desarrolla para un negocio real

La versión a medida se conecta a una base de datos real y se adapta a las tarifas, logo, colores y dominio del casillero. El panel de bodega para recepción y pesaje, los avisos automáticos, los permisos y las integraciones se construyen según el alcance acordado. La factura electrónica se integra en una etapa posterior. La demo no implementa estas funciones operativas.

El trabajo empieza con una conversación sobre la operación, continúa con una versión inicial con la marca del negocio y contempla acompañamiento y mejoras según lo acordado. El tratamiento de datos de la versión real se diseña con el compromiso de cumplir la Ley 8968 de Costa Rica; no se declara ninguna certificación.

## Cómo verlo en local

Desde esta carpeta, con Python instalado:

```sh
python -m http.server 8000
```

Abre `http://localhost:8000`. También puedes abrir `index.html` directamente. No hace falta instalar dependencias.

## Datos para probar

| Pantalla | Ejemplo |
| --- | --- |
| Correo y contraseña | `hola@ejemplo.com` / `Demo1234` |
| Verificación | `123456` |
| Identificación | `DEMO-ID-001` |
| Casillero | `DEMO-000` |
| Rastreo | `DEMO-1001`, `DEMO-1002`, `DEMO-1003` |
| Prealerta | `DEMO-2001` |

El acceso solo valida el formato; no autentica usuarios. Los paquetes son ejemplos fijos. Revisar una prealerta no la añade a la lista. No hay dirección física operativa, pagos ni envíos reales.

## Cálculos de ejemplo

Todas las tarifas y porcentajes son ficticios, sin valor comercial ni aduanero:

- Aéreo: $8/kg, mínimo 0.5 kg. Marítimo: $3/kg, mínimo 2 kg.
- Manejo: $3. Seguro opcional: máximo entre $1 y 1% del valor declarado.
- Impuesto de ejemplo: general 13%, libros 0%, ropa 20%, aplicado sobre valor + flete + seguro.
- Total del envío: flete + manejo + seguro + impuesto; excluye el valor de la compra.
- Conversión: libras × 0.45359237 = kilogramos.

## Estructura y mantenimiento

`index.html` es la portada; `paginas/` contiene las pantallas; `css/` los estilos; `js/` las interacciones; `img/` los recursos. El menú se genera en `js/components.js`. El pie y los metadatos están en cada HTML para estar disponibles sin JavaScript. Si cambias la URL de publicación, actualiza canonical, `og:url` y `og:image` en todas las páginas.

Para comprobar la sintaxis de todos los scripts:

```sh
for archivo in js/*.js; do node --check "$archivo" || exit 1; done
```

Courier Demo es una marca de demostración. Los logos de tiendas son referencias para “compra en tiendas como…”, sin alianzas, patrocinio ni afiliación.

## Contacto

**Shamir Delgado** — desarrollador full-stack junior, San José, Costa Rica. Trabajo remoto.

- Correo: [uzziellanuza@gmail.com](mailto:uzziellanuza@gmail.com)
- LinkedIn: https://www.linkedin.com/in/shamir-delgado-lanuza-0b7274314
- GitHub: https://github.com/shamirdelgado
- Portafolio: https://shamirdelgado.github.io/
