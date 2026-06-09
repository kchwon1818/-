export interface ContactInfo {
  email: string;
  phone: string;
  github: string;
  blog: string;
  location: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: "Frontend" | "Backend" | "DevOps & Tools" | "Soft Skills";
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  details: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageTheme: "indigo" | "emerald" | "amber" | "rose" | "purple" | "cyan";
}

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  achievements: string[];
  type: "work" | "education" | "award";
}

export interface ValueCard {
  title: string;
  description: string;
  iconName: string;
}

export interface ProfileData {
  name: string;
  englishName: string;
  role: string;
  motto: string;
  bio: string;
  avatarSeed: string; // for custom deterministic dynamic visual profile
  contact: ContactInfo;
  skills: Skill[];
  projects: Project[];
  timeline: TimelineEntry[];
  values: ValueCard[];
  mbti: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  content: string;
  timestamp: string;
}
