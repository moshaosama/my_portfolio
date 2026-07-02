export type Project = {
  title: string
  category: string
  year: string
  description: string
  stack: string[]
  live: string | null
  github: string | null
}

function p(
  title: string,
  category: string,
  year: string,
  description: string,
  stack: string[],
  github: string | null,
  live: string | null = null,
): Project {
  return { title, category, year, description, stack, github, live }
}

/** Selected projects for Brutalxnor */
export const projects: Project[] = [
  p(
    'Sarmad',
    'Mobile · App',
    '2026',
    'Developed as part of company work with clean navigation and polished mobile flows.',
    ['React Native', 'TypeScript', 'UI/UX'],
    null,
  ),
  p(
    'Babben',
    'Product · Design',
    '2026',
    'Delivered within the company product team with polished interactions and strong branding.',
    ['React', 'TypeScript', 'Design'],
    null,
  ),
  p(
    'Brokerize',
    'Finance · Marketplace',
    '2026',
    'Built in the company finance portfolio to support trading workflows and user engagement.',
    ['TypeScript', 'React', 'Node.js'],
    null,
  ),
  p(
    'SB and Native',
    'Mobile · Hybrid',
    '2026',
    'Created as part of company mobile work, blending native and hybrid experiences for users.',
    ['React Native', 'TypeScript', 'Mobile'],
    null,
  ),
  p(
    'AWAAB APP',
    'Mobile · App',
    '2026',
    'Built during company development with a calm mobile interface and smooth interactions.',
    ['React Native', 'TypeScript', 'UI'],
    null,
  ),
  p(
    'Jitsi_metting',
    'Collaboration · Video',
    '2026',
    'Delivered as part of company collaboration work with meeting flows and realtime connectivity.',
    ['React', 'WebRTC', 'Realtime'],
    null,
  ),
  p(
    'SENNY',
    'Product · Platform',
    '2026',
    'Delivered within the company platform team, focused on product workflows and integrations.',
    ['TypeScript', 'React', 'API'],
    null,
  ),
  p(
    'GO_WORK',
    'Productivity · App',
    '2026',
    'Built during company productivity work for modern workflows and efficiency.',
    ['React', 'TypeScript', 'Productivity'],
    null,
  ),
  p(
    'GENIUS',
    'EdTech · Landing',
    '2026',
    'Delivered as company edtech work, providing a polished learning landing experience.',
    ['TypeScript', 'React', 'Tailwind'],
    null,
  ),
  p(
    'GODZILLA',
    'Frontend · Product',
    '2025',
    'Built as part of company product work with polished frontend interfaces and strong visual design.',
    ['TypeScript', 'React', 'Vercel'],
    null,
    'https://godzilla-fe.vercel.app',
  ),
  p(
    'PRODUCT',
    'Platform · CI/CD',
    '2026',
    'Delivered within the company infrastructure team with automated CI/CD pipelines.',
    ['GitHub Actions', 'Docker', 'CI/CD'],
    null,
    null,
  ),
  p(
    'COLLAB_FLOW Native',
    'Collaboration · Mobile',
    '2026',
    'Created during company collaboration work for fast native team workflows.',
    ['React Native', 'TypeScript', 'Realtime'],
    null,
    null,
  ),
]
