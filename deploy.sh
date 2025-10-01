#!/bin/bash

# Script de despliegue para VPS
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando despliegue de Pasaporte Digital..."

# Variables
VPS_IP="72.60.167.122"
VPS_USER="root"
APP_DIR="/var/www/pasaporte"
NGINX_DIR="/etc/nginx/sites-available"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar conexión SSH
print_status "Verificando conexión SSH..."
if ! ssh -o ConnectTimeout=10 $VPS_USER@$VPS_IP "echo 'Conexión SSH exitosa'"; then
    print_error "No se puede conectar al VPS. Verifica las credenciales."
    exit 1
fi

# Crear directorio de la aplicación
print_status "Creando directorio de la aplicación..."
ssh $VPS_USER@$VPS_IP "mkdir -p $APP_DIR"

# Subir archivos del proyecto
print_status "Subiendo archivos del proyecto..."
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' ./ $VPS_USER@$VPS_IP:$APP_DIR/

# Instalar dependencias del sistema
print_status "Instalando dependencias del sistema..."
ssh $VPS_USER@$VPS_IP << 'EOF'
    # Actualizar sistema
    apt update && apt upgrade -y
    
    # Instalar Docker
    if ! command -v docker &> /dev/null; then
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        systemctl enable docker
        systemctl start docker
    fi
    
    # Instalar Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
    fi
    
    # Instalar Nginx
    if ! command -v nginx &> /dev/null; then
        apt install nginx -y
        systemctl enable nginx
        systemctl start nginx
    fi
    
    # Instalar Certbot para SSL
    if ! command -v certbot &> /dev/null; then
        apt install certbot python3-certbot-nginx -y
    fi
EOF

# Configurar base de datos
print_status "Configurando base de datos PostgreSQL..."
ssh $VPS_USER@$VPS_IP "cd $APP_DIR && docker-compose up -d postgres"

# Esperar a que la base de datos esté lista
print_status "Esperando a que la base de datos esté lista..."
sleep 30

# Ejecutar migraciones de base de datos
print_status "Ejecutando migraciones de base de datos..."
ssh $VPS_USER@$VPS_IP "cd $APP_DIR && docker exec pasaporte_postgres psql -U postgres -d pasaporte_db -f /docker-entrypoint-initdb.d/init.sql"

# Construir y ejecutar aplicación
print_status "Construyendo y ejecutando aplicación..."
ssh $VPS_USER@$VPS_IP << EOF
    cd $APP_DIR
    
    # Construir frontend
    npm install
    npm run build
    
    # Construir y ejecutar backend
    cd backend
    docker build -t pasaporte-backend .
    docker run -d --name pasaporte-backend --network pasaporte_default -p 3001:3001 pasaporte-backend
EOF

# Configurar Nginx
print_status "Configurando Nginx..."
ssh $VPS_USER@$VPS_IP << EOF
    # Copiar configuración de Nginx
    cp $APP_DIR/nginx.conf /etc/nginx/sites-available/pasaporte
    
    # Crear enlace simbólico
    ln -sf /etc/nginx/sites-available/pasaporte /etc/nginx/sites-enabled/
    
    # Remover configuración por defecto
    rm -f /etc/nginx/sites-enabled/default
    
    # Verificar configuración
    nginx -t
    
    # Recargar Nginx
    systemctl reload nginx
EOF

# Configurar SSL automáticamente
print_status "🔒 Configurando SSL con Let's Encrypt..."
ssh $VPS_USER@$VPS_IP "certbot --nginx -d ironman.embluegroup.com --non-interactive --agree-tos --email admin@embluegroup.com"

print_status "✅ Despliegue completado!"
print_status "🌐 Aplicación disponible en: https://ironman.embluegroup.com"
print_status "🔒 SSL configurado automáticamente"
