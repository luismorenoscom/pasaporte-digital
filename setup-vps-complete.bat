@echo off
echo 🚀 Configurando VPS completamente...
echo.

echo 📦 Paso 1: Verificando estado actual...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl status nginx --no-pager -l"

echo.
echo 📦 Paso 2: Actualizando sistema...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "apt-get update"

echo.
echo 📦 Paso 3: Instalando servicios...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "apt-get install -y nginx nodejs npm postgresql postgresql-contrib curl ufw"

echo.
echo 🗄️ Paso 4: Configurando PostgreSQL...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl start postgresql"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl enable postgresql"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "sudo -u postgres psql -c \"CREATE USER pasaporte_user WITH PASSWORD 'pasaporte_password';\""
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "sudo -u postgres psql -c \"CREATE DATABASE pasaporte_db OWNER pasaporte_user;\""

echo.
echo 📁 Paso 5: Creando directorio del dominio...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "mkdir -p /var/www/ironman.embluegroup.com.pa"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "chown -R www-data:www-data /var/www/ironman.embluegroup.com.pa"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "chmod -R 755 /var/www/ironman.embluegroup.com.pa"

echo.
echo 📄 Paso 6: Creando página de prueba...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "echo '<h1>🚀 Pasaporte Digital - Funcionando!</h1>' > /var/www/ironman.embluegroup.com.pa/index.html"

echo.
echo ⚙️ Paso 7: Configurando Nginx...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "cat > /etc/nginx/sites-available/ironman.embluegroup.com.pa << 'EOF'
server {
    listen 80;
    server_name ironman.embluegroup.com.pa;
    
    root /var/www/ironman.embluegroup.com.pa;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF"

echo.
echo 🔄 Paso 8: Habilitando sitio...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ln -sf /etc/nginx/sites-available/ironman.embluegroup.com.pa /etc/nginx/sites-enabled/"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "rm -f /etc/nginx/sites-enabled/default"

echo.
echo 🔄 Paso 9: Reiniciando Nginx...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "nginx -t"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl restart nginx"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl enable nginx"

echo.
echo 🔥 Paso 10: Configurando firewall...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ufw allow 80/tcp"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ufw allow 443/tcp"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ufw allow 22/tcp"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ufw --force enable"

echo.
echo 🔍 Paso 11: Verificando configuración...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl status nginx --no-pager"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "netstat -tlnp | grep :80"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "curl http://localhost"

echo.
echo 🎉 ¡Configuración completada!
echo 🌐 Verifica el sitio en: http://ironman.embluegroup.com.pa
echo.
pause

