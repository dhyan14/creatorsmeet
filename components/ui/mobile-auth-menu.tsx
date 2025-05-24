import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileAuthMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const authOptions = [
  {
    title: 'For Creators',
    description: 'Join as a creator to bring your ideas to life',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'For Mentors',
    description: 'Guide and support innovative projects',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'For Company',
    description: 'Connect with talented creators and innovators',
    gradient: 'from-emerald-500 to-teal-500'
  }
];

export function MobileAuthMenu({ isOpen, onClose }: MobileAuthMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-full left-0 right-0 mt-2 overflow-hidden"
        >
          <div className="bg-black/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl mx-4">
            {authOptions.map((option, index) => (
              <motion.button
                key={option.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full p-4 bg-gradient-to-r ${option.gradient} 
                  text-left group border-b last:border-b-0 border-white/10`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {option.title}
                  </h3>
                  <p className="text-sm text-white/80 mt-1">
                    {option.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 