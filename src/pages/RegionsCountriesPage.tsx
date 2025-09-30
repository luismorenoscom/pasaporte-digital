import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface Country {
  id: string;
  name: string;
  region: string;
  totalAgencies: number;
  totalBranches: number;
  totalPoints: number;
  totalUsers: number;
  activeUsers: number;
  activityPercentage: number;
  topPerformer: {
    id: string;
    email: string;
    points: number;
  };
}

interface Agency {
  id: string;
  name: string;
  region: string;
  country: string;
  city: string;
  totalMerchandisers: number;
  activeMerchandisers: number;
  totalPoints: number;
  averageLevel: number;
  status: 'activa' | 'inactiva';
  lastActivity: string;
}

interface Merchandiser {
  id: string;
  email: string;
  agency: string;
  branch: string;
  points: number;
  level: number;
  completedStations: number;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  joinDate: string;
}

export default function RegionsCountriesPage() {
  const { user } = useApp();
  const navigate = useNavigate();

  // Estados
  const [activeTab, setActiveTab] = useState<'countries' | 'agencies' | 'users'>('countries');
  const [countries, setCountries] = useState<Country[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [merchandisers, setMerchandisers] = useState<Merchandiser[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>('all');

  // Cargar datos
  useEffect(() => {
    loadData();
  }, [regionFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Simular carga de datos (se conectará con la API real)
      setTimeout(() => {
        // Datos demo para países
        const demoCountries: Country[] = [
          {
            id: 'c1',
            name: 'Panamá',
            region: 'Centroamérica',
            totalAgencies: 3,
            totalBranches: 8,
            totalPoints: 125000,
            totalUsers: 45,
            activeUsers: 38,
            activityPercentage: 84.4,
            topPerformer: {
              id: 'M001',
              email: 'ana.martinez@luismorenos.com',
              points: 1500
            }
          },
          {
            id: 'c2',
            name: 'Costa Rica',
            region: 'Centroamérica',
            totalAgencies: 2,
            totalBranches: 5,
            totalPoints: 89000,
            totalUsers: 32,
            activeUsers: 28,
            activityPercentage: 87.5,
            topPerformer: {
              id: 'M002',
              email: 'carlos.lopez@luismorenos.com',
              points: 1350
            }
          },
          {
            id: 'c3',
            name: 'Guatemala',
            region: 'Centroamérica',
            totalAgencies: 2,
            totalBranches: 4,
            totalPoints: 67000,
            totalUsers: 28,
            activeUsers: 22,
            activityPercentage: 78.6,
            topPerformer: {
              id: 'M004',
              email: 'juan.perez@luismorenos.com',
              points: 1100
            }
          },
          {
            id: 'c4',
            name: 'El Salvador',
            region: 'Centroamérica',
            totalAgencies: 1,
            totalBranches: 3,
            totalPoints: 45000,
            totalUsers: 20,
            activeUsers: 16,
            activityPercentage: 80.0,
            topPerformer: {
              id: 'M006',
              email: 'luis.torres@luismorenos.com',
              points: 850
            }
          },
          {
            id: 'c5',
            name: 'Honduras',
            region: 'Centroamérica',
            totalAgencies: 1,
            totalBranches: 2,
            totalPoints: 38000,
            totalUsers: 18,
            activeUsers: 15,
            activityPercentage: 83.3,
            topPerformer: {
              id: 'M007',
              email: 'carmen.silva@luismorenos.com',
              points: 720
            }
          },
          {
            id: 'c6',
            name: 'Nicaragua',
            region: 'Centroamérica',
            totalAgencies: 1,
            totalBranches: 2,
            totalPoints: 30000,
            totalUsers: 15,
            activeUsers: 12,
            activityPercentage: 80.0,
            topPerformer: {
              id: 'M008',
              email: 'diego.morales@luismorenos.com',
              points: 600
            }
          }
        ];

        // Datos demo para agencias
        const demoAgencies: Agency[] = [
          {
            id: 'a1',
            name: 'Agencia Panamá Centro',
            region: 'Centroamérica',
            country: 'Panamá',
            city: 'Ciudad de Panamá',
            totalMerchandisers: 25,
            activeMerchandisers: 22,
            totalPoints: 35000,
            averageLevel: 4.2,
            status: 'activa',
            lastActivity: 'Hace 2 horas'
          },
          {
            id: 'a2',
            name: 'Agencia Panamá Norte',
            region: 'Centroamérica',
            country: 'Panamá',
            city: 'Colón',
            totalMerchandisers: 15,
            activeMerchandisers: 12,
            totalPoints: 22000,
            averageLevel: 3.8,
            status: 'activa',
            lastActivity: 'Hace 4 horas'
          },
          {
            id: 'a3',
            name: 'Agencia Panamá Sur',
            region: 'Centroamérica',
            country: 'Panamá',
            city: 'David',
            totalMerchandisers: 10,
            activeMerchandisers: 8,
            totalPoints: 15000,
            averageLevel: 3.5,
            status: 'activa',
            lastActivity: 'Hace 6 horas'
          },
          {
            id: 'a4',
            name: 'Agencia Costa Rica',
            region: 'Centroamérica',
            country: 'Costa Rica',
            city: 'San José',
            totalMerchandisers: 18,
            activeMerchandisers: 16,
            totalPoints: 28000,
            averageLevel: 3.8,
            status: 'activa',
            lastActivity: 'Hace 4 horas'
          },
          {
            id: 'a5',
            name: 'Agencia Costa Rica Norte',
            region: 'Centroamérica',
            country: 'Costa Rica',
            city: 'Liberia',
            totalMerchandisers: 12,
            activeMerchandisers: 10,
            totalPoints: 18000,
            averageLevel: 3.6,
            status: 'activa',
            lastActivity: 'Hace 8 horas'
          },
          {
            id: 'a6',
            name: 'Agencia Guatemala',
            region: 'Centroamérica',
            country: 'Guatemala',
            city: 'Guatemala City',
            totalMerchandisers: 20,
            activeMerchandisers: 18,
            totalPoints: 32000,
            averageLevel: 4.1,
            status: 'activa',
            lastActivity: 'Hace 1 hora'
          },
          {
            id: 'a7',
            name: 'Agencia Guatemala Quetzaltenango',
            region: 'Centroamérica',
            country: 'Guatemala',
            city: 'Quetzaltenango',
            totalMerchandisers: 15,
            activeMerchandisers: 12,
            totalPoints: 24000,
            averageLevel: 3.9,
            status: 'activa',
            lastActivity: 'Hace 3 horas'
          }
        ];

        // Datos demo para mercaderistas
        const demoMerchandisers: Merchandiser[] = [
          {
            id: 'M001',
            email: 'ana.martinez@luismorenos.com',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Centro',
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
            branch: 'Sucursal Norte',
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
            branch: 'Sucursal Sur',
            points: 1250,
            level: 5,
            completedStations: 10,
            status: 'activo',
            lastActivity: 'Hace 2 horas',
            joinDate: '2024-01-20'
          },
          {
            id: 'M004',
            email: 'juan.perez@luismorenos.com',
            agency: 'Agencia Panamá Norte',
            branch: 'Sucursal Colón',
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
            agency: 'Agencia Panamá Sur',
            branch: 'Sucursal David',
            points: 950,
            level: 4,
            completedStations: 8,
            status: 'activo',
            lastActivity: 'Hace 1 día',
            joinDate: '2024-01-25'
          },
          {
            id: 'M006',
            email: 'luis.torres@luismorenos.com',
            agency: 'Agencia Costa Rica',
            branch: 'Sucursal San José',
            points: 850,
            level: 3,
            completedStations: 7,
            status: 'activo',
            lastActivity: 'Hace 2 días',
            joinDate: '2024-02-15'
          },
          {
            id: 'M007',
            email: 'carmen.silva@luismorenos.com',
            agency: 'Agencia Costa Rica Norte',
            branch: 'Sucursal Liberia',
            points: 720,
            level: 3,
            completedStations: 6,
            status: 'activo',
            lastActivity: 'Hace 4 días',
            joinDate: '2024-01-30'
          },
          {
            id: 'M008',
            email: 'diego.morales@luismorenos.com',
            agency: 'Agencia Guatemala',
            branch: 'Sucursal Guatemala City',
            points: 600,
            level: 3,
            completedStations: 5,
            status: 'activo',
            lastActivity: 'Hace 1 semana',
            joinDate: '2024-02-05'
          }
        ];

        setCountries(demoCountries);
        setAgencies(demoAgencies);
        setMerchandisers(demoMerchandisers);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error cargando datos:', error);
      setLoading(false);
    }
  };

  // Filtrar países
  const getFilteredCountries = () => {
    return countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'all' || country.region === regionFilter;
      
      return matchesSearch && matchesRegion;
    });
  };

  // Filtrar agencias por país seleccionado
  const getFilteredAgencies = () => {
    if (!selectedCountry) return [];
    return agencies.filter(agency => {
      const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agency.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = agency.country === selectedCountry.name;
      
      return matchesSearch && matchesCountry;
    });
  };

  // Filtrar mercaderistas por agencia seleccionada
  const getFilteredMerchandisers = () => {
    if (!selectedAgency) return [];
    return merchandisers.filter(m => {
      const matchesSearch = m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           m.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAgency = m.agency === selectedAgency.name;
      
      return matchesSearch && matchesAgency;
    });
  };

  const filteredCountries = getFilteredCountries();
  const filteredAgencies = getFilteredAgencies();
  const filteredMerchandisers = getFilteredMerchandisers();

  // Obtener opciones únicas para los filtros
  const regions = [...new Set(countries.map(c => c.region))];

  // Handlers de navegación
  const handleCountryClick = (country: Country) => {
    console.log('Country clicked:', country);
    setSelectedCountry(country);
    setActiveTab('agencies');
    setSearchTerm('');
  };

  const handleAgencyClick = (agency: Agency) => {
    console.log('Agency clicked:', agency);
    setSelectedAgency(agency);
    setActiveTab('users');
    setSearchTerm('');
  };

  const handleBackToCountries = () => {
    setSelectedCountry(null);
    setSelectedAgency(null);
    setActiveTab('countries');
    setSearchTerm('');
  };

  const handleBackToAgencies = () => {
    setSelectedAgency(null);
    setActiveTab('agencies');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen w-full text-white">
      <Header />
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]"
                style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Países, Regiones y Sucursales
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Gestiona y supervisa todas las ubicaciones del sistema
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Buscar</label>
                <input
                  type="text"
                  placeholder={
                    activeTab === 'countries' ? 'Nombre del país...' :
                    activeTab === 'agencies' ? 'Nombre de agencia o ciudad...' :
                    'ID o email...'
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all"
                />
              </div>

              {/* Filtro de región */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Región</label>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="all" className="bg-gray-800 text-white">Todas las Regiones</option>
                  {regions.map(region => (
                    <option key={region} value={region} className="bg-gray-800 text-white">{region}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contenido según el tab activo */}
          {activeTab === 'countries' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#fdd742]">Países</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                  <p className="text-gray-400">Cargando países...</p>
                </div>
              ) : filteredCountries.length === 0 ? (
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
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Agencias:</span>
                          <span className="text-white font-medium">{country.totalAgencies}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Sucursales:</span>
                          <span className="text-white font-medium">{country.totalBranches}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Puntos Totales:</span>
                          <span className="text-[#fdd742] font-bold">{country.totalPoints.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#fdd742]">{country.totalUsers}</div>
                          <div className="text-xs text-gray-400">Total Usuarios</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{country.activeUsers}</div>
                          <div className="text-xs text-gray-400">Activos</div>
                        </div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <div className="text-lg font-bold text-blue-400">{country.activityPercentage}%</div>
                        <div className="text-xs text-gray-400">Actividad</div>
                      </div>
                      
                      <div className="border-t border-white/10 pt-3">
                        <div className="text-xs text-gray-400 mb-1">Top Performer:</div>
                        <div className="text-sm text-white font-medium">{country.topPerformer.id}</div>
                        <div className="text-xs text-gray-400">{country.topPerformer.email}</div>
                        <div className="text-xs text-[#fdd742]">{country.topPerformer.points} pts</div>
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
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                  <p className="text-gray-400">Cargando agencias...</p>
                </div>
              ) : filteredAgencies.length === 0 ? (
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
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          agency.status === 'activa' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {agency.status === 'activa' ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-400">
                          <span className="font-medium">{agency.region}</span> • {agency.country}
                        </p>
                        <p className="text-sm text-gray-400">{agency.city}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#fdd742]">{agency.totalMerchandisers}</div>
                          <div className="text-xs text-gray-400">Total Mercaderistas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{agency.activeMerchandisers}</div>
                          <div className="text-xs text-gray-400">Activos</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{agency.totalPoints.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Puntos Totales</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-400">{agency.averageLevel}</div>
                          <div className="text-xs text-gray-400">Nivel Promedio</div>
                        </div>
                      </div>
                      
                      <div className="text-center">
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
                    {selectedAgency.region} • {selectedAgency.country} • {selectedAgency.city}
                  </p>
                </div>
                <button
                  onClick={handleBackToAgencies}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  ← Volver a Agencias
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                  <p className="text-gray-400">Cargando usuarios...</p>
                </div>
              ) : filteredMerchandisers.length === 0 ? (
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
                  {filteredMerchandisers.map((merchandiser) => (
                    <div key={merchandiser.id} className="bg-white/5 rounded-2xl border border-white/10 p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{merchandiser.id}</h3>
                          <p className="text-sm text-gray-400">{merchandiser.email}</p>
                          <p className="text-xs text-gray-500">{merchandiser.branch}</p>
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
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          merchandiser.status === 'activo' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {merchandiser.status === 'activo' ? 'Activo' : 'Inactivo'}
                        </span>
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
