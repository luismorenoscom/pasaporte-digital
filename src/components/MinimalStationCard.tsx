import React from 'react';
import { motion } from 'framer-motion';
import StationIcon from './StationIcons';

interface MinimalStationCardProps {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  points: number;
  level: number;
  icon: string;
  stationType: 'station' | 'boss';
  stationIcon?: string;
  vsIcon?: string;
  onStationClick: (stationId: string) => void;
}

export default function MinimalStationCard({
  id,
  name,
  description,
  isCompleted,
  isUnlocked,
  points,
  level,
  icon,
  stationType,
  stationIcon,
  vsIcon,
  onStationClick
}: MinimalStationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => isUnlocked && onStationClick(id)}
      className={`
        relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm 
        rounded-xl border p-4 mb-3 cursor-pointer transition-all duration-300 w-full
        ${isUnlocked 
          ? 'border-white/20 hover:border-[#fdd742]/50 hover:shadow-lg hover:shadow-[#fdd742]/20' 
          : 'border-white/10 opacity-50 cursor-not-allowed'
        }
        ${isCompleted ? 'ring-1 ring-[#fdd742]/40 bg-gradient-to-r from-[#fdd742]/10 to-white/5' : ''}
      `}
    >
      {/* Status Indicator */}
      <div className="absolute top-3 right-3">
        {isCompleted ? (
          <div className="w-6 h-6 bg-[#fdd742] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        ) : isUnlocked ? (
          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        ) : (
          <div className="w-6 h-6 bg-gray-500/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Station Content */}
      <div className="flex items-start space-x-3">
        {/* Station Icon */}
        <div className="w-12 h-12 flex-shrink-0">
          <StationIcon 
            stationId={id} 
            stationType={stationType} 
            stationIcon={stationIcon}
            vsIcon={vsIcon}
            className="w-full h-full"
          />
        </div>

        {/* Station Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`
            text-lg font-bold mb-1 truncate
            ${isCompleted ? 'text-[#fdd742]' : isUnlocked ? 'text-white' : 'text-gray-500'}
          `}>
            {name}
          </h3>
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
            {description}
          </p>
          
          {/* Station Stats */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1 min-w-0">
              <span className="text-gray-400">Puntos:</span>
              <span className={`
                font-semibold
                ${isCompleted ? 'text-[#fdd742]' : 'text-gray-300'}
              `}>
                +{points}
              </span>
            </div>
            <div className="flex items-center space-x-1 min-w-0">
              <span className="text-gray-400">Nivel:</span>
              <span className={`
                font-semibold
                ${isCompleted ? 'text-blue-400' : 'text-gray-300'}
              `}>
                {level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {isUnlocked && !isCompleted && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Progreso</span>
            <span>0%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1">
            <div className="bg-gradient-to-r from-[#fdd742] to-yellow-400 h-1 rounded-full w-0 transition-all duration-500"></div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
