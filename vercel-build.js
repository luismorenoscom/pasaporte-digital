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
  // Verificar estructura de carpetas
  console.log('🔍 Verificando estructura de carpetas...');
  console.log('📂 Contenido del directorio actual:');
  const currentFiles = readdirSync('.');
  console.log(currentFiles);
  
  // Verificar si public/ existe
  if (existsSync('public')) {
    console.log('✅ Carpeta public/ encontrada');
    console.log('📂 Contenido de public/:');
    const publicFiles = readdirSync('public');
    console.log(publicFiles);
  } else {
    console.log('⚠️ Carpeta public/ no encontrada, buscando alternativas...');
    
    // Buscar en subdirectorios
    const subdirs = currentFiles.filter(file => {
      const stat = statSync(file);
      return stat.isDirectory() && file !== 'node_modules' && file !== 'dist';
    });
    
    console.log('📂 Subdirectorios encontrados:', subdirs);
    
    for (const dir of subdirs) {
      if (existsSync(`${dir}/public`)) {
        console.log(`✅ Encontrada carpeta public/ en ${dir}/`);
        // Copiar public/ a la raíz
        copyDir(`${dir}/public`, 'public');
        break;
      }
    }
  }
  
  // Mover assets a la raíz si public/ existe
  if (existsSync('public')) {
    console.log('📁 Moviendo assets a la raíz...');
    execSync('node move-assets.js', { stdio: 'inherit' });
  }
  
  // Ejecutar el build optimizado para Vercel
  console.log('📦 Ejecutando npm run build:vercel...');
  execSync('npm run build:vercel', { stdio: 'inherit' });
  
  // Copiar archivos de public/ a dist/ también
  console.log('📁 Copiando archivos estáticos a dist...');
  if (existsSync('public')) {
    console.log('📂 Contenido de public/:');
    const publicFiles = readdirSync('public');
    console.log(publicFiles);
    
    // Usar método Node.js directamente (más confiable en Vercel)
    try {
      copyDir('public', 'dist');
      console.log('✅ Archivos copiados con Node.js');
    } catch (nodeError) {
      console.log('⚠️ Método Node.js falló, intentando con comandos del sistema...');
      try {
        // Intentar con comando Unix (Vercel usa Linux)
        execSync('cp -r public/* dist/', { stdio: 'inherit' });
        console.log('✅ Archivos copiados con cp');
      } catch (cpError) {
        console.log('⚠️ Comando cp falló, intentando con PowerShell...');
        execSync('Copy-Item "public/*" "dist/" -Recurse -Force', { stdio: 'inherit', shell: 'powershell' });
        console.log('✅ Archivos copiados con PowerShell');
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
    console.log('⚠️ Carpeta public/ no encontrada después de búsqueda');
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
