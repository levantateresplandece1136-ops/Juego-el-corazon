export type ScreenId = 
  | 'splash'
  | 'setup'
  | 'board'
  | 'challenge'
  | 'event'
  | 'final';

export type HouseRoom = 
  | 'Sala'
  | 'Comedor'
  | 'Cocina'
  | 'Patio'
  | 'Recámara'
  | 'Baño'
  | 'Garage'
  | 'Azotea';

export type AvatarId = 
  | 'chef'
  | 'gato'
  | 'robot'
  | 'superheroe'
  | 'ninja'
  | 'pirata'
  | 'astronauta'
  | 'abuela'
  | 'monstruo'
  | 'unicornio'
  | 'detective'
  | 'dinosaurio';

export interface AvatarInfo {
  id: AvatarId;
  nombre: string;
  icono: string;
  color: string;
  bgGradient: string;
  descripcion: string;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  avatarId: AvatarId;
  color: string; // Hex or CSS color
  colorBg: string;
  photoUrl?: string;
  stars: number;
  coins: number;
  position: number; // 0 to 39 space index on board
  challengesCompleted: number;
  fastestTime?: number;
  badges: string[];
}

export type ChallengeCategory = 
  | 'movimiento'
  | 'trae_objeto'
  | 'tres_cosas'
  | 'ahorcado'
  | 'mimica'
  | 'telefono_descompuesto'
  | 'dibuja'
  | 'basta'
  | 'memoria'
  | 'risa_prohibida'
  | 'no_digas_si'
  | 'simon_dice'
  | 'quien_soy'
  | 'cooperativo';

export interface ChallengeCategoryInfo {
  id: ChallengeCategory;
  nombre: string;
  icono: string;
  color: string;
  descripcion: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: ChallengeCategory;
  durationSeconds: number; // 5, 10, 20, 30, 45, 60
  instructions: string;
  targetText?: string; // For Ahorcado, Dibuja, Mímica, ¿Quién Soy?
  itemsList?: string[]; // For Memoria or Tres Cosas
  categoryList?: string[]; // For Basta Express
  mode: 'solo' | 'dueto' | 'todos' | 'cooperativo';
  starsReward: number;
  coinsReward: number;
  presenterPhrase: string;
}

export type SpaceType = 
  | 'reto_solo'
  | 'reto_dueto'
  | 'reto_todos'
  | 'estrella'
  | 'cofre'
  | 'evento'
  | 'ruleta'
  | 'penalizacion';

export interface BoardSpace {
  id: number; // 0 to 39
  room: HouseRoom;
  title: string;
  type: SpaceType;
  icon: string;
  color: string;
  description: string;
  starBonus?: boolean;
}

export interface HouseEvent {
  id: string;
  title: string;
  description: string;
  presenterDialogue: string;
  actionType: 
    | 'dance_party' 
    | 'ice_cream' 
    | 'blackout' 
    | 'rain' 
    | 'naughty_dog' 
    | 'cat_steals' 
    | 'robot_mode' 
    | 'sing_mode' 
    | 'slow_motion';
  durationSeconds: number;
  icon: string;
}

export interface GameSettings {
  durationMinutes: 20 | 30 | 40;
  totalTurns: number;
  presenterVoiceEnabled: boolean;
  bgmActive: boolean;
  sfxActive: boolean;
}

export interface GameStats {
  startTime: number;
  totalChallengesPlayed: number;
  totalStarsAwarded: number;
  eventsTriggered: number;
  mostActivePlayerId?: string;
  fastestPlayerId?: string;
  funniestPlayerId?: string;
}

export type RouletteOptionId = 
  | 'advance_3'
  | 'gain_star'
  | 'all_play'
  | 'flash_challenge'
  | 'swap_position'
  | 'laugh_round'
  | 'coop_challenge'
  | 'minigame_surprise';

export interface RouletteOption {
  id: RouletteOptionId;
  title: string;
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
  presenterPhrase: string;
}

export interface GameState {
  screen: ScreenId;
  settings: GameSettings;
  players: Player[];
  currentPlayerIndex: number;
  turnCount: number;
  currentSpaceIndex: number;
  currentChallenge: Challenge | null;
  currentEvent: HouseEvent | null;
  usedChallengeIds: string[];
  isDiceRolling: boolean;
  lastDiceRoll: number | null;
  audioActive: boolean;
  presenterVoiceActive: boolean;
  gameStats: GameStats;
}
