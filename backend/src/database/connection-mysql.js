const mysql = require('mysql2/promise');

// Configuración de la base de datos
const dbConfig = {
  user: process.env.DB_USER || 'root',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'pasaporte_db',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  connectionLimit: 20, // Máximo número de conexiones en el pool
  acquireTimeout: 60000, // Tiempo de espera para obtener conexión
  timeout: 60000, // Tiempo de espera para conectar
  reconnect: true,
  charset: 'utf8mb4'
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para ejecutar consultas
const query = async (text, params = []) => {
  const start = Date.now();
  try {
    const [rows, fields] = await pool.execute(text, params);
    const duration = Date.now() - start;
    console.log('Query ejecutada:', { text, duration, rows: rows.length });
    return { rows, fields, rowCount: rows.length };
  } catch (error) {
    console.error('Error en query:', { text, error: error.message });
    throw error;
  }
};

// Función para obtener una conexión del pool
const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error al obtener conexión del pool:', error);
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

// Función para iniciar una transacción
const beginTransaction = async () => {
  const connection = await getConnection();
  await connection.beginTransaction();
  return connection;
};

// Función para hacer commit de una transacción
const commit = async (connection) => {
  await connection.commit();
  connection.release();
};

// Función para hacer rollback de una transacción
const rollback = async (connection) => {
  await connection.rollback();
  connection.release();
};

module.exports = {
  query,
  getConnection,
  closePool,
  testConnection,
  beginTransaction,
  commit,
  rollback,
  pool
};
