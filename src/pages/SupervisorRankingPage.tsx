import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface MerchandiserRanking {
  id: string;
  email: string;
  region: string;
  country: string;
  agency: string;
  branch: string;
  rank: number;
  points: number;
  level: number;
  completedStations: number;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  totalActivities: number;
  pointsThisWeek: number;
  pointsThisMonth: number;
}

export default function SupervisorRankingPage() {
  const { user } = useApp();
  const navigate = useNavigate();

  // Estados para el ranking
  const [merchandisers, setMerchandisers] = useState<MerchandiserRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [agencyFilter, setAgencyFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Cargar datos del ranking
  useEffect(() => {
    loadRanking();
  }, [timeFilter, regionFilter, countryFilter, agencyFilter]);

  const loadRanking = async () => {
    setLoading(true);
    try {
      // Simular carga de datos (se conectará con la API real)
      setTimeout(() => {
        // Datos demo para el ranking global
        const demoRanking: MerchandiserRanking[] = [
          {
            id: 'M001',
            email: 'ana.martinez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Centro',
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
            id: 'M002',
            email: 'carlos.lopez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Costa Rica',
            agency: 'Agencia Costa Rica',
            branch: 'Sucursal San José',
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
            id: 'M003',
            email: 'maria.garcia@luismorenos.com',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Norte',
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
            id: 'M004',
            email: 'juan.perez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Guatemala',
            agency: 'Agencia Guatemala',
            branch: 'Sucursal Centro',
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
            id: 'M005',
            email: 'sofia.rodriguez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Sur',
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
            id: 'M006',
            email: 'luis.torres@luismorenos.com',
            region: 'Centroamérica',
            country: 'El Salvador',
            agency: 'Agencia El Salvador',
            branch: 'Sucursal San Salvador',
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
            id: 'M007',
            email: 'carmen.silva@luismorenos.com',
            region: 'Centroamérica',
            country: 'Honduras',
            agency: 'Agencia Honduras',
            branch: 'Sucursal Tegucigalpa',
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
            id: 'M008',
            email: 'pedro.sanchez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Nicaragua',
            agency: 'Agencia Nicaragua',
            branch: 'Sucursal Managua',
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
      // Filtro por tiempo
      let timeMatch = true;
      switch (timeFilter) {
        case 'week':
          timeMatch = merchandiser.pointsThisWeek > 0;
          break;
        case 'month':
          timeMatch = merchandiser.pointsThisMonth > 0;
          break;
        case 'all':
        default:
          timeMatch = true;
      }

      // Filtro por región
      const regionMatch = regionFilter === 'all' || merchandiser.region === regionFilter;
      
      // Filtro por país
      const countryMatch = countryFilter === 'all' || merchandiser.country === countryFilter;
      
      // Filtro por agencia
      const agencyMatch = agencyFilter === 'all' || merchandiser.agency === agencyFilter;

      return timeMatch && regionMatch && countryMatch && agencyMatch;
    }).sort((a, b) => b.points - a.points);
  };

  const filteredAndSortedMerchandisers = getFilteredMerchandisers();

  // Obtener opciones únicas para los filtros
  const regions = [...new Set(merchandisers.map(m => m.region))];
  const countries = [...new Set(merchandisers.map(m => m.country))];
  const agencies = [...new Set(merchandisers.map(m => m.agency))];

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMerchandisers = filteredAndSortedMerchandisers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedMerchandisers.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen w-full text-white">
      <Header />
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]"
                style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Ranking Global de Mercaderistas
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Consulta el ranking de mercaderistas por regiones, países y agencias
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filtro de tiempo */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Período</label>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as 'all' | 'week' | 'month')}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742]"
                >
                  <option value="all">General</option>
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mes</option>
                </select>
              </div>

              {/* Filtro de región */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Región</label>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742]"
                >
                  <option value="all">Todas las Regiones</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Filtro de país */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">País</label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742]"
                >
                  <option value="all">Todos los Países</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Filtro de agencia */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Agencia</label>
                <select
                  value={agencyFilter}
                  onChange={(e) => setAgencyFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742]"
                >
                  <option value="all">Todas las Agencias</option>
                  {agencies.map(agency => (
                    <option key={agency} value={agency}>{agency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Ranking List */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                <p className="text-gray-400">Cargando ranking...</p>
              </div>
            ) : filteredAndSortedMerchandisers.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No hay mercaderistas en el ranking</h3>
                <p className="text-gray-400">Ajusta los filtros para ver más resultados.</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {currentMerchandisers.map((merchandiser) => (
                    <div key={merchandiser.id} className="bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
                      <div className="flex items-center space-x-4 w-full md:w-auto">
                        <div className="w-10 h-10 bg-[#fdd742] rounded-full flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
                          {merchandiser.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate">{merchandiser.id}</h3>
                          <p className="text-sm text-gray-400 truncate">{merchandiser.email}</p>
                          <p className="text-xs text-gray-500 truncate">{merchandiser.region} • {merchandiser.country} • {merchandiser.agency}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-end items-center gap-x-6 gap-y-2 text-sm w-full md:w-auto">
                        <div className="text-center">
                          <div className="font-bold text-[#fdd742]">{merchandiser.points}</div>
                          <div className="text-xs text-gray-400">Puntos</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-400">Nivel {merchandiser.level}</div>
                          <div className="text-xs text-gray-400">{merchandiser.completedStations} Estaciones</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-purple-400">{merchandiser.totalActivities}</div>
                          <div className="text-xs text-gray-400">Actividades</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          merchandiser.status === 'activo' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {merchandiser.status === 'activo' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === index + 1
                            ? 'bg-[#fdd742] text-black'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
