"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Custom Web Design",
    description:
      "We create stunning, bespoke websites tailored to your brand identity. Every pixel is crafted with precision to deliver an exceptional user experience that converts visitors into customers.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
        <span className="text-3xl font-bold">Custom Web Design</span>
      </div>
    ),
  },
  {
    title: "Performance Optimized",
    description:
      "Lightning-fast loading times and optimized performance metrics. We use cutting-edge technologies and best practices to ensure your website ranks high on search engines and keeps visitors engaged.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <span className="text-3xl font-bold">Performance Optimized</span>
      </div>
    ),
  },
  {
    title: "Responsive & Mobile-First",
    description:
      "Your website looks stunning on every device. We build with mobile-first principles, ensuring perfect functionality on smartphones, tablets, and desktops.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500 text-white">
        <span className="text-3xl font-bold">Mobile-First Design</span>
      </div>
    ),
  },
  {
    title: "SEO & Analytics",
    description:
      "Built with SEO best practices from the ground up. We integrate comprehensive analytics to track user behavior, conversions, and help you make data-driven decisions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
        <span className="text-3xl font-bold">SEO & Analytics</span>
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full">
      <StickyScroll content={content} />
    </div>
  );
}
