import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";
import PassportCanvas from "../features/pasaporte/components/PassportCanvas";
import { STATIONS } from "../features/pasaporte/data.stations";

interface TeamMember {
  id: string;
  email: string;
  region: string;
  country: string;
  agency: string;
  branch: string;
  points: number;
  level: number;
  completedStationIds: string[];
  status: 'activo' | 'inactivo';
  lastActivity: string;
}

export default function TeamPassportPage() {
  const { user } = useApp();
  const navigate = useNavigate();

  // Estados para el equipo
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [agencyFilter, setAgencyFilter] = useState<string>('all');

  // Cargar datos del equipo
  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    setLoading(true);
    try {
      // Simular carga de datos (se conectará con la API real)
      setTimeout(() => {
        // Datos demo para el equipo
        const demoTeam: TeamMember[] = [
          {
            id: 'M001',
            email: 'ana.martinez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Centro',
            points: 1500,
            level: 6,
            completedStationIds: ['reactor', 'stark', 'jarvis', 'ironmonger', 'extremis', 'ironlegion'],
            status: 'activo',
            lastActivity: 'Hace 5 horas'
          },
          {
            id: 'M002',
            email: 'carlos.lopez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Costa Rica',
            agency: 'Agencia Costa Rica',
            branch: 'Sucursal San José',
            points: 1350,
            level: 5,
            completedStationIds: ['reactor', 'stark', 'jarvis', 'ironmonger', 'extremis'],
            status: 'activo',
            lastActivity: 'Hace 4 horas'
          },
          {
            id: 'M003',
            email: 'maria.garcia@luismorenos.com',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Norte',
            points: 1250,
            level: 5,
            completedStationIds: ['reactor', 'stark', 'jarvis', 'ironmonger', 'extremis'],
            status: 'activo',
            lastActivity: 'Hace 2 horas'
          },
          {
            id: 'M004',
            email: 'juan.perez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Guatemala',
            agency: 'Agencia Guatemala',
            branch: 'Sucursal Centro',
            points: 1100,
            level: 4,
            completedStationIds: ['reactor', 'stark', 'jarvis', 'ironmonger'],
            status: 'activo',
            lastActivity: 'Hace 3 horas'
          },
          {
            id: 'M005',
            email: 'sofia.rodriguez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Sur',
            points: 980,
            level: 4,
            completedStationIds: ['reactor', 'stark', 'jarvis'],
            status: 'activo',
            lastActivity: 'Hace 1 día'
          },
          {
            id: 'M006',
            email: 'luis.torres@luismorenos.com',
            region: 'Centroamérica',
            country: 'El Salvador',
            agency: 'Agencia El Salvador',
            branch: 'Sucursal San Salvador',
            points: 850,
            level: 3,
            completedStationIds: ['reactor', 'stark'],
            status: 'activo',
            lastActivity: 'Hace 2 días'
          },
          {
            id: 'M007',
            email: 'carmen.silva@luismorenos.com',
            region: 'Centroamérica',
            country: 'Honduras',
            agency: 'Agencia Honduras',
            branch: 'Sucursal Tegucigalpa',
            points: 720,
            level: 3,
            completedStationIds: ['reactor'],
            status: 'inactivo',
            lastActivity: 'Hace 3 días'
          },
          {
            id: 'm8',
            // name: 'Pedro Sánchez',
            email: 'pedro.sanchez@luismorenos.com',
            region: 'Centroamérica',
            country: 'Nicaragua',
            agency: 'Agencia Nicaragua',
            branch: 'Sucursal Managua',
            points: 600,
            level: 3,
            completedStationIds: [],
            status: 'activo',
            lastActivity: 'Hace 1 semana'
          }
        ];
        setTeamMembers(demoTeam);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error cargando equipo:', error);
      setLoading(false);
    }
  };

  // Obtener opciones únicas para los filtros con lógica en cascada
  const getAvailableRegions = () => {
    return [...new Set(teamMembers.map(m => m.region))];
  };

  const getAvailableCountries = () => {
    if (regionFilter === 'all') {
      return [...new Set(teamMembers.map(m => m.country))];
    }
    return [...new Set(teamMembers.filter(m => m.region === regionFilter).map(m => m.country))];
  };

  const getAvailableAgencies = () => {
    let filteredMembers = teamMembers;
    
    if (regionFilter !== 'all') {
      filteredMembers = filteredMembers.filter(m => m.region === regionFilter);
    }
    
    if (countryFilter !== 'all') {
      filteredMembers = filteredMembers.filter(m => m.country === countryFilter);
    }
    
    return [...new Set(filteredMembers.map(m => m.agency))];
  };

  // Filtrar miembros del equipo
  const getFilteredTeamMembers = () => {
    return teamMembers.filter(member => {
      const matchesSearch = member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'all' || member.region === regionFilter;
      const matchesCountry = countryFilter === 'all' || member.country === countryFilter;
      const matchesAgency = agencyFilter === 'all' || member.agency === agencyFilter;
      
      return matchesSearch && matchesRegion && matchesCountry && matchesAgency;
    });
  };

  const filteredTeamMembers = getFilteredTeamMembers();

  // Resetear filtros dependientes cuando cambia el filtro padre
  const handleRegionChange = (newRegion: string) => {
    setRegionFilter(newRegion);
    setCountryFilter('all');
    setAgencyFilter('all');
  };

  const handleCountryChange = (newCountry: string) => {
    setCountryFilter(newCountry);
    setAgencyFilter('all');
  };

  const handleStationClick = (station: any) => {
    // Aquí se podría abrir un modal con detalles de la estación
    console.log('Estación clickeada:', station);
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
              Pasaporte del Equipo
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Visualiza los pasaportes digitales de todos los mercaderistas del equipo
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Buscar</label>
                <input
                  type="text"
                  placeholder="ID o email..."
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
                  onChange={(e) => handleRegionChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="all" className="bg-gray-800 text-white">Todas las Regiones</option>
                  {getAvailableRegions().map(region => (
                    <option key={region} value={region} className="bg-gray-800 text-white">{region}</option>
                  ))}
                </select>
              </div>

              {/* Filtro de país */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">País</label>
                <select
                  value={countryFilter}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  disabled={regionFilter === 'all' && teamMembers.length > 0}
                  className={`w-full px-4 py-3 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all ${
                    regionFilter === 'all' && teamMembers.length > 0
                      ? 'bg-white/5 border-white/10 text-gray-400 cursor-not-allowed'
                      : 'bg-white/10 border-white/20'
                  }`}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="all" className="bg-gray-800 text-white">Todos los Países</option>
                  {getAvailableCountries().map(country => (
                    <option key={country} value={country} className="bg-gray-800 text-white">{country}</option>
                  ))}
                </select>
              </div>

              {/* Filtro de agencia */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Agencia</label>
                <select
                  value={agencyFilter}
                  onChange={(e) => setAgencyFilter(e.target.value)}
                  disabled={countryFilter === 'all' && teamMembers.length > 0}
                  className={`w-full px-4 py-3 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all ${
                    countryFilter === 'all' && teamMembers.length > 0
                      ? 'bg-white/5 border-white/10 text-gray-400 cursor-not-allowed'
                      : 'bg-white/10 border-white/20'
                  }`}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="all" className="bg-gray-800 text-white">Todas las Agencias</option>
                  {getAvailableAgencies().map(agency => (
                    <option key={agency} value={agency} className="bg-gray-800 text-white">{agency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Selector de miembro del equipo */}
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4 text-[#fdd742]">Seleccionar Mercaderista</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                <p className="text-gray-400">Cargando equipo...</p>
              </div>
            ) : filteredTeamMembers.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No hay miembros</h3>
                <p className="text-gray-400">Ajusta los filtros para ver más resultados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTeamMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedMember?.id === member.id
                        ? 'bg-[#fdd742]/20 border-[#fdd742]/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{member.id}</h3>
                        <p className="text-sm text-gray-400 truncate">{member.email}</p>
                        <p className="text-xs text-gray-500 truncate">{member.region} • {member.country}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs font-bold text-[#fdd742]">{member.points} pts</span>
                          <span className="text-xs text-blue-400">Nivel {member.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pasaporte digital en ancho completo */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            {selectedMember ? (
              <div>
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold mb-2 text-[#fdd742]">
                    Pasaporte de {selectedMember.id}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {selectedMember.region} • {selectedMember.country} • {selectedMember.agency}
                  </p>
                  <div className="flex justify-center items-center space-x-6">
                    <span className="text-sm text-gray-300">
                      <span className="font-semibold text-[#fdd742]">{selectedMember.points}</span> puntos
                    </span>
                    <span className="text-sm text-gray-300">
                      Nivel <span className="font-semibold text-blue-400">{selectedMember.level}</span>
                    </span>
                    <span className="text-sm text-gray-300">
                      <span className="font-semibold text-green-400">{selectedMember.completedStationIds.length}</span> estaciones
                    </span>
                  </div>
                </div>
                
                <div className="relative w-full">
                  <PassportCanvas
                    stations={STATIONS}
                    userPoints={selectedMember.points}
                    completedStationIds={selectedMember.completedStationIds}
                    onStationClick={handleStationClick}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Selecciona un miembro del equipo</h3>
                <p className="text-gray-400">Elige un mercaderista de la lista para ver su pasaporte digital</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
