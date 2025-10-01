import { motion } from 'framer-motion';

interface MobilePassportHeaderProps {
  totalStations: number;
  completedStations: number;
  currentLevel: number;
  totalPoints: number;
}

export default function MobilePassportHeader({
  totalStations,
  completedStations,
  currentLevel,
  totalPoints
}: MobilePassportHeaderProps) {
  const progressPercentage = (completedStations / totalStations) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      {/* Main Title */}
      <div className="text-center mb-6">
        <h1 
          className="text-3xl md:text-4xl font-black mb-2 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]"
          style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
        >
          Pasaporte Digital
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Tu identidad digital en el multiverso
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-white">Multiverso Iron Man</h2>
            <p className="text-sm text-gray-400">{completedStations} estaciones desbloqueadas</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#fdd742]">{Math.round(progressPercentage)}%</div>
            <div className="text-xs text-gray-400">Completado</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-4">
          <motion.div 
            className="bg-gradient-to-r from-[#fdd742] to-yellow-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-white">{completedStations}/{totalStations}</div>
            <div className="text-xs text-gray-400">Estaciones</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">Nivel {currentLevel}</div>
            <div className="text-xs text-gray-400">Actual</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">{totalPoints}</div>
            <div className="text-xs text-gray-400">Puntos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-400">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-xs text-gray-400">Progreso</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-[#fdd742] text-black py-2 px-4 rounded-lg font-medium text-sm hover:bg-[#fdd742]/80 transition-colors">
          Ver Logros
        </button>
        <button className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-white/20 transition-colors">
          Compartir
        </button>
      </div>
    </motion.div>
  );
}
