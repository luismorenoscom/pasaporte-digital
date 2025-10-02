# Script simple de despliegue
Write-Host "Construyendo proyecto..." -ForegroundColor Green
npm run build

Write-Host "Creando archivo de configuracion..." -ForegroundColor Green
@"
NODE_ENV=production
VITE_API_URL=https://ironman.embluegroup.com/api
VITE_APP_NAME=Pasaporte Digital
VITE_APP_VERSION=1.0.0
DB_HOST=postgres
DB_PORT=5432
DB_NAME=pasaporte_db
DB_USER=pasaporte_user
DB_PASSWORD=IronMan2024!SecurePass
JWT_SECRET=IronMan_Pasaporte_2024_Super_Secret_Key_For_JWT_Tokens
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://ironman.embluegroup.com
PORT=3001
"@ | Out-File -FilePath ".env.production" -Encoding UTF8

Write-Host "Archivos listos para subir al VPS" -ForegroundColor Green
Write-Host "Conecta al VPS y ejecuta:" -ForegroundColor Yellow
Write-Host "ssh root@72.60.167.122" -ForegroundColor White
Write-Host "Luego sube los archivos y configura el servidor" -ForegroundColor White

