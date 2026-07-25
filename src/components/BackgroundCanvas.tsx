import React, { useEffect, useRef } from 'react';
import { BiomeId } from '../types';

interface BackgroundCanvasProps {
  biome: BiomeId;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ biome }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool setup
    const particleCount = biome === 'final' ? 70 : biome === 'observatorio' ? 100 : 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: biome === 'selva' ? Math.random() * 0.5 + 0.2 : -(Math.random() * 0.5 + 0.1),
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.03 + 0.01
    }));

    // Stars for observatory / final
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.4,
      twinkle: Math.random() * Math.PI * 2
    }));

    let t = 0;

    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Radial background gradient per biome
      const bgGrad = ctx.createRadialGradient(width / 2, height * 0.4, 50, width / 2, height / 2, Math.max(width, height) * 0.85);

      switch (biome) {
        case 'templo':
          bgGrad.addColorStop(0, '#2e2213');
          bgGrad.addColorStop(1, '#0e0b06');
          break;
        case 'selva':
          bgGrad.addColorStop(0, '#122617');
          bgGrad.addColorStop(1, '#060d08');
          break;
        case 'biblioteca':
          bgGrad.addColorStop(0, '#1a1f2b');
          bgGrad.addColorStop(1, '#0a0d14');
          break;
        case 'minas':
          bgGrad.addColorStop(0, '#152424');
          bgGrad.addColorStop(1, '#070f0f');
          break;
        case 'observatorio':
          bgGrad.addColorStop(0, '#14122d');
          bgGrad.addColorStop(1, '#06050f');
          break;
        case 'final':
          bgGrad.addColorStop(0, '#362813');
          bgGrad.addColorStop(1, '#0a0804');
          break;
        default:
          bgGrad.addColorStop(0, '#22190f');
          bgGrad.addColorStop(1, '#0a0704');
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw celestial stars if night/sky biomes
      if (biome === 'observatorio' || biome === 'final' || biome === 'inicio') {
        stars.forEach(s => {
          s.twinkle += 0.03;
          ctx.globalAlpha = 0.3 + Math.sin(s.twinkle) * 0.4;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      // Draw light shafts for Temple / Library / Final
      if (biome === 'templo' || biome === 'biblioteca' || biome === 'final') {
        for (let i = 0; i < 3; i++) {
          const x = width * (0.2 + i * 0.3) + Math.sin(t * 0.4 + i) * 35;
          const rayGrad = ctx.createLinearGradient(x, 0, x + 100, height);
          rayGrad.addColorStop(0, biome === 'biblioteca' ? 'rgba(52, 152, 219, 0.08)' : 'rgba(212, 175, 55, 0.09)');
          rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + 120, 0);
          ctx.lineTo(x + 220, height);
          ctx.lineTo(x + 40, height);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Particles render
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + Math.sin(t * 3 + p.x) * 0.4);
        ctx.globalAlpha = currentAlpha;

        let color = '#d4af37';
        if (biome === 'selva') color = '#2ecc71';
        else if (biome === 'biblioteca') color = '#3498db';
        else if (biome === 'minas') color = '#1abc9c';
        else if (biome === 'observatorio') color = '#9b59b6';
        else if (biome === 'final') color = '#f39c12';

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [biome]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};
