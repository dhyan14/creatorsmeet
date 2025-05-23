"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface AnimatedButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function AnimatedButton({ href, className, children }: AnimatedButtonProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "group relative inline-block h-[40px] w-[160px]",
        className
      )}
    >
      <div className="absolute inset-0 rounded-[30px] border-2 border-white/20 transition-all duration-300 group-hover:border-transparent" />
      
      {/* Background animation element */}
      <div className="absolute inset-0 rounded-[30px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-blue-600/80 opacity-0 
          transition-all duration-500 ease-out group-hover:opacity-100 
          [transform-origin:center_center] group-hover:scale-100 scale-0"
        />
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-[35px] bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-blue-600/0 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-70" />
      
      {/* Button content */}
      <div className="relative flex h-full w-full items-center justify-center rounded-[30px] px-4">
        <span className="font-medium text-[15px] text-white/90 transition-all duration-300 group-hover:text-white">
          {children}
        </span>
      </div>
    </Link>
  );
} 