# 🚀 Instrucciones para Desplegar en Vercel

## 📋 Pasos de Despliegue

### 1. Subir a GitHub
1. Crea un repositorio en GitHub
2. Sube el código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/pasaporte.git
   git push -u origin main
   ```

### 2. Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente la configuración

### 3. Configurar Variables de Entorno
En el dashboard de Vercel, ve a Settings > Environment Variables:

```
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
NODE_ENV=production
```

### 4. Configurar Base de Datos
Para la base de datos, puedes usar:
- **Vercel Postgres** (recomendado)
- **Supabase** (gratis)
- **Railway** (gratis)
- **Neon** (gratis)

### 5. Desplegar
1. Haz clic en "Deploy"
2. Espera a que termine el despliegue
3. ¡Tu proyecto estará disponible en la URL de Vercel!

## 🔧 Configuración Adicional

### Base de Datos Vercel Postgres
1. En Vercel, ve a Storage
2. Crea una nueva base de datos Postgres
3. Copia la URL de conexión
4. Úsala como DATABASE_URL

### Dominio Personalizado
1. En Vercel, ve a Settings > Domains
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones

## 🧪 Pruebas

### Verificar Frontend
- Visita la URL de Vercel
- Debe cargar la aplicación React

### Verificar Backend
- Visita: `https://tu-proyecto.vercel.app/api/health`
- Debe mostrar: `{"success":true,"message":"API funcionando correctamente"}`

### Verificar Base de Datos
- Usa las credenciales por defecto:
  - Email: admin@pasaporte.com
  - Contraseña: admin123

## 🆘 Solución de Problemas

### Error de Base de Datos
- Verifica que DATABASE_URL esté configurada correctamente
- Asegúrate de que la base de datos esté accesible desde Vercel

### Error de CORS
- El backend ya está configurado para aceptar requests del frontend

### Error 404 en API
- Verifica que las rutas estén configuradas correctamente en vercel.json

## ✅ ¡Listo!

Una vez completado, tu proyecto estará disponible en:
- **URL**: https://tu-proyecto.vercel.app
- **Admin**: admin@pasaporte.com / admin123
