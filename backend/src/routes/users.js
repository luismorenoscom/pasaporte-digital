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

// GET /api/users - Obtener usuarios (con filtros según rol)
router.get('/', auth.authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, role, branch, country } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE u.is_active = true';
    let queryParams = [];
    let paramCount = 0;

    // Aplicar filtros según el rol del usuario
    if (req.user.role.name === 'super_admin') {
      // Super admin puede ver todos los usuarios
      if (role) {
        paramCount++;
        whereClause += ` AND r.name = $${paramCount}`;
        queryParams.push(role);
      }
      if (branch) {
        paramCount++;
        whereClause += ` AND b.id = $${paramCount}`;
        queryParams.push(branch);
      }
      if (country) {
        paramCount++;
        whereClause += ` AND c.id = $${paramCount}`;
        queryParams.push(country);
      }
    } else if (req.user.role.name === 'admin_agencia') {
      // Admin agencia solo puede ver usuarios de su país
      paramCount++;
      whereClause += ` AND c.id = $${paramCount}`;
      queryParams.push(req.user.country.id);
    } else if (['supervisor', 'tasker'].includes(req.user.role.name)) {
      // Supervisor y Tasker solo pueden ver usuarios de su sucursal
      paramCount++;
      whereClause += ` AND b.id = $${paramCount}`;
      queryParams.push(req.user.branch.id);
    } else if (req.user.role.name === 'mercaderista') {
      // Mercaderista solo puede verse a sí mismo
      paramCount++;
      whereClause += ` AND u.id = $${paramCount}`;
      queryParams.push(req.user.id);
    }

    const result = await db.query(`
      SELECT 
        u.id,
        u.email,
        u.name,
        u.last_name,
        u.is_active,
        u.last_login,
        u.created_at,
        r.name as role_name,
        r.display_name as role_display_name,
        b.name as branch_name,
        c.name as country_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      LEFT JOIN branches b ON u.branch_id = b.id
      LEFT JOIN countries c ON u.country_id = c.id
      ${whereClause}
      ORDER BY u.created_at DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `, [...queryParams, limit, offset]);

    // Obtener total de usuarios
    const countResult = await db.query(`
      SELECT COUNT(*) as total
      FROM users u
      JOIN roles r ON u.role_id = r.id
      LEFT JOIN branches b ON u.branch_id = b.id
      LEFT JOIN countries c ON u.country_id = c.id
      ${whereClause}
    `, queryParams);

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
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /api/users/:id - Obtener un usuario específico
router.get('/:id', 
  auth.authenticateToken,
  auth.canAccessResource('user'),
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await db.query(`
        SELECT 
          u.id,
          u.email,
          u.name,
          u.last_name,
          u.phone,
          u.photo_url,
          u.is_active,
          u.last_login,
          u.created_at,
          u.updated_at,
          r.id as role_id,
          r.name as role_name,
          r.display_name as role_display_name,
          r.level as role_level,
          b.id as branch_id,
          b.name as branch_name,
          c.id as country_id,
          c.name as country_name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        LEFT JOIN branches b ON u.branch_id = b.id
        LEFT JOIN countries c ON u.country_id = c.id
        WHERE u.id = $1 AND u.is_active = true
      `, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      const user = result.rows[0];

      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          last_name: user.last_name,
          phone: user.phone,
          photo_url: user.photo_url,
          is_active: user.is_active,
          last_login: user.last_login,
          created_at: user.created_at,
          updated_at: user.updated_at,
          role: {
            id: user.role_id,
            name: user.role_name,
            display_name: user.role_display_name,
            level: user.role_level
          },
          branch: user.branch_id ? {
            id: user.branch_id,
            name: user.branch_name
          } : null,
          country: user.country_id ? {
            id: user.country_id,
            name: user.country_name
          } : null
        }
      });
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

// PUT /api/users/:id - Actualizar usuario
router.put('/:id',
  auth.authenticateToken,
  auth.canAccessResource('user'),
  [
    body('name')
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('last_name')
      .optional()
      .isLength({ max: 100 })
      .withMessage('El apellido no puede exceder 100 caracteres'),
    body('phone')
      .optional()
      .isLength({ max: 20 })
      .withMessage('El teléfono no puede exceder 20 caracteres'),
    body('photo_url')
      .optional()
      .isURL()
      .withMessage('URL de foto inválida')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, last_name, phone, photo_url } = req.body;

      // Construir query de actualización dinámicamente
      const updates = [];
      const values = [];
      let paramCount = 0;

      if (name !== undefined) {
        updates.push(`name = $${paramCount + 1}`);
        values.push(name);
        paramCount++;
      }
      if (last_name !== undefined) {
        updates.push(`last_name = $${paramCount + 1}`);
        values.push(last_name);
        paramCount++;
      }
      if (phone !== undefined) {
        updates.push(`phone = $${paramCount + 1}`);
        values.push(phone);
        paramCount++;
      }
      if (photo_url !== undefined) {
        updates.push(`photo_url = $${paramCount + 1}`);
        values.push(photo_url);
        paramCount++;
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
        UPDATE users 
        SET ${updates.join(', ')}
        WHERE id = $${paramCount + 1}
        RETURNING id, email, name, last_name, phone, photo_url, updated_at
      `, values);

      res.json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

// DELETE /api/users/:id - Eliminar usuario (Soft delete)
router.delete('/:id',
  auth.authenticateToken,
  auth.requireRole(['super_admin', 'admin_agencia']),
  auth.canAccessResource('user'),
  async (req, res) => {
    try {
      const { id } = req.params;

      // No permitir que un usuario se elimine a sí mismo
      if (req.user.id === id) {
        return res.status(400).json({
          success: false,
          message: 'No puedes eliminar tu propia cuenta'
        });
      }

      await db.query(
        'UPDATE users SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [id]
      );

      res.json({
        success: true,
        message: 'Usuario eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

module.exports = router;
