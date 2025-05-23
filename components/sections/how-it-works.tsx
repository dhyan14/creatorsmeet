"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function HowItWorks() {
  const steps = [
    {
      title: "Create Your Profile",
      description: "Sign up and tell us about your skills or project ideas. Our AI-powered matching system starts working for you immediately.",
      icon: "🎯"
    },
    {
      title: "Connect & Collaborate",
      description: "Browse matched profiles, connect with potential collaborators, and discuss your vision in our real-time chat environment.",
      icon: "🤝"
    },
    {
      title: "Build Together",
      description: "Use our integrated project management tools to track progress, share files, and bring your ideas to life.",
      icon: "🚀"
    },
    {
      title: "Launch & Grow",
      description: "Deploy your project and continue to grow with our supportive community of innovators.",
      icon: "✨"
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            How It Works
          </h2>
          <p className="text-gray-300 text-lg">
            Our streamlined process makes it easy to turn your ideas into reality. 
            Follow these simple steps to start your innovation journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-10" />
              <Image
                src="/collaboration.jpg"
                alt="How It Works"
                fill
                className="object-cover"
              />
            </div>
            {/* Animated connection lines */}
            <div className="absolute inset-0 z-20">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <motion.path
                  d="M 50,200 C 150,100 250,300 350,200"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20" />
          </motion.div>

          {/* Right Side - Steps */}
          <div className="grid grid-cols-1 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl border border-purple-500/20 relative overflow-hidden group"
              >
                {/* Step number */}
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center text-4xl transform rotate-12 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="pr-12">
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
} 