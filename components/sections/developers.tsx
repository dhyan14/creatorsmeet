"use client";

import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { motion } from "framer-motion";
import { Developer } from "@/types/developer";
import { DeveloperPopup } from "@/components/ui/developer-popup";

const developers: Developer[] = [
  {
    name: "Dhyan Jain",
    institution: "UCP Institute Of Technology, SVGU",
    role: "Lead Full Stack Developer",
    bio: "Passionate about creating innovative solutions and mentoring fellow developers. Specialized in building scalable web applications and implementing modern development practices.",
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
      "Team Leadership"
    ],
    achievements: [
      "Led development of multiple successful web applications",
      "Mentored junior developers in modern web technologies",
      "Implemented CI/CD pipelines for streamlined deployment"
    ]
  },
  {
    name: "Sakshi Jain",
    institution: "JG University",
    role: "Frontend Development Specialist",
    bio: "Creative frontend developer with a keen eye for design and user experience. Focused on creating beautiful, responsive, and accessible web interfaces.",
    github: "https://github.com/sakshijain",
    email: "mailto:sakshi@example.com",
    linkedin: "https://linkedin.com/in/sakshijain",
    twitter: "https://twitter.com/sakshijain",
    skills: [
      "Frontend Development",
      "UI/UX Design",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Animation"
    ],
    achievements: [
      "Designed and implemented modern UI components library",
      "Improved website performance and accessibility",
      "Created responsive designs for multiple platforms"
    ]
  },
];

export default function DevelopersSection() {
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);

  return (
    <section id="developers" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            Meet Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Developers</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Talented individuals working together to bring innovative solutions to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 justify-items-center">
          {developers.map((developer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="w-full"
            >
              {/* Mobile View */}
              <div 
                className="lg:hidden w-full cursor-pointer"
                onClick={() => setSelectedDeveloper(developer)}
              >
                <div className="glass-effect bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-0.5 flex-shrink-0">
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
                    <div>
                      <h3 className="text-xl font-bold text-white">{developer.name}</h3>
                      <p className="text-purple-400 text-sm font-medium">{developer.institution}</p>
                      <p className="text-pink-400 text-sm mt-1">{developer.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block">
                <CardContainer containerClassName="py-12">
                  <CardBody className="glass-effect bg-zinc-900/40 backdrop-blur-sm relative group/card hover:shadow-2xl hover:shadow-purple-500/10 border-purple-500/20 hover:border-purple-500/40 w-full max-w-[30rem] h-auto rounded-xl p-8 border transition-all duration-300">
                    <div className="relative w-full">
                      <CardItem
                        translateZ={50}
                        className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-1"
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
                      className="text-3xl font-bold text-center text-white mb-2"
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
                      className="text-pink-400 text-center mb-4 font-medium text-sm"
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
                          <h3 className="text-white text-sm font-semibold mb-2 text-center">Expertise</h3>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {developer.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-white text-sm font-semibold mb-2 text-center">Key Achievements</h3>
                          <ul className="text-zinc-400 text-sm space-y-1">
                            {developer.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-center">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardItem>

                    <CardItem translateZ={50} className="flex justify-center gap-4">
                      <a
                        href={developer.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white hover:text-purple-400"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                      <a
                        href={developer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white hover:text-purple-400"
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={developer.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white hover:text-purple-400"
                      >
                        <FaTwitter className="w-5 h-5" />
                      </a>
                      <a
                        href={developer.email}
                        className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white hover:text-purple-400"
                      >
                        <HiMail className="w-5 h-5" />
                      </a>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DeveloperPopup
        developer={selectedDeveloper!}
        isOpen={selectedDeveloper !== null}
        onClose={() => setSelectedDeveloper(null)}
      />
    </section>
  );
} 