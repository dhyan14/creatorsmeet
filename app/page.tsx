'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'

function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  )
}

function FeatureCard({ title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-black bg-opacity-50 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20"
    >
      <h3 className="text-xl font-bold mb-3 text-purple-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen relative overflow-hidden">
        <SpaceBackground />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-bold mb-6 animate-float bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Where Ideas Meet Code
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Connecting visionary idea creators with skilled developers to build the next generation of innovative solutions.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <FeatureCard
                title="For Idea Creators"
                description="Have a groundbreaking idea but need technical expertise? Find skilled developers who can bring your vision to life."
                delay={0.2}
              />
              <FeatureCard
                title="For Developers"
                description="Looking for exciting projects to work on? Connect with innovators who need your coding expertise."
                delay={0.4}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg"
            >
              Join the Community
            </motion.button>
          </motion.div>
        </div>
      </main>
    </>
  )
} 