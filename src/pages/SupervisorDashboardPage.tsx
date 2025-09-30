import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface Merchandiser {
  id: string;
  email: string;
  points: number;
  level: number;
  completedStations: number;
  status: 'activo' | 'inactivo';
  lastActivity: string;
}

export default function SupervisorDashboardPage() {
  const { user, currentUserRole } = useApp();
  const navigate = useNavigate();

  // Estado para datos reales
  const [merchandisers, setMerchandisers] = useState<Merchandiser[]>([]);
  const [stats, setStats] = useState({
    totalMerchandisers: 0,
    activeMerchandisers: 0,
    totalPoints: 0,
    averageLevel: 0
  });
  const [loading, setLoading] = useState(true);

  // Cargar datos reales (por ahora vacío, se conectará con la API)
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      // Datos demo para mercaderistas
      const demoMerchandisers: Merchandiser[] = [
        { id: 'M001', email: 'juan.perez@luismorenos.com', points: 1250, level: 5, completedStations: 10, status: 'activo', lastActivity: 'Hace 2 horas' },
        { id: 'M002', email: 'maria.garcia@luismorenos.com', points: 980, level: 4, completedStations: 8, status: 'activo', lastActivity: 'Hace 1 día' },
        { id: 'M003', email: 'carlos.lopez@luismorenos.com', points: 720, level: 3, completedStations: 6, status: 'inactivo', lastActivity: 'Hace 3 días' },
        { id: 'M004', email: 'ana.martinez@luismorenos.com', points: 1500, level: 6, completedStations: 12, status: 'activo', lastActivity: 'Hace 5 horas' },
        { id: 'M005', email: 'pedro.sanchez@luismorenos.com', points: 600, level: 3, completedStations: 5, status: 'activo', lastActivity: 'Hace 1 semana' },
      ];

      setMerchandisers(demoMerchandisers);
      setStats({
        totalMerchandisers: demoMerchandisers.length,
        activeMerchandisers: demoMerchandisers.filter(m => m.status === 'activo').length,
        totalPoints: demoMerchandisers.reduce((sum, m) => sum + m.points, 0),
        averageLevel: parseFloat((demoMerchandisers.reduce((sum, m) => sum + m.level, 0) / demoMerchandisers.length).toFixed(1)) || 0
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
              Dashboard {currentUserRole === 'tasker' ? 'Tasker' : 'Supervisor'}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              {currentUserRole === 'tasker' 
                ? `Gestiona las tareas y supervisa el rendimiento de los mercaderistas de tu sucursal: ${user?.branch}`
                : `Supervisa el rendimiento de los mercaderistas de tu sucursal: ${user?.branch}`
              }
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-[#fdd742] mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {stats.totalMerchandisers}
              </div>
              <div className="text-gray-300 text-sm">Total Mercaderistas</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {stats.activeMerchandisers}
              </div>
              <div className="text-gray-300 text-sm">Activos</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {stats.totalPoints}
              </div>
              <div className="text-gray-300 text-sm">Puntos Totales</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {stats.averageLevel}
              </div>
              <div className="text-gray-300 text-sm">Nivel Promedio</div>
            </div>
          </div>

          {/* Merchandisers List */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Mercaderistas de la Sucursal
            </h2>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                  <p className="text-gray-400">Cargando mercaderistas...</p>
                </div>
              ) : merchandisers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No hay mercaderistas</h3>
                  <p className="text-gray-400 mb-4">No hay mercaderistas asignados a tu sucursal aún.</p>
                  <button
                    onClick={() => navigate('/merchandisers')}
                    className="px-6 py-2 bg-[#fdd742] text-black rounded-lg hover:bg-[#fdd742]/80 transition-colors font-medium"
                  >
                    Gestionar Mercaderistas
                  </button>
                </div>
              ) : (
                merchandisers.map((merchandiser) => (
                  <div key={merchandiser.id} className="bg-white/5 rounded-2xl border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{merchandiser.id}</h3>
                          <p className="text-sm text-gray-400">{merchandiser.email}</p>
                          <p className="text-xs text-gray-500">Última actividad: {merchandiser.lastActivity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#fdd742]">{merchandiser.points}</div>
                          <div className="text-xs text-gray-400">Puntos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">Nivel {merchandiser.level}</div>
                          <div className="text-xs text-gray-400">{merchandiser.completedStations} estaciones</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            merchandiser.status === 'activo' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {merchandiser.status === 'activo' ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
