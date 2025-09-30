# 🗄️ Base de Datos - Sistema de Pasaporte Digital

Este documento describe cómo configurar y usar la base de datos del sistema de Pasaporte Digital usando Docker.

## 🚀 Inicio Rápido

### Prerrequisitos
- Docker Desktop instalado
- Docker Compose instalado

### 1. Iniciar los servicios

```bash
# Iniciar todos los servicios (PostgreSQL, pgAdmin, Backend)
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f postgres
docker-compose logs -f backend
```

### 2. Verificar que todo funciona

```bash
# Verificar que los contenedores estén ejecutándose
docker-compose ps

# Probar la API
curl http://localhost:3001/api/health

# Probar la base de datos
curl http://localhost:3001/api/roles
```

## 🏗️ Arquitectura de la Base de Datos

### Servicios Docker

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| PostgreSQL | 5432 | Base de datos principal |
| pgAdmin | 5050 | Interfaz web para administrar la BD |
| Backend API | 3001 | API REST del sistema |

### Estructura de Tablas

#### Tablas Principales
- **countries** - Países donde opera el sistema
- **agencies** - Agencias por país
- **branches** - Sucursales por agencia
- **roles** - Roles del sistema (mercaderista, supervisor, etc.)
- **users** - Usuarios del sistema
- **stations** - Estaciones del pasaporte digital
- **tasks** - Tareas asignadas a usuarios
- **activity_logs** - Log de actividades del sistema

#### Jerarquía de Roles
1. **Mercaderista** (Nivel 1) - Solo su pasaporte e historial
2. **Supervisor** (Nivel 2) - Ve mercaderistas de su sucursal
3. **Tasker** (Nivel 3) - Gestiona tareas de su sucursal
4. **Admin Agencia** (Nivel 4) - Administra usuarios de su país
5. **Super Admin** (Nivel 5) - Acceso global al sistema

## 🔧 Comandos Útiles

### Gestión de Contenedores

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Reiniciar un servicio específico
docker-compose restart postgres

# Ver logs
docker-compose logs -f backend

# Ejecutar comandos en el contenedor de PostgreSQL
docker-compose exec postgres psql -U pasaporte_user -d pasaporte_db

# Ejecutar comandos en el contenedor del backend
docker-compose exec backend npm run migrate
```

### Acceso a la Base de Datos

#### Via pgAdmin (Recomendado)
1. Abrir http://localhost:5050
2. Login: `admin@pasaporte.com` / `admin123`
3. Agregar servidor:
   - Host: `postgres`
   - Puerto: `5432`
   - Usuario: `pasaporte_user`
   - Contraseña: `pasaporte_password`

#### Via línea de comandos
```bash
# Conectar directamente
docker-compose exec postgres psql -U pasaporte_user -d pasaporte_db

# Ejecutar consultas
docker-compose exec postgres psql -U pasaporte_user -d pasaporte_db -c "SELECT * FROM roles;"
```

## 📊 Datos de Prueba

### Usuarios Demo

| Email | Contraseña | Rol | Descripción |
|-------|------------|-----|-------------|
| lms@luismorenos.com | 123456 | Mercaderista | Usuario normal |
| carlos@luismorenos.com | 654321 | Mercaderista | Usuario normal |
| maria@luismorenos.com | 111111 | Mercaderista | Usuario normal |
| supervisor1@luismorenos.com | super123 | Supervisor | Sucursal Centro |
| tasker1@luismorenos.com | task123 | Tasker | Sucursal Norte |
| admin@luismorenos.com | 098765 | Admin Agencia | Panamá |
| superadmin@luismorenos.com | superadmin123 | Super Admin | Acceso global |

### Estructura de Datos Inicial

- **4 Países**: Panamá, Costa Rica, Guatemala, Honduras
- **2 Agencias**: Agencia Panamá Central, Agencia Costa Rica
- **4 Sucursales**: Centro, Norte, Sur (Panamá), San José (Costa Rica)
- **12 Estaciones**: Reactor, Stark, Jarvis, etc.
- **Tareas de ejemplo** asignadas a usuarios

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario (Super Admin)
- `GET /api/auth/me` - Obtener usuario actual

### Roles
- `GET /api/roles` - Listar roles
- `GET /api/roles/:id` - Obtener rol específico
- `POST /api/roles` - Crear rol (Super Admin)
- `PUT /api/roles/:id` - Actualizar rol (Super Admin)
- `DELETE /api/roles/:id` - Eliminar rol (Super Admin)

### Usuarios
- `GET /api/users` - Listar usuarios (con filtros por rol)
- `GET /api/users/:id` - Obtener usuario específico
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Sucursales
- `GET /api/branches` - Listar sucursales
- `GET /api/branches/:id` - Obtener sucursal específica

### Tareas
- `GET /api/tasks` - Listar tareas
- `POST /api/tasks` - Crear tarea
- `PUT /api/tasks/:id` - Actualizar tarea

## 🛠️ Desarrollo

### Estructura del Backend

```
backend/
├── src/
│   ├── config/          # Configuración de BD
│   ├── database/        # Conexión y migraciones
│   ├── middleware/      # Middleware de autenticación
│   ├── routes/          # Rutas de la API
│   └── server.js        # Servidor principal
├── package.json
└── Dockerfile
```

### Agregar Nuevas Tablas

1. Crear migración en `database/init/`
2. Actualizar el script de seed si es necesario
3. Reiniciar contenedores: `docker-compose restart postgres`

### Modificar API

1. Editar archivos en `backend/src/routes/`
2. Reiniciar backend: `docker-compose restart backend`

## 🐛 Solución de Problemas

### Error de Conexión a la BD
```bash
# Verificar que PostgreSQL esté ejecutándose
docker-compose ps postgres

# Ver logs de PostgreSQL
docker-compose logs postgres

# Reiniciar PostgreSQL
docker-compose restart postgres
```

### Error en la API
```bash
# Ver logs del backend
docker-compose logs backend

# Reiniciar backend
docker-compose restart backend

# Verificar que la BD esté accesible
docker-compose exec backend npm run migrate
```

### Limpiar Todo y Empezar de Nuevo
```bash
# Detener y eliminar contenedores
docker-compose down

# Eliminar volúmenes (¡CUIDADO! Esto borra todos los datos)
docker-compose down -v

# Reconstruir e iniciar
docker-compose up --build -d
```

## 📝 Notas Importantes

- Los datos se persisten en volúmenes Docker
- La contraseña de la BD es `pasaporte_password`
- El JWT secret es `pasaporte_secret_key_change_in_production`
- Cambiar las credenciales en producción
- El backend se reinicia automáticamente al cambiar archivos (nodemon)

## 🔒 Seguridad

- Todas las contraseñas están hasheadas con bcrypt
- JWT tokens expiran en 24 horas
- Control de acceso basado en roles
- Validación de entrada en todos los endpoints
- Logs de actividad para auditoría
