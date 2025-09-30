import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'fs'
import { join } from 'path'

// Plugin personalizado para copiar archivos de public/
function copyPublicAssets() {
  return {
    name: 'copy-public-assets',
    buildStart() {
      console.log('🚀 Copiando archivos de public/...')
      
      if (existsSync('public')) {
        console.log('📂 Encontrada carpeta public/')
        const publicFiles = readdirSync('public')
        console.log('📂 Archivos en public:', publicFiles)
        
        // Función para copiar recursivamente
        function copyRecursive(src, dest) {
          if (!existsSync(dest)) {
            mkdirSync(dest, { recursive: true })
          }
          
          const items = readdirSync(src)
          for (const item of items) {
            const srcPath = join(src, item)
            const destPath = join(dest, item)
            const stat = statSync(srcPath)
            
            if (stat.isDirectory()) {
              copyRecursive(srcPath, destPath)
            } else {
              copyFileSync(srcPath, destPath)
              console.log(`✅ Copiado: ${item}`)
            }
          }
        }
        
        copyRecursive('public', 'dist')
        console.log('✅ Archivos de public/ copiados a dist/')
      } else {
        console.log('⚠️ Carpeta public/ no encontrada')
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyPublicAssets()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    host: true
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  publicDir: 'public'
})
