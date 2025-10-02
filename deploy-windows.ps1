# Script de despliegue para Windows PowerShell
# Uso: .\deploy-windows.ps1

param(
    [string]$VPS_IP = "72.60.167.122",
    [string]$VPS_USER = "root",
    [string]$DOMAIN = "ironman.embluegroup.com"
)

Write-Host "🚀 Iniciando despliegue de Pasaporte Digital a $DOMAIN" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

# 1. Construir proyecto
Write-Host "📦 Construyendo proyecto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build" -ForegroundColor Red
    exit 1
}

# 2. Crear archivo .env.production
Write-Host "⚙️ Creando archivo de configuración..." -ForegroundColor Yellow
$envContent = @"
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
"@

$envContent | Out-File -FilePath ".env.production" -Encoding UTF8

# 3. Crear script de instalación para el VPS
Write-Host "📝 Creando script de instalación..." -ForegroundColor Yellow
$installScript = @"
#!/bin/bash
set -e

echo "🔧 Configurando servidor VPS..."

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
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Instalar Nginx
if ! command -v nginx &> /dev/null; then
    apt install nginx -y
    systemctl enable nginx
    systemctl start nginx
fi

# Instalar Certbot
if ! command -v certbot &> /dev/null; then
    apt install certbot python3-certbot-nginx -y
fi

# Crear directorio de la aplicación
mkdir -p /var/www/pasaporte
cd /var/www/pasaporte

# Construir y ejecutar aplicación
echo "🐳 Iniciando contenedores Docker..."
docker-compose -f docker-compose.prod.yml down || true
docker-compose -f docker-compose.prod.yml up -d --build

# Esperar a que los servicios estén listos
sleep 30

# Configurar Nginx
echo "🌐 Configurando Nginx..."
cp nginx.conf /etc/nginx/sites-available/pasaporte
ln -sf /etc/nginx/sites-available/pasaporte /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# Configurar SSL
echo "🔒 Configurando SSL..."
certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@embluegroup.com || true

echo "✅ Despliegue completado!"
echo "🌐 Aplicación disponible en: https://$DOMAIN"
"@

$installScript | Out-File -FilePath "install-vps.sh" -Encoding UTF8

Write-Host "✅ Archivos preparados para despliegue" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Conecta al VPS: ssh $VPS_USER@$VPS_IP" -ForegroundColor White
Write-Host "2. Sube los archivos: scp -r . $VPS_USER@$VPS_IP:/var/www/pasaporte/" -ForegroundColor White
Write-Host "3. Ejecuta: chmod +x install-vps.sh && ./install-vps.sh" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Después del despliegue, visita: https://$DOMAIN" -ForegroundColor Green

