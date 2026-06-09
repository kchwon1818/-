import React from "react";
import { motion } from "motion/react";
import { Briefcase, GraduationCap, Award, Calendar, CheckSquare } from "lucide-react";
import { ProfileData, TimelineEntry } from "../types";

interface TimelineProps {
  data: ProfileData;
}

export default function Timeline({ data }: TimelineProps) {
  // Sort timeline entries (can have nested sort but let's keep them stable)
  const entries = data.timeline || [];

  const getTimelineIcon = (type: TimelineEntry["type"]) => {
    switch (type) {
      case "work":
        return <Briefcase size={16} className="text-white" />;
      case "education":
        return <GraduationCap size={16} className="text-white" />;
      case "award":
        return <Award size={16} className="text-white" />;
      default:
        return <Calendar size={16} className="text-white" />;
    }
  };

  const getColorClass = (type: TimelineEntry["type"]) => {
    switch (type) {
      case "work":
        return "bg-indigo-600 border-indigo-200/80 text-indigo-700";
      case "education":
        return "bg-emerald-600 border-emerald-200/80 text-emerald-700";
      case "award":
        return "bg-amber-500 border-amber-200/80 text-amber-700";
      default:
        return "bg-stone-500 border-stone-200/80 text-stone-700";
    }
  };

  return (
    <section className="py-20 bg-stone-50 border-t border-stone-200/50" id="experience">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight"
          >
            커리어 & 히스토리
          </motion.h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto mt-3 rounded-full" />
          <p className="text-sm text-stone-500 font-medium mt-3">지금까지 성장을 위해 딛고 겪어온 발자취입니다</p>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative border-l border-stone-200 ml-4 sm:ml-8 space-y-12 pb-4">
          {entries.map((entry, idx) => {
            const colorMeta = getColorClass(entry.type);
            const badgeBg = entry.type === "work" ? "bg-indigo-50" : entry.type === "education" ? "bg-emerald-50" : "bg-amber-50";

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative pl-8 sm:pl-10"
                id={`timeline-node-${entry.id}`}
              >
                {/* Visual Connector Node Circle */}
                <div className={`absolute -left-3 top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${colorMeta.split(" ")[0]}`}>
                  {getTimelineIcon(entry.type)}
                </div>

                {/* Main Card Content */}
                <div className="bg-white border border-stone-200/60 rounded-3xl p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                  
                  {/* Decorative background node flash */}
                  <div className={`absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-stone-50 to-transparent pointer-events-none`} />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-stone-400 bg-stone-100/75 px-2.5 py-1 rounded-full uppercase">
                      {entry.period}
                    </span>
                    <span className={`text-[10px] font-mono tracking-wider font-bold rounded-full px-2.5 py-1 ${badgeBg} ${colorMeta.split(" ")[2]}`}>
                      {entry.type.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-stone-900 text-lg leading-snug">
                    {entry.title}
                  </h3>
                  
                  <span className="text-sm font-sans font-semibold text-stone-600 block mt-1">
                    {entry.organization}
                  </span>

                  <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                    {entry.description}
                  </p>

                  {/* Achievements Checklist Sub-Block */}
                  {entry.achievements && entry.achievements.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-stone-400 tracking-wider flex items-center space-x-1.5 uppercase">
                        <CheckSquare size={10} />
                        <span>Key Accomplishments</span>
                      </span>
                      <ul className="space-y-1.5">
                        {entry.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="text-xs text-stone-600 font-sans list-disc list-inside leading-snug pl-1">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
