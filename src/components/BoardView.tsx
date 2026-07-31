import React from 'react';
import { Player, BoardSpace, HouseRoom } from '../types';
import { BOARD_SPACES, ROOM_THEMES } from '../data/boardSpaces';
import { AVATARS_LIST } from '../data/avatars';
import { soundEngine } from '../audio/soundEngine';
import { PresenterHost } from './PresenterHost';

interface BoardViewProps {
  players: Player[];
  currentPlayerIndex: number;
  turnCount: number;
  totalTurns: number;
  onRollDice: () => void;
  presenterVoiceActive: boolean;
}

export const BoardView: React.FC<BoardViewProps> = ({
  players,
  currentPlayerIndex,
  turnCount,
  totalTurns,
  onRollDice,
  presenterVoiceActive
}) => {
  const activePlayer = players[currentPlayerIndex];
  const activeAvatar = AVATARS_LIST.find(a => a.id === activePlayer.avatarId) || AVATARS_LIST[0];

  // Group spaces by room for clean TV layout grid
  const roomsOrder: HouseRoom[] = ['Sala', 'Comedor', 'Cocina', 'Patio', 'Recámara', 'Baño', 'Garage', 'Azotea'];

  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-6 text-white select-none flex flex-col justify-between relative overflow-hidden">
      {/* Background Animated House Particles */}
      <div className="absolute top-5 left-5 text-4xl animate-bounce duration-1000 opacity-20 pointer-events-none">🛋️</div>
      <div className="absolute top-1/4 right-8 text-5xl animate-pulse opacity-20 pointer-events-none">🍳</div>
      <div className="absolute bottom-1/3 left-10 text-6xl animate-spin duration-3000 opacity-15 pointer-events-none">⭐</div>
      <div className="absolute bottom-10 right-12 text-5xl animate-bounce duration-700 opacity-25 pointer-events-none">🎈</div>

      {/* Host Commentary Banner */}
      <div className="max-w-4xl mx-auto w-full z-10">
        <PresenterHost
          dialogue={`¡Es el turno de ${activePlayer.name}! Estás en la posición ${activePlayer.position + 1}. ¡Tira el dado mágico para avanzar en la casa!`}
          mood="excited"
          autoSpeak={presenterVoiceActive}
        />
      </div>

      {/* Active Turn Controller Card */}
      <div
        style={{ borderColor: activePlayer.color }}
        className="max-w-4xl mx-auto w-full bg-slate-900/95 border-4 p-4 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 my-2 z-10"
      >
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundColor: activePlayer.color }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shadow-lg border-2 border-white animate-pulse flex-shrink-0"
          >
            {activeAvatar.icono}
          </div>

          <div className="text-left">
            <span className="text-[10px] sm:text-xs font-black uppercase text-yellow-300 tracking-widest bg-yellow-400/20 px-2 py-0.5 rounded-full border border-yellow-400/40">
              ¡TURNO ACTUAL! • {turnCount} / {totalTurns}
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white capitalize mt-0.5">
              {activePlayer.name}
            </h2>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-yellow-300">
              <span>⭐ {activePlayer.stars} Estrellas</span>
              <span>🪙 {activePlayer.coins} Monedas</span>
              <span className="text-slate-400">📍 Casilla {activePlayer.position + 1}</span>
            </div>
          </div>
        </div>

        {/* Big Roll Dice Button */}
        <button
          onClick={() => {
            soundEngine.playSFX('dice_roll');
            onRollDice();
          }}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-xl sm:text-2xl uppercase rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 animate-bounce"
        >
          🎲 ¡LANZAR DADO MÁGICO!
        </button>
      </div>

      {/* Board Grid by Rooms */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4 overflow-y-auto max-h-[60vh] pr-1 z-10">
        {roomsOrder.map(roomName => {
          const theme = ROOM_THEMES[roomName];
          const spacesInRoom = BOARD_SPACES.filter(s => s.room === roomName);

          return (
            <div
              key={roomName}
              className={`bg-slate-900/90 border-2 border-slate-700/80 rounded-2xl p-3 flex flex-col gap-2 shadow-xl bg-gradient-to-br ${theme.bgGradient}`}
            >
              {/* Room Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">{theme.icon}</span>
                  <span className="font-black text-xs uppercase tracking-wider text-yellow-300">
                    {theme.title}
                  </span>
                </div>
              </div>

              {/* Spaces in Room */}
              <div className="grid grid-cols-5 gap-1.5">
                {spacesInRoom.map(space => {
                  const playersHere = players.filter(p => p.position === space.id);
                  const isCurrentSpace = activePlayer.position === space.id;

                  return (
                    <div
                      key={space.id}
                      style={{ borderColor: space.color }}
                      className={`relative min-h-[64px] rounded-xl border-2 p-1 flex flex-col items-center justify-between transition-all duration-300 ${
                        isCurrentSpace
                          ? 'bg-yellow-400/30 ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50 scale-105'
                          : 'bg-slate-950/80 hover:bg-slate-800'
                      }`}
                    >
                      {/* Space Number */}
                      <span className="text-[9px] font-black text-slate-400 self-start px-1">
                        #{space.id + 1}
                      </span>

                      {/* Space Icon */}
                      <span className="text-lg my-0.5">{space.icon}</span>

                      {/* Players Tokens */}
                      {playersHere.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-0.5 w-full mt-0.5">
                          {playersHere.map(p => {
                            const pAvatar = AVATARS_LIST.find(a => a.id === p.avatarId);
                            return (
                              <div
                                key={p.id}
                                style={{ backgroundColor: p.color }}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] border border-white shadow-md animate-bounce"
                                title={`${p.name} (Casilla ${space.id + 1})`}
                              >
                                {pAvatar?.icono || '👤'}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Room Legend Footer */}
      <footer className="max-w-4xl mx-auto w-full bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800 flex flex-wrap justify-center items-center gap-4 text-[11px] font-bold text-slate-300 z-10">
        <span className="flex items-center gap-1">🎯 Reto Solo</span>
        <span className="flex items-center gap-1">👥 Reto Dueto</span>
        <span className="flex items-center gap-1 text-yellow-300">⭐ Estrella (+1)</span>
        <span className="flex items-center gap-1 text-emerald-400">🎁 Cofre</span>
        <span className="flex items-center gap-1 text-orange-400">⚡ Evento Casa</span>
        <span className="flex items-center gap-1 text-purple-400">🎡 Ruleta Loca</span>
      </footer>
    </div>
  );
};
