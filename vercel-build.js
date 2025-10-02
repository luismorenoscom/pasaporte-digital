const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build para Vercel...');

try {
  // 1. Instalar dependencias
  console.log('📦 Instalando dependencias...');
  execSync('npm install', { stdio: 'inherit' });

  // 2. Build del proyecto
  console.log('🔨 Ejecutando build...');
  execSync('npm run build:vercel', { stdio: 'inherit' });

  // 3. Verificar que el directorio dist existe
  if (!fs.existsSync('dist')) {
    throw new Error('❌ El directorio dist no se creó correctamente');
  }

  // 4. Copiar archivos adicionales si es necesario
  console.log('📁 Copiando archivos adicionales...');
  
  // Verificar si existe la carpeta public
  if (fs.existsSync('public')) {
    console.log('📂 Copiando archivos de public/...');
    execSync('xcopy public dist /E /I /Y', { stdio: 'inherit' });
  }

  console.log('✅ Build completado exitosamente');
  console.log('📊 Archivos generados en: dist/');
  
  // Listar archivos en dist
  const distFiles = fs.readdirSync('dist');
  console.log('📋 Archivos en dist:', distFiles);

} catch (error) {
  console.error('❌ Error durante el build:', error.message);
  process.exit(1);
}