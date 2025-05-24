import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const authOptions = [
  {
    title: 'For Creators',
    description: 'Join as a creator to bring your ideas to life',
    gradient: 'from-purple-500 to-pink-500',
    href: '/signup/creators'
  },
  {
    title: 'For Mentors',
    description: 'Guide and support innovative projects',
    gradient: 'from-blue-500 to-cyan-500',
    href: '/signup/mentors'
  },
  {
    title: 'For Company',
    description: 'Connect with talented creators and innovators',
    gradient: 'from-emerald-500 to-teal-500',
    href: '/signup/company'
  }
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();

  const handleOptionClick = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80; // Fixed offset for mobile
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        onClose(); // Close mobile menu after clicking
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-black/95 border-t border-white/10 backdrop-blur-lg"
        >
          <div className="p-4 space-y-2">
            {authOptions.map((option) => (
              <button
                key={option.title}
                onClick={() => handleOptionClick(option.href)}
                className={`w-full p-3 rounded-lg bg-gradient-to-r ${option.gradient} 
                  text-left transition-transform duration-200 hover:scale-[1.02]`}
              >
                <h3 className="text-lg font-semibold text-white">
                  {option.title}
                </h3>
                <p className="text-sm text-white/80">{option.description}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 