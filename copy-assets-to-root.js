#!/usr/bin/env node

import { execSync } from 'child_process';
import { cpSync, existsSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join } from 'path';

console.log('🚀 Copiando assets a la raíz del proyecto...');

// Función para copiar archivos recursivamente
function copyRecursive(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  
  const items = readdirSync(src);
  for (const item of items) {
    const srcPath = join(src, item);
    const destPath = join(dest, item);
    const stat = statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      cpSync(srcPath, destPath);
      console.log(`✅ Copiado: ${item}`);
    }
  }
}

try {
  // Verificar si public/ existe
  if (existsSync('public')) {
    console.log('📂 Encontrada carpeta public/');
    const publicFiles = readdirSync('public');
    console.log('📂 Archivos en public:', publicFiles);
    
    // Copiar archivos individuales a la raíz
    for (const file of publicFiles) {
      if (file !== 'pasaporte') { // Excluir carpeta pasaporte por ahora
        try {
          cpSync(`public/${file}`, file);
          console.log(`✅ Copiado a raíz: ${file}`);
        } catch (error) {
          console.log(`⚠️ Error copiando ${file}:`, error.message);
        }
      }
    }
    
    // Copiar carpeta pasaporte
    if (existsSync('public/pasaporte')) {
      copyRecursive('public/pasaporte', 'pasaporte');
      console.log('✅ Carpeta pasaporte copiada a la raíz');
    }
    
    console.log('✅ Assets copiados a la raíz del proyecto');
  } else {
    console.log('⚠️ Carpeta public/ no encontrada');
  }
  
  // Verificar archivos en la raíz
  console.log('📂 Verificando archivos en la raíz:');
  const rootFiles = readdirSync('.');
  const assetFiles = rootFiles.filter(file => 
    file.match(/\.(png|jpg|jpeg|gif|svg|mp4|webp)$/i)
  );
  console.log('🖼️ Archivos de assets en la raíz:', assetFiles);
  
} catch (error) {
  console.error('❌ Error copiando assets:', error.message);
  process.exit(1);
}
