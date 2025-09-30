import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface Merchandiser {
  id: string;
  email: string;
  branch: string;
  country: string;
  supervisor: string;
  tasker: string;
  points: number;
  level: number;
  completedStations: number;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  joinDate: string;
}

export default function AgencyMerchandisersPage() {
  const { user } = useApp();
  const [merchandisers, setMerchandisers] = useState<Merchandiser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Cargar datos
  useEffect(() => {
    setTimeout(() => {
      const demoMerchandisers: Merchandiser[] = [
        { id: 'M001', email: 'juan.perez@luismorenos.com', branch: 'Sucursal Centro', country: 'Panamá', supervisor: 'S001', tasker: 'T001', points: 1250, level: 5, completedStations: 10, status: 'activo', lastActivity: 'Hace 2 horas', joinDate: '2024-01-15' },
        { id: 'M002', email: 'maria.garcia@luismorenos.com', branch: 'Sucursal Norte', country: 'Panamá', supervisor: 'S002', tasker: 'T002', points: 980, level: 4, completedStations: 8, status: 'activo', lastActivity: 'Hace 1 día', joinDate: '2024-02-20' },
        { id: 'M003', email: 'carlos.lopez@luismorenos.com', branch: 'Sucursal Sur', country: 'Panamá', supervisor: 'S003', tasker: 'T003', points: 720, level: 3, completedStations: 6, status: 'inactivo', lastActivity: 'Hace 3 días', joinDate: '2024-01-10' },
        { id: 'M004', email: 'ana.martinez@luismorenos.com', branch: 'Sucursal Este', country: 'Panamá', supervisor: 'María Fernández', tasker: 'Carlos Ruiz', points: 1500, level: 6, completedStations: 12, status: 'activo', lastActivity: 'Hace 5 horas', joinDate: '2024-03-05' },
        { id: 'M005', email: 'pedro.sanchez@luismorenos.com', branch: 'Sucursal Oeste', country: 'Panamá', supervisor: 'Pedro Silva', tasker: 'Ana Torres', points: 600, level: 3, completedStations: 5, status: 'activo', lastActivity: 'Hace 1 semana', joinDate: '2024-02-28' },
        { id: 'M006', email: 'sofia.rodriguez@luismorenos.com', branch: 'Sucursal Centro', country: 'Panamá', supervisor: 'Carlos Mendoza', tasker: 'María López', points: 1100, level: 4, completedStations: 9, status: 'activo', lastActivity: 'Hace 3 horas', joinDate: '2024-01-20' },
        { id: 'M007', email: 'luis.torres@luismorenos.com', branch: 'Sucursal Norte', country: 'Panamá', supervisor: 'Ana García', tasker: 'Pedro Sánchez', points: 850, level: 3, completedStations: 7, status: 'activo', lastActivity: 'Hace 2 días', joinDate: '2024-02-25' },
        { id: 'M008', email: 'carmen.silva@luismorenos.com', branch: 'Sucursal Este', country: 'Panamá', supervisor: 'María Fernández', tasker: 'Carlos Ruiz', points: 1350, level: 5, completedStations: 11, status: 'activo', lastActivity: 'Hace 4 horas', joinDate: '2024-03-10' },
      ];
      setMerchandisers(demoMerchandisers);
      setLoading(false);
    }, 1000);
  }, []);

  // Obtener sucursales únicas
  const branches = Array.from(new Set(merchandisers.map(m => m.branch)));

  // Filtrar mercaderistas
  const filteredMerchandisers = merchandisers.filter(merchandiser => {
    const matchesSearch = merchandiser.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchandiser.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchandiser.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || merchandiser.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  // Paginación
  const totalPages = Math.ceil(filteredMerchandisers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMerchandisers = filteredMerchandisers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen w-full text-white">
      <Header />
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]"
                style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Mercaderistas por País
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Gestiona todos los mercaderistas de tu país: {user?.country}
            </p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar mercaderistas por ID, email o sucursal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fdd742]/50 focus:border-[#fdd742]/50"
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Branch Filter */}
            <div>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#fdd742]/50 focus:border-[#fdd742]/50"
              >
                <option value="all">Todas las sucursales</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {merchandisers.length}
              </div>
              <div className="text-gray-300 text-sm">Total Mercaderistas</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {merchandisers.filter(m => m.status === 'activo').length}
              </div>
              <div className="text-gray-300 text-sm">Activos</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-[#fdd742] mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {merchandisers.reduce((sum, m) => sum + m.points, 0)}
              </div>
              <div className="text-gray-300 text-sm">Puntos Totales</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {merchandisers.length > 0 ? (merchandisers.reduce((sum, m) => sum + m.level, 0) / merchandisers.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-gray-300 text-sm">Nivel Promedio</div>
            </div>
          </div>

          {/* Mercaderistas List */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Lista de Mercaderistas
            </h2>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                <p className="text-gray-400">Cargando mercaderistas...</p>
              </div>
            ) : paginatedMerchandisers.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No hay mercaderistas</h3>
                <p className="text-gray-400">No se encontraron mercaderistas con los criterios de búsqueda.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedMerchandisers.map((merchandiser) => (
                  <div key={merchandiser.id} className="bg-white/5 rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg border border-white/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{merchandiser.id}</h3>
                          <p className="text-sm text-gray-400">{merchandiser.email}</p>
                          <p className="text-xs text-gray-500">{merchandiser.branch} • {merchandiser.country}</p>
                          <p className="text-xs text-gray-500">Supervisor: {merchandiser.supervisor} • Tasker: {merchandiser.tasker}</p>
                          <p className="text-xs text-gray-500">Última actividad: {merchandiser.lastActivity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#fdd742]">{merchandiser.points}</div>
                          <div className="text-xs text-gray-400">Puntos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">Nivel {merchandiser.level}</div>
                          <div className="text-xs text-gray-400">Nivel</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">{merchandiser.completedStations}</div>
                          <div className="text-xs text-gray-400">Estaciones</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            merchandiser.status === 'activo' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {merchandiser.status === 'activo' ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-400">
                  Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredMerchandisers.length)} de {filteredMerchandisers.length} mercaderistas
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-white/5 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  >
                    Anterior
                  </button>
                  <span className="px-3 py-2 bg-[#fdd742] text-black rounded-lg font-medium">
                    {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-white/5 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
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
