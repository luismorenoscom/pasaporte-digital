const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const db = require('./database/connection');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const branchRoutes = require('./routes/branches');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet());
app.use(compression());

// Middleware de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Middleware de logging
app.use(morgan('combined'));

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar errores de JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      success: false, 
      message: 'JSON inválido' 
    });
  }
  next();
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API del Sistema de Pasaporte Digital',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      roles: '/api/roles',
      branches: '/api/branches',
      tasks: '/api/tasks',
      health: '/api/health'
    }
  });
});

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Ruta no encontrada' 
  });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Función para iniciar el servidor
async function startServer() {
  try {
    // Probar conexión a la base de datos
    await db.query('SELECT NOW()');
    console.log('✅ Conexión a la base de datos establecida');
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
      console.log(`📊 API disponible en: http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Manejar cierre graceful del servidor
process.on('SIGTERM', () => {
  console.log('🛑 Cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Cerrando servidor...');
  process.exit(0);
});

// Iniciar servidor
startServer();
