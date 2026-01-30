"use client";

import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Developer } from "@/types/developer";
import { DeveloperPopup } from "@/components/ui/developer-popup";

const developers: Developer[] = [
  {
    name: "Dhyan Jain",
    institution: "UCP Institute Of Technology, SVGU",
    role: "Lead Full Stack Developer & Platform Architect",
    bio: "Transforming ideas into reality through code. Passionate about creating innovative solutions and mentoring fellow developers. Specialized in building scalable web applications and implementing modern development practices.",
    github: "https://github.com/dhyanjain",
    email: "mailto:dhyan@example.com",
    linkedin: "https://linkedin.com/in/dhyanjain",
    twitter: "https://twitter.com/dhyanjain",
    skills: [
      "Full Stack Development",
      "React/Next.js",
      "Node.js",
      "TypeScript",
      "System Architecture",
      "Team Leadership",
      "AI Integration",
      "Cloud Platforms"
    ],
    achievements: [
      "Built CreatorsMeet platform connecting innovators with developers",
      "Led development of multiple successful web applications",
      "Mentored junior developers in modern web technologies",
      "Implemented CI/CD pipelines for streamlined deployment"
    ]
  },
  {
    name: "Chaitya Belani",
    institution: "UCP Institute Of Technology, SVGU",
    role: "Full Stack Developer & UI/UX Specialist",
    bio: "Passionate developer focused on creating seamless user experiences and robust backend systems. Dedicated to writing clean, maintainable code and delivering high-quality solutions that make a difference.",
    github: "https://github.com/chaityabelani",
    email: "mailto:chaitya@example.com",
    linkedin: "https://linkedin.com/in/chaityabelani",
    twitter: "https://twitter.com/chaityabelani",
    skills: [
      "Full Stack Development",
      "React/Next.js",
      "UI/UX Design",
      "TypeScript",
      "Database Design",
      "API Development",
      "Responsive Design",
      "Performance Optimization"
    ],
    achievements: [
      "Co-developed CreatorsMeet platform with modern design principles",
      "Implemented responsive and accessible user interfaces",
      "Optimized application performance and user experience",
      "Collaborated on building scalable backend architectures"
    ]
  }
];

const stats = [
  { label: "Projects Built", value: "50+", icon: "🚀" },
  { label: "Developers Helped", value: "100+", icon: "👥" },
  { label: "Code Commits", value: "10K+", icon: "💻" },
  { label: "Coffee Consumed", value: "∞", icon: "☕" }
];

export default function DevelopersSection() {
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  // Effect to toggle body scroll and hide header
  useEffect(() => {
    const header = document.querySelector('header');

    if (selectedDeveloper) {
      document.body.style.overflow = 'hidden';
      if (header) (header as HTMLElement).style.display = 'none';
    } else {
      document.body.style.overflow = 'unset';
      if (header) (header as HTMLElement).style.display = 'block';
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (header) (header as HTMLElement).style.display = 'block';
    };
  }, [selectedDeveloper]);

  const handleDeveloperClick = (developer: Developer, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    });
    setSelectedDeveloper(developer);
  };

  return (
    <section id="developers" className="relative py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
              👨‍💻 The Team Behind CreatorsMeet
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Meet Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
              Developers
            </span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Talented individuals working together to bring innovative solutions to life.
            Building the bridge between ideas and reality.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="glass-effect bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-zinc-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Developer Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 justify-items-center">
          {developers.map((developer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="w-full max-w-2xl"
            >
              {/* Mobile View - Enhanced */}
              <motion.div
                className="lg:hidden w-full cursor-pointer group"
                onClick={(e) => handleDeveloperClick(developer, e)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="glass-effect bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-0.5 flex-shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/60 flex items-center justify-center">
                          {developer.imageUrl ? (
                            <img
                              src={developer.imageUrl}
                              alt={developer.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                              {developer.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-zinc-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {developer.name}
                      </h3>
                      <p className="text-purple-400 text-sm font-medium mb-1">
                        {developer.institution}
                      </p>
                      <p className="text-pink-400 text-sm mb-3">
                        {developer.role}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {developer.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs border border-purple-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                        {developer.skills.length > 3 && (
                          <span className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs">
                            +{developer.skills.length - 3} more
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-400 text-sm line-clamp-2">
                        {developer.bio}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-purple-400 text-sm font-medium flex items-center gap-2">
                      View Full Profile
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Desktop View - Enhanced */}
              <div className="hidden lg:block cursor-pointer" onClick={(e) => handleDeveloperClick(developer, e)}>
                <CardContainer containerClassName="py-12">
                  <CardBody className="glass-effect bg-zinc-900/40 backdrop-blur-sm relative group/card hover:shadow-2xl hover:shadow-purple-500/20 border-purple-500/20 hover:border-purple-500/40 w-full max-w-[35rem] h-auto rounded-2xl p-8 border transition-all duration-300">
                    {/* Status Badge */}
                    <div className="absolute top-6 right-6">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-green-400 text-xs font-medium">Available</span>
                      </motion.div>
                    </div>

                    <div className="relative w-full">
                      <CardItem
                        translateZ={50}
                        className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-1 relative group-hover/card:scale-110 transition-transform duration-300"
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center">
                          {developer.imageUrl ? (
                            <img
                              src={developer.imageUrl}
                              alt={developer.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                              {developer.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </CardItem>
                    </div>

                    <CardItem
                      translateZ={50}
                      className="text-3xl font-bold text-center text-white mb-2 group-hover/card:text-purple-400 transition-colors"
                    >
                      {developer.name}
                    </CardItem>

                    <CardItem
                      translateZ={40}
                      className="text-purple-400 text-center mb-2 font-medium"
                    >
                      {developer.institution}
                    </CardItem>

                    <CardItem
                      translateZ={40}
                      className="text-pink-400 text-center mb-4 font-medium"
                    >
                      {developer.role}
                    </CardItem>

                    <CardItem
                      as="p"
                      translateZ={30}
                      className="text-zinc-300 text-center text-base mb-6 leading-relaxed"
                    >
                      {developer.bio}
                    </CardItem>

                    <CardItem translateZ={20} className="mb-8">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-white text-sm font-semibold mb-3 text-center flex items-center justify-center gap-2">
                            <span className="text-lg">🛠️</span>
                            Technical Expertise
                          </h3>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {developer.skills.map((skill, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/20 transition-all cursor-default"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-white text-sm font-semibold mb-3 text-center flex items-center justify-center gap-2">
                            <span className="text-lg">🏆</span>
                            Key Achievements
                          </h3>
                          <ul className="text-zinc-400 text-sm space-y-2">
                            {developer.achievements.map((achievement, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-2"
                              >
                                <span className="text-purple-400 mt-0.5">✓</span>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardItem>

                    <CardItem translateZ={50} className="space-y-4">
                      <div className="flex justify-center gap-3">
                        <motion.a
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          href={developer.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white hover:text-purple-400 border border-transparent hover:border-purple-500/30"
                        >
                          <FaGithub className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          href={developer.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white hover:text-purple-400 border border-transparent hover:border-purple-500/30"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          href={developer.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white hover:text-purple-400 border border-transparent hover:border-purple-500/30"
                        >
                          <FaTwitter className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          href={developer.email}
                          className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white hover:text-purple-400 border border-transparent hover:border-purple-500/30"
                        >
                          <HiMail className="w-5 h-5" />
                        </motion.a>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <span>View Full Portfolio</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.button>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-block glass-effect bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-3">
              Want to Join Our Team?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-md">
              We're always looking for talented developers to collaborate with. Let's build something amazing together!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>

      <DeveloperPopup
        developer={selectedDeveloper!}
        isOpen={selectedDeveloper !== null}
        onClose={() => setSelectedDeveloper(null)}
        clickPosition={clickPosition}
      />
    </section>
  );
} 