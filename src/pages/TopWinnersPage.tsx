import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';

interface Winner {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  completedStations: number;
  totalStations: number;
  progressPercentage: number;
  lastActivity: string;
  rank: number;
}

interface WinnerHistory {
  id: string;
  winnerId: string;
  action: string;
  pointsEarned: number;
  stationCompleted?: string;
  date: string;
  description: string;
}

export default function TopWinnersPage() {
  const { user } = useApp();
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Datos de ejemplo para el top 10 de ganadores
  const [winners] = useState<Winner[]>([
    {
      id: '1',
      name: 'Luis Moreno',
      email: 'lms@luismorenos.com',
      points: 1250,
      level: 8,
      completedStations: 14,
      totalStations: 16,
      progressPercentage: 87.5,
      lastActivity: '2024-01-15T10:30:00Z',
      rank: 1
    },
    {
      id: '2',
      name: 'Carlos Gonzales',
      email: 'carlos@luismorenos.com',
      points: 980,
      level: 6,
      completedStations: 12,
      totalStations: 16,
      progressPercentage: 75,
      lastActivity: '2024-01-14T15:20:00Z',
      rank: 2
    },
    {
      id: '3',
      name: 'Ana Martínez',
      email: 'ana@empresa.com',
      points: 850,
      level: 5,
      completedStations: 10,
      totalStations: 16,
      progressPercentage: 62.5,
      lastActivity: '2024-01-13T09:15:00Z',
      rank: 3
    },
    {
      id: '4',
      name: 'Roberto Silva',
      email: 'roberto@empresa.com',
      points: 720,
      level: 4,
      completedStations: 9,
      totalStations: 16,
      progressPercentage: 56.25,
      lastActivity: '2024-01-12T14:45:00Z',
      rank: 4
    },
    {
      id: '5',
      name: 'María López',
      email: 'maria@empresa.com',
      points: 680,
      level: 4,
      completedStations: 8,
      totalStations: 16,
      progressPercentage: 50,
      lastActivity: '2024-01-11T11:30:00Z',
      rank: 5
    },
    {
      id: '6',
      name: 'Diego Ramírez',
      email: 'diego@empresa.com',
      points: 620,
      level: 3,
      completedStations: 7,
      totalStations: 16,
      progressPercentage: 43.75,
      lastActivity: '2024-01-10T16:20:00Z',
      rank: 6
    },
    {
      id: '7',
      name: 'Sofia Herrera',
      email: 'sofia@empresa.com',
      points: 580,
      level: 3,
      completedStations: 6,
      totalStations: 16,
      progressPercentage: 37.5,
      lastActivity: '2024-01-09T13:10:00Z',
      rank: 7
    },
    {
      id: '8',
      name: 'Miguel Torres',
      email: 'miguel@empresa.com',
      points: 520,
      level: 3,
      completedStations: 5,
      totalStations: 16,
      progressPercentage: 31.25,
      lastActivity: '2024-01-08T08:45:00Z',
      rank: 8
    },
    {
      id: '9',
      name: 'Laura Jiménez',
      email: 'laura@empresa.com',
      points: 480,
      level: 2,
      completedStations: 4,
      totalStations: 16,
      progressPercentage: 25,
      lastActivity: '2024-01-07T12:15:00Z',
      rank: 9
    },
    {
      id: '10',
      name: 'Andrés Castro',
      email: 'andres@empresa.com',
      points: 420,
      level: 2,
      completedStations: 3,
      totalStations: 16,
      progressPercentage: 18.75,
      lastActivity: '2024-01-06T17:30:00Z',
      rank: 10
    }
  ]);

  // Historial completo para todos los participantes
  const [winnerHistory] = useState<WinnerHistory[]>([
    // Luis Moreno (1er lugar)
    {
      id: '1',
      winnerId: '1',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-15T10:30:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '2',
      winnerId: '1',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-14T15:20:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '3',
      winnerId: '1',
      action: 'bonus_points',
      pointsEarned: 25,
      date: '2024-01-14T15:25:00Z',
      description: 'Puntos bonus por completar múltiples estaciones'
    },
    {
      id: '4',
      winnerId: '1',
      action: 'station_completed',
      pointsEarned: 60,
      stationCompleted: 'Jarvis',
      date: '2024-01-13T09:15:00Z',
      description: 'Completó la estación Jarvis'
    },
    {
      id: '5',
      winnerId: '1',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-12T14:45:00Z',
      description: 'Subió al nivel 8'
    },
    {
      id: '6',
      winnerId: '1',
      action: 'station_completed',
      pointsEarned: 80,
      stationCompleted: 'Iron Monger',
      date: '2024-01-11T16:30:00Z',
      description: 'Completó la estación Iron Monger'
    },
    {
      id: '7',
      winnerId: '1',
      action: 'station_completed',
      pointsEarned: 70,
      stationCompleted: 'Extremis',
      date: '2024-01-10T11:45:00Z',
      description: 'Completó la estación Extremis'
    },

    // Carlos Gonzales (2do lugar)
    {
      id: '8',
      winnerId: '2',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-14T14:20:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '9',
      winnerId: '2',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-13T09:15:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '10',
      winnerId: '2',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-12T16:30:00Z',
      description: 'Subió al nivel 6'
    },
    {
      id: '11',
      winnerId: '2',
      action: 'station_completed',
      pointsEarned: 60,
      stationCompleted: 'Jarvis',
      date: '2024-01-11T13:20:00Z',
      description: 'Completó la estación Jarvis'
    },
    {
      id: '12',
      winnerId: '2',
      action: 'bonus_points',
      pointsEarned: 30,
      date: '2024-01-10T10:15:00Z',
      description: 'Puntos bonus por actividad constante'
    },

    // Ana Martínez (3er lugar)
    {
      id: '13',
      winnerId: '3',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-13T09:15:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '14',
      winnerId: '3',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-12T14:45:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '15',
      winnerId: '3',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-11T11:30:00Z',
      description: 'Subió al nivel 5'
    },
    {
      id: '16',
      winnerId: '3',
      action: 'station_completed',
      pointsEarned: 60,
      stationCompleted: 'Jarvis',
      date: '2024-01-10T16:20:00Z',
      description: 'Completó la estación Jarvis'
    },

    // Roberto Silva (4to lugar)
    {
      id: '17',
      winnerId: '4',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-12T14:45:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '18',
      winnerId: '4',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-11T10:30:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '19',
      winnerId: '4',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-10T15:15:00Z',
      description: 'Subió al nivel 4'
    },
    {
      id: '20',
      winnerId: '4',
      action: 'station_completed',
      pointsEarned: 60,
      stationCompleted: 'Jarvis',
      date: '2024-01-09T13:45:00Z',
      description: 'Completó la estación Jarvis'
    },

    // María López (5to lugar)
    {
      id: '21',
      winnerId: '5',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-11T11:30:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '22',
      winnerId: '5',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-10T14:20:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '23',
      winnerId: '5',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-09T16:30:00Z',
      description: 'Subió al nivel 4'
    },

    // Diego Ramírez (6to lugar)
    {
      id: '24',
      winnerId: '6',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-10T16:20:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '25',
      winnerId: '6',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-09T12:15:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '26',
      winnerId: '6',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-08T15:45:00Z',
      description: 'Subió al nivel 3'
    },

    // Sofia Herrera (7mo lugar)
    {
      id: '27',
      winnerId: '7',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-09T13:10:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '28',
      winnerId: '7',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-08T11:30:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '29',
      winnerId: '7',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-07T14:20:00Z',
      description: 'Subió al nivel 3'
    },

    // Miguel Torres (8vo lugar)
    {
      id: '30',
      winnerId: '8',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-08T08:45:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '31',
      winnerId: '8',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-07T16:15:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '32',
      winnerId: '8',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-06T13:30:00Z',
      description: 'Subió al nivel 3'
    },

    // Laura Jiménez (9no lugar)
    {
      id: '33',
      winnerId: '9',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-07T12:15:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '34',
      winnerId: '9',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-06T10:45:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '35',
      winnerId: '9',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-05T15:20:00Z',
      description: 'Subió al nivel 2'
    },

    // Andrés Castro (10mo lugar)
    {
      id: '36',
      winnerId: '10',
      action: 'station_completed',
      pointsEarned: 50,
      stationCompleted: 'Reactor Arc',
      date: '2024-01-06T17:30:00Z',
      description: 'Completó la estación Reactor Arc'
    },
    {
      id: '37',
      winnerId: '10',
      action: 'station_completed',
      pointsEarned: 75,
      stationCompleted: 'Stark Industries',
      date: '2024-01-05T14:10:00Z',
      description: 'Completó la estación Stark Industries'
    },
    {
      id: '38',
      winnerId: '10',
      action: 'level_up',
      pointsEarned: 100,
      date: '2024-01-04T12:30:00Z',
      description: 'Subió al nivel 2'
    }
  ]);

  const filteredHistory = selectedWinner 
    ? winnerHistory.filter(entry => entry.winnerId === selectedWinner.id)
    : [];

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHistory = filteredHistory.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'station_completed':
        return '●';
      case 'bonus_points':
        return '★';
      case 'level_up':
        return '▲';
      default:
        return '●';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'station_completed':
        return 'text-green-400 bg-green-400/20';
      case 'bonus_points':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'level_up':
        return 'text-blue-400 bg-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen w-full text-white">
      <Header />

      {/* Main Content */}
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]" 
                style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Top de Ganadores
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Supervisa el rendimiento de tus empleados y verifica el progreso de los mejores competidores
            </p>
          </div>

          {/* Podium Style Layout */}
          <div className="space-y-8">
            {/* Top 3 Podium */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-8 text-[#fdd742] text-center" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>🏆 Podium de Ganadores</h2>
              
              <div className="flex justify-center items-end space-x-4 mb-8">
                {/* 2nd Place */}
                {winners[1] && (
                  <div 
                    className={`bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-xl p-4 w-32 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedWinner?.id === winners[1].id ? 'ring-4 ring-[#fdd742]' : ''
                    }`}
                    onClick={() => setSelectedWinner(winners[1])}
                  >
                    <div className="text-center text-gray-800">
                      <div className="text-2xl mb-2">🥈</div>
                      <div className="font-bold text-sm truncate">{winners[1].name}</div>
                      <div className="text-xs">{winners[1].points} pts</div>
                    </div>
                  </div>
                )}
                
                {/* 1st Place */}
                <div 
                  className={`bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-t-xl p-6 w-40 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedWinner?.id === winners[0].id ? 'ring-4 ring-[#fdd742]' : ''
                  }`}
                  onClick={() => setSelectedWinner(winners[0])}
                >
                  <div className="text-center text-gray-800">
                    <div className="text-3xl mb-2">🥇</div>
                    <div className="font-bold text-lg truncate">{winners[0].name}</div>
                    <div className="text-sm font-semibold">{winners[0].points} pts</div>
                    <div className="text-xs">Nivel {winners[0].level}</div>
                  </div>
                </div>
                
                {/* 3rd Place */}
                {winners[2] && (
                  <div 
                    className={`bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-xl p-4 w-32 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedWinner?.id === winners[2].id ? 'ring-4 ring-[#fdd742]' : ''
                    }`}
                    onClick={() => setSelectedWinner(winners[2])}
                  >
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2">🥉</div>
                      <div className="font-bold text-sm truncate">{winners[2].name}</div>
                      <div className="text-xs">{winners[2].points} pts</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rest of Top 10 - Compact Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {winners.slice(3).map((winner) => (
                <div 
                  key={winner.id}
                  className={`bg-gray-700/50 rounded-lg p-3 border cursor-pointer transition-all duration-300 hover:bg-gray-600/50 hover:scale-105 ${
                    selectedWinner?.id === winner.id 
                      ? 'border-[#fdd742] bg-[#fdd742]/10' 
                      : 'border-gray-600'
                  }`}
                  onClick={() => setSelectedWinner(winner)}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#fdd742] mb-1">#{winner.rank}</div>
                    <div className="text-white font-semibold text-sm truncate mb-1">{winner.name}</div>
                    <div className="text-[#fdd742] font-bold text-xs">{winner.points} pts</div>
                    <div className="text-gray-400 text-xs">Nivel {winner.level}</div>
                    <div className="mt-2 w-full bg-gray-600 rounded-full h-1">
                      <div 
                        className="bg-gradient-to-r from-[#fdd742] to-[#ff6b35] h-1 rounded-full transition-all duration-500"
                        style={{ width: `${winner.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Winner Details Modal */}
            {selectedWinner && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {getRankIcon(selectedWinner.rank)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>{selectedWinner.name}</h2>
                      <p className="text-gray-400">{selectedWinner.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedWinner(null)}
                    className="text-gray-400 hover:text-white transition-colors text-xl"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-4 text-center">
                    <div className="text-[#fdd742] font-bold text-2xl" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>{selectedWinner.points}</div>
                    <div className="text-gray-300 text-sm">Puntos</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-4 text-center">
                    <div className="text-[#fdd742] font-bold text-2xl" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>{selectedWinner.level}</div>
                    <div className="text-gray-300 text-sm">Nivel</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-4 text-center">
                    <div className="text-[#fdd742] font-bold text-2xl" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>{selectedWinner.completedStations}</div>
                    <div className="text-gray-300 text-sm">Estaciones</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-4 text-center">
                    <div className="text-[#fdd742] font-bold text-2xl" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>{selectedWinner.progressPercentage}%</div>
                    <div className="text-gray-300 text-sm">Progreso</div>
                  </div>
                </div>
                
                {/* History Timeline */}
                <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
                  <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>📈 Historial de Victorias</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {currentHistory.length > 0 ? (
                      currentHistory.map((entry) => (
                        <div key={entry.id} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-white text-lg font-bold">{getActionIcon(entry.action)}</div>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">{entry.description}</div>
                            {entry.stationCompleted && (
                              <div className="text-gray-400 text-xs">Estación: {entry.stationCompleted}</div>
                            )}
                            <div className="text-gray-500 text-xs">{formatDate(entry.date)}</div>
                          </div>
                          <div className="text-[#fdd742] font-bold text-sm">+{entry.pointsEarned}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-400">
                        No hay historial disponible
                      </div>
                    )}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-4 pt-4 border-t border-gray-600">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                      >
                        ‹ Anterior
                      </button>
                      <span className="px-3 py-1 text-sm text-gray-400">
                        {currentPage} de {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                      >
                        Siguiente ›
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
