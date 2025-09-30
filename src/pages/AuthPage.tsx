import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

// =============================
// Estilos base reutilizables
// =============================
const inputBase =
  "w-full rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fdd742]/60 focus:border-[#fdd742]/50 transition px-4 py-3";

// =============================
// Página de Login
// =============================
export default function AuthPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => email.length > 3 && password.length >= 6, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!canSubmit) return setError("Correo y clave requeridos (mín. 6 caracteres de clave).");
    try {
      setLoading(true);
      // Simular validación
      await new Promise((r) => setTimeout(r, 900));
      
      // Validar credenciales usando el contexto
      if (login(email, password)) {
        // Redirigir según el rol del usuario
        switch (email) {
          case 'supervisor@luismorenos.com':
            navigate("/dashboard-supervisor");
            break;
          case 'tasker@luismorenos.com':
            navigate("/dashboard-tasker");
            break;
          case 'adminagencia@luismorenos.com':
            navigate("/dashboard-agencia");
            break;
          case 'superadmininfinity@luismorenos.com':
            navigate("/dashboard-global");
            break;
          default:
            // Mercaderistas van al pasaporte digital
            navigate("/pasaporte-digital");
            break;
        }
             } else {
               setError("Credenciales incorrectas. Usuarios: mercaderista@luismorenos.com, supervisor@luismorenos.com, tasker@luismorenos.com, adminagencia@luismorenos.com, superadmininfinity@luismorenos.com - Contraseña: 123456789");
             }
    } catch (err) {
      setError("Credenciales no válidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url('/assets-fondo1.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay para glass/legibilidad */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Vignette sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6)_100%)]" />

      <main className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-xl bg-white/3 border border-white/20 rounded-3xl shadow-[0_20px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          {/* Header - Logo centrado */}
          <div className="flex justify-center px-4 sm:px-8 pt-4 sm:pt-6">
            <img 
              src="/logo-infinity-stores.png" 
              alt="Infinity Stores" 
              className="h-12 sm:h-16 w-auto"
            />
          </div>

          {/* Cuerpo */}
          <div className="px-4 sm:px-8 pb-6 sm:pb-8 pt-2 sm:pt-4">
            <h1 className="text-[#fdd742] text-xl sm:text-2xl md:text-3xl font-bold text-center drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]">Desafía al Multiverso</h1>
            <p className="text-white/60 mt-1 text-xs sm:text-sm md:text-base text-center px-2">Demuestra tu valor, conquista estaciones y asciende al nivel élite</p>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-white/70 text-sm mb-1">Correo</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tucorreo@dominio.com"
                  className={inputBase}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-white/70 text-sm mb-1">Clave</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    className={inputBase}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute inset-y-0 right-0 px-3 text-white/60 hover:text-white"
                    aria-label={showPwd ? "Ocultar clave" : "Mostrar clave"}
                  >
                    {showPwd ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="mt-2 w-full h-12 rounded-2xl font-semibold bg-[#fdd742] text-black shadow-lg shadow-[#fdd742]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Ingresando…" : "Entrar"}
              </button>

              <div className="flex justify-center items-center text-white/60 text-xs sm:text-sm" style={{ marginTop: '8px' }}>
                <a href="#" className="text-[#fdd742] hover:text-[#fdd742]/80 underline-offset-2 hover:underline">
                  Soporte
                </a>
              </div>
            </form>
          </div>
        </motion.section>
      </main>

      {/* Borde suave en los márgenes, estético */}
      <div className="absolute inset-0 pointer-events-none p-5">
        <div className="w-full h-full rounded-3xl border border-white/10" />
      </div>
    </div>
  );
}