import { Challenge, ChallengeCategory } from '../types';

export const AHORCADO_WORDS_BANK: { word: string; category: string; hint: string }[] = [
  // ANIMALES
  { word: 'ELEFANTE', category: 'Animales', hint: 'Tiene una trompa gigante y orejas enormes.' },
  { word: 'JIRAFA', category: 'Animales', hint: 'Tiene un cuello súper largo para comer hojas de los árboles.' },
  { word: 'PINGÜINO', category: 'Animales', hint: 'Vive en el hielo y camina abriendo las alas.' },
  { word: 'CANGURO', category: 'Animales', hint: 'Lleva a su bebé en una bolsa y salta muy alto.' },
  { word: 'DELFIN', category: 'Animales', hint: 'Es inteligente, nada en el mar y hace acrobacias.' },
  { word: 'COCODRILO', category: 'Animales', hint: 'Tiene dientes afilados y vive en ríos.' },
  { word: 'LEON', category: 'Animales', hint: 'El rey de la selva con melena melenuda.' },
  { word: 'TIGRE', category: 'Animales', hint: 'Tiene rayas naranjas y negras en todo su cuerpo.' },
  { word: 'OSO PANDA', category: 'Animales', hint: 'Come bambú y es blanco con negro.' },
  { word: 'FLAMENCO', category: 'Animales', hint: 'Es rosa y se para en una sola pata.' },
  { word: 'CAMALEON', category: 'Animales', hint: 'Cambia de color según su entorno.' },
  { word: 'HIPOPOTAMO', category: 'Animales', hint: 'Le encanta estar en el lodo y es enorme.' },

  // OBJETOS Y CASA
  { word: 'REFRIGERADOR', category: 'Cosas de la Casa', hint: 'Mantiene la comida y las bebidas bien frías.' },
  { word: 'MICROONDAS', category: 'Cosas de la Casa', hint: 'Calienta la comida en segundos y hace pip-pip.' },
  { word: 'ALMOHADA', category: 'Cosas de la Casa', hint: 'Donde pones la cabeza para dormir agusto.' },
  { word: 'TELEVISOR', category: 'Cosas de la Casa', hint: 'Muestra caricaturas, juegos y películas.' },
  { word: 'VENTILADOR', category: 'Cosas de la Casa', hint: 'Gira sus aspas para dar aire fresco.' },
  { word: 'BICICLETA', category: 'Cosas de la Casa', hint: 'Tiene dos ruedas y pedales para pasear.' },
  { word: 'LAMPARA', category: 'Cosas de la Casa', hint: 'Da luz cuando oscurece la habitación.' },
  { word: 'ASPIRADORA', category: 'Cosas de la Casa', hint: 'Hace ruido y limpia el polvo del suelo.' },
  { word: 'CEPILLO', category: 'Cosas de la Casa', hint: 'Sirve para peinarse o lavarse los dientes.' },

  // COMIDA Y POSTRES
  { word: 'PIZZA', category: 'Comida', hint: 'Tiene queso derretido, salsa de tomate y rebanadas.' },
  { word: 'HAMBURGUESA', category: 'Comida', hint: 'Lleva carne, queso, lechuga y pan redondo.' },
  { word: 'HELADO', category: 'Comida', hint: 'Frío, dulce, viene en cono o vaso.' },
  { word: 'SPAGHETTI', category: 'Comida', hint: 'Tiras de pasta italiana con salsa roja.' },
  { word: 'PALOMITAS', category: 'Comida', hint: 'Explotan con calor y se comen en el cine.' },
  { word: 'CHOCOLATE', category: 'Comida', hint: 'Manjar dulce hecho de cacao.' },
  { word: 'TACOS', category: 'Comida', hint: 'Tortilla caliente con guisado y salsa.' },
  { word: 'DONAS', category: 'Comida', hint: 'Pan dulce redondo con un hoyo en medio.' },
  { word: 'HOT DOG', category: 'Comida', hint: 'Salchicha en pan caliente con aderezos.' },

  // FANTASÍA Y PERSONAJES
  { word: 'SUPERHEROE', category: 'Fantasía', hint: 'Tiene capa, súper poderes y salva al mundo.' },
  { word: 'UNICORNIO', category: 'Fantasía', hint: 'Caballo mágico con un cuerno brillante.' },
  { word: 'DRAGON', category: 'Fantasía', hint: 'Vuela, tiene escamas y echa fuego por la boca.' },
  { word: 'PIRATA', category: 'Fantasía', hint: 'Navega en barco con mapa del tesoro y loro.' },
  { word: 'ASTRONAUTA', category: 'Fantasía', hint: 'Viaja al espacio exterior en un cohete.' },
  { word: 'ROBOT', category: 'Fantasía', hint: 'Hecho de metal, cables y lucecitas.' },
  { word: 'DINOSAURIO', category: 'Fantasía', hint: 'Caminó por la Tierra hace millones de años.' },
  { word: 'MAGO', category: 'Fantasía', hint: 'Saca un conejo del sombrero con su varita.' }
];

export const RAW_CHALLENGES: Challenge[] = [
  // --- MOVIMIENTO ---
  {
    id: 'mov_1',
    title: '¡El Flamenco de Un Pie!',
    category: 'movimiento',
    durationSeconds: 30,
    instructions: 'Sostente en una sola pierna con los brazos abiertos como alas durante 30 segundos sin tocar el suelo.',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡A ver esa flexibilidad y temple! ¡No bajes la pata!'
  },
  {
    id: 'mov_2',
    title: '¡10 Saltos de Rana!',
    category: 'movimiento',
    durationSeconds: 20,
    instructions: 'Agáchate hasta el suelo y salta como rana gritando "¡CROAC!" en cada salto hasta completar 10.',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 2,
    presenterPhrase: '¡Salten ranitas de la casa de Silvia! ¡Queremos oír esos croac!'
  },
  {
    id: 'mov_3',
    title: '¡El Caminado del Pingüino!',
    category: 'movimiento',
    durationSeconds: 20,
    instructions: 'Junta los tobillos, pega los brazos al cuerpo y da 10 pasos veloces bamboleándote como pingüino.',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Desfilen los pingüinos por el comedor!'
  },
  {
    id: 'mov_4',
    title: '¡Carrera de Cangrejos!',
    category: 'movimiento',
    durationSeconds: 25,
    instructions: 'Camina de lado abriendo y cerrando las manos como tenazas de cangrejo dando una vuelta al sillón.',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Córranle cangrejitos al ritmo de la música!'
  },
  {
    id: 'mov_5',
    title: '¡Estaca Humana en Plancha!',
    category: 'movimiento',
    durationSeconds: 20,
    instructions: 'Mantén la postura de plancha (apoyo de codos y puntas de pie) en el suelo durante 20 segundos.',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 5,
    presenterPhrase: '¡Demuestra esa fuerza abdominal de titán!'
  },
  {
    id: 'mov_6',
    title: '¡Las 5 Sentadillas del Campeón!',
    category: 'movimiento',
    durationSeconds: 15,
    instructions: 'Realiza 5 sentadillas bien hechas extendiendo las manos al frente al bajar.',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 2,
    presenterPhrase: '¡Arriba y abajo con energía!'
  },
  {
    id: 'mov_7',
    title: '¡Cámara Lenta Extrema!',
    category: 'movimiento',
    durationSeconds: 30,
    instructions: 'Camina de un extremo al otro de la sala haciendo todos tus movimientos a cámara ultra lenta.',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Como si estuvieras en la luna a 1/100 de velocidad!'
  },
  {
    id: 'mov_8',
    title: '¡Giro de Trompo y Equilibrio!',
    category: 'movimiento',
    durationSeconds: 20,
    instructions: 'Da 3 vueltas completas sobre ti mismo y luego intenta caminar en línea recta 5 pasos sin tambalearte.',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Cuidado con el mareo de trompo mágico!'
  },

  // --- TRAE UN OBJETO ---
  {
    id: 'obj_1',
    title: '¡Caza de la Cuchara Dorada!',
    category: 'trae_objeto',
    durationSeconds: 20,
    instructions: '¡Corre a la cocina y trae cualquier CUCHARA en menos de 20 segundos!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Relámpago en la cocina! Trae una cuchara ya.'
  },
  {
    id: 'obj_2',
    title: '¡El Calcetín Perdido!',
    category: 'trae_objeto',
    durationSeconds: 25,
    instructions: '¡Consigue y muestra a la pantalla un CALCETÍN (de cualquier color) antes de que venza el tiempo!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡El monstruo de los calcetines te reta! ¡Trae uno!'
  },
  {
    id: 'obj_3',
    title: '¡Misión Algo Rojo!',
    category: 'trae_objeto',
    durationSeconds: 20,
    instructions: '¡Trae cualquier objeto de la casa que sea de COLOR ROJO (fruta, juguete, prenda, etc.)!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Búsqueda de color rojo activo!'
  },
  {
    id: 'obj_4',
    title: '¡Rescate del Peluche!',
    category: 'trae_objeto',
    durationSeconds: 25,
    instructions: '¡Trae un PELUCHE o JUGUETE de felpa y preséntalo al grupo con un abrazo!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Trae al guardián de peluche al programa!'
  },
  {
    id: 'obj_5',
    title: '¡La Llave del Tesoro!',
    category: 'trae_objeto',
    durationSeconds: 20,
    instructions: '¡Trae una LLAVE o llavero real de la casa antes de que el cronómetro llegue a cero!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 5,
    presenterPhrase: '¡Abre la puerta del éxito trayendo una llave!'
  },
  {
    id: 'obj_6',
    title: '¡El Libro Sabio!',
    category: 'trae_objeto',
    durationSeconds: 20,
    instructions: '¡Trae cualquier LIBRO o libreta de la casa y abre en una página al azar!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Sabiduría relámpago! Trae un libro.'
  },
  {
    id: 'obj_7',
    title: '¡El Vaso Transparente!',
    category: 'trae_objeto',
    durationSeconds: 20,
    instructions: '¡Trae un VASO (plástico o de agua) de la cocina!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Hidratación relámpago! Trae un vaso.'
  },
  {
    id: 'obj_8',
    title: '¡Algo que huela delicioso!',
    category: 'trae_objeto',
    durationSeconds: 30,
    instructions: '¡Trae algo que tenga aroma rico (fruta, jabón, perfume, crema, especia)!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Prueba olfativa de la casa de Silvia!'
  },

  // --- DAME TRES COSAS ---
  {
    id: 'tres_1',
    title: '¡3 Frutas del Huerto!',
    category: 'tres_cosas',
    durationSeconds: 10,
    instructions: '¡Nombra en voz alta 3 FRUTAS distintas en menos de 10 segundos!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Rápido! 10 segundos para nombrar 3 frutas deliciosas.'
  },
  {
    id: 'tres_2',
    title: '¡3 Animales Salvajes!',
    category: 'tres_cosas',
    durationSeconds: 10,
    instructions: '¡Menciona en voz alta 3 ANIMALES de la selva o safari en 10 segundos!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Rugidos en el comerdor! 3 animales ya.'
  },
  {
    id: 'tres_3',
    title: '¡3 Deportes Olímpicos!',
    category: 'tres_cosas',
    durationSeconds: 10,
    instructions: '¡Menciona 3 DEPORTES en voz alta antes de que suene la alarma!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Atleta relámpago! 3 deportes.'
  },
  {
    id: 'tres_4',
    title: '¡3 Objetos del Baño!',
    category: 'tres_cosas',
    durationSeconds: 10,
    instructions: '¡Nombra 3 cosas que encuentras habitualmente en el BAÑO!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Burbujas! 3 cosas del baño rápido.'
  },
  {
    id: 'tres_5',
    title: '¡3 Cosas del Refrigerador!',
    category: 'tres_cosas',
    durationSeconds: 10,
    instructions: '¡Menciona 3 cosas que se guardan dentro del REFRIGERADOR!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Frescura helada! 3 alimentos del refri.'
  },
  {
    id: 'tres_6',
    title: '¡3 Cosas Redondas!',
    category: 'tres_cosas',
    durationSeconds: 10,
    instructions: '¡Dime 3 objetos o cosas de forma totalmente REDONDA!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Círculos por doquier! 3 cosas redondas.'
  },
  {
    id: 'tres_7',
    title: '¡3 Personajes de Caricatura!',
    category: 'tres_cosas',
    durationSeconds: 10,
    instructions: '¡Nombra 3 personajes de animación o caricaturas famosas!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Televisión encendida! 3 personajes.'
  },
  {
    id: 'tres_8',
    title: '¡3 Comidas Mexicanas!',
    category: 'tres_cosas',
    durationSeconds: 10,
    instructions: '¡Menciona 3 platillos deliciosos de la gastronomía mexicana!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Sabor mexicano! 3 comidas deliciosas.'
  },

  // --- MÍMICA ---
  {
    id: 'mim_1',
    title: '¡Mímica: El Robot descompuesto!',
    category: 'mimica',
    durationSeconds: 30,
    instructions: 'Imita un ROBOT al que se le acaba la batería sin hablar. ¡Tu equipo debe adivinarlo!',
    targetText: 'ROBOT',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Gesticula y mueve las tuercas sin hacer ningún sonido!'
  },
  {
    id: 'mim_2',
    title: '¡Mímica: El Perrito Hambriento!',
    category: 'mimica',
    durationSeconds: 30,
    instructions: 'Actúa como un perro pidiendo croquetas y moviendo la cola. ¡Haz que adivinen que eres un PERRO!',
    targetText: 'PERRO',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 3,
    presenterPhrase: '¡Menea la colita en mímica pura!'
  },
  {
    id: 'mim_3',
    title: '¡Mímica: El Dentista asustado!',
    category: 'mimica',
    durationSeconds: 30,
    instructions: 'Haz mímica de que eres un DENTISTA revisando dientes gigantes. ¡Tu grupo debe adivinar tu profesión!',
    targetText: 'DENTISTA',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Abre bien la boca en silencioso tratamiento!'
  },
  {
    id: 'mim_4',
    title: '¡Mímica: Superhéroe Volando!',
    category: 'mimica',
    durationSeconds: 30,
    instructions: 'Ponte la capa imaginaria y actúa como SUPERHÉROE esquivando meteoritos.',
    targetText: 'SUPERHÉROE',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Salva a la Casa de Silvia volando por la sala!'
  },
  {
    id: 'mim_5',
    title: '¡Mímica: Cantante de Rock!',
    category: 'mimica',
    durationSeconds: 30,
    instructions: 'Toca la guitarra eléctrica imaginaria y canta con todo el sentimiento en MÍMICA SILENCIOSA.',
    targetText: 'CANTANTE DE ROCK',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Rock and roll sin audio!'
  },

  // --- TELÉFONO DESCOMPUESTO CORPORAL ---
  {
    id: 'tel_1',
    title: '¡Teléfono Descompuesto Corporal!',
    category: 'telefono_descompuesto',
    durationSeconds: 45,
    instructions: 'El jugador en turno observa una secuencia de 3 movimientos locos (ej: aplauso, salto de rana, muesca) y se la pasa al de al lado en silencio hasta llegar al último jugador.',
    mode: 'todos',
    starsReward: 2,
    coinsReward: 5,
    presenterPhrase: '¡Cadena de movimientos en la Casa de Silvia! A ver cómo llega el mensaje al final.'
  },

  // --- DIBUJA / PICTIONARY ---
  {
    id: 'dib_1',
    title: '¡Dibuja una Pizza Gigante!',
    category: 'dibuja',
    durationSeconds: 30,
    instructions: 'Dibuja en papel o en el aire una PIZZA con rebanadas y pepperoni. Tu equipo debe adivinar la palabra "PIZZA".',
    targetText: 'PIZZA',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Artista al lienzo! Dibuja delicioso.'
  },
  {
    id: 'dib_2',
    title: '¡Dibuja un Dragón Volador!',
    category: 'dibuja',
    durationSeconds: 35,
    instructions: 'Dibuja un DRAGÓN echando fuego por la boca. ¡Haz que tu equipo adivine antes del tiempo!',
    targetText: 'DRAGÓN',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 5,
    presenterPhrase: '¡Trazos de fuego en la azotea!'
  },
  {
    id: 'dib_3',
    title: '¡Dibuja un Helado de 3 Bolas!',
    category: 'dibuja',
    durationSeconds: 30,
    instructions: 'Dibuja un HELADO en barquilla con 3 bolas gigantes y chispas. Palabra: "HELADO".',
    targetText: 'HELADO',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Dulce arte rápido en pantalla!'
  },

  // --- BASTA EXPRESS ---
  {
    id: 'basta_1',
    title: '¡Basta Express con la Letra M!',
    category: 'basta',
    durationSeconds: 20,
    instructions: 'Con la letra "M": Nombra un Animal, una Fruta y un Objeto de la casa en 20 segundos.',
    categoryList: ['Animal', 'Fruta', 'Objeto de la casa'],
    targetText: 'M',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Letra M en el cronómetro! ¡BASTA 1, 2, 3!'
  },
  {
    id: 'basta_2',
    title: '¡Basta Express con la Letra P!',
    category: 'basta',
    durationSeconds: 20,
    instructions: 'Con la letra "P": Nombra un Nombre de Persona, una Comida y un Color en 20 segundos.',
    categoryList: ['Nombre de Persona', 'Comida', 'Color'],
    targetText: 'P',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Letra P activada! ¡A pensar veloz!'
  },

  // --- RISA PROHIBIDA ---
  {
    id: 'risa_1',
    title: '¡La Estatua Seriísima!',
    category: 'risa_prohibida',
    durationSeconds: 30,
    instructions: 'Ponte de pie frente a todos. Mantén cara totalmente seria durante 30s mientras tus compañeros hacen muecas sin tocarte. ¡El primero que sonría pierde la estrella!',
    mode: 'solo',
    starsReward: 1,
    coinsReward: 5,
    presenterPhrase: '¡Prohibido sonreír! Ni una sola risita durante 30 segundos.'
  },

  // --- NO DIGAS SÍ / NO / TAL VEZ ---
  {
    id: 'nodigas_1',
    title: '¡Entrevista Prohibida!',
    category: 'no_digas_si',
    durationSeconds: 45,
    instructions: 'Tus compañeros te harán preguntas rápidas durante 45s. ¡NO puedes responder "SÍ", "NO" ni "TAL VEZ" under ninguna circunstancia!',
    mode: 'solo',
    starsReward: 2,
    coinsReward: 5,
    presenterPhrase: '¡Trampa de palabras! Prohibido decir SÍ, NO o TAL VEZ.'
  },

  // --- SIMÓN DICE MODERNO ---
  {
    id: 'simon_1',
    title: '¡Simón Dice: Modo Flash!',
    category: 'simon_dice',
    durationSeconds: 30,
    instructions: 'Sigue las órdenes en pantalla: ¡Simón dice TOCA TU NARIZ, Simón dice TOCA LA RODILLA IZQUIERDA, Simón dice APLAUDE 3 VECES!',
    mode: 'todos',
    starsReward: 1,
    coinsReward: 4,
    presenterPhrase: '¡Simón tiene el control de la casa!'
  },

  // --- DESAFÍOS COOPERATIVOS ---
  {
    id: 'coop_1',
    title: '¡La Torre de Cojines!',
    category: 'cooperativo',
    durationSeconds: 45,
    instructions: 'En equipo: Junten 4 cojines o almohadas de la casa y construyan una torre estable que se mantenga de pie por 5 segundos sin caerse.',
    mode: 'cooperativo',
    starsReward: 2,
    coinsReward: 6,
    presenterPhrase: '¡Arquitectos de la Casa de Silvia! ¡Construyan esa torre!'
  },
  {
    id: 'coop_2',
    title: '¡Paso del Libro en la Cabeza!',
    category: 'cooperativo',
    durationSeconds: 40,
    instructions: 'Dos jugadores caminan juntos de la mano, cada uno con un libro equilibrado en su cabeza, dando una vuelta completa al comedor.',
    mode: 'dueto',
    starsReward: 2,
    coinsReward: 5,
    presenterPhrase: '¡Equilibrio doble perfecto!'
  }
];

// Helper routines for massive non-repeating generation
let availableChallengesPool: Challenge[] = [...RAW_CHALLENGES];

export function getRandomChallenge(excludedIds: string[] = []): Challenge {
  const filtered = RAW_CHALLENGES.filter(c => !excludedIds.includes(c.id));
  if (filtered.length === 0) {
    // Reset pool if all used
    const randomIndex = Math.floor(Math.random() * RAW_CHALLENGES.length);
    return RAW_CHALLENGES[randomIndex];
  }
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

export function getRandomAhorcadoWord(): { word: string; category: string; hint: string } {
  const randomIndex = Math.floor(Math.random() * AHORCADO_WORDS_BANK.length);
  return AHORCADO_WORDS_BANK[randomIndex];
}
