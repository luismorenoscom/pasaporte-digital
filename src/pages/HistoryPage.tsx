import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';

interface PersonalHistory {
  id: string;
  date: string;
  action: string;
  points: number;
  station?: string;
  level?: number;
  description: string;
}

export default function HistoryPage() {
  const { user } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [loading, setLoading] = useState(false);

  // Estado para historial personal del usuario
  const [personalHistory, setPersonalHistory] = useState<PersonalHistory[]>([]);

  // Simular carga de datos con contenido demo
  const loadData = async () => {
    setLoading(true);
    // Simular carga de datos del historial personal
    setTimeout(() => {
      // Contenido demo para el mercaderista con fechas de la semana actual
      const today = new Date();
      const formatDate = (daysAgo: number) => {
        const date = new Date(today);
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString().split('T')[0];
      };

      const demoHistory: PersonalHistory[] = [
        {
          id: '1',
          date: formatDate(6), // Hace 6 días
          action: 'Completó estación',
          points: 50,
          station: 'Reactor Arc',
          level: 1,
          description: 'Inició su viaje en el multiverso completando el Reactor Arc'
        },
        {
          id: '2',
          date: formatDate(5), // Hace 5 días
          action: 'Ganó puntos',
          points: 25,
          description: 'Puntos por actividad diaria'
        },
        {
          id: '3',
          date: formatDate(4), // Hace 4 días
          action: 'Completó estación',
          points: 100,
          station: 'Iron Monger',
          level: 2,
          description: 'Derrotó a Iron Monger en combate épico'
        },
        {
          id: '4',
          date: formatDate(3), // Hace 3 días
          action: 'Ganó puntos',
          points: 30,
          description: 'Puntos por participación en actividades'
        },
        {
          id: '5',
          date: formatDate(2), // Hace 2 días
          action: 'Completó estación',
          points: 50,
          station: 'Extremis',
          level: 3,
          description: 'Superó el desafío de Extremis'
        },
        {
          id: '6',
          date: formatDate(1), // Ayer
          action: 'Ganó puntos',
          points: 20,
          description: 'Puntos por logros diarios'
        },
        {
          id: '7',
          date: formatDate(1), // Ayer
          action: 'Subió de nivel',
          points: 0,
          level: 4,
          description: 'Alcanzó el nivel 4 del multiverso'
        },
        {
          id: '8',
          date: formatDate(0), // Hoy
          action: 'Ganó puntos',
          points: 15,
          description: 'Puntos por actividad continua'
        },
        {
          id: '9',
          date: formatDate(0), // Hoy
          action: 'Subió de nivel',
          points: 0,
          level: 5,
          description: 'Alcanzó el nivel 5 del multiverso'
        },
        {
          id: '10',
          date: formatDate(0), // Hoy
          action: 'Ganó puntos',
          points: 25,
          description: 'Puntos por participación activa'
        }
      ];

      // Filtrar por período seleccionado
      const filteredHistory = selectedPeriod === 'weekly' 
        ? demoHistory.filter(item => {
            const itemDate = new Date(item.date);
            const now = new Date();
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return itemDate >= weekAgo;
          })
        : demoHistory;

      setPersonalHistory(filteredHistory);
      setLoading(false);
    }, 1000);
  };

  // Cargar datos al cambiar el período
  useEffect(() => {
    loadData();
  }, [selectedPeriod]);

  return (
    <div className="min-h-screen w-full text-white">
      <Header />

      {/* Main Content */}
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]" 
              style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
            >
              Mi Historial
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Revisa tu historial personal de puntos, metas cumplidas y progreso en el sistema
            </p>
          </div>

          {/* Period Selector */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <span className="text-white font-semibold text-sm md:text-base">Ver historial:</span>
              <div className="bg-white/5 rounded-lg p-1 flex w-full md:w-auto">
                <button
                  onClick={() => setSelectedPeriod('weekly')}
                  className={`flex-1 md:flex-none px-4 md:px-6 py-3 rounded-md font-medium transition-all duration-300 text-sm md:text-base ${
                    selectedPeriod === 'weekly'
                      ? 'bg-[#fdd742] text-black'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Esta Semana
                </button>
                <button
                  onClick={() => setSelectedPeriod('monthly')}
                  className={`flex-1 md:flex-none px-4 md:px-6 py-3 rounded-md font-medium transition-all duration-300 text-sm md:text-base ${
                    selectedPeriod === 'monthly'
                      ? 'bg-[#fdd742] text-black'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Este Mes
                </button>
              </div>
            </div>
          </div>

          {/* Personal History Table */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="text-2xl font-bold text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {selectedPeriod === 'weekly' ? 'Historial de Esta Semana' : 'Historial de Este Mes'}
              </h2>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                <p className="text-gray-400">Cargando historial...</p>
              </div>
            ) : personalHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No hay actividad registrada</h3>
                <p className="text-gray-400 mb-4">
                  {selectedPeriod === 'weekly' 
                    ? 'No tienes actividad registrada esta semana.' 
                    : 'No tienes actividad registrada este mes.'
                  }
                </p>
                <button
                  onClick={loadData}
                  className="px-6 py-2 bg-[#fdd742] text-black rounded-lg hover:bg-[#fdd742]/80 transition-colors font-medium"
                >
                  Actualizar
                </button>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acción</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Puntos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nivel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {personalHistory.map((entry) => (
                      <tr key={entry.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{entry.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{entry.action}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-[#fdd742]">+{entry.points}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{entry.station || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{entry.level || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{entry.description}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                          </div>
                          
              {/* Mobile Cards */}
              <div className="md:hidden space-y-3 p-4">
                {personalHistory.map((entry) => (
                  <div key={entry.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-gray-300">{entry.date}</div>
                      <div className="text-sm font-semibold text-[#fdd742]">+{entry.points} pts</div>
                          </div>
                    <div className="text-sm font-medium text-white mb-1">{entry.action}</div>
                    <div className="text-xs text-gray-400 mb-2">{entry.description}</div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-300">
                        {entry.station && `Estación: ${entry.station}`}
                      </span>
                      <span className="text-gray-300">
                        {entry.level && `Nivel ${entry.level}`}
                      </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Personal Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#fdd742] mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {personalHistory.length}
              </div>
              <div className="text-gray-300 text-xs md:text-sm">
                {selectedPeriod === 'weekly' ? 'Actividades Esta Semana' : 'Actividades Este Mes'}
                </div>
              </div>
              
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {personalHistory.reduce((sum, entry) => sum + entry.points, 0)}
                </div>
              <div className="text-gray-300 text-xs md:text-sm">Puntos Totales</div>
              </div>
              
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 md:p-6 text-center sm:col-span-2 lg:col-span-1">
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
                {personalHistory.filter(entry => entry.station).length}
                </div>
              <div className="text-gray-300 text-xs md:text-sm">Estaciones Completadas</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}