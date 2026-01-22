export type CVRole = {
  company: string;
  title: string;
  start: string; // YYYY-MM
  end?: string;  // YYYY-MM or undefined for present
  bullets: string[];
};

export type CV = {
  name: string;
  location: string;
  email: string;
  website: string;
  headline: string;
  summary: string[];
  skills: {
    frontend: string[];
    backend: string[];
    automation: string[];
    other: string[];
  };
  experience: CVRole[];
  languages: string[];
};

export const cv: CV = {
  name: "Santiago Vittor",
  location: "Buenos Aires, Argentina",
  email: "svittordev@gmail.com",
  website: "https://santiagovittorweb.vercel.app",
  headline: "Frontend engineer (React/Next.js) + automation + practical AI",
  summary: [
    "Frontend-focused engineer working with React/Next.js and TypeScript.",
    "I also build internal automations and I’m involved in AI training / LLM workflows.",
    "I care a lot about clean UI and solid UX details.",
  ],
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Sass", "HTML/CSS"],
    backend: ["Node.js (basic)", "Python (basic)"],
    automation: ["Google Sheets", "Apps Script", "Zapier/Make", "REST APIs"],
    other: ["Git", "Documentation", "Process improvement"],
  },
  experience: [
    {
      company: "FoodStyles",
      title: "Squad leader / AI training coordinator",
      start: "2022-04",
      bullets: [
        "Lead and mentor a team focused on quality and process improvement.",
        "Design and deliver internal training on LLMs, prompting, and data literacy.",
        "Build workflow automations to reduce manual reporting work.",
      ],
    },
    {
      company: "Prosegur Alarms",
      title: "Customer success specialist",
      start: "2018-01",
      end: "2022-01",
      bullets: [
        "Customer-facing support and issue triage.",
        "Worked with structured metrics and reporting to improve service consistency.",
      ],
    },
  ],
  languages: ["Spanish (native)", "English (advanced)"],
};
