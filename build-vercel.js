#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Preparando proyecto para Vercel...\n');

// 1. Construir frontend
console.log('📦 Construyendo frontend...');
try {
  execSync('npm run build:vercel', { stdio: 'inherit' });
  console.log('✅ Frontend construido exitosamente\n');
} catch (error) {
  console.error('❌ Error construyendo frontend:', error.message);
  process.exit(1);
}

// 2. Crear archivo de configuración para Vercel
console.log('⚙️ Configurando para Vercel...');

const vercelConfig = {
  "version": 2,
  "builds": [
    {
      "src": "backend/src/server.js",
      "use": "@vercel/node"
    },
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
      "src": "/api/(.*)",
      "dest": "/backend/src/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));

// 3. Crear archivo .env.example
const envExample = `# Configuración para Vercel
NODE_ENV=production

# Base de datos PostgreSQL (usar variable DATABASE_URL de Vercel)
DATABASE_URL=postgresql://usuario:password@host:puerto/database

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui

# Frontend URL
FRONTEND_URL=https://tu-proyecto.vercel.app`;

fs.writeFileSync('.env.example', envExample);

// 4. Crear archivo de instrucciones para Vercel
const instructions = `# 🚀 Instrucciones para Desplegar en Vercel

## 📋 Pasos de Despliegue

### 1. Subir a GitHub
1. Crea un repositorio en GitHub
2. Sube el código:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/pasaporte.git
   git push -u origin main
   \`\`\`

### 2. Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente la configuración

### 3. Configurar Variables de Entorno
En el dashboard de Vercel, ve a Settings > Environment Variables:

\`\`\`
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
NODE_ENV=production
\`\`\`

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
- Visita: \`https://tu-proyecto.vercel.app/api/health\`
- Debe mostrar: \`{"success":true,"message":"API funcionando correctamente"}\`

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
`;

fs.writeFileSync('INSTRUCCIONES_VERCEL.md', instructions);

console.log('✅ Proyecto preparado para Vercel\n');
console.log('📁 Archivos creados:');
console.log('   - vercel.json (configuración)');
console.log('   - .env.example (variables de entorno)');
console.log('   - INSTRUCCIONES_VERCEL.md (guía de despliegue)');
console.log('\n🎯 Próximos pasos:');
console.log('   1. Subir a GitHub');
console.log('   2. Conectar con Vercel');
console.log('   3. Configurar variables de entorno');
console.log('   4. ¡Desplegar!');
