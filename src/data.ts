import { ProfileData } from "./types";

export const defaultProfileData: ProfileData = {
  name: "김민준",
  englishName: "Minjun Kim",
  role: "Product Developer (제품 개발자)",
  motto: "사용자 중심의 경험을 혁신하고, 견고한 기술 장인정신으로 가치를 창출합니다.",
  bio: "안녕하세요! 우아한 프론트엔드 사용자 경험 설계부터 탄탄한 백엔드 API 설계까지 유연하게 연결하는 풀스택 지향 제품 개발자 김민준입니다.\n\n단순히 동작하는 코드를 넘어 확장 가능하고 유지보수하기 쉬운 클린 아키텍처를 끊임없이 메꾸고 개량하는 작업을 즐깁니다. 다양한 요구사항 속에서 '진짜 사용자가 겪는 문제'를 정의하고, 기술을 도구로써 올바르게 조율하여 임팩트 있는 솔루션을 도출해 내는 데 뜨거운 열정이 있습니다.",
  avatarSeed: "MK",
  mbti: "ENFJ (정의로운 지도자)",
  contact: {
    email: "minjun.kim@example.com",
    phone: "010-1234-5678",
    github: "github.com/minjun-dev",
    blog: "velog.io/@minjun-dev",
    location: "서울특별시 마포구"
  },
  skills: [
    // Frontend
    { name: "React (TypeScript)", level: 95, category: "Frontend" },
    { name: "Next.js & Remix", level: 90, category: "Frontend" },
    { name: "Tailwind CSS & Modern Motion", level: 92, category: "Frontend" },
    { name: "State Managers (Zustand, Recoil)", level: 88, category: "Frontend" },
    
    // Backend
    { name: "Node.js (Express / NestJS)", level: 85, category: "Backend" },
    { name: "PostgreSQL & Prisma SQL", level: 80, category: "Backend" },
    { name: "RESTful API Specification", level: 87, category: "Backend" },
    { name: "GraphQL & Hasura Engine", level: 75, category: "Backend" },
    
    // DevOps & Tools
    { name: "Git / GitHub Flow", level: 90, category: "DevOps & Tools" },
    { name: "Docker & Container Virtualization", level: 78, category: "DevOps & Tools" },
    { name: "AWS Cloud Ingress (S3, EC2)", level: 80, category: "DevOps & Tools" },
    { name: "Figma UI / Component Design System", level: 85, category: "DevOps & Tools" },

    // Soft Skills
    { name: "Agile & Sprint Coordination", level: 92, category: "Soft Skills" },
    { name: "Continuous Learning Mentality", level: 95, category: "Soft Skills" },
    { name: "Logical Problem Structuring", level: 90, category: "Soft Skills" },
    { name: "Clear & Plain Communication", level: 94, category: "Soft Skills" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "AI 감정 오디오 일기장, 'MoodScribble'",
      period: "2024.03 - 2024.06",
      description: "사용자의 텍스트 일기를 자연어 AI로 분석하여 감정의 색채 변화를 트래킹하고 맞춤형 앰비언트 백그라운드 재생음과 일러스트를 자동 페어링해주는 모바일 웹 앱",
      details: [
        "Gemini API 자연어 임베딩 기반 실시간 감정 패턴 분류 정확도 92% 확보",
        "React + Tailwind CSS 기반 초저지연 오디오 시각화 웨이브 애니메이션 구축 (motion 연동)",
        "사용자가 지정한 무드를 프롬프트 필터링하여 일기 쓰기 흥미 유도"
      ],
      tags: ["React", "TypeScript", "Tailwind CSS", "Gemini AI", "Web Audio API"],
      githubUrl: "https://github.com/minjun-dev/mood-scribble",
      demoUrl: "https://mood-scribble-demo.example.com",
      imageTheme: "indigo"
    },
    {
      id: "proj-2",
      title: "실시간 비동기 칸반 보드, 'SyncFlow'",
      period: "2023.10 - 2024.01",
      description: "팀 단위 협업 시 드래그 앤 드롭 및 다중 유저 전방위 상태 동기화를 위해 웹소켓 기술을 극대화한 간소화된 애자일 관리 스튜디오",
      details: [
        "Drag and Drop API를 활용한 매끄러운 카드 이동 모션 및 낙관적 업데이트(Optimistic Update) 적용",
        "Server-Sent Events(SSE) 및 REST API 기반 경량이면서 기민한 상태 동기화",
        "상태 전환 지연(Latency) 기존 대비 35% 감소 쾌적한 피드백 루프 구현"
      ],
      tags: ["Next.js", "Zustand", "Express", "Node.js", "Tailwind CSS"],
      githubUrl: "https://github.com/minjun-dev/sync-flow",
      imageTheme: "emerald"
    },
    {
      id: "proj-3",
      title: "지도 기반 마이크로 로컬 마켓 플레이스, '동네이웃'",
      period: "2023.04 - 2023.08",
      description: "소규모 로컬 상권 소상공인과 동네 주민들을 반경 2km 이내 타겟팅하여 유휴 공동 구매, 실시간 번개 나눔을 연결해 주는 위치 정보 허브",
      details: [
        "Google Maps API 및 Web Geolocation API를 조율한 정밀 내 위치 기반 실시간 필터 서치",
        "자주 소통하는 이웃에 대한 매너 스코어 산포도 비주얼화 (D3.js 활용)",
        "접근성에 민감한 노령층을 위한 최적화 글꼴 크기 제어 보완"
      ],
      tags: ["React", "Geolocation API", "D3.js", "PostgreSQL", "Prisma"],
      demoUrl: "https://local-neighbor-example.com",
      imageTheme: "amber"
    }
  ],
  timeline: [
    {
      id: "time-1",
      period: "2024.01 - 현재",
      title: "풀스택 리드 개발자",
      organization: "인사이트테크 (E-commerce SaaS)",
      description: "자사 유저 행동 양식 분석 대시보드 총괄 엔지니어링 및 내부 컴포넌트 디자인 시스템 구축",
      achievements: [
        "Lighthouse 접근성 점수 100점 달성 및 웹 표준 호환성 전면 인라인 수정",
        "초기 번들 사이즈 40% 감축 코어 속도 마일스톤 달성",
        "신규 주니어 페어 프로그래밍 가이드라인 백서 발행"
      ],
      type: "work"
    },
    {
      id: "time-2",
      period: "2022.02 - 2023.11",
      title: "프론트엔드 주니어 엔지니어",
      organization: "코드스튜디오 (컨설팅 & 에이전시)",
      description: "중대형 대시보드 프로젝트 4개 이상 수행 및 다국어 지원 설계",
      achievements: [
        "유저 인터뷰 피드백 기반 모달 접근 계층 구조 정형화",
        "통합 API 통신 모듈 클래스 작성으로 인계 시간 2배 보증"
      ],
      type: "work"
    },
    {
      id: "time-3",
      period: "2018.03 - 2022.02",
      title: "컴퓨터공학과 학사 취득",
      organization: "한국대학교 (Hankuk Univ)",
      description: "인공지능 트랙 이수, 컴퓨터네트워크 수석 수료, 졸업 논문 최우수 표창",
      achievements: [
        "데이터베이스 설계 및 모델링 부문 과목 수석(A+)",
        "웹기술연구 소모임 창립 및 정기 스터디 기획"
      ],
      type: "education"
    }
  ],
  values: [
    {
      title: "사용자 중심 설계",
      description: "코드 한 줄도 최종 사용자의 사용성이 더 편해지는 방향으로 투영하며, 디테일한 사용자의 피드백을 깊이 즐깁니다.",
      iconName: "Heart"
    },
    {
      title: "단단하고 맑은 코드",
      description: "의도가 또렷하게 드러나 다른 개발자가 읽었을 때 막힘없는 변수명 설계와 구조화된 모듈화를 중시합니다.",
      iconName: "Code2"
    },
    {
      title: "소통과 공유의 가치",
      description: "나만 아는 기술은 반쪽뿐임을 압니다. 위키 작성을 지향하고, 상호 페어 프로그래밍을 통한 성장을 적극 지지합니다.",
      iconName: "Users"
    }
  ]
};
