@echo off
echo 🚀 Subiendo proyecto completo al VPS
echo.

echo 📁 Preparando archivos...
if not exist "dist" (
    echo ❌ Error: No se encontró la carpeta dist
    echo Ejecuta: npm run build
    pause
    exit /b 1
)

echo ✅ Carpeta dist encontrada

echo.
echo 📤 Intentando subir archivos...

REM Intentar con SCP
echo Método 1: SCP
scp -r ./dist/* root@72.60.167.122:/var/www/ironman.embluegroup.com.pa/ 2>nul
if %errorlevel% == 0 (
    echo ✅ Archivos subidos exitosamente con SCP
    goto :test
)

echo ❌ SCP falló, intentando con PSCP...

REM Intentar con PSCP (PuTTY)
pscp -r ./dist/* root@72.60.167.122:/var/www/ironman.embluegroup.com.pa/ 2>nul
if %errorlevel% == 0 (
    echo ✅ Archivos subidos exitosamente con PSCP
    goto :test
)

echo ❌ PSCP falló, intentando con SFTP...

REM Intentar con SFTP
echo put -r dist/* /var/www/ironman.embluegroup.com.pa/ | sftp root@72.60.167.122 2>nul
if %errorlevel% == 0 (
    echo ✅ Archivos subidos exitosamente con SFTP
    goto :test
)

echo ❌ Todos los métodos de transferencia fallaron
echo.
echo 🔧 Solución manual:
echo 1. Conecta manualmente: ssh root@72.60.167.122
echo 2. Contraseña: X5v)bhC0,tZ8,r&WrAaS
echo 3. Ejecuta: rm -rf /var/www/ironman.embluegroup.com.pa/*
echo 4. Desde otra terminal: scp -r ./dist/* root@72.60.167.122:/var/www/ironman.embluegroup.com.pa/
goto :end

:test
echo.
echo 🧪 Probando el sitio...
timeout /t 3 /nobreak >nul
curl -s -o nul -w "%%{http_code}" http://ironman.embluegroup.com.pa
if %errorlevel% == 0 (
    echo ✅ Sitio funcionando correctamente
    echo 🌐 Visita: http://ironman.embluegroup.com.pa
) else (
    echo ⚠️ Sitio puede no estar funcionando aún
    echo 🔄 Espera unos segundos y recarga la página
)

:end
echo.
echo 🎉 Proceso completado
pause

