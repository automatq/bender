"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "TechStart Inc",
    link: "https://techstart.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-aaf4b51c473c?w=500&h=500&fit=crop",
  },
  {
    title: "Digital Solutions",
    link: "https://digitalsolutions.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop",
  },
  {
    title: "Creative Agency",
    link: "https://creativeagency.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
  },
  {
    title: "E-commerce Store",
    link: "https://ecommerce.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1533090161554-2c4383926760?w=500&h=500&fit=crop",
  },
  {
    title: "SaaS Platform",
    link: "https://saas.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
  },
  {
    title: "Portfolio Website",
    link: "https://portfolio.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1523993380962-f189505589ee?w=500&h=500&fit=crop",
  },
  {
    title: "Mobile App",
    link: "https://mobileapp.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1512941691920-25bda36b9a52?w=500&h=500&fit=crop",
  },
  {
    title: "Startup Hub",
    link: "https://startuphub.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
  },
  {
    title: "Web Analytics",
    link: "https://analytics.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop",
  },
  {
    title: "Design System",
    link: "https://designsystem.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
  },
  {
    title: "Marketing Tool",
    link: "https://marketingtool.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1533090161554-2c4383926760?w=500&h=500&fit=crop",
  },
  {
    title: "Business Dashboard",
    link: "https://dashboard.example.com",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-aaf4b51c473c?w=500&h=500&fit=crop",
  },
];
