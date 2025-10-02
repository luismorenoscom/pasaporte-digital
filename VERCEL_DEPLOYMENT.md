# 🚀 Guía de Despliegue en Vercel

## Configuración del Proyecto

### 1. Variables de Entorno en Vercel

Configura las siguientes variables de entorno en el dashboard de Vercel:

```
VITE_API_URL=https://tu-backend-url.com/api
```

### 2. Configuración de Build

El proyecto está configurado para usar:
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Configuración de Vercel (vercel.json)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*\\.(png|jpg|jpeg|gif|svg|mp4|webp|woff2|ttf|otf))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Pasos para Desplegar

### 1. Conectar con GitHub
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Selecciona el repositorio `pasaporte-digital`
5. Haz clic en "Import"

### 2. Configurar el Proyecto
1. **Project Name**: `pasaporte-digital`
2. **Framework Preset**: `Vite`
3. **Root Directory**: `./` (raíz del proyecto)
4. **Build Command**: `npm run vercel-build`
5. **Output Directory**: `dist`

### 3. Variables de Entorno
1. En la sección "Environment Variables"
2. Agrega:
   - `VITE_API_URL` = `https://tu-backend-url.com/api`

### 4. Desplegar
1. Haz clic en "Deploy"
2. Espera a que se complete el build
3. Tu aplicación estará disponible en `https://pasaporte-digital.vercel.app`

## Configuración del Backend

Para que el frontend funcione correctamente, necesitas desplegar el backend en un servidor. Opciones:

### Opción 1: VPS (Recomendado)
- Usa los scripts de despliegue incluidos en el proyecto
- Configura un servidor con Node.js y PostgreSQL

### Opción 2: Railway/Render
- Despliega el backend en Railway o Render
- Configura la variable `VITE_API_URL` con la URL del backend

### Opción 3: Vercel Functions (Limitado)
- El backend puede funcionar con Vercel Functions
- Limitado para aplicaciones complejas

## Verificación Post-Despliegue

1. **Frontend**: Verifica que la aplicación carga correctamente
2. **API**: Verifica que las llamadas a la API funcionan
3. **Assets**: Verifica que las imágenes y videos se cargan
4. **Routing**: Verifica que el routing del SPA funciona

## Troubleshooting

### Error: Build Failed
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Vercel

### Error: Assets Not Found
- Verifica que los archivos estén en la carpeta `public/`
- Revisa la configuración de `vite.config.vercel.ts`

### Error: API Not Working
- Verifica la variable `VITE_API_URL`
- Asegúrate de que el backend esté desplegado y funcionando

## Actualizaciones

Para actualizar la aplicación:
1. Haz push a la rama `main` en GitHub
2. Vercel detectará automáticamente los cambios
3. Ejecutará un nuevo build y despliegue
4. La nueva versión estará disponible en unos minutos
