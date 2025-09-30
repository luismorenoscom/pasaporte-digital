module.exports = {
  development: {
    user: process.env.DB_USER || 'root',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'pasaporte_db',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 20,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
  },
  production: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
    connectionLimit: 20,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
  }
};
