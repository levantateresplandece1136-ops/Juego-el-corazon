import React, { useEffect } from 'react';
import { CRISTALES, NIVELES, AVATARES } from '../data/gameData';
import { CrystalId, PlayerAssignment } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';

interface MapViewProps {
  completedLevels: number[];
  collectedCrystals: CrystalId[];
  playerAssignments: PlayerAssignment[];
  onSelectLevel: (levelNum: number) => void;
  onGoToFinal: () => void;
  narratorEnabled: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  completedLevels,
  collectedCrystals,
  playerAssignments,
  onSelectLevel,
  onGoToFinal,
  narratorEnabled
}) => {
  useEffect(() => {
    soundEngine.setBiome('mapa');
    if (narratorEnabled) {
      narratorEngine.speak(
        'El mapa de Aurelia despliega sus templos sagrados. Elijan el templo que desean explorar.'
      );
    }
  }, [narratorEnabled]);

  // Determine active levels according to player count
  const activeLevelsCount = playerAssignments.length > 0 ? playerAssignments.length : 5;
  const activeLevels = NIVELES.slice(0, activeLevelsCount);
  const allCompleted = completedLevels.length >= activeLevelsCount;

  // Node position presets according to active count
  const getNodePositions = (count: number) => {
    switch (count) {
      case 1:
        return [{ x: 470, y: 220 }];
      case 2:
        return [
          { x: 270, y: 220 },
          { x: 670, y: 220 }
        ];
      case 3:
        return [
          { x: 200, y: 260 },
          { x: 470, y: 160 },
          { x: 740, y: 260 }
        ];
      case 4:
        return [
          { x: 160, y: 280 },
          { x: 370, y: 160 },
          { x: 580, y: 280 },
          { x: 780, y: 160 }
        ];
      default:
        return [
          { x: 120, y: 290 },
          { x: 300, y: 160 },
          { x: 480, y: 280 },
          { x: 660, y: 160 },
          { x: 820, y: 280 }
        ];
    }
  };

  const nodePositions = getNodePositions(activeLevelsCount);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center z-20 max-w-5xl mx-auto select-none my-6 animate-fadeIn">
      <div className="text-xs font-cinzel tracking-[0.3em] text-[#8b5a2b] uppercase mb-1">
        Mapa de Expedición ({activeLevelsCount} {activeLevelsCount === 1 ? 'Nivel' : 'Niveles'})
      </div>

      <h2 className="text-2xl sm:text-4xl font-cinzel text-gold-glow mb-2">
        Los Templos Sagrados de Aurelia
      </h2>

      <p className="text-xs sm:text-sm text-[#f5e6c8]/80 font-serif max-w-xl mb-6 italic">
        Cada expedicionario lidera un templo sagrado. Completen los {activeLevelsCount} templos para despertar el Corazón de Aurelia.
      </p>

      {/* SVG Map Container */}
      <div className="w-full bg-[#161009]/90 border-2 border-[#8b5a2b] rounded-xl p-4 shadow-2xl relative mb-6 border-gold-glow">
        <svg viewBox="0 0 940 400" className="w-full h-auto drop-shadow-xl">
          {/* Connecting Path Lines */}
          {nodePositions.length > 1 &&
            nodePositions.slice(0, -1).map((p, i) => {
              const q = nodePositions[i + 1];
              const isPathUnlocked = completedLevels.includes(activeLevels[i].n);
              return (
                <path
                  key={i}
                  d={`M ${p.x} ${p.y} Q ${(p.x + q.x) / 2} ${(p.y + q.y) / 2 - 35} ${q.x} ${q.y}`}
                  fill="none"
                  stroke={isPathUnlocked ? '#d4af37' : '#5c3a1a'}
                  strokeWidth={isPathUnlocked ? '3.5' : '2'}
                  strokeDasharray={isPathUnlocked ? 'none' : '6 8'}
                  className="transition-all duration-700"
                />
              );
            })}

          {/* Level Nodes */}
          {activeLevels.map((niv, i) => {
            const pos = nodePositions[i] || { x: 470, y: 200 };
            const isCompleted = completedLevels.includes(niv.n);
            const isUnlocked = i === 0 || completedLevels.includes(activeLevels[i - 1].n);
            const crystal = CRISTALES[niv.cristal];

            // Assigned player info
            const playerAssign = playerAssignments[i];
            const avatar = playerAssign ? AVATARES.find(a => a.id === playerAssign.avatarId) : null;

            return (
              <g
                key={niv.n}
                onClick={() => {
                  if (isUnlocked) {
                    soundEngine.playSFX('click');
                    onSelectLevel(niv.n);
                  } else {
                    soundEngine.playSFX('error');
                  }
                }}
                className={`cursor-pointer transition-transform duration-300 ${
                  isUnlocked ? 'hover:scale-110' : 'opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Node Outer Circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="30"
                  fill="#241a0e"
                  stroke={isCompleted ? crystal.color : isUnlocked ? '#d4af37' : '#5c3a1a'}
                  strokeWidth="3"
                  className={isUnlocked ? 'filter drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]' : ''}
                />

                {/* Node Core / Crystal */}
                {isCompleted ? (
                  <circle cx={pos.x} cy={pos.y} r="14" fill={crystal.color} />
                ) : (
                  <text
                    x={pos.x}
                    y={pos.y + 7}
                    fill={isUnlocked ? '#d4af37' : '#8b5a2b'}
                    fontFamily="Cinzel"
                    fontSize="18"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {isUnlocked ? niv.n : '🔒'}
                  </text>
                )}

                {/* Level Title */}
                <text
                  x={pos.x}
                  y={pos.y + 50}
                  fill="#f5e6c8"
                  fontFamily="Cinzel"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="drop-shadow-md"
                >
                  {niv.titulo.replace('El ', '').replace('La ', '').replace('Las ', '')}
                </text>

                {/* Assigned Player Label */}
                {playerAssign && (
                  <text
                    x={pos.x}
                    y={pos.y - 42}
                    fill="#e9c96a"
                    fontFamily="Cinzel"
                    fontSize="11"
                    textAnchor="middle"
                    className="drop-shadow-md font-bold"
                  >
                    {playerAssign.playerName} {avatar ? `(${avatar.icono})` : ''}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Action Bar */}
      {allCompleted ? (
        <button
          onClick={() => {
            soundEngine.playSFX('campana');
            onGoToFinal();
          }}
          className="gold-btn px-10 py-4 text-base sm:text-lg font-cinzel font-bold tracking-widest uppercase rounded shadow-2xl animate-pulse cursor-pointer"
        >
          ◈ Reunir los {activeLevelsCount} Cristales en el Templo Final ◈
        </button>
      ) : (
        <div className="text-sm font-cinzel text-[#8b5a2b] bg-[#1a140c]/80 px-6 py-2 rounded-full border border-[#5c3a1a]">
          Cristales Reunidos: <strong className="text-[#d4af37]">{collectedCrystals.length}</strong> de {activeLevelsCount}
        </div>
      )}
    </div>
  );
};
