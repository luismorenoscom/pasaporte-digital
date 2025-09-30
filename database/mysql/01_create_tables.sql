-- Crear base de datos (ejecutar en phpMyAdmin)
-- CREATE DATABASE pasaporte_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE pasaporte_db;

-- Tabla de países
CREATE TABLE countries (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(3) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de agencias
CREATE TABLE agencies (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    country_id VARCHAR(36) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
);

-- Tabla de sucursales
CREATE TABLE branches (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT,
    agency_id VARCHAR(36) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
);

-- Tabla de roles del sistema
CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    level INT NOT NULL, -- Nivel de jerarquía (1=mercaderista, 5=super_admin)
    permissions JSON DEFAULT ('[]'),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200),
    phone VARCHAR(20),
    photo_url TEXT,
    role_id VARCHAR(36) NOT NULL,
    branch_id VARCHAR(36),
    country_id VARCHAR(36),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

-- Tabla de estaciones del pasaporte
CREATE TABLE stations (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    points INT DEFAULT 0,
    order_index INT NOT NULL,
    is_boss_station BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de progreso de usuarios en estaciones
CREATE TABLE user_stations (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    station_id VARCHAR(36) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    points_earned INT DEFAULT 0,
    UNIQUE KEY unique_user_station (user_id, station_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE
);

-- Tabla de tareas
CREATE TABLE tasks (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    assigned_to VARCHAR(36),
    assigned_by VARCHAR(36),
    branch_id VARCHAR(36),
    priority VARCHAR(20) DEFAULT 'media', -- baja, media, alta
    status VARCHAR(20) DEFAULT 'pendiente', -- pendiente, en_progreso, completada, cancelada
    due_date TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (assigned_by) REFERENCES users(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- Tabla de historial de actividades
CREATE TABLE activity_logs (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    metadata JSON DEFAULT ('{}'),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_branch_id ON users(branch_id);
CREATE INDEX idx_users_country_id ON users(country_id);
CREATE INDEX idx_user_stations_user_id ON user_stations(user_id);
CREATE INDEX idx_user_stations_station_id ON user_stations(station_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_branch_id ON tasks(branch_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
