'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const packages = [
  {
    name: 'Single Page',
    price: 2000,
    packageType: 'single-page',
    description: 'Perfect for landing pages and simple sites',
    features: [
      'Responsive Design',
      'SEO Optimized',
      'Contact Form',
      '1 Round of Revisions',
      'Mobile Optimized',
      '2 Week Delivery',
    ],
  },
  {
    name: 'Multi Page',
    price: 8000,
    packageType: 'multi-page',
    description: 'Ideal for business websites with multiple pages',
    features: [
      'Up to 5 Pages',
      'Custom Design',
      'CMS Integration',
      '3 Rounds of Revisions',
      'SEO & Performance',
      'Blog Setup',
      '4 Week Delivery',
      'Priority Support',
    ],
    popular: true,
  },
  {
    name: 'Custom Project',
    price: null,
    packageType: 'custom',
    description: 'Tailored solutions for complex requirements',
    features: [
      'Unlimited Pages',
      'E-commerce Integration',
      'Custom Features',
      'Database Design',
      'API Integration',
      'Ongoing Support',
      'Timeline: TBD',
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [accountInfo, setAccountInfo] = useState({ name: '', email: '' });

  const handlePurchase = async (pkg: any) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      await proceedToCheckout(pkg, token);
    } else {
      setSelectedPackage(pkg);
      setShowAccountModal(true);
    }
  };

  const proceedToCheckout = async (pkg: any, token?: string) => {
    if (pkg.price === null) {
      toast.success('Please contact us for custom project pricing');
      return;
    }

    setLoading(pkg.packageType);

    try {
      const user = token ? JSON.parse(localStorage.getItem('user') || '{}') : null;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageType: pkg.packageType,
          title: pkg.name,
          description: pkg.description,
          price: pkg.price,
          userId: user?.id,
          userEmail: accountInfo.email || user?.email,
          userName: accountInfo.name || user?.name,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleGuestCheckout = () => {
    if (!accountInfo.name || !accountInfo.email) {
      toast.error('Please fill in all fields');
      return;
    }
    setShowAccountModal(false);
    proceedToCheckout(selectedPackage);
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" />
      
      <nav className="px-6 py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-black">
            <span className="text-yellow-600">Elite</span>Web
          </Link>
          <div className="flex gap-4">
            <Link href="/signin" className="px-6 py-2 text-black hover:text-yellow-600 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold text-black mb-4">Pricing Plans</h1>
            <p className="text-xl text-gray-600">Choose the perfect package for your project</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                  pkg.popular ? 'border-4 border-yellow-600' : 'border border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <h3 className="text-3xl font-bold text-black mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-6">{pkg.description}</p>

                <div className="mb-6">
                  {pkg.price !== null ? (
                    <div className="text-5xl font-bold text-black">
                      ${pkg.price.toLocaleString()}
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-black">Contact Us</div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-6 h-6 text-yellow-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(pkg)}
                  disabled={loading === pkg.packageType}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    pkg.popular ? 'bg-yellow-600 text-black hover:bg-yellow-500' : 'bg-black text-white hover:bg-gray-800'
                  } ${loading === pkg.packageType ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading === pkg.packageType ? 'Processing...' : pkg.price !== null ? 'Get Started' : 'Contact Us'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {showAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <h2 className="text-3xl font-bold text-black mb-4">Create Account</h2>
            <p className="text-gray-600 mb-6">
              Enter your details to proceed with checkout. An account will be created for you.
            </p>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                value={accountInfo.name}
                onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={accountInfo.email}
                onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowAccountModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleGuestCheckout}
                className="flex-1 py-3 bg-yellow-600 text-black rounded-lg font-semibold hover:bg-yellow-500"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
