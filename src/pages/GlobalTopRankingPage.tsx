import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface GlobalRanking {
  id: string;
  email: string;
  role: 'mercaderista' | 'supervisor' | 'tasker' | 'admin_agencia' | 'super_admin';
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

export default function GlobalTopRankingPage() {
  const { currentUserRole } = useApp();
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState<GlobalRanking[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [selectedDistributor, setSelectedDistributor] = useState("all");

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    setLoading(true);
    try {
      // Verificar cache
      const cachedRankings = localStorage.getItem('globalRankings');
      
      if (cachedRankings) {
        setRankings(JSON.parse(cachedRankings));
        setLoading(false);
        return;
      }

      // Cargar datos demo
      const demoRankings: GlobalRanking[] = [
        {
          id: 'M001',
          email: 'ana.martinez@luismorenos.com',
          role: 'mercaderista',
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
          role: 'mercaderista',
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
          role: 'mercaderista',
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
          role: 'mercaderista',
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
          role: 'mercaderista',
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
          role: 'mercaderista',
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
          role: 'mercaderista',
          region: 'Centroamérica',
          country: 'Honduras',
          agency: 'Agencia Honduras',
          branch: 'Sucursal Tegucigalpa',
          rank: 7,
          points: 720,
          level: 3,
          completedStations: 6,
          status: 'activo',
          lastActivity: 'Hace 3 días',
          totalActivities: 25,
          pointsThisWeek: 80,
          pointsThisMonth: 300
        },
        {
          id: 'M008',
          email: 'pedro.sanchez@luismorenos.com',
          role: 'mercaderista',
          region: 'Centroamérica',
          country: 'Nicaragua',
          agency: 'Agencia Nicaragua',
          branch: 'Sucursal Managua',
          rank: 8,
          points: 600,
          level: 3,
          completedStations: 5,
          status: 'inactivo',
          lastActivity: 'Hace 1 semana',
          totalActivities: 20,
          pointsThisWeek: 0,
          pointsThisMonth: 150
        },
        {
          id: 'S001',
          email: 'carlos.mendoza@luismorenos.com',
          role: 'supervisor',
          region: 'Centroamérica',
          country: 'Panamá',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Centro',
          rank: 9,
          points: 0,
          level: 1,
          completedStations: 0,
          status: 'activo',
          lastActivity: 'Hace 2 horas',
          totalActivities: 0,
          pointsThisWeek: 0,
          pointsThisMonth: 0
        },
        {
          id: 'T001',
          email: 'maria.lopez@luismorenos.com',
          role: 'tasker',
          region: 'Centroamérica',
          country: 'Panamá',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Centro',
          rank: 10,
          points: 0,
          level: 1,
          completedStations: 0,
          status: 'activo',
          lastActivity: 'Hace 1 hora',
          totalActivities: 0,
          pointsThisWeek: 0,
          pointsThisMonth: 0
        }
      ];

      setRankings(demoRankings);

      // Guardar en cache
      localStorage.setItem('globalRankings', JSON.stringify(demoRankings));

      setLoading(false);
    } catch (error) {
      console.error('Error cargando rankings globales:', error);
      setLoading(false);
    }
  };

  // Filtrar rankings y obtener top 10
  const filteredRankings = rankings.filter(ranking => {
    const matchesCountry = selectedCountry === 'all' || ranking.country === selectedCountry;
    const matchesAgency = selectedAgency === 'all' || ranking.agency === selectedAgency;
    
    return matchesCountry && matchesAgency;
  });

  // Ordenar por puntos y tomar solo los top 10
  const currentRankings = filteredRankings
    .sort((a, b) => b.points - a.points)
    .slice(0, 10)
    .map((ranking, index) => ({
      ...ranking,
      rank: index + 1
    }));

  // Obtener opciones únicas con lógica en cascada
  const countries = Array.from(new Set(rankings.map(r => r.country)));
  
  const getAvailableAgencies = () => {
    if (selectedCountry === 'all') {
      return Array.from(new Set(rankings.map(r => r.agency)));
    }
    return Array.from(new Set(rankings.filter(r => r.country === selectedCountry).map(r => r.agency)));
  };

  const agencies = getAvailableAgencies();
  const distributors = Array.from(new Set(rankings.map(r => r.role)));

  // Manejar cambios en cascada
  const handleCountryChange = (newCountry: string) => {
    setSelectedCountry(newCountry);
    setSelectedAgency('all'); // Resetear agencia cuando cambia el país
  };

  const handleAgencyChange = (newAgency: string) => {
    setSelectedAgency(newAgency);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'mercaderista': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'supervisor': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'tasker': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'admin_agencia': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'super_admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'mercaderista': return 'Mercaderista';
      case 'supervisor': return 'Supervisor';
      case 'tasker': return 'Tasker';
      case 'admin_agencia': return 'Admin Agencia';
      case 'super_admin': return 'Super Admin';
      default: return role;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando ranking global...</p>
        </div>
      </div>
    );
  }

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
              Top 10 Ganadores
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Los mejores performers del sistema filtrados por país y agencia
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">País</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="all" className="bg-gray-800 text-white">Todos los Países</option>
                  {countries.map(country => (
                    <option key={country} value={country} className="bg-gray-800 text-white">{country}</option>
                  ))}
                </select>
              </div>

              {/* Agency Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Agencia</label>
                <select
                  value={selectedAgency}
                  onChange={(e) => handleAgencyChange(e.target.value)}
                  disabled={selectedCountry === 'all' && rankings.length > 0}
                  className={`w-full px-4 py-3 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all ${
                    selectedCountry === 'all' && rankings.length > 0
                      ? 'bg-white/5 border-white/10 text-gray-400 cursor-not-allowed'
                      : 'bg-white/10 border-white/20'
                  }`}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="all" className="bg-gray-800 text-white">Todas las Agencias</option>
                  {agencies.map(agency => (
                    <option key={agency} value={agency} className="bg-gray-800 text-white">{agency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Top 10 Rankings */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#fdd742] mb-2">Top 10 Ganadores</h2>
              <p className="text-gray-400">
                {selectedCountry !== 'all' && selectedAgency !== 'all' 
                  ? `Mejores performers de ${selectedAgency} en ${selectedCountry}`
                  : selectedCountry !== 'all' 
                  ? `Mejores performers de ${selectedCountry}`
                  : 'Mejores performers del sistema'
                }
              </p>
            </div>

            {currentRankings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No hay ganadores</h3>
                <p className="text-gray-400">Ajusta los filtros para ver más resultados.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentRankings.map((ranking) => (
                  <div key={ranking.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg flex-shrink-0 ${
                          ranking.rank === 1 ? 'bg-yellow-400' :
                          ranking.rank === 2 ? 'bg-gray-300' :
                          ranking.rank === 3 ? 'bg-amber-600' :
                          'bg-[#fdd742]'
                        }`}>
                          {ranking.rank}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{ranking.id}</h3>
                          <p className="text-sm text-gray-400">{ranking.email}</p>
                          <p className="text-xs text-gray-500">{ranking.country} • {ranking.agency}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-xl font-bold text-[#fdd742]">{ranking.points.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Puntos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">Nivel {ranking.level}</div>
                          <div className="text-xs text-gray-400">{ranking.completedStations} estaciones</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-400">{ranking.pointsThisWeek}</div>
                          <div className="text-xs text-gray-400">Esta semana</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ranking.status === 'activo' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {ranking.status === 'activo' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
