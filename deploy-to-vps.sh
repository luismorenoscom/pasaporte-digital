#!/bin/bash

# Script de despliegue para VPS
# Dominio: ironman.embluegroup.com.pa
# VPS: 72.60.167.122

echo "🚀 Iniciando despliegue del proyecto Pasaporte Digital..."

# Variables
VPS_IP="72.60.167.122"
VPS_USER="root"
VPS_PASSWORD="X5v)bhC0,tZ8,r&WrAaS"
DOMAIN_PATH="/var/www/ironman.embluegroup.com.pa"
BACKUP_PATH="/var/backups/ironman_backup_$(date +%Y%m%d_%H%M%S)"

echo "📦 Preparando archivos para despliegue..."

# Crear archivo temporal con contraseña para sshpass
echo "$VPS_PASSWORD" > temp_password.txt

# Comandos a ejecutar en el VPS
sshpass -f temp_password.txt ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'EOF'
    echo "🔍 Verificando estructura del servidor..."
    
    # Crear backup del contenido actual
    if [ -d "/var/www/ironman.embluegroup.com.pa" ]; then
        echo "💾 Creando backup del contenido actual..."
        mkdir -p /var/backups
        cp -r /var/www/ironman.embluegroup.com.pa /var/backups/ironman_backup_$(date +%Y%m%d_%H%M%S)
        echo "✅ Backup creado exitosamente"
    fi
    
    # Limpiar contenido actual
    echo "🧹 Limpiando contenido actual..."
    rm -rf /var/www/ironman.embluegroup.com.pa/*
    
    # Verificar servicios necesarios
    echo "🔧 Verificando servicios..."
    
    # Instalar Node.js si no está instalado
    if ! command -v node &> /dev/null; then
        echo "📦 Instalando Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        apt-get install -y nodejs
    fi
    
    # Instalar PM2 si no está instalado
    if ! command -v pm2 &> /dev/null; then
        echo "📦 Instalando PM2..."
        npm install -g pm2
    fi
    
    # Instalar PostgreSQL si no está instalado
    if ! command -v psql &> /dev/null; then
        echo "📦 Instalando PostgreSQL..."
        apt-get update
        apt-get install -y postgresql postgresql-contrib
        systemctl start postgresql
        systemctl enable postgresql
    fi
    
    # Instalar Nginx si no está instalado
    if ! command -v nginx &> /dev/null; then
        echo "📦 Instalando Nginx..."
        apt-get install -y nginx
        systemctl start nginx
        systemctl enable nginx
    fi
    
    echo "✅ Servicios verificados/instalados"
EOF

# Subir archivos del frontend
echo "📤 Subiendo archivos del frontend..."
sshpass -f temp_password.txt scp -r -o StrictHostKeyChecking=no ./dist/* $VPS_USER@$VPS_IP:$DOMAIN_PATH/

# Subir archivos del backend
echo "📤 Subiendo archivos del backend..."
sshpass -f temp_password.txt scp -r -o StrictHostKeyChecking=no ./backend $VPS_USER@$VPS_IP:/opt/pasaporte-backend/

# Configurar backend en el VPS
sshpass -f temp_password.txt ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'EOF'
    echo "⚙️ Configurando backend..."
    
    cd /opt/pasaporte-backend
    
    # Instalar dependencias del backend
    npm install --production
    
    # Crear archivo .env para producción
    cat > .env << 'ENVEOF'
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://pasaporte_user:pasaporte_password@localhost:5432/pasaporte_db
DB_HOST=localhost
DB_USER=pasaporte_user
DB_NAME=pasaporte_db
DB_PASSWORD=pasaporte_password
DB_PORT=5432
JWT_SECRET=tu_jwt_secret_muy_seguro_para_produccion
FRONTEND_URL=https://ironman.embluegroup.com.pa
ENVEOF
    
    # Configurar base de datos
    echo "🗄️ Configurando base de datos..."
    sudo -u postgres psql -c "CREATE USER pasaporte_user WITH PASSWORD 'pasaporte_password';" || echo "Usuario ya existe"
    sudo -u postgres psql -c "CREATE DATABASE pasaporte_db OWNER pasaporte_user;" || echo "Base de datos ya existe"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE pasaporte_db TO pasaporte_user;"
    
    # Ejecutar migraciones
    echo "🔄 Ejecutando migraciones..."
    # Aquí irían las migraciones si las tuvieras
    
    # Configurar PM2 para el backend
    echo "🚀 Configurando PM2..."
    pm2 delete pasaporte-backend 2>/dev/null || echo "Aplicación no existe en PM2"
    pm2 start src/server.js --name pasaporte-backend
    pm2 save
    pm2 startup
    
    echo "✅ Backend configurado y ejecutándose"
EOF

# Configurar Nginx
echo "🌐 Configurando Nginx..."
sshpass -f temp_password.txt ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'EOF'
    # Crear configuración de Nginx para el dominio
    cat > /etc/nginx/sites-available/ironman.embluegroup.com.pa << 'NGINXEOF'
server {
    listen 80;
    server_name ironman.embluegroup.com.pa;
    
    # Frontend (archivos estáticos)
    location / {
        root /var/www/ironman.embluegroup.com.pa;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Configuración de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
NGINXEOF
    
    # Habilitar el sitio
    ln -sf /etc/nginx/sites-available/ironman.embluegroup.com.pa /etc/nginx/sites-enabled/
    
    # Verificar configuración de Nginx
    nginx -t
    
    # Recargar Nginx
    systemctl reload nginx
    
    echo "✅ Nginx configurado exitosamente"
EOF

# Limpiar archivo temporal
rm -f temp_password.txt

echo "🎉 ¡Despliegue completado exitosamente!"
echo "🌐 Tu aplicación estará disponible en: https://ironman.embluegroup.com.pa"
echo "📊 Backend API: https://ironman.embluegroup.com.pa/api"
echo "🏥 Health check: https://ironman.embluegroup.com.pa/api/health"