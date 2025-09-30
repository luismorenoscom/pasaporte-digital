import React from 'react';

interface StationIconProps {
  stationId: string;
  stationType: 'station' | 'boss';
  className?: string;
  stationIcon?: string;
  vsIcon?: string;
}

export default function StationIcon({ stationId, stationType, className = "w-12 h-12", stationIcon, vsIcon }: StationIconProps) {
  const getIcon = () => {
    // Si es un boss y tiene vsIcon, usar la imagen PNG
    if (stationType === 'boss' && vsIcon) {
      return (
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img 
            src={vsIcon} 
            alt={stationId}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    // Si es una estación normal y tiene stationIcon, usar la imagen PNG
    if (stationType === 'station' && stationIcon) {
      return (
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img 
            src={stationIcon} 
            alt={stationId}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    // Para estaciones normales, usar iconBase
    const iconBase = stationId.toLowerCase();
    
    switch (iconBase) {
      // Reactor Arc - Icono de reactor nuclear
      case 'reactor':
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        );

      // Stark Industries - Logo corporativo
      case 'stark':
        return (
          <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        );

      // Jarvis - IA
      case 'jarvis':
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
        );

      // Iron Monger - Boss
      case 'ironmonger':
        return (
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Extremis - Virus
      case 'extremis':
        return (
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"/>
            </svg>
          </div>
        );

      // Iron Legion - Legión de robots
      case 'ironlegion':
        return (
          <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Vibranium - Metal de Wakanda
      case 'vibranium':
        return (
          <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Whiplash - Boss con látigos
      case 'whiplash':
        return (
          <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Torre Stark - Edificio
      case 'torre':
        return (
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Rescate Pepper - Pepper Potts
      case 'pepper':
        return (
          <div className="w-full h-full bg-gradient-to-br from-pink-500 to-pink-700 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        );

      // Vuelo de Prueba - Avión
      case 'prueba':
        return (
          <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Aldrich Killian - Boss
      case 'aldrich':
        return (
          <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Repulsores - Armas de Iron Man
      case 'repulsores':
        return (
          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Innovación Mark I-VII - Cascos
      case 'mark':
        return (
          <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Multiverso - Portal
      case 'multiverso':
        return (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="12" cy="12" r="12" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
        );

      // Thanos - Boss final
      case 'thanos':
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );

      // Default icon
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`${className} rounded-lg overflow-hidden`}>
      {getIcon()}
    </div>
  );
}