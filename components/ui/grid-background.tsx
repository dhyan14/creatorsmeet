import { cn } from "@/lib/utils";
import React from "react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Tech Background — Vercel/SSR safe, lightweight
 * Pure server component. No hooks, no window, no canvas.
 * Two CSS layers: a dot-grid pattern + 2 soft gradient glows.
 * All animation is via CSS keyframes (GPU composited).
 */
export default function GridBackground({ children, className }: GridBackgroundProps) {
  return (
    <div
      className={cn("relative w-full overflow-x-hidden min-h-screen bg-[#050010]", className)}
      data-grid-background
    >
      {/* Layer 1 — subtle dot grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(139, 92, 246, 0.18) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Layer 2 — violet glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)",
          animation: "bgGlow 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Layer 3 — pink glow bottom-right */}
      <div
        className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 65%)",
          animation: "bgGlow 28s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />

      {/* Layer 4 — top+bottom edge fade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #050010 0%, transparent 8%, transparent 92%, #050010 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}