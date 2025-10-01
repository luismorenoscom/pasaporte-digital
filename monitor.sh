#!/bin/bash

# Script de monitoreo para Pasaporte Digital
# Uso: ./monitor.sh

set -e

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar estado de los servicios
check_service() {
    local service=$1
    local port=$2
    
    if curl -s -f "http://localhost:$port" > /dev/null 2>&1; then
        print_status "✅ $service está funcionando en puerto $port"
        return 0
    else
        print_error "❌ $service no está respondiendo en puerto $port"
        return 1
    fi
}

# Verificar uso de recursos
check_resources() {
    print_status "📊 Estado de recursos del sistema:"
    echo "CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)%"
    echo "Memoria: $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
    echo "Disco: $(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 ")"}')"
    echo ""
}

# Verificar logs de errores
check_logs() {
    print_status "📋 Verificando logs de errores:"
    
    # Logs de Nginx
    if [ -f "/var/log/nginx/pasaporte_error.log" ]; then
        local nginx_errors=$(grep -c "error" /var/log/nginx/pasaporte_error.log 2>/dev/null || echo "0")
        if [ "$nginx_errors" -gt 0 ]; then
            print_warning "Nginx tiene $nginx_errors errores en los logs"
        else
            print_status "✅ Nginx sin errores"
        fi
    fi
    
    # Logs de Docker
    local docker_errors=$(docker logs pasaporte_backend 2>&1 | grep -c "error" || echo "0")
    if [ "$docker_errors" -gt 0 ]; then
        print_warning "Backend tiene $docker_errors errores en los logs"
    else
        print_status "✅ Backend sin errores"
    fi
    echo ""
}

# Verificar conectividad de base de datos
check_database() {
    print_status "🗄️ Verificando base de datos:"
    
    if docker exec pasaporte_postgres pg_isready -U pasaporte_user -d pasaporte_db > /dev/null 2>&1; then
        print_status "✅ Base de datos PostgreSQL está funcionando"
        
        # Verificar tablas
        local table_count=$(docker exec pasaporte_postgres psql -U pasaporte_user -d pasaporte_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | tr -d ' ')
        print_status "📊 Número de tablas: $table_count"
    else
        print_error "❌ Base de datos PostgreSQL no está respondiendo"
    fi
    echo ""
}

# Función principal
main() {
    echo "🔍 Monitoreo de Pasaporte Digital - $(date)"
    echo "=================================================="
    echo ""
    
    check_resources
    
    print_status "🌐 Verificando servicios web:"
    check_service "Frontend" "80"
    check_service "Backend API" "3001"
    echo ""
    
    check_database
    check_logs
    
    print_status "📈 Estado de contenedores Docker:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    
    print_status "🔄 Uso de espacio en disco:"
    docker system df
    echo ""
    
    print_status "✅ Monitoreo completado"
}

# Ejecutar monitoreo
main
