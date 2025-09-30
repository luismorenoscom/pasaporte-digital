import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface CountryStats {
  country: string;
  region: string;
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  averageLevel: number;
  completedStations: number;
  topPerformer: {
    id: string;
    email: string;
    points: number;
    level: number;
  };
}

interface AgencyStats {
  agency: string;
  country: string;
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  averageLevel: number;
  completedStations: number;
  topPerformer: {
    id: string;
    email: string;
    points: number;
    level: number;
  };
}

export default function StatisticsPage() {
  const { currentUserRole } = useApp();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'countries' | 'agencies'>('countries');
  const [countryStats, setCountryStats] = useState<CountryStats[]>([]);
  const [agencyStats, setAgencyStats] = useState<AgencyStats[]>([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      // Verificar si ya tenemos datos en cache
      const cachedCountryStats = localStorage.getItem('countryStats');
      const cachedAgencyStats = localStorage.getItem('agencyStats');
      
      if (cachedCountryStats && cachedAgencyStats) {
        setCountryStats(JSON.parse(cachedCountryStats));
        setAgencyStats(JSON.parse(cachedAgencyStats));
        setLoading(false);
        return;
      }

      // Cargar datos inmediatamente sin delay
        // Datos demo para estadísticas por países
        const demoCountryStats: CountryStats[] = [
          {
            country: 'Panamá',
            region: 'Centroamérica',
            totalUsers: 45,
            activeUsers: 38,
            totalPoints: 125000,
            averageLevel: 4.2,
            completedStations: 180,
            topPerformer: {
              id: 'M001',
              email: 'ana.martinez@luismorenos.com',
              points: 1500,
              level: 6
            }
          },
          {
            country: 'Costa Rica',
            region: 'Centroamérica',
            totalUsers: 32,
            activeUsers: 28,
            totalPoints: 89000,
            averageLevel: 3.8,
            completedStations: 125,
            topPerformer: {
              id: 'M002',
              email: 'carlos.lopez@luismorenos.com',
              points: 1350,
              level: 5
            }
          },
          {
            country: 'Guatemala',
            region: 'Centroamérica',
            totalUsers: 28,
            activeUsers: 22,
            totalPoints: 67000,
            averageLevel: 3.5,
            completedStations: 95,
            topPerformer: {
              id: 'M004',
              email: 'juan.perez@luismorenos.com',
              points: 1100,
              level: 4
            }
          },
          {
            country: 'El Salvador',
            region: 'Centroamérica',
            totalUsers: 20,
            activeUsers: 16,
            totalPoints: 45000,
            averageLevel: 3.2,
            completedStations: 70,
            topPerformer: {
              id: 'M006',
              email: 'luis.torres@luismorenos.com',
              points: 850,
              level: 3
            }
          },
          {
            country: 'Honduras',
            region: 'Centroamérica',
            totalUsers: 18,
            activeUsers: 14,
            totalPoints: 38000,
            averageLevel: 3.0,
            completedStations: 60,
            topPerformer: {
              id: 'M007',
              email: 'carmen.silva@luismorenos.com',
              points: 720,
              level: 3
            }
          },
          {
            country: 'Nicaragua',
            region: 'Centroamérica',
            totalUsers: 15,
            activeUsers: 12,
            totalPoints: 30000,
            averageLevel: 2.8,
            completedStations: 45,
            topPerformer: {
              id: 'M008',
              email: 'pedro.sanchez@luismorenos.com',
              points: 600,
              level: 3
            }
          }
        ];

        // Datos demo para estadísticas por agencias
        const demoAgencyStats: AgencyStats[] = [
          {
            agency: 'Agencia Panamá Centro',
            country: 'Panamá',
            totalUsers: 25,
            activeUsers: 22,
            totalPoints: 75000,
            averageLevel: 4.5,
            completedStations: 120,
            topPerformer: {
              id: 'M001',
              email: 'ana.martinez@luismorenos.com',
              points: 1500,
              level: 6
            }
          },
          {
            agency: 'Agencia Costa Rica',
            country: 'Costa Rica',
            totalUsers: 20,
            activeUsers: 18,
            totalPoints: 55000,
            averageLevel: 4.0,
            completedStations: 85,
            topPerformer: {
              id: 'M002',
              email: 'carlos.lopez@luismorenos.com',
              points: 1350,
              level: 5
            }
          },
          {
            agency: 'Agencia Guatemala',
            country: 'Guatemala',
            totalUsers: 18,
            activeUsers: 15,
            totalPoints: 42000,
            averageLevel: 3.6,
            completedStations: 70,
            topPerformer: {
              id: 'M004',
              email: 'juan.perez@luismorenos.com',
              points: 1100,
              level: 4
            }
          },
          {
            agency: 'Agencia El Salvador',
            country: 'El Salvador',
            totalUsers: 12,
            activeUsers: 10,
            totalPoints: 28000,
            averageLevel: 3.3,
            completedStations: 45,
            topPerformer: {
              id: 'M006',
              email: 'luis.torres@luismorenos.com',
              points: 850,
              level: 3
            }
          },
          {
            agency: 'Agencia Honduras',
            country: 'Honduras',
            totalUsers: 10,
            activeUsers: 8,
            totalPoints: 22000,
            averageLevel: 3.1,
            completedStations: 35,
            topPerformer: {
              id: 'M007',
              email: 'carmen.silva@luismorenos.com',
              points: 720,
              level: 3
            }
          },
          {
            agency: 'Agencia Nicaragua',
            country: 'Nicaragua',
            totalUsers: 8,
            activeUsers: 6,
            totalPoints: 18000,
            averageLevel: 2.9,
            completedStations: 25,
            topPerformer: {
              id: 'M008',
              email: 'pedro.sanchez@luismorenos.com',
              points: 600,
              level: 3
            }
          }
        ];

        setCountryStats(demoCountryStats);
        setAgencyStats(demoAgencyStats);
        
        // Guardar en cache
        localStorage.setItem('countryStats', JSON.stringify(demoCountryStats));
        localStorage.setItem('agencyStats', JSON.stringify(demoAgencyStats));
        
        setLoading(false);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      setLoading(false);
    }
  };

  const getRoleTitle = () => {
    switch (currentUserRole) {
      case 'tasker':
        return 'Dashboard Tasker';
      case 'admin_agencia':
        return 'Dashboard Admin Agencia';
      default:
        return 'Estadísticas';
    }
  };

  const getRoleDescription = () => {
    switch (currentUserRole) {
      case 'tasker':
        return 'Supervisa el rendimiento de los mercaderistas de tu sucursal';
      case 'admin_agencia':
        return 'Gestiona y supervisa el rendimiento de tu país y agencias';
      default:
        return 'Consulta las estadísticas del sistema';
    }
  };


  const renderStatsCard = (stats: CountryStats | AgencyStats, isAgency: boolean = false) => {
    const title = isAgency ? (stats as AgencyStats).agency : (stats as CountryStats).country;
    const subtitle = isAgency ? (stats as AgencyStats).country : (stats as CountryStats).region;

    return (
      <div key={title} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{subtitle}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#fdd742]">{stats.totalPoints.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Puntos Totales</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{stats.totalUsers}</div>
            <div className="text-xs text-gray-400">Total Usuarios</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{stats.activeUsers}</div>
            <div className="text-xs text-gray-400">Activos</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">{stats.averageLevel.toFixed(1)}</div>
            <div className="text-xs text-gray-400">Nivel Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">{stats.completedStations}</div>
            <div className="text-xs text-gray-400">Estaciones</div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Top Performer</div>
              <div className="text-xs text-gray-400">{stats.topPerformer.id}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-[#fdd742]">{stats.topPerformer.points} pts</div>
              <div className="text-xs text-gray-400">Nivel {stats.topPerformer.level}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando estadísticas...</p>
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
              {getRoleTitle()}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              {getRoleDescription()}
            </p>
          </div>

          {/* Toggle View Mode */}
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="flex justify-center">
              <div className="bg-white/10 rounded-xl p-1 flex">
                <button
                  onClick={() => setViewMode('countries')}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    viewMode === 'countries'
                      ? 'bg-[#fdd742] text-black font-semibold'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Por Países
                </button>
                <button
                  onClick={() => setViewMode('agencies')}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    viewMode === 'agencies'
                      ? 'bg-[#fdd742] text-black font-semibold'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Por Agencias
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {viewMode === 'countries' 
              ? countryStats.map(stats => renderStatsCard(stats, false))
              : agencyStats.map(stats => renderStatsCard(stats, true))
            }
          </div>

          {/* Summary Stats */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-[#fdd742] mb-6 text-center">
              Resumen General
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {viewMode === 'countries' 
                    ? countryStats.reduce((sum, s) => sum + s.totalUsers, 0)
                    : agencyStats.reduce((sum, s) => sum + s.totalUsers, 0)
                  }
                </div>
                <div className="text-sm text-gray-400">Total Usuarios</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {viewMode === 'countries' 
                    ? countryStats.reduce((sum, s) => sum + s.activeUsers, 0)
                    : agencyStats.reduce((sum, s) => sum + s.activeUsers, 0)
                  }
                </div>
                <div className="text-sm text-gray-400">Usuarios Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#fdd742]">
                  {viewMode === 'countries' 
                    ? countryStats.reduce((sum, s) => sum + s.totalPoints, 0).toLocaleString()
                    : agencyStats.reduce((sum, s) => sum + s.totalPoints, 0).toLocaleString()
                  }
                </div>
                <div className="text-sm text-gray-400">Puntos Totales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {viewMode === 'countries' 
                    ? (countryStats.reduce((sum, s) => sum + s.averageLevel, 0) / countryStats.length).toFixed(1)
                    : (agencyStats.reduce((sum, s) => sum + s.averageLevel, 0) / agencyStats.length).toFixed(1)
                  }
                </div>
                <div className="text-sm text-gray-400">Nivel Promedio</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
