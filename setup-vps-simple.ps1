# Script simple para configurar el VPS
Write-Host "🚀 Configurando VPS - ironman.embluegroup.com.pa" -ForegroundColor Green

$VPS_IP = "72.60.167.122"
$VPS_USER = "root"
$VPS_PASSWORD = "X5v)bhC0,tZ8,r&WrAaS"

Write-Host "📋 Instrucciones para configurar el VPS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Conectar al VPS:" -ForegroundColor White
Write-Host "   ssh root@$VPS_IP" -ForegroundColor Gray
Write-Host "   Contraseña: $VPS_PASSWORD" -ForegroundColor Gray
Write-Host ""

Write-Host "2. Ejecutar estos comandos uno por uno:" -ForegroundColor White

$commands = @"
# Actualizar sistema
apt-get update
apt-get upgrade -y

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
echo '<h1>🚀 Pasaporte Digital - Funcionando!</h1>' > /var/www/ironman.embluegroup.com.pa/index.html

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

Write-Host ""
Write-Host "3. Verificar que funciona:" -ForegroundColor White
Write-Host "   curl http://localhost" -ForegroundColor Gray
Write-Host "   curl http://ironman.embluegroup.com.pa" -ForegroundColor Gray

Write-Host ""
Write-Host "🌐 Una vez completado, el sitio estará disponible en:" -ForegroundColor Green
Write-Host "   http://ironman.embluegroup.com.pa" -ForegroundColor Cyan

Write-Host ""
Write-Host "📤 Después podremos subir nuestro proyecto completo usando:" -ForegroundColor Yellow
Write-Host "   scp -r ./dist/* root@$VPS_IP:/var/www/ironman.embluegroup.com.pa/" -ForegroundColor Gray
Write-Host "   scp -r ./backend root@$VPS_IP:/opt/pasaporte-backend/" -ForegroundColor Gray

