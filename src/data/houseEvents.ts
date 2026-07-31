import { HouseEvent } from '../types';

export const HOUSE_EVENTS: HouseEvent[] = [
  {
    id: 'dance_party',
    title: '¡Fiesta de Baile en la Sala!',
    description: 'La música retumba en la casa de Silvia. ¡Todos deben bailar durante 15 segundos!',
    presenterDialogue: '¡Atención a todos en la Casa de Silvia! Se activa la FIESTA DE BAILE REVOLUCIONARIA. ¡Todo el mundo de pie a bailar ya!',
    actionType: 'dance_party',
    durationSeconds: 15,
    icon: '🎉'
  },
  {
    id: 'ice_cream',
    title: '¡Hora del Helado de Menta!',
    description: 'Silvia invita un helado sorpresa. El jugador con menos estrellas gana 2 Estrellas gratis.',
    presenterDialogue: '¡Súper bonificación familiar! Silvia trajo helado para todos. ¡Gana estrellas extra el que más ayuda necesita!',
    actionType: 'ice_cream',
    durationSeconds: 10,
    icon: '🍦'
  },
  {
    id: 'blackout',
    title: '¡Se Fue la Luz en la Casa!',
    description: '¡Oscuridad temporal! Todos los retos del siguiente minuto dan el doble de estrellas.',
    presenterDialogue: '¡Cuidado! Se fue la luz en el pasillo de la casa. ¡El siguiente reto otorgará el DOBLE DE ESTRELLAS!',
    actionType: 'blackout',
    durationSeconds: 15,
    icon: '💡'
  },
  {
    id: 'rain',
    title: '¡Lluvia Repentina en el Patio!',
    description: '¡Córranle al techo! El primero que toque un cojín o almohada gana una estrella rápida.',
    presenterDialogue: '¡Está lloviendo en el patio de la casa! ¡Córranle todos a tocar un cojín en 10 segundos!',
    actionType: 'rain',
    durationSeconds: 10,
    icon: '🌧️'
  },
  {
    id: 'naughty_dog',
    title: '¡El Perro Travieso de Silvia!',
    description: 'El perro mordió el dado y hace avanzar 3 casillas extra al jugador actual.',
    presenterDialogue: '¡Llegó el perrito travieso corriendo por la cocina y empujó la ficha! ¡Avanzas 3 casillas bonus!',
    actionType: 'naughty_dog',
    durationSeconds: 8,
    icon: '🐶'
  },
  {
    id: 'cat_steals',
    title: '¡El Gato Escondió las Fichas!',
    description: 'El gato de la casa tiró todo. ¡Todos los jugadores intercambian 1 posición!',
    presenterDialogue: '¡Miau! El gato de Silvia saltó a la mesa y desordenó el tablero. ¡Sorpresa de posiciones!',
    actionType: 'cat_steals',
    durationSeconds: 10,
    icon: '🐱'
  },
  {
    id: 'robot_mode',
    title: '¡Modo Robot en la Casa!',
    description: '¡Todos deben moverse y hablar como robots durante los próximos 2 turnos!',
    presenterDialogue: '¡Alerta de cortocircuito! Durante las siguientes pruebas, ¡TODOS deben actuar como robots con voz metálica!',
    actionType: 'robot_mode',
    durationSeconds: 12,
    icon: '🤖'
  },
  {
    id: 'sing_mode',
    title: '¡Modo Cantante Operístico!',
    description: 'Nadie puede hablar normal. ¡Cualquier respuesta o risa debe ser CANTADA!',
    presenterDialogue: '¡Bienvenidos al concierto de la casa de Silvia! Todo lo que digan debe ser CANTADO como en la ópera.',
    actionType: 'sing_mode',
    durationSeconds: 12,
    icon: '🎶'
  },
  {
    id: 'slow_motion',
    title: '¡Cámara Lenta Extrema!',
    description: 'Todos deben hacer sus movimientos como si estuvieran flotando en la luna.',
    presenterDialogue: '¡Tiempo en cámara lenta! Muévanse despacito... muy despacito... ¡como astronautas flotando!',
    actionType: 'slow_motion',
    durationSeconds: 15,
    icon: '🐢'
  }
];
