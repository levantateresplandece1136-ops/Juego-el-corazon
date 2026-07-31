import { useState } from 'react';
import { ScreenId, Player, GameSettings, BoardSpace, Challenge, HouseEvent, GameStats, RouletteOption } from './types';
import { BOARD_SPACES } from './data/boardSpaces';
import { getRandomChallenge } from './data/challengesBank';
import { HOUSE_EVENTS } from './data/houseEvents';
import { soundEngine } from './audio/soundEngine';
import { narratorEngine } from './audio/narratorEngine';

import { HeaderTVBar } from './components/HeaderTVBar';
import { SplashView } from './components/SplashView';
import { SetupView } from './components/SetupView';
import { BoardView } from './components/BoardView';
import { DiceModal } from './components/DiceModal';
import { ChallengeView } from './components/ChallengeView';
import { HouseEventModal } from './components/HouseEventModal';
import { FinalView } from './components/FinalView';
import { RouletteModal } from './components/RouletteModal';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('splash');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [turnCount, setTurnCount] = useState<number>(1);
  const [settings, setSettings] = useState<GameSettings>({
    durationMinutes: 30,
    totalTurns: 15,
    presenterVoiceEnabled: true,
    bgmActive: true,
    sfxActive: true
  });

  const [isDiceModalOpen, setIsDiceModalOpen] = useState<boolean>(false);
  const [isRouletteModalOpen, setIsRouletteModalOpen] = useState<boolean>(false);
  const [flashChallengeNextTurn, setFlashChallengeNextTurn] = useState<boolean>(false);
  const [allPlayNextTurn, setAllPlayNextTurn] = useState<boolean>(false);

  const [targetSpace, setTargetSpace] = useState<BoardSpace | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [currentEvent, setCurrentEvent] = useState<HouseEvent | null>(null);
  const [usedChallengeIds, setUsedChallengeIds] = useState<string[]>([]);
  const [audioActive, setAudioActive] = useState<boolean>(true);
  const [presenterVoiceActive, setPresenterVoiceActive] = useState<boolean>(true);

  const [gameStats, setGameStats] = useState<GameStats>({
    startTime: Date.now(),
    totalChallengesPlayed: 0,
    totalStarsAwarded: 0,
    eventsTriggered: 0
  });

  // Handlers
  const handleStartSetup = () => {
    setScreen('setup');
  };

  const handleStartGame = (newPlayers: Player[], newSettings: GameSettings) => {
    setPlayers(newPlayers);
    setSettings(newSettings);
    setCurrentPlayerIndex(0);
    setTurnCount(1);
    setGameStats({
      startTime: Date.now(),
      totalChallengesPlayed: 0,
      totalStarsAwarded: 0,
      eventsTriggered: 0
    });
    setScreen('board');
  };

  const handleOpenDiceRoll = () => {
    setIsDiceModalOpen(true);
  };

  const handleDiceRollResult = (roll: number) => {
    const player = players[currentPlayerIndex];
    let newPos = player.position + roll;
    if (newPos >= BOARD_SPACES.length - 1) {
      newPos = BOARD_SPACES.length - 1; // Cap at final space
    }

    const space = BOARD_SPACES.find(s => s.id === newPos) || BOARD_SPACES[0];
    setTargetSpace(space);

    // Update player position
    setPlayers(prev =>
      prev.map((p, idx) => (idx === currentPlayerIndex ? { ...p, position: newPos } : p))
    );
  };

  const handleProceedFromDice = () => {
    setIsDiceModalOpen(false);

    if (!targetSpace) return;

    // Handle space mechanics
    if (targetSpace.type === 'estrella') {
      soundEngine.playSFX('star');
      // Award star immediately
      setPlayers(prev =>
        prev.map((p, idx) =>
          idx === currentPlayerIndex ? { ...p, stars: p.stars + 1 } : p
        )
      );
      setGameStats(prev => ({ ...prev, totalStarsAwarded: prev.totalStarsAwarded + 1 }));
      setIsRouletteModalOpen(true);
    } else if (targetSpace.type === 'cofre') {
      soundEngine.playSFX('coin');
      // Award 3 coins & 1 star
      setPlayers(prev =>
        prev.map((p, idx) =>
          idx === currentPlayerIndex ? { ...p, coins: p.coins + 3, stars: p.stars + 1 } : p
        )
      );
      setGameStats(prev => ({ ...prev, totalStarsAwarded: prev.totalStarsAwarded + 1 }));
      setIsRouletteModalOpen(true);
    } else if (targetSpace.type === 'evento') {
      // Pick random event
      const randEvent = HOUSE_EVENTS[Math.floor(Math.random() * HOUSE_EVENTS.length)];
      setCurrentEvent(randEvent);
      setGameStats(prev => ({ ...prev, eventsTriggered: prev.eventsTriggered + 1 }));
      setScreen('event');
    } else {
      // Pick random challenge
      let challenge = getRandomChallenge(usedChallengeIds);
      
      // Apply flags from previous roulette
      if (flashChallengeNextTurn) {
        challenge = { ...challenge, durationSeconds: 15 };
        setFlashChallengeNextTurn(false);
      }
      if (allPlayNextTurn) {
        challenge = { ...challenge, mode: 'todos', title: `[¡TODOS JUEGAN!] ${challenge.title}` };
        setAllPlayNextTurn(false);
      }

      setUsedChallengeIds(prev => [...prev, challenge.id]);
      setCurrentChallenge(challenge);
      setScreen('challenge');
    }
  };

  const handleCompleteChallenge = (success: boolean) => {
    if (success && currentChallenge) {
      setPlayers(prev =>
        prev.map((p, idx) =>
          idx === currentPlayerIndex
            ? {
                ...p,
                stars: p.stars + currentChallenge.starsReward,
                coins: p.coins + currentChallenge.coinsReward,
                challengesCompleted: p.challengesCompleted + 1
              }
            : p
        )
      );
      setGameStats(prev => ({
        ...prev,
        totalChallengesPlayed: prev.totalChallengesPlayed + 1,
        totalStarsAwarded: prev.totalStarsAwarded + (currentChallenge?.starsReward || 1)
      }));
    }

    // Open Giant Roulette instead of immediate turn end!
    setIsRouletteModalOpen(true);
  };

  const handleRouletteOptionSelected = (option: RouletteOption) => {
    setIsRouletteModalOpen(false);

    const activePlayer = players[currentPlayerIndex];

    switch (option.id) {
      case 'advance_3': {
        const nextPos = Math.min(BOARD_SPACES.length - 1, activePlayer.position + 3);
        setPlayers(prev =>
          prev.map((p, idx) => (idx === currentPlayerIndex ? { ...p, position: nextPos } : p))
        );
        soundEngine.playSFX('star');
        break;
      }
      case 'gain_star': {
        setPlayers(prev =>
          prev.map((p, idx) => (idx === currentPlayerIndex ? { ...p, stars: p.stars + 1 } : p))
        );
        soundEngine.playSFX('star');
        break;
      }
      case 'all_play': {
        setAllPlayNextTurn(true);
        soundEngine.playSFX('party_horn');
        break;
      }
      case 'flash_challenge': {
        setFlashChallengeNextTurn(true);
        soundEngine.playSFX('countdown_tick');
        break;
      }
      case 'swap_position': {
        // Find leader or random other player
        const otherPlayers = players.filter((_, idx) => idx !== currentPlayerIndex);
        if (otherPlayers.length > 0) {
          const targetPlayer = otherPlayers.reduce((maxP, currP) =>
            currP.position > maxP.position ? currP : maxP
          );
          const activePos = activePlayer.position;
          const targetPos = targetPlayer.position;

          setPlayers(prev =>
            prev.map(p => {
              if (p.id === activePlayer.id) return { ...p, position: targetPos };
              if (p.id === targetPlayer.id) return { ...p, position: activePos };
              return p;
            })
          );
          soundEngine.playSFX('fanfare');
        }
        break;
      }
      case 'laugh_round': {
        // Trigger custom Laugh Event
        const laughEvent: HouseEvent = {
          id: 'laugh_round_event',
          title: '😂 RONDA DE RISA PROHIBIDA',
          description: '¡Nadie en la familia puede reírse ni sonreír durante 20 segundos! Si te ríes, ¡perderás la compostura de la casa!',
          presenterDialogue: '¡Risa prohibida para toda la familia! ¿Quién mantendrá la cara más seria?',
          actionType: 'robot_mode',
          durationSeconds: 20,
          icon: '😂'
        };
        setCurrentEvent(laughEvent);
        setScreen('event');
        return; // Event modal will dismiss and call advanceTurn
      }
      case 'coop_challenge': {
        // Award 1 star to current player + lowest star player
        const lowestStarPlayer = [...players].sort((a, b) => a.stars - b.stars)[0];
        setPlayers(prev =>
          prev.map(p => {
            if (p.id === activePlayer.id || p.id === lowestStarPlayer.id) {
              return { ...p, stars: p.stars + 1 };
            }
            return p;
          })
        );
        soundEngine.playSFX('star');
        break;
      }
      case 'minigame_surprise': {
        // Trigger surprise minigame challenge
        const minigameChallenge: Challenge = {
          id: 'surprise_minigame',
          title: '🎲 MINIJUEGO SORPRESA EN TV',
          category: 'ahorcado',
          durationSeconds: 30,
          instructions: '¡Resuelve la palabra oculta en la pantalla antes de que el tiempo expire!',
          mode: 'solo',
          starsReward: 2,
          coinsReward: 5,
          presenterPhrase: '¡Demuestra la agilidad mental en el minijuego sorpresa de la casa!'
        };
        setCurrentChallenge(minigameChallenge);
        setScreen('challenge');
        return;
      }
    }

    setScreen('board');
    advanceTurn();
  };

  const handleDismissEvent = () => {
    setScreen('board');
    advanceTurn();
  };

  const advanceTurn = () => {
    const nextPlayerIdx = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIdx);

    // If completed round of players, increase turn count
    if (nextPlayerIdx === 0) {
      const nextTurn = turnCount + 1;
      setTurnCount(nextTurn);

      // Check end game condition
      if (nextTurn > settings.totalTurns) {
        setScreen('final');
        return;
      }
    }
  };

  const handleToggleAudio = () => {
    const active = soundEngine.toggleAudio();
    setAudioActive(active);
  };

  const handleTogglePresenterVoice = () => {
    const enabled = narratorEngine.setEnabled(!presenterVoiceActive);
    setPresenterVoiceActive(enabled);
  };

  const handleGoHome = () => {
    setScreen('splash');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-400 selection:text-slate-950">
      {/* Top TV Status Bar (visible when playing) */}
      {screen !== 'splash' && screen !== 'setup' && (
        <HeaderTVBar
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          turnCount={turnCount}
          audioActive={audioActive}
          onToggleAudio={handleToggleAudio}
          presenterVoiceActive={presenterVoiceActive}
          onTogglePresenterVoice={handleTogglePresenterVoice}
          onGoHome={handleGoHome}
        />
      )}

      {/* Main Screen Router */}
      <main className="w-full">
        {screen === 'splash' && (
          <SplashView
            onStartSetup={handleStartSetup}
            presenterVoiceActive={presenterVoiceActive}
          />
        )}

        {screen === 'setup' && (
          <SetupView
            onStartGame={handleStartGame}
            presenterVoiceActive={presenterVoiceActive}
          />
        )}

        {screen === 'board' && (
          <BoardView
            players={players}
            currentPlayerIndex={currentPlayerIndex}
            turnCount={turnCount}
            totalTurns={settings.totalTurns}
            onRollDice={handleOpenDiceRoll}
            presenterVoiceActive={presenterVoiceActive}
          />
        )}

        {screen === 'challenge' && currentChallenge && targetSpace && (
          <ChallengeView
            player={players[currentPlayerIndex]}
            challenge={currentChallenge}
            space={targetSpace}
            onComplete={handleCompleteChallenge}
            presenterVoiceActive={presenterVoiceActive}
          />
        )}

        {screen === 'event' && currentEvent && (
          <HouseEventModal
            event={currentEvent}
            onDismiss={handleDismissEvent}
            presenterVoiceActive={presenterVoiceActive}
          />
        )}

        {screen === 'final' && (
          <FinalView
            players={players}
            stats={gameStats}
            onPlayAgain={handleStartSetup}
            presenterVoiceActive={presenterVoiceActive}
          />
        )}
      </main>

      {/* Dice Roll Modal Overlay */}
      {isDiceModalOpen && (
        <DiceModal
          player={players[currentPlayerIndex]}
          onDiceResult={handleDiceRollResult}
          targetSpace={targetSpace}
          onProceedToSpace={handleProceedFromDice}
          presenterVoiceActive={presenterVoiceActive}
        />
      )}

      {/* Giant Roulette Modal Overlay */}
      {isRouletteModalOpen && players[currentPlayerIndex] && (
        <RouletteModal
          player={players[currentPlayerIndex]}
          onOptionSelected={handleRouletteOptionSelected}
          presenterVoiceActive={presenterVoiceActive}
        />
      )}
    </div>
  );
}

