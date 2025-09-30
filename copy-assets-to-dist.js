#!/usr/bin/env node

import { execSync } from 'child_process';
import { cpSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log('🚀 Copiando assets a dist...');

// Función para buscar archivos recursivamente
function findFiles(dir, extensions = ['.png', '.jpg', '.jpeg', '.gif', '.mp4', '.svg', '.webp']) {
  const files = [];
  
  function search(currentDir) {
    if (!existsSync(currentDir)) return;
    
    const items = readdirSync(currentDir);
    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        search(fullPath);
      } else if (extensions.some(ext => item.toLowerCase().endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  search(dir);
  return files;
}

// Función para copiar archivo
function copyFile(src, dest) {
  try {
    cpSync(src, dest, { recursive: true });
    console.log(`✅ Copiado: ${src} -> ${dest}`);
    return true;
  } catch (error) {
    console.log(`⚠️ Error copiando ${src}:`, error.message);
    return false;
  }
}

try {
  console.log('🔍 Buscando archivos de assets...');
  
  // Buscar archivos de assets en todo el proyecto
  const assetFiles = findFiles('.');
  console.log(`📂 Encontrados ${assetFiles.length} archivos de assets:`, assetFiles);
  
  // Crear directorio dist si no existe
  if (!existsSync('dist')) {
    execSync('mkdir -p dist', { stdio: 'inherit' });
  }
  
  // Copiar archivos encontrados
  let copiedCount = 0;
  for (const filePath of assetFiles) {
    const fileName = filePath.split('/').pop() || filePath.split('\\').pop();
    const destPath = join('dist', fileName);
    
    if (copyFile(filePath, destPath)) {
      copiedCount++;
    }
  }
  
  console.log(`📊 Copiados ${copiedCount} de ${assetFiles.length} archivos`);
  
  // Buscar específicamente el logo
  const logoFiles = assetFiles.filter(file => 
    file.toLowerCase().includes('logo') || 
    file.toLowerCase().includes('infinity')
  );
  
  console.log('🖼️ Archivos de logo encontrados:', logoFiles);
  
  // Verificar resultado
  if (existsSync('dist')) {
    console.log('📂 Contenido de dist/ después de copiar:');
    const distFiles = readdirSync('dist');
    console.log(distFiles);
    
    const logoExists = existsSync('dist/logo-infinity-stores.png');
    console.log(`🖼️ Logo existe en dist: ${logoExists}`);
  }
  
  console.log('✅ Assets copiados exitosamente');
} catch (error) {
  console.error('❌ Error copiando assets:', error.message);
  process.exit(1);
}
