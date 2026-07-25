import React, { useEffect, useState } from 'react';
import { AVATARES } from '../data/gameData';
import { Avatar, PlayerAssignment } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';

interface AvatarSelectViewProps {
  onSelectPlayerAssignments: (assignments: PlayerAssignment[]) => void;
  narratorEnabled: boolean;
}

interface SlotAssignment {
  avatarId: string;
  name: string;
}

export const AvatarSelectView: React.FC<AvatarSelectViewProps> = ({
  onSelectPlayerAssignments,
  narratorEnabled
}) => {
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [activeSlot, setActiveSlot] = useState<number>(1);
  const [assignments, setAssignments] = useState<Record<number, SlotAssignment>>({
    1: { avatarId: '', name: 'Jugador 1' },
    2: { avatarId: '', name: 'Jugador 2' },
    3: { avatarId: '', name: 'Jugador 3' },
    4: { avatarId: '', name: 'Jugador 4' },
    5: { avatarId: '', name: 'Jugador 5' },
  });

  useEffect(() => {
    soundEngine.setBiome('avatar');
    if (narratorEnabled) {
      narratorEngine.speak(
        'Elijan la cantidad de exploradores y asignen una identidad mística a cada jugador. El número de jugadores determinará los templos a conquistar.'
      );
    }
  }, [narratorEnabled]);

  const handlePlayerCountChange = (count: number) => {
    soundEngine.playSFX('click');
    setPlayerCount(count);
    if (activeSlot > count) {
      setActiveSlot(1);
    }
  };

  const handleAssignAvatar = (avatar: Avatar) => {
    soundEngine.playSFX('hover');
    
    // Check if avatar is already taken by another player
    const existingPlayerForAvatar = (Object.entries(assignments) as [string, SlotAssignment][]).find(
      ([slotNum, assign]) => Number(slotNum) <= playerCount && assign.avatarId === avatar.id && Number(slotNum) !== activeSlot
    );

    if (existingPlayerForAvatar) {
      soundEngine.playSFX('error');
      if (narratorEnabled) {
        narratorEngine.speak(`Esa identidad ya fue elegida por Jugador ${existingPlayerForAvatar[0]}. Selecciona otra.`);
      }
      return;
    }

    setAssignments(prev => ({
      ...prev,
      [activeSlot]: {
        ...prev[activeSlot],
        avatarId: avatar.id
      }
    }));

    if (narratorEnabled) {
      narratorEngine.speak(`${avatar.nombre} asignado a ${assignments[activeSlot].name || `Jugador ${activeSlot}`}.`);
    }

    // Auto advance to next unassigned slot if available
    if (activeSlot < playerCount) {
      setActiveSlot(activeSlot + 1);
    }
  };

  const handleNameChange = (slot: number, newName: string) => {
    setAssignments(prev => ({
      ...prev,
      [slot]: {
        ...prev[slot],
        name: newName
      }
    }));
  };

  // Check if all slots up to playerCount have an avatar assigned
  const allAssigned = Array.from({ length: playerCount }).every((_, idx) => {
    const slotNum = idx + 1;
    return Boolean(assignments[slotNum]?.avatarId);
  });

  const handleConfirm = () => {
    if (!allAssigned) return;
    soundEngine.playSFX('exito');
    narratorEngine.stop();

    const result: PlayerAssignment[] = Array.from({ length: playerCount }).map((_, idx) => {
      const slotNum = idx + 1;
      return {
        playerNumber: slotNum,
        avatarId: assignments[slotNum].avatarId,
        playerName: assignments[slotNum].name.trim() || `Jugador ${slotNum}`
      };
    });

    onSelectPlayerAssignments(result);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center z-20 max-w-5xl mx-auto select-none my-6 animate-fadeIn">
      <div className="text-xs font-cinzel tracking-[0.3em] text-[#8b5a2b] uppercase mb-1">
        Formación del Equipo de Expedición
      </div>

      <h2 className="text-2xl sm:text-4xl font-cinzel text-gold-glow mb-2">
        ¿Cuántos Jugadores Participan?
      </h2>

      <p className="text-xs sm:text-sm text-[#f5e6c8]/80 font-serif max-w-2xl mb-6 italic">
        El número de expedicionarios definirá la cantidad de niveles y cristales sagrados que la expedición deberá conquistar (1 a 5 templos).
      </p>

      {/* STEP 1: Select Player Count */}
      <div className="bg-[#1a140c]/90 border border-[#8b5a2b] p-4 sm:p-6 rounded-xl shadow-2xl mb-6 w-full max-w-2xl border-gold-glow">
        <div className="text-xs font-cinzel text-[#e9c96a] uppercase mb-3 font-bold tracking-wider">
          1. Número de Jugadores (Niveles de la Aventura)
        </div>
        <div className="flex justify-center gap-2 sm:gap-4">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              onClick={() => handlePlayerCountChange(num)}
              className={`flex-1 max-w-[80px] py-3 rounded-lg border font-cinzel text-center transition-all ${
                playerCount === num
                  ? 'bg-[#8b5a2b] text-[#f5e6c8] border-[#e9c96a] shadow-lg scale-105 font-bold'
                  : 'bg-[#241a0e] text-[#a08a6e] border-[#5c3a1a] hover:border-[#8b5a2b]'
              }`}
            >
              <div className="text-lg sm:text-2xl font-bold">{num}</div>
              <div className="text-[10px] uppercase text-[#e9c96a]">
                {num === 1 ? 'Jugador' : 'Jugadores'}
              </div>
            </button>
          ))}
        </div>
        <div className="text-xs text-[#8b5a2b] mt-3 italic font-serif">
          Aventura ajustada a <strong>{playerCount} {playerCount === 1 ? 'nivel' : 'niveles'}</strong> de desafío.
        </div>
      </div>

      {/* STEP 2: Player Slots Tabs */}
      <div className="w-full max-w-4xl mb-6">
        <div className="text-xs font-cinzel text-[#e9c96a] uppercase mb-3 font-bold tracking-wider">
          2. Asignar Identidad a Cada Expedicionario
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
          {Array.from({ length: playerCount }).map((_, idx) => {
            const slotNum = idx + 1;
            const isCurrent = activeSlot === slotNum;
            const assignedAvatar = AVATARES.find(a => a.id === assignments[slotNum]?.avatarId);

            return (
              <div
                key={slotNum}
                onClick={() => {
                  soundEngine.playSFX('click');
                  setActiveSlot(slotNum);
                }}
                className={`p-3 rounded-lg border cursor-pointer transition-all text-left relative ${
                  isCurrent
                    ? 'bg-[#2a1f12] border-[#e9c96a] shadow-lg shadow-[#d4af37]/20 scale-102'
                    : assignedAvatar
                    ? 'bg-[#18241b] border-[#27ae60]/60'
                    : 'bg-[#1a140c]/80 border-[#5c3a1a] hover:border-[#8b5a2b]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-cinzel uppercase text-[#e9c96a] font-bold">
                    Jugador {slotNum}
                  </span>
                  {assignedAvatar && (
                    <span className="text-xs text-[#27ae60]">✓</span>
                  )}
                </div>

                <input
                  type="text"
                  value={assignments[slotNum]?.name || ''}
                  onChange={e => handleNameChange(slotNum, e.target.value)}
                  onClick={e => e.stopPropagation()}
                  placeholder={`Nombre J${slotNum}`}
                  className="w-full bg-[#110d08] border border-[#5c3a1a] rounded px-2 py-0.5 text-xs text-[#f5e6c8] outline-none font-serif mb-1"
                />

                <div className="text-xs font-cinzel text-[#f5e6c8] truncate">
                  {assignedAvatar ? `${assignedAvatar.icono} ${assignedAvatar.nombre}` : 'Sin seleccionar'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: Grid of Avatars for Active Slot */}
      <div className="w-full max-w-5xl mb-8">
        <div className="text-xs font-cinzel text-[#8b5a2b] uppercase mb-3">
          Seleccionando Identidad para: <strong className="text-[#e9c96a]">{assignments[activeSlot]?.name || `Jugador ${activeSlot}`}</strong>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {AVATARES.map(a => {
            // Find if selected by current slot or another slot
            const takenBySlot = (Object.entries(assignments) as [string, SlotAssignment][]).find(
              ([slotNum, assign]) => Number(slotNum) <= playerCount && assign.avatarId === a.id
            )?.[0];

            const isCurrentAssigned = takenBySlot === String(activeSlot);
            const isOtherAssigned = takenBySlot && takenBySlot !== String(activeSlot);

            return (
              <div
                key={a.id}
                onClick={() => handleAssignAvatar(a)}
                className={`p-4 sm:p-5 rounded-lg border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden ${
                  isCurrentAssigned
                    ? 'bg-gradient-to-b from-[#8b5a2b]/80 to-[#2a1f12] border-[#d4af37] shadow-xl scale-105 ring-2 ring-[#e9c96a]'
                    : isOtherAssigned
                    ? 'bg-[#120d08]/90 border-[#3a2010] opacity-50 cursor-not-allowed'
                    : 'bg-[#1a140c]/90 border-[#5c3a1a] hover:border-[#8b5a2b] hover:bg-[#2a1f12]/60 hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="text-4xl mb-2 text-center">{a.icono}</div>
                  <h3 className="text-base font-cinzel text-gold-glow font-bold mb-1 text-center">
                    {a.nombre}
                  </h3>
                  <div className="text-[10px] font-cinzel text-[#8b5a2b] text-center uppercase tracking-wider mb-2">
                    {a.titulo}
                  </div>
                  <p className="text-xs text-[#f5e6c8]/90 font-serif leading-relaxed mb-2">
                    <strong className="text-[#d4af37]">Don:</strong> {a.hab}
                  </p>
                </div>

                {isOtherAssigned ? (
                  <div className="mt-2 pt-2 border-t border-[#3a2f1e] text-[10px] font-bold text-[#e74c3c] text-center uppercase">
                    🔒 Asignado a Jugador {takenBySlot}
                  </div>
                ) : isCurrentAssigned ? (
                  <div className="mt-2 pt-2 border-t border-[#3a2f1e] text-[10px] font-bold text-[#27ae60] text-center uppercase">
                    ✓ Asignado a {assignments[activeSlot]?.name || `Jugador ${activeSlot}`}
                  </div>
                ) : (
                  <div className="mt-2 pt-2 border-t border-[#3a2f1e] text-[10px] italic text-[#8b5a2b] text-center">
                    Toca para elegir
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Area */}
      <div className="flex flex-col items-center gap-3">
        <button
          disabled={!allAssigned}
          onClick={handleConfirm}
          className={`gold-btn px-10 py-4 text-base sm:text-lg font-cinzel font-bold tracking-widest uppercase rounded cursor-pointer transition-all shadow-2xl ${
            !allAssigned ? 'opacity-40 cursor-not-allowed' : 'animate-pulse'
          }`}
        >
          ¡Iniciar Expedición de {playerCount} {playerCount === 1 ? 'Jugador' : 'Jugadores'} ({playerCount} {playerCount === 1 ? 'Nivel' : 'Niveles'})!
        </button>

        {!allAssigned && (
          <span className="text-xs text-[#e74c3c] italic font-serif">
            Asigna una identidad a todos los {playerCount} jugadores para comenzar
          </span>
        )}
      </div>
    </div>
  );
};
