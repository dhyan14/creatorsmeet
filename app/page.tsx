'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/ui/header'
import GridBackground from '@/components/ui/grid-background'
import { HowItWorks } from '@/components/sections/how-it-works'
import DevelopersSection from '@/components/sections/developers'
import { ContactSection } from '@/components/sections/contact'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <GridBackground>
        <main className="relative w-full">
          {/* Hero Section */}
          <section className="relative z-10 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white pb-2">
                    Your All-In-One Innovation Network
                  </h1>
                  <p className="mt-4 text-xl md:text-2xl text-purple-200/90 font-light">
                    Where Skills And Ideas Come Together
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <p className="text-xl text-gray-300 mb-12">
                  Step into a world where innovation knows no bounds. Creators Meet is your gateway to 
                  transforming visionary ideas into groundbreaking realities. Our platform seamlessly 
                  connects forward-thinking creators with skilled developers, fostering collaborations 
                  that shape the future.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-effect p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      Innovate Without Limits
                    </h3>
                    <p className="text-gray-300">
                      Launch your ideas into reality with our powerful collaboration tools and global network 
                      of talented developers ready to bring your vision to life.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-effect p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      Connect & Create
                    </h3>
                    <p className="text-gray-300">
                      Join a thriving ecosystem of creators, developers, and visionaries. Find your perfect 
                      match and build something extraordinary together.
                    </p>
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-full text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25"
                  >
                    Start Creating
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-purple-600/50 hover:border-purple-600 text-white py-4 px-8 rounded-full text-lg transition-all"
                  >
                    Explore Projects
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className="w-6 h-10 rounded-full border-2 border-purple-500/50 flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-purple-500"
                />
              </div>
            </motion.div>
          </section>

          {/* Other Sections */}
          <HowItWorks />
          <DevelopersSection />
          <ContactSection />

          {/* Footer */}
          <footer className="relative py-12 text-center text-zinc-400">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <img
                    src="/logo.png"
                    alt="CreatorsMeet Logo"
                    className="w-12 h-12 mx-auto mb-4"
                  />
                  <p className="text-sm">
                    CreatorsMeet © {new Date().getFullYear()}. All rights reserved.
                  </p>
                </div>
                <div className="text-sm">
                  <a href="#" className="hover:text-purple-400 transition-colors mx-4">Privacy Policy</a>
                  <a href="#" className="hover:text-purple-400 transition-colors mx-4">Terms of Service</a>
                  <a href="#" className="hover:text-purple-400 transition-colors mx-4">Cookie Policy</a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </GridBackground>
    </div>
  )
} 