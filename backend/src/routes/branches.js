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

// GET /api/branches - Obtener sucursales (con filtros según rol)
router.get('/', auth.authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, country, agency } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE b.is_active = true';
    let queryParams = [];
    let paramCount = 0;

    // Aplicar filtros según el rol del usuario
    if (req.user.role.name === 'super_admin') {
      // Super admin puede ver todas las sucursales
      if (country) {
        paramCount++;
        whereClause += ` AND c.id = $${paramCount}`;
        queryParams.push(country);
      }
      if (agency) {
        paramCount++;
        whereClause += ` AND a.id = $${paramCount}`;
        queryParams.push(agency);
      }
    } else if (req.user.role.name === 'admin_agencia') {
      // Admin agencia solo puede ver sucursales de su país
      paramCount++;
      whereClause += ` AND c.id = $${paramCount}`;
      queryParams.push(req.user.country.id);
    } else if (['supervisor', 'tasker'].includes(req.user.role.name)) {
      // Supervisor y Tasker solo pueden ver su sucursal
      paramCount++;
      whereClause += ` AND b.id = $${paramCount}`;
      queryParams.push(req.user.branch.id);
    } else if (req.user.role.name === 'mercaderista') {
      // Mercaderista solo puede ver su sucursal
      paramCount++;
      whereClause += ` AND b.id = $${paramCount}`;
      queryParams.push(req.user.branch.id);
    }

    const result = await db.query(`
      SELECT 
        b.id,
        b.name,
        b.city,
        b.address,
        b.is_active,
        b.created_at,
        b.updated_at,
        a.id as agency_id,
        a.name as agency_name,
        c.id as country_id,
        c.name as country_name,
        COUNT(u.id) as user_count
      FROM branches b
      JOIN agencies a ON b.agency_id = a.id
      JOIN countries c ON a.country_id = c.id
      LEFT JOIN users u ON b.id = u.branch_id AND u.is_active = true
      ${whereClause}
      GROUP BY b.id, a.id, c.id
      ORDER BY b.created_at DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `, [...queryParams, limit, offset]);

    // Obtener total de sucursales
    const countResult = await db.query(`
      SELECT COUNT(*) as total
      FROM branches b
      JOIN agencies a ON b.agency_id = a.id
      JOIN countries c ON a.country_id = c.id
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
    console.error('Error al obtener sucursales:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /api/branches/:id - Obtener una sucursal específica
router.get('/:id', 
  auth.authenticateToken,
  auth.canAccessResource('branch'),
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await db.query(`
        SELECT 
          b.id,
          b.name,
          b.city,
          b.address,
          b.is_active,
          b.created_at,
          b.updated_at,
          a.id as agency_id,
          a.name as agency_name,
          c.id as country_id,
          c.name as country_name
        FROM branches b
        JOIN agencies a ON b.agency_id = a.id
        JOIN countries c ON a.country_id = c.id
        WHERE b.id = $1 AND b.is_active = true
      `, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Sucursal no encontrada'
        });
      }

      const branch = result.rows[0];

      // Obtener usuarios de la sucursal
      const usersResult = await db.query(`
        SELECT 
          u.id,
          u.email,
          u.name,
          u.last_name,
          r.name as role_name,
          r.display_name as role_display_name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.branch_id = $1 AND u.is_active = true
        ORDER BY u.name
      `, [id]);

      res.json({
        success: true,
        data: {
          id: branch.id,
          name: branch.name,
          city: branch.city,
          address: branch.address,
          is_active: branch.is_active,
          created_at: branch.created_at,
          updated_at: branch.updated_at,
          agency: {
            id: branch.agency_id,
            name: branch.agency_name
          },
          country: {
            id: branch.country_id,
            name: branch.country_name
          },
          users: usersResult.rows
        }
      });
    } catch (error) {
      console.error('Error al obtener sucursal:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

module.exports = router;
