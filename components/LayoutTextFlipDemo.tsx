"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export function LayoutTextFlipDemo() {
  return (
    <div>
      <motion.div
        className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text="Building with "
          words={["React", "Next.js", "TypeScript", "Tailwind CSS"]} />
      </motion.div>
      <p
        className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400">
        Modern web technologies that power exceptional digital experiences.
      </p>
    </div>
  );
}
