"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AnimatedButton } from "./animated-button";
import { AuthPopup } from "./auth-popup";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Developers", href: "#developers" },
  { name: "Contact Us", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthClick = () => {
    setIsAuthOpen(true);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = isScrolled ? 80 : 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      {/* Blur Overlay */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
          backdropFilter: "blur(16px)",
        }}
      />

      <motion.header
        className="fixed left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="mx-auto px-4"
          initial={{ scale: 1, y: 0 }}
          animate={{ 
            scale: isScrolled ? 0.9 : 1,
            y: isScrolled ? 16 : 0
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          <motion.div
            initial={{ 
              opacity: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderColor: "rgba(255, 255, 255, 0)",
              boxShadow: "none"
            }}
            animate={{ 
              opacity: 1,
              backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.4)",
              borderColor: isScrolled ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0)",
              boxShadow: isScrolled ? "0 0 15px rgba(255, 255, 255, 0.15)" : "none"
            }}
            transition={{ duration: 0.3 }}
            style={{
              backdropFilter: "blur(16px)",
            }}
            className="w-full border rounded-2xl transition-all duration-300"
          >
            <div className={cn(
              "mx-auto transition-all duration-300",
              isScrolled ? "py-3 px-6" : "py-4 px-4"
            )}>
              <div className="flex items-center justify-between">
                {/* Logo and Title */}
                <Link href="/" className="flex items-center space-x-2 min-w-0">
                  <Image
                    src="/logo.png"
                    alt="CreatorsMeet Logo"
                    width={isScrolled ? 44 : 52}
                    height={isScrolled ? 44 : 52}
                    className="rounded-lg flex-shrink-0 transition-all duration-300"
                  />
                  <span className={cn(
                    "font-semibold text-white transition-all duration-300 truncate",
                    isScrolled ? "text-xl" : "text-2xl"
                  )}>
                    Creators Meet
                  </span>
                </Link>

                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center space-x-8">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "text-gray-200 hover:text-white transition-all duration-300",
                        isScrolled ? "text-[15px]" : "text-base"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Right Section - Separate Login and Sign Up buttons */}
                <div className="flex items-center space-x-4 relative">
                  <AnimatedButton
                    onClick={() => router.push('/signin')}
                    className="transition-all duration-300 bg-transparent border-2 border-purple-600/50 hover:border-purple-600 px-6"
                  >
                    Sign In
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => router.push('/signup-select')}
                    className="transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6"
                  >
                    Sign Up
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Auth Popup for both Mobile and Desktop */}
      <AuthPopup 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
} 