
interface MinimalStationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  stats: {
    total: number;
    completed: number;
    unlocked: number;
    locked: number;
  };
}

export default function MinimalStationTabs({
  activeTab,
  onTabChange,
  stats
}: MinimalStationTabsProps) {
  const tabs = [
    { id: 'all', label: 'Todas', count: stats.total, color: 'text-gray-300' },
    { id: 'completed', label: 'Completadas', count: stats.completed, color: 'text-[#fdd742]' },
    { id: 'unlocked', label: 'Disponibles', count: stats.unlocked, color: 'text-blue-400' },
    { id: 'locked', label: 'Bloqueadas', count: stats.locked, color: 'text-gray-500' }
  ];

  return (
    <div className="mb-6 w-full">
      {/* Tab Navigation - Vertical Stack */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 min-w-0
              ${activeTab === tab.id
                ? 'bg-gradient-to-r from-[#fdd742]/20 to-yellow-400/10 border border-[#fdd742]/40 text-white shadow-lg shadow-[#fdd742]/10'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs font-semibold truncate w-full text-center">
                {tab.label}
              </span>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                ${activeTab === tab.id 
                  ? 'bg-[#fdd742] text-black' 
                  : 'bg-white/10 text-white'
                }
              `}>
                {tab.count}
              </div>
            </div>
            
            {/* Active indicator */}
            {activeTab === tab.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#fdd742] rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
