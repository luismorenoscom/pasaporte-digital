-- Insertar países
INSERT INTO countries (id, name, code) VALUES 
    (uuid_generate_v4(), 'Panamá', 'PAN'),
    (uuid_generate_v4(), 'Costa Rica', 'CRI'),
    (uuid_generate_v4(), 'Guatemala', 'GTM'),
    (uuid_generate_v4(), 'Honduras', 'HND');

-- Insertar roles del sistema
INSERT INTO roles (id, name, display_name, description, level, permissions) VALUES 
    (uuid_generate_v4(), 'mercaderista', 'Mercaderista', 'Usuario normal que puede ver su pasaporte e historial', 1, '["view_own_passport", "view_own_history"]'::jsonb),
    (uuid_generate_v4(), 'supervisor', 'Supervisor', 'Supervisa mercaderistas de su sucursal', 2, '["view_merchandisers", "view_branch_data", "assign_tasks"]'::jsonb),
    (uuid_generate_v4(), 'tasker', 'Tasker', 'Gestiona tareas de mercaderistas de su sucursal', 3, '["view_merchandisers", "assign_tasks", "manage_tasks"]'::jsonb),
    (uuid_generate_v4(), 'admin_agencia', 'Administrador Agencia', 'Administra usuarios de su país asignado', 4, '["view_country_data", "manage_agencies", "view_all_branches", "manage_users"]'::jsonb),
    (uuid_generate_v4(), 'super_admin', 'Super Admin Infinity', 'Acceso global a todo el sistema', 5, '["view_global_data", "manage_all_countries", "manage_all_agencies", "manage_all_users", "system_admin"]'::jsonb);

-- Obtener IDs para referencias
DO $$
DECLARE
    panama_id UUID;
    costa_rica_id UUID;
    guatemala_id UUID;
    honduras_id UUID;
    mercaderista_role_id UUID;
    supervisor_role_id UUID;
    tasker_role_id UUID;
    admin_agencia_role_id UUID;
    super_admin_role_id UUID;
    agencia_panama_id UUID;
    agencia_costa_rica_id UUID;
    sucursal_centro_id UUID;
    sucursal_norte_id UUID;
    sucursal_sur_id UUID;
    sucursal_san_jose_id UUID;
BEGIN
    -- Obtener IDs de países
    SELECT id INTO panama_id FROM countries WHERE code = 'PAN';
    SELECT id INTO costa_rica_id FROM countries WHERE code = 'CRI';
    SELECT id INTO guatemala_id FROM countries WHERE code = 'GTM';
    SELECT id INTO honduras_id FROM countries WHERE code = 'HND';
    
    -- Obtener IDs de roles
    SELECT id INTO mercaderista_role_id FROM roles WHERE name = 'mercaderista';
    SELECT id INTO supervisor_role_id FROM roles WHERE name = 'supervisor';
    SELECT id INTO tasker_role_id FROM roles WHERE name = 'tasker';
    SELECT id INTO admin_agencia_role_id FROM roles WHERE name = 'admin_agencia';
    SELECT id INTO super_admin_role_id FROM roles WHERE name = 'super_admin';
    
    -- Insertar agencias
    INSERT INTO agencies (id, name, country_id) VALUES 
        (uuid_generate_v4(), 'Agencia Panamá Central', panama_id),
        (uuid_generate_v4(), 'Agencia Costa Rica', costa_rica_id);
    
    -- Obtener IDs de agencias
    SELECT id INTO agencia_panama_id FROM agencies WHERE name = 'Agencia Panamá Central';
    SELECT id INTO agencia_costa_rica_id FROM agencies WHERE name = 'Agencia Costa Rica';
    
    -- Insertar sucursales
    INSERT INTO branches (id, name, city, agency_id) VALUES 
        (uuid_generate_v4(), 'Sucursal Centro', 'Ciudad de Panamá', agencia_panama_id),
        (uuid_generate_v4(), 'Sucursal Norte', 'Colón', agencia_panama_id),
        (uuid_generate_v4(), 'Sucursal Sur', 'David', agencia_panama_id),
        (uuid_generate_v4(), 'Sucursal San José', 'San José', agencia_costa_rica_id);
    
    -- Obtener IDs de sucursales
    SELECT id INTO sucursal_centro_id FROM branches WHERE name = 'Sucursal Centro';
    SELECT id INTO sucursal_norte_id FROM branches WHERE name = 'Sucursal Norte';
    SELECT id INTO sucursal_sur_id FROM branches WHERE name = 'Sucursal Sur';
    SELECT id INTO sucursal_san_jose_id FROM branches WHERE name = 'Sucursal San José';
    
    -- Insertar estaciones del pasaporte
    INSERT INTO stations (id, name, description, points, order_index, is_boss_station) VALUES 
        (uuid_generate_v4(), 'Reactor', 'Estación de energía nuclear', 50, 1, false),
        (uuid_generate_v4(), 'Stark', 'Laboratorio de tecnología', 50, 2, false),
        (uuid_generate_v4(), 'Jarvis', 'Sistema de inteligencia artificial', 50, 3, false),
        (uuid_generate_v4(), 'Iron Monger', 'Fabricación de armaduras', 50, 4, false),
        (uuid_generate_v4(), 'Extremis', 'Mejoras biológicas', 50, 5, false),
        (uuid_generate_v4(), 'Iron Legion', 'Ejército de drones', 50, 6, false),
        (uuid_generate_v4(), 'Vibranium', 'Metal especial', 50, 7, false),
        (uuid_generate_v4(), 'Whiplash', 'Tecnología de látigo', 50, 8, false),
        (uuid_generate_v4(), 'Torre', 'Base de operaciones', 50, 9, false),
        (uuid_generate_v4(), 'Pepper', 'Asistente personal', 50, 10, false),
        (uuid_generate_v4(), 'Prueba', 'Estación de pruebas', 50, 11, false),
        (uuid_generate_v4(), 'Aldrich', 'Estación final', 100, 12, true);
    
    -- Insertar usuarios reales (contraseña: 123456789)
    INSERT INTO users (id, email, password_hash, name, last_name, role_id, branch_id, country_id) VALUES 
        -- Mercaderista
        (uuid_generate_v4(), 'mercaderista@luismorenos.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mercaderista', 'Usuario', mercaderista_role_id, sucursal_centro_id, panama_id),
        
        -- Supervisor
        (uuid_generate_v4(), 'supervisor@luismorenos.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Supervisor', 'Usuario', supervisor_role_id, sucursal_centro_id, panama_id),
        
        -- Tasker
        (uuid_generate_v4(), 'tasker@luismorenos.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Tasker', 'Usuario', tasker_role_id, sucursal_norte_id, panama_id),
        
        -- Admin Agencia
        (uuid_generate_v4(), 'adminagencia@luismorenos.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'Agencia', admin_agencia_role_id, NULL, panama_id),
        
        -- Super Admin Infinity
        (uuid_generate_v4(), 'superadmininfinity@luismorenos.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Super Admin', 'Infinity', super_admin_role_id, NULL, NULL);
    
    -- Las tareas se crearán dinámicamente a través de la API
    
END $$;
