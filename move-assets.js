#!/usr/bin/env node

import { execSync } from 'child_process';
import { cpSync, existsSync, readdirSync } from 'fs';

console.log('🚀 Moviendo assets a la raíz del proyecto...');

try {
  // Mover archivos de public/ a la raíz
  if (existsSync('public')) {
    console.log('📂 Contenido de public/:');
    const publicFiles = readdirSync('public');
    console.log(publicFiles);
    
    // Copiar archivos individuales a la raíz usando PowerShell
    for (const file of publicFiles) {
      if (file !== 'pasaporte') { // Excluir carpeta pasaporte por ahora
        try {
          execSync(`Copy-Item "public/${file}" "." -Force`, { stdio: 'inherit', shell: 'powershell' });
          console.log(`✅ ${file} copiado a la raíz`);
        } catch (error) {
          console.log(`⚠️ Error copiando ${file}:`, error.message);
        }
      }
    }
    
    // Copiar carpeta pasaporte
    if (existsSync('public/pasaporte')) {
      execSync('Copy-Item "public/pasaporte" "." -Recurse -Force', { stdio: 'inherit', shell: 'powershell' });
      console.log('✅ Carpeta pasaporte copiada a la raíz');
    }
    
    console.log('✅ Assets movidos a la raíz');
  } else {
    console.log('⚠️ Carpeta public/ no encontrada');
  }
} catch (error) {
  console.error('❌ Error moviendo assets:', error.message);
  process.exit(1);
}
