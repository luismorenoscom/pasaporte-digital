const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../database/connection');

const router = express.Router();

// Middleware para validar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Datos de entrada inválidos',
      errors: errors.array()
    });
  }
  next();
};

// POST /api/auth/login - Iniciar sesión
router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar usuario por email
      const result = await db.query(`
        SELECT 
          u.id,
          u.email,
          u.password_hash,
          u.name,
          u.last_name,
          u.is_active,
          u.role_id,
          u.branch_id,
          u.country_id,
          r.name as role_name,
          r.level as role_level,
          r.permissions,
          b.name as branch_name,
          c.name as country_name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        LEFT JOIN branches b ON u.branch_id = b.id
        LEFT JOIN countries c ON u.country_id = c.id
        WHERE u.email = $1
      `, [email]);

      if (result.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      const user = result.rows[0];

      // Verificar si el usuario está activo
      if (!user.is_active) {
        return res.status(401).json({
          success: false,
          message: 'Usuario inactivo'
        });
      }

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          userId: user.id,
          email: user.email,
          role: user.role_name
        },
        process.env.JWT_SECRET || 'pasaporte_secret_key',
        { expiresIn: '24h' }
      );

      // Actualizar último login
      await db.query(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
        [user.id]
      );

      // Registrar actividad
      await db.query(`
        INSERT INTO activity_logs (user_id, action, description, ip_address, user_agent)
        VALUES ($1, 'login', 'Usuario inició sesión', $2, $3)
      `, [user.id, req.ip, req.get('User-Agent')]);

      // Preparar respuesta
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        last_name: user.last_name,
        role: {
          id: user.role_id,
          name: user.role_name,
          level: user.role_level,
          permissions: user.permissions
        },
        branch: user.branch_id ? {
          id: user.branch_id,
          name: user.branch_name
        } : null,
        country: user.country_id ? {
          id: user.country_id,
          name: user.country_name
        } : null
      };

      res.json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          user: userData,
          token
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

// POST /api/auth/register - Registrar nuevo usuario (Solo Super Admin)
router.post('/register',
  [
    body('email')
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name')
      .isLength({ min: 2, max: 100 })
      .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('last_name')
      .optional()
      .isLength({ max: 100 })
      .withMessage('El apellido no puede exceder 100 caracteres'),
    body('role_id')
      .isUUID()
      .withMessage('ID de rol inválido'),
    body('branch_id')
      .optional()
      .isUUID()
      .withMessage('ID de sucursal inválido'),
    body('country_id')
      .optional()
      .isUUID()
      .withMessage('ID de país inválido')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password, name, last_name, role_id, branch_id, country_id } = req.body;

      // Verificar si el email ya existe
      const existingUser = await db.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un usuario con ese email'
        });
      }

      // Verificar que el rol existe
      const roleResult = await db.query(
        'SELECT id, name FROM roles WHERE id = $1 AND is_active = true',
        [role_id]
      );

      if (roleResult.rows.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Rol no encontrado'
        });
      }

      // Verificar sucursal si se proporciona
      if (branch_id) {
        const branchResult = await db.query(
          'SELECT id FROM branches WHERE id = $1 AND is_active = true',
          [branch_id]
        );

        if (branchResult.rows.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'Sucursal no encontrada'
          });
        }
      }

      // Verificar país si se proporciona
      if (country_id) {
        const countryResult = await db.query(
          'SELECT id FROM countries WHERE id = $1 AND is_active = true',
          [country_id]
        );

        if (countryResult.rows.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'País no encontrado'
          });
        }
      }

      // Hash de la contraseña
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);

      // Crear usuario
      const result = await db.query(`
        INSERT INTO users (email, password_hash, name, last_name, role_id, branch_id, country_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, email, name, last_name, is_active, created_at
      `, [email, password_hash, name, last_name, role_id, branch_id, country_id]);

      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

// POST /api/auth/logout - Cerrar sesión
router.post('/logout', async (req, res) => {
  try {
    // En un sistema real, aquí podrías invalidar el token
    // Por ahora solo devolvemos éxito
    res.json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /api/auth/me - Obtener información del usuario actual
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso requerido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pasaporte_secret_key');
    
    const result = await db.query(`
      SELECT 
        u.id,
        u.email,
        u.name,
        u.last_name,
        u.is_active,
        u.role_id,
        u.branch_id,
        u.country_id,
        r.name as role_name,
        r.level as role_level,
        r.permissions,
        b.name as branch_name,
        c.name as country_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      LEFT JOIN branches b ON u.branch_id = b.id
      LEFT JOIN countries c ON u.country_id = c.id
      WHERE u.id = $1 AND u.is_active = true
    `, [decoded.userId]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const user = result.rows[0];
    
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      last_name: user.last_name,
      role: {
        id: user.role_id,
        name: user.role_name,
        level: user.role_level,
        permissions: user.permissions
      },
      branch: user.branch_id ? {
        id: user.branch_id,
        name: user.branch_name
      } : null,
      country: user.country_id ? {
        id: user.country_id,
        name: user.country_name
      } : null
    };

    res.json({
      success: true,
      data: userData
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    console.error('Error en /me:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
