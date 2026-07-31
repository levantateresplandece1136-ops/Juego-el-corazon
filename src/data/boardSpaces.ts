import { BoardSpace, HouseRoom } from '../types';

export const ROOM_THEMES: Record<HouseRoom, { title: string; color: string; icon: string; bgGradient: string }> = {
  Sala: { title: 'La Sala Principal', color: '#f59e0b', icon: '🛋️', bgGradient: 'from-amber-600/30 to-orange-700/40' },
  Comedor: { title: 'El Comedor Familiar', color: '#ef4444', icon: '🍽️', bgGradient: 'from-red-600/30 to-amber-700/40' },
  Cocina: { title: 'La Cocina Mágica', color: '#10b981', icon: '🍳', bgGradient: 'from-emerald-600/30 to-teal-700/40' },
  Patio: { title: 'El Patio Verde', color: '#84cc16', icon: '🌿', bgGradient: 'from-lime-600/30 to-green-700/40' },
  Recámara: { title: 'La Recámara de Juegos', color: '#8b5cf6', icon: '🛏️', bgGradient: 'from-purple-600/30 to-indigo-700/40' },
  Baño: { title: 'El Baño Burbujeante', color: '#06b6d4', icon: '🛁', bgGradient: 'from-cyan-600/30 to-blue-700/40' },
  Garage: { title: 'El Garage de Sorpresas', color: '#64748b', icon: '🚗', bgGradient: 'from-slate-600/30 to-zinc-700/40' },
  Azotea: { title: 'La Azotea de las Estrellas', color: '#ec4899', icon: '⭐', bgGradient: 'from-pink-600/30 to-rose-700/40' }
};

export const BOARD_SPACES: BoardSpace[] = [
  // SALA (0-4)
  { id: 0, room: 'Sala', title: 'Entrada de la Casa de Silvia', type: 'reto_solo', icon: '🚪', color: '#f59e0b', description: '¡Bienvenidos a la Casa de Silvia! La aventura empieza aquí.' },
  { id: 1, room: 'Sala', title: 'Sillón Reclinable', type: 'reto_solo', icon: '🛋️', color: '#3b82f6', description: 'Reto de movimiento o velocidad en el centro de la sala.' },
  { id: 2, room: 'Sala', title: 'Casilla Estrella', type: 'estrella', icon: '⭐', color: '#eab308', description: '¡Felicidades! Ganas 1 Estrella Dorada automáticamente.', starBonus: true },
  { id: 3, room: 'Sala', title: 'Televisor Gigante', type: 'reto_dueto', icon: '📺', color: '#a855f7', description: 'Reto en equipo o duelo directo entre 2 jugadores.' },
  { id: 4, room: 'Sala', title: 'Cofre del Tesoro', type: 'cofre', icon: '🎁', color: '#10b981', description: '¡Cofre de la sala! Ganas 3 Monedas de Silvia.' },

  // COMEDOR (5-9)
  { id: 5, room: 'Comedor', title: 'Mesa de Comedor', type: 'reto_solo', icon: '🍽️', color: '#ef4444', description: 'Reto "Trae un Objeto" o "Dame Tres Cosas".' },
  { id: 6, room: 'Comedor', title: 'Evento Sorpresa', type: 'evento', icon: '⚡', color: '#f97316', description: '¡Atención! Ocurre un Evento Especial en la Casa.' },
  { id: 7, room: 'Comedor', title: 'Frutero Central', type: 'reto_todos', icon: '🍎', color: '#84cc16', description: '¡Reto Grupal! Todos participan al mismo tiempo.' },
  { id: 8, room: 'Comedor', title: 'Casilla Estrella', type: 'estrella', icon: '⭐', color: '#eab308', description: '¡Estrella brillante del Comedor!', starBonus: true },
  { id: 9, room: 'Comedor', title: 'Silla de Honor', type: 'reto_solo', icon: '🪑', color: '#ec4899', description: 'Reto de Mímica o Ahorcado Express.' },

  // COCINA (10-14)
  { id: 10, room: 'Cocina', title: 'Refrigerador Gigante', type: 'reto_solo', icon: '🧊', color: '#06b6d4', description: 'Reto de velocidad: Trae algo helado o de la cocina.' },
  { id: 11, room: 'Cocina', title: 'Ruleta Loca', type: 'ruleta', icon: '🎡', color: '#a855f7', description: 'Gira la ruleta de minijuegos locos.' },
  { id: 12, room: 'Cocina', title: 'Horno de Pastelitos', type: 'reto_dueto', icon: '🧁', color: '#f43f5e', description: 'Reto cooperativo entre 2 jugadores.' },
  { id: 13, room: 'Cocina', title: 'Casilla Estrella', type: 'estrella', icon: '⭐', color: '#eab308', description: '¡Estrella dorada crujiente!', starBonus: true },
  { id: 14, room: 'Cocina', title: 'Cofre del Chef', type: 'cofre', icon: '🎁', color: '#10b981', description: 'Cofre gastronómico: 2 Monedas y 1 Estrella.' },

  // PATIO (15-19)
  { id: 15, room: 'Patio', title: 'Jardín de Flores', type: 'reto_todos', icon: '🌸', color: '#10b981', description: '¡Reto de movimiento al aire libre! Todos saltan.' },
  { id: 16, room: 'Patio', title: 'Tobogán de la Casa', type: 'reto_solo', icon: '🛝', color: '#f97316', description: 'Avanzas 2 casillas extra si cumples el reto.' },
  { id: 17, room: 'Patio', title: 'Evento del Clima', type: 'evento', icon: '🌧️', color: '#3b82f6', description: 'Evento sorpresa del patio de la casa.' },
  { id: 18, room: 'Patio', title: 'Casilla Estrella', type: 'estrella', icon: '⭐', color: '#eab308', description: '¡Estrella del Jardín!', starBonus: true },
  { id: 19, room: 'Patio', title: 'Casa del Árbol', type: 'reto_dueto', icon: '🏡', color: '#84cc16', description: 'Duelo de agilidad o equilibrio.' },

  // RECÁMARA (20-24)
  { id: 20, room: 'Recámara', title: 'Cama Elástica', type: 'reto_solo', icon: '🛏️', color: '#8b5cf6', description: 'Reto de Risa Prohibida o Simón Dice.' },
  { id: 21, room: 'Recámara', title: 'Caja de Juguetes', type: 'reto_todos', icon: '🧸', color: '#ec4899', description: 'Reto "Trae un Peluche o Juguete".' },
  { id: 22, room: 'Recámara', title: 'Casilla Estrella', type: 'estrella', icon: '⭐', color: '#eab308', description: '¡Estrella Soñadora!', starBonus: true },
  { id: 23, room: 'Recámara', title: 'Ruleta Rúnica', type: 'ruleta', icon: '🎡', color: '#a855f7', description: 'La ruleta gira con desafíos misteriosos.' },
  { id: 24, room: 'Recámara', title: 'Cofre de Almohada', type: 'cofre', icon: '🎁', color: '#10b981', description: 'Cofre suave con 3 Monedas.' },

  // BAÑO (25-29)
  { id: 25, room: 'Baño', title: 'Tina de Bubbles', type: 'reto_solo', icon: '🛁', color: '#06b6d4', description: 'Reto "Dame Tres Cosas del Baño".' },
  { id: 26, room: 'Baño', title: 'Espejo Mágico', type: 'reto_dueto', icon: '🪞', color: '#3b82f6', description: 'Reto de Teléfono Descompuesto Corporal.' },
  { id: 27, room: 'Baño', title: 'Casilla Estrella', type: 'estrella', icon: '⭐', color: '#eab308', description: '¡Estrella de Espuma!', starBonus: true },
  { id: 28, room: 'Baño', title: 'Evento de Espuma', type: 'evento', icon: '⚡', color: '#f59e0b', description: '¡Evento Especial en el baño!' },
  { id: 29, room: 'Baño', title: 'Patito de Goma', type: 'reto_solo', icon: '🦆', color: '#eab308', description: 'Reto de imitación o cantar como pato.' },

  // GARAGE (30-34)
  { id: 30, room: 'Garage', title: 'Bicicleta Veloz', type: 'reto_solo', icon: '🚲', color: '#64748b', description: 'Reto de velocidad pura (10 o 20 segundos).' },
  { id: 31, room: 'Garage', title: 'Caja de Herramientas', type: 'reto_dueto', icon: '🧰', color: '#ef4444', description: 'Reto de construcción o trabajo en equipo.' },
  { id: 32, room: 'Garage', title: 'Casilla Estrella', type: 'estrella', icon: '⭐', color: '#eab308', description: '¡Estrella Metálica!', starBonus: true },
  { id: 33, room: 'Garage', title: 'Cofre de la Cochera', type: 'cofre', icon: '🎁', color: '#10b981', description: '¡Cofre de herramientas con 1 Estrella y 2 Monedas!' },
  { id: 34, room: 'Garage', title: 'Patineta Voladora', type: 'reto_todos', icon: '🛹', color: '#8b5cf6', description: '¡Reto Grupal de Baile y Saltos!' },

  // AZOTEA (35-39)
  { id: 35, room: 'Azotea', title: 'Telescopio Estelar', type: 'reto_solo', icon: '🔭', color: '#ec4899', description: 'Reto de memoria visual o adivinanza.' },
  { id: 36, room: 'Azotea', title: 'Casilla Estrella', type: 'estrella', icon: '⭐', color: '#eab308', description: '¡Estrella Suprema de la Azotea!', starBonus: true },
  { id: 37, room: 'Azotea', title: 'Evento Cósmico', type: 'evento', icon: '🌌', color: '#a855f7', description: '¡Gran evento estelar en la Casa de Silvia!' },
  { id: 38, room: 'Azotea', title: 'Banderín Dorado', type: 'reto_dueto', icon: '🚩', color: '#f59e0b', description: 'Último reto dueto antes de la meta.' },
  { id: 39, room: 'Azotea', title: '¡LA META DE LA CASA DE SILVIA!', type: 'estrella', icon: '🏆', color: '#eab308', description: '¡Felicidades! Todos han conquistado la Casa de Silvia.', starBonus: true }
];
