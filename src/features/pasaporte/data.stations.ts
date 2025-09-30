import type { Station } from './types';

export const STATIONS: Station[] = [
  // Columna izquierda
  { id:'reactor',    name:'Reactor Arc',           type:'station', xPct: 6,   yPct: 33, iconBase:'Reactor',      stationIcon:'/pasaporte/estaciones/Blanco/Reactor-b.png', requiredPoints: 50 },
  { id:'stark',      name:'Stark Industries',      type:'station', xPct: 11,yPct: 47, iconBase:'Stark',      stationIcon:'/pasaporte/estaciones/Blanco/stark-b.png', requiredPoints: 100 },
  { id:'jarvis',     name:'Jarvis',                type:'station', xPct: 8,yPct: 64, iconBase:'Jarvis',       stationIcon:'/pasaporte/estaciones/Blanco/Jarvis-b.png', requiredPoints: 150 },
  { id:'ironmonger', name:'Iron Monger',           type:'boss',    xPct: 6,yPct: 77, vsIcon:'/pasaporte/vs/VS-ironmonger.png', requiredPoints: 200 },

  // Arco inferior hacia el centro
  { id:'extremis',   name:'Extremis',              type:'station', xPct: 21,yPct: 85.5, iconBase:'Extremis',   stationIcon:'/pasaporte/estaciones/Blanco/Extremis-b.png', requiredPoints: 260 },
  { id:'ironlegion', name:'Iron Legion',           type:'station', xPct: 35.5,yPct: 82, iconBase:'Ironlegion', stationIcon:'/pasaporte/estaciones/Blanco/Ironlegion-b.png', requiredPoints: 320 },
  { id:'vibranium',  name:'Vibranium',             type:'station', xPct: 48,yPct: 84.5, iconBase:'Vibranium',  stationIcon:'/pasaporte/estaciones/Blanco/Vibranium-b.png', requiredPoints: 380 },

  // Centro-derecha ascendente
  { id:'whiplash',   name:'Whiplash',              type:'boss',    xPct: 50,yPct: 71, vsIcon:'/pasaporte/vs/VS-whiplash.png', requiredPoints: 440 },
  { id:'torre',      name:'Torre Stark',           type:'station', xPct: 53,yPct: 55, iconBase:'Torre',      stationIcon:'/pasaporte/estaciones/Blanco/Torre-b.png', requiredPoints: 500 },
  { id:'pepper',     name:'Rescate Pepper',        type:'station', xPct: 58.5,yPct: 33, iconBase:'Pepper',     stationIcon:'/pasaporte/estaciones/Blanco/Pepper-b.png', requiredPoints: 560 },
  { id:'prueba',     name:'Vuelo de Prueba',       type:'station', xPct: 71,yPct: 17, iconBase:'Prueba',     stationIcon:'/pasaporte/estaciones/Blanco/Prueba-b.png', requiredPoints: 620 },

  // Cúspide derecha
  { id:'aldrich',    name:'Aldrich Killian',       type:'boss',    xPct: 82,yPct: 14.5, vsIcon:'/pasaporte/vs/VS-eldrich.png', requiredPoints: 680 },

  // Descenso lado derecho
  { id:'repulsores', name:'Repulsores',            type:'station', xPct: 91,yPct: 28, iconBase:'Repulsores', stationIcon:'/pasaporte/estaciones/Blanco/Repulsores-b.png', requiredPoints: 740 },
  { id:'mark',       name:'Innovación Mark I–VII', type:'station', xPct: 92.5,yPct: 47.5, iconBase:'Mark',       stationIcon:'/pasaporte/estaciones/Blanco/Mark-b.png', requiredPoints: 800 },
  { id:'multiverso', name:'Multiverso',            type:'station', xPct: 81,yPct: 63.8, iconBase:'Multiverso', stationIcon:'/pasaporte/estaciones/Blanco/Multiverso-b.png', requiredPoints: 860 },

  // Base derecha
  { id:'thanos',     name:'Thanos',                type:'boss',    xPct: 77,yPct: 85, vsIcon:'/pasaporte/vs/VS-thanos.png', requiredPoints: 920 },
];
