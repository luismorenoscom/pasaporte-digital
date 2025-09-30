# 🚀 Pasaporte Digital - Infinity Stores

Sistema de gamificación para merchandisers con pasaporte digital interactivo.

## 🎯 Características

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + PostgreSQL
- **Base de datos**: PostgreSQL con Docker
- **Autenticación**: JWT
- **UI**: Tailwind CSS + Framer Motion

## 🚀 Despliegue Rápido

### Opción 1: Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/pasaporte)

### Opción 2: Local con Docker

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/pasaporte.git
cd pasaporte

# Iniciar con Docker
docker-compose up -d

# El proyecto estará disponible en:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# pgAdmin: http://localhost:5050
```

### Opción 3: Desarrollo Local

```bash
# Instalar dependencias
npm install
cd backend && npm install

# Iniciar base de datos
docker-compose up postgres -d

# Iniciar backend
cd backend && npm run dev

# Iniciar frontend (nueva terminal)
npm run dev
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL=postgresql://pasaporte_user:pasaporte_password@localhost:5432/pasaporte_db

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro

# Frontend
VITE_API_URL=http://localhost:3001/api
```

### Base de Datos

El proyecto incluye scripts SQL para crear las tablas:

```bash
# Ejecutar migraciones
cd backend && npm run migrate

# Poblar con datos de prueba
cd backend && npm run seed
```

## 📱 Funcionalidades

- **Sistema de Roles**: Super Admin, Admin Agencia, Supervisor, Tasker, Merchandiser
- **Pasaporte Digital**: Estaciones interactivas con puntos
- **Dashboard**: Estadísticas y rankings
- **Gestión de Usuarios**: CRUD completo
- **Sistema de Tareas**: Asignación y seguimiento
- **Reportes**: Análisis de rendimiento

## 🔑 Credenciales por Defecto

- **Email**: admin@pasaporte.com
- **Contraseña**: admin123

## 🛠️ Tecnologías

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router

### Backend
- Node.js
- Express
- PostgreSQL
- JWT
- bcryptjs
- Express Validator

### DevOps
- Docker
- Docker Compose
- Vercel
- GitHub Actions

## 📁 Estructura del Proyecto

```
pasaporte/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   ├── context/           # Context API
│   └── features/          # Funcionalidades específicas
├── backend/               # Backend Node.js
│   ├── src/
│   │   ├── routes/        # Rutas de la API
│   │   ├── middleware/    # Middlewares
│   │   └── database/      # Configuración de BD
│   └── package.json
├── database/              # Scripts SQL
│   └── init/
├── public/                # Assets estáticos
└── docker-compose.yml     # Configuración Docker
```

## 🚀 Despliegue en Vercel

1. **Fork** este repositorio
2. Conecta tu cuenta de Vercel con GitHub
3. Importa el proyecto en Vercel
4. Configura las variables de entorno
5. ¡Despliega!

### Variables de Entorno en Vercel

```
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu_jwt_secret_muy_seguro
NODE_ENV=production
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Infinity Stores** - Desarrollo y diseño

## 📞 Soporte

Para soporte, envía un email a soporte@infinitystores.com