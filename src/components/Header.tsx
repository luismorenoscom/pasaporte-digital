import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

type UserRole = 'mercaderista' | 'supervisor' | 'tasker' | 'admin_agencia' | 'super_admin';

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, currentUserRole } = useApp();

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    if (showProfileMenu || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu, showMobileMenu]);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  // Filtrar menú según el rol del usuario
  const allMenuItems = [
    // Mercaderista - Solo su pasaporte e historial
    { path: '/pasaporte-digital', label: 'Pasaporte Digital', roles: ['mercaderista'] },
    { path: '/historial', label: 'Mi Historial', roles: ['mercaderista'] },
    
           // Supervisor - Ve mercaderistas de su sucursal
           { path: '/dashboard-supervisor', label: 'Dashboard', roles: ['supervisor'] },
           { path: '/ranking-supervisor', label: 'Ranking', roles: ['supervisor'] },
           { path: '/pasaporte-equipo', label: 'Pasaporte del Equipo', roles: ['supervisor'] },
           { path: '/paises-regiones-sucursales', label: 'Países/Regiones/Sucursales', roles: ['supervisor'] },
    
    // Tasker - Dashboard y usuarios
    { path: '/dashboard-tasker', label: 'Dashboard', roles: ['tasker'] },
    { path: '/todos-usuarios', label: 'Todos los Usuarios', roles: ['tasker'] },
    
    // Administrador Agencia - Ve usuarios de su país y estadísticas
    { path: '/dashboard-agencia', label: 'Dashboard', roles: ['admin_agencia'] },
    { path: '/supervisores-agencia', label: 'Supervisores', roles: ['admin_agencia'] },
    { path: '/taskers-agencia', label: 'Taskers', roles: ['admin_agencia'] },
    { path: '/sucursales-agencia', label: 'Sucursales', roles: ['admin_agencia'] },
    { path: '/merchandisers-pais', label: 'Mercaderistas', roles: ['admin_agencia'] },
    { path: '/estadisticas', label: 'Estadísticas', roles: ['admin_agencia'] },
    { path: '/todos-usuarios', label: 'Todos los Usuarios', roles: ['admin_agencia'] },
    
    // Super Admin Infinity - Ve todo
    { path: '/dashboard-global', label: 'Dashboard', roles: ['super_admin'] },
    { path: '/todos-usuarios', label: 'Todos los Usuarios', roles: ['super_admin'] },
    { path: '/top-ranking-global', label: 'Top Ranking', roles: ['super_admin'] },
    { path: '/paises-regiones-sucursales', label: 'Países/Regiones/Sucursales', roles: ['super_admin'] },
    
    // Común para todos
    { path: '/perfil', label: 'Perfil', roles: ['mercaderista', 'supervisor', 'tasker', 'admin_agencia', 'super_admin'] }
  ];

  const menuItems = allMenuItems.filter(item => 
    !item.roles || item.roles.includes(currentUserRole as UserRole)
  );

  return (
    <header className="bg-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo-infinity-stores.png"
            alt="Infinity Stores"
            className="h-10 w-auto"
          />
        </div>
        
        {/* Menú centrado y flotante - Solo visible en desktop */}
        <div className="hidden md:flex items-center">
          <div className="bg-gray-800/30 backdrop-blur-md rounded-full px-2 py-1 flex space-x-1 border border-gray-700/30">
            {menuItems.map((item) => (
              <button 
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  location.pathname === item.path 
                    ? 'bg-white/90 text-gray-800 backdrop-blur-sm' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botón de perfil y menú hamburguesa */}
        <div className="flex items-center space-x-3">
          
          {/* Botón de perfil - Solo visible en desktop */}
          <div className="relative flex items-center hidden md:block" ref={profileMenuRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
            >
              {user?.fotoPerfil ? (
                <img 
                  src={user.fotoPerfil} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            {/* Menú desplegable del perfil */}
            {showProfileMenu && (
              <div className="absolute right-0 top-12 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-700/30 py-2 min-w-[160px] z-50">
                <button 
                  onClick={() => {
                    console.log("Cerrando sesión...");
                    setShowProfileMenu(false);
                    logout();
                    window.location.href = "/auth";
                  }}
                  className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>

          {/* Botón menú hamburguesa - Solo visible en móvil */}
          <div className="md:hidden relative" ref={mobileMenuRef}>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Menú móvil desplegable */}
            {showMobileMenu && (
              <div className="fixed top-16 left-4 right-4 bg-black/95 backdrop-blur-md shadow-xl border border-white/20 rounded-lg py-2 z-50">
                {/* Opciones de navegación */}
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full px-4 py-3 text-left font-medium transition-all ${
                      location.pathname === item.path
                        ? 'bg-[#fdd742] text-black'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Separador */}
                <div className="border-t border-white/10 my-2"></div>
                
                {/* Información del usuario */}
                <div className="px-4 py-2">
                  <div className="text-sm text-gray-400 mb-1">Usuario</div>
                  <div className="text-white font-medium">{user?.id}</div>
                  <div className="text-gray-400 text-sm">{user?.email}</div>
                </div>
                
                {/* Separador */}
                <div className="border-t border-white/10 my-2"></div>
                
                {/* Cerrar sesión */}
                <button 
                  onClick={() => {
                    console.log("Cerrando sesión...");
                    setShowMobileMenu(false);
                    logout();
                    window.location.href = "/auth";
                  }}
                  className="w-full px-4 py-3 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
