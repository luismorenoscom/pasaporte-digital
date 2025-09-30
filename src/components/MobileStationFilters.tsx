import React from 'react';

interface MobileStationFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  stats: {
    total: number;
    completed: number;
    unlocked: number;
    locked: number;
  };
}

export default function MobileStationFilters({
  activeFilter,
  onFilterChange,
  stats
}: MobileStationFiltersProps) {
  const filters = [
    { id: 'all', label: 'Todas', count: stats.total },
    { id: 'completed', label: 'Completadas', count: stats.completed },
    { id: 'unlocked', label: 'Disponibles', count: stats.unlocked },
    { id: 'locked', label: 'Bloqueadas', count: stats.locked }
  ];

  return (
    <div className="mb-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-white/5 rounded-lg p-1 mb-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
              ${activeFilter === filter.id
                ? 'bg-[#fdd742] text-black'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="block">{filter.label}</span>
            <span className="text-xs opacity-75">{filter.count}</span>
          </button>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Progreso General</h3>
          <span className="text-sm text-[#fdd742] font-bold">
            {stats.completed}/{stats.total} estaciones
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-[#fdd742] to-yellow-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(stats.completed / stats.total) * 100}%` }}
          ></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#fdd742] rounded-full"></div>
            <span className="text-gray-300">Completadas: {stats.completed}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-gray-300">Disponibles: {stats.unlocked}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-gray-300">Bloqueadas: {stats.locked}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <span className="text-gray-300">Total: {stats.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
