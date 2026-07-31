import React, { useState, useEffect } from 'react';
import { Player, Challenge, BoardSpace } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { narratorEngine } from '../audio/narratorEngine';
import { PresenterHost } from './PresenterHost';
import { AhorcadoMinigame } from './Minigames/AhorcadoMinigame';
import { MemoriaMinigame } from './Minigames/MemoriaMinigame';
import { getRandomAhorcadoWord } from '../data/challengesBank';

interface ChallengeViewProps {
  player: Player;
  challenge: Challenge;
  space: BoardSpace;
  onComplete: (success: boolean) => void;
  presenterVoiceActive: boolean;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  player,
  challenge,
  space,
  onComplete,
  presenterVoiceActive
}) => {
  const [secondsLeft, setSecondsLeft] = useState(challenge.durationSeconds);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [ahorcadoData] = useState(() => getRandomAhorcadoWord());

  // Timer logic
  useEffect(() => {
    let interval: number;
    if (isTimerActive && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            setIsFinished(true);
            soundEngine.playSFX('buzzer');
            if (presenterVoiceActive) {
              narratorEngine.speak('¡TIEMPO FINALIZADO! ¿Lo lograron a tiempo?');
            }
            return 0;
          }
          if (prev <= 6) {
            soundEngine.playSFX('countdown_tick');
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, secondsLeft, presenterVoiceActive]);

  const toggleTimer = () => {
    soundEngine.playSFX('click');
    setIsTimerActive(!isTimerActive);
  };

  const resetTimer = () => {
    soundEngine.playSFX('click');
    setIsTimerActive(false);
    setSecondsLeft(challenge.durationSeconds);
    setIsFinished(false);
  };

  const getCategoryColor = () => {
    switch (challenge.category) {
      case 'movimiento': return 'bg-amber-500 text-slate-950';
      case 'trae_objeto': return 'bg-emerald-500 text-slate-950';
      case 'tres_cosas': return 'bg-sky-500 text-slate-950';
      case 'ahorcado': return 'bg-pink-500 text-white';
      case 'mimica': return 'bg-purple-500 text-white';
      case 'dibuja': return 'bg-rose-500 text-white';
      case 'basta': return 'bg-yellow-400 text-slate-950';
      case 'memoria': return 'bg-indigo-500 text-white';
      case 'risa_prohibida': return 'bg-red-500 text-white';
      case 'no_digas_si': return 'bg-orange-500 text-slate-950';
      case 'cooperativo': return 'bg-teal-500 text-slate-950';
      default: return 'bg-yellow-400 text-slate-950';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8 flex flex-col items-center justify-between select-none text-white relative overflow-hidden">
      {/* Background Room Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-purple-950/60 to-slate-950/90 pointer-events-none" />

      {/* Host Speech Header */}
      <div className="max-w-4xl mx-auto w-full z-10">
        <PresenterHost
          dialogue={challenge.presenterPhrase || `¡Atención! ${player.name} debe cumplir este reto para ganar la estrella.`}
          mood="excited"
          autoSpeak={presenterVoiceActive}
        />
      </div>

      {/* Main Challenge TV Card */}
      <div className="max-w-3xl w-full bg-slate-900/95 border-4 border-yellow-400 p-6 sm:p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-6 z-10 my-4">
        
        {/* Category & Space Info */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className={`px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest shadow ${getCategoryColor()}`}>
            ✦ RETO: {challenge.category.replace('_', ' ').toUpperCase()}
          </span>

          <span className="bg-slate-800 text-yellow-300 border border-slate-700 font-bold text-xs px-3 py-1.5 rounded-full uppercase">
            {space.icon} {space.title}
          </span>
        </div>

        {/* Title & Instructions */}
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-yellow-300 uppercase tracking-tight mb-3">
            {challenge.title}
          </h2>

          <div className="bg-slate-950/80 p-5 rounded-2xl border-2 border-slate-700/80 max-w-xl mx-auto text-sm sm:text-base font-bold text-slate-100 leading-relaxed shadow-inner">
            {challenge.instructions}
          </div>
        </div>

        {/* Target Words / Hints if applicable */}
        {challenge.targetText && (
          <div className="bg-yellow-400/20 border-2 border-yellow-400 p-3 rounded-2xl text-yellow-200 text-sm font-black">
            🎯 PALABRA / OBJETIVO EN PANTALLA: <span className="text-white underline">{challenge.targetText}</span>
          </div>
        )}

        {/* Sub-Minigame Embeds */}
        {challenge.category === 'ahorcado' && (
          <AhorcadoMinigame
            targetWord={ahorcadoData.word}
            category={ahorcadoData.category}
            hint={ahorcadoData.hint}
            onSolved={() => {
              setIsTimerActive(false);
              setIsFinished(true);
            }}
          />
        )}

        {challenge.category === 'memoria' && (
          <MemoriaMinigame
            onSolved={() => {
              setIsTimerActive(false);
              setIsFinished(true);
            }}
          />
        )}

        {/* Giant Visual Countdown Timer */}
        <div className="w-full max-w-md bg-slate-950 p-6 rounded-3xl border-4 border-slate-800 flex flex-col items-center shadow-2xl relative overflow-hidden">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
            ⏱ CRONÓMETRO DE LA CASA
          </span>

          <div
            className={`text-6xl sm:text-8xl font-black tracking-widest my-2 font-mono transition-colors ${
              secondsLeft <= 5 ? 'text-red-500 animate-ping' : secondsLeft <= 10 ? 'text-amber-400' : 'text-yellow-400'
            }`}
          >
            {secondsLeft}s
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={toggleTimer}
              className={`px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition border cursor-pointer ${
                isTimerActive
                  ? 'bg-amber-500 text-slate-950 border-white'
                  : 'bg-emerald-500 text-white border-white hover:bg-emerald-400'
              }`}
            >
              {isTimerActive ? '⏸ PAUSAR TIEMPO' : '▶️ INICIAR TIEMPO'}
            </button>

            <button
              onClick={resetTimer}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-black text-xs uppercase border border-slate-600 cursor-pointer"
            >
              🔄 REINICIAR
            </button>
          </div>
        </div>

        {/* Host Referee Scoring Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              soundEngine.playSFX('star');
              onComplete(true);
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-lg uppercase rounded-2xl shadow-xl border-2 border-white transform hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            ⭐ ¡LO LOGRÓ! (+1 ESTRELLA & AVANZA)
          </button>

          <button
            onClick={() => {
              soundEngine.playSFX('error');
              onComplete(false);
            }}
            className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm uppercase rounded-2xl border border-slate-600 transition cursor-pointer"
          >
            ❌ CASI (SIGUIENTE TURNO)
          </button>
        </div>

      </div>
    </div>
  );
};
