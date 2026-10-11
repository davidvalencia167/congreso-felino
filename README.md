# Congreso Felino IVEC 2027

Landing page y flujo de inscripción para el Congreso Veterinario Felino IVEC 2027, realizado en Barquisimeto, Venezuela. El proyecto combina un frontend moderno para marketing y registro con una pasarela de pagos en PHP para gestionar las transacciones con Bold y guardar la información en MySQL.

## Descripción general

Este proyecto está pensado para promocionar el congreso, mostrar ponentes, agenda, precios, ubicación y facilitar la inscripción de asistentes mediante un formulario y pago seguro. La experiencia principal se entrega en un sitio web desarrollado con React + TanStack Start, mientras que la lógica de pagos y webhooks se ejecuta en una API PHP independiente.

## Funcionalidades principales

- Landing page con hero, información general, programa, ponentes y FAQ
- Sección de precios con tres planes: Estudiante, Médico Veterinario y Muestra Comercial
- Modal de inscripción con formulario externo y flujo de pago
- Integración con Bold para crear intents de pago y verificar estado
- Webhooks para registrar y actualizar pagos
- Persistencia en MySQL para eventos de pago y confirmaciones
- Soporte para correo de confirmación y variables de entorno por hosting

## Stack tecnológico

### Frontend

- React 19
- TanStack Start
- Vite
- Tailwind CSS
- TypeScript

### Backend de pagos

- PHP 8.1+
- MySQL
- PDO para MySQL
- Endpoint de pagos y webhooks bajo `api/`

## Estructura del proyecto

```text
.
├── api/                     # API PHP para pagos y webhooks
│   ├── database.sql
│   ├── payments/
│   ├── webhooks/
│   └── config/
├── public/                 # assets públicos y estáticos
├── src/                    # aplicación frontend
│   ├── components/
│   ├── routes/
│   └── lib/
├── .env.example            # variables de entorno de ejemplo
├── package.json            # scripts del proyecto
├── vite.config.ts          # configuración de Vite
├── README.md               # documentación del proyecto
└── dist/                   # build de producción
```

## Requisitos

- Node.js 18 o superior
- npm
- PHP 8.1+ con extensiones `pdo_mysql` y `json` habilitadas
- MySQL
- Un dominio o subdominio público para la API PHP

## Instalación local

1. Clona el repositorio
2. Instala dependencias:

```bash
npm install
```

3. Crea tu archivo de entorno local a partir del ejemplo:

```bash
cp .env.example .env
```

4. Ajusta los valores necesarios para tu entorno local o para el servidor final.
5. Inicia el proyecto:

```bash
npm run dev
```

La app quedará disponible en:

```text
http://localhost:3000
```

## Variables de entorno

El archivo `.env.example` incluye estas variables:

```env
# Bold (server-side only)
BOLD_IDENTITY_KEY=""
BOLD_SECRET_KEY=""
USD_TO_COP="4000"

# Hostinger MySQL (server-side only)
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_DATABASE=""
MYSQL_USER=""
MYSQL_PASSWORD=""

# Optional
CORS_ORIGIN="https://tu-dominio.com"
MAIL_FROM="no-reply@tu-dominio.com"

# Frontend build only; leave empty when API is on the same domain
VITE_PAYMENT_API_URL=""
```

Importante:

- Las variables sensibles de la API no deben estar en el frontend.
- En PHP, `process.env` o `.env` no se leen automáticamente en hosting compartido; normalmente se configuran en el panel del hosting.
- `VITE_PAYMENT_API_URL` se usa al compilar el frontend para apuntar al backend público.

## Scripts disponibles

```bash
npm run dev          # inicia el entorno de desarrollo
npm run build        # construye producción
npm run preview      # prueba el build localmente
npm run test         # ejecuta pruebas con Vitest
npm run lint         # analiza el código con ESLint
npm run format       # formatea y corrige estilo
npm run check        # valida formato con Prettier
```

## Despliegue

### Frontend

1. Ejecuta:

```bash
npm run build
```

2. Sube el contenido generado en `dist/` a tu hosting público o carpeta de producción.
3. Asegúrate de que la URL del frontend coincida con `CORS_ORIGIN` configurado en la API.

### API de pagos

1. Sube la carpeta `api/` a un dominio o subdominio público, por ejemplo:

```text
https://api.tu-dominio.com
```

2. Importa `api/database.sql` en phpMyAdmin o MySQL para crear la estructura necesaria.
3. Configura las variables de entorno en el panel de PHP del hosting:
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_DATABASE`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `BOLD_IDENTITY_KEY`
   - `BOLD_SECRET_KEY`
   - `USD_TO_COP`
   - `CORS_ORIGIN`
   - `MAIL_FROM`

4. Define `VITE_PAYMENT_API_URL` antes de compilar el frontend, por ejemplo:

```text
https://api.tu-dominio.com
```

5. En Bold, configura el webhook para apuntar a:

```text
https://api.tu-dominio.com/webhooks/bold.php
```

Usa HTTPS en producción y verifica que el dominio de `CORS_ORIGIN` coincida exactamente con el frontend.

## Notas de desarrollo

- El sitio está orientado a una marca premium y a una experiencia de evento con tono institucional y cálido.
- La lógica visual y de contenido está centralizada en componentes dentro de `src/components/`.
- Si se agregan nuevas secciones o se cambia la estructura del sitio, conviene mantener la navegación y el contenido del hero coherentes con la identidad del congreso.

## Licencia

Este proyecto es de uso interno para la operación del congreso y no tiene una licencia pública definida en este repositorio.
