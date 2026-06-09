import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  RotateCcw, Save, Sparkles, User, Mail, Cpu, FolderGit, Calendar, 
  Plus, Trash2, X, AlertCircle, Info, ChevronRight 
} from "lucide-react";
import { ProfileData, Skill, Project, TimelineEntry } from "../types";
import { defaultProfileData } from "../data";

interface ProfileEditorProps {
  data: ProfileData;
  onSave: (updated: ProfileData) => void;
  onReset: () => void;
  onClose: () => void;
}

export default function ProfileEditor({ data, onSave, onReset, onClose }: ProfileEditorProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "contact" | "skills" | "projects" | "timeline">("basic");
  
  // Local state replicas
  const [name, setName] = useState(data.name);
  const [englishName, setEnglishName] = useState(data.englishName);
  const [role, setRole] = useState(data.role);
  const [motto, setMotto] = useState(data.motto);
  const [bio, setBio] = useState(data.bio);
  const [avatarSeed, setAvatarSeed] = useState(data.avatarSeed);
  const [mbti, setMbti] = useState(data.mbti);

  const [contact, setContact] = useState({ ...data.contact });
  const [skills, setSkills] = useState<Skill[]>([...data.skills]);
  const [projects, setProjects] = useState<Project[]>([...data.projects]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([...data.timeline]);

  // Skill Add States
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(80);
  const [newSkillCat, setNewSkillCat] = useState<Skill["category"]>("Frontend");

  // Project Add States
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjPeriod, setNewProjPeriod] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjDetails, setNewProjDetails] = useState(""); // newline separated
  const [newProjTags, setNewProjTags] = useState(""); // comma separated
  const [newProjTheme, setNewProjTheme] = useState<Project["imageTheme"]>("indigo");

  // Timeline Add States
  const [newTimePeriod, setNewTimePeriod] = useState("");
  const [newTimeTitle, setNewTimeTitle] = useState("");
  const [newTimeOrg, setNewTimeOrg] = useState("");
  const [newTimeDesc, setNewTimeDesc] = useState("");
  const [newTimeType, setNewTimeType] = useState<TimelineEntry["type"]>("work");

  const handleSave = () => {
    const updated: ProfileData = {
      ...data,
      name,
      englishName,
      role,
      motto,
      bio,
      avatarSeed,
      mbti,
      contact,
      skills,
      projects,
      timeline,
    };
    onSave(updated);
  };

  // Skill Handlers
  const handleSkillLevelChange = (index: number, level: number) => {
    const updated = [...skills];
    updated[index].level = level;
    setSkills(updated);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: newSkillCat,
    };
    setSkills([...skills, newSkill]);
    setNewSkillName("");
  };

  // Project Handlers
  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleAddProject = () => {
    if (!newProjTitle.trim() || !newProjDesc.trim()) return;
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: newProjTitle.trim(),
      period: newProjPeriod.trim() || `${new Date().getFullYear()}.01 - ${new Date().getFullYear()}.06`,
      description: newProjDesc.trim(),
      details: newProjDetails
        ? newProjDetails.split("\n").filter((l) => l.trim())
        : ["핵심 성과 완료"],
      tags: newProjTags
        ? newProjTags.split(",").map((t) => t.trim()).filter(Boolean)
        : ["React"],
      imageTheme: newProjTheme,
    };
    setProjects([...projects, newProj]);
    setNewProjTitle("");
    setNewProjPeriod("");
    setNewProjDesc("");
    setNewProjDetails("");
    setNewProjTags("");
  };

  // Timeline Handlers
  const handleRemoveTimeline = (id: string) => {
    setTimeline(timeline.filter((t) => t.id !== id));
  };

  const handleAddTimeline = () => {
    if (!newTimeTitle.trim() || !newTimeOrg.trim()) return;
    const newTime: TimelineEntry = {
      id: `time-${Date.now()}`,
      period: newTimePeriod.trim() || `${new Date().getFullYear()}.01 - 현재`,
      title: newTimeTitle.trim(),
      organization: newTimeOrg.trim(),
      description: newTimeDesc.trim(),
      achievements: [],
      type: newTimeType,
    };
    setTimeline([...timeline, newTime]);
    setNewTimePeriod("");
    setNewTimeTitle("");
    setNewTimeOrg("");
    setNewTimeDesc("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="profile-editor-drawer">
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs" onClick={onClose} />

      {/* Main Drawer Interface with elegant slide motion */}
      <div className="relative bg-white border-l border-stone-200 max-w-xl w-full h-full flex flex-col z-10 shadow-2xl overflow-hidden font-sans">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center space-x-2">
            <div className="p-1 px-2.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs rounded-full">
              LIVE CUSTOMIZER
            </div>
            <h3 className="font-display font-extrabold text-stone-950 text-lg">
              프로필 관리 엔진
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-150 transition-all cursor-pointer text-stone-600"
            id="btn-close-editor-panel"
            title="닫기"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200/50 bg-stone-50/50 overflow-x-auto pr-4 select-none scrollbar-thin">
          {[
            { id: "basic" as const, label: "기본 인적정보", icon: <User size={13} /> },
            { id: "contact" as const, label: "소셜 & 연락처", icon: <Mail size={13} /> },
            { id: "skills" as const, label: "기술 스킬", icon: <Cpu size={13} /> },
            { id: "projects" as const, label: "프로젝트", icon: <FolderGit size={13} /> },
            { id: "timeline" as const, label: "경력 마일스톤", icon: <Calendar size={13} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-4 py-3 text-xs font-bold border-b-2 transition-colors shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600 bg-white"
                  : "border-transparent text-stone-500 hover:text-stone-900"
              }`}
              id={`tab-editor-${tab.id}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Form Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: BASIC INFORMATION */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                <div className="text-xs text-amber-900 leading-relaxed font-sans">
                  <strong>실시간 피드백 루프:</strong> 정보를 수정한 뒤 최하단의 <strong>[설정 저장 및 업데이트]</strong> 버튼을 누르면, 자기 소개 페이지의 모든 파트가 실시간 업데이트됩니다.
                </div>
              </div>

              {/* Grid 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">이름</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">영문 표기</label>
                  <input
                    type="text"
                    value={englishName}
                    onChange={(e) => setEnglishName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              {/* Grid 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">주요 직함 (Role)</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">성격 MBTI</label>
                  <input
                    type="text"
                    value={mbti}
                    onChange={(e) => setMbti(e.target.value)}
                    placeholder="예: ENFJ, INFJ"
                    className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              {/* Avatar Seed */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">아바타 시드 (Seed)</label>
                <input
                  type="text"
                  value={avatarSeed}
                  onChange={(e) => setAvatarSeed(e.target.value)}
                  placeholder="자기 이름 이니셜을 넣으면 색상이 리젠됩니다"
                  className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 font-mono"
                />
              </div>

              {/* Slogan */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">인생 모토 / 한 줄 자기소개</label>
                <input
                  type="text"
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                />
              </div>

              {/* Bio description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">자기소개 스토리 (Markdown 혹은 줄바꿈 지원)</label>
                <textarea
                  rows={6}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT DETAILS */}
          {activeTab === "contact" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">E-mail 주소</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">전화 번호</label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">주요 근무 구지 / 주소지</label>
                <input
                  type="text"
                  value={contact.location}
                  onChange={(e) => setContact({ ...contact, location: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">GitHub 주소 (Domain 제외)</label>
                  <input
                    type="text"
                    value={contact.github}
                    onChange={(e) => setContact({ ...contact, github: e.target.value })}
                    placeholder="github.com/profile"
                    className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">개인 블로그 주소 (Domain 제외)</label>
                  <input
                    type="text"
                    value={contact.blog}
                    onChange={(e) => setContact({ ...contact, blog: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-50 hover:bg-stone-50/50 border border-stone-200 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS MANAGEMENT */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              {/* Add skill element */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-stone-800 flex items-center space-x-1">
                  <Plus size={14} className="text-indigo-600" />
                  <span>새로운 지식 / 무기 스킬 추가</span>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="예: Vue3, Spring Boot, Figma"
                    className="px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs sm:text-sm focus:outline-none"
                  />
                  <select
                    value={newSkillCat}
                    onChange={(e) => setNewSkillCat(e.target.value as Skill["category"])}
                    className="px-2 py-1.5 border border-stone-200 bg-white rounded-xl text-xs focus:outline-none"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="DevOps & Tools">DevOps & Tools</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-stone-400">숙련도 ({newSkillLevel}%)</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                      className="flex-1 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <button
                    onClick={handleAddSkill}
                    type="button"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg select-none cursor-pointer"
                  >
                    스킬 획득
                  </button>
                </div>
              </div>

              {/* Skills Editor List */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  현재 보유 기술 리스트 ({skills.length}개)
                </h4>

                <div className="divide-y divide-stone-100 max-h-[300px] overflow-y-auto pr-1">
                  {skills.map((skill, index) => (
                    <div key={index} className="py-2.5 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-stone-900 truncate">{skill.name}</span>
                          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">
                            {skill.category}
                          </span>
                        </div>
                        {/* Range adjuster directly */}
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => handleSkillLevelChange(index, Number(e.target.value))}
                            className="flex-1 h-1 bg-stone-100 appearance-none rounded cursor-pointer accent-indigo-600"
                          />
                          <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 rounded">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="p-1 px-1.5 hover:bg-red-50 text-stone-400 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                        title="Skill 지우기"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS MANAGEMENT */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Add Project Form Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-stone-800 flex items-center space-x-1">
                  <Plus size={14} className="text-indigo-600" />
                  <span>새로운 대표 프로젝트 성과 추가</span>
                </h4>

                <input
                  type="text"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="프로젝트 타이틀 (예: 모바일 대시보드 스크리블)"
                  className="w-full px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs sm:text-sm focus:outline-none"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newProjPeriod}
                    onChange={(e) => setNewProjPeriod(e.target.value)}
                    placeholder="수행 기간 (예: 2024.01 - 2024.05)"
                    className="w-full px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs"
                  />
                  <select
                    value={newProjTheme}
                    onChange={(e) => setNewProjTheme(e.target.value as Project["imageTheme"])}
                    className="w-full px-2 py-1.5 border border-stone-200 bg-white rounded-xl text-xs focus:outline-none"
                  >
                    <option value="indigo">Indigo theme</option>
                    <option value="emerald">Emerald theme</option>
                    <option value="amber">Amber theme</option>
                    <option value="rose">Rose theme</option>
                    <option value="purple">Purple theme</option>
                    <option value="cyan">Cyan theme</option>
                  </select>
                </div>

                <textarea
                  rows={2}
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  placeholder="핵심 요약 시놉시스 (한두 줄 서술)"
                  className="w-full px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs resize-none"
                />

                <textarea
                  rows={2}
                  value={newProjDetails}
                  onChange={(e) => setNewProjDetails(e.target.value)}
                  placeholder="달성 실무 성과 (줄바꿈 단위로 입력)"
                  className="w-full px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs resize-none"
                />

                <input
                  type="text"
                  value={newProjTags}
                  onChange={(e) => setNewProjTags(e.target.value)}
                  placeholder="프로토콜 스택 태그 (쉼표로 구분 및 입력)"
                  className="w-full px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs"
                />

                <button
                  type="button"
                  onClick={handleAddProject}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl cursor-pointer"
                >
                  프로젝트 카드 보관함에 주입
                </button>
              </div>

              {/* Projects List view */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  포트폴리오 보관 리스트 ({projects.length}개)
                </h4>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3 border border-stone-200/80 rounded-xl bg-white flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-stone-900 block">{proj.title}</span>
                        <span className="text-[10px] font-mono text-stone-400">{proj.period}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveProject(proj.id)}
                        className="p-1 px-1.5 hover:bg-red-50 text-stone-400 hover:text-red-700 rounded-lg cursor-pointer"
                        title="프로젝트 소거"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TIMELINE / HISTORIES */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              {/* Add Timeline Node Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-stone-800 flex items-center space-x-1">
                  <Plus size={14} className="text-indigo-600" />
                  <span>새 히스토리 마일스톤 노드 추가</span>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newTimePeriod}
                    onChange={(e) => setNewTimePeriod(e.target.value)}
                    placeholder="활동 일자 (예: 2023.01 - 2023.12)"
                    className="px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs"
                  />
                  <select
                    value={newTimeType}
                    onChange={(e) => setNewTimeType(e.target.value as TimelineEntry["type"])}
                    className="px-2 py-1.5 border border-stone-200 bg-white rounded-xl text-xs focus:outline-none"
                  >
                    <option value="work">식별: Work (직무/실무)</option>
                    <option value="education">식별: Education (학적/학력)</option>
                    <option value="award">식별: Award (수상 표창지)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newTimeTitle}
                    onChange={(e) => setNewTimeTitle(e.target.value)}
                    placeholder="직무명 / 학위명"
                    className="px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs sm:text-sm"
                  />
                  <input
                    type="text"
                    value={newTimeOrg}
                    onChange={(e) => setNewTimeOrg(e.target.value)}
                    placeholder="수행 대학 / 회사"
                    className="px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <textarea
                  rows={2}
                  value={newTimeDesc}
                  onChange={(e) => setNewTimeDesc(e.target.value)}
                  placeholder="수행 내용 요약"
                  className="w-full px-3 py-1.5 border border-stone-200 bg-white rounded-xl text-xs resize-none animate-none"
                />

                <button
                  type="button"
                  onClick={handleAddTimeline}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl cursor-pointer"
                >
                  기록 보드에 등록
                </button>
              </div>

              {/* Milestones view list */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  수행 경력 리스트 ({timeline.length}개)
                </h4>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {timeline.map((item) => (
                    <div key={item.id} className="p-3 border border-stone-200/80 rounded-xl bg-white flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-stone-900 block">{item.title}</span>
                        <span className="text-[10px] text-stone-500">{item.organization} ({item.period})</span>
                      </div>
                      <button
                        onClick={() => handleRemoveTimeline(item.id)}
                        className="p-1 px-1.5 hover:bg-red-50 text-stone-400 hover:text-red-700 rounded-lg cursor-pointer"
                        title="기록 삭제"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Control Footer containing Update and Reset */}
        <div className="p-6 border-t border-stone-200/60 bg-stone-50 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="flex items-center space-x-1 px-4 py-3 border border-stone-200 text-stone-600 bg-white hover:bg-stone-100 rounded-xl font-bold text-xs cursor-pointer select-none"
            id="btn-reset-template-data"
            title="초기 템플릿 데이터로 환원"
          >
            <RotateCcw size={14} />
            <span>기본 설정 환원</span>
          </button>

          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center space-x-1.5 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 rounded-xl font-bold text-xs cursor-pointer select-none"
            id="btn-save-interactive-profile"
            title="소개 페이지에 즉각 렌더 적용"
          >
            <Save size={14} />
            <span>설정 저장 및 업데이트</span>
          </button>
        </div>

      </div>
    </div>
  );
}
