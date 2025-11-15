'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LinkPreviewProps {
  url: string;
  className?: string;
  children: React.ReactNode;
  imageSrc?: string;
  isStatic?: boolean;
  width?: number;
  height?: number;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({
  url,
  className = '',
  children,
  imageSrc,
  isStatic = false,
  width = 200,
  height = 125,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="relative inline-block">
      <a
        href={url}
        className={`relative cursor-pointer hover:opacity-80 transition-opacity ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {children}
      </a>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 top-full mt-2 left-0 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          style={{ width: `${width}px` }}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="preview"
              className="w-full h-auto object-cover"
              style={{ maxHeight: `${height}px` }}
            />
          ) : (
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center" style={{ height: `${height}px` }}>
              <span className="text-xs text-neutral-500">Preview</span>
            </div>
          )}

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
            <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">{url}</p>
          </div>
        </motion.div>
      )}
    </span>
  );
};
