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
  // Mover assets a la raíz primero
  console.log('📁 Moviendo assets a la raíz...');
  execSync('node move-assets.js', { stdio: 'inherit' });
  
  // Ejecutar el build optimizado para Vercel
  console.log('📦 Ejecutando npm run build:vercel...');
  execSync('npm run build:vercel', { stdio: 'inherit' });
  
  // Copiar archivos de public/ a dist/ también
  console.log('📁 Copiando archivos estáticos a dist...');
  if (existsSync('public')) {
    console.log('📂 Contenido de public/:');
    const publicFiles = readdirSync('public');
    console.log(publicFiles);
    
    // Usar comando PowerShell directamente
    try {
      console.log('🔄 Copiando con PowerShell...');
      execSync('Copy-Item "public/*" "dist/" -Recurse -Force', { stdio: 'inherit', shell: 'powershell' });
      console.log('✅ Archivos copiados con PowerShell');
    } catch (psError) {
      console.log('⚠️ PowerShell falló, intentando con método Node.js...');
      try {
        copyDir('public', 'dist');
        console.log('✅ Archivos copiados con Node.js');
      } catch (nodeError) {
        console.log('⚠️ Método Node.js falló, intentando con shell script...');
        execSync('chmod +x copy-assets.sh && ./copy-assets.sh', { stdio: 'inherit' });
      }
    }
    
    // Verificar que se copiaron
    if (existsSync('dist')) {
      console.log('📂 Contenido de dist/ después de copiar:');
      const distFiles = readdirSync('dist');
      console.log(distFiles);
      
      // Verificar archivos específicos
      const logoExists = existsSync('dist/logo-infinity-stores.png');
      console.log(`🖼️ Logo existe en dist: ${logoExists}`);
    }
  } else {
    console.log('⚠️ Carpeta public/ no encontrada');
  }
  
  // Verificar archivos en la raíz
  console.log('📂 Verificando archivos en la raíz:');
  const rootFiles = readdirSync('.');
  const logoInRoot = rootFiles.includes('logo-infinity-stores.png');
  console.log(`🖼️ Logo existe en raíz: ${logoInRoot}`);
  
  console.log('✅ Build completado exitosamente');
} catch (error) {
  console.error('❌ Error en el build:', error.message);
  process.exit(1);
}
