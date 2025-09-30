import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface User {
  id: string;
  email: string;
  role: 'mercaderista' | 'supervisor' | 'tasker' | 'admin_agencia' | 'super_admin';
  region: string;
  country: string;
  agency: string;
  branch: string;
  points: number;
  level: number;
  completedStations: number;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  joinDate: string;
}

export default function AllUsersPage() {
  const { currentUserRole } = useApp();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Verificar si ya tenemos datos en cache
      const cachedUsers = localStorage.getItem('allUsers');
      
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
        setLoading(false);
        return;
      }

      // Cargar datos inmediatamente sin delay
        // Datos demo para todos los usuarios
        const demoUsers: User[] = [
          // Mercaderistas
          {
            id: 'M001',
            email: 'ana.martinez@luismorenos.com',
            role: 'mercaderista',
            region: 'Centroamérica',
            country: 'Panamá',
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
            role: 'mercaderista',
            region: 'Centroamérica',
            country: 'Costa Rica',
            agency: 'Agencia Costa Rica',
            branch: 'Sucursal San José',
            points: 1350,
            level: 5,
            completedStations: 11,
            status: 'activo',
            lastActivity: 'Hace 4 horas',
            joinDate: '2024-01-20'
          },
          {
            id: 'M003',
            email: 'maria.garcia@luismorenos.com',
            role: 'mercaderista',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Norte',
            points: 1250,
            level: 5,
            completedStations: 10,
            status: 'activo',
            lastActivity: 'Hace 2 horas',
            joinDate: '2024-02-01'
          },
          {
            id: 'M004',
            email: 'juan.perez@luismorenos.com',
            role: 'mercaderista',
            region: 'Centroamérica',
            country: 'Guatemala',
            agency: 'Agencia Guatemala',
            branch: 'Sucursal Centro',
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
            role: 'mercaderista',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Sur',
            points: 980,
            level: 4,
            completedStations: 8,
            status: 'activo',
            lastActivity: 'Hace 1 día',
            joinDate: '2024-02-15'
          },
          // Supervisores
          {
            id: 'S001',
            email: 'carlos.mendoza@luismorenos.com',
            role: 'supervisor',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Centro',
            points: 0,
            level: 1,
            completedStations: 0,
            status: 'activo',
            lastActivity: 'Hace 2 horas',
            joinDate: '2024-01-01'
          },
          {
            id: 'S002',
            email: 'ana.garcia@luismorenos.com',
            role: 'supervisor',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Norte',
            points: 0,
            level: 1,
            completedStations: 0,
            status: 'activo',
            lastActivity: 'Hace 1 día',
            joinDate: '2024-01-05'
          },
          {
            id: 'S003',
            email: 'luis.rodriguez@luismorenos.com',
            role: 'supervisor',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Sur',
            points: 0,
            level: 1,
            completedStations: 0,
            status: 'inactivo',
            lastActivity: 'Hace 3 días',
            joinDate: '2024-01-10'
          },
          // Taskers
          {
            id: 'T001',
            email: 'maria.lopez@luismorenos.com',
            role: 'tasker',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Centro',
            points: 0,
            level: 1,
            completedStations: 0,
            status: 'activo',
            lastActivity: 'Hace 1 hora',
            joinDate: '2024-01-20'
          },
          {
            id: 'T002',
            email: 'pedro.sanchez@luismorenos.com',
            role: 'tasker',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Norte',
            points: 0,
            level: 1,
            completedStations: 0,
            status: 'activo',
            lastActivity: 'Hace 4 horas',
            joinDate: '2024-02-25'
          },
          {
            id: 'T003',
            email: 'sofia.martinez@luismorenos.com',
            role: 'tasker',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sucursal Sur',
            points: 0,
            level: 1,
            completedStations: 0,
            status: 'activo',
            lastActivity: 'Hace 2 días',
            joinDate: '2024-01-12'
          },
          // Admin Agencia
          {
            id: 'A001',
            email: 'adminagencia@luismorenos.com',
            role: 'admin_agencia',
            region: 'Centroamérica',
            country: 'Panamá',
            agency: 'Agencia Panamá Centro',
            branch: 'Sede Principal',
            points: 0,
            level: 1,
            completedStations: 0,
            status: 'activo',
            lastActivity: 'Hace 30 minutos',
            joinDate: '2024-01-01'
          },
          // Super Admin
          {
            id: 'SA001',
            email: 'superadmininfinity@luismorenos.com',
            role: 'super_admin',
            region: 'Global',
            country: 'Global',
            agency: 'Infinity Stores',
            branch: 'Sede Global',
            points: 0,
            level: 1,
            completedStations: 0,
            status: 'activo',
            lastActivity: 'Hace 10 minutos',
            joinDate: '2024-01-01'
          }
        ];

        setUsers(demoUsers);
        
        // Guardar en cache
        localStorage.setItem('allUsers', JSON.stringify(demoUsers));
        
        setLoading(false);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      setLoading(false);
    }
  };

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || user.country === selectedCountry;
    const matchesAgency = selectedAgency === 'all' || user.agency === selectedAgency;
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesCountry && matchesAgency && matchesRole;
  });

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Obtener opciones únicas con lógica en cascada
  const countries = Array.from(new Set(users.map(u => u.country)));
  
  const getAvailableAgencies = () => {
    if (selectedCountry === 'all') {
      return Array.from(new Set(users.map(u => u.agency)));
    }
    return Array.from(new Set(users.filter(u => u.country === selectedCountry).map(u => u.agency)));
  };

  const agencies = getAvailableAgencies();
  const roles = Array.from(new Set(users.map(u => u.role)));

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
          <p className="text-gray-400">Cargando usuarios...</p>
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
              Todos los Usuarios
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Gestiona y supervisa todos los usuarios registrados en el sistema
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
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
                  disabled={selectedCountry === 'all' && users.length > 0}
                  className={`w-full px-4 py-3 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all ${
                    selectedCountry === 'all' && users.length > 0
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

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rol</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="all" className="bg-gray-800 text-white">Todos los Roles</option>
                  {roles.map(role => (
                    <option key={role} value={role} className="bg-gray-800 text-white">{getRoleLabel(role)}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Users List */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            {currentUsers.length === 0 ? (
              <div className="text-center py-12">
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
                {currentUsers.map((user) => (
                  <div key={user.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{user.id}</h3>
                          <p className="text-sm text-gray-400">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.region} • {user.country} • {user.agency}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm font-bold text-[#fdd742]">{user.points}</div>
                          <div className="text-xs text-gray-400">Puntos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-blue-400">Nivel {user.level}</div>
                          <div className="text-xs text-gray-400">{user.completedStations} estaciones</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-300">{user.lastActivity}</div>
                          <div className="text-xs text-gray-400">Última actividad</div>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            {getRoleLabel(user.role)}
                          </span>
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
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all"
                  >
                    Anterior
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-all ${
                        currentPage === page
                          ? 'bg-[#fdd742] text-black font-semibold'
                          : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
