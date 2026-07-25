import { useState } from 'react';
import { BiomeId, CrystalId, PlayerAssignment, ScreenId } from './types';
import { NIVELES } from './data/gameData';
import { soundEngine } from './audio/soundEngine';
import { narratorEngine } from './audio/narratorEngine';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { HUD } from './components/HUD';
import { InventoryModal } from './components/InventoryModal';
import { SplashView } from './components/SplashView';
import { PrologueView } from './components/PrologueView';
import { AvatarSelectView } from './components/AvatarSelectView';
import { MapView } from './components/MapView';
import { LevelView } from './components/LevelView';
import { FinalShrineView } from './components/FinalShrineView';
import { CreditsView } from './components/CreditsView';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('splash');
  const [currentLevelNumber, setCurrentLevelNumber] = useState<number>(1);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [playerAssignments, setPlayerAssignments] = useState<PlayerAssignment[]>([]);
  const [collectedCrystals, setCollectedCrystals] = useState<CrystalId[]>([]);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [narratorEnabled, setNarratorEnabled] = useState<boolean>(true);
  const [inventoryOpen, setInventoryOpen] = useState<boolean>(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);

  // Derive current biome background
  const getActiveBiome = (): BiomeId => {
    if (screen === 'splash' || screen === 'prologue') return 'inicio';
    if (screen === 'avatar') return 'avatar';
    if (screen === 'map') return 'mapa';
    if (screen === 'final' || screen === 'credits') return 'final';
    if (screen === 'level') {
      const lev = NIVELES.find(n => n.n === currentLevelNumber);
      return lev ? lev.escena : 'templo';
    }
    return 'inicio';
  };

  const currentBiome = getActiveBiome();

  // Handlers
  const handleStartGame = () => {
    setScreen('prologue');
  };

  const handleFinishPrologue = () => {
    setScreen('avatar');
  };

  const handleSelectPlayerAssignments = (assignments: PlayerAssignment[]) => {
    setPlayerAssignments(assignments);
    if (assignments.length > 0) {
      setSelectedAvatarId(assignments[0].avatarId);
    }
    setScreen('map');
  };

  const handleSelectLevel = (levelNum: number) => {
    setCurrentLevelNumber(levelNum);
    setScreen('level');
  };

  const handleCompleteLevel = () => {
    const currentLev = NIVELES.find(n => n.n === currentLevelNumber);
    if (currentLev) {
      if (!collectedCrystals.includes(currentLev.cristal)) {
        setCollectedCrystals(prev => [...prev, currentLev.cristal]);
      }
      if (!completedLevels.includes(currentLevelNumber)) {
        setCompletedLevels(prev => [...prev, currentLevelNumber]);
      }
    }
  };

  const handleGoToMap = () => {
    setScreen('map');
  };

  const handleGoToFinal = () => {
    setScreen('final');
  };

  const handleFinishGame = () => {
    setScreen('credits');
  };

  const handleRestartGame = () => {
    setCollectedCrystals([]);
    setCompletedLevels([]);
    setSelectedAvatarId(null);
    setPlayerAssignments([]);
    setScreen('splash');
  };

  const handleToggleAudio = () => {
    const active = soundEngine.toggleAudio();
    setAudioMuted(!active);
  };

  const handleToggleNarrator = () => {
    const enabled = narratorEngine.setEnabled(!narratorEnabled);
    setNarratorEnabled(enabled);
  };

  return (
    <div className="min-h-screen bg-[#0f0c08] text-[#f5e6c8] relative overflow-x-hidden font-serif">
      {/* Dynamic Particle Background Canvas */}
      <BackgroundCanvas biome={currentBiome} />

      {/* Atmospheric Vignette Overlay */}
      <div className="cinematic-vignette" />

      {/* Top HUD */}
      <HUD
        collectedCrystals={collectedCrystals}
        onOpenInventory={() => setInventoryOpen(true)}
        onGoToMap={handleGoToMap}
        currentScreen={screen}
        narratorEnabled={narratorEnabled}
        onToggleNarrator={handleToggleNarrator}
        audioMuted={audioMuted}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Screen Router */}
      <main className="relative z-20 pt-12 pb-12">
        {screen === 'splash' && <SplashView onStart={handleStartGame} />}

        {screen === 'prologue' && (
          <PrologueView
            onContinue={handleFinishPrologue}
            narratorEnabled={narratorEnabled}
          />
        )}

        {screen === 'avatar' && (
          <AvatarSelectView
            onSelectPlayerAssignments={handleSelectPlayerAssignments}
            narratorEnabled={narratorEnabled}
          />
        )}

        {screen === 'map' && (
          <MapView
            completedLevels={completedLevels}
            collectedCrystals={collectedCrystals}
            playerAssignments={playerAssignments}
            onSelectLevel={handleSelectLevel}
            onGoToFinal={handleGoToFinal}
            narratorEnabled={narratorEnabled}
          />
        )}

        {screen === 'level' && (
          <LevelView
            level={NIVELES.find(n => n.n === currentLevelNumber) || NIVELES[0]}
            assignedPlayer={playerAssignments[currentLevelNumber - 1]}
            onCompleteLevel={handleCompleteLevel}
            onGoToMap={handleGoToMap}
            narratorEnabled={narratorEnabled}
            onHintUsed={() => setHintsUsed(h => h + 1)}
          />
        )}

        {screen === 'final' && (
          <FinalShrineView
            onFinishGame={handleFinishGame}
            narratorEnabled={narratorEnabled}
          />
        )}

        {screen === 'credits' && (
          <CreditsView
            selectedAvatarId={selectedAvatarId}
            collectedCrystals={collectedCrystals}
            onRestartGame={handleRestartGame}
          />
        )}
      </main>

      {/* Inventory Drawer Modal */}
      <InventoryModal
        isOpen={inventoryOpen}
        onClose={() => setInventoryOpen(false)}
        collectedCrystals={collectedCrystals}
        completedLevelsCount={completedLevels.length}
        totalLevelsCount={playerAssignments.length || 5}
      />
    </div>
  );
}
