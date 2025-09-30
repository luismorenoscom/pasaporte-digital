import { useState, useMemo } from "react";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";
import { STATIONS } from "../features/pasaporte/data.stations";
import type { Station } from "../features/pasaporte/types";
import PassportCanvas from "../features/pasaporte/components/PassportCanvas";
import StationModal from "../features/pasaporte/components/StationModal";
import MinimalPassportHeader from "../components/MinimalPassportHeader";
import MinimalStationTabs from "../components/MinimalStationTabs";
import MinimalStationCard from "../components/MinimalStationCard";

export default function PasaporteDigitalPage() {
  const { user } = useApp();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStation(null);
  };

  // Calcular estadísticas
  const stats = useMemo(() => {
    const total = STATIONS.length;
    const completed = STATIONS.filter(station => user?.completedStationIds?.includes(station.id)).length;
    const unlocked = STATIONS.filter(station => {
      if (!user) return false;
      return !station.requiredPoints || user.points >= station.requiredPoints;
    }).length;
    const locked = total - unlocked;
    
    return { total, completed, unlocked, locked };
  }, [user?.completedStationIds, user?.points]);

  // Filtrar estaciones
  const filteredStations = useMemo(() => {
    if (!user) return STATIONS;
    
    switch (activeTab) {
      case 'completed':
        return STATIONS.filter(station => user.completedStationIds?.includes(station.id));
      case 'unlocked':
        return STATIONS.filter(station => {
          const isUnlocked = !station.requiredPoints || user.points >= station.requiredPoints;
          return isUnlocked && !user.completedStationIds?.includes(station.id);
        });
      case 'locked':
        return STATIONS.filter(station => station.requiredPoints && user.points < station.requiredPoints);
      default:
        return STATIONS;
    }
  }, [activeTab, user]);

  // Calcular puntos totales y nivel
  const totalPoints = user?.points || 0;
  const currentLevel = user?.level || 1;

  return (
    <div className="min-h-screen w-full text-white">
      <Header />

      {/* Main Content */}
      <main className="p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          {/* Mobile Header */}
          <div className="md:hidden">
            <MinimalPassportHeader
              totalStations={stats.total}
              completedStations={stats.completed}
              currentLevel={currentLevel}
              totalPoints={totalPoints}
            />
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Pasaporte Digital
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto whitespace-nowrap">
              Tu identidad digital en el multiverso. Accede a estaciones, demuestra tu valor y conquista nuevas dimensiones.
            </p>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden">
            <MinimalStationTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              stats={stats}
            />
          </div>

          {/* Mobile Station List */}
          <div className="md:hidden">
            <div className="space-y-2">
              {filteredStations.map((station) => {
                const isCompleted = user?.completedStationIds?.includes(station.id) || false;
                const isUnlocked = !station.requiredPoints || (user?.points || 0) >= station.requiredPoints;
                const points = station.type === 'boss' ? 100 : 50; // Puntos por defecto
                const level = station.type === 'boss' ? 5 : 3; // Nivel por defecto
                
                return (
                  <MinimalStationCard
                    key={station.id}
                    id={station.iconBase || station.id}
                    name={station.name}
                    description={station.type === 'boss' ? 'Jefe final' : 'Estación de entrenamiento'}
                    isCompleted={isCompleted}
                    isUnlocked={isUnlocked}
                    points={points}
                    level={level}
                    icon={station.iconBase || '⚡'}
                    stationType={station.type}
                    stationIcon={station.stationIcon}
                    vsIcon={station.vsIcon}
                    onStationClick={(iconBase) => {
                      const station = STATIONS.find(s => s.iconBase === iconBase);
                      if (station) handleStationClick(station);
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Desktop Map */}
          <div className="hidden md:block mb-8">
            <PassportCanvas
              stations={STATIONS}
              userPoints={user?.points || 0}
              completedStationIds={user?.completedStationIds || []}
              onStationClick={handleStationClick}
            />
          </div>

        </div>
      </main>

      {/* Modal de Estación */}
      <StationModal
        station={selectedStation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userPoints={user?.points || 0}
        completedStationIds={user?.completedStationIds || []}
      />
    </div>
  );
}
