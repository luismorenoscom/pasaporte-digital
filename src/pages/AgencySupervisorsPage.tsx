import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface Supervisor {
  id: string;
  email: string;
  branch: string;
  country: string;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  totalMerchandisers: number;
  totalPoints: number;
  averageLevel: number;
  joinDate: string;
}

export default function AgencySupervisorsPage() {
  const { user } = useApp();
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Cargar datos
  useEffect(() => {
    setTimeout(() => {
      const demoSupervisors: Supervisor[] = [
        { id: 'S001', email: 'carlos.mendoza@luismorenos.com', branch: 'Sucursal Centro', country: 'Panamá', status: 'activo', lastActivity: 'Hace 2 horas', totalMerchandisers: 15, totalPoints: 2500, averageLevel: 4.2, joinDate: '2024-01-15' },
        { id: 'S002', email: 'ana.garcia@luismorenos.com', branch: 'Sucursal Norte', country: 'Panamá', status: 'activo', lastActivity: 'Hace 1 día', totalMerchandisers: 12, totalPoints: 1800, averageLevel: 3.8, joinDate: '2024-02-20' },
        { id: 'S003', email: 'luis.rodriguez@luismorenos.com', branch: 'Sucursal Sur', country: 'Panamá', status: 'inactivo', lastActivity: 'Hace 3 días', totalMerchandisers: 8, totalPoints: 1200, averageLevel: 3.5, joinDate: '2024-01-10' },
        { id: 'S004', email: 'maria.fernandez@luismorenos.com', branch: 'Sucursal Este', country: 'Panamá', status: 'activo', lastActivity: 'Hace 4 horas', totalMerchandisers: 18, totalPoints: 3200, averageLevel: 4.8, joinDate: '2024-03-05' },
        { id: 'S005', email: 'pedro.silva@luismorenos.com', branch: 'Sucursal Oeste', country: 'Panamá', status: 'activo', lastActivity: 'Hace 6 horas', totalMerchandisers: 14, totalPoints: 2100, averageLevel: 3.9, joinDate: '2024-02-28' },
      ];
      setSupervisors(demoSupervisors);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar supervisores
  const filteredSupervisors = supervisors.filter(supervisor =>
    supervisor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supervisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supervisor.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredSupervisors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSupervisors = filteredSupervisors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen w-full text-white">
      <Header />
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]"
                style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Supervisores
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Gestiona todos los supervisores de tu país: {user?.country}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar supervisores por ID, email o sucursal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fdd742]/50 focus:border-[#fdd742]/50"
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-[#fdd742] mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {supervisors.length}
              </div>
              <div className="text-gray-300 text-sm">Total Supervisores</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {supervisors.filter(s => s.status === 'activo').length}
              </div>
              <div className="text-gray-300 text-sm">Activos</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {supervisors.reduce((sum, s) => sum + s.totalMerchandisers, 0)}
              </div>
              <div className="text-gray-300 text-sm">Total Mercaderistas</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {supervisors.length > 0 ? (supervisors.reduce((sum, s) => sum + s.averageLevel, 0) / supervisors.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-gray-300 text-sm">Nivel Promedio</div>
            </div>
          </div>

          {/* Supervisores List */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Lista de Supervisores
            </h2>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                <p className="text-gray-400">Cargando supervisores...</p>
              </div>
            ) : paginatedSupervisors.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No hay supervisores</h3>
                <p className="text-gray-400">No se encontraron supervisores con los criterios de búsqueda.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedSupervisors.map((supervisor) => (
                  <div key={supervisor.id} className="bg-white/5 rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#fdd742]/20 rounded-lg border border-white/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{supervisor.id}</h3>
                          <p className="text-sm text-gray-400">{supervisor.email}</p>
                          <p className="text-xs text-gray-500">{supervisor.branch} • {supervisor.country}</p>
                          <p className="text-xs text-gray-500">Última actividad: {supervisor.lastActivity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#fdd742]">{supervisor.totalMerchandisers}</div>
                          <div className="text-xs text-gray-400">Mercaderistas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{supervisor.totalPoints}</div>
                          <div className="text-xs text-gray-400">Puntos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-400">Nivel {supervisor.averageLevel}</div>
                          <div className="text-xs text-gray-400">Promedio</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            supervisor.status === 'activo' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {supervisor.status === 'activo' ? 'Activo' : 'Inactivo'}
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
                  Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredSupervisors.length)} de {filteredSupervisors.length} supervisores
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
