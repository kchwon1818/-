import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowUp, CheckCircle, Flame, ExternalLink, Settings2 } from "lucide-react";

import { ProfileData } from "./types";
import { defaultProfileData } from "./data";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import ProfileEditor from "./components/ProfileEditor";

export default function App() {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Load from local storage if existing
  useEffect(() => {
    try {
      const saved = localStorage.getItem("my-personal-portfolio");
      if (saved) {
        setProfileData(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Local storage lookup failed", e);
    }
  }, []);

  // Track scrolling depth for Navigation light-ups & Floating helper triggers
  useEffect(() => {
    const handleScroll = () => {
      // Toggle top-scroll helper
      setShowScrollTop(window.scrollY > 400);

      const scrollPosition = window.scrollY + 200;
      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSaveProfile = (updated: ProfileData) => {
    setProfileData(updated);
    setIsEditing(false);
    setSaveToast(true);
    
    try {
      localStorage.setItem("my-personal-portfolio", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to persist updated profile", err);
    }

    setTimeout(() => {
      setSaveToast(false);
    }, 3000);
  };

  const handleResetProfile = () => {
    if (window.confirm("정말로 기본 데이터 구조로 복구하시겠습니까? 최근 작성 내용이 지워집니다.")) {
      setProfileData(defaultProfileData);
      setIsEditing(false);
      try {
        localStorage.removeItem("my-personal-portfolio");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const menuSections = [
    { id: "hero", label: "홈" },
    { id: "about", label: "소개 & 가치" },
    { id: "skills", label: "기술스펙트럼" },
    { id: "projects", label: "포트폴리오" },
    { id: "experience", label: "커리어 히스토리" },
    { id: "contact", label: "연락처" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans tracking-normal leading-relaxed selection:bg-indigo-100 selection:text-indigo-900" id="applet-root">
      
      {/* Upper Navigation bar */}
      <Navbar
        onEditToggle={() => setIsEditing(!isEditing)}
        isEditing={isEditing}
        sections={menuSections}
        activeSection={activeSection}
      />

      {/* Main Portfolio Sections */}
      <main id="portfolio-main-sections">
        <Hero data={profileData} />
        <About data={profileData} />
        <Skills data={profileData} />
        <Projects data={profileData} />
        <Timeline data={profileData} />
        <Contact data={profileData} />
      </main>

      {/* Footer Branding Area */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-850" id="app-footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="font-display font-extrabold text-white text-lg tracking-tight">
              {profileData.name}<span className="text-indigo-400 ml-1">.Portfolio</span>
            </span>
            <span className="text-xs text-stone-600 font-mono">v1.2.0</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-500 font-sans text-center md:text-right">
            © {new Date().getFullYear()} {profileData.englishName}. All rights reserved. <br />
            <span className="text-[10px] text-stone-650 font-mono uppercase mt-1 block">
              Built with dynamic React, motion engine & Tailwind CSS
            </span>
          </p>
        </div>
      </footer>

      {/* Sidebar Live Editor overlay */}
      <AnimatePresence>
        {isEditing && (
          <ProfileEditor
            data={profileData}
            onSave={handleSaveProfile}
            onReset={handleResetProfile}
            onClose={() => setIsEditing(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Helpers */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-center gap-3" id="floating-actions-container">
        
        {/* Helper edit badge notice */}
        <button
          onClick={() => setIsEditing(true)}
          className="p-3.5 bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 rounded-full shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
          title="실시간 프로필 맞춤 커스텀 편집기 켜기"
          id="btn-floating-edit-trigger"
        >
          <Settings2 size={18} className="animate-pulse" />
        </button>

        {/* Scroll back to top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-3 bg-white text-stone-700 border border-stone-200/80 hover:bg-stone-50 rounded-full shadow-md cursor-pointer transition-all"
              title="상단으로 바로 가기"
              id="btn-scroll-top"
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Persistence confirmation Toast notification */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-stone-900 border border-stone-800 text-white px-5 py-3.5 rounded-2xl flex items-center space-x-2.5 z-40 text-xs sm:text-sm font-semibold shadow-2xl"
            id="toast-save-success"
          >
            <CheckCircle size={16} className="text-emerald-400" />
            <span>설정이 성공적으로 로컬 스토리지에 업데이트되었습니다!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
