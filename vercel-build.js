#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Ejecutando build personalizado para Vercel...');

// Función para copiar directorios recursivamente
function copyDir(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  
  const entries = readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      cpSync(srcPath, destPath);
    }
  }
}

try {
  // Ejecutar el build optimizado para Vercel
  console.log('📦 Ejecutando npm run build:vercel...');
  execSync('npm run build:vercel', { stdio: 'inherit' });
  
  // Copiar archivos de public/ a dist/
  console.log('📁 Copiando archivos estáticos...');
  if (existsSync('public')) {
    console.log('📂 Contenido de public/:');
    const publicFiles = readdirSync('public');
    console.log(publicFiles);
    
    // Intentar con comando de shell primero
    try {
      console.log('🔄 Intentando con comando de shell...');
      execSync('chmod +x copy-assets.sh && ./copy-assets.sh', { stdio: 'inherit' });
    } catch (shellError) {
      console.log('⚠️ Comando de shell falló, usando método Node.js...');
      copyDir('public', 'dist');
    }
    
    console.log('✅ Archivos de public/ copiados a dist/');
    
    // Verificar que se copiaron
    if (existsSync('dist')) {
      console.log('📂 Contenido de dist/ después de copiar:');
      const distFiles = readdirSync('dist');
      console.log(distFiles);
    }
  } else {
    console.log('⚠️ Carpeta public/ no encontrada');
  }
  
  console.log('✅ Build completado exitosamente');
} catch (error) {
  console.error('❌ Error en el build:', error.message);
  process.exit(1);
}
