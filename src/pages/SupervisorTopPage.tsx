import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface MerchandiserRanking {
  id: string;
  email: string;
  points: number;
  level: number;
  completedStations: number;
  rank: number;
  branch: string;
  lastActivity: string;
  status: 'activo' | 'inactivo';
  joinDate: string;
  currentStreak: number;
  bestStreak: number;
  totalActivities: number;
  pointsThisWeek: number;
  pointsThisMonth: number;
}

export default function SupervisorTopPage() {
  const { user } = useApp();
  const navigate = useNavigate();

  // Estados para el ranking
  const [merchandisers, setMerchandisers] = useState<MerchandiserRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Cargar datos del ranking
  useEffect(() => {
    loadRanking();
  }, [timeFilter]);

  const loadRanking = async () => {
    setLoading(true);
    try {
      // Simular carga de datos (se conectará con la API real)
      setTimeout(() => {
        // Datos demo para el ranking
        const demoRanking: MerchandiserRanking[] = [
          {
            id: 'M004',
            email: 'ana.martinez@luismorenos.com',
            rank: 1,
            points: 1500,
            level: 6,
            completedStations: 12,
            status: 'activo',
            lastActivity: 'Hace 5 horas',
            totalActivities: 45,
            pointsThisWeek: 180,
            pointsThisMonth: 650
          },
          {
            id: 'M008',
            email: 'carmen.silva@luismorenos.com',
            rank: 2,
            points: 1350,
            level: 5,
            completedStations: 11,
            status: 'activo',
            lastActivity: 'Hace 4 horas',
            totalActivities: 42,
            pointsThisWeek: 165,
            pointsThisMonth: 580
          },
          {
            id: 'M001',
            email: 'juan.perez@luismorenos.com',
            rank: 3,
            points: 1250,
            level: 5,
            completedStations: 10,
            status: 'activo',
            lastActivity: 'Hace 2 horas',
            totalActivities: 38,
            pointsThisWeek: 150,
            pointsThisMonth: 520
          },
          {
            id: 'M006',
            email: 'sofia.rodriguez@luismorenos.com',
            rank: 4,
            points: 1100,
            level: 4,
            completedStations: 9,
            status: 'activo',
            lastActivity: 'Hace 3 horas',
            totalActivities: 35,
            pointsThisWeek: 140,
            pointsThisMonth: 480
          },
          {
            id: 'M002',
            email: 'maria.garcia@luismorenos.com',
            rank: 5,
            points: 980,
            level: 4,
            completedStations: 8,
            status: 'activo',
            lastActivity: 'Hace 1 día',
            totalActivities: 32,
            pointsThisWeek: 120,
            pointsThisMonth: 420
          },
          {
            id: 'M007',
            email: 'luis.torres@luismorenos.com',
            rank: 6,
            points: 850,
            level: 3,
            completedStations: 7,
            status: 'activo',
            lastActivity: 'Hace 2 días',
            totalActivities: 28,
            pointsThisWeek: 100,
            pointsThisMonth: 350
          },
          {
            id: 'M003',
            email: 'carlos.lopez@luismorenos.com',
            rank: 7,
            points: 720,
            level: 3,
            completedStations: 6,
            status: 'inactivo',
            lastActivity: 'Hace 3 días',
            totalActivities: 25,
            pointsThisWeek: 80,
            pointsThisMonth: 300
          },
          {
            id: 'M005',
            email: 'pedro.sanchez@luismorenos.com',
            rank: 8,
            points: 600,
            level: 3,
            completedStations: 5,
            status: 'activo',
            lastActivity: 'Hace 1 semana',
            totalActivities: 22,
            pointsThisWeek: 60,
            pointsThisMonth: 250
          }
        ];
        setMerchandisers(demoRanking);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error cargando ranking:', error);
      setLoading(false);
    }
  };

  // Filtrar por período de tiempo
  const getFilteredMerchandisers = () => {
    return merchandisers.filter(merchandiser => {
      switch (timeFilter) {
        case 'week':
          return merchandiser.pointsThisWeek > 0;
        case 'month':
          return merchandiser.pointsThisMonth > 0;
        default:
          return true;
      }
    });
  };

  const filteredMerchandisers = getFilteredMerchandisers();

  // Calcular paginación
  const totalPages = Math.ceil(filteredMerchandisers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMerchandisers = filteredMerchandisers.slice(startIndex, endIndex);

  // Resetear página cuando cambie el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [timeFilter]);

  const handleMerchandiserClick = (merchandiserId: string) => {
    navigate(`/merchandiser-detail/${merchandiserId}`);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-orange-400";
    return "text-gray-400";
  };

  const getTimeFilterLabel = () => {
    switch (timeFilter) {
      case 'week': return 'Esta Semana';
      case 'month': return 'Este Mes';
      default: return 'Todos los Tiempos';
    }
  };

  return (
    <div className="min-h-screen w-full text-white">
      <Header />
      
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]" 
              style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
            >
              Top Mercaderistas
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Ranking de los mejores mercaderistas de tu sucursal: {user?.branch}
            </p>
          </div>

          {/* Filtros de Tiempo */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Período de Ranking</h3>
                <p className="text-sm text-gray-400">Selecciona el período para el ranking</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    timeFilter === 'all'
                      ? 'bg-[#fdd742] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Todos los Tiempos
                </button>
                <button
                  onClick={() => setTimeFilter('week')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    timeFilter === 'week'
                      ? 'bg-[#fdd742] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Esta Semana
                </button>
                <button
                  onClick={() => setTimeFilter('month')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    timeFilter === 'month'
                      ? 'bg-[#fdd742] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Este Mes
                </button>
              </div>
            </div>
          </div>

          {/* Ranking de Mercaderistas */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                  Ranking - {getTimeFilterLabel()}
                </h2>
                <div className="text-sm text-gray-400">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, filteredMerchandisers.length)} de {filteredMerchandisers.length}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                <p className="text-gray-400">Cargando ranking...</p>
              </div>
            ) : filteredMerchandisers.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No hay datos de ranking</h3>
                <p className="text-gray-400 mb-4">
                  No hay mercaderistas con actividad en el período seleccionado.
                </p>
                <button
                  onClick={loadRanking}
                  className="px-6 py-2 bg-[#fdd742] text-black rounded-lg hover:bg-[#fdd742]/80 transition-colors font-medium"
                >
                  Actualizar
                </button>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {currentMerchandisers.map((merchandiser) => (
                  <div
                    key={merchandiser.id}
                    onClick={() => handleMerchandiserClick(merchandiser.id)}
                    className="p-6 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      {/* Posición y Avatar */}
                      <div className="flex items-center space-x-4">
                        <div className={`text-3xl font-bold ${getRankColor(merchandiser.rank)}`}>
                          {getRankIcon(merchandiser.rank)}
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-[#fdd742]/20 to-yellow-400/20 rounded-xl border border-[#fdd742]/30 flex items-center justify-center">
                          <svg className="w-8 h-8 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{merchandiser.id}</h3>
                          <p className="text-gray-400 mb-2">{merchandiser.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Miembro desde: {new Date(merchandiser.joinDate).toLocaleDateString()}</span>
                            <span>Última actividad: {merchandiser.lastActivity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Estadísticas del Ranking */}
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                            {timeFilter === 'week' ? merchandiser.pointsThisWeek : 
                             timeFilter === 'month' ? merchandiser.pointsThisMonth : 
                             merchandiser.points.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            {timeFilter === 'week' ? 'Puntos Esta Semana' : 
                             timeFilter === 'month' ? 'Puntos Este Mes' : 
                             'Puntos Totales'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                            {merchandiser.level}
                          </div>
                          <div className="text-xs text-gray-400">Nivel</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                            {merchandiser.completedStations}
                          </div>
                          <div className="text-xs text-gray-400">Estaciones</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                            {merchandiser.currentStreak}
                          </div>
                          <div className="text-xs text-gray-400">Racha</div>
                        </div>
                      </div>

                      {/* Estado y Acción */}
                      <div className="flex items-center space-x-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                          merchandiser.status === 'activo' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {merchandiser.status === 'activo' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Paginación */}
            {filteredMerchandisers.length > itemsPerPage && (
              <div className="px-6 py-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Página {currentPage} de {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Números de página */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNumber = i + 1;
                        const isActive = pageNumber === currentPage;
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-[#fdd742] text-black'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
