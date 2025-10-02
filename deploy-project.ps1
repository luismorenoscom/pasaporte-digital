# Script para subir el proyecto Pasaporte Digital al VPS
# Ejecutar: .\deploy-project.ps1

param(
    [string]$VPS_IP = "72.60.167.122",
    [string]$VPS_USER = "root",
    [string]$VPS_PASS = "E/5vghiQS?RLO,F3VPML",
    [string]$DOMAIN = "ironman.embluegroup.com.pa"
)

Write-Host "🚀 Desplegando proyecto Pasaporte Digital al VPS..." -ForegroundColor Green

# Función para ejecutar comandos SSH
function Invoke-SSHCommand {
    param([string]$Command)
    
    $sshCommand = "sshpass -p '$VPS_PASS' ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP '$Command'"
    Write-Host "Ejecutando: $Command" -ForegroundColor Yellow
    Invoke-Expression $sshCommand
}

# Función para subir archivos
function Upload-File {
    param([string]$LocalPath, [string]$RemotePath)
    
    $scpCommand = "sshpass -p '$VPS_PASS' scp -o StrictHostKeyChecking=no -r '$LocalPath' $VPS_USER@$VPS_IP:'$RemotePath'"
    Write-Host "Subiendo: $LocalPath -> $RemotePath" -ForegroundColor Yellow
    Invoke-Expression $scpCommand
}

try {
    Write-Host "📋 Paso 1: Construyendo el proyecto..." -ForegroundColor Cyan
    
    # Build del frontend
    Write-Host "Construyendo frontend..." -ForegroundColor Yellow
    npm run build
    
    if (-not (Test-Path "dist")) {
        throw "Error: No se pudo construir el proyecto. Verifica que npm run build funcione."
    }
    
    Write-Host "📋 Paso 2: Preparando archivos..." -ForegroundColor Cyan
    
    # Crear directorio temporal
    if (Test-Path "temp-deploy") {
        Remove-Item -Recurse -Force "temp-deploy"
    }
    New-Item -ItemType Directory -Name "temp-deploy"
    
    # Copiar frontend
    Copy-Item -Recurse "dist" "temp-deploy/"
    
    # Copiar backend
    Copy-Item -Recurse "backend" "temp-deploy/"
    
    # Copiar archivos de configuración
    Copy-Item "package.json" "temp-deploy/"
    Copy-Item "docker-compose.yml" "temp-deploy/"
    
    Write-Host "📋 Paso 3: Subiendo archivos al VPS..." -ForegroundColor Cyan
    Upload-File "temp-deploy/*" "/var/www/pasaporte/"
    
    Write-Host "📋 Paso 4: Instalando dependencias del backend..." -ForegroundColor Cyan
    Invoke-SSHCommand "cd /var/www/pasaporte/backend && npm install --production"
    
    Write-Host "📋 Paso 5: Configurando variables de entorno..." -ForegroundColor Cyan
    
    # Crear archivo .env para producción
    $envContent = @"
NODE_ENV=production
DB_HOST=localhost
DB_USER=pasaporte_user
DB_NAME=pasaporte_db
DB_PASSWORD=pasaporte_password
DB_PORT=5432
PORT=3001
JWT_SECRET=tu_jwt_secret_muy_seguro_para_produccion
"@
    
    $envContent | Out-File -FilePath "temp-deploy/backend/.env" -Encoding UTF8
    Upload-File "temp-deploy/backend/.env" "/var/www/pasaporte/backend/"
    
    Write-Host "📋 Paso 6: Iniciando servicios..." -ForegroundColor Cyan
    
    # Iniciar PostgreSQL
    Invoke-SSHCommand "systemctl start postgresql"
    Invoke-SSHCommand "systemctl enable postgresql"
    
    # Iniciar backend con PM2
    Invoke-SSHCommand "cd /var/www/pasaporte/backend && pm2 start src/server.js --name pasaporte-backend"
    Invoke-SSHCommand "pm2 save"
    Invoke-SSHCommand "pm2 startup"
    
    # Recargar Nginx
    Invoke-SSHCommand "systemctl reload nginx"
    
    Write-Host "📋 Paso 7: Verificando servicios..." -ForegroundColor Cyan
    Invoke-SSHCommand "pm2 status"
    Invoke-SSHCommand "systemctl status nginx"
    Invoke-SSHCommand "systemctl status postgresql"
    
    Write-Host "✅ Proyecto desplegado exitosamente!" -ForegroundColor Green
    Write-Host "🌐 Frontend: http://$DOMAIN" -ForegroundColor Cyan
    Write-Host "🔧 Backend API: http://$DOMAIN/api" -ForegroundColor Cyan
    Write-Host "🏥 Health Check: http://$DOMAIN/api/health" -ForegroundColor Cyan
    
    # Limpiar archivos temporales
    Remove-Item -Recurse -Force "temp-deploy"
    
} catch {
    Write-Host "❌ Error durante el despliegue: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Verifica que el VPS esté configurado correctamente" -ForegroundColor Yellow
}

Write-Host "`n📋 Comandos útiles para el VPS:" -ForegroundColor Cyan
Write-Host "Ver logs del backend: ssh $VPS_USER@$VPS_IP 'pm2 logs pasaporte-backend'" -ForegroundColor White
Write-Host "Reiniciar backend: ssh $VPS_USER@$VPS_IP 'pm2 restart pasaporte-backend'" -ForegroundColor White
Write-Host "Ver estado: ssh $VPS_USER@$VPS_IP 'pm2 status'" -ForegroundColor White
