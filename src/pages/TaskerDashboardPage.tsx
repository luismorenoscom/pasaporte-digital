import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface Country {
  id: string;
  name: string;
  region: string;
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  agencies: number;
  branches: number;
  topPerformer: {
    id: string;
    email: string;
    points: number;
  };
}

interface Agency {
  id: string;
  name: string;
  country: string;
  region: string;
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  branches: number;
  topPerformer: {
    id: string;
    email: string;
    points: number;
  };
}

interface User {
  id: string;
  email: string;
  agency: string;
  branch: string;
  country: string;
  region: string;
  points: number;
  level: number;
  completedStations: number;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  joinDate: string;
}

export default function TaskerDashboardPage() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'countries' | 'agencies' | 'users'>('countries');
  const [countries, setCountries] = useState<Country[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLocationData();
  }, []);

  const loadLocationData = async () => {
    setLoading(true);
    try {
      // Verificar cache
      const cachedCountries = localStorage.getItem('globalCountries');
      const cachedAgencies = localStorage.getItem('globalAgencies');
      const cachedUsers = localStorage.getItem('globalUsers');
      
      if (cachedCountries && cachedAgencies && cachedUsers) {
        setCountries(JSON.parse(cachedCountries));
        setAgencies(JSON.parse(cachedAgencies));
        setUsers(JSON.parse(cachedUsers));
        setLoading(false);
        return;
      }

      // Cargar datos demo
      const demoCountries: Country[] = [
        {
          id: 'PA',
          name: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 45,
          activeUsers: 38,
          totalPoints: 125000,
          agencies: 3,
          branches: 8,
          topPerformer: {
            id: 'M001',
            email: 'ana.martinez@luismorenos.com',
            points: 1500
          }
        },
        {
          id: 'CR',
          name: 'Costa Rica',
          region: 'Centroamérica',
          totalUsers: 32,
          activeUsers: 28,
          totalPoints: 89000,
          agencies: 2,
          branches: 5,
          topPerformer: {
            id: 'M002',
            email: 'carlos.lopez@luismorenos.com',
            points: 1350
          }
        },
        {
          id: 'GT',
          name: 'Guatemala',
          region: 'Centroamérica',
          totalUsers: 28,
          activeUsers: 22,
          totalPoints: 67000,
          agencies: 2,
          branches: 4,
          topPerformer: {
            id: 'M004',
            email: 'juan.perez@luismorenos.com',
            points: 1100
          }
        },
        {
          id: 'SV',
          name: 'El Salvador',
          region: 'Centroamérica',
          totalUsers: 20,
          activeUsers: 16,
          totalPoints: 45000,
          agencies: 1,
          branches: 3,
          topPerformer: {
            id: 'M006',
            email: 'luis.torres@luismorenos.com',
            points: 850
          }
        },
        {
          id: 'HN',
          name: 'Honduras',
          region: 'Centroamérica',
          totalUsers: 18,
          activeUsers: 14,
          totalPoints: 38000,
          agencies: 1,
          branches: 2,
          topPerformer: {
            id: 'M007',
            email: 'carmen.silva@luismorenos.com',
            points: 720
          }
        },
        {
          id: 'NI',
          name: 'Nicaragua',
          region: 'Centroamérica',
          totalUsers: 15,
          activeUsers: 12,
          totalPoints: 30000,
          agencies: 1,
          branches: 2,
          topPerformer: {
            id: 'M008',
            email: 'diego.morales@luismorenos.com',
            points: 600
          }
        }
      ];

      const demoAgencies: Agency[] = [
        {
          id: 'AG001',
          name: 'Agencia Panamá Centro',
          country: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 25,
          activeUsers: 22,
          totalPoints: 75000,
          branches: 4,
          topPerformer: {
            id: 'M001',
            email: 'ana.martinez@luismorenos.com',
            points: 1500
          }
        },
        {
          id: 'AG002',
          name: 'Agencia Panamá Norte',
          country: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 12,
          activeUsers: 10,
          totalPoints: 35000,
          branches: 2,
          topPerformer: {
            id: 'M003',
            email: 'maria.garcia@luismorenos.com',
            points: 1250
          }
        },
        {
          id: 'AG003',
          name: 'Agencia Costa Rica',
          country: 'Costa Rica',
          region: 'Centroamérica',
          totalUsers: 20,
          activeUsers: 18,
          totalPoints: 55000,
          branches: 3,
          topPerformer: {
            id: 'M002',
            email: 'carlos.lopez@luismorenos.com',
            points: 1350
          }
        },
        {
          id: 'AG004',
          name: 'Agencia Guatemala',
          country: 'Guatemala',
          region: 'Centroamérica',
          totalUsers: 18,
          activeUsers: 15,
          totalPoints: 45000,
          branches: 2,
          topPerformer: {
            id: 'M004',
            email: 'juan.perez@luismorenos.com',
            points: 1100
          }
        },
        {
          id: 'AG005',
          name: 'Agencia El Salvador',
          country: 'El Salvador',
          region: 'Centroamérica',
          totalUsers: 15,
          activeUsers: 12,
          totalPoints: 35000,
          branches: 2,
          topPerformer: {
            id: 'M006',
            email: 'luis.torres@luismorenos.com',
            points: 850
          }
        },
        {
          id: 'AG006',
          name: 'Agencia Honduras',
          country: 'Honduras',
          region: 'Centroamérica',
          totalUsers: 12,
          activeUsers: 10,
          totalPoints: 28000,
          branches: 2,
          topPerformer: {
            id: 'M007',
            email: 'carmen.silva@luismorenos.com',
            points: 720
          }
        },
        {
          id: 'AG007',
          name: 'Agencia Nicaragua',
          country: 'Nicaragua',
          region: 'Centroamérica',
          totalUsers: 10,
          activeUsers: 8,
          totalPoints: 20000,
          branches: 1,
          topPerformer: {
            id: 'M008',
            email: 'diego.morales@luismorenos.com',
            points: 600
          }
        }
      ];

      const demoUsers: User[] = [
        // Panamá - Agencia Panamá Centro
        {
          id: 'M001',
          email: 'ana.martinez@luismorenos.com',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Centro',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 1500,
          level: 6,
          completedStations: 12,
          status: 'activo',
          lastActivity: 'Hace 5 horas',
          joinDate: '2024-01-15'
        },
        {
          id: 'M002',
          email: 'carlos.lopez@luismorenos.com',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Centro',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 1350,
          level: 5,
          completedStations: 11,
          status: 'activo',
          lastActivity: 'Hace 4 horas',
          joinDate: '2024-02-01'
        },
        {
          id: 'M003',
          email: 'maria.garcia@luismorenos.com',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Norte',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 1250,
          level: 5,
          completedStations: 10,
          status: 'activo',
          lastActivity: 'Hace 2 horas',
          joinDate: '2024-01-20'
        },
        // Costa Rica
        {
          id: 'M004',
          email: 'juan.perez@luismorenos.com',
          agency: 'Agencia Costa Rica',
          branch: 'Sucursal San José',
          country: 'Costa Rica',
          region: 'Centroamérica',
          points: 1100,
          level: 4,
          completedStations: 9,
          status: 'activo',
          lastActivity: 'Hace 3 horas',
          joinDate: '2024-02-10'
        },
        {
          id: 'M005',
          email: 'sofia.rodriguez@luismorenos.com',
          agency: 'Agencia Costa Rica',
          branch: 'Sucursal Cartago',
          country: 'Costa Rica',
          region: 'Centroamérica',
          points: 950,
          level: 4,
          completedStations: 8,
          status: 'activo',
          lastActivity: 'Hace 1 día',
          joinDate: '2024-01-25'
        },
        // Guatemala
        {
          id: 'M006',
          email: 'luis.torres@luismorenos.com',
          agency: 'Agencia Guatemala',
          branch: 'Sucursal Centro',
          country: 'Guatemala',
          region: 'Centroamérica',
          points: 850,
          level: 3,
          completedStations: 7,
          status: 'activo',
          lastActivity: 'Hace 2 días',
          joinDate: '2024-02-15'
        },
        // El Salvador
        {
          id: 'M007',
          email: 'carmen.silva@luismorenos.com',
          agency: 'Agencia El Salvador',
          branch: 'Sucursal San Salvador',
          country: 'El Salvador',
          region: 'Centroamérica',
          points: 720,
          level: 3,
          completedStations: 6,
          status: 'activo',
          lastActivity: 'Hace 4 días',
          joinDate: '2024-01-30'
        },
        // Honduras
        {
          id: 'M008',
          email: 'diego.morales@luismorenos.com',
          agency: 'Agencia Honduras',
          branch: 'Sucursal Tegucigalpa',
          country: 'Honduras',
          region: 'Centroamérica',
          points: 600,
          level: 3,
          completedStations: 5,
          status: 'activo',
          lastActivity: 'Hace 1 semana',
          joinDate: '2024-02-05'
        },
        // Nicaragua
        {
          id: 'M009',
          email: 'valeria.ortiz@luismorenos.com',
          agency: 'Agencia Nicaragua',
          branch: 'Sucursal Managua',
          country: 'Nicaragua',
          region: 'Centroamérica',
          points: 500,
          level: 2,
          completedStations: 4,
          status: 'activo',
          lastActivity: 'Hace 1 semana',
          joinDate: '2024-02-08'
        }
      ];

      setCountries(demoCountries);
      setAgencies(demoAgencies);
      setUsers(demoUsers);

      // Guardar en cache
      localStorage.setItem('globalCountries', JSON.stringify(demoCountries));
      localStorage.setItem('globalAgencies', JSON.stringify(demoAgencies));
      localStorage.setItem('globalUsers', JSON.stringify(demoUsers));

      setLoading(false);
    } catch (error) {
      console.error('Error cargando datos de ubicaciones:', error);
      setLoading(false);
    }
  };

  // Funciones de filtrado
  const getFilteredCountries = () => {
    return countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  const getFilteredAgencies = () => {
    if (!selectedCountry) return [];
    return agencies.filter(agency => {
      const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = agency.country === selectedCountry.name;
      return matchesSearch && matchesCountry;
    });
  };

  const getFilteredUsers = () => {
    if (!selectedAgency) return [];
    return users.filter(user => {
      const matchesSearch = user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAgency = user.agency === selectedAgency.name;
      const matchesBranch = !selectedBranch || user.branch === selectedBranch;
      
      return matchesSearch && matchesAgency && matchesBranch;
    });
  };

  const filteredCountries = getFilteredCountries();
  const filteredAgencies = getFilteredAgencies();
  const filteredUsers = getFilteredUsers();

  // Handlers de navegación
  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setActiveTab('agencies');
    setSearchTerm('');
  };

  const handleAgencyClick = (agency: Agency) => {
    setSelectedAgency(agency);
    setSelectedBranch(null);
    setActiveTab('users');
    setSearchTerm('');
  };

  const handleBackToCountries = () => {
    setSelectedCountry(null);
    setSelectedAgency(null);
    setSelectedBranch(null);
    setActiveTab('countries');
    setSearchTerm('');
  };

  const handleBackToAgencies = () => {
    setSelectedAgency(null);
    setSelectedBranch(null);
    setActiveTab('agencies');
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando dashboard...</p>
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
              Dashboard Tasker
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Supervisa el rendimiento de los mercaderistas de tu sucursal
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8 flex justify-center space-x-4">
            <button
              onClick={() => handleBackToCountries()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'countries' ? 'bg-[#fdd742] text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Países
            </button>
            <button
              onClick={() => selectedCountry && setActiveTab('agencies')}
              disabled={!selectedCountry}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'agencies' ? 'bg-[#fdd742] text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              } ${!selectedCountry ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Agencias
            </button>
            <button
              onClick={() => selectedAgency && setActiveTab('users')}
              disabled={!selectedAgency}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'users' ? 'bg-[#fdd742] text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              } ${!selectedAgency ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Usuarios
            </button>
          </div>

          {/* Filtros */}
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="w-full">
              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Buscar</label>
                <input
                  type="text"
                  placeholder={
                    activeTab === 'countries' ? 'Nombre del país...' :
                    activeTab === 'agencies' ? 'Nombre de agencia...' :
                    'ID o email...'
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Contenido según el tab activo */}
          {activeTab === 'countries' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#fdd742]">Países</h2>
              
              {filteredCountries.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No hay países</h3>
                  <p className="text-gray-400">Ajusta los filtros para ver más resultados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCountries.map((country) => (
                    <div
                      key={country.id}
                      onClick={() => handleCountryClick(country)}
                      className="bg-white/5 rounded-2xl border border-white/10 p-6 cursor-pointer hover:bg-white/10 hover:border-[#fdd742]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white text-lg">{country.name}</h3>
                        <span className="text-sm text-gray-400">{country.region}</span>
                      </div>
                      
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-[#fdd742] mb-1">{country.totalPoints.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Puntos Totales</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">{country.agencies}</div>
                          <div className="text-xs text-gray-400">Agencias</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">{country.branches}</div>
                          <div className="text-xs text-gray-400">Sucursales</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-400">{country.activeUsers}</div>
                          <div className="text-xs text-gray-400">Activos</div>
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <button className="px-4 py-2 bg-[#fdd742] text-black rounded-lg hover:bg-[#fdd742]/80 transition-colors text-sm font-medium group-hover:scale-105 transform">
                          Ver Agencias →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'agencies' && selectedCountry && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#fdd742] mb-2">
                    Agencias de {selectedCountry.name}
                  </h2>
                  <p className="text-gray-400">
                    {selectedCountry.region} • {filteredAgencies.length} agencias
                  </p>
                </div>
                <button
                  onClick={handleBackToCountries}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  ← Volver a Países
                </button>
              </div>
              
              {filteredAgencies.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No hay agencias</h3>
                  <p className="text-gray-400">Ajusta los filtros para ver más resultados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAgencies.map((agency) => (
                    <div
                      key={agency.id}
                      onClick={() => handleAgencyClick(agency)}
                      className="bg-white/5 rounded-2xl border border-white/10 p-6 cursor-pointer hover:bg-white/10 hover:border-[#fdd742]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white text-lg">{agency.name}</h3>
                        <span className="text-sm text-gray-400">{agency.country}</span>
                      </div>
                      
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-[#fdd742] mb-1">{agency.totalPoints.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Puntos Totales</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">{agency.totalUsers}</div>
                          <div className="text-xs text-gray-400">Usuarios</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-400">{agency.activeUsers}</div>
                          <div className="text-xs text-gray-400">Activos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-400">{agency.branches}</div>
                          <div className="text-xs text-gray-400">Sucursales</div>
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <button className="px-4 py-2 bg-[#fdd742] text-black rounded-lg hover:bg-[#fdd742]/80 transition-colors text-sm font-medium group-hover:scale-105 transform">
                          Ver Usuarios →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && selectedAgency && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#fdd742] mb-2">
                    Usuarios de {selectedAgency.name}
                  </h2>
                  <p className="text-gray-400">
                    {selectedAgency.region} • {selectedAgency.country} • {filteredUsers.length} usuarios
                  </p>
                </div>
                <button
                  onClick={handleBackToAgencies}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  ← Volver a Agencias
                </button>
              </div>
              
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No hay usuarios</h3>
                  <p className="text-gray-400">Ajusta los filtros para ver más resultados.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-[#fdd742] rounded-full flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
                            {user.id}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{user.id}</h3>
                            <p className="text-sm text-gray-400">{user.email}</p>
                            <p className="text-xs text-gray-500">{user.branch} • {user.country}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-xl font-bold text-[#fdd742]">{user.points.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Puntos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-400">Nivel {user.level}</div>
                            <div className="text-xs text-gray-400">{user.completedStations} estaciones</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-300">{user.lastActivity}</div>
                            <div className="text-xs text-gray-400">Última actividad</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'activo' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {user.status === 'activo' ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}