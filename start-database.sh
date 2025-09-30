#!/bin/bash

# Script para iniciar la base de datos del Sistema de Pasaporte Digital
# Autor: Infinity Stores

echo "🚀 Iniciando Sistema de Base de Datos - Pasaporte Digital"
echo "=================================================="

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker Desktop."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose."
    exit 1
fi

echo "✅ Docker y Docker Compose están instalados"

# Crear directorio de datos si no existe
mkdir -p database/init

echo "📦 Iniciando contenedores..."

# Iniciar los servicios
docker-compose up -d

# Esperar a que los servicios estén listos
echo "⏳ Esperando a que los servicios estén listos..."
sleep 10

# Verificar estado de los contenedores
echo "🔍 Verificando estado de los contenedores..."
docker-compose ps

# Verificar conexión a la base de datos
echo "🔗 Verificando conexión a la base de datos..."
if docker-compose exec postgres pg_isready -U pasaporte_user -d pasaporte_db; then
    echo "✅ Base de datos conectada correctamente"
else
    echo "❌ Error al conectar con la base de datos"
    exit 1
fi

# Verificar API
echo "🌐 Verificando API..."
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ API funcionando correctamente"
else
    echo "⚠️  API no responde aún, puede que necesite más tiempo"
fi

echo ""
echo "🎉 ¡Sistema iniciado correctamente!"
echo ""
echo "📊 Servicios disponibles:"
echo "  • PostgreSQL: localhost:5432"
echo "  • pgAdmin: http://localhost:5050"
echo "  • Backend API: http://localhost:3001"
echo ""
echo "🔑 Credenciales:"
echo "  • pgAdmin: admin@pasaporte.com / admin123"
echo "  • PostgreSQL: pasaporte_user / pasaporte_password"
echo ""
echo "📚 Para más información, consulta README-DATABASE.md"
echo ""
echo "🛑 Para detener los servicios: docker-compose down"
