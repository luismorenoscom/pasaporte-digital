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
  lastActivity: string;
  status: 'activo' | 'inactivo';
  branch: string;
  country: string;
  joinDate: string;
  totalActivities: number;
  currentStreak: number;
  bestStreak: number;
}

export default function SupervisorMerchandisersPage() {
  const { user } = useApp();
  const navigate = useNavigate();

  // Estados para la gestión de mercaderistas
  const [merchandisers, setMerchandisers] = useState<Merchandiser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Cargar datos de mercaderistas
  useEffect(() => {
    loadMerchandisers();
  }, []);

  const loadMerchandisers = async () => {
    setLoading(true);
    try {
      // Simular carga de datos (se conectará con la API real)
      setTimeout(() => {
        // Datos demo para mercaderistas
        const demoMerchandisers: Merchandiser[] = [
          {
            id: 'M001',
            email: 'juan.perez@luismorenos.com',
            points: 1250,
            level: 5,
            completedStations: 10,
            status: 'activo',
            lastActivity: 'Hace 2 horas',
            joinDate: '2024-01-15',
            bestStreak: 7
          },
          {
            id: 'M002',
            email: 'maria.garcia@luismorenos.com',
            points: 980,
            level: 4,
            completedStations: 8,
            status: 'activo',
            lastActivity: 'Hace 1 día',
            joinDate: '2024-02-20',
            bestStreak: 5
          },
          {
            id: 'M003',
            email: 'carlos.lopez@luismorenos.com',
            points: 720,
            level: 3,
            completedStations: 6,
            status: 'inactivo',
            lastActivity: 'Hace 3 días',
            joinDate: '2024-01-10',
            bestStreak: 3
          },
          {
            id: 'M004',
            email: 'ana.martinez@luismorenos.com',
            points: 1500,
            level: 6,
            completedStations: 12,
            status: 'activo',
            lastActivity: 'Hace 5 horas',
            joinDate: '2024-03-05',
            bestStreak: 9
          },
          {
            id: 'M005',
            email: 'pedro.sanchez@luismorenos.com',
            points: 600,
            level: 3,
            completedStations: 5,
            status: 'activo',
            lastActivity: 'Hace 1 semana',
            joinDate: '2024-02-28',
            bestStreak: 2
          },
          {
            id: 'M006',
            email: 'sofia.rodriguez@luismorenos.com',
            points: 1100,
            level: 4,
            completedStations: 9,
            status: 'activo',
            lastActivity: 'Hace 3 horas',
            joinDate: '2024-01-20',
            bestStreak: 6
          },
          {
            id: 'M007',
            email: 'luis.torres@luismorenos.com',
            points: 850,
            level: 3,
            completedStations: 7,
            status: 'activo',
            lastActivity: 'Hace 2 días',
            joinDate: '2024-02-25',
            bestStreak: 4
          },
          {
            id: 'M008',
            email: 'carmen.silva@luismorenos.com',
            points: 1350,
            level: 5,
            completedStations: 11,
            status: 'activo',
            lastActivity: 'Hace 4 horas',
            joinDate: '2024-03-10',
            bestStreak: 8
          }
        ];
        setMerchandisers(demoMerchandisers);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error cargando mercaderistas:', error);
      setLoading(false);
    }
  };

  // Filtrar mercaderistas por búsqueda
  const filteredMerchandisers = merchandisers.filter(merchandiser => {
    const matchesSearch = merchandiser.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchandiser.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Calcular paginación
  const totalPages = Math.ceil(filteredMerchandisers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMerchandisers = filteredMerchandisers.slice(startIndex, endIndex);

  // Resetear página cuando cambie la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleMerchandiserClick = (merchandiserId: string) => {
    navigate(`/merchandiser-detail/${merchandiserId}`);
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
              Mercaderistas
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Gestiona y supervisa el rendimiento de los mercaderistas de tu sucursal: {user?.branch}
            </p>
          </div>

          {/* Búsqueda */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Buscar mercaderista
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ID o email..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-transparent"
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Lista de Mercaderistas */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                  Lista de Mercaderistas
                </h2>
                <div className="text-sm text-gray-400">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, filteredMerchandisers.length)} de {filteredMerchandisers.length}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                <p className="text-gray-400">Cargando mercaderistas...</p>
              </div>
            ) : filteredMerchandisers.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {searchTerm ? 'No se encontraron mercaderistas' : 'No hay mercaderistas'}
                </h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm 
                    ? 'Intenta ajustar el término de búsqueda.' 
                    : 'No hay mercaderistas asignados a tu sucursal aún.'
                  }
                </p>
                <button
                  onClick={loadMerchandisers}
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
                      {/* Información del mercaderista */}
                      <div className="flex items-center space-x-4">
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

                      {/* Estadísticas */}
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                            {merchandiser.points.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">Puntos</div>
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

                      {/* Estado y acciones */}
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
