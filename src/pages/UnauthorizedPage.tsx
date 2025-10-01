import Header from "../components/Header";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full text-white">
      <Header />
      
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h1 
              className="text-4xl md:text-5xl font-black mb-4 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]" 
              style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
            >
              Acceso No Autorizado
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              No tienes permisos para acceder a esta sección. Tu rol actual no permite el acceso a esta funcionalidad.
            </p>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 max-w-md mx-auto mb-8">
              <h2 className="text-xl font-bold text-[#fdd742] mb-4" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                Información de tu cuenta
              </h2>
              <div className="space-y-2 text-left">
                <div>
                  <span className="text-gray-400">Usuario:</span>
                  <span className="text-white ml-2">{user?.email}</span>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white ml-2">{user?.email}</span>
                </div>
                <div>
                  <span className="text-gray-400">Rol:</span>
                  <span className="text-white ml-2 capitalize">{user?.email?.includes('luis@luismorenos.com') ? 'Empresa' : 'Empleado'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.history.back()}
                className="px-8 py-3 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Volver Atrás
              </button>
            <button
              onClick={() => {
                logout();
                navigate("/auth");
              }}
              className="px-8 py-3 bg-[#fdd742] text-black font-bold rounded-xl hover:bg-[#ff6b35] transition-colors"
            >
              Cambiar Usuario
            </button>
            <button
              onClick={() => {
                // Redirigir al dashboard apropiado según el rol
                if (user?.email === 'luis@luismorenos.com') {
                  window.location.href = "/dashboard-empresa";
                } else {
                  window.location.href = "/pasaporte-digital";
                }
              }}
              className="px-8 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
            >
              Ir a mi Dashboard
            </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
