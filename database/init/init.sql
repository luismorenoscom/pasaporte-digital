-- Script de inicialización de la base de datos
-- Este archivo se ejecuta automáticamente cuando se crea el contenedor de PostgreSQL

-- Crear la base de datos si no existe
SELECT 'CREATE DATABASE pasaporte_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pasaporte_db')\gexec

-- Conectar a la base de datos
\c pasaporte_db;

-- Ejecutar scripts de creación de tablas y datos
\i /docker-entrypoint-initdb.d/01_create_tables.sql
\i /docker-entrypoint-initdb.d/02_seed_data.sql
