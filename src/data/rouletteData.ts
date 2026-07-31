import { RouletteOption } from '../types';

export const ROULETTE_OPTIONS: RouletteOption[] = [
  {
    id: 'advance_3',
    title: 'Avanza 3 Casillas',
    icon: '⭐',
    color: '#F59E0B',
    bgGradient: 'from-amber-500 via-yellow-400 to-amber-600',
    description: '¡La suerte te sonríe! Tu ficha sale volando 3 casillas adelante en la casa.',
    presenterPhrase: '¡Gran acelerón! ¡La ruleta te impulsa 3 casillas hacia adelante!'
  },
  {
    id: 'gain_star',
    title: 'Gana una Estrella',
    icon: '🎁',
    color: '#10B981',
    bgGradient: 'from-emerald-500 via-teal-400 to-emerald-600',
    description: '¡Regalo estelar directo! Sumas +1 Estrella dorada a tu marcador sin reto.',
    presenterPhrase: '¡Cofre sorpresa de la ruleta! ¡Te llevas 1 estrella gratis!'
  },
  {
    id: 'all_play',
    title: '¡Todos Juegan!',
    icon: '🎉',
    color: '#EC4899',
    bgGradient: 'from-pink-500 via-rose-400 to-pink-600',
    description: '¡Frenesí familiar! En la siguiente ronda, toda la familia juega al mismo tiempo.',
    presenterPhrase: '¡Atención a toda la casa! La ruleta ordenó que ¡TODOS JUEGAN!'
  },
  {
    id: 'flash_challenge',
    title: 'Reto Relámpago (15s)',
    icon: '⚡',
    color: '#EAB308',
    bgGradient: 'from-yellow-400 via-amber-300 to-yellow-500',
    description: '¡Velocidad extrema! Tendrás solo 15 segundos para completar el próximo reto.',
    presenterPhrase: '¡Alerta de velocidad! Reloj acelerado a 15 segundos.'
  },
  {
    id: 'swap_position',
    title: 'Cambio de Lugar',
    icon: '🌀',
    color: '#8B5CF6',
    bgGradient: 'from-purple-500 via-indigo-400 to-purple-700',
    description: '¡Remolino mágico! Intercambias lugar en el tablero con el jugador que va más adelante.',
    presenterPhrase: '¡Teletransportación! Intercambias posición con tu rival.'
  },
  {
    id: 'laugh_round',
    title: 'Ronda de Risa',
    icon: '😂',
    color: '#EF4444',
    bgGradient: 'from-red-500 via-orange-400 to-red-600',
    description: '¡Resiste los chistes! Aguanta 20 segundos sin soltar una carcajada frente a la familia.',
    presenterPhrase: '¡Risa Prohibida! Muestra tu rostro más serio o pierde la postura.'
  },
  {
    id: 'coop_challenge',
    title: 'Desafío Cooperativo',
    icon: '🤝',
    color: '#06B6D4',
    bgGradient: 'from-cyan-500 via-sky-400 to-blue-600',
    description: '¡Trabajo en equipo! Elige a un compañero; si lo logran juntos, ¡ambos ganan estrella!',
    presenterPhrase: '¡Unión de héroes! Elige a un aliado para ganar estrellas en pareja.'
  },
  {
    id: 'minigame_surprise',
    title: 'Minijuego Sorpresa',
    icon: '🎲',
    color: '#3B82F6',
    bgGradient: 'from-blue-600 via-indigo-500 to-cyan-500',
    description: '¡Duelo en la pantalla de la TV! Ahorcado o Memoria de la casa instantáneo.',
    presenterPhrase: '¡Pantalla encendida! Entras al Minijuego Sorpresa de la Casa.'
  }
];
