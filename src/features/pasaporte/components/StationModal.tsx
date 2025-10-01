import { motion, AnimatePresence } from 'framer-motion';
import type { Station } from '../types';
import { getStationStatusText } from '../icons';

interface StationModalProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
  completedStationIds?: string[];
}

export default function StationModal({ 
  station, 
  isOpen, 
  onClose, 
  userPoints, 
  completedStationIds 
}: StationModalProps) {
  if (!station) return null;

  const isAvailable = userPoints >= (station.requiredPoints || 0);
  const isCompleted = completedStationIds?.includes(station.id) || false;
  const statusText = getStationStatusText(userPoints, station.requiredPoints || 0, completedStationIds, station.id);

  const getRewardPoints = () => {
    if (station.type === 'boss') {
      return 100;
    }
    return 50;
  };

  const getDescription = () => {
    if (station.type === 'boss') {
      return `Enfrenta a ${station.name} en un combate épico. Demuestra tu valentía y habilidades para derrotar a este formidable oponente.`;
    }
    return `Completa esta estación para avanzar en tu viaje por el multiverso. Cada estación te acerca más a tu destino final.`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {station.type === 'boss' ? (
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">VS</span>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-[#fdd742] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg">⚡</span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-white">{station.name}</h2>
                  <div className={`text-sm font-medium ${
                    isCompleted ? 'text-green-400' : 
                    isAvailable ? 'text-[#fdd742]' : 'text-gray-400'
                  }`}>
                    {statusText}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                {getDescription()}
              </p>

              {/* Información de la estación */}
              <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Puntos requeridos:</span>
                  <span className="text-white font-medium">{station.requiredPoints}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Recompensa:</span>
                  <span className="text-[#fdd742] font-medium">+{getRewardPoints()} puntos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Tipo:</span>
                  <span className="text-white font-medium">
                    {station.type === 'boss' ? 'Jefe Final' : 'Estación'}
                  </span>
                </div>
              </div>

              {/* Progreso del usuario */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Tu progreso:</span>
                  <span className="text-white font-medium">{userPoints} puntos</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-[#fdd742] h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((userPoints / (station.requiredPoints || 1)) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
                {!isAvailable && (
                  <p className="text-gray-400 text-xs mt-2">
                    Necesitas {station.requiredPoints! - userPoints} puntos más para desbloquear esta estación.
                  </p>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  if (isAvailable && !isCompleted) {
                    // Aquí iría la lógica para iniciar la estación
                    console.log(`Iniciando estación: ${station.name}`);
                    onClose();
                  }
                }}
                disabled={!isAvailable || isCompleted}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium ${
                  isAvailable && !isCompleted
                    ? 'bg-[#fdd742] text-black hover:bg-yellow-400'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isCompleted ? 'Completada' : isAvailable ? 'Iniciar' : 'Bloqueada'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
