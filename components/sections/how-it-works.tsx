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
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            Our streamlined process makes it easy to turn your ideas into reality. 
            Follow these simple steps to start your innovation journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/how-it-works.png"
                alt="Collaborative Development Process"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={100}
                priority
                className="object-contain"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Right Side - Steps */}
          <div className="grid grid-cols-1 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-sm p-5 rounded-xl border border-white/5 relative overflow-hidden group hover:border-purple-500/20 transition-colors"
              >
                {/* Step number */}
                <div className="absolute -right-4 -top-4 w-14 h-14 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full flex items-center justify-center text-3xl transform rotate-12 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="pr-10">
                  <h3 className="text-lg font-semibold mb-2 text-white/90">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
} 