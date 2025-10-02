@echo off
echo 🚀 Configurando VPS - ironman.embluegroup.com.pa
echo.

echo 📦 Actualizando sistema...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "apt-get update"

echo.
echo 📦 Instalando servicios básicos...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "apt-get install -y nginx nodejs npm postgresql postgresql-contrib curl"

echo.
echo 🗄️ Configurando PostgreSQL...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl start postgresql"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl enable postgresql"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "sudo -u postgres psql -c \"CREATE USER pasaporte_user WITH PASSWORD 'pasaporte_password';\""
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "sudo -u postgres psql -c \"CREATE DATABASE pasaporte_db OWNER pasaporte_user;\""

echo.
echo 📁 Creando directorio del dominio...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "mkdir -p /var/www/ironman.embluegroup.com.pa"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "chown -R www-data:www-data /var/www/ironman.embluegroup.com.pa"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "chmod -R 755 /var/www/ironman.embluegroup.com.pa"

echo.
echo 📄 Creando página de prueba...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "echo '<h1>🚀 Pasaporte Digital - Funcionando!</h1>' > /var/www/ironman.embluegroup.com.pa/index.html"

echo.
echo ⚙️ Configurando Nginx...
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
echo 🔄 Habilitando sitio...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ln -sf /etc/nginx/sites-available/ironman.embluegroup.com.pa /etc/nginx/sites-enabled/"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "rm -f /etc/nginx/sites-enabled/default"

echo.
echo 🔄 Reiniciando Nginx...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "nginx -t"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl restart nginx"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl enable nginx"

echo.
echo 🔥 Configurando firewall...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ufw allow 80/tcp"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ufw allow 443/tcp"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ufw allow 22/tcp"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "ufw --force enable"

echo.
echo 🔍 Verificando configuración...
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "systemctl status nginx"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "netstat -tlnp | grep :80"
plink -ssh root@72.60.167.122 -pw "X5v)bhC0,tZ8,r&WrAaS" "curl http://localhost"

echo.
echo 🎉 ¡Configuración completada!
echo 🌐 Verifica el sitio en: http://ironman.embluegroup.com.pa
echo.
pause

