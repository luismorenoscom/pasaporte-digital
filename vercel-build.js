#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Ejecutando build personalizado para Vercel...');

try {
  // Ejecutar el build optimizado para Vercel
  console.log('📦 Ejecutando npm run build:vercel...');
  execSync('npm run build:vercel', { stdio: 'inherit' });
  
  console.log('✅ Build completado exitosamente');
} catch (error) {
  console.error('❌ Error en el build:', error.message);
  process.exit(1);
}
