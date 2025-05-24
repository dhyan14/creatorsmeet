"use client";

import { Developer } from "@/types/developer";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

interface DeveloperPopupProps {
  developer: Developer;
  isOpen: boolean;
  onClose: () => void;
  clickPosition: { x: number; y: number };
}

export function DeveloperPopup({ developer, isOpen, onClose, clickPosition }: DeveloperPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with centered container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4"
          >
            {/* Popup */}
            <motion.div
              initial={{ 
                opacity: 0,
                scale: 0.5,
                x: clickPosition.x - window.innerWidth / 2,
                y: clickPosition.y - window.innerHeight / 2
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0
              }}
              exit={{ 
                opacity: 0,
                scale: 0.5,
                x: clickPosition.x - window.innerWidth / 2,
                y: clickPosition.y - window.innerHeight / 2
              }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-black/95 backdrop-blur-sm rounded-2xl p-6 max-h-[90vh] overflow-y-auto border border-white/10 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              >
                <IoClose className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="space-y-6 mt-6">
                {/* Profile Image */}
                <div className="w-28 h-28 rounded-full mx-auto overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-1">
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
                </div>

                {/* Basic Info */}
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{developer.name}</h3>
                  <p className="text-purple-400 font-medium mb-1">{developer.institution}</p>
                  <p className="text-pink-400 text-sm">{developer.role}</p>
                </div>

                {/* Bio */}
                <p className="text-zinc-300 text-center leading-relaxed mt-4">{developer.bio}</p>

                {/* Skills */}
                <div className="mt-6">
                  <h4 className="text-white text-sm font-semibold mb-3 text-center">Expertise</h4>
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

                {/* Achievements */}
                <div className="mt-6">
                  <h4 className="text-white text-sm font-semibold mb-3 text-center">Key Achievements</h4>
                  <ul className="text-zinc-400 text-sm space-y-2">
                    {developer.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-center">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-6">
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 