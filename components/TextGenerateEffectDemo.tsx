"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `We create stunning, high-performance web experiences that drive real business results. Our team specializes in building modern, scalable applications using the latest technologies. From concept to launch, we deliver exceptional digital solutions tailored to your unique vision.`;

export function TextGenerateEffectDemo() {
  return (
    <div className="w-full h-auto py-20 px-4">
      <TextGenerateEffect words={words} />
    </div>
  );
}
