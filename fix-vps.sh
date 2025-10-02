#!/bin/bash

echo "🔧 Script de Reparación del VPS - ironman.embluegroup.com.pa"
echo "=================================================="

# Variables
VPS_IP="72.60.167.122"
VPS_USER="root"
VPS_PASSWORD="X5v)bhC0,tZ8,r&WrAaS"

# Crear archivo temporal con contraseña
echo "$VPS_PASSWORD" > temp_password.txt

echo "🔍 Diagnosticando problemas en el VPS..."

# Ejecutar diagnóstico y reparación
sshpass -f temp_password.txt ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'EOF'
    echo "📊 Estado actual del sistema:"
    echo "============================="
    
    # Verificar servicios
    echo "🔧 Verificando servicios..."
    systemctl status nginx --no-pager -l
    systemctl status postgresql --no-pager -l
    
    # Verificar puertos
    echo "🌐 Verificando puertos abiertos..."
    netstat -tlnp | grep -E ':(80|443|3001)'
    
    # Verificar archivos del dominio
    echo "📁 Verificando archivos del dominio..."
    ls -la /var/www/ironman.embluegroup.com.pa/ 2>/dev/null || echo "❌ Directorio del dominio no existe"
    
    # Verificar configuración de Nginx
    echo "⚙️ Verificando configuración de Nginx..."
    ls -la /etc/nginx/sites-enabled/ | grep ironman
    
    echo ""
    echo "🔨 Iniciando reparación automática..."
    echo "====================================="
    
    # Crear directorio del dominio si no existe
    mkdir -p /var/www/ironman.embluegroup.com.pa
    chown -R www-data:www-data /var/www/ironman.embluegroup.com.pa
    chmod -R 755 /var/www/ironman.embluegroup.com.pa
    
    # Crear página de prueba temporal
    cat > /var/www/ironman.embluegroup.com.pa/index.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pasaporte Digital - En Construcción</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        p { font-size: 1.2rem; margin-bottom: 0.5rem; }
        .status { color: #4ade80; font-weight: bold; }
        .loading { 
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Pasaporte Digital</h1>
        <p class="status">✅ Servidor funcionando correctamente</p>
        <p>El proyecto se está desplegando...</p>
        <p><span class="loading"></span> Configurando servicios</p>
        <p><small>ironman.embluegroup.com.pa</small></p>
    </div>
</body>
</html>
HTMLEOF
    
    # Configurar Nginx básico
    cat > /etc/nginx/sites-available/ironman.embluegroup.com.pa << 'NGINXEOF'
server {
    listen 80;
    server_name ironman.embluegroup.com.pa;
    
    root /var/www/ironman.embluegroup.com.pa;
    index index.html index.htm;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Configuración de seguridad básica
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # Logs
    access_log /var/log/nginx/ironman_access.log;
    error_log /var/log/nginx/ironman_error.log;
}
NGINXEOF
    
    # Habilitar el sitio
    ln -sf /etc/nginx/sites-available/ironman.embluegroup.com.pa /etc/nginx/sites-enabled/
    
    # Remover sitio por defecto si existe
    rm -f /etc/nginx/sites-enabled/default
    
    # Verificar configuración de Nginx
    echo "🔍 Verificando configuración de Nginx..."
    if nginx -t; then
        echo "✅ Configuración de Nginx válida"
        
        # Reiniciar Nginx
        systemctl restart nginx
        systemctl enable nginx
        
        echo "✅ Nginx reiniciado y habilitado"
    else
        echo "❌ Error en configuración de Nginx"
        nginx -t
    fi
    
    # Verificar firewall
    echo "🔥 Configurando firewall..."
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 22/tcp
    ufw --force enable
    
    echo ""
    echo "📊 Estado final:"
    echo "================"
    systemctl status nginx --no-pager -l
    netstat -tlnp | grep :80
    
    echo ""
    echo "✅ Reparación completada!"
    echo "🌐 El sitio debería estar disponible en: http://ironman.embluegroup.com.pa"
EOF

# Limpiar archivo temporal
rm -f temp_password.txt

echo ""
echo "🎉 Script de reparación ejecutado!"
echo "🌐 Verifica el sitio en: http://ironman.embluegroup.com.pa"

