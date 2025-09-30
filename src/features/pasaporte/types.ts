export type StationType = 'station' | 'boss';

export interface Station {
  id: string;                // ej. 'reactor', 'stark'
  name: string;              // ej. 'Reactor Arc'
  type: StationType;         // 'station' | 'boss'
  xPct: number;              // posición relativa al fondo (0–100)
  yPct: number;              // posición relativa al fondo (0–100)
  requiredPoints?: number;   // umbral para desbloquear
  iconBase?: string;         // ej. 'Reactor', 'Stark', 'Jarvis' (para estaciones)
  stationIcon?: string;      // ruta al PNG de la estación (para estaciones normales)
  vsIcon?: string;           // ruta al PNG VS (para bosses)
  dependsOn?: string[];      // ids previas (opcional)
}

export interface User {
  id: string;
  email: string;
  points: number;
  level: number;
  completedStationIds?: string[];
  fotoPerfil?: string;
}

export type StationState = 'on' | 'off' | 'hover' | 'available';
