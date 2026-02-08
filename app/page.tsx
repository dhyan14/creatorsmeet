"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HowItWorks } from "@/components/sections/how-it-works";
import DevelopersSection from "@/components/sections/developers";
import { ContactSection } from "@/components/sections/contact";
import { IconRocket, IconUsers, IconCode, IconBrain, IconChartBar, IconShield } from "@tabler/icons-react";

export default function HomePage() {
    const features = [
        {
            icon: <IconBrain className="w-8 h-8" />,
            title: "AI-Powered Matching",
            description: "Our intelligent algorithm connects you with the perfect collaborators based on skills, interests, and project goals.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <IconCode className="w-8 h-8" />,
            title: "Collaborative Workspace",
            description: "Built-in code editor, real-time collaboration, and integrated development tools for seamless teamwork.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <IconUsers className="w-8 h-8" />,
            title: "Smart Team Building",
            description: "Form teams based on complementary skills, availability, and shared vision for your projects.",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: <IconChartBar className="w-8 h-8" />,
            title: "Project Analytics",
            description: "Track progress, manage tasks, and visualize team performance with comprehensive dashboards.",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: <IconShield className="w-8 h-8" />,
            title: "Secure & Private",
            description: "Enterprise-grade security with end-to-end encryption for your code and communications.",
            gradient: "from-indigo-500 to-purple-500"
        },
        {
            icon: <IconRocket className="w-8 h-8" />,
            title: "Quick Deployment",
            description: "Integrated CI/CD pipelines and one-click deployment to bring your projects to life faster.",
            gradient: "from-pink-500 to-rose-500"
        }
    ];

    const stats = [
        { value: "10K+", label: "Active Users" },
        { value: "5K+", label: "Projects Built" },
        { value: "50K+", label: "Connections Made" },
        { value: "95%", label: "Success Rate" }
    ];

    return (
        <main className="min-h-screen bg-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                                <IconRocket className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">CreatorsMeet</h1>
                                <p className="text-xs text-gray-400">by Youdex Technologies</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <Link href="/signin">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 text-white hover:text-purple-400 transition-colors"
                                >
                                    Sign In
                                </motion.button>
                            </Link>
                            <Link href="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-4">
                <div className="container mx-auto text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block"
                        >
                            <span className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium backdrop-blur-sm">
                                🚀 Powered by Youdex Technologies
                            </span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                            Where{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                                Ideas Meet Talent
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Connect with innovators and developers to turn your vision into reality.
                            CreatorsMeet brings together the brightest minds to build the future, one project at a time.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                        >
                            <Link href="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                                >
                                    Start Building Now
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </motion.button>
                            </Link>
                            <Link href="#how-it-works">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 border border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/5 transition-all backdrop-blur-sm"
                                >
                                    Learn More
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="glass-effect bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all"
                                >
                                    <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-400 text-sm font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
                    >
                        <motion.div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative py-24 px-4">
                <div className="container mx-auto max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block mb-4"
                        >
                            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
                                ✨ Platform Features
                            </span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Everything You Need to{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                Succeed
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
                            Powerful tools and features designed to make collaboration seamless and productive.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="glass-effect bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all group"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">
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

            {/* How It Works Section */}
            <HowItWorks />

            {/* Developers Section */}
            <DevelopersSection />

            {/* Contact Section */}
            <ContactSection />

            {/* Footer */}
            <footer className="relative border-t border-white/10 py-12 px-4">
                <div className="container mx-auto max-w-[1400px]">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                                    <IconRocket className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">CreatorsMeet</h3>
                                    <p className="text-xs text-gray-400">by Youdex Technologies</p>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-4 max-w-md">
                                Connecting innovators with developers to build the future. Join our thriving community and turn your ideas into reality.
                            </p>
                            <p className="text-sm text-gray-500">
                                © 2026 Youdex Technologies. All rights reserved.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href="#how-it-works" className="text-gray-400 hover:text-purple-400 transition-colors">How It Works</Link></li>
                                <li><Link href="#developers" className="text-gray-400 hover:text-purple-400 transition-colors">Our Team</Link></li>
                                <li><Link href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</Link></li>
                                <li><Link href="/signin" className="text-gray-400 hover:text-purple-400 transition-colors">Sign In</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-white">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link href="/tips" className="text-gray-400 hover:text-purple-400 transition-colors">Tips & Guides</Link></li>
                                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">API Reference</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
                        <p>Built with ❤️ by <span className="text-purple-400 font-semibold">Youdex Technologies</span></p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
