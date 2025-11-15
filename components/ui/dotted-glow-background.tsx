'use client';

import React, { useEffect, useRef } from 'react';

interface DottedGlowBackgroundProps {
  className?: string;
  opacity?: number;
  gap?: number;
  radius?: number;
  colorLightVar?: string;
  glowColorLightVar?: string;
  colorDarkVar?: string;
  glowColorDarkVar?: string;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
}

export const DottedGlowBackground: React.FC<DottedGlowBackgroundProps> = ({
  className = '',
  opacity = 1,
  gap = 10,
  radius = 1.6,
  colorLightVar = '--color-neutral-500',
  glowColorLightVar = '--color-neutral-600',
  colorDarkVar = '--color-neutral-500',
  glowColorDarkVar = '--color-sky-800',
  backgroundOpacity = 0,
  speedMin = 0.3,
  speedMax = 1.6,
  speedScale = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const getColor = (varName: string) => {
      const style = getComputedStyle(document.documentElement);
      let colorValue = style.getPropertyValue(varName).trim();
      
      // If it's already a hex color, return it
      if (colorValue.startsWith('#')) {
        return colorValue;
      }
      
      // If it's rgb/rgba, return it
      if (colorValue.startsWith('rgb')) {
        return colorValue;
      }
      
      // Default fallback colors
      return varName.includes('glow') ? '#1e293b' : '#6b7280';
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 107, g: 114, b: 128 };
    };

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const color = isDark ? getColor(colorDarkVar) : getColor(colorLightVar);
    const glowColor = isDark ? getColor(glowColorDarkVar) : getColor(glowColorLightVar);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      speed: number;
    }> = [];

    const cols = Math.ceil(rect.width / gap);
    const rows = Math.ceil(rect.height / gap);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        particles.push({
          x: i * gap + Math.random() * gap,
          y: j * gap + Math.random() * gap,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: radius,
          speed: speedMin + Math.random() * (speedMax - speedMin),
        });
      }
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((particle) => {
        particle.x += particle.vx * particle.speed * speedScale;
        particle.y += particle.vy * particle.speed * speedScale;

        if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(rect.width, particle.x));
        particle.y = Math.max(0, Math.min(rect.height, particle.y));

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 8
        );
        const glowRgb = hexToRgb(glowColor);
        const glowOpacity = opacity;
        gradient.addColorStop(0, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glowOpacity})`);
        gradient.addColorStop(1, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.radius * 8,
          particle.y - particle.radius * 8,
          particle.radius * 16,
          particle.radius * 16
        );

        // Draw dot
        const colorRgb = hexToRgb(color);
        ctx.fillStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [gap, radius, opacity, speedMin, speedMax, speedScale, colorLightVar, glowColorLightVar, colorDarkVar, glowColorDarkVar]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
};
