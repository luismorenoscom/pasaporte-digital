# Script para subir proyecto al VPS
Write-Host "🚀 Subiendo proyecto al VPS..." -ForegroundColor Green

$VPS_IP = "72.60.167.122"
$VPS_USER = "root"
$VPS_PASSWORD = "X5v)bhC0,tZ8,r&WrAaS"
$REMOTE_PATH = "/var/www/ironman.embluegroup.com.pa"

# Verificar que existe la carpeta dist
if (-not (Test-Path "./dist")) {
    Write-Host "❌ Error: No se encontró la carpeta dist" -ForegroundColor Red
    Write-Host "Ejecuta: npm run build" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Carpeta dist encontrada" -ForegroundColor Green

# Función para intentar conexión SSH
function Test-SSHConnection {
    param([string]$Host, [string]$User, [string]$Password)
    
    try {
        $result = plink -ssh $User@$Host -pw $Password "echo 'conectado'" 2>$null
        return $LASTEXITCODE -eq 0
    } catch {
        return $false
    }
}

# Función para subir archivos usando diferentes métodos
function Upload-Files {
    param([string]$LocalPath, [string]$RemotePath, [string]$Host, [string]$User, [string]$Password)
    
    Write-Host "📤 Intentando subir archivos..." -ForegroundColor Yellow
    
    # Método 1: SCP
    Write-Host "Método 1: SCP" -ForegroundColor Cyan
    try {
        $result = scp -r $LocalPath/* $User@$Host`:$RemotePath/ 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Archivos subidos exitosamente con SCP" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "❌ SCP falló" -ForegroundColor Red
    }
    
    # Método 2: PSCP
    Write-Host "Método 2: PSCP (PuTTY)" -ForegroundColor Cyan
    try {
        $result = pscp -r $LocalPath/* $User@$Host`:$RemotePath/ 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Archivos subidos exitosamente con PSCP" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "❌ PSCP falló" -ForegroundColor Red
    }
    
    # Método 3: SSH + tar
    Write-Host "Método 3: SSH + tar" -ForegroundColor Cyan
    try {
        # Crear archivo tar localmente
        Write-Host "Creando archivo tar..." -ForegroundColor Yellow
        $tarFile = "dist.tar.gz"
        tar -czf $tarFile -C dist .
        
        # Subir archivo tar
        $result = scp $tarFile $User@$Host`:/tmp/ 2>$null
        if ($LASTEXITCODE -eq 0) {
            # Extraer en el servidor
            $extractCmd = "cd $RemotePath && tar -xzf /tmp/$tarFile && rm /tmp/$tarFile"
            $result = plink -ssh $User@$Host -pw $Password $extractCmd 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Archivos subidos exitosamente con SSH + tar" -ForegroundColor Green
                Remove-Item $tarFile -ErrorAction SilentlyContinue
                return $true
            }
        }
    } catch {
        Write-Host "❌ SSH + tar falló" -ForegroundColor Red
    }
    
    return $false
}

# Verificar conexión SSH
Write-Host "🔍 Verificando conexión SSH..." -ForegroundColor Yellow
if (-not (Test-SSHConnection -Host $VPS_IP -User $VPS_USER -Password $VPS_PASSWORD)) {
    Write-Host "❌ No se puede conectar al VPS" -ForegroundColor Red
    Write-Host "🔧 Solución manual:" -ForegroundColor Yellow
    Write-Host "1. Abre una terminal nueva" -ForegroundColor White
    Write-Host "2. Ejecuta: ssh root@72.60.167.122" -ForegroundColor Gray
    Write-Host "3. Contraseña: $VPS_PASSWORD" -ForegroundColor Gray
    Write-Host "4. Ejecuta: rm -rf /var/www/ironman.embluegroup.com.pa/*" -ForegroundColor Gray
    Write-Host "5. Desde otra terminal: scp -r ./dist/* root@72.60.167.122:/var/www/ironman.embluegroup.com.pa/" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Conexión SSH exitosa" -ForegroundColor Green

# Limpiar directorio remoto
Write-Host "🧹 Limpiando directorio remoto..." -ForegroundColor Yellow
$cleanCmd = "rm -rf $REMOTE_PATH/*"
$result = plink -ssh $VPS_USER@$VPS_IP -pw $VPS_PASSWORD $cleanCmd 2>$null

# Subir archivos
if (Upload-Files -LocalPath "./dist" -RemotePath $REMOTE_PATH -Host $VPS_IP -User $VPS_USER -Password $VPS_PASSWORD) {
    Write-Host "🎉 ¡Proyecto subido exitosamente!" -ForegroundColor Green
    
    # Probar el sitio
    Write-Host "🧪 Probando el sitio..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    
    try {
        $response = Invoke-WebRequest -Uri "http://ironman.embluegroup.com.pa" -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ ¡Sitio funcionando correctamente!" -ForegroundColor Green
            Write-Host "🌐 Visita: http://ironman.embluegroup.com.pa" -ForegroundColor Cyan
        } else {
            Write-Host "⚠️ Sitio responde pero con código: $($response.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "⚠️ No se pudo verificar el sitio automáticamente" -ForegroundColor Yellow
        Write-Host "🌐 Visita manualmente: http://ironman.embluegroup.com.pa" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ No se pudieron subir los archivos" -ForegroundColor Red
    Write-Host "🔧 Usa la solución manual mostrada arriba" -ForegroundColor Yellow
}

Write-Host "`n🎯 Proceso completado" -ForegroundColor Green

