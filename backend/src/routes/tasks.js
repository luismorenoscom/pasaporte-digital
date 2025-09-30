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

// GET /api/tasks - Obtener tareas (con filtros según rol)
router.get('/', auth.authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, assigned_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    let queryParams = [];
    let paramCount = 0;

    // Aplicar filtros según el rol del usuario
    if (req.user.role.name === 'super_admin') {
      // Super admin puede ver todas las tareas
      if (status) {
        paramCount++;
        whereClause += ` AND t.status = $${paramCount}`;
        queryParams.push(status);
      }
      if (priority) {
        paramCount++;
        whereClause += ` AND t.priority = $${paramCount}`;
        queryParams.push(priority);
      }
      if (assigned_to) {
        paramCount++;
        whereClause += ` AND t.assigned_to = $${paramCount}`;
        queryParams.push(assigned_to);
      }
    } else if (req.user.role.name === 'admin_agencia') {
      // Admin agencia puede ver tareas de su país
      paramCount++;
      whereClause += ` AND c.id = $${paramCount}`;
      queryParams.push(req.user.country.id);
    } else if (['supervisor', 'tasker'].includes(req.user.role.name)) {
      // Supervisor y Tasker pueden ver tareas de su sucursal
      paramCount++;
      whereClause += ` AND t.branch_id = $${paramCount}`;
      queryParams.push(req.user.branch.id);
    } else if (req.user.role.name === 'mercaderista') {
      // Mercaderista solo puede ver sus propias tareas
      paramCount++;
      whereClause += ` AND t.assigned_to = $${paramCount}`;
      queryParams.push(req.user.id);
    }

    const result = await db.query(`
      SELECT 
        t.id,
        t.title,
        t.description,
        t.priority,
        t.status,
        t.due_date,
        t.completed_at,
        t.created_at,
        t.updated_at,
        u_assigned.id as assigned_user_id,
        u_assigned.name as assigned_user_name,
        u_assigned.email as assigned_user_email,
        u_creator.id as created_by_id,
        u_creator.name as created_by_name,
        b.name as branch_name,
        c.name as country_name
      FROM tasks t
      LEFT JOIN users u_assigned ON t.assigned_to = u_assigned.id
      LEFT JOIN users u_creator ON t.assigned_by = u_creator.id
      LEFT JOIN branches b ON t.branch_id = b.id
      LEFT JOIN countries c ON b.agency_id IN (SELECT id FROM agencies WHERE country_id = c.id)
      ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `, [...queryParams, limit, offset]);

    // Obtener total de tareas
    const countResult = await db.query(`
      SELECT COUNT(*) as total
      FROM tasks t
      LEFT JOIN branches b ON t.branch_id = b.id
      LEFT JOIN countries c ON b.agency_id IN (SELECT id FROM agencies WHERE country_id = c.id)
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
    console.error('Error al obtener tareas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// POST /api/tasks - Crear nueva tarea
router.post('/',
  auth.authenticateToken,
  auth.requireRole(['supervisor', 'tasker', 'admin_agencia', 'super_admin']),
  [
    body('title')
      .isLength({ min: 3, max: 200 })
      .withMessage('El título debe tener entre 3 y 200 caracteres'),
    body('description')
      .optional()
      .isLength({ max: 1000 })
      .withMessage('La descripción no puede exceder 1000 caracteres'),
    body('assigned_to')
      .optional()
      .isUUID()
      .withMessage('ID de usuario asignado inválido'),
    body('branch_id')
      .optional()
      .isUUID()
      .withMessage('ID de sucursal inválido'),
    body('priority')
      .optional()
      .isIn(['baja', 'media', 'alta'])
      .withMessage('Prioridad debe ser: baja, media o alta'),
    body('due_date')
      .optional()
      .isISO8601()
      .withMessage('Fecha de vencimiento inválida')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { title, description, assigned_to, branch_id, priority = 'media', due_date } = req.body;

      // Verificar que el usuario asignado existe y es accesible
      if (assigned_to) {
        const userResult = await db.query(`
          SELECT u.id, u.name, u.role_id, r.name as role_name
          FROM users u
          JOIN roles r ON u.role_id = r.id
          WHERE u.id = $1 AND u.is_active = true
        `, [assigned_to]);

        if (userResult.rows.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'Usuario asignado no encontrado'
          });
        }

        // Verificar que el usuario puede asignar tareas a este usuario
        const assignedUser = userResult.rows[0];
        if (req.user.role.name === 'supervisor' || req.user.role.name === 'tasker') {
          // Solo pueden asignar a usuarios de su sucursal
          if (assignedUser.branch_id !== req.user.branch.id) {
            return res.status(403).json({
              success: false,
              message: 'No puedes asignar tareas a usuarios de otras sucursales'
            });
          }
        }
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

      // Crear tarea
      const result = await db.query(`
        INSERT INTO tasks (title, description, assigned_to, assigned_by, branch_id, priority, due_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, title, description, priority, status, due_date, created_at
      `, [title, description, assigned_to, req.user.id, branch_id, priority, due_date]);

      res.status(201).json({
        success: true,
        message: 'Tarea creada exitosamente',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error al crear tarea:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

// PUT /api/tasks/:id - Actualizar tarea
router.put('/:id',
  auth.authenticateToken,
  [
    body('title')
      .optional()
      .isLength({ min: 3, max: 200 })
      .withMessage('El título debe tener entre 3 y 200 caracteres'),
    body('description')
      .optional()
      .isLength({ max: 1000 })
      .withMessage('La descripción no puede exceder 1000 caracteres'),
    body('priority')
      .optional()
      .isIn(['baja', 'media', 'alta'])
      .withMessage('Prioridad debe ser: baja, media o alta'),
    body('status')
      .optional()
      .isIn(['pendiente', 'en_progreso', 'completada', 'cancelada'])
      .withMessage('Estado inválido'),
    body('due_date')
      .optional()
      .isISO8601()
      .withMessage('Fecha de vencimiento inválida')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, priority, status, due_date } = req.body;

      // Verificar que la tarea existe
      const taskResult = await db.query(
        'SELECT id, assigned_to, status FROM tasks WHERE id = $1',
        [id]
      );

      if (taskResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
      }

      const task = taskResult.rows[0];

      // Verificar permisos para actualizar la tarea
      const canUpdate = 
        req.user.role.name === 'super_admin' ||
        req.user.role.name === 'admin_agencia' ||
        ['supervisor', 'tasker'].includes(req.user.role.name) ||
        (req.user.role.name === 'mercaderista' && task.assigned_to === req.user.id);

      if (!canUpdate) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para actualizar esta tarea'
        });
      }

      // Construir query de actualización dinámicamente
      const updates = [];
      const values = [];
      let paramCount = 0;

      if (title !== undefined) {
        updates.push(`title = $${paramCount + 1}`);
        values.push(title);
        paramCount++;
      }
      if (description !== undefined) {
        updates.push(`description = $${paramCount + 1}`);
        values.push(description);
        paramCount++;
      }
      if (priority !== undefined) {
        updates.push(`priority = $${paramCount + 1}`);
        values.push(priority);
        paramCount++;
      }
      if (status !== undefined) {
        updates.push(`status = $${paramCount + 1}`);
        values.push(status);
        paramCount++;
        
        // Si se marca como completada, establecer fecha de completado
        if (status === 'completada') {
          updates.push(`completed_at = CURRENT_TIMESTAMP`);
        }
      }
      if (due_date !== undefined) {
        updates.push(`due_date = $${paramCount + 1}`);
        values.push(due_date);
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
        UPDATE tasks 
        SET ${updates.join(', ')}
        WHERE id = $${paramCount + 1}
        RETURNING id, title, description, priority, status, due_date, completed_at, updated_at
      `, values);

      res.json({
        success: true,
        message: 'Tarea actualizada exitosamente',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
);

module.exports = router;
