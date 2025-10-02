# Pasaporte Digital - Sistema de Gestión

Sistema de gestión de pasaportes digitales desarrollado con React, Node.js y PostgreSQL.

## 🚀 Características

- **Frontend**: React 19 + Vite + TypeScript
- **Backend**: Node.js + Express + PostgreSQL
- **Base de datos**: PostgreSQL con Docker
- **Autenticación**: JWT
- **UI**: Tailwind CSS + Framer Motion
- **Despliegue**: Vercel (Frontend) + VPS (Backend)

## 📋 Prerrequisitos

- Node.js 18+
- Docker Desktop
- Git

## 🛠️ Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/pasaporte.git
cd pasaporte
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd backend
npm install
cd ..
```

### 4. Levantar la base de datos
```bash
docker-compose up -d postgres
```

### 5. Configurar variables de entorno
Crear archivo `backend/.env`:
```env
NODE_ENV=development
DB_HOST=localhost
DB_USER=pasaporte_user
DB_NAME=pasaporte_db
DB_PASSWORD=pasaporte_password
DB_PORT=5432
PORT=3001
JWT_SECRET=tu_jwt_secret_aqui
```

### 6. Levantar el proyecto
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **pgAdmin**: http://localhost:5050

## 📦 Scripts Disponibles

### Frontend
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run build:vercel` - Build para Vercel
- `npm run preview` - Preview del build

### Backend
- `npm run dev` - Servidor de desarrollo con nodemon
- `npm start` - Servidor de producción
- `npm run migrate` - Ejecutar migraciones
- `npm run seed` - Poblar base de datos

## 🐳 Docker

### Levantar todos los servicios
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f
```

### Detener servicios
```bash
docker-compose down
```

## 🚀 Despliegue en Vercel

### 1. Conectar con GitHub
1. Subir el proyecto a GitHub
2. Conectar el repositorio con Vercel
3. Configurar variables de entorno en Vercel

### 2. Variables de entorno en Vercel
```
VITE_API_URL=https://tu-backend-url.com/api
```

### 3. Build automático
El proyecto se despliega automáticamente al hacer push a la rama main.

## 📁 Estructura del Proyecto

```
pasaporte/
├── src/                    # Código fuente del frontend
│   ├── components/         # Componentes React
│   ├── pages/             # Páginas de la aplicación
│   ├── features/          # Características específicas
│   └── context/           # Context API
├── backend/               # API del backend
│   ├── src/
│   │   ├── routes/        # Rutas de la API
│   │   ├── database/      # Configuración de BD
│   │   └── middleware/    # Middlewares
├── public/                # Archivos estáticos
├── database/              # Scripts de base de datos
└── docs/                  # Documentación
```

## 🔧 Configuración de Base de Datos

### Crear tablas
```bash
# Los scripts se ejecutan automáticamente con Docker
# O manualmente:
psql -h localhost -U pasaporte_user -d pasaporte_db -f database/init/01_create_tables.sql
```

### Poblar datos iniciales
```bash
psql -h localhost -U pasaporte_user -d pasaporte_db -f database/init/02_seed_data.sql
```

## 🧪 Testing

```bash
# Frontend
npm run test

# Backend
cd backend
npm test
```

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registro
- `POST /api/auth/logout` - Cerrar sesión

### Usuarios
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario

### Roles
- `GET /api/roles` - Listar roles
- `POST /api/roles` - Crear rol

### Sucursales
- `GET /api/branches` - Listar sucursales
- `POST /api/branches` - Crear sucursal

### Tareas
- `GET /api/tasks` - Listar tareas
- `POST /api/tasks` - Crear tarea

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Infinity Stores** - *Desarrollo inicial*

## 📞 Soporte

Para soporte, envía un email a soporte@infinitystores.com o crea un issue en GitHub.

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!