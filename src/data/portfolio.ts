export const profile = {
  name: 'Mohamed Osama',
  title: 'Software Engineer',
  tagline: 'Full Stack & Mobile Developer',
  location: '6 October, Egypt',
  email: 'mohamedOSFekry@gmail.com',
  phone: '+20 1004365707',
  github: 'https://github.com/moshaosama',
  linkedin: 'https://www.linkedin.com/in/thisfekry',
  portfolio: 'https://portfolio-ten-cyan-80.vercel.app',
  summary:
    'Full Stack & Mobile Developer with 2+ years of experience in MERN/MEAN stacks and React Native + Capacitor. Specialized in building scalable e-commerce, marketplace, and AI-powered platforms across Web, iOS, and Android.',
}

export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const experience = [
  {
    company: 'Prime Softworks',
    role: 'Full Stack Developer',
    period: 'Aug 2025 – Present',
    highlights: [
      'Built AutoCycle — premium auto parts marketplace with Next.js, Node.js, Supabase, and AI chatbot.',
      'Developed Seeny — automotive marketplace with interactive 3D exploded-view inspection.',
      'Shipped React Native + Capacitor apps to iOS App Store and Google Play Store.',
      'Built Genius — AI-powered learning platform with Zoom SDK and payment integration.',
      'Created one-click CI/CD automation: GitHub repo → Vercel deploy → live URL.',
    ],
  },
  {
    company: 'Anytime Software',
    role: 'Full Stack Developer',
    period: 'Sep 2024 – Jul 2025',
    highlights: [
      'Delivered full-stack projects using React.js, Nest.js, and Node.js.',
      'Implemented automated testing with Jest for reliable deployments.',
      'Managed workflows with Git and CI/CD best practices.',
    ],
  },
  {
    company: 'GDSC (University)',
    role: 'Instructor',
    period: 'Sep 2023 – Jun 2024',
    highlights: [
      'Delivered sessions on HTML, CSS, and JavaScript.',
      'Developed public speaking and technical teaching skills.',
    ],
  },
  {
    company: 'Fetra App',
    role: 'Freelancer (Remote)',
    period: 'May 2023 – Nov 2023',
    highlights: [
      'Maintained website using HTML, CSS, and JavaScript.',
      'Collaborated via Git and GitHub for version control.',
    ],
  },
]

export { projects } from './projects'
export type { Project } from './projects'

export const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Redux Toolkit', 'Vite', 'Angular'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express', 'Nest.js', 'MongoDB', 'PostgreSQL', 'Supabase', 'REST APIs'],
  },
  {
    label: 'Mobile & Tools',
    skills: ['React Native', 'Capacitor', 'Socket.io', 'Git', 'Jest', 'n8n', 'Puppeteer', 'CI/CD'],
  },
  {
    label: 'AI & Automation',
    skills: ['AI Chatbots', 'LangChain', 'Web Scraping', 'Cron Jobs', 'Playwright', 'Zoom SDK'],
  },
]

export const education = {
  degree: 'Bachelor of Computer Science',
  school: 'Akhbar Elyoum Academy – 6th of October City',
  graduated: 'June 2025',
}
