'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SignupSelect() {
  const router = useRouter();

  const roles = [
    {
      id: 'creator',
      title: 'Creator / Innovator',
      description: 'I have an idea and need developers',
      icon: '💡',
      gradient: 'from-purple-600 to-pink-600',
      hoverGradient: 'from-purple-700 to-pink-700',
      features: ['Submit project ideas', 'AI-powered matching', 'Find developers', 'Build your vision'],
      available: true,
      route: '/signup/creators'
    },
    {
      id: 'mentor',
      title: 'Mentor',
      description: 'I want to guide and help others',
      icon: '🎓',
      gradient: 'from-blue-600 to-cyan-600',
      hoverGradient: 'from-blue-700 to-cyan-700',
      features: ['Share expertise', 'Mentor teams', 'Guide projects', 'Build community'],
      available: false,
      route: '#'
    },
    {
      id: 'company',
      title: 'Company',
      description: 'Looking to recruit talent',
      icon: '🏢',
      gradient: 'from-green-600 to-lime-600',
      hoverGradient: 'from-green-700 to-lime-700',
      features: ['Post opportunities', 'Find talent', 'Browse projects', 'Sponsor teams'],
      available: false,
      route: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full"
      >
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <svg 
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/logo.png"
                alt="CreatorsMeet Logo"
                width={80}
                height={80}
                className="mx-auto rounded-xl"
              />
            </motion.div>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join as a{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient">
              Creator
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose your role and start building amazing projects with the perfect team
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={role.available ? { y: -8, scale: 1.02 } : {}}
              className={`relative group ${!role.available && 'opacity-60'}`}
            >
              <div className={`glass-effect bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 h-full transition-all duration-300 ${
                role.available ? 'hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20' : ''
              }`}>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${role.gradient} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}>
                  {role.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {role.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {role.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {role.available ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(role.route)}
                    className={`w-full py-4 bg-gradient-to-r ${role.gradient} hover:${role.hoverGradient} text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2`}
                  >
                    Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                ) : (
                  <div className="w-full py-4 bg-gray-700/30 text-gray-500 rounded-xl font-semibold text-center border border-gray-700/50">
                    Coming Soon
                  </div>
                )}

                {/* Badge for available */}
                {role.available && (
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Available Now
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sign in link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/signin" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto"
        >
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '500+', label: 'Projects' },
            { value: '98%', label: 'Success Rate' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
} 