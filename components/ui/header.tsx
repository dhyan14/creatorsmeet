"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AnimatedButton } from "./animated-button";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Developers", href: "#developers" },
  { name: "Contact Us", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "top-4" : "top-0"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={cn(
          "mx-auto",
          isScrolled ? "px-4" : ""
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isScrolled ? "scrolled" : "top"}
              initial={{ opacity: 0, y: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1,
                y: isScrolled ? 8 : 0,
                scale: isScrolled ? 0.9 : 1
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: isScrolled ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(16px)",
              }}
              className={cn(
                "w-full transition-all duration-500",
                isScrolled 
                  ? "rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.15)] max-w-6xl mx-auto border border-white/[0.08]" 
                  : ""
              )}
            >
              <div className={cn(
                "mx-auto transition-all duration-300",
                isScrolled 
                  ? "py-3 px-6" 
                  : "py-4 px-4"
              )}>
                <div className="flex items-center justify-between">
                  {/* Logo and Title */}
                  <Link href="/" className="flex items-center space-x-3">
                    <Image
                      src="/logo.png"
                      alt="CreatorsMeet Logo"
                      width={isScrolled ? 40 : 48}
                      height={isScrolled ? 40 : 48}
                      className="rounded-lg"
                    />
                    <span className={cn(
                      "font-semibold text-white transition-all duration-300",
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
                        className={cn(
                          "text-gray-200 hover:text-white transition-colors duration-300",
                          isScrolled ? "text-[15px]" : "text-base"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Right Section - Login/Sign Up Combined */}
                  <div className="flex items-center">
                    <AnimatedButton
                      href="/auth"
                      className={cn(
                        "transition-transform duration-300",
                        isScrolled ? "scale-90" : "scale-100"
                      )}
                    >
                      Login  / Sign Up
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
} 