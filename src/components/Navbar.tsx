import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Settings2, Sparkles, Code2 } from "lucide-react";

interface NavbarProps {
  onEditToggle: () => void;
  isEditing: boolean;
  sections: { id: string; label: string }[];
  activeSection: string;
}

export default function Navbar({ onEditToggle, isEditing, sections, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/60" id="navbar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Code2 size={20} className="stroke-[2.5]" />
            </div>
            <span className="font-display font-bold text-lg text-stone-950 tracking-tight flex items-center space-x-1">
              <span>MyPortfolio</span>
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping" />
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleScroll(sec.id)}
                className={`font-sans text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                  activeSection === sec.id
                    ? "text-indigo-600"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                id={`nav-link-${sec.id}`}
              >
                {sec.label}
                {activeSection === sec.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Configuration and Edit Triggers */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onEditToggle}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-300 ${
                isEditing
                  ? "bg-amber-100 text-amber-800 border border-amber-200 shadow-sm"
                  : "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg shadow-indigo-100"
              }`}
              id="btn-toggle-editor-desktop"
            >
              <Settings2 size={14} className={isEditing ? "animate-spin" : ""} />
              <span>{isEditing ? "편집 완료" : "프로필 커스텀"}</span>
            </button>
          </div>

          {/* Mobile menu and Editor button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={onEditToggle}
              className={`p-2 rounded-xl cursor-pointer ${
                isEditing
                  ? "bg-amber-100 text-amber-800"
                  : "bg-indigo-50 text-indigo-600"
              }`}
              title={isEditing ? "편집 완료" : "프로필 커스텀"}
              id="btn-toggle-editor-mobile"
            >
              <Settings2 size={18} className={isEditing ? "animate-spin" : ""} />
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Toggle Menu"
              id="btn-menu-mobile"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-stone-200/50 bg-stone-50 overflow-hidden"
            id="mobile-navigation-panel"
          >
            <div className="px-4 py-3 space-y-1.5">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleScroll(sec.id)}
                  className={`w-full text-left font-sans text-sm font-medium px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                    activeSection === sec.id
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                  id={`nav-link-mobile-${sec.id}`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
