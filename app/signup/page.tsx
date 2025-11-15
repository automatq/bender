'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import ElectricBorder from '@/components/ElectricBorder';
import '@/components/ElectricBorder.css';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Account created successfully!');
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        toast.error(data.error || 'Failed to create account');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <Toaster position="top-center" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full relative z-10"
      >
        <Link href="/" className="flex justify-center mb-8">
          <span className="text-3xl font-bold text-black">
            <span className="text-yellow-600">Elite</span>Web
          </span>
        </Link>

        <ElectricBorder
          color="#000000"
          speed={1.2}
          chaos={1.2}
          thickness={10}
          className="w-full max-w-sm"
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-black mb-2">Create Account</h1>
          <p className="text-gray-600 mb-8">Start your journey with us today</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-black to-gray-900 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-yellow-600 font-semibold hover:text-yellow-500">
              Sign In
            </Link>
          </p>
        </div>
        </ElectricBorder>
      </motion.div>
    </div>
  );
}
