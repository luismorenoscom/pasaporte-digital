# Script para iniciar la base de datos del Sistema de Pasaporte Digital
# Autor: Infinity Stores

Write-Host "🚀 Iniciando Sistema de Base de Datos - Pasaporte Digital" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Verificar si Docker está instalado
try {
    docker --version | Out-Null
    Write-Host "✅ Docker está instalado" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está instalado. Por favor instala Docker Desktop." -ForegroundColor Red
    exit 1
}

# Verificar si Docker Compose está instalado
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose está instalado" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose no está instalado. Por favor instala Docker Compose." -ForegroundColor Red
    exit 1
}

# Crear directorio de datos si no existe
if (!(Test-Path "database\init")) {
    New-Item -ItemType Directory -Path "database\init" -Force
    Write-Host "📁 Directorio database\init creado" -ForegroundColor Yellow
}

Write-Host "📦 Iniciando contenedores..." -ForegroundColor Yellow

# Iniciar los servicios
docker-compose up -d

# Esperar a que los servicios estén listos
Write-Host "⏳ Esperando a que los servicios estén listos..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar estado de los contenedores
Write-Host "🔍 Verificando estado de los contenedores..." -ForegroundColor Yellow
docker-compose ps

# Verificar conexión a la base de datos
Write-Host "🔗 Verificando conexión a la base de datos..." -ForegroundColor Yellow
try {
    docker-compose exec postgres pg_isready -U pasaporte_user -d pasaporte_db
    Write-Host "✅ Base de datos conectada correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al conectar con la base de datos" -ForegroundColor Red
    exit 1
}

# Verificar API
Write-Host "🌐 Verificando API..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ API funcionando correctamente" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  API no responde aún, puede que necesite más tiempo" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 ¡Sistema iniciado correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Servicios disponibles:" -ForegroundColor Cyan
Write-Host "  • PostgreSQL: localhost:5432" -ForegroundColor White
Write-Host "  • pgAdmin: http://localhost:5050" -ForegroundColor White
Write-Host "  • Backend API: http://localhost:3001" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Credenciales:" -ForegroundColor Cyan
Write-Host "  • pgAdmin: admin@pasaporte.com / admin123" -ForegroundColor White
Write-Host "  • PostgreSQL: pasaporte_user / pasaporte_password" -ForegroundColor White
Write-Host ""
Write-Host "📚 Para más información, consulta README-DATABASE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🛑 Para detener los servicios: docker-compose down" -ForegroundColor Yellow
