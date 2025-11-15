'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CheckoutSuccessPage() {
  useEffect(() => {
    setTimeout(() => {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        window.location.href = userData.role === 'admin' ? '/admin' : '/dashboard';
      } else {
        window.location.href = '/signin';
      }
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-5xl font-bold text-black mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your project has been created.
        </p>
        <p className="text-gray-500">Redirecting you to your dashboard...</p>
        
        <Link
          href="/dashboard"
          className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30 transition-all"
        >
          Go to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
