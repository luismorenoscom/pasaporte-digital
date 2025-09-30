const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database/connection');
const auth = require('../middleware/auth');

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

// GET /api/roles - Obtener todos los roles
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        id,
        name,
        display_name,
        description,
        level,
        permissions,
        is_active,
        created_at,
        updated_at
      FROM roles 
      WHERE is_active = true 
      ORDER BY level ASC
    `);

    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    });
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /api/roles/:id - Obtener un rol por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(`
      SELECT 
        id,
        name,
        display_name,
        description,
        level,
        permissions,
        is_active,
        created_at,
        updated_at
      FROM roles 
      WHERE id = $1 AND is_active = true
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error al obtener rol:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// POST /api/roles - Crear un nuevo rol (Solo Super Admin)
router.post('/', 
  auth.requireRole(['super_admin']),
  [
    body('name')
      .isLength({ min: 3, max: 50 })
      .withMessage('El nombre debe tener entre 3 y 50 caracteres')
      .matches(/^[a-z_]+$/)
      .withMessage('El nombre solo puede contener letras minúsculas y guiones bajos'),
    body('display_name')
      .isLength({ min: 3, max: 100 })
      .withMessage('El nombre para mostrar debe tener entre 3 y 100 caracteres'),
    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('La descripción no puede exceder 500 caracteres'),
    body('level')
      .isInt({ min: 1, max: 10 })
      .withMessage('El nivel debe ser un número entre 1 y 10'),
    body('permissions')
      .optional()
      .isArray()
      .withMessage('Los permisos deben ser un array')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, display_name, description, level, permissions = [] } = req.body;

      // Verificar si el rol ya existe
      const existingRole = await db.query(
        'SELECT id FROM roles WHERE name = $1',
        [name]
      );

      if (existingRole.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un rol con ese nombre'
        });
      }

      // Crear el nuevo rol
      const result = await db.query(`
        INSERT INTO roles (name, display_name, description, level, permissions)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, display_name, description, level, permissions, is_active, created_at
      `, [name, display_name, description, level, JSON.stringify(permissions)]);

      res.status(201).json({
        success: true,
        message: 'Rol creado exitosamente',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error al crear rol:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

// PUT /api/roles/:id - Actualizar un rol (Solo Super Admin)
router.put('/:id',
  auth.requireRole(['super_admin']),
  [
    body('display_name')
      .optional()
      .isLength({ min: 3, max: 100 })
      .withMessage('El nombre para mostrar debe tener entre 3 y 100 caracteres'),
    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('La descripción no puede exceder 500 caracteres'),
    body('level')
      .optional()
      .isInt({ min: 1, max: 10 })
      .withMessage('El nivel debe ser un número entre 1 y 10'),
    body('permissions')
      .optional()
      .isArray()
      .withMessage('Los permisos deben ser un array'),
    body('is_active')
      .optional()
      .isBoolean()
      .withMessage('is_active debe ser un booleano')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { display_name, description, level, permissions, is_active } = req.body;

      // Verificar si el rol existe
      const existingRole = await db.query(
        'SELECT id FROM roles WHERE id = $1',
        [id]
      );

      if (existingRole.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Rol no encontrado'
        });
      }

      // Construir query de actualización dinámicamente
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (display_name !== undefined) {
        updates.push(`display_name = $${paramCount++}`);
        values.push(display_name);
      }
      if (description !== undefined) {
        updates.push(`description = $${paramCount++}`);
        values.push(description);
      }
      if (level !== undefined) {
        updates.push(`level = $${paramCount++}`);
        values.push(level);
      }
      if (permissions !== undefined) {
        updates.push(`permissions = $${paramCount++}`);
        values.push(JSON.stringify(permissions));
      }
      if (is_active !== undefined) {
        updates.push(`is_active = $${paramCount++}`);
        values.push(is_active);
      }

      if (updates.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No hay campos para actualizar'
        });
      }

      updates.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);

      const result = await db.query(`
        UPDATE roles 
        SET ${updates.join(', ')}
        WHERE id = $${paramCount}
        RETURNING id, name, display_name, description, level, permissions, is_active, updated_at
      `, values);

      res.json({
        success: true,
        message: 'Rol actualizado exitosamente',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

// DELETE /api/roles/:id - Eliminar un rol (Soft delete, Solo Super Admin)
router.delete('/:id',
  auth.requireRole(['super_admin']),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Verificar si el rol existe
      const existingRole = await db.query(
        'SELECT id, name FROM roles WHERE id = $1',
        [id]
      );

      if (existingRole.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Rol no encontrado'
        });
      }

      // Verificar si hay usuarios con este rol
      const usersWithRole = await db.query(
        'SELECT COUNT(*) as count FROM users WHERE role_id = $1 AND is_active = true',
        [id]
      );

      if (parseInt(usersWithRole.rows[0].count) > 0) {
        return res.status(409).json({
          success: false,
          message: 'No se puede eliminar el rol porque hay usuarios asignados a él'
        });
      }

      // Soft delete del rol
      await db.query(
        'UPDATE roles SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [id]
      );

      res.json({
        success: true,
        message: 'Rol eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar rol:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

// GET /api/roles/:id/users - Obtener usuarios con un rol específico
router.get('/:id/users', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    const result = await db.query(`
      SELECT 
        u.id,
        u.email,
        u.name,
        u.last_name,
        u.is_active,
        u.last_login,
        u.created_at,
        b.name as branch_name,
        c.name as country_name
      FROM users u
      LEFT JOIN branches b ON u.branch_id = b.id
      LEFT JOIN countries c ON u.country_id = c.id
      WHERE u.role_id = $1 AND u.is_active = true
      ORDER BY u.created_at DESC
      LIMIT $2 OFFSET $3
    `, [id, limit, offset]);

    // Obtener total de usuarios
    const countResult = await db.query(
      'SELECT COUNT(*) as total FROM users WHERE role_id = $1 AND is_active = true',
      [id]
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        pages: Math.ceil(parseInt(countResult.rows[0].total) / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener usuarios del rol:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
