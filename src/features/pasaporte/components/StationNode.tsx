import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Station, StationState } from '../types';
import { getStationIconPath } from '../icons';

interface StationNodeProps {
  station: Station;
  active: boolean;
  onClick?: (station: Station) => void;
}

// Posición base del texto relativo al ícono (alineaciones por grupo)
const LABEL_POS: Record<string, string> = {
  // Columna izquierda
  reactor:    'left-full top-1/2 -translate-y-1/2 ml-3 text-left',
  stark:      'left-full top-1/2 -translate-y-1/2 ml-3 text-left',
  jarvis:     'left-full top-1/2 -translate-y-1/2 ml-3 text-left',
  ironmonger: 'left-full top-1/2 -translate-y-1/2 ml-3 text-left',

  // Arco inferior (mejor centradas)
  extremis:   'top-full left-1/2 -translate-x-1/2 mt-2 text-center',
  ironlegion: 'top-full left-1/2 -translate-x-1/2 mt-2 text-center',
  vibranium:  'top-full left-1/2 -translate-x-1/2 mt-2 text-center',

  // Centro-derecha ascendente
  whiplash:   'left-full top-1/2 -translate-y-1/2 ml-3 text-left',
  torre:      'left-full top-1/2 -translate-y-1/2 ml-3 text-left',
  pepper:     'left-full top-1/2 -translate-y-1/2 ml-3 text-center',
  prueba:     'right-full top-1/2 -translate-y-1/2 mr-3 text-center',

  // Cúspide (texto arriba del logo)
  aldrich:    'bottom-full left-1/2 -translate-x-1/2 mb-2 text-center',

  // Descenso derecha
  repulsores: 'right-full top-1/2 -translate-y-1/2 mr-3 text-right',
  mark:       'right-full top-1/2 -translate-y-1/2 mr-3 text-right',
  multiverso: 'right-full top-1/2 -translate-y-1/2 mr-3 text-right',

  // Base derecha
  thanos:     'left-full top-1/2 -translate-y-1/2 ml-3 text-left',
};

// Ajustes finos (px) para evitar choques sin mover íconos
const LABEL_NUDGE: Record<string, {dx?: number; dy?: number; size?: number}> = {
  // izquierda
  reactor:    { dy: -4, dx: 2 },    // ajustado para nueva posición
  stark:      { dy: -2, dx: 2 },    // ajustado para nueva posición
  jarvis:     { dy:  2, dx: 2 },    // ajustado para nueva posición
  ironmonger: { dy:  2, dx: 2 },    // ajustado para nueva posición

  // arco inferior
  extremis:   { dy:  4 },
  ironlegion: { dy:  6 },
  vibranium:  { dy:  8 },

  // centro-derecha
  whiplash:   { dy: -2 },
  torre:      { dy: -2, dx: 2 },    // ajustado para nueva posición más a la izquierda
  pepper:     { dy: -4, dx: 2 },    // ajustado para nueva posición más a la izquierda
  prueba:     { dy: -6, dx: -8 }, // ajustado para nueva posición del lado izquierdo

  // cúspide + descenso (despegar los grises)
  aldrich:    { dy: -4 },    // ajustado para nueva posición arriba del logo
  repulsores: { dy: -10, dx: -12 },  // ajustado para nueva posición más a la derecha
  mark:       { dy:   8, dx: -14 },  // ajustado para nueva posición más a la derecha
  multiverso: { dy:  24, dx: -16 },  // ajustado para nueva posición más a la derecha
  thanos:     { dy:   6, dx: -4 },   // ajustado para nueva posición más a la derecha
};

export default function StationNode({ station, active, onClick }: StationNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const state: StationState = isHovered ? 'hover' : (active ? 'on' : 'off');
  
  const handleClick = () => {
    if (onClick) {
      onClick(station);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };

  // Configuración de etiqueta unificada
  const posClass = LABEL_POS[station.id] ?? 'top-full left-1/2 -translate-x-1/2 mt-2 text-center';
  const nudge = LABEL_NUDGE[station.id] ?? {};
  const labelStateClass = active ? 'label-on' : 'label-off';

  // Tamaño responsivo con ajuste fino por estación si hace falta
  const baseSize = 0.75; // vw (reducido de 0.95 a 0.75)
  const adjustedBaseSize = baseSize + (nudge.size ?? 0);
  const fontSize = `clamp(9px, ${adjustedBaseSize}vw, 14px)`;

  // Componente de etiqueta unificado
  const LabelComponent = () => {
    // Dividir el nombre en palabras para textos de múltiples palabras
    const words = station.name.split(' ');
    const isMultipleWords = words.length > 1;
    
    // Debug para Vuelo de Prueba
    if (station.id === 'prueba') {
      // console.log(`Prueba - words:`, words, 'length:', words.length, 'isMultipleWords:', isMultipleWords);
    }
    
    return (
      <div className={`absolute ${posClass} select-none pointer-events-none z-[5]`}>
        <span
          className={`label-iron ${labelStateClass}`}
          style={{
            fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
            fontWeight: 800,
            fontSize,
            whiteSpace: isMultipleWords ? 'normal' : 'nowrap',
            transform: `translate(${nudge.dx ?? 0}px, ${nudge.dy ?? 0}px)`,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            lineHeight: isMultipleWords ? 0.2 : 1,
            textAlign: 'center',
          }}
        >
          {isMultipleWords ? (
            <div style={{ lineHeight: 1.5 }}>
              {words.length === 3 ? (
                <>
                  <div>{words[0]} {words[1]}</div>
                  <div>{words[2]}</div>
                </>
              ) : (
                <>
                  <div>{words[0]}</div>
                  <div>{words[1]}</div>
                </>
              )}
            </div>
          ) : (
            station.name
          )}
        </span>
      </div>
    );
  };

  if (station.type === 'boss') {
    return (
      <div className="relative p-8">
        <motion.div
          className="relative cursor-pointer"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }}
          animate={active ? {
            y: [0, -4, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          } : {}}
        >
          <img
            src={station.vsIcon}
            alt={station.name}
            className={`w-20 h-20 object-contain transition-all duration-300 ${
              active ? 'opacity-100' : 'opacity-40'
            }`}
            style={{
              width: '80px',
              height: '80px'
            }}
          />

          {/* Etiqueta unificada */}
          <LabelComponent />
          
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-50">
              <div className="font-semibold">{station.name}</div>
              <div className="text-gray-300 text-xs">
                {active ? 'Disponible' : 'Bloqueada'}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Estación normal
  const iconPath = getStationIconPath(station.iconBase!, state);

  return (
    <div className="relative p-8">
      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        animate={active ? {
          y: [0, -4, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        } : {}}
      >
        <img
          src={iconPath}
          alt={station.name}
          className={`w-12 h-12 object-contain transition-all duration-300 ${
            active
              ? 'drop-shadow-[0_0_8px_rgba(253,215,66,0.5)]'
              : 'opacity-60'
          }`}
          style={{
            width: '48px',
            height: '48px'
          }}
        />

        {/* Etiqueta unificada */}
        <LabelComponent />
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-50">
            <div className="font-semibold">{station.name}</div>
            <div className="text-gray-300 text-xs">
              {active ? 'Disponible' : 'Bloqueada'}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        )}
      </motion.div>
    </div>
  );
}