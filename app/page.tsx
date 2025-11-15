'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import DecryptedText from '@/components/DecryptedText';
import Orb from '@/components/Orb';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { CardDemo } from '@/components/CardDemo';
import { LinkPreviewDemo } from '@/components/LinkPreviewDemo';
import { DottedGlowBackgroundDemo } from '@/components/DottedGlowBackgroundDemo';
import { FocusCardsDemo } from '@/components/FocusCardsDemo';
import { LayoutTextFlipDemo } from '@/components/LayoutTextFlipDemo';
import { PlaceholdersAndVanishInputDemo } from '@/components/PlaceholdersAndVanishInputDemo';
import { HeroParallaxDemo } from '@/components/HeroParallaxDemo';
import { TypewriterEffectSmoothDemo } from '@/components/TypewriterEffectSmoothDemo';
import { TextGenerateEffectDemo } from '@/components/TextGenerateEffectDemo';
import { CardStack } from '@/components/ui/card-stack';

import dynamic from 'next/dynamic';

const World = dynamic(() => import('@/components/ui/globe').then((m) => m.World), {
  ssr: false,
});

export default function Home() {
  const testimonials = [
    {
      quote: "EliteWeb transformed our online presence completely. Their attention to detail and innovative approach exceeded all our expectations.",
      name: "Sarah Johnson",
      designation: "CEO of TechStart Inc.",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    },
    {
      quote: "Working with EliteWeb was a game-changer for our business. The website they built is not only beautiful but also converts visitors into customers.",
      name: "Michael Chen",
      designation: "Founder of Digital Solutions",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    },
    {
      quote: "The team at EliteWeb delivered a stunning website that perfectly represents our brand. Their professionalism and support are unmatched.",
      name: "Emma Wilson",
      designation: "Marketing Director at Creative Agency",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
    },
    {
      quote: "Best investment we made for our business. The website designed by EliteWeb has increased our sales by 40% in the first quarter.",
      name: "David Rodriguez",
      designation: "Owner of E-commerce Store",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
    },
  ];

  const cardStackItems = [
    {
      id: 1,
      name: "Next.js",
      designation: "React Framework",
      content: (
        <p className="text-sm md:text-base">Modern React framework for building fast web applications with server-side rendering and static generation.</p>
      ),
    },
    {
      id: 2,
      name: "Framer Motion",
      designation: "Animation Library",
      content: (
        <p className="text-sm md:text-base">Powerful animation library for creating smooth, interactive motion designs with ease.</p>
      ),
    },
    {
      id: 3,
      name: "Tailwind CSS",
      designation: "Styling Framework",
      content: (
        <p className="text-sm md:text-base">Utility-first CSS framework for rapidly building custom designs with minimal CSS.</p>
      ),
    },
    {
      id: 4,
      name: "TypeScript",
      designation: "Type Safety",
      content: (
        <p className="text-sm md:text-base">Bring strong typing to JavaScript for better code quality and developer experience.</p>
      ),
    },
  ];

  const globeConfig = {
    pointSize: 4,
    globeColor: '#062056',
    showAtmosphere: true,
    atmosphereColor: '#FFFFFF',
    atmosphereAltitude: 0.1,
    emissive: '#062056',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: 'rgba(200, 220, 255, 0.85)',
    ambientLight: '#38bdf8',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ['#06b6d4', '#3b82f6', '#6366f1'];

  const globeData = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-yellow-50"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-yellow-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen">
        {/* Orb Background */}
        <div className="absolute inset-0 w-full h-full">
          <Orb />
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 relative z-20">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-b border-white/20"></div>
          <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-yellow-500 drop-shadow-lg"
            >
              <span className="text-yellow-400">Elite</span>Web
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-4"
            >
              <Link
                href="/signin"
                className="px-6 py-2 text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-lg"
              >
                Sign In
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Hero Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 w-full py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                <DecryptedText 
                  text="Chris"
                  speed={80}
                  maxIterations={15}
                  revealDirection="start"
                  className="text-yellow-400"
                />
                <br />
                <span className="text-yellow-500">
                  <DecryptedText 
                    text="Bender"
                    speed={80}
                    maxIterations={15}
                    revealDirection="center"
                  />
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 drop-shadow-lg">
                Developer you should hire for the best web projects.
                Building exceptional digital experiences that drive results.
              </p>
              <LayoutTextFlipDemo />
              <Link
                href="/pricing"
                className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl text-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-110 shadow-2xl shadow-yellow-500/50 relative overflow-hidden group drop-shadow-lg"
              >
                <span className="relative z-10">View Packages</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Typewriter Effect Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="relative z-10">
          <TypewriterEffectSmoothDemo />
        </div>
      </section>

      {/* Text Generate Effect Section */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-4xl mx-auto">
          <TextGenerateEffectDemo />
        </div>
      </section>

      {/* Questions Input Section */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="relative z-10">
          <PlaceholdersAndVanishInputDemo />
        </div>
      </section>

      {/* Dotted Glow CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
        <div className="relative z-10">
          <DottedGlowBackgroundDemo />
        </div>
      </section>

      {/* Focus Cards Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative z-10">
            <FocusCardsDemo />
          </div>
        </div>
      </section>

      {/* Tech Stack Preview Section */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 relative z-10"
          >
            <h2 className="text-5xl font-bold text-black mb-4">Our Technology</h2>
          </motion.div>
          <div className="relative z-10">
            <LinkPreviewDemo />
          </div>
        </div>
      </section>

      {/* Global Services Section */}
      <section className="py-40 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20 relative z-10"
          >
            <h2 className="text-5xl font-bold text-black mb-4">Global Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We serve clients worldwide, delivering premium web design solutions across continents.
              Wherever you are, we bring world-class expertise to your digital presence.
            </p>
          </motion.div>

          <div className="relative z-10 w-full h-[600px] md:h-[700px]">
            <World data={globeData} globeConfig={globeConfig} />
          </div>
        </div>
      </section>

      {/* Tech Stack Card Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-5xl font-bold text-black mb-4">Cutting-Edge Tech Stack</h2>
            <p className="text-xl text-gray-600">Built with the latest technologies and frameworks</p>
          </motion.div>
          <div className="flex justify-center relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <CardDemo />
              <CardStack items={cardStackItems} offset={10} scaleFactor={0.06} />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section className="py-20 relative overflow-hidden bg-black">
        <div className="relative z-10">
          <HeroParallaxDemo />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-50/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-5xl font-bold text-black mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real feedback from our satisfied customers</p>
          </motion.div>
          <div className="relative z-10">
            <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-600/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Transform your online presence with our premium web design services
            </p>
            <Link
              href="/pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl text-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-110 shadow-2xl shadow-yellow-500/50 relative overflow-hidden group"
            >
              <span className="relative z-10">View Pricing Plans</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-md py-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 EliteWeb. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
