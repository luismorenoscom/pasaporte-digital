#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cpSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Ejecutando build personalizado para Vercel...');

try {
  // Ejecutar el build optimizado para Vercel
  console.log('📦 Ejecutando npm run build:vercel...');
  execSync('npm run build:vercel', { stdio: 'inherit' });
  
  // Copiar archivos de public/ a dist/
  console.log('📁 Copiando archivos estáticos...');
  if (existsSync('public')) {
    cpSync('public', 'dist', { recursive: true });
    console.log('✅ Archivos de public/ copiados a dist/');
  }
  
  console.log('✅ Build completado exitosamente');
} catch (error) {
  console.error('❌ Error en el build:', error.message);
  process.exit(1);
}
