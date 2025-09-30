#!/usr/bin/env node

import { execSync } from 'child_process';
import { cpSync, existsSync, readdirSync } from 'fs';

console.log('🚀 Copiando assets a dist...');

try {
  // Verificar si public/ existe
  if (existsSync('public')) {
    console.log('📂 Contenido de public/:');
    const publicFiles = readdirSync('public');
    console.log(publicFiles);
    
    // Copiar usando comando del sistema (Vercel usa Linux)
    try {
      console.log('🔄 Copiando con comando cp...');
      execSync('cp -r public/* dist/', { stdio: 'inherit' });
      console.log('✅ Archivos copiados con cp');
    } catch (cpError) {
      console.log('⚠️ Comando cp falló, usando Node.js...');
      // Función simple para copiar archivos
      function copyFile(src, dest) {
        try {
          cpSync(src, dest, { recursive: true });
          console.log(`✅ Copiado: ${src} -> ${dest}`);
        } catch (error) {
          console.log(`⚠️ Error copiando ${src}:`, error.message);
        }
      }
      
      // Copiar archivos individuales
      for (const file of publicFiles) {
        copyFile(`public/${file}`, `dist/${file}`);
      }
    }
    
    // Verificar resultado
    if (existsSync('dist')) {
      console.log('📂 Contenido de dist/ después de copiar:');
      const distFiles = readdirSync('dist');
      console.log(distFiles);
      
      const logoExists = existsSync('dist/logo-infinity-stores.png');
      console.log(`🖼️ Logo existe en dist: ${logoExists}`);
    }
  } else {
    console.log('⚠️ Carpeta public/ no encontrada');
  }
  
  console.log('✅ Assets copiados exitosamente');
} catch (error) {
  console.error('❌ Error copiando assets:', error.message);
  process.exit(1);
}
