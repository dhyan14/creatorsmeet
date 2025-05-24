"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Touch</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Have a question or want to collaborate? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-effect bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder-zinc-500 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder-zinc-500 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder-zinc-500 transition-all duration-200 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                    ${submitted 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    }`}
                >
                  {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <div className="glass-effect bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:contact@creatorsmeet.com"
                  className="flex items-center space-x-3 text-zinc-300 hover:text-purple-400 transition-colors"
                >
                  <HiMail className="w-5 h-5" />
                  <span>contact@creatorsmeet.com</span>
                </a>
                <a 
                  href="https://discord.gg/creatorsmeet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-zinc-300 hover:text-purple-400 transition-colors"
                >
                  <FaDiscord className="w-5 h-5" />
                  <span>Join our Discord</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/creatorsmeet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-white hover:text-purple-400 transition-all duration-200"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com/creatorsmeet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-white hover:text-purple-400 transition-all duration-200"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/company/creatorsmeet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-white hover:text-purple-400 transition-all duration-200"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="glass-effect bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Our Location</h3>
              <p className="text-zinc-300 leading-relaxed">
                CreatorsMeet HQ<br />
                123 Innovation Street<br />
                Tech Hub, Digital City<br />
                Universe of Creativity
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 