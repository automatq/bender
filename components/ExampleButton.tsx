'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ExampleButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
}

export default function ExampleButton({ 
  label = 'Click Me', 
  variant = 'primary',
  onClick 
}: ExampleButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
    onClick?.();
  };

  const variants = {
    primary: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30',
    secondary: 'bg-gradient-to-r from-black to-gray-900 text-white hover:from-gray-900 hover:to-black shadow-lg',
    outline: 'border-2 border-black/30 text-black hover:bg-black/10 backdrop-blur-sm',
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-lg font-semibold transition-all ${variants[variant]} ${
        clicked ? 'ring-4 ring-yellow-300' : ''
      }`}
    >
      {label}
    </motion.button>
  );
}
