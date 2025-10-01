#!/bin/bash

# Script de despliegue simplificado para ironman.embluegroup.com
# Uso: ./deploy-vps.sh

set -e

# Variables
VPS_IP="72.60.167.122"
VPS_USER="root"
DOMAIN="ironman.embluegroup.com"
APP_DIR="/var/www/pasaporte"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

echo "🚀 Desplegando Pasaporte Digital a $DOMAIN"
echo "=============================================="

# 1. Construir proyecto localmente
print_status "📦 Construyendo proyecto localmente..."
npm run build

# 2. Crear archivo .env.production
print_status "⚙️ Creando archivo de configuración..."
cat > .env.production << EOF
NODE_ENV=production
VITE_API_URL=https://$DOMAIN/api
VITE_APP_NAME=Pasaporte Digital
VITE_APP_VERSION=1.0.0
DB_HOST=postgres
DB_PORT=5432
DB_NAME=pasaporte_db
DB_USER=pasaporte_user
DB_PASSWORD=IronMan2024!SecurePass
JWT_SECRET=IronMan_Pasaporte_2024_Super_Secret_Key_For_JWT_Tokens
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://$DOMAIN
PORT=3001
EOF

# 3. Subir archivos al VPS
print_status "📤 Subiendo archivos al VPS..."
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' ./ $VPS_USER@$VPS_IP:$APP_DIR/

# 4. Ejecutar comandos en el VPS
print_status "🔧 Configurando servidor..."
ssh $VPS_USER@$VPS_IP << EOF
    cd $APP_DIR
    
    # Actualizar sistema
    apt update && apt upgrade -y
    
    # Instalar Docker si no está instalado
    if ! command -v docker &> /dev/null; then
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        systemctl enable docker
        systemctl start docker
    fi
    
    # Instalar Docker Compose si no está instalado
    if ! command -v docker-compose &> /dev/null; then
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
    fi
    
    # Instalar Nginx si no está instalado
    if ! command -v nginx &> /dev/null; then
        apt install nginx -y
        systemctl enable nginx
        systemctl start nginx
    fi
    
    # Instalar Certbot si no está instalado
    if ! command -v certbot &> /dev/null; then
        apt install certbot python3-certbot-nginx -y
    fi
    
    # Construir y ejecutar aplicación
    print_status "🐳 Iniciando contenedores Docker..."
    docker-compose -f docker-compose.prod.yml down || true
    docker-compose -f docker-compose.prod.yml up -d --build
    
    # Esperar a que los servicios estén listos
    sleep 30
    
    # Configurar Nginx
    print_status "🌐 Configurando Nginx..."
    cp nginx.conf /etc/nginx/sites-available/pasaporte
    ln -sf /etc/nginx/sites-available/pasaporte /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    nginx -t
    systemctl reload nginx
    
    # Configurar SSL
    print_status "🔒 Configurando SSL..."
    certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@embluegroup.com || true
    
    print_status "✅ Despliegue completado!"
    print_status "🌐 Aplicación disponible en: https://$DOMAIN"
EOF

print_status "🎉 ¡Despliegue completado!"
print_status "🌐 Visita: https://$DOMAIN"
print_status "🔧 Para monitorear: ssh $VPS_USER@$VPS_IP './monitor.sh'"
