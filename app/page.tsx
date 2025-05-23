'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import { BackgroundBeams } from '@/components/ui/background-beams'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="relative overflow-hidden">
        <BackgroundBeams />
        
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col items-center justify-center mb-16">
            <Image
              src="/logo.png"
              alt="Creators Meet Logo"
              width={80}
              height={80}
              className="mb-6"
              priority
            />
            <h1 className="font-ancizar-bold text-5xl md:text-7xl text-gradient text-center mb-8">
              Creators Meet
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-xl text-gray-300 mb-12 font-ancizar-regular">
              Connecting visionary idea creators with skilled developers to build the next generation of innovative solutions.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-effect p-6 rounded-xl border border-purple-500/20"
              >
                <h3 className="text-xl font-ancizar-bold mb-3 text-gradient">For Idea Creators</h3>
                <p className="text-gray-300 font-ancizar-regular">Have a groundbreaking idea but need technical expertise? Find skilled developers who can bring your vision to life.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-effect p-6 rounded-xl border border-purple-500/20"
              >
                <h3 className="text-xl font-ancizar-bold mb-3 text-gradient">For Developers</h3>
                <p className="text-gray-300 font-ancizar-regular">Looking for exciting projects to work on? Connect with innovators who need your coding expertise.</p>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-ancizar-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-full text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25"
            >
              Join the Community
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 