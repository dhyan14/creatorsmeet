import { cn } from "@/lib/utils";
import React from "react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function GridBackground({ children, className }: GridBackgroundProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Grid background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          "opacity-50"
        )}
      />
      
      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-r from-black via-transparent to-black dark:from-black dark:via-transparent dark:to-black opacity-80"></div>
      
      {/* Content */}
      {children}
    </div>
  );
} 