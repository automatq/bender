'use client';
import React from 'react';
import { LinkPreview } from '@/components/ui/link-preview';

export function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-center flex-col px-4 py-10 relative z-20">
      <p className="text-black text-lg md:text-xl lg:text-2xl max-w-4xl text-center mb-6 leading-relaxed font-semibold">
        We build beautiful websites with{' '}
        <LinkPreview
          url="https://nextjs.org"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-cyan-600">
          Next.js
        </LinkPreview>
        , stunning animations with{' '}
        <LinkPreview
          url="https://www.framer.com/motion/"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-pink-600">
          Framer Motion
        </LinkPreview>
        , and modern styling with{' '}
        <LinkPreview
          url="https://tailwindcss.com"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-600 to-blue-600">
          Tailwind CSS
        </LinkPreview>
        .
      </p>
      <p className="text-black text-base md:text-lg lg:text-xl max-w-4xl text-center leading-relaxed font-medium">
        Explore our portfolio and see how we transform ideas into digital experiences that drive results.
      </p>
    </div>
  );
}
