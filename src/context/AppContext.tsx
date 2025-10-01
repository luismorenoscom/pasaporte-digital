import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../features/pasaporte/types';

// Definición de roles del sistema
export type UserRole = 'mercaderista' | 'supervisor' | 'tasker' | 'admin_agencia' | 'super_admin';

// Información adicional del usuario para roles
export interface UserProfile extends User {
  branch?: string; // Sucursal para supervisor/tasker
  country?: string; // País para admin_agencia
  permissions?: string[]; // Permisos específicos
}

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  currentUserRole: UserRole | null;
  isInitialized: boolean;
  hasPermission: (permission: string) => boolean;
  canViewUser: (targetUser: UserProfile) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Usuarios reales del sistema
const DEMO_USERS = {
  // MERCADERISTA
  'mercaderista@luismorenos.com': {
    user: {
      id: 'M001',
      email: 'mercaderista@luismorenos.com',
      points: 300, // Suficiente para desbloquear hasta estación 5
      level: 5,
      completedStationIds: ['reactor', 'ironmonger', 'extremis'], // Estaciones 1, 4 y 5 completadas
      fotoPerfil: '',
      branch: 'Sucursal Centro',
      country: 'Panamá'
    },
    password: '123456789',
    role: 'mercaderista' as const
  },
  
  // SUPERVISOR
  'supervisor@luismorenos.com': {
    user: {
      id: 'S001',
      email: 'supervisor@luismorenos.com',
      points: 0,
      level: 1,
      completedStationIds: [],
      fotoPerfil: '',
      branch: 'Sucursal Centro',
      country: 'Panamá',
      permissions: ['view_merchandisers', 'view_branch_data']
    },
    password: '123456789',
    role: 'supervisor' as const
  },
  
  // TASKER
  'tasker@luismorenos.com': {
    user: {
      id: 'T001',
      email: 'tasker@luismorenos.com',
      points: 0,
      level: 1,
      completedStationIds: [],
      fotoPerfil: '',
      branch: 'Sucursal Norte',
      country: 'Panamá',
      permissions: ['view_merchandisers', 'assign_tasks']
    },
    password: '123456789',
    role: 'tasker' as const
  },
  
  // ADMINISTRADOR AGENCIA
  'adminagencia@luismorenos.com': {
    user: {
      id: 'A001',
      email: 'adminagencia@luismorenos.com',
      points: 0,
      level: 1,
      completedStationIds: [],
      fotoPerfil: '',
      country: 'Panamá',
      permissions: ['view_country_data', 'manage_agencies', 'view_all_branches']
    },
    password: '123456789',
    role: 'admin_agencia' as const
  },
  
  // SUPER ADMIN INFINITY
  'superadmininfinity@luismorenos.com': {
    user: {
      id: 'SA001',
      email: 'superadmininfinity@luismorenos.com',
      points: 0,
      level: 1,
      completedStationIds: [],
      fotoPerfil: '',
      permissions: ['view_global_data', 'manage_all_countries', 'manage_all_agencies', 'manage_all_users']
    },
    password: '123456789',
    role: 'super_admin' as const
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Inicializar el estado directamente desde localStorage
    try {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(() => {
    // Inicializar el rol directamente desde localStorage
    try {
      const savedRole = localStorage.getItem('currentUserRole');
      return savedRole as UserRole | null;
    } catch {
      return null;
    }
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Marcar como inicializado después del primer render
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Guardar datos en localStorage cuando cambie el usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserRole');
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const userData = DEMO_USERS[email as keyof typeof DEMO_USERS];
    
    if (userData && userData.password === password) {
      setUser(userData.user);
      setCurrentUserRole(userData.role);
      localStorage.setItem('currentUserRole', userData.role);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentUserRole(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserRole');
  };

  // Función para verificar permisos
  const hasPermission = (permission: string): boolean => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  // Función para verificar si puede ver un usuario específico
  const canViewUser = (targetUser: UserProfile): boolean => {
    if (!user || !targetUser) return false;

    switch (currentUserRole) {
      case 'super_admin':
        return true; // Super admin puede ver todos
      
      case 'admin_agencia':
        return user.country === targetUser.country; // Solo usuarios de su país
      
      case 'supervisor':
      case 'tasker':
        return user.branch === targetUser.branch; // Solo usuarios de su sucursal
      
      case 'mercaderista':
        return user.email === targetUser.email; // Solo puede verse a sí mismo
      
      default:
        return false;
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      logout, 
      currentUserRole, 
      isInitialized, 
      hasPermission, 
      canViewUser 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}