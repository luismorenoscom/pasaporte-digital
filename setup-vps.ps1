# Script para configurar el VPS para el proyecto Pasaporte Digital
# Ejecutar: .\setup-vps.ps1

param(
    [string]$VPS_IP = "72.60.167.122",
    [string]$VPS_USER = "root",
    [string]$VPS_PASS = "E/5vghiQS?RLO,F3VPML",
    [string]$DOMAIN = "ironman.embluegroup.com.pa"
)

Write-Host "🔧 Configurando VPS para Pasaporte Digital..." -ForegroundColor Green

# Función para ejecutar comandos SSH
function Invoke-SSHCommand {
    param([string]$Command)
    
    $sshCommand = "sshpass -p '$VPS_PASS' ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP '$Command'"
    Write-Host "Ejecutando: $Command" -ForegroundColor Yellow
    Invoke-Expression $sshCommand
}

try {
    Write-Host "📋 Paso 1: Actualizando sistema..." -ForegroundColor Cyan
    Invoke-SSHCommand "apt update && apt upgrade -y"
    
    Write-Host "📋 Paso 2: Instalando dependencias..." -ForegroundColor Cyan
    Invoke-SSHCommand "apt install -y nginx nodejs npm git curl wget unzip"
    
    Write-Host "📋 Paso 3: Instalando PM2..." -ForegroundColor Cyan
    Invoke-SSHCommand "npm install -g pm2"
    
    Write-Host "📋 Paso 4: Instalando PostgreSQL..." -ForegroundColor Cyan
    Invoke-SSHCommand "apt install -y postgresql postgresql-contrib"
    
    Write-Host "📋 Paso 5: Configurando PostgreSQL..." -ForegroundColor Cyan
    Invoke-SSHCommand "sudo -u postgres psql -c \"CREATE USER pasaporte_user WITH PASSWORD 'pasaporte_password';\""
    Invoke-SSHCommand "sudo -u postgres psql -c \"CREATE DATABASE pasaporte_db OWNER pasaporte_user;\""
    Invoke-SSHCommand "sudo -u postgres psql -c \"GRANT ALL PRIVILEGES ON DATABASE pasaporte_db TO pasaporte_user;\""
    
    Write-Host "📋 Paso 6: Creando directorio del proyecto..." -ForegroundColor Cyan
    Invoke-SSHCommand "mkdir -p /var/www/pasaporte"
    Invoke-SSHCommand "chown -R www-data:www-data /var/www/pasaporte"
    
    Write-Host "📋 Paso 7: Configurando Nginx..." -ForegroundColor Cyan
    
    # Crear configuración de Nginx
    $nginxConfig = @"
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Frontend (React)
    location / {
        root /var/www/pasaporte/dist;
        index index.html;
        try_files `$uri `$uri/ /index.html;
        
        # Headers para SPA
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
        proxy_cache_bypass `$http_upgrade;
    }
    
    # Assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|mp4|webp|woff2|ttf|otf)$ {
        root /var/www/pasaporte/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
"@
    
    # Subir configuración de Nginx
    $nginxConfig | Out-File -FilePath "nginx-pasaporte.conf" -Encoding UTF8
    Write-Host "Subiendo configuración de Nginx..." -ForegroundColor Yellow
    $scpCommand = "sshpass -p '$VPS_PASS' scp -o StrictHostKeyChecking=no nginx-pasaporte.conf $VPS_USER@$VPS_IP:/etc/nginx/sites-available/pasaporte"
    Invoke-Expression $scpCommand
    
    Write-Host "Activando sitio..." -ForegroundColor Yellow
    Invoke-SSHCommand "ln -sf /etc/nginx/sites-available/pasaporte /etc/nginx/sites-enabled/"
    Invoke-SSHCommand "nginx -t"
    Invoke-SSHCommand "systemctl reload nginx"
    
    Write-Host "📋 Paso 8: Configurando firewall..." -ForegroundColor Cyan
    Invoke-SSHCommand "ufw allow 22"
    Invoke-SSHCommand "ufw allow 80"
    Invoke-SSHCommand "ufw allow 443"
    Invoke-SSHCommand "ufw --force enable"
    
    Write-Host "✅ VPS configurado exitosamente!" -ForegroundColor Green
    Write-Host "🌐 El dominio $DOMAIN está listo para recibir el proyecto" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error durante la configuración: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Ejecuta: .\deploy-project.ps1 para subir el proyecto" -ForegroundColor White
Write-Host "2. O ejecuta: .\build-and-deploy.ps1 para build y deploy completo" -ForegroundColor White
