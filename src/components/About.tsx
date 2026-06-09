import React from "react";
import { motion } from "motion/react";
import { Heart, Code2, Users, Flame, BookOpen, Smile, Sparkles } from "lucide-react";
import { ProfileData } from "../types";

interface AboutProps {
  data: ProfileData;
}

// Function to map string to corresponding Lucide Icon
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Heart":
      return <Heart className="text-pink-500 stroke-[2]" size={20} />;
    case "Code2":
      return <Code2 className="text-indigo-600 stroke-[2]" size={20} />;
    case "Users":
      return <Users className="text-emerald-600 stroke-[2]" size={20} />;
    case "Flame":
      return <Flame className="text-orange-500 stroke-[2]" size={20} />;
    default:
      return <Sparkles className="text-amber-500 stroke-[2]" size={20} />;
  }
};

export default function About({ data }: AboutProps) {
  // Format description by splitting on double newlines
  const bioParagraphs = data.bio ? data.bio.split("\n\n") : [];

  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight"
          >
            소개 & 가치관
          </motion.h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto mt-3 rounded-full" />
          <p className="text-sm text-stone-500 font-medium mt-3">기술로 세상을 더 나은 공간으로 조향합니다</p>
        </div>

        {/* Bio Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-5">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              사용자 문제를 창의적으로 정의하고, <br />
              <span className="text-indigo-600">견고한 코딩 가치</span>를 실현해 나갑니다.
            </h3>
            <div className="space-y-4 text-stone-600 font-sans leading-relaxed text-sm sm:text-base">
              {bioParagraphs.map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Quick Fact Panel */}
          <div className="lg:col-span-5 bg-stone-50 border border-stone-200/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h4 className="font-display font-bold text-stone-950 text-lg flex items-center space-x-2">
              <Smile size={18} className="text-indigo-600" />
              <span>프로필 요약표</span>
            </h4>

            <div className="divide-y divide-stone-200/50">
              <div className="py-3 flex justify-between text-sm">
                <span className="font-semibold text-stone-500">인재 유형</span>
                <span className="font-medium text-stone-900">{data.role}</span>
              </div>
              <div className="py-3 flex justify-between text-sm">
                <span className="font-semibold text-stone-500">주거지</span>
                <span className="font-medium text-stone-900">{data.contact.location || "미정"}</span>
              </div>
              <div className="py-3 flex justify-between text-sm">
                <span className="font-semibold text-stone-500">성격 MBTI</span>
                <span className="font-medium text-indigo-700 font-semibold">{data.mbti || "ENFJ"}</span>
              </div>
              <div className="py-3 flex justify-between text-sm font-mono">
                <span className="font-semibold text-stone-500 font-sans">E-mail</span>
                <span className="text-stone-900 lowercase select-all">{data.contact.email}</span>
              </div>
            </div>

            {/* Micro Quote */}
            <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/60">
              <span className="text-[11px] font-mono tracking-wider font-bold text-indigo-700 uppercase block mb-1">
                MEMBERSHIP FOCUS
              </span>
              <p className="text-xs text-indigo-900 leading-relaxed font-sans">
                오픈 커뮤니티 전파 활동, 일일 회고 작성 및 주 단위 오픈소스 리서치 활동을 게을리하지 않습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Sub-grid */}
        <div className="mt-16">
          <h3 className="font-display text-lg font-bold text-stone-900 text-center mb-8 uppercase tracking-wider">
            지향하는 3대 핵심 가치
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {data.values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-stone-50/75 border border-stone-100 rounded-3xl p-6 hover:shadow-md transition-shadow flex flex-col items-start"
              >
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-stone-200/40 mb-5">
                  {getIconComponent(v.iconName)}
                </div>
                <h4 className="font-display font-bold text-stone-900 mb-2">{v.title}</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
