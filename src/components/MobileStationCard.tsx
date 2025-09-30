import React from 'react';
import { motion } from 'framer-motion';

interface MobileStationCardProps {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  points: number;
  level: number;
  icon: string;
  onStationClick: (stationId: string) => void;
}

export default function MobileStationCard({
  id,
  name,
  description,
  isCompleted,
  isUnlocked,
  points,
  level,
  icon,
  onStationClick
}: MobileStationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => isUnlocked && onStationClick(id)}
      className={`
        relative bg-white/5 backdrop-blur-sm rounded-2xl border p-4 mb-3
        transition-all duration-300 cursor-pointer
        ${isUnlocked 
          ? 'border-white/20 hover:border-[#fdd742]/50 hover:bg-white/10' 
          : 'border-white/10 opacity-50 cursor-not-allowed'
        }
        ${isCompleted ? 'ring-2 ring-[#fdd742]/30' : ''}
      `}
    >
      {/* Connection Line */}
      <div className="absolute -top-3 left-8 w-0.5 h-6 bg-gradient-to-b from-[#fdd742]/50 to-transparent"></div>
      
      {/* Station Content */}
      <div className="flex items-center space-x-4">
        {/* Station Icon */}
        <div className={`
          relative w-12 h-12 rounded-full flex items-center justify-center
          transition-all duration-300
          ${isCompleted 
            ? 'bg-[#fdd742] text-black shadow-lg shadow-[#fdd742]/30' 
            : isUnlocked 
              ? 'bg-white/10 text-white border border-white/20' 
              : 'bg-white/5 text-gray-500 border border-white/10'
          }
        `}>
          <span className="text-lg font-bold">{icon}</span>
          
          {/* Status Indicator */}
          {isCompleted && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Station Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`
            text-lg font-bold mb-1 truncate
            ${isCompleted ? 'text-[#fdd742]' : isUnlocked ? 'text-white' : 'text-gray-500'}
          `}>
            {name}
          </h3>
          <p className="text-sm text-gray-400 truncate mb-2">
            {description}
          </p>
          
          {/* Station Meta */}
          <div className="flex items-center space-x-4 text-xs">
            <span className={`
              px-2 py-1 rounded-full font-medium
              ${isCompleted 
                ? 'bg-[#fdd742]/20 text-[#fdd742]' 
                : 'bg-white/10 text-gray-400'
              }
            `}>
              +{points} pts
            </span>
            <span className={`
              px-2 py-1 rounded-full font-medium
              ${isCompleted 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-white/10 text-gray-400'
              }
            `}>
              Nivel {level}
            </span>
          </div>
        </div>

        {/* Action Arrow */}
        {isUnlocked && (
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {isUnlocked && !isCompleted && (
        <div className="mt-3">
          <div className="w-full bg-white/10 rounded-full h-1">
            <div className="bg-gradient-to-r from-[#fdd742] to-yellow-400 h-1 rounded-full w-0 transition-all duration-500"></div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
