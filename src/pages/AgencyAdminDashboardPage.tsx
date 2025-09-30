import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface Supervisor {
  id: string;
  name: string;
  email: string;
  branch: string;
  country: string;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  totalMerchandisers: number;
}

interface Tasker {
  id: string;
  name: string;
  email: string;
  branch: string;
  country: string;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  totalMerchandisers: number;
}

interface Branch {
  id: string;
  name: string;
  country: string;
  city: string;
  supervisors: number;
  taskers: number;
  merchandisers: number;
  status: 'activo' | 'inactivo';
}

export default function AgencyAdminDashboardPage() {
  const { user, currentUserRole } = useApp();
  const navigate = useNavigate();

  // Estado para datos
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [taskers, setTaskers] = useState<Tasker[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [stats, setStats] = useState({
    totalSupervisors: 0,
    totalTaskers: 0,
    totalBranches: 0,
    totalMerchandisers: 0,
    activeSupervisors: 0,
    activeTaskers: 0,
    activeBranches: 0
  });
  const [loading, setLoading] = useState(true);

  // Cargar datos reales
  useEffect(() => {
    setTimeout(() => {
      // Datos de ejemplo para supervisores
      const demoSupervisors: Supervisor[] = [
        { id: 's1', name: 'Carlos Mendoza', email: 'carlos.mendoza@luismorenos.com', branch: 'Sucursal Centro', country: 'Panamá', status: 'activo', lastActivity: 'Hace 2 horas', totalMerchandisers: 15 },
        { id: 's2', name: 'Ana García', email: 'ana.garcia@luismorenos.com', branch: 'Sucursal Norte', country: 'Panamá', status: 'activo', lastActivity: 'Hace 1 día', totalMerchandisers: 12 },
        { id: 's3', name: 'Luis Rodríguez', email: 'luis.rodriguez@luismorenos.com', branch: 'Sucursal Sur', country: 'Panamá', status: 'inactivo', lastActivity: 'Hace 3 días', totalMerchandisers: 8 },
      ];

      // Datos de ejemplo para taskers
      const demoTaskers: Tasker[] = [
        { id: 't1', name: 'María López', email: 'maria.lopez@luismorenos.com', branch: 'Sucursal Centro', country: 'Panamá', status: 'activo', lastActivity: 'Hace 1 hora', totalMerchandisers: 15 },
        { id: 't2', name: 'Pedro Sánchez', email: 'pedro.sanchez@luismorenos.com', branch: 'Sucursal Norte', country: 'Panamá', status: 'activo', lastActivity: 'Hace 4 horas', totalMerchandisers: 12 },
        { id: 't3', name: 'Sofia Martínez', email: 'sofia.martinez@luismorenos.com', branch: 'Sucursal Sur', country: 'Panamá', status: 'activo', lastActivity: 'Hace 2 días', totalMerchandisers: 8 },
      ];

      // Datos de ejemplo para sucursales
      const demoBranches: Branch[] = [
        { id: 'b1', name: 'Sucursal Centro', country: 'Panamá', city: 'Ciudad de Panamá', supervisors: 1, taskers: 1, merchandisers: 15, status: 'activo' },
        { id: 'b2', name: 'Sucursal Norte', country: 'Panamá', city: 'Colón', supervisors: 1, taskers: 1, merchandisers: 12, status: 'activo' },
        { id: 'b3', name: 'Sucursal Sur', country: 'Panamá', city: 'David', supervisors: 1, taskers: 1, merchandisers: 8, status: 'inactivo' },
      ];

      setSupervisors(demoSupervisors);
      setTaskers(demoTaskers);
      setBranches(demoBranches);
      
      setStats({
        totalSupervisors: demoSupervisors.length,
        totalTaskers: demoTaskers.length,
        totalBranches: demoBranches.length,
        totalMerchandisers: demoSupervisors.reduce((sum, s) => sum + s.totalMerchandisers, 0),
        activeSupervisors: demoSupervisors.filter(s => s.status === 'activo').length,
        activeTaskers: demoTaskers.filter(t => t.status === 'activo').length,
        activeBranches: demoBranches.filter(b => b.status === 'activo').length
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen w-full text-white">
      <Header />
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]"
                style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Dashboard Admin Agencia
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Administra supervisores, taskers, sucursales y mercaderistas de tu país: {user?.country}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-[#fdd742] mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {stats.totalSupervisors}
              </div>
              <div className="text-gray-300 text-sm">Total Supervisores</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {stats.totalTaskers}
              </div>
              <div className="text-gray-300 text-sm">Total Taskers</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {stats.totalBranches}
              </div>
              <div className="text-gray-300 text-sm">Total Sucursales</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {stats.totalMerchandisers}
              </div>
              <div className="text-gray-300 text-sm">Total Mercaderistas</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => navigate('/supervisores-agencia')}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#fdd742]/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#fdd742]/30 transition-colors">
                <svg className="w-6 h-6 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Supervisores</h3>
              <p className="text-gray-400 text-sm">Gestiona supervisores</p>
            </button>

            <button
              onClick={() => navigate('/taskers-agencia')}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Taskers</h3>
              <p className="text-gray-400 text-sm">Gestiona taskers</p>
            </button>

            <button
              onClick={() => navigate('/sucursales-agencia')}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Sucursales</h3>
              <p className="text-gray-400 text-sm">Gestiona sucursales</p>
            </button>

            <button
              onClick={() => navigate('/merchandisers-pais')}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Mercaderistas</h3>
              <p className="text-gray-400 text-sm">Ver por país</p>
            </button>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Supervisores Recientes */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold mb-4 text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                Supervisores Recientes
              </h2>
              <div className="space-y-3">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fdd742] mx-auto mb-2"></div>
                    <p className="text-gray-400">Cargando...</p>
                  </div>
                ) : supervisors.slice(0, 3).map((supervisor) => (
                  <div key={supervisor.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#fdd742]/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{supervisor.name}</h3>
                        <p className="text-xs text-gray-400">{supervisor.branch}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{supervisor.lastActivity}</div>
                      <div className="text-xs text-[#fdd742]">{supervisor.totalMerchandisers} mercaderistas</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sucursales Activas */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold mb-4 text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                Sucursales Activas
              </h2>
              <div className="space-y-3">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fdd742] mx-auto mb-2"></div>
                    <p className="text-gray-400">Cargando...</p>
                  </div>
                ) : branches.filter(b => b.status === 'activo').slice(0, 3).map((branch) => (
                  <div key={branch.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{branch.name}</h3>
                        <p className="text-xs text-gray-400">{branch.city}, {branch.country}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{branch.supervisors + branch.taskers} personal</div>
                      <div className="text-xs text-green-400">{branch.merchandisers} mercaderistas</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}