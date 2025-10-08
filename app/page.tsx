'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from '@/components/ui/header'
import GridBackground from '@/components/ui/grid-background'
import { HowItWorks } from '@/components/sections/how-it-works'
import DevelopersSection from '@/components/sections/developers'
import { ContactSection } from '@/components/sections/contact'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// @ts-ignore -- Ignoring type errors since types will be handled by Vercel build
export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effect for hero
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSignUp = () => {
    router.push('/signup-select');
  };

  const handleLogin = () => {
    router.push('/signin');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header />
      <GridBackground>
        <main className="relative w-full">
          {/* Enhanced Hero Section */}
          <section className="relative z-10 min-h-screen flex items-center justify-center py-20 md:py-0">
            {/* Animated Background Orbs */}
            <motion.div
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              style={{
                x: -mousePosition.x,
                y: -mousePosition.y,
              }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"
            />

            <motion.div 
              style={{ y, opacity }}
              className="container mx-auto px-4 mt-16 md:mt-0 max-w-[1400px]"
            >
              {/* Main Heading */}
              <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center w-full"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white pb-4 leading-tight max-w-[1000px] mx-auto">
                    Transform{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                      Ideas
                    </span>{" "}
                    Into Reality
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-lg md:text-xl text-gray-400 max-w-[700px] mx-auto leading-relaxed"
                  >
                    Connect with talented developers and innovators. Build groundbreaking projects with AI-powered matching and seamless collaboration tools.
                  </motion.p>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center mb-16"
              >
                <Link href="/signup-select">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 60px -15px rgba(168, 85, 247, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-10 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Free
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10 text-white py-4 px-10 rounded-full text-lg font-semibold transition-all backdrop-blur-sm"
                >
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4 justify-center items-center max-w-3xl mx-auto mb-16"
              >
                {[
                  { icon: "🤖", text: "AI Matching" },
                  { icon: "⚡", text: "Real-time Collaboration" },
                  { icon: "🔒", text: "Secure & Private" },
                  { icon: "🌍", text: "Global Network" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 backdrop-blur-sm hover:bg-white/10 transition-colors"
                  >
                    <span className="text-lg">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              >
                {[
                  { value: "10K+", label: "Active Users" },
                  { value: "500+", label: "Projects Built" },
                  { value: "98%", label: "Success Rate" },
                  { value: "50+", label: "Countries" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                opacity: { delay: 1.5, duration: 0.5 },
                y: { duration: 2, repeat: Infinity, repeatType: "reverse" },
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
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

          {/* Features Grid Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="container mx-auto px-4 max-w-[1200px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Everything You Need to{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Succeed
                  </span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Powerful features designed to help you collaborate, innovate, and build amazing projects together.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: "🎯",
                    title: "Smart Matching",
                    description: "AI-powered algorithm matches innovators with developers based on skills, interests, and project requirements.",
                  },
                  {
                    icon: "💬",
                    title: "Real-time Chat",
                    description: "Communicate instantly with your team members through integrated messaging and video calls.",
                  },
                  {
                    icon: "📊",
                    title: "Project Management",
                    description: "Track progress, manage tasks, and monitor milestones with our intuitive dashboard.",
                  },
                  {
                    icon: "🔐",
                    title: "Secure Platform",
                    description: "Enterprise-grade security ensures your ideas and data are always protected.",
                  },
                  {
                    icon: "🤝",
                    title: "Team Collaboration",
                    description: "Work together seamlessly with file sharing, code repositories, and collaborative tools.",
                  },
                  {
                    icon: "📈",
                    title: "Analytics & Insights",
                    description: "Get detailed insights into team performance and project progress with analytics.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Other Sections */}
          <HowItWorks />
          <DevelopersSection />
          
          {/* Testimonials Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
            <div className="container mx-auto px-4 max-w-[1200px] relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Loved by{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Innovators
                  </span>
                  {" "}& Developers
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Join thousands of creators who are already building their dreams on our platform.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Sarah Chen",
                    role: "Product Designer",
                    image: "SC",
                    content: "CreatorsMeet connected me with an amazing developer. Together we built a successful SaaS product that now has 1000+ users!",
                    rating: 5,
                  },
                  {
                    name: "Mike Rodriguez",
                    role: "Full Stack Developer",
                    image: "MR",
                    content: "The AI matching is incredibly accurate. I've worked on 5 projects through this platform and each collaboration was seamless.",
                    rating: 5,
                  },
                  {
                    name: "Emily Watson",
                    role: "Startup Founder",
                    image: "EW",
                    content: "This platform turned my idea into reality. The project management tools and collaboration features are top-notch!",
                    rating: 5,
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                        {testimonial.image}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <ContactSection />

          {/* CTA Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
            <div className="container mx-auto px-4 max-w-[1200px] relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-effect bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-purple-500/20 text-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Ready to Turn Your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Ideas Into Reality?
                  </span>
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of innovators and developers who are already building the future together.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/signup-select">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-purple-600 py-4 px-10 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
                    >
                      Get Started Now
                    </motion.button>
                  </Link>
                  <Link href="/signin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-white/30 hover:border-white/60 text-white py-4 px-10 rounded-full text-lg font-semibold transition-all backdrop-blur-sm"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Enhanced Footer */}
          <footer className="relative py-16 border-t border-white/10">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                  {/* Logo & Description */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="/logo.png"
                        alt="CreatorsMeet Logo"
                        className="w-10 h-10"
                      />
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        CreatorsMeet
                      </span>
                    </div>
                    <p className="text-gray-400 mb-6 max-w-md">
                      Connecting innovators with developers to build groundbreaking projects. 
                      Your gateway to collaborative innovation.
                    </p>
                    <div className="flex gap-4">
                      {[
                        { icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z", label: "GitHub" },
                        { icon: "M8 3C9.1 3 10 3.9 10 5s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 2.5c.83 0 1.5-.67 1.5-1.5S8.83 2.5 8 2.5 6.5 3.17 6.5 4 7.17 5.5 8 5.5M8 8c-1.86 0-5.5 1.07-5.5 3.2V14h11v-2.8C13.5 9.07 9.86 8 8 8m0 2.14c1.08 0 2.35.41 3.14 1.04.71.57 1.36 1.25 1.36 2.42v.4H3.5v-.4c0-1.17.65-1.85 1.36-2.42.79-.63 2.06-1.04 3.14-1.04M15.83 8C17.14 8 20 9.07 20 11.2V14h-3v-2.8c0-1.1-.65-1.99-1.61-2.52-.19-.1-.38-.18-.56-.28m-.83-.87c-.55-.15-1.12-.23-1.67-.23", label: "LinkedIn" },
                        { icon: "M22.46 6c-.85.38-1.75.63-2.7.74.97-.58 1.72-1.5 2.07-2.6-.91.54-1.92.93-2.99 1.14-.86-.92-2.08-1.49-3.43-1.49-2.59 0-4.69 2.1-4.69 4.69 0 .37.04.73.12 1.07-3.9-.2-7.35-2.06-9.66-4.9-.4.69-.63 1.5-.63 2.36 0 1.63.83 3.07 2.09 3.91-.77-.02-1.49-.24-2.13-.59v.06c0 2.27 1.62 4.17 3.77 4.6-.39.1-.81.16-1.24.16-.3 0-.6-.03-.89-.08.6 1.88 2.35 3.25 4.42 3.29-1.62 1.27-3.66 2.03-5.88 2.03-.38 0-.76-.02-1.13-.07 2.1 1.35 4.59 2.14 7.27 2.14 8.72 0 13.49-7.23 13.49-13.49 0-.21 0-.41-.01-.61.93-.67 1.73-1.5 2.37-2.45z", label: "Twitter" },
                      ].map((social, i) => (
                        <motion.a
                          key={i}
                          whileHover={{ scale: 1.1, y: -2 }}
                          href="#"
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d={social.icon} />
                          </svg>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="text-white font-semibold mb-4">Product</h3>
                    <ul className="space-y-2">
                      {['Features', 'Pricing', 'How it Works', 'FAQ'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Company */}
                  <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                      {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} CreatorsMeet. All rights reserved.
                  </p>
                  <div className="flex gap-6 text-sm">
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Privacy Policy
                    </a>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Terms of Service
                    </a>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Cookie Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </GridBackground>
    </div>
  )
} 