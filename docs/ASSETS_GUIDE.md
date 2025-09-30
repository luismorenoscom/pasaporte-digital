# 📚 Guía de Manejo de Assets - Pasaporte Digital

Esta guía documenta el estándar adoptado para el manejo de assets (imágenes, videos, fuentes) en el proyecto, diseñado para evitar errores 404 en producción (Vercel/Linux).

## 🎯 Estrategia Híbrida

Utilizamos un modelo híbrido que diferencia entre **assets globales** y **assets por componente**:

### 1. Assets Globales → `public/`

**Ubicación**: `public/`  
**Uso**: Logos de marca, fondos generales, videos, favicons, manifest  
**Referencia**: Rutas absolutas desde el root (`/archivo.ext`)

#### ✅ Ejemplos correctos:

**En JSX/TSX:**
```tsx
<img src="/logo-infinity-stores.png" alt="Logo" />
<video src="/getty-images-1226358300.mp4" />
```

**En CSS/estilos inline:**
```tsx
style={{ backgroundImage: "url('/assets-fondo1.png')" }}
```

**En Head/Meta tags:**
```html
<link rel="icon" href="/favicon.ico" />
```

### 2. Assets por Componente → `src/assets/`

**Ubicación**: `src/assets/`  
**Uso**: Ilustraciones específicas, iconos de componentes  
**Referencia**: Import de ES6 (Vite los procesa y optimiza)

#### ✅ Ejemplos correctos:

```tsx
import heroImage from '@/assets/hero-illustration.png';

// En JSX
<img src={heroImage} alt="Hero" />

// En estilos inline
<div style={{ backgroundImage: `url(${heroImage})` }} />
```

## 📋 Convenciones de Nomenclatura

### Regla: **kebab-case minúsculas sin espacios ni acentos**

Linux/Vercel es **case-sensitive**, por lo que `Logo.svg` ≠ `logo.svg`

#### ✅ Nombres correctos:
- `logo-infinity-stores.png`
- `background-space.png`
- `getty-images-1226358300.mp4`
- `assets-fondo1.png`

#### ❌ Nombres incorrectos:
- `Logo.svg` (mayúscula)
- `GettyImages-1226358300.mp4` (camelCase)
- `assets fondo1.png` (espacios)
- `fondo_héroe.png` (acentos/underscores)

## 🗂️ Estructura de Assets

```
public/
├── logo-infinity-stores.png      # Logo principal
├── logo-ironman-pasaporte.png    # Logo secundario
├── assets-fondo1.png             # Fondo login
├── assets-fondo4.png             # Fondo alternativo
├── getty-images-1226358300.mp4   # Video background
├── intro.mp4                     # Video intro
├── video1.mp4                    # Video adicional
└── pasaporte/                    # Assets del pasaporte
    ├── estaciones/
    │   ├── blanco/               # Estaciones no completadas
    │   │   ├── reactor-b.png
    │   │   ├── stark-b.png
    │   │   └── ...
    │   ├── dorado/               # Estaciones completadas
    │   │   ├── reactor-d.png
    │   │   ├── stark-d.png
    │   │   └── ...
    │   └── negro/                # Estaciones bloqueadas
    ├── fondo/
    │   └── background-space.png  # Fondo del mapa
    └── vs/                       # Villanos/bosses
        ├── vs-ironmonger.png
        ├── vs-whiplash.png
        ├── vs-eldrich.png
        └── vs-thanos.png

src/assets/
└── react.svg                     # Assets específicos de componentes
```

## 🚫 Antipatrones - NO HACER

### ❌ Referencias relativas frágiles
```tsx
// MAL - Se rompe con rutas anidadas
<img src="../../../assets/logo.png" />
```

### ❌ Mezclar rutas absolutas con imports
```tsx
// MAL - Inconsistente
import logo from '@/assets/logo.png';
<img src="/logo.png" />  // ¿Cuál usar?
```

### ❌ URLs sin barra inicial para assets en public/
```tsx
// MAL - No funciona en subrutas
<img src="logo.png" />

// BIEN
<img src="/logo.png" />
```

### ❌ Case incorrecto
```tsx
// El archivo se llama logo-principal.png
<img src="/Logo-Principal.png" />  // ❌ Falla en Linux
<img src="/logo-principal.png" />  // ✅ Correcto
```

## 🔧 Configuración del Proyecto

### Vite Config
```ts
// vite.config.ts
import path from 'path';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### TypeScript Config
```json
// tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## ✅ Validación Automática

### Verificar assets antes de deploy:

```bash
npm run check:assets
```

Este script:
- ✅ Verifica que todos los assets referenciados existan
- ⚠️ Detecta problemas de case-sensitivity
- 📊 Genera reporte detallado con archivo:línea

### Build y test local:

```bash
npm run build:local
```

Esto compila el proyecto y lo sirve en `http://localhost:4173` para verificar que no hay 404s.

## 📝 Checklist Pre-Deploy

Antes de hacer push a Vercel, verifica:

- [ ] Todos los nombres de archivos en `kebab-case` minúsculas
- [ ] No hay espacios ni caracteres especiales en nombres
- [ ] Las carpetas también están en minúsculas (`blanco/`, `dorado/`, no `Blanco/`)
- [ ] `npm run check:assets` pasa sin errores
- [ ] `npm run build` completa exitosamente
- [ ] No hay warnings de assets en la consola del browser

## 🐛 Debugging de 404s en Producción

Si ves 404s en Vercel:

1. **Verifica el case exacto**: `logo.svg` vs `Logo.svg`
2. **Confirma que el asset existe en `public/`**
3. **Revisa la ruta**: debe empezar con `/` para assets en `public/`
4. **Ejecuta el validador localmente**: `npm run check:assets`

### Herramientas útiles:

```bash
# Listar todos los PNG en public/
Get-ChildItem public -Recurse -Filter *.png

# Ver referencias en código
grep -r "\.png" src/
```

## 📚 Recursos Adicionales

- [Vite Static Asset Handling](https://vitejs.dev/guide/assets.html)
- [Vercel Deployment Issues](https://vercel.com/docs/concepts/deployments/troubleshoot-a-build)

---

**Última actualización**: Septiembre 2025  
**Mantenido por**: Equipo Pasaporte Digital - Infinity Stores

