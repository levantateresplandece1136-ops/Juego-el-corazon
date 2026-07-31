import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player, GameStats } from '../types';
import { AVATARS_LIST } from '../data/avatars';
import { soundEngine } from '../audio/soundEngine';
import { PresenterHost } from './PresenterHost';

interface FinalViewProps {
  players: Player[];
  stats: GameStats;
  onPlayAgain: () => void;
  presenterVoiceActive: boolean;
}

export const FinalView: React.FC<FinalViewProps> = ({
  players,
  stats,
  onPlayAgain,
  presenterVoiceActive
}) => {
  // Sort players by stars descending
  const sortedPlayers = [...players].sort((a, b) => b.stars - a.stars);

  useEffect(() => {
    soundEngine.playSFX('victory_fanfare');

    // Confetti cannons burst
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const getAwardForIndex = (idx: number) => {
    switch (idx) {
      case 0: return '🏆 Gran Campeón de las Estrellas';
      case 1: return '🎨 Rey del Dibujo y Mímica';
      case 2: return '⚡ Titán del Movimiento Veloz';
      default: return '🎭 El Jugador Más Divertido de la Casa';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-900 p-4 sm:p-8 flex flex-col items-center justify-center select-none text-white relative overflow-hidden">
      
      {/* Background Celebration Lights */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce duration-700 opacity-60">🎉</div>
      <div className="absolute top-16 right-12 text-6xl animate-spin duration-3000 opacity-60">⭐</div>
      <div className="absolute bottom-10 left-16 text-6xl animate-pulse opacity-60">🏆</div>
      <div className="absolute bottom-14 right-20 text-6xl animate-bounce duration-1000 opacity-60">🎈</div>

      <div className="max-w-4xl w-full bg-slate-900/90 backdrop-blur-md border-4 border-yellow-400 p-6 sm:p-10 rounded-3xl shadow-2xl text-center z-10 my-4">
        
        {/* Presenter Speech */}
        <PresenterHost
          dialogue={`¡Felicidades a todos los competidores! Todos sobrevivieron a los retos de la Casa de Silvia. ¡Aquí está la ceremonia de premiación!`}
          mood="celebrate"
          autoSpeak={presenterVoiceActive}
        />

        <div className="inline-block bg-yellow-400 text-slate-950 font-black px-4 py-1 rounded-full uppercase text-xs sm:text-sm tracking-widest shadow mb-2">
          🏆 CEREMONIA FINAL • LA CASA DE SILVIA
        </div>

        <h1 className="text-3xl sm:text-6xl font-black text-yellow-300 uppercase tracking-tight mb-6">
          ¡GRAN VICTORIA FAMILIAR! 🎉
        </h1>

        {/* Winner Podium */}
        <div className="flex flex-col sm:flex-row items-end justify-center gap-4 my-8">
          {sortedPlayers.slice(0, 3).map((player, rank) => {
            const avatar = AVATARS_LIST.find(a => a.id === player.avatarId) || AVATARS_LIST[0];
            const podiumHeights = ['h-56', 'h-44', 'h-36'];
            const podiumMedals = ['🥇 1º LUGAR', '🥈 2º LUGAR', '🥉 3º LUGAR'];
            const podiumBorders = ['border-yellow-400', 'border-slate-300', 'border-amber-600'];

            return (
              <div
                key={player.id}
                className={`w-full sm:w-1/3 bg-slate-800/90 border-4 ${podiumBorders[rank]} p-4 rounded-3xl flex flex-col items-center justify-between shadow-2xl ${podiumHeights[rank]} transform hover:scale-105 transition`}
              >
                <div className="flex flex-col items-center">
                  <div
                    style={{ backgroundColor: player.color }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-xl border-2 border-white mb-2 animate-bounce"
                  >
                    {avatar.icono}
                  </div>
                  <span className="text-xs font-black uppercase text-yellow-300">{podiumMedals[rank]}</span>
                  <h3 className="text-lg font-black text-white truncate max-w-[150px]">{player.name}</h3>
                </div>

                <div className="bg-yellow-400 text-slate-950 font-black text-sm px-4 py-1.5 rounded-full shadow border border-white">
                  ⭐ {player.stars} Estrellas
                </div>
              </div>
            );
          })}
        </div>

        {/* All Diplomas List */}
        <div className="bg-slate-950/80 p-4 sm:p-6 rounded-2xl border-2 border-slate-700 my-6 text-left">
          <h3 className="text-sm sm:text-base font-black text-yellow-300 uppercase mb-3 text-center">
            📜 DIPLOMAS Y RECONOCIMIENTOS DE LA CASA
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedPlayers.map((player, idx) => {
              const avatar = AVATARS_LIST.find(a => a.id === player.avatarId) || AVATARS_LIST[0];
              return (
                <div
                  key={player.id}
                  style={{ borderColor: player.color }}
                  className="bg-slate-900 border-2 p-3 rounded-xl flex items-center justify-between gap-2 shadow"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{avatar.icono}</span>
                    <div>
                      <div className="text-sm font-black text-white">{player.name}</div>
                      <div className="text-[10px] font-bold text-yellow-300">{getAwardForIndex(idx)}</div>
                    </div>
                  </div>
                  <div className="text-xs font-black text-yellow-400 bg-slate-950 px-2 py-1 rounded">
                    ⭐ {player.stars}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Victory Photo Frame & Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-300 my-4">
          <span>🎯 Total de Retos Superados: <strong className="text-yellow-300">{stats.totalChallengesPlayed}</strong></span>
          <span>⭐ Estrellas Totales de la Familia: <strong className="text-yellow-300">{stats.totalStarsAwarded}</strong></span>
          <span>⚡ Eventos Especiales: <strong className="text-yellow-300">{stats.eventsTriggered}</strong></span>
        </div>

        {/* Play Again Action Button */}
        <button
          onClick={() => {
            soundEngine.playSFX('fanfare');
            onPlayAgain();
          }}
          className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-xl sm:text-2xl uppercase rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 active:scale-95 transition cursor-pointer animate-bounce"
        >
          🔄 ¡JUGAR OTRA PARTIDA EN LA CASA DE SILVIA!
        </button>
      </div>
    </div>
  );
};
