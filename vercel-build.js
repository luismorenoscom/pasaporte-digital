#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

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
