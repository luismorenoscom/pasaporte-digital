import Header from "../components/Header";
import { useApp } from "../context/AppContext";

export default function ProfilePage() {
  const { user } = useApp();


  // Si el usuario no está cargado, mostrar loading
  if (!user) {
    return (
      <div className="min-h-screen w-full text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando perfil...</p>
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
              Mi Perfil
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Información de tu cuenta en el sistema
            </p>
          </div>

          {/* Información del Usuario - Solo Lectura */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-[#fdd742] mb-6" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Información del Usuario
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID del Usuario */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ID de Usuario</label>
                <div className="w-full rounded-xl p-3 bg-white/5 border border-white/10 text-gray-300">
                  {user?.id || 'N/A'}
                </div>
              </div>

              {/* Correo Electrónico */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
                <div className="w-full rounded-xl p-3 bg-white/5 border border-white/10 text-gray-300">
                  {user?.email || 'N/A'}
                </div>
              </div>

              {/* País */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">País</label>
                <div className="w-full rounded-xl p-3 bg-white/5 border border-white/10 text-gray-300">
                  {user?.country || 'N/A'}
                </div>
              </div>

              {/* Agencia/Sucursal */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Agencia/Sucursal</label>
                <div className="w-full rounded-xl p-3 bg-white/5 border border-white/10 text-gray-300">
                  {user?.branch || 'N/A'}
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-blue-400">Información de Solo Lectura</h3>
                  <p className="text-sm text-blue-300 mt-1">
                    Esta información es proporcionada por el sistema y no puede ser modificada. 
                    Si necesitas actualizar algún dato, contacta con tu administrador.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
