import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

export default function CompanyDashboardPage() {
  const { user } = useApp();
  const navigate = useNavigate();

  // Si el usuario no está cargado, mostrar loading
  if (!user) {
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

      {/* Main Content */}
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]" 
              style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
            >
              Panel de Control Empresarial
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Gestiona tu empresa y supervisa el rendimiento de tus empleados en el multiverso
            </p>
          </div>

          {/* Estadísticas Generales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-[#fdd742] mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                3
              </div>
              <div className="text-gray-300 text-sm">Empleados Activos</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                12
              </div>
              <div className="text-gray-300 text-sm">Estaciones Completadas</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                950
              </div>
              <div className="text-gray-300 text-sm">Puntos Totales</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                75%
              </div>
              <div className="text-gray-300 text-sm">Progreso General</div>
            </div>
          </div>

          {/* Secciones de Gestión */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gestión de Empleados */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-[#fdd742] mb-6" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                Gestión de Empleados
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Luis Moreno</h3>
                      <p className="text-gray-400 text-sm">lms@luismorenos.com</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[#fdd742] font-bold">650 pts</div>
                      <div className="text-gray-400 text-sm">Nivel 5</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#fdd742] to-[#ff6b35] h-2 rounded-full" style={{ width: '83%' }}></div>
                    </div>
                    <div className="text-center text-gray-400 text-xs mt-1">83% completado</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Carlos Gonzales</h3>
                      <p className="text-gray-400 text-sm">carlos@luismorenos.com</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[#fdd742] font-bold">300 pts</div>
                      <div className="text-gray-400 text-sm">Nivel 2</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#fdd742] to-[#ff6b35] h-2 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                    <div className="text-center text-gray-400 text-xs mt-1">33% completado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas de Rendimiento */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-[#fdd742] mb-6" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                Estadísticas de Rendimiento
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Estaciones Completadas</span>
                    <span className="text-[#fdd742] font-bold">12/16</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-[#fdd742] to-[#ff6b35] h-3 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Puntos Promedio</span>
                    <span className="text-[#fdd742] font-bold">317 pts</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full" style={{ width: '63%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Nivel Promedio</span>
                    <span className="text-[#fdd742] font-bold">3.5</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-[#fdd742] mb-6" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Acciones Rápidas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <button className="bg-gradient-to-r from-[#fdd742] to-[#ff6b35] text-black font-bold py-4 px-6 rounded-xl hover:from-[#ff6b35] hover:to-[#fdd742] transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>Gestionar Empleados</span>
                </div>
              </button>

              <button 
                onClick={() => navigate('/actualizar-data')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Actualizar Data</span>
                </div>
              </button>

              <button 
                onClick={() => navigate('/top-ganadores')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Top Ganadores</span>
                </div>
              </button>

              <button 
                onClick={() => navigate('/historial-empresa')}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Historial</span>
                </div>
              </button>

              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Ver Reportes</span>
                </div>
              </button>

              <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 px-6 rounded-xl hover:from-teal-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Configuración</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
