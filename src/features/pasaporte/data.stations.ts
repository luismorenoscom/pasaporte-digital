import type { Station } from './types';

export const STATIONS: Station[] = [
  // Columna izquierda
  { id:'reactor',    name:'Reactor Arc',           type:'station', xPct: 6,   yPct: 33, iconBase:'reactor',      stationIcon:'/pasaporte/estaciones/blanco/reactor-b.png', requiredPoints: 50 },
  { id:'stark',      name:'Stark Industries',      type:'station', xPct: 11,yPct: 47, iconBase:'stark',      stationIcon:'/pasaporte/estaciones/blanco/stark-b.png', requiredPoints: 100 },
  { id:'jarvis',     name:'Jarvis',                type:'station', xPct: 8,yPct: 64, iconBase:'jarvis',       stationIcon:'/pasaporte/estaciones/blanco/jarvis-b.png', requiredPoints: 150 },
  { id:'ironmonger', name:'Iron Monger',           type:'boss',    xPct: 6,yPct: 77, vsIcon:'/pasaporte/vs/vs-ironmonger.png', requiredPoints: 200 },

  // Arco inferior hacia el centro
  { id:'extremis',   name:'Extremis',              type:'station', xPct: 21,yPct: 85.5, iconBase:'extremis',   stationIcon:'/pasaporte/estaciones/blanco/extremis-b.png', requiredPoints: 260 },
  { id:'ironlegion', name:'Iron Legion',           type:'station', xPct: 35.5,yPct: 82, iconBase:'ironlegion', stationIcon:'/pasaporte/estaciones/blanco/ironlegion-b.png', requiredPoints: 320 },
  { id:'vibranium',  name:'Vibranium',             type:'station', xPct: 48,yPct: 84.5, iconBase:'vibranium',  stationIcon:'/pasaporte/estaciones/blanco/vibranium-b.png', requiredPoints: 380 },

  // Centro-derecha ascendente
  { id:'whiplash',   name:'Whiplash',              type:'boss',    xPct: 50,yPct: 71, vsIcon:'/pasaporte/vs/vs-whiplash.png', requiredPoints: 440 },
  { id:'torre',      name:'Torre Stark',           type:'station', xPct: 53,yPct: 55, iconBase:'torre',      stationIcon:'/pasaporte/estaciones/blanco/torre-b.png', requiredPoints: 500 },
  { id:'pepper',     name:'Rescate Pepper',        type:'station', xPct: 58.5,yPct: 33, iconBase:'pepper',     stationIcon:'/pasaporte/estaciones/blanco/pepper-b.png', requiredPoints: 560 },
  { id:'prueba',     name:'Vuelo de Prueba',       type:'station', xPct: 71,yPct: 17, iconBase:'prueba',     stationIcon:'/pasaporte/estaciones/blanco/prueba-b.png', requiredPoints: 620 },

  // Cúspide derecha
  { id:'aldrich',    name:'Aldrich Killian',       type:'boss',    xPct: 82,yPct: 14.5, vsIcon:'/pasaporte/vs/vs-eldrich.png', requiredPoints: 680 },

  // Descenso lado derecho
  { id:'repulsores', name:'Repulsores',            type:'station', xPct: 91,yPct: 28, iconBase:'repulsores', stationIcon:'/pasaporte/estaciones/blanco/repulsores-b.png', requiredPoints: 740 },
  { id:'mark',       name:'Innovación Mark I–VII', type:'station', xPct: 92.5,yPct: 47.5, iconBase:'mark',       stationIcon:'/pasaporte/estaciones/blanco/mark-b.png', requiredPoints: 800 },
  { id:'multiverso', name:'Multiverso',            type:'station', xPct: 81,yPct: 63.8, iconBase:'multiverso', stationIcon:'/pasaporte/estaciones/blanco/multiverso-b.png', requiredPoints: 860 },

  // Base derecha
  { id:'thanos',     name:'Thanos',                type:'boss',    xPct: 77,yPct: 85, vsIcon:'/pasaporte/vs/vs-thanos.png', requiredPoints: 920 },
];
