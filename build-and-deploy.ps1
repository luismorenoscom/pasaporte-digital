# Script completo para build y deploy del proyecto Pasaporte Digital
# Ejecutar: .\build-and-deploy.ps1

param(
    [string]$VPS_IP = "72.60.167.122",
    [string]$VPS_USER = "root",
    [string]$VPS_PASS = "E/5vghiQS?RLO,F3VPML",
    [string]$DOMAIN = "ironman.embluegroup.com.pa"
)

Write-Host "🚀 Build y Deploy completo del proyecto Pasaporte Digital" -ForegroundColor Green
Write-Host "VPS: $VPS_IP" -ForegroundColor Cyan
Write-Host "Dominio: $DOMAIN" -ForegroundColor Cyan

# Verificar si sshpass está instalado
try {
    sshpass -V | Out-Null
    Write-Host "✅ sshpass encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ sshpass no está instalado" -ForegroundColor Red
    Write-Host "💡 Instala sshpass o usa PuTTY para conectarte manualmente" -ForegroundColor Yellow
    Write-Host "   Descarga: https://sourceforge.net/projects/sshpass/" -ForegroundColor White
    exit 1
}

# Paso 1: Revisar VPS
Write-Host "`n📋 PASO 1: Revisando VPS..." -ForegroundColor Magenta
Write-Host "Ejecutando: .\deploy-to-vps.ps1" -ForegroundColor Yellow
& ".\deploy-to-vps.ps1" -VPS_IP $VPS_IP -VPS_USER $VPS_USER -VPS_PASS $VPS_PASS -DOMAIN $DOMAIN

# Pausa para revisar
Write-Host "`n⏸️ Revisa la información del VPS arriba." -ForegroundColor Yellow
Write-Host "Presiona cualquier tecla para continuar con la configuración..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Paso 2: Configurar VPS
Write-Host "`n📋 PASO 2: Configurando VPS..." -ForegroundColor Magenta
Write-Host "Ejecutando: .\setup-vps.ps1" -ForegroundColor Yellow
& ".\setup-vps.ps1" -VPS_IP $VPS_IP -VPS_USER $VPS_USER -VPS_PASS $VPS_PASS -DOMAIN $DOMAIN

# Pausa para verificar configuración
Write-Host "`n⏸️ VPS configurado. Verifica que no haya errores." -ForegroundColor Yellow
Write-Host "Presiona cualquier tecla para continuar con el despliegue..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Paso 3: Desplegar proyecto
Write-Host "`n📋 PASO 3: Desplegando proyecto..." -ForegroundColor Magenta
Write-Host "Ejecutando: .\deploy-project.ps1" -ForegroundColor Yellow
& ".\deploy-project.ps1" -VPS_IP $VPS_IP -VPS_USER $VPS_USER -VPS_PASS $VPS_PASS -DOMAIN $DOMAIN

Write-Host "`n🎉 ¡Proceso completado!" -ForegroundColor Green
Write-Host "🌐 Tu proyecto debería estar disponible en: http://$DOMAIN" -ForegroundColor Cyan
Write-Host "🔧 API disponible en: http://$DOMAIN/api" -ForegroundColor Cyan

Write-Host "`n📋 Comandos útiles:" -ForegroundColor Cyan
Write-Host "Ver logs: ssh $VPS_USER@$VPS_IP 'pm2 logs pasaporte-backend'" -ForegroundColor White
Write-Host "Reiniciar: ssh $VPS_USER@$VPS_IP 'pm2 restart pasaporte-backend'" -ForegroundColor White
Write-Host "Estado: ssh $VPS_USER@$VPS_IP 'pm2 status'" -ForegroundColor White
