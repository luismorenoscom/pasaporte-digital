import type { StationState } from './types';

export function getStationIconPath(base: string, state: StationState): string {
  // Normalizar nombre a minúsculas (todos los archivos están en lowercase ahora)
  const fileName = base.toLowerCase();
  
  if (state === 'off') {
    // Para estaciones apagadas, usar imágenes en blanco
    return `/pasaporte/estaciones/blanco/${fileName}-b.png`;
  }
  
  if (state === 'on') {
    // Para estaciones activas, usar imágenes doradas
    return `/pasaporte/estaciones/dorado/${fileName}-d.png`;
  }
  
  // Para hover, usar imágenes blancas
  return `/pasaporte/estaciones/blanco/${fileName}-b.png`;
}

export function getStationState(
  userPoints: number, 
  requiredPoints: number, 
  completedStationIds?: string[], 
  stationId?: string
): StationState {
  // Si existe completedStationIds y la estación está completada, está ON (dorado)
  if (completedStationIds && stationId && completedStationIds.includes(stationId)) {
    return 'on';
  }
  
  // Si tiene suficientes puntos pero no está completada, está AVAILABLE (gris)
  if (userPoints >= requiredPoints) {
    return 'available';
  }
  
  // Si no tiene suficientes puntos, está OFF (bloqueada)
  return 'off';
}

export function getStationStatusText(
  userPoints: number, 
  requiredPoints: number, 
  completedStationIds?: string[], 
  stationId?: string
): string {
  if (completedStationIds && stationId && completedStationIds.includes(stationId)) {
    return 'Completada';
  }
  
  if (userPoints >= requiredPoints) {
    return 'Disponible';
  }
  
  return 'Bloqueada';
}
