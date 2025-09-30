const jwt = require('jsonwebtoken');
const db = require('../database/connection');

// Middleware para verificar token JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso requerido'
      });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pasaporte_secret_key');
    
    // Obtener información actualizada del usuario
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
        message: 'Usuario no encontrado o inactivo'
      });
    }

    const user = result.rows[0];
    
    // Agregar información del usuario al request
    req.user = {
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

    next();
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

    console.error('Error en autenticación:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Middleware para verificar roles específicos
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Autenticación requerida'
      });
    }

    if (!allowedRoles.includes(req.user.role.name)) {
      return res.status(403).json({
        success: false,
        message: 'Permisos insuficientes para esta acción'
      });
    }

    next();
  };
};

// Middleware para verificar permisos específicos
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Autenticación requerida'
      });
    }

    if (!req.user.role.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Permiso '${permission}' requerido para esta acción`
      });
    }

    next();
  };
};

// Middleware para verificar si el usuario puede acceder a un recurso específico
const canAccessResource = (resourceType) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Autenticación requerida'
        });
      }

      const { id } = req.params;
      let canAccess = false;

      switch (resourceType) {
        case 'user':
          // Super admin puede ver todos los usuarios
          if (req.user.role.name === 'super_admin') {
            canAccess = true;
          }
          // Admin agencia puede ver usuarios de su país
          else if (req.user.role.name === 'admin_agencia' && req.user.country) {
            const userResult = await db.query(
              'SELECT country_id FROM users WHERE id = $1',
              [id]
            );
            if (userResult.rows.length > 0) {
              canAccess = userResult.rows[0].country_id === req.user.country.id;
            }
          }
          // Supervisor y Tasker pueden ver usuarios de su sucursal
          else if (['supervisor', 'tasker'].includes(req.user.role.name) && req.user.branch) {
            const userResult = await db.query(
              'SELECT branch_id FROM users WHERE id = $1',
              [id]
            );
            if (userResult.rows.length > 0) {
              canAccess = userResult.rows[0].branch_id === req.user.branch.id;
            }
          }
          // Mercaderista solo puede verse a sí mismo
          else if (req.user.role.name === 'mercaderista') {
            canAccess = req.user.id === id;
          }
          break;

        case 'branch':
          // Super admin puede ver todas las sucursales
          if (req.user.role.name === 'super_admin') {
            canAccess = true;
          }
          // Admin agencia puede ver sucursales de su país
          else if (req.user.role.name === 'admin_agencia' && req.user.country) {
            const branchResult = await db.query(`
              SELECT b.id FROM branches b
              JOIN agencies a ON b.agency_id = a.id
              WHERE b.id = $1 AND a.country_id = $2
            `, [id, req.user.country.id]);
            canAccess = branchResult.rows.length > 0;
          }
          // Supervisor y Tasker pueden ver su sucursal
          else if (['supervisor', 'tasker'].includes(req.user.role.name) && req.user.branch) {
            canAccess = req.user.branch.id === id;
          }
          break;

        default:
          canAccess = false;
      }

      if (!canAccess) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para acceder a este recurso'
        });
      }

      next();
    } catch (error) {
      console.error('Error en verificación de acceso:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  };
};

module.exports = {
  authenticateToken,
  requireRole,
  requirePermission,
  canAccessResource
};
