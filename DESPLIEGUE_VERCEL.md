# 🚀 Despliegue en Vercel - Pasaporte Digital

## ✅ Proyecto Listo para Desplegar

Tu proyecto está completamente preparado para subir a GitHub y desplegar en Vercel.

## 📋 Pasos para Desplegar

### 1. Subir a GitHub

```bash
# Inicializar repositorio
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: Pasaporte Digital"

# Conectar con GitHub (reemplaza con tu repositorio)
git remote add origin https://github.com/tu-usuario/pasaporte.git

# Subir a GitHub
git push -u origin main
```

### 2. Desplegar en Vercel

1. **Ve a [vercel.com](https://vercel.com)**
2. **Inicia sesión con GitHub**
3. **Haz clic en "New Project"**
4. **Importa tu repositorio de GitHub**
5. **Vercel detectará automáticamente la configuración**

### 3. Configurar Variables de Entorno

En el dashboard de Vercel, ve a **Settings > Environment Variables**:

```
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
NODE_ENV=production
```

### 4. Configurar Base de Datos

Para la base de datos, puedes usar cualquiera de estas opciones:

#### Opción A: Vercel Postgres (Recomendado)
1. En Vercel, ve a **Storage**
2. Crea una nueva base de datos **Postgres**
3. Copia la URL de conexión
4. Úsala como `DATABASE_URL`

#### Opción B: Supabase (Gratis)
1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **Settings > Database**
4. Copia la **Connection String**
5. Úsala como `DATABASE_URL`

#### Opción C: Railway (Gratis)
1. Ve a [railway.app](https://railway.app)
2. Crea un nuevo proyecto
3. Agrega una base de datos **PostgreSQL**
4. Copia la URL de conexión
5. Úsala como `DATABASE_URL`

### 5. Desplegar

1. **Haz clic en "Deploy"**
2. **Espera a que termine el despliegue**
3. **¡Tu proyecto estará disponible en la URL de Vercel!**

## 🧪 Probar el Despliegue

### Verificar Frontend
- Visita la URL de Vercel
- Debe cargar la aplicación React

### Verificar Backend
- Visita: `https://tu-proyecto.vercel.app/api/health`
- Debe mostrar: `{"success":true,"message":"API funcionando correctamente"}`

### Verificar Base de Datos
- Usa las credenciales por defecto:
  - **Email:** admin@pasaporte.com
  - **Contraseña:** admin123

## 🔧 Configuración Adicional

### Dominio Personalizado
1. En Vercel, ve a **Settings > Domains**
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones

### Variables de Entorno por Entorno
Puedes configurar variables diferentes para:
- **Production** (producción)
- **Preview** (preview de PRs)
- **Development** (desarrollo local)

## 📁 Archivos Creados

- `vercel.json` - Configuración de Vercel
- `.env.example` - Variables de entorno de ejemplo
- `README.md` - Documentación del proyecto
- `.gitignore` - Archivos a ignorar en Git
- `INSTRUCCIONES_VERCEL.md` - Guía detallada

## 🆘 Solución de Problemas

### Error de Base de Datos
- Verifica que `DATABASE_URL` esté configurada correctamente
- Asegúrate de que la base de datos esté accesible desde Vercel

### Error de CORS
- El backend ya está configurado para aceptar requests del frontend

### Error 404 en API
- Verifica que las rutas estén configuradas correctamente en `vercel.json`

### Error de Build
- Revisa los logs de build en Vercel
- Asegúrate de que todas las dependencias estén instaladas

## ✅ ¡Listo!

Una vez completado, tu proyecto estará disponible en:
- **URL:** https://tu-proyecto.vercel.app
- **Admin:** admin@pasaporte.com / admin123

## 🎯 Ventajas de Vercel

- ✅ **Despliegue automático** desde GitHub
- ✅ **SSL gratuito** incluido
- ✅ **CDN global** para mejor rendimiento
- ✅ **Variables de entorno** fáciles de configurar
- ✅ **Logs en tiempo real** para debugging
- ✅ **Rollback automático** si algo falla
- ✅ **Dominio personalizado** gratuito

¡Tu proyecto estará funcionando en minutos! 🚀
