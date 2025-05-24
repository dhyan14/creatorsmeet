import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthPopupProps {
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

export function AuthPopup({ isOpen, onClose }: AuthPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black/80 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Choose Your Path
                </h2>

                {/* Options */}
                <div className="space-y-4">
                  {authOptions.map((option, index) => (
                    <motion.button
                      key={option.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`w-full p-4 rounded-xl bg-gradient-to-r ${option.gradient} 
                        hover:scale-[1.02] transition-transform duration-200 text-left group`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {option.title}
                          </h3>
                          <p className="text-sm text-white/80 mt-1">
                            {option.description}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 