# Courier Demo

Sitio web de demostración que simula el recorrido de una compra en Estados Unidos con destino a Costa Rica: casillero, cotizador, rastreo y prealertas.

**Demo en vivo:** https://shamirdelgado.github.io/courier-demo/

Hecho con **HTML, CSS y JavaScript puros**, sin frameworks, sin compilación y sin backend. Todos los datos (marca, casillero, paquetes, costos, fechas) son ficticios. Este proyecto no ofrece servicios comerciales ni debe recibir datos reales.

## Qué se puede probar

- Portada con ilustración SVG propia y animación CSS ligera.
- Registro de ejemplo en cuatro pantallas: registro → verificación → identificación ficticia → confirmación.
- Acceso simulado al panel.
- Cotizador con conversión kg/lb, mínimos facturables, seguro, manejo e impuestos de ejemplo, con desglose.
- Rastreo con tres códigos y línea de tiempo por paquete.
- Lista de paquetes con filtro por estado.
- Prealerta con validación y vista previa opcional de una factura de ejemplo.
- Preguntas frecuentes con acordeón y filtro de búsqueda.
- Formulario de contacto que responde de forma local y nunca envía mensajes.
- Diseño adaptable a celular y navegación con teclado.

## Datos para probar

| Herramienta | Ejemplo |
| --- | --- |
| Correo | `hola@ejemplo.com` |
| Contraseña de ejemplo | `Demo1234` |
| Código de verificación | `123456` |
| Identificación ficticia | `DEMO-ID-001` |
| Casillero | `DEMO-000` |
| Paquete en tránsito | `DEMO-1001` |
| Paquete entregado | `DEMO-1002` |
| Paquete recibido | `DEMO-1003` |
| Nueva prealerta | `DEMO-2001` |

## Ejecutar en local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/shamirdelgado/courier-demo.git
   ```

2. Abre `index.html` en el navegador.

Opcionalmente, con Python instalado, puedes levantar un servidor local desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Lógica del cotizador

Todas las tarifas y porcentajes son de ejemplo y no corresponden a tarifas ni impuestos reales.

```text
kg = peso ingresado (o libras × 0.45359237)
peso facturable = máximo(kg, mínimo de la modalidad)
flete = peso facturable × tarifa por kg
seguro opcional = máximo($1, valor declarado × 1%)
base de impuesto = valor declarado + flete + seguro
impuesto = base × porcentaje de la categoría
total del envío = flete + manejo + seguro + impuesto
```

- Aéreo: $8/kg, mínimo 0.5 kg.
- Marítimo: $3/kg, mínimo 2 kg.
- Manejo: $3.
- Categorías de ejemplo: general 13%, libros 0%, ropa 20%.

## Estructura del proyecto

| Ubicación | Contenido |
| --- | --- |
| `index.html` | Portada: tiendas, pasos, servicios, preguntas frecuentes y contacto. |
| `paginas/` | Registro, login, verificación, cotizador, rastreo, panel, paquetes, prealerta y ayuda. |
| `css/` | Estilos base, portada, formularios, panel e información. |
| `js/` | Lógica de cada pantalla: autenticación simulada, cotizador, rastreo, panel y prealerta. |
| `img/` | Ilustraciones SVG propias, logotipos y recursos gráficos. |
| `404.html` | Página de error para rutas inexistentes. |

## Privacidad

- No se guardan contraseñas, correos, teléfonos ni documentos.
- No se usan `fetch`, cookies, analítica ni servicios externos de correo.
- Los archivos de la prealerta se revisan solo en el navegador (máximo 2 MB).

## Marcas y recursos

Courier Demo es una marca ficticia. Los logos de tiendas pertenecen a sus respectivos propietarios; se muestran únicamente como enlaces de referencia y no implican afiliación, patrocinio ni respaldo. Las ilustraciones, el favicon y la portada social se crearon para este proyecto.

## Autor

**Shamir Delgado**

- Portafolio: https://shamirdelgado.github.io
- GitHub: https://github.com/shamirdelgado
- LinkedIn: https://www.linkedin.com/in/shamir-delgado-lanuza-0b7274314
- Correo: uzziellanuza@gmail.com
