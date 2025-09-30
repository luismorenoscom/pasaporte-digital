import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface Branch {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  supervisors: number;
  taskers: number;
  merchandisers: number;
  totalPoints: number;
  averageLevel: number;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  openDate: string;
}

export default function AgencyBranchesPage() {
  const { user } = useApp();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Cargar datos
  useEffect(() => {
    setTimeout(() => {
      const demoBranches: Branch[] = [
        { id: 'b1', name: 'Sucursal Centro', country: 'Panamá', city: 'Ciudad de Panamá', address: 'Av. Central 123', supervisors: 1, taskers: 1, merchandisers: 15, totalPoints: 2500, averageLevel: 4.2, status: 'activo', lastActivity: 'Hace 2 horas', openDate: '2024-01-15' },
        { id: 'b2', name: 'Sucursal Norte', country: 'Panamá', city: 'Colón', address: 'Calle 50 456', supervisors: 1, taskers: 1, merchandisers: 12, totalPoints: 1800, averageLevel: 3.8, status: 'activo', lastActivity: 'Hace 1 día', openDate: '2024-02-20' },
        { id: 'b3', name: 'Sucursal Sur', country: 'Panamá', city: 'David', address: 'Av. Central 789', supervisors: 1, taskers: 1, merchandisers: 8, totalPoints: 1200, averageLevel: 3.5, status: 'inactivo', lastActivity: 'Hace 3 días', openDate: '2024-01-10' },
        { id: 'b4', name: 'Sucursal Este', country: 'Panamá', city: 'Tocumen', address: 'Calle 25 321', supervisors: 1, taskers: 1, merchandisers: 18, totalPoints: 3200, averageLevel: 4.8, status: 'activo', lastActivity: 'Hace 4 horas', openDate: '2024-03-05' },
        { id: 'b5', name: 'Sucursal Oeste', country: 'Panamá', city: 'Arraiján', address: 'Av. Principal 654', supervisors: 1, taskers: 1, merchandisers: 14, totalPoints: 2100, averageLevel: 3.9, status: 'activo', lastActivity: 'Hace 6 horas', openDate: '2024-02-28' },
      ];
      setBranches(demoBranches);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar sucursales
  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBranches = filteredBranches.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen w-full text-white">
      <Header />
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]"
                style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Sucursales
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Gestiona todas las sucursales de tu país: {user?.country}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar sucursales por nombre, ciudad o país..."
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
              <div className="text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {branches.length}
              </div>
              <div className="text-gray-300 text-sm">Total Sucursales</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-[#fdd742] mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {branches.filter(b => b.status === 'activo').length}
              </div>
              <div className="text-gray-300 text-sm">Activas</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {branches.reduce((sum, b) => sum + b.merchandisers, 0)}
              </div>
              <div className="text-gray-300 text-sm">Total Mercaderistas</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {branches.length > 0 ? (branches.reduce((sum, b) => sum + b.averageLevel, 0) / branches.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-gray-300 text-sm">Nivel Promedio</div>
            </div>
          </div>

          {/* Sucursales List */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Lista de Sucursales
            </h2>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                <p className="text-gray-400">Cargando sucursales...</p>
              </div>
            ) : paginatedBranches.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No hay sucursales</h3>
                <p className="text-gray-400">No se encontraron sucursales con los criterios de búsqueda.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedBranches.map((branch) => (
                  <div key={branch.id} className="bg-white/5 rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg border border-white/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{branch.name}</h3>
                          <p className="text-sm text-gray-400">{branch.address}</p>
                          <p className="text-xs text-gray-500">{branch.city}, {branch.country}</p>
                          <p className="text-xs text-gray-500">Última actividad: {branch.lastActivity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#fdd742]">{branch.merchandisers}</div>
                          <div className="text-xs text-gray-400">Mercaderistas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{branch.supervisors + branch.taskers}</div>
                          <div className="text-xs text-gray-400">Personal</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-400">Nivel {branch.averageLevel}</div>
                          <div className="text-xs text-gray-400">Promedio</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">{branch.totalPoints}</div>
                          <div className="text-xs text-gray-400">Puntos</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            branch.status === 'activo' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {branch.status === 'activo' ? 'Activa' : 'Inactiva'}
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
                  Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredBranches.length)} de {filteredBranches.length} sucursales
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
