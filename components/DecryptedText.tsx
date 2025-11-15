'use client';

import { useEffect, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  useOriginalCharsOnly?: boolean;
  className?: string;
  revealDirection?: 'start' | 'end' | 'center';
  characters?: string;
}

const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  useOriginalCharsOnly = false,
  className = '',
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!text) return;

    setIsAnimating(true);
    let iteration = 0;
    const textLength = text.length;
    let currentIndex = 0;

    const getRandomChar = (originalChar: string) => {
      if (useOriginalCharsOnly) {
        const textChars = text.split('');
        return textChars[Math.floor(Math.random() * textChars.length)];
      }
      if (originalChar === ' ') return ' ';
      return characters[Math.floor(Math.random() * characters.length)];
    };

    const getRevealOrder = () => {
      const indices = Array.from({ length: textLength }, (_, i) => i);
      
      if (revealDirection === 'center') {
        const center = Math.floor(textLength / 2);
        return indices.sort((a, b) => {
          const distA = Math.abs(a - center);
          const distB = Math.abs(b - center);
          return distA - distB;
        });
      }
      
      if (revealDirection === 'end') {
        return indices.reverse();
      }
      
      return indices; // 'start'
    };

    const revealOrder = getRevealOrder();
    const revealed = new Set<number>();

    const interval = setInterval(() => {
      const newText = text
        .split('')
        .map((char, index) => {
          if (revealed.has(index)) {
            return char;
          }

          const orderIndex = revealOrder.indexOf(index);
          if (orderIndex < currentIndex) {
            revealed.add(index);
            return char;
          }

          if (iteration < maxIterations) {
            return getRandomChar(char);
          }

          revealed.add(index);
          return char;
        })
        .join('');

      setDisplayText(newText);

      if (revealed.size === textLength) {
        clearInterval(interval);
        setIsAnimating(false);
      }

      iteration++;
      if (iteration % 2 === 0) {
        currentIndex++;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, useOriginalCharsOnly, revealDirection, characters]);

  return (
    <span className={`inline-block ${className} ${isAnimating ? 'animating' : ''}`}>
      {displayText || text}
    </span>
  );
};

export default DecryptedText;
