import { motion } from 'framer-motion';

interface MinimalPassportHeaderProps {
  totalStations: number;
  completedStations: number;
  currentLevel: number;
  totalPoints: number;
}

export default function MinimalPassportHeader({
  totalStations,
  completedStations,
  currentLevel,
  totalPoints
}: MinimalPassportHeaderProps) {
  const progressPercentage = (completedStations / totalStations) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 w-full"
    >
      {/* Main Title */}
      <div className="text-center mb-6">
        <h1 
          className="text-2xl font-bold mb-2 text-white"
          style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
        >
          Pasaporte Digital
        </h1>
        <p className="text-gray-400 text-sm">
          Multiverso Iron Man
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4 mb-4 w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-white">Progreso General</h2>
            <p className="text-sm text-gray-400 truncate">{completedStations} de {totalStations} estaciones</p>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <div className="text-2xl font-bold text-[#fdd742]">{Math.round(progressPercentage)}%</div>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="min-w-0">
            <div className="text-lg font-bold text-white">{completedStations}</div>
            <div className="text-xs text-gray-400">Completadas</div>
          </div>
          <div className="min-w-0">
            <div className="text-lg font-bold text-blue-400">Nivel {currentLevel}</div>
            <div className="text-xs text-gray-400">Actual</div>
          </div>
          <div className="min-w-0">
            <div className="text-lg font-bold text-green-400">{totalPoints}</div>
            <div className="text-xs text-gray-400">Puntos</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
