# 🚀 Instrucciones de Despliegue - ironman.embluegroup.com

## ✅ Proyecto Listo
- ✅ Build optimizado completado
- ✅ Archivo .env.production creado
- ✅ Configuraciones para VPS preparadas

## 📋 Pasos para Desplegar

### 1. Conectar al VPS
```bash
ssh root@72.60.167.122
# Contraseña: X5v)bhC0,tZ8,r&WrAaS
```

### 2. Actualizar sistema e instalar dependencias
```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl enable docker
systemctl start docker

# Instalar Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Instalar Nginx
apt install nginx -y
systemctl enable nginx
systemctl start nginx

# Instalar Certbot para SSL
apt install certbot python3-certbot-nginx -y
```

### 3. Crear directorio y clonar repositorio
```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/luismorenoscom/pasaporte-digital.git
cd pasaporte-digital
```

### 4. Instalar dependencias y construir
```bash
# Instalar dependencias
npm install

# El build ya está hecho, pero si necesitas reconstruir:
# npm run build
```

### 5. Configurar variables de entorno
```bash
# El archivo .env.production ya está creado con la configuración correcta
# Verificar que existe:
cat .env.production
```

### 6. Iniciar servicios con Docker
```bash
# Iniciar todos los servicios
docker-compose -f docker-compose.prod.yml up -d --build

# Verificar que los contenedores estén corriendo
docker ps
```

### 7. Configurar Nginx
```bash
# Copiar configuración de Nginx
cp nginx.conf /etc/nginx/sites-available/pasaporte

# Crear enlace simbólico
ln -sf /etc/nginx/sites-available/pasaporte /etc/nginx/sites-enabled/

# Remover configuración por defecto
rm -f /etc/nginx/sites-enabled/default

# Verificar configuración
nginx -t

# Recargar Nginx
systemctl reload nginx
```

### 8. Configurar SSL con Let's Encrypt
```bash
# Configurar SSL automáticamente
certbot --nginx -d ironman.embluegroup.com --non-interactive --agree-tos --email admin@embluegroup.com
```

### 9. Verificar despliegue
```bash
# Verificar que todos los servicios estén corriendo
docker ps

# Verificar logs si hay problemas
docker logs pasaporte_backend
docker logs pasaporte_postgres

# Verificar que Nginx esté funcionando
systemctl status nginx
```

## 🌐 Resultado Final

Después de completar estos pasos, tu aplicación estará disponible en:

**🔗 https://ironman.embluegroup.com**

## 🔧 Comandos Útiles

### Monitoreo
```bash
# Ver estado de contenedores
docker ps

# Ver logs de la aplicación
docker logs -f pasaporte_backend

# Ver logs de la base de datos
docker logs -f pasaporte_postgres

# Verificar uso de recursos
docker stats
```

### Reiniciar servicios
```bash
# Reiniciar toda la aplicación
docker-compose -f docker-compose.prod.yml restart

# Reiniciar solo el backend
docker restart pasaporte_backend

# Reiniciar Nginx
systemctl restart nginx
```

### Actualizar aplicación
```bash
# Actualizar código
git pull origin main

# Reconstruir y reiniciar
docker-compose -f docker-compose.prod.yml up -d --build
```

## 🆘 Solución de Problemas

### Si la aplicación no carga:
1. Verificar que los puertos estén abiertos: `netstat -tlnp`
2. Verificar logs: `docker logs pasaporte_backend`
3. Verificar configuración de Nginx: `nginx -t`

### Si SSL no funciona:
1. Verificar que el dominio apunte a la IP: `nslookup ironman.embluegroup.com`
2. Reconfigurar SSL: `certbot --nginx -d ironman.embluegroup.com`

### Si la base de datos no conecta:
1. Verificar que PostgreSQL esté corriendo: `docker logs pasaporte_postgres`
2. Verificar variables de entorno: `cat .env.production`

## ✅ ¡Despliegue Completado!

Una vez que completes estos pasos, tendrás:
- ✅ Aplicación funcionando en https://ironman.embluegroup.com
- ✅ SSL automático con Let's Encrypt
- ✅ Base de datos PostgreSQL
- ✅ Nginx como servidor web
- ✅ Docker para orquestación
- ✅ Monitoreo y logs configurados

