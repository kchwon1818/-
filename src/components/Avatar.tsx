import React from "react";

interface AvatarProps {
  seed: string;
  size?: number;
  className?: string;
}

export default function Avatar({ seed, size = 120, className = "" }: AvatarProps) {
  // Generate initials from the seed string (up to 2 letters)
  const initials = seed
    ? seed
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ME";

  // Use the sum of character codes to generate a stable, deterministic color profile
  const charSum = seed
    ? seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : 42;

  // Modern soft color palettes (background and dynamic patterns)
  const palettes = [
    { bg: "from-indigo-500 to-violet-600", text: "text-white", accent: "rgba(255,255,255,0.15)", border: "border-indigo-200" },
    { bg: "from-emerald-400 to-teal-600", text: "text-white", accent: "rgba(255,255,255,0.15)", border: "border-emerald-200" },
    { bg: "from-amber-400 to-orange-500", text: "text-white", accent: "rgba(255,255,255,0.15)", border: "border-amber-200" },
    { bg: "from-pink-500 to-rose-600", text: "text-white", accent: "rgba(255,255,255,0.15)", border: "border-pink-200" },
    { bg: "from-cyan-500 to-blue-600", text: "text-white", accent: "rgba(255,255,255,0.15)", border: "border-cyan-200" },
  ];

  const palette = palettes[charSum % palettes.length];

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative rounded-full flex items-center justify-center font-display font-bold select-none overflow-hidden shadow-md bg-gradient-to-tr ${palette.bg} ${palette.text} ${className}`}
      id={`avatar-${seed.replace(/\s+/g, "-").toLowerCase()}`}
    >
      {/* Decorative inner pattern */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <circle cx="20" cy="20" r="30" fill="white" />
        <circle cx="80" cy="80" r="25" fill="white" />
        <rect x="10" y="70" width="30" height="30" rx="6" transform="rotate(45 25 85)" fill="white" />
      </svg>
      
      {/* Dynamic Initials Display with refined typography */}
      <span
        style={{ fontSize: `${size * 0.4}px` }}
        className="relative z-10 tracking-widest leading-none drop-shadow-sm font-semibold"
      >
        {initials}
      </span>
      
      {/* Aesthetic glowing rings */}
      <div className="absolute inset-[3px] rounded-full border border-white/20 z-0 pointer-events-none" />
    </div>
  );
}
