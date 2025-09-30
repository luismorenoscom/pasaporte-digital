#!/bin/bash

echo "📁 Copiando archivos estáticos..."

# Verificar que existe la carpeta public
if [ -d "public" ]; then
    echo "📂 Contenido de public/:"
    ls -la public/
    
    # Copiar archivos de public a dist
    cp -r public/* dist/
    
    echo "✅ Archivos copiados a dist/"
    echo "📂 Contenido de dist/ después de copiar:"
    ls -la dist/
else
    echo "⚠️ Carpeta public/ no encontrada"
fi
