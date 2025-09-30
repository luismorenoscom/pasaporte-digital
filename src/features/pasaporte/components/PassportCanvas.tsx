import React from 'react';
import type { Station } from '../types';
import { getStationState } from '../icons';
import StationNode from './StationNode';

interface PassportCanvasProps {
  stations: Station[];
  userPoints: number;
  completedStationIds?: string[];
  onStationClick?: (station: Station) => void;
}

export default function PassportCanvas({ 
  stations, 
  userPoints, 
  completedStationIds, 
  onStationClick 
}: PassportCanvasProps) {
  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: '90rem' }}>
      {/* Fondo del mapa */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
        <img
          src="/assets-fondo22.png"
          alt="Mapa del Multiverso"
          className="w-full h-full object-cover"
        />
        
        {/* Conectores SVG - Detrás de los iconos */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {stations.map((station, index) => {
            if (index === stations.length - 1) return null;
            
            const nextStation = stations[index + 1];
            const isActive = getStationState(userPoints, station.requiredPoints || 0, completedStationIds, station.id) === 'on';
            const isNextActive = getStationState(userPoints, nextStation.requiredPoints || 0, completedStationIds, nextStation.id) === 'on';
            
            // Método más simple: usar un offset fijo basado en el tipo de estación
            const stationOffset = station.type === 'boss' ? 3.5 : 2.0; // Porcentaje fijo
            const nextStationOffset = nextStation.type === 'boss' ? 3.5 : 2.0;
            
            // Calcular dirección del vector
            const dx = nextStation.xPct - station.xPct;
            const dy = nextStation.yPct - station.yPct;
            const length = Math.sqrt(dx * dx + dy * dy);
            
            // Normalizar el vector
            const unitX = dx / length;
            const unitY = dy / length;
            
            // Calcular puntos de inicio y fin
            const startX = station.xPct + (unitX * stationOffset);
            const startY = station.yPct + (unitY * stationOffset);
            const endX = nextStation.xPct - (unitX * nextStationOffset);
            const endY = nextStation.yPct - (unitY * nextStationOffset);
            
            return (
              <line
                key={`connector-${station.id}-${nextStation.id}`}
                x1={`${startX}%`}
                y1={`${startY}%`}
                x2={`${endX}%`}
                y2={`${endY}%`}
                stroke={isActive && isNextActive ? "#fdd742" : "#4a5568"}
                strokeWidth={isActive && isNextActive ? "1.5" : "2.5"}
                strokeDasharray={isActive && isNextActive ? "0" : "4,4"}
                className="transition-all duration-500"
                opacity={isActive && isNextActive ? "0.8" : "0.7"}
              />
            );
          })}
        </svg>
        
        {/* Nodos de estaciones - Delante de las líneas */}
        <div className="absolute inset-0 z-20">
          {stations.map((station) => {
            const isActive = getStationState(userPoints, station.requiredPoints || 0, completedStationIds, station.id) === 'on';
            
            return (
              <div
                key={station.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${station.xPct}%`,
                  top: `${station.yPct}%`,
                }}
              >
                <StationNode
                  station={station}
                  active={isActive}
                  onClick={onStationClick}
                />
              </div>
            );
          })}
        </div>
        
        {/* Overlay de información */}
        <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-3 text-white">
          <div className="text-sm font-semibold text-[#fdd742]">Multiverso Iron Man</div>
          <div className="text-xs text-gray-300">
            {stations.filter(s => getStationState(userPoints, s.requiredPoints || 0, completedStationIds, s.id) === 'on').length} / {stations.length} estaciones desbloqueadas
          </div>
        </div>
      </div>
    </div>
  );
}
