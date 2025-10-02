# Script para desplegar el proyecto Pasaporte Digital al VPS
# Ejecutar: .\deploy-to-vps.ps1

param(
    [string]$VPS_IP = "72.60.167.122",
    [string]$VPS_USER = "root",
    [string]$VPS_PASS = "E/5vghiQS?RLO,F3VPML",
    [string]$DOMAIN = "ironman.embluegroup.com.pa"
)

Write-Host "🚀 Iniciando despliegue al VPS..." -ForegroundColor Green

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
    Write-Host "📋 Paso 1: Verificando conexión al VPS..." -ForegroundColor Cyan
    Invoke-SSHCommand "echo 'Conexión exitosa'"
    
    Write-Host "📋 Paso 2: Revisando estructura actual del servidor..." -ForegroundColor Cyan
    Write-Host "=== Contenido de /var/www/html/ ===" -ForegroundColor Magenta
    Invoke-SSHCommand "ls -la /var/www/html/"
    
    Write-Host "=== Contenido de /var/www/ ===" -ForegroundColor Magenta
    Invoke-SSHCommand "ls -la /var/www/"
    
    Write-Host "=== Configuración de Nginx ===" -ForegroundColor Magenta
    Invoke-SSHCommand "ls -la /etc/nginx/sites-available/"
    Invoke-SSHCommand "ls -la /etc/nginx/sites-enabled/"
    
    Write-Host "=== Procesos de Node.js ===" -ForegroundColor Magenta
    Invoke-SSHCommand "ps aux | grep node"
    
    Write-Host "=== Puertos en uso ===" -ForegroundColor Magenta
    Invoke-SSHCommand "netstat -tlnp | grep :80"
    Invoke-SSHCommand "netstat -tlnp | grep :3000"
    Invoke-SSHCommand "netstat -tlnp | grep :3001"
    
    Write-Host "=== Espacio en disco ===" -ForegroundColor Magenta
    Invoke-SSHCommand "df -h"
    
    Write-Host "=== Memoria disponible ===" -ForegroundColor Magenta
    Invoke-SSHCommand "free -h"
    
    Write-Host "✅ Revisión completada. Revisa la información arriba." -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error durante la revisión: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Asegúrate de tener instalado sshpass o usa PuTTY" -ForegroundColor Yellow
}

Write-Host "`n📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Revisa la información mostrada arriba" -ForegroundColor White
Write-Host "2. Si todo se ve bien, ejecuta: .\deploy-project.ps1" -ForegroundColor White
Write-Host "3. O ejecuta: .\setup-vps.ps1 para configurar el servidor" -ForegroundColor White
