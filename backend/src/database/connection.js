const { Pool } = require('pg');

// Configuración de la base de datos
const dbConfig = {
  user: process.env.DB_USER || 'pasaporte_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'pasaporte_db',
  password: process.env.DB_PASSWORD || 'pasaporte_password',
  port: process.env.DB_PORT || 5432,
  max: 20, // Máximo número de clientes en el pool
  idleTimeoutMillis: 30000, // Tiempo de inactividad antes de cerrar un cliente
  connectionTimeoutMillis: 2000, // Tiempo de espera para conectar
};

// Crear pool de conexiones
const pool = new Pool(dbConfig);

// Manejar errores del pool
pool.on('error', (err, client) => {
  console.error('Error inesperado en cliente inactivo:', err);
  process.exit(-1);
});

// Función para ejecutar consultas
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query ejecutada:', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error en query:', { text, error: error.message });
    throw error;
  }
};

// Función para obtener un cliente del pool
const getClient = async () => {
  try {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;
    
    // Interceptar la función query para logging
    client.query = (...args) => {
      client.lastQuery = args[0];
      return query.apply(client, args);
    };
    
    // Interceptar la función release para logging
    client.release = () => {
      console.log('Cliente liberado del pool');
      return release.apply(client);
    };
    
    return client;
  } catch (error) {
    console.error('Error al obtener cliente del pool:', error);
    throw error;
  }
};

// Función para cerrar el pool
const closePool = async () => {
  try {
    await pool.end();
    console.log('Pool de conexiones cerrado');
  } catch (error) {
    console.error('Error al cerrar el pool:', error);
    throw error;
  }
};

// Función para probar la conexión
const testConnection = async () => {
  try {
    const result = await query('SELECT NOW() as current_time');
    console.log('✅ Conexión a la base de datos exitosa');
    return result.rows[0];
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    throw error;
  }
};

module.exports = {
  query,
  getClient,
  closePool,
  testConnection,
  pool
};
