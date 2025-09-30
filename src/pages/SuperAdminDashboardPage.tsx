import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface GlobalStats {
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  averageLevel: number;
  totalStations: number;
  countries: number;
  agencies: number;
  branches: number;
}

interface TopPerformer {
  id: string;
  email: string;
  points: number;
  level: number;
  country: string;
  agency: string;
  role: string;
}

interface CountrySummary {
  country: string;
  region: string;
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  topPerformer: string;
}

export default function SuperAdminDashboardPage() {
  const { currentUserRole } = useApp();
  const [loading, setLoading] = useState(true);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([]);
  const [countrySummaries, setCountrySummaries] = useState<CountrySummary[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Verificar cache
      const cachedGlobalStats = localStorage.getItem('globalStats');
      const cachedTopPerformers = localStorage.getItem('topPerformers');
      const cachedCountrySummaries = localStorage.getItem('countrySummaries');
      
      if (cachedGlobalStats && cachedTopPerformers && cachedCountrySummaries) {
        setGlobalStats(JSON.parse(cachedGlobalStats));
        setTopPerformers(JSON.parse(cachedTopPerformers));
        setCountrySummaries(JSON.parse(cachedCountrySummaries));
        setLoading(false);
        return;
      }

      // Cargar datos demo
      const demoGlobalStats: GlobalStats = {
        totalUsers: 158,
        activeUsers: 142,
        totalPoints: 1250000,
        averageLevel: 4.2,
        totalStations: 12,
        countries: 6,
        agencies: 12,
        branches: 24
      };

      const demoTopPerformers: TopPerformer[] = [
        {
          id: 'M001',
          email: 'ana.martinez@luismorenos.com',
          points: 1500,
          level: 6,
          country: 'Panamá',
          agency: 'Agencia Panamá Centro',
          role: 'mercaderista'
        },
        {
          id: 'M002',
          email: 'carlos.lopez@luismorenos.com',
          points: 1350,
          level: 5,
          country: 'Costa Rica',
          agency: 'Agencia Costa Rica',
          role: 'mercaderista'
        },
        {
          id: 'M003',
          email: 'maria.garcia@luismorenos.com',
          points: 1250,
          level: 5,
          country: 'Panamá',
          agency: 'Agencia Panamá Centro',
          role: 'mercaderista'
        },
        {
          id: 'M004',
          email: 'juan.perez@luismorenos.com',
          points: 1100,
          level: 4,
          country: 'Guatemala',
          agency: 'Agencia Guatemala',
          role: 'mercaderista'
        },
        {
          id: 'M005',
          email: 'sofia.rodriguez@luismorenos.com',
          points: 980,
          level: 4,
          country: 'Panamá',
          agency: 'Agencia Panamá Centro',
          role: 'mercaderista'
        }
      ];

      const demoCountrySummaries: CountrySummary[] = [
        {
          country: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 45,
          activeUsers: 38,
          totalPoints: 125000,
          topPerformer: 'M001'
        },
        {
          country: 'Costa Rica',
          region: 'Centroamérica',
          totalUsers: 32,
          activeUsers: 28,
          totalPoints: 89000,
          topPerformer: 'M002'
        },
        {
          country: 'Guatemala',
          region: 'Centroamérica',
          totalUsers: 28,
          activeUsers: 22,
          totalPoints: 67000,
          topPerformer: 'M004'
        },
        {
          country: 'El Salvador',
          region: 'Centroamérica',
          totalUsers: 20,
          activeUsers: 16,
          totalPoints: 45000,
          topPerformer: 'M006'
        },
        {
          country: 'Honduras',
          region: 'Centroamérica',
          totalUsers: 18,
          activeUsers: 14,
          totalPoints: 38000,
          topPerformer: 'M007'
        },
        {
          country: 'Nicaragua',
          region: 'Centroamérica',
          totalUsers: 15,
          activeUsers: 12,
          totalPoints: 30000,
          topPerformer: 'M008'
        }
      ];

      setGlobalStats(demoGlobalStats);
      setTopPerformers(demoTopPerformers);
      setCountrySummaries(demoCountrySummaries);

      // Guardar en cache
      localStorage.setItem('globalStats', JSON.stringify(demoGlobalStats));
      localStorage.setItem('topPerformers', JSON.stringify(demoTopPerformers));
      localStorage.setItem('countrySummaries', JSON.stringify(demoCountrySummaries));

      setLoading(false);
    } catch (error) {
      console.error('Error cargando dashboard global:', error);
      setLoading(false);
    }
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
          <p className="text-gray-400">Cargando dashboard global...</p>
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
              Dashboard Global
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Supervisa y gestiona todo el ecosistema Infinity Stores
            </p>
          </div>

          {/* Global Stats */}
          {globalStats && (
            <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold text-[#fdd742] mb-6 text-center">
                Resumen Global
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{globalStats.totalUsers}</div>
                  <div className="text-sm text-gray-400">Total Usuarios</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{globalStats.activeUsers}</div>
                  <div className="text-sm text-gray-400">Usuarios Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#fdd742]">{globalStats.totalPoints.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Puntos Totales</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{globalStats.averageLevel.toFixed(1)}</div>
                  <div className="text-sm text-gray-400">Nivel Promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{globalStats.countries}</div>
                  <div className="text-sm text-gray-400">Países</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">{globalStats.agencies}</div>
                  <div className="text-sm text-gray-400">Agencias</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{globalStats.branches}</div>
                  <div className="text-sm text-gray-400">Sucursales</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">{globalStats.totalStations}</div>
                  <div className="text-sm text-gray-400">Estaciones</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Performers */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-[#fdd742] mb-4">Top 5 Performers</h2>
              <div className="space-y-3">
                {topPerformers.map((performer, index) => (
                  <div key={performer.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#fdd742] rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{performer.id}</div>
                        <div className="text-xs text-gray-400">{performer.email}</div>
                        <div className="text-xs text-gray-500">{performer.country} • {performer.agency}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#fdd742]">{performer.points} pts</div>
                      <div className="text-xs text-blue-400">Nivel {performer.level}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(performer.role)}`}>
                        {getRoleLabel(performer.role)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Country Summary */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-[#fdd742] mb-4">Resumen por Países</h2>
              <div className="space-y-3">
                {countrySummaries.map((country) => (
                  <div key={country.country} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{country.country}</h3>
                      <span className="text-xs text-gray-400">{country.region}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">{country.totalUsers}</div>
                        <div className="text-xs text-gray-400">Usuarios</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-400">{country.activeUsers}</div>
                        <div className="text-xs text-gray-400">Activos</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#fdd742]">{country.totalPoints.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Puntos</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Top: {country.topPerformer}
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