# Script automatizado para configurar el VPS
# Dominio: ironman.embluegroup.com.pa
# VPS: 72.60.167.122

param(
    [string]$VPS_IP = "72.60.167.122",
    [string]$VPS_USER = "root",
    [string]$VPS_PASSWORD = "X5v)bhC0,tZ8,r&WrAaS"
)

Write-Host "🚀 Configurando VPS automáticamente..." -ForegroundColor Green
Write-Host "IP: $VPS_IP" -ForegroundColor Cyan
Write-Host "Usuario: $VPS_USER" -ForegroundColor Cyan

# Función para ejecutar comandos SSH usando expect
function Invoke-SSHCommand {
    param([string]$Command)
    
    $expectScript = @"
#!/usr/bin/expect -f
set timeout 30
spawn ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP
expect "password:"
send "$VPS_PASSWORD\r"
expect "#"
send "$Command\r"
expect "#"
send "exit\r"
expect eof
"@
    
    $expectScript | Out-File -FilePath "temp_ssh.exp" -Encoding ASCII
    expect temp_ssh.exp
    Remove-Item "temp_ssh.exp" -ErrorAction SilentlyContinue
}

# Verificar si expect está disponible
try {
    $expectVersion = expect -v 2>$null
    Write-Host "✅ Expect encontrado: $expectVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Expect no está disponible. Instalando WSL..." -ForegroundColor Yellow
    
    # Instalar WSL si no está disponible
    try {
        wsl --install
        Write-Host "✅ WSL instalado. Reinicia tu computadora y ejecuta este script nuevamente." -ForegroundColor Green
        return
    } catch {
        Write-Host "❌ No se pudo instalar WSL automáticamente." -ForegroundColor Red
        Write-Host "📋 Comandos manuales para ejecutar en el VPS:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "ssh root@72.60.167.122" -ForegroundColor White
        Write-Host "Contraseña: X5v)bhC0,tZ8,r&WrAaS" -ForegroundColor Gray
        Write-Host ""
        
        $commands = @"
# Actualizar sistema
apt-get update && apt-get upgrade -y

# Instalar servicios básicos
apt-get install -y nginx nodejs npm postgresql postgresql-contrib curl

# Configurar PostgreSQL
systemctl start postgresql
systemctl enable postgresql
sudo -u postgres psql -c "CREATE USER pasaporte_user WITH PASSWORD 'pasaporte_password';"
sudo -u postgres psql -c "CREATE DATABASE pasaporte_db OWNER pasaporte_user;"

# Crear directorio del dominio
mkdir -p /var/www/ironman.embluegroup.com.pa
chown -R www-data:www-data /var/www/ironman.embluegroup.com.pa
chmod -R 755 /var/www/ironman.embluegroup.com.pa

# Crear página de prueba
cat > /var/www/ironman.embluegroup.com.pa/index.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Pasaporte Digital - Funcionando</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            text-align: center; 
            padding-top: 100px; 
            margin: 0;
        }
        .container { 
            background: rgba(255,255,255,0.1); 
            padding: 2rem; 
            border-radius: 15px; 
            display: inline-block;
            backdrop-filter: blur(10px);
        }
        h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .status { color: #4ade80; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Pasaporte Digital</h1>
        <p class="status">✅ Servidor funcionando correctamente</p>
        <p>El proyecto se está configurando...</p>
        <p><small>ironman.embluegroup.com.pa</small></p>
    </div>
</body>
</html>
EOF

# Configurar Nginx
cat > /etc/nginx/sites-available/ironman.embluegroup.com.pa << 'EOF'
server {
    listen 80;
    server_name ironman.embluegroup.com.pa;
    
    root /var/www/ironman.embluegroup.com.pa;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ =404;
    }
    
    # Configuración de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

# Habilitar sitio
ln -sf /etc/nginx/sites-available/ironman.embluegroup.com.pa /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Verificar y reiniciar Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

# Configurar firewall
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw --force enable

# Verificar estado final
systemctl status nginx
netstat -tlnp | grep :80
curl http://localhost
"@
        
        Write-Host $commands -ForegroundColor Gray
        return
    }
}

Write-Host "🔧 Ejecutando configuración automática..." -ForegroundColor Yellow

# Comandos a ejecutar en el VPS
$vpsCommands = @"
apt-get update && apt-get upgrade -y
"@

Write-Host "📦 Actualizando sistema..." -ForegroundColor Cyan
Invoke-SSHCommand $vpsCommands

$vpsCommands = @"
apt-get install -y nginx nodejs npm postgresql postgresql-contrib curl
"@

Write-Host "📦 Instalando servicios básicos..." -ForegroundColor Cyan
Invoke-SSHCommand $vpsCommands

$vpsCommands = @"
systemctl start postgresql
systemctl enable postgresql
sudo -u postgres psql -c "CREATE USER pasaporte_user WITH PASSWORD 'pasaporte_password';" || echo "Usuario ya existe"
sudo -u postgres psql -c "CREATE DATABASE pasaporte_db OWNER pasaporte_user;" || echo "Base de datos ya existe"
"@

Write-Host "🗄️ Configurando PostgreSQL..." -ForegroundColor Cyan
Invoke-SSHCommand $vpsCommands

$vpsCommands = @"
mkdir -p /var/www/ironman.embluegroup.com.pa
chown -R www-data:www-data /var/www/ironman.embluegroup.com.pa
chmod -R 755 /var/www/ironman.embluegroup.com.pa
"@

Write-Host "📁 Creando directorio del dominio..." -ForegroundColor Cyan
Invoke-SSHCommand $vpsCommands

$vpsCommands = @"
cat > /var/www/ironman.embluegroup.com.pa/index.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Pasaporte Digital - Funcionando</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            text-align: center; 
            padding-top: 100px; 
            margin: 0;
        }
        .container { 
            background: rgba(255,255,255,0.1); 
            padding: 2rem; 
            border-radius: 15px; 
            display: inline-block;
            backdrop-filter: blur(10px);
        }
        h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .status { color: #4ade80; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Pasaporte Digital</h1>
        <p class="status">✅ Servidor funcionando correctamente</p>
        <p>El proyecto se está configurando...</p>
        <p><small>ironman.embluegroup.com.pa</small></p>
    </div>
</body>
</html>
EOF
"@

Write-Host "📄 Creando página de prueba..." -ForegroundColor Cyan
Invoke-SSHCommand $vpsCommands

$vpsCommands = @"
cat > /etc/nginx/sites-available/ironman.embluegroup.com.pa << 'EOF'
server {
    listen 80;
    server_name ironman.embluegroup.com.pa;
    
    root /var/www/ironman.embluegroup.com.pa;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ =404;
    }
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF
"@

Write-Host "⚙️ Configurando Nginx..." -ForegroundColor Cyan
Invoke-SSHCommand $vpsCommands

$vpsCommands = @"
ln -sf /etc/nginx/sites-available/ironman.embluegroup.com.pa /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
systemctl enable nginx
"@

Write-Host "🔄 Habilitando sitio y reiniciando Nginx..." -ForegroundColor Cyan
Invoke-SSHCommand $vpsCommands

$vpsCommands = @"
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw --force enable
"@

Write-Host "🔥 Configurando firewall..." -ForegroundColor Cyan
Invoke-SSHCommand $vpsCommands

$vpsCommands = @"
systemctl status nginx
netstat -tlnp | grep :80
curl http://localhost
"@

Write-Host "🔍 Verificando configuración..." -ForegroundColor Cyan
Invoke-SSHCommand $vpsCommands

Write-Host ""
Write-Host "🎉 ¡Configuración completada!" -ForegroundColor Green
Write-Host "🌐 Verifica el sitio en: http://ironman.embluegroup.com.pa" -ForegroundColor Cyan
Write-Host "📊 Si funciona, podremos subir nuestro proyecto completo." -ForegroundColor Yellow

