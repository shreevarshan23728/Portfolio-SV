export interface TechCategory {
  title: string;
  code: string;
  description: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  role: string;
  subtitle: string;
  tagline: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  skillsList: string[];
  techCategories: TechCategory[];
  socialLinks: {
    email: string;
    github: string;
    linkedin: string;
  };
  metadata: {
    location: string;
    phone: string;
    institution: string;
    year: string;
    status: string;
  };
}

export const PROFILE: ProfileData = {
  name: "SHREE VARSHAN",
  role: "Creative Developer",
  subtitle: "CREATIVE DEVELOPER · AI ENTHUSIAST · DIGITAL EXPLORER",
  tagline: "Building intelligent systems and extraordinary digital experiences at the intersection of code, design, and AI.",
  aboutTitle: "BEYOND THE SCREEN.",
  aboutParagraphs: [
    "I'm a technology enthusiast exploring the intersection of artificial intelligence, software engineering, interactive design, and immersive digital experiences.",
    "I enjoy turning ambitious ideas into working systems and creating digital experiences that are as functional as they are visually memorable."
  ],
  skillsList: [
    "Python",
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Three.js",
    "React",
    "TypeScript",
    "UI/UX Design"
  ],
  techCategories: [
    {
      title: "DEVELOPMENT",
      code: "SYS // 01",
      description: "Core application architecture, modern web frameworks, and reactive systems.",
      skills: ["Python", "JavaScript", "TypeScript", "React"]
    },
    {
      title: "ARTIFICIAL INTELLIGENCE",
      code: "SYS // 02",
      description: "Intelligent computational models, statistical learning pipelines, and autonomous workflows.",
      skills: ["Machine Learning", "AI Systems", "Automation"]
    },
    {
      title: "INTERACTIVE GRAPHICS",
      code: "SYS // 03",
      description: "Physically based rendering, real-time WebGL shaders, and 3D spatial environments.",
      skills: ["Three.js", "WebGL", "React Three Fiber"]
    },
    {
      title: "TOOLS & DEPLOYMENT",
      code: "SYS // 04",
      description: "Version management, developer tooling, and modern deployment pipelines.",
      skills: ["Git", "GitHub", "VS Code"]
    }
  ],
  socialLinks: {
    email: "mailto:shreevarshan.dev@gmail.com",
    github: "https://github.com/shreevarshan",
    linkedin: "https://linkedin.com/in/shreevarshan"
  },
  metadata: {
    location: "Coimbatore, India",
    phone: "9994819939",
    institution: "Rathinam College",
    year: "2026",
    status: "Available for ambitious opportunities"
  }
};
