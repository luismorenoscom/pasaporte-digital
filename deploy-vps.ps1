# Script de despliegue para VPS - PowerShell
# Dominio: ironman.embluegroup.com.pa
# VPS: 72.60.167.122

Write-Host "🚀 Iniciando despliegue del proyecto Pasaporte Digital..." -ForegroundColor Green

# Variables
$VPS_IP = "72.60.167.122"
$VPS_USER = "root"
$VPS_PASSWORD = "X5v)bhC0,tZ8,r&WrAaS"
$DOMAIN_PATH = "/var/www/ironman.embluegroup.com.pa"

Write-Host "📦 Preparando archivos para despliegue..." -ForegroundColor Yellow

# Función para ejecutar comandos SSH
function Invoke-SSHCommand {
    param([string]$Command)
    
    $commandFile = "temp_commands.sh"
    $Command | Out-File -FilePath $commandFile -Encoding UTF8
    
    try {
        # Usar ssh con expect para automatizar la entrada de contraseña
        $sshCommand = @"
spawn ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP
expect "password:"
send "$VPS_PASSWORD\r"
expect "#"
send "bash $commandFile\r"
expect "#"
send "exit\r"
expect eof
"@
        
        $sshCommand | Out-File -FilePath "temp_ssh.exp" -Encoding UTF8
        expect temp_ssh.exp
    }
    finally {
        Remove-Item -Path $commandFile -ErrorAction SilentlyContinue
        Remove-Item -Path "temp_ssh.exp" -ErrorAction SilentlyContinue
    }
}

# Verificar si expect está instalado
if (-not (Get-Command expect -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ expect no está instalado. Instalando..." -ForegroundColor Yellow
    
    # Para Windows, necesitamos usar WSL o instalar expect
    Write-Host "🔧 Por favor, ejecuta manualmente los siguientes comandos:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Conectar al VPS:" -ForegroundColor White
    Write-Host "   ssh root@72.60.167.122" -ForegroundColor Gray
    Write-Host "   Contraseña: X5v)bhC0,tZ8,r&WrAaS" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Una vez conectado, ejecutar estos comandos:" -ForegroundColor White
    
    $commands = @"
# Crear backup del contenido actual
if [ -d "/var/www/ironman.embluegroup.com.pa" ]; then
    echo "💾 Creando backup..."
    mkdir -p /var/backups
    cp -r /var/www/ironman.embluegroup.com.pa /var/backups/ironman_backup_\$(date +%Y%m%d_%H%M%S)
fi

# Limpiar contenido actual
echo "🧹 Limpiando contenido actual..."
rm -rf /var/www/ironman.embluegroup.com.pa/*

# Instalar dependencias necesarias
echo "📦 Instalando dependencias..."
apt-get update
apt-get install -y nodejs npm postgresql postgresql-contrib nginx

# Configurar PostgreSQL
systemctl start postgresql
systemctl enable postgresql
sudo -u postgres psql -c "CREATE USER pasaporte_user WITH PASSWORD 'pasaporte_password';" || echo "Usuario ya existe"
sudo -u postgres psql -c "CREATE DATABASE pasaporte_db OWNER pasaporte_user;" || echo "BD ya existe"

# Instalar PM2
npm install -g pm2

echo "✅ Configuración básica completada"
"@
    
    Write-Host $commands -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Luego, desde tu máquina local, ejecuta:" -ForegroundColor White
    Write-Host "   scp -r ./dist/* root@72.60.167.122:/var/www/ironman.embluegroup.com.pa/" -ForegroundColor Gray
    Write-Host "   scp -r ./backend root@72.60.167.122:/opt/pasaporte-backend/" -ForegroundColor Gray
} else {
    Write-Host "✅ expect encontrado, procediendo con despliegue automático..." -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Resumen de lo que se hará:" -ForegroundColor Cyan
Write-Host "   1. Conectar al VPS" -ForegroundColor White
Write-Host "   2. Hacer backup del contenido actual" -ForegroundColor White
Write-Host "   3. Limpiar el directorio del dominio" -ForegroundColor White
Write-Host "   4. Instalar Node.js, PostgreSQL, Nginx" -ForegroundColor White
Write-Host "   5. Subir archivos del frontend y backend" -ForegroundColor White
Write-Host "   6. Configurar base de datos" -ForegroundColor White
Write-Host "   7. Configurar Nginx como proxy" -ForegroundColor White
Write-Host "   8. Iniciar servicios con PM2" -ForegroundColor White

Write-Host ""
Write-Host "🌐 El proyecto estará disponible en: https://ironman.embluegroup.com.pa" -ForegroundColor Green
