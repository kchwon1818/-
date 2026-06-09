import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Sparkles, FolderKanban, Check } from "lucide-react";
import { ProfileData, Project } from "../types";

interface ProjectsProps {
  data: ProfileData;
}

export default function Projects({ data }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Gradient selection for thumbnails
  const gradientMap = {
    indigo: "from-indigo-400 to-indigo-600 shadow-indigo-100",
    emerald: "from-emerald-400 to-teal-600 shadow-emerald-100",
    amber: "from-amber-400 to-orange-500 shadow-amber-100",
    rose: "from-pink-500 to-rose-600 shadow-rose-100",
    purple: "from-purple-500 to-violet-600 shadow-purple-100",
    cyan: "from-cyan-400 to-blue-500 shadow-cyan-100",
  };

  return (
    <section className="py-20 bg-white" id="projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight"
          >
            포트폴리오 프로젝트
          </motion.h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto mt-3 rounded-full" />
          <p className="text-sm text-stone-500 font-medium mt-3">진짜 유효성이 따르는 실무 가이드라인 프로젝트입니다</p>
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-grid">
          {data.projects.map((proj, idx) => {
            const gradClass = gradientMap[proj.imageTheme] || "from-stone-500 to-stone-700";

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col h-full group"
                id={`project-card-${proj.id}`}
              >
                {/* Visual Header */}
                <div className={`h-44 bg-gradient-to-tr ${gradClass} relative flex items-center justify-center p-6 text-white overflow-hidden`}>
                  {/* Decorative mesh */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Styled Project Logo/Heading */}
                  <div className="z-10 text-center">
                    <FolderKanban size={32} className="mx-auto mb-2 opacity-90 stroke-[1.5]" />
                    <span className="font-display text-xl font-extrabold tracking-tight drop-shadow-sm line-clamp-1">
                      {proj.title.split(",")[1]?.trim() || proj.title}
                    </span>
                  </div>

                  <span className="absolute top-4 right-4 text-[10px] font-mono tracking-wider font-bold bg-white/25 backdrop-blur-md text-white px-2.5 py-1 rounded-full uppercase">
                    {proj.period.split(" - ")[0]}
                  </span>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-600 uppercase block">
                      {proj.period}
                    </span>
                    <h3 className="font-display font-bold text-stone-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  {/* Badges/Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tags.slice(0, 4).map((tg) => (
                      <span
                        key={tg}
                        className="text-[10px] font-mono font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                      >
                        {tg}
                      </span>
                    ))}
                    {proj.tags.length > 4 && (
                      <span className="text-[10px] font-mono font-medium text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md">
                        +{proj.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center space-x-1 cursor-pointer"
                      id={`btn-detail-${proj.id}`}
                    >
                      <Sparkles size={12} className="text-indigo-500 animate-spin-slow" />
                      <span>기획 상세 보기</span>
                    </button>

                    <div className="flex items-center space-x-3 text-stone-400">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-stone-900 transition-colors"
                          title="GitHub 저장소"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {proj.demoUrl && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-stone-900 transition-colors"
                          title="데모 스트림"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Project Expanded Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="project-modal">
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white border border-stone-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl flex flex-col"
              >
                {/* Header Banner */}
                <div className={`h-40 bg-gradient-to-tr ${gradientMap[selectedProject.imageTheme] || "from-stone-500 to-stone-700"} flex items-center justify-center p-6 text-white relative`}>
                  <div className="text-center z-10">
                    <span className="text-[10px] tracking-widest font-mono font-bold bg-white/20 text-white px-2.5 py-1 rounded-full uppercase mb-2 inline-block">
                      {selectedProject.period}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl drop-shadow-sm">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-black/10 hover:bg-black/25 text-white/90 p-2 rounded-full cursor-pointer transition-colors text-sm"
                    title="모달 닫기"
                    id="btn-close-project-modal"
                  >
                    ✕
                  </button>
                </div>

                {/* Details Content */}
                <div className="p-6 sm:p-8 space-y-6 flex-1">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">
                      PROJECT SYNOPSIS
                    </h4>
                    <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Highlights / Accomplishments */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest">
                      핵심 달성 성과 (Achievements)
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-stone-600 font-sans">
                          <span className="mr-3 mt-1 text-emerald-600 bg-emerald-50 p-0.5 rounded">
                            <Check size={12} className="stroke-[3]" />
                          </span>
                          <span className="leading-snug">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">
                      사용 프로토콜 & 기술 스택
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tg) => (
                        <span
                          key={tg}
                          className="text-xs font-mono font-semibold text-stone-800 bg-stone-100 border border-stone-200/50 px-3 py-1 rounded-lg"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-stone-100">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-4 py-2 border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 rounded-xl text-xs font-semibold select-none transition-colors"
                      >
                        <Github size={14} />
                        <span>GitHub 저장소</span>
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-semibold select-none transition-all shadow-md shadow-indigo-100"
                      >
                        <ExternalLink size={14} />
                        <span>라이브 데모</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
