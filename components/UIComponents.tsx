'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, title, className = '', hoverable = false }: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' } : {}}
      className={`bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-white/20 ${className}`}
    >
      {title && <h3 className="text-xl font-bold text-black mb-4">{title}</h3>}
      {children}
    </motion.div>
  );
}

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'info' | 'error';
}

export function StatusBadge({ status, variant = 'info' }: StatusBadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]}`}>
      {status}
    </span>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingSpinner({ size = 'md', color = 'yellow-600' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-${color} ${sizes[size]}`} />
  );
}
