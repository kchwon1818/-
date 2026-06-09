import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Mail, Heart, Github, MapPin } from "lucide-react";
import Avatar from "./Avatar";
import { ProfileData } from "../types";

interface HeroProps {
  data: ProfileData;
}

export default function Hero({ data }: HeroProps) {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50 py-16 md:py-24"
      id="hero"
    >
      {/* Dynamic graphic patterns in background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/12 w-64 h-64 bg-indigo-100 rounded-full blur-3xl" />
        <div className="absolute bottom-1/5 right-1/10 w-80 h-80 bg-emerald-100 rounded-full blur-3xl animate-pulse" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "radial-gradient(circle, #e5e5e5 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} 
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-semibold text-indigo-700 tracking-wide mb-6"
        >
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
          <span>안녕하세요, 만나서 반갑습니다!</span>
        </motion.div>

        {/* Profile Avatar with dynamic hover motion */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.15 }}
          className="mb-8 relative group"
        >
          {/* Decorative rotating gradient boundary ring */}
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt" />
          <Avatar seed={data.avatarSeed || data.name} size={150} className="relative cursor-pointer hover:rotate-6 transition-transform duration-300" />
        </motion.div>

        {/* Name and English Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-2"
        >
          {data.name}
          <span className="text-xl sm:text-2xl font-light text-stone-400 font-sans ml-3 block sm:inline-block">
            {data.englishName}
          </span>
        </motion.h1>

        {/* Main Role & MBTI */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          <span className="text-lg sm:text-2xl font-semibold text-indigo-600 font-display">
            {data.role}
          </span>
          {data.mbti && (
            <>
              <span className="text-stone-300 hidden sm:inline">•</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                MBTI: {data.mbti}
              </span>
            </>
          )}
        </motion.div>

        {/* Motto / Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-xl text-stone-600 font-sans font-medium text-base sm:text-lg mb-8 leading-relaxed italic"
        >
          "{data.motto}"
        </motion.p>

        {/* Hero actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-16"
        >
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer"
            id="hero-contact-button"
          >
            <Mail size={16} />
            <span>연락하기</span>
          </button>
          <button
            onClick={scrollToAbout}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-white text-stone-700 border border-stone-200 rounded-xl text-sm font-semibold hover:bg-stone-50 transition-all cursor-pointer"
            id="hero-about-button"
          >
            <span>더 알아보기</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </motion.div>

        {/* Mini Meta Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center justify-center gap-6 text-xs text-stone-500 font-mono border-t border-stone-200/50 pt-4 w-full"
        >
          {data.contact.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-stone-400" />
              {data.contact.location}
            </span>
          )}
          {data.contact.github && (
            <a
              href={`https://${data.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
            >
              <Github size={12} />
              GitHub
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
