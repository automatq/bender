"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "amazing",
    },
    {
      text: "web",
    },
    {
      text: "experiences",
    },
    {
      text: "with",
    },
    {
      text: "Chris",
      className: "text-yellow-500 dark:text-yellow-400",
    },
    {
      text: "Bender.",
      className: "text-yellow-600 dark:text-yellow-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-auto py-20">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base mb-8">
        Transform your ideas into stunning digital realities
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8">
        <button className="w-40 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 border border-transparent text-black text-sm font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all">
          Get Started
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm font-semibold hover:bg-gray-100 transition-all">
          Learn More
        </button>
      </div>
    </div>
  );
}
