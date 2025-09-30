import type { StationState } from './types';

export function getStationIconPath(base: string, state: StationState): string {
  // Mapeo específico para los nombres de archivos reales
  const fileMapping: { [key: string]: string } = {
    'Reactor': 'Reactor',
    'Stark': 'stark',
    'Jarvis': 'Jarvis',
    'Extremis': 'Extremis',
    'Ironlegion': 'Ironlegion',
    'Vibranium': 'Vibranium',
    'Torre': 'Torre',
    'Pepper': 'Pepper',
    'Prueba': 'Prueba',
    'Repulsores': 'Repulsores',
    'Mark': 'Mark',
    'Multiverso': 'Multiverso'
  };
  
  const actualFileName = fileMapping[base] || base;
  
  if (state === 'off') {
    // Para estaciones apagadas, usar imágenes en blanco
    // Algunos archivos tienen -B.png y otros -b.png
    if (actualFileName === 'Extremis') {
      return `/pasaporte/estaciones/Blanco/${actualFileName}-B.png`;
    }
    return `/pasaporte/estaciones/Blanco/${actualFileName}-b.png`;
  }
  
  if (state === 'on') {
    // Para estaciones activas, usar imágenes doradas
    // Some files have -D.png and others -d.png, need to check actual files
    // Based on latest file check, Extremis and Ironlegion are -D.png, others are -d.png
    if (actualFileName === 'Extremis' || actualFileName === 'Ironlegion') {
      return `/pasaporte/estaciones/Dorado/${actualFileName}-D.png`;
    }
    return `/pasaporte/estaciones/Dorado/${actualFileName}-d.png`;
  }
  
  // Para hover, usar imágenes blancas
  if (actualFileName === 'Extremis') {
    return `/pasaporte/estaciones/Blanco/${actualFileName}-B.png`;
  }
  return `/pasaporte/estaciones/Blanco/${actualFileName}-b.png`;
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
