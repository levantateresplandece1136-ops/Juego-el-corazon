import { Avatar, CrystalId, CrystalInfo, LevelData } from '../types';

export const CRISTALES: Record<CrystalId, CrystalInfo> = {
  sabiduria: {
    id: 'sabiduria',
    nombre: 'Sabiduría',
    color: '#D4AF37',
    glowColor: 'rgba(212, 175, 55, 0.8)',
    emoji: '🟡',
    virtud: 'Comprender antes de actuar',
    simbolo: '☉',
    descripcion: 'Forjado con la luz del primer amanecer de Aurelia. Otorga claridad de pensamiento en la penumbra.'
  },
  valentia: {
    id: 'valentia',
    nombre: 'Valentía',
    color: '#E74C3C',
    glowColor: 'rgba(231, 76, 60, 0.8)',
    emoji: '🔴',
    virtud: 'Avanzar a pesar de los temores',
    simbolo: '⚔',
    descripcion: 'Gema impregnada del aliento de los titanes de la selva. Otorga firmeza cuando el camino tiembla.'
  },
  memoria: {
    id: 'memoria',
    nombre: 'Memoria',
    color: '#3498DB',
    glowColor: 'rgba(52, 152, 219, 0.8)',
    emoji: '🔵',
    virtud: 'Honrar las lecciones del pasado',
    simbolo: '📜',
    descripcion: 'Tallado por los sabios de la Biblioteca del Tiempo. Conserva las palabras no olvidadas.'
  },
  orden: {
    id: 'orden',
    nombre: 'Orden',
    color: '#2ECC71',
    glowColor: 'rgba(46, 204, 113, 0.8)',
    emoji: '🟢',
    virtud: 'Unir piezas dispersas hacia la armonía',
    simbolo: '⚙',
    descripcion: 'Resplandece con la geometría sagrada de los laberintos. Canaliza la lógica y la perseverancia.'
  },
  esperanza: {
    id: 'esperanza',
    nombre: 'Esperanza',
    color: '#9B59B6',
    glowColor: 'rgba(155, 89, 182, 0.8)',
    emoji: '🟣',
    virtud: 'Confiar cuando todo parece perdido',
    simbolo: '✦',
    descripcion: 'Caído de una constelación errante. Guía a los expedicionarios en las noches más frías.'
  }
};

export const AVATARES: Avatar[] = [
  {
    id: 'explorador',
    nombre: 'El Explorador',
    titulo: 'Buscador de Sendas',
    icono: '🧭',
    hab: 'Pista ilimitada del Mapa Ancestral y revelación de símbolos ocultos.',
    frase: '"Ningún camino es demasiado difícil cuando caminamos juntos."',
    habilidadClave: 'Revelar Pista Directa',
    cooldownPistas: 0
  },
  {
    id: 'sabio',
    nombre: 'El Sabio',
    titulo: 'Guardión del Conocimiento',
    icono: '📜',
    hab: 'Permite intentar dos veces la prueba de acertijo sin penalización.',
    frase: '"El conocimiento no pesa, pero ilumina hasta la cueva más oscura."',
    habilidadClave: 'Doble Intento Místico',
    cooldownPistas: 1
  },
  {
    id: 'inventor',
    nombre: 'El Inventor',
    titulo: 'Maestro de Mecanismos',
    icono: '⚙️',
    hab: 'Simplifica los engranajes y ciferos rotatorios de los minijuegos.',
    frase: '"Toda gran cerradura tiene una llave que aguarda ser diseñada."',
    habilidadClave: 'Ajuste Mecánico',
    cooldownPistas: 1
  },
  {
    id: 'arquera',
    nombre: 'La Arquera',
    titulo: 'Ojo de Águila',
    icono: '🏹',
    hab: 'Aumenta el tiempo de observación y destaca patrones visuales en la oscuridad.',
    frase: '"Mi vista alcanza lo que el resto pasa por alto."',
    habilidadClave: 'Visión de Halcón',
    cooldownPistas: 0
  },
  {
    id: 'guardian',
    nombre: 'El Guardián',
    titulo: 'Escudo de la Promesa',
    icono: '🛡️',
    hab: 'Protege al equipo ante errores de código y asegura la moral colectiva.',
    frase: '"Ninguno de los míos quedará atrás mientras yo sostenga este broquel."',
    habilidadClave: 'Aura Protectora',
    cooldownPistas: 0
  }
];

export const PROLOGO_TEXTO = 
  'Hace más de mil años floreció en tierras olvidadas la mística ciudad de Aurelia. Sus habitantes no eran renombrados por sus fortalezas ni por montañas de oro, sino por un lazo inquebrantable: trabajaban unidos, se escuchaban en el silencio y jamás abandonaban a uno de los suyos.\n\n' +
  'En la cima de su santuario descansaba el Corazón de Aurelia, un artefacto ancestral que condensaba las virtudes de la humanidad. Pero la codicia del oscuro cazador Mordrak amenazó con quebrarlo. Antes de que cayera en sombras, los cinco Guardianes ancestrales dividieron el artefacto en cinco cristales sagrados y los escondieron en templos protegidos por misterios ancestrales.\n\n' +
  'Durante siglos la leyenda permaneció adormecida... hasta que ustedes encontraron el Antiguo Pergamino. ¡La expedición ha comenzado!';

export const NIVELES: LevelData[] = [
  {
    n: 1,
    id: 'templo',
    escena: 'templo',
    cristal: 'sabiduria',
    titulo: 'El Templo de los Ecos',
    subtitulo: 'Donde los glifos antiguos responden al pensamiento',
    protagonista: 'Ammi',
    rol: 'La Descifradora',
    intro: 'Tras caminar durante horas por la fronda milenaria, descubren la imponente fachada del Templo de los Ecos. En el umbral de piedra masiva, un rostro esculpido abre sus ojos dorados con un resplandor místico.',
    narracion: 'La estatua habla con una voz abisal de resonancia ancestral: «Solo quien sea capaz de encontrar el orden místico oculto en los runogramas despertará el corazón de este santuario. Muchos entraron en soledad... ninguno regresó». El suelo tiembla. ¡Deben descifrar la secuencia antes de que los glifos se apaguen!',
    objetivo: 'Guía a tu equipo para memorizar y activar la secuencia exacta de las 4 runas luminosas en el minijuego de resonancia.',
    pistasMinijuego: [
      'Observa detenidamente la secuencia en que se encienden los glifos dorados.',
      'El sonido de cada runa tiene un tono místico distinto: agudo, grave, campana o eco.',
      'Trabajen en equipo: un jugador puede cantar la secuencia mientras otro presiona las piedras.'
    ],
    actividadesFisicas: [
      'La Postura de la Estatua Sagrada (Inmovilidad individual con palmas al frente durante 30s)',
      'Respiración pausada y enfoque mental del explorador',
      'Demostración de temple individual frente al altar'
    ],
    desafioFisico: {
      titulo: 'La Postura de la Estatua Sagrada',
      duracionSegundos: 30,
      instrucciones: [
        '1. El jugador en turno se coloca de pie frente al grupo en posición de Estatua del Templo.',
        '2. Cierra los ojos y extiende las palmas de las manos hacia el frente con la espalda recta.',
        '3. Debe permanecer en silencio e inmóvil como la piedra del templo durante 30 segundos completos.',
        '4. Los demás compañeros observan respetuosamente y supervisan el tiempo en el cronómetro.'
      ],
      metaObjetivo: 'Completar 30 segundos de inmovilidad individual absoluta frente al santuario.'
    },
    enigma: {
      pregunta: '«Hablo sin tener boca y oigo sin tener oídos. No tengo cuerpo pero cobro vida con la voz en las cavernas del templo. ¿Qué soy?»',
      pista: 'Resuena cuando hablas fuerte en una cueva o cámara vacía.',
      respuestasCorrectas: ['eco', 'el eco', 'un eco'],
      opcionesMultiples: ['El Eco', 'El Murmullo de la Roca', 'El Viento de la Caverna']
    },
    recompensa: 'La pesada puerta de granito gira sobre sus efigies. Entre una humareda de incienso milenario emerge el Primer Cristal resplandeciendo en amarillo solar. En una de sus facetas brilla la palabra inscrita: SABIDURÍA.',
    transicionMordrak: 'Pero en el dintel descubren una marca reciente dibujada con ceniza negra. Una nota advierte: «Mordrak ha sentido el despertar del templo. Sabe que llevan la primera gema... y ya se acerca».',
    sfxIntro: 'puerta',
    sfxFinal: 'cristal'
  },
  {
    n: 2,
    id: 'selva',
    escena: 'selva',
    cristal: 'valentia',
    titulo: 'La Selva del Guardián',
    subtitulo: 'El laberinto vivo de vegetación y sombras',
    protagonista: 'Said',
    rol: 'El Explorador de Vanguardia',
    intro: 'El sendero desaparece sepultado bajo líquenes gigantescos y ramas entrelazadas como serpientes de piedra. De los profundos barrancos surge un estruendo vibrante que hace oscilar las copas de los árboles.',
    narracion: 'Un gigante de musgo y basalto, el antiguo Guardián de la Selva, cobra vida bloqueando el barranco con su lanza ancestral. Exclama: «¡Solo los valientes que sepan coordinar sus pasos sin tambalearse cruzarán mi dominio sagrado!».',
    objetivo: 'Guía a la esfera de luz a través del laberinto de vides sin tocar las trampas espinosas para demostrar equilibrio y firmeza.',
    pistasMinijuego: [
      'Mueve el control con suavidad; la vegetación reacciona al movimiento brusco.',
      'Aprovecha las zonas de refugio lumínico para planificar tu siguiente giro.',
      'Usa la vista de la Arquera para anticipar el camino correcto.'
    ],
    actividadesFisicas: [
      'El Equilibrio del Guardián (Sostener postura en un solo pie durante 25s)',
      'Fuerza y postura del explorador de vanguardia',
      'Demostración de destreza física individual'
    ],
    desafioFisico: {
      titulo: 'El Equilibrio del Guardián',
      duracionSegundos: 25,
      instrucciones: [
        '1. El jugador en turno se coloca de pie en el centro del espacio libre.',
        '2. A la cuenta de tres, levanta un pie sosteniéndose sobre una sola pierna y extiende sus brazos.',
        '3. Debe mantener la postura erguida de equilibrio sin apoyar el segundo pie durante 25 segundos.',
        '4. El equipo observa atentamente y anima en silencio para mantener la concentración.'
      ],
      metaObjetivo: 'Sostener el equilibrio personal en una sola pierna durante 25 segundos.'
    },
    enigma: {
      pregunta: '«Verde es mi manto y gigante mi tronco. Si me cortas la sombra muero en la selva, pero mientras viva cobijo mil vidas. ¿Qué soy?»',
      pista: 'Tiene raíces profundas en la tierra y hojas verdes en la copa.',
      respuestasCorrectas: ['arbol', 'el arbol', 'un arbol', 'árbol', 'el árbol'],
      opcionesMultiples: ['El Árbol Ancestral', 'El Musgo Sagrado', 'La Espina de Liana']
    },
    recompensa: 'El Guardián clava su lanza en la raíz central. La tierra se abre y del brote florido surge el Segundo Cristal refulgiendo en rojo rubí. La runa grabada proclama: VALENTÍA.',
    transicionMordrak: 'Al cruzar el arroyo, divisan una sombra sigilosa entre el follaje espeso. Alguien caminaba a escasos metros de su retroguardia.',
    sfxIntro: 'rugido',
    sfxFinal:'cristal'
  },
  {
    n: 3,
    id: 'biblioteca',
    escena: 'biblioteca',
    cristal: 'memoria',
    titulo: 'La Biblioteca del Tiempo',
    subtitulo: 'Donde los tomos sin título susurran secretos',
    protagonista: 'Silvia',
    rol: 'La Guardiana del Saber',
    intro: 'Entran en una majestuosa catedral de estantes interminables que rozan las nubes. Miles de tomos encuadernados en cuero místico descansan en completo silencio. De pronto, docenas de candelabros flotantes se encienden en llamas azures.',
    narracion: 'Una sombra sabia emerge entre las estanterías de cedro: «Los libros jamás olvidan... pero el tiempo nubla a quienes no leen con el alma. Para abrir el candado místico, deberán descifrar la clave secreta oculta en nuestro antiguo cifrado».',
    objetivo: 'Descifra el mensaje encriptado en el Cifrado César desplazando el dial rúnico para revelar el tomo correcto.',
    pistasMinijuego: [
      'Observa cuántas posiciones se desplaza cada letra del alfabeto místico.',
      'Si la letra es "D" y el desplazamiento es 3, la letra original era "A".',
      'Prueba reemplazar primero las vocales más comunes para descifrar la palabra clave.'
    ],
    actividadesFisicas: [
      'La Mímica Silenciosa del Guardián (Expresar 2 figuras ancestrales en mímica sin sonido)',
      'Interpretación corporal individual',
      'Desafío de comunicación gestual en turno'
    ],
    desafioFisico: {
      titulo: 'La Mímica Silenciosa del Guardián',
      duracionSegundos: 45,
      instrucciones: [
        '1. El jugador en turno es el Guardián Silencioso y no puede emitir ningún sonido o palabra.',
        '2. Usando exclusivamente gesticulación corporal y mímica, debe representar 2 figuras mágicas de Aurelia (ej. ave fénix, liana al viento, cascada).',
        '3. Los demás compañeros deben intentar adivinar ambas figuras antes de agotar el tiempo.',
        '4. Dispone de 45 segundos para lograr que su equipo adivine con éxito.'
      ],
      metaObjetivo: 'Hacer que el equipo adivine la mímica del jugador en turno en menos de 45 segundos.'
    },
    enigma: {
      pregunta: '«Tengo miles de hojas sin ser un árbol, cuento historias sin hablar y guardo la sabiduría del tiempo en la estantería. ¿Qué soy?»',
      pista: 'Lo abres para leer sus páginas encuadernadas.',
      respuestasCorrectas: ['libro', 'el libro', 'un libro', 'tomo', 'el tomo'],
      opcionesMultiples: ['El Libro o Tomo', 'El Pergamino Enrollado', 'El Papiro Místico']
    },
    recompensa: 'El gran tomo central se desencaja con un chasquido dorado. En su interior ahuecado descansa el Tercer Cristal con destellos azul zafiro. La inscripción reza: MEMORIA.',
    transicionMordrak: 'Un tintero volcado aún gotea sobre la mesa de lectura. Mordrak estuvo examinando los mismos mapas minutes antes de su llegada.',
    sfxIntro: 'runa',
    sfxFinal: 'cristal'
  },
  {
    n: 4,
    id: 'minas',
    escena: 'minas',
    cristal: 'orden',
    titulo: 'Las Minas de Cristal',
    subtitulo: 'Santuario de reflejos y prismas subterráneos',
    protagonista: 'Sandy',
    rol: 'La Estratega',
    intro: 'Descendiendo por galerías de cuarzo y estalactitas resplandecientes, alcanzan la Cámara de los Espejos Prismáticos. La luz de sus antorchas se fragmenta en cientos de destellos divergentes.',
    narracion: 'Una voz que retumba en las cavidades rocosas proclama: «La luz sin orden es solo confusión. Orienten los prismas sagrados para que el haz de energía pura alcance el pedestal dormido».',
    objetivo: 'Rota los prismas de cristal para dirigir el rayo de luz desde la fuente inicial hasta el receptáculo del pedestal.',
    pistasMinijuego: [
      'Haz clic en los espejos para rotarlos 90 grados.',
      'Asegúrate de que el rayo rebote en ángulo recto hacia la siguiente columna.',
      'El cristal verde reacciona cuando la luz llega constante desde el prisma principal.'
    ],
    actividadesFisicas: [
      'La Secuencia Rítmica del Granito (5 secuencias rítmicas individuales acelerando el paso)',
      'Coordinación de extremidades en solo',
      'Demostración de agilidad individual'
    ],
    desafioFisico: {
      titulo: 'La Secuencia Rítmica del Granito',
      duracionSegundos: 30,
      instrucciones: [
        '1. El jugador en turno realiza una secuencia rítmica corporal (ejemplo: 2 palmas en muslos + 1 aplauso + 1 chasquido).',
        '2. Debe repetir la secuencia rítmica 5 veces consecutivas acelerando la velocidad en cada vuelta sin equivocarse.',
        '3. Sus compañeros llevan la cuenta en voz alta de las 5 repeticiones limpias.',
        '4. Debe completar la demostración dentro de los 30 segundos.'
      ],
      metaObjetivo: 'Completar 5 repeticiones rítmicas individuales a ritmo creciente en 30 segundos.'
    },
    enigma: {
      pregunta: '«Nací en la penumbra de la roca madre. No soy un sol pero reflejo el destello y si me atraviesa un haz, divido la luz pura en mil colores. ¿Qué soy?»',
      pista: 'Suele ser de cuarzo transparente, diamante o prisma de cristal.',
      respuestasCorrectas: ['cristal', 'el cristal', 'un cristal', 'prisma', 'el prisma'],
      opcionesMultiples: ['El Cristal o Prisma', 'El Espejo Místico', 'La Estalactita de Hielo']
    },
    recompensa: 'El receptáculo absorbe el haz concentrado. La roca madre palpita con energía esmeralda liberando el Cuarto Cristal. En su centro pulido se lee: ORDEN.',
    transicionMordrak: 'Un eco de pasos pesados resuena por los túneles traseros. Pegado en la piedra encuentran un pergamino mordaz: «Sigan reuniendo mis gemas. Me facilitan el trabajo. — Mordrak».',
    sfxIntro: 'latido',
    sfxFinal: 'cristal'
  },
  {
    n: 5,
    id: 'observatorio',
    escena: 'observatorio',
    cristal: 'esperanza',
    titulo: 'El Observatorio Celestial',
    subtitulo: 'En la cumbre donde las estrellas tocan la tierra',
    protagonista: 'Jadita',
    rol: 'La Buscadora de Estrellas',
    intro: 'Alcanzan la cima nevada de la Montaña del Viento. Un astronómico astrolabio de bronce y cristal domina el domo del observatorio, alineado con las constelaciones nocturnas.',
    narracion: 'La brisa astral susurra entre los engranajes cósmicos: «Solo quienes saben mirar donde la oscuridad es más profunda encontrarán la estrella que no pertenece al cielo, sino a la virtud humana».',
    objetivo: 'Une las estrellas rúnicas dibujando la constelación del Corazón para invocar el último cristal.',
    pistasMinijuego: [
      'Sigue las líneas luminosas en orden numérico o por resplandor.',
      'Conecta cada punto estelar sin cruzar líneas activas.',
      'Usa la habilidad de Jadita para encender las estrellas guía.'
    ],
    actividadesFisicas: [
      'La Postura de la Constelación Solitaria (Figura de estrella en solitario durante 20s)',
      'Alineación estelar individual',
      'Concentración y templanza personal'
    ],
    desafioFisico: {
      titulo: 'La Postura de la Constelación Solitaria',
      duracionSegundos: 20,
      instrucciones: [
        '1. El jugador en turno se coloca de pie en el centro imitando la figura de una Gran Estrella Rúnica (brazos y piernas totalmente extendidos).',
        '2. Con la mirada fija en un punto elevado, sostiene la postura de constelación congelada sin balancearse ni pestañear.',
        '3. Permanece inmóvil resguardando la luz del observatorio durante 20 segundos.',
        '4. Sus compañeros custodian el tiempo y celebran su templanza estelar.'
      ],
      metaObjetivo: 'Sostener la postura congelada de la Estrella Rúnica en solitario durante 20 segundos.'
    },
    enigma: {
      pregunta: '«Nací en el firmamento nocturno, estoy a millones de leguas y si me unes a mis hermanas formo hermosas figuras en la noche. ¿Qué soy?»',
      pista: 'Brilla en el cielo nocturno y forma constelaciones.',
      respuestasCorrectas: ['estrella', 'la estrella', 'una estrella', 'constelacion', 'la constelacion'],
      opcionesMultiples: ['La Estrella', 'La Luna Llena', 'El Cometa Dorado']
    },
    recompensa: 'Un haz estelar desciende directo por la apertura del domo. En el centro del altar cristaliza la última gema en tono violeta amatista. La grabación reluce con orgullo: ESPERANZA.',
    transicionMordrak: 'Los cinco cristales en su inventario empiezan a pulsar armónicamente en tono dorado, azul, rojo, verde y violeta. El Templo del Corazón ha despertado en la cumbre.',
    sfxIntro: 'campana',
    sfxFinal: 'cristal'
  }
];

export const EPILOGO_TEXTO = [
  'Con los cinco cristales reunidos en el altar del Templo del Corazón, las gemas comienzan a flotar coordinadamente en un vórtice de luz resplandeciente.',
  'Los cinco Guardianes Ancestrales se materializan en vestiduras doradas: «Muchos recorrieron estas tierras guiados por la codicia o el ansia de poder personal... Pero ustedes demostraron lo que verdaderamente trasciende: pensar en equipo, superar temores, recordar sus raíces, poner orden y no perder jamás la esperanza».',
  'Las inmensas puertas de la Cámara Central se abren con un estruendo solemne. En el centro descansa el Cofre Ancestral de Aurelia. Al colocar la llave de cinco facetas en la cerradura, un destello divino inunda la estancia...',
  'Dentro del cofre descubren la gran reliquia luminosa y un pergamino con letras de oro fundido: «El Corazón de Aurelia jamás buscó al guerrero más fuerte ni al sabio más solitario. Siempre perteneció a quienes caminan juntos, cuidan del otro y celebran cada victoria en familia. Este es el verdadero tesoro que hoy llevan grabado en el alma».'
];
