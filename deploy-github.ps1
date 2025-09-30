# Script de PowerShell para subir a GitHub
Write-Host "🚀 Subiendo proyecto a GitHub..." -ForegroundColor Green
Write-Host ""

# Verificar que Git esté instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git detectado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git no está instalado. Por favor instálalo primero." -ForegroundColor Red
    exit 1
}

# Verificar que estamos en un repositorio Git
if (-not (Test-Path ".git")) {
    Write-Host "📁 Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
}

# Agregar todos los archivos
Write-Host "📋 Agregando archivos..." -ForegroundColor Yellow
git add .

# Hacer commit
Write-Host "💾 Haciendo commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Pasaporte Digital - Sistema de gamificación"

# Verificar si hay un remote origin
$remoteOrigin = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "🔗 Configurando repositorio remoto..." -ForegroundColor Yellow
    $repoUrl = Read-Host "Ingresa la URL de tu repositorio de GitHub (ej: https://github.com/tu-usuario/pasaporte.git)"
    git remote add origin $repoUrl
} else {
    Write-Host "✅ Repositorio remoto ya configurado: $remoteOrigin" -ForegroundColor Green
}

# Subir a GitHub
Write-Host "⬆️ Subiendo a GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡Proyecto subido a GitHub exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎯 Próximos pasos:" -ForegroundColor Cyan
    Write-Host "   1. Ve a https://vercel.com" -ForegroundColor White
    Write-Host "   2. Inicia sesión con GitHub" -ForegroundColor White
    Write-Host "   3. Importa tu repositorio" -ForegroundColor White
    Write-Host "   4. Configura las variables de entorno" -ForegroundColor White
    Write-Host "   5. ¡Despliega!" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Lee DESPLIEGUE_VERCEL.md para instrucciones detalladas" -ForegroundColor Cyan
} else {
    Write-Host "❌ Error al subir a GitHub" -ForegroundColor Red
    Write-Host "Verifica que la URL del repositorio sea correcta" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
