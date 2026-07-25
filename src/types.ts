export type ScreenId = 
  | 'splash'
  | 'prologue'
  | 'avatar'
  | 'map'
  | 'level'
  | 'final'
  | 'credits';

export type BiomeId = 
  | 'inicio'
  | 'avatar'
  | 'mapa'
  | 'templo'
  | 'selva'
  | 'biblioteca'
  | 'minas'
  | 'observatorio'
  | 'final';

export type CrystalId = 'sabiduria' | 'valentia' | 'memoria' | 'orden' | 'esperanza';

export interface CrystalInfo {
  id: CrystalId;
  nombre: string;
  color: string;
  glowColor: string;
  emoji: string;
  virtud: string;
  simbolo: string;
  descripcion: string;
}

export interface Avatar {
  id: string;
  nombre: string;
  titulo: string;
  icono: string;
  hab: string;
  frase: string;
  habilidadClave: string;
  cooldownPistas: number;
}

export interface InstantPhysicalChallenge {
  titulo: string;
  duracionSegundos: number;
  instrucciones: string[];
  metaObjetivo: string;
}

export interface EnigmaData {
  pregunta: string;
  pista: string;
  respuestasCorrectas: string[];
  opcionesMultiples: string[];
}

export interface LevelData {
  n: number;
  id: BiomeId;
  escena: BiomeId;
  cristal: CrystalId;
  titulo: string;
  subtitulo: string;
  protagonista: string;
  rol: string;
  intro: string;
  narracion: string;
  objetivo: string;
  pistasMinijuego: string[];
  actividadesFisicas: string[];
  desafioFisico: InstantPhysicalChallenge;
  enigma: EnigmaData;
  recompensa: string;
  transicionMordrak: string;
  sfxIntro: string;
  sfxFinal: string;
}

export interface InventoryItem {
  id: string;
  nombre: string;
  icono: string;
  tipo: 'mapa' | 'cristal' | 'pergamino' | 'llave' | 'artefacto';
  descripcion: string;
  adquirido: boolean;
  color?: string;
}

export interface PlayerAssignment {
  playerNumber: number;
  avatarId: string;
  playerName?: string;
}

export interface GameState {
  screen: ScreenId;
  currentLevelNumber: number;
  selectedAvatarId: string | null;
  playerAssignments: PlayerAssignment[];
  collectedCrystals: CrystalId[];
  completedLevels: number[];
  hintsRemaining: number;
  audioMuted: boolean;
  narratorEnabled: boolean;
  speechRate: number;
  activeBiome: BiomeId;
  inventoryOpen: boolean;
  gameStats: {
    startTime: number;
    minigamesSolved: number;
    hintsUsed: number;
    realWorldTasksCompleted: number;
  };
}

export type MusicMood = 'ambient' | 'mystical' | 'suspense' | 'action' | 'triumph';
