import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Layout, Server, Settings2, ShieldCheck } from "lucide-react";
import { ProfileData, Skill } from "../types";

interface SkillsProps {
  data: ProfileData;
}

export default function Skills({ data }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | "Frontend" | "Backend" | "DevOps & Tools" | "Soft Skills">("All");

  const categories = [
    { id: "All" as const, label: "전체보기", icon: <Cpu size={14} /> },
    { id: "Frontend" as const, label: "프론트엔드", icon: <Layout size={14} /> },
    { id: "Backend" as const, label: "백엔드", icon: <Server size={14} /> },
    { id: "DevOps & Tools" as const, label: "인프라 & 툴", icon: <Settings2 size={14} /> },
    { id: "Soft Skills" as const, label: "소프트 스킬", icon: <ShieldCheck size={14} /> },
  ];

  const filteredSkills = data.skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section className="py-20 bg-stone-50 border-y border-stone-200/50" id="skills">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight"
          >
            기술 스펙트럼
          </motion.h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto mt-3 rounded-full" />
          <p className="text-sm text-stone-500 font-medium mt-3">실무 적응도 및 깊이를 지닌 코어 무기들입니다</p>
        </div>

        {/* Tab Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "bg-white text-stone-600 border border-stone-200/60 hover:bg-stone-100"
              }`}
              id={`btn-skill-filter-${cat.id}`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Progress Grid with animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
          id="skills-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-stone-200/50 rounded-2xl p-4 sm:p-5 hover:shadow-sm transition-shadow flex flex-col justify-center"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sans font-semibold text-stone-900 text-sm sm:text-base">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {skill.level}%
                  </span>
                </div>
                
                {/* Custom dynamic Progress slider */}
                <div className="relative w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
                  />
                </div>

                {/* Micro category helper */}
                <div className="flex justify-between text-[11px] text-stone-400 mt-2">
                  <span>주요 숙련도 기준</span>
                  <span className="font-mono">{skill.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
