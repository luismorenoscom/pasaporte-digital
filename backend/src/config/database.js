module.exports = {
  development: {
    user: process.env.DB_USER || 'pasaporte_user',
    host: process.env.DB_HOST || 'postgres',
    database: process.env.DB_NAME || 'pasaporte_db',
    password: process.env.DB_PASSWORD || 'pasaporte_password',
    port: process.env.DB_PORT || 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  production: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }
};
