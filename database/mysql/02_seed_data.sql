-- Datos iniciales para el sistema

-- Insertar países
INSERT INTO countries (id, name, code) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'México', 'MEX'),
('550e8400-e29b-41d4-a716-446655440002', 'Estados Unidos', 'USA'),
('550e8400-e29b-41d4-a716-446655440003', 'Canadá', 'CAN');

-- Insertar roles del sistema
INSERT INTO roles (id, name, display_name, description, level, permissions) VALUES 
('550e8400-e29b-41d4-a716-446655440010', 'super_admin', 'Super Administrador', 'Acceso completo al sistema', 5, '["all"]'),
('550e8400-e29b-41d4-a716-446655440011', 'admin_agencia', 'Administrador de Agencia', 'Administra una agencia específica', 4, '["manage_agency", "manage_branches", "manage_users"]'),
('550e8400-e29b-41d4-a716-446655440012', 'supervisor', 'Supervisor', 'Supervisa una sucursal', 3, '["manage_merchandisers", "view_reports", "assign_tasks"]'),
('550e8400-e29b-41d4-a716-446655440013', 'tasker', 'Tasker', 'Ejecuta tareas asignadas', 2, '["view_tasks", "update_tasks"]'),
('550e8400-e29b-41d4-a716-446655440014', 'merchandiser', 'Mercaderista', 'Usuario básico del sistema', 1, '["view_passport", "complete_stations"]');

-- Insertar agencias
INSERT INTO agencies (id, name, country_id) VALUES 
('550e8400-e29b-41d4-a716-446655440020', 'Infinity Stores México', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440021', 'Infinity Stores USA', '550e8400-e29b-41d4-a716-446655440002');

-- Insertar sucursales
INSERT INTO branches (id, name, city, address, agency_id) VALUES 
('550e8400-e29b-41d4-a716-446655440030', 'Sucursal Centro', 'Ciudad de México', 'Av. Reforma 123, CDMX', '550e8400-e29b-41d4-a716-446655440020'),
('550e8400-e29b-41d4-a716-446655440031', 'Sucursal Polanco', 'Ciudad de México', 'Av. Masaryk 456, Polanco', '550e8400-e29b-41d4-a716-446655440020'),
('550e8400-e29b-41d4-a716-446655440032', 'Sucursal Miami', 'Miami', '123 Ocean Drive, Miami FL', '550e8400-e29b-41d4-a716-446655440021');

-- Insertar estaciones del pasaporte
INSERT INTO stations (id, name, description, points, order_index, is_boss_station) VALUES 
('550e8400-e29b-41d4-a716-446655440040', 'Extremis', 'Estación de extremis', 100, 1, false),
('550e8400-e29b-41d4-a716-446655440041', 'Ironlegion', 'Estación de ironlegion', 100, 2, false),
('550e8400-e29b-41d4-a716-446655440042', 'Jarvis', 'Estación de jarvis', 100, 3, false),
('550e8400-e29b-41d4-a716-446655440043', 'Mark', 'Estación de mark', 100, 4, false),
('550e8400-e29b-41d4-a716-446655440044', 'Multiverso', 'Estación de multiverso', 100, 5, false),
('550e8400-e29b-41d4-a716-446655440045', 'Pepper', 'Estación de pepper', 100, 6, false),
('550e8400-e29b-41d4-a716-446655440046', 'Reactor', 'Estación de reactor', 100, 7, false),
('550e8400-e29b-41d4-a716-446655440047', 'Repulsores', 'Estación de repulsores', 100, 8, false),
('550e8400-e29b-41d4-a716-446655440048', 'Stark', 'Estación de stark', 100, 9, false),
('550e8400-e29b-41d4-a716-446655440049', 'Torre', 'Estación de torre', 100, 10, false),
('550e8400-e29b-41d4-a716-446655440050', 'Vibranium', 'Estación de vibranium', 100, 11, false),
('550e8400-e29b-41d4-a716-446655440051', 'Prueba', 'Estación de prueba', 50, 12, true);

-- Insertar usuario administrador por defecto
-- Contraseña: admin123 (hash generado con bcrypt)
INSERT INTO users (id, email, password_hash, name, last_name, role_id, country_id) VALUES 
('550e8400-e29b-41d4-a716-446655440060', 'admin@pasaporte.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador', 'Sistema', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001');
