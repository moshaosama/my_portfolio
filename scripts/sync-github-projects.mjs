/**
 * Sync projects from YOUR GitHub account (moshaosama).
 * Usage: set GITHUB_TOKEN=your_token && node scripts/sync-github-projects.mjs
 * Never commit tokens to the repo.
 */
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const USER = process.env.GITHUB_USER || 'Brutalxnor'
const SKIP = /(_Server|_server|-Server|_BE|Server$)/i
const SKIP_NAMES = new Set([
  'moshaosama',
  'Portfolio',
  'My-Portfolio',
  'Portfolio_Graduation_Project',
  'Fe-Candidator',
  'ai-feed-be',
  'To-Do',
  'cardApp',
])

const ALLOWED_PROJECTS = new Set([
  'sarmad',
  'babben',
  'brokerize',
  'sbandnative',
  'awaabapp',
  'jitsimetting',
  'senny',
  'gowork',
  'genius',
  'godzilla',
  'product',
  'collabflownative',
  'geniuslandingpage',
  'godzillafe',
])

const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'Portfolio-Sync',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`, { headers })
if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`)

const normalize = (name) => name.toLowerCase().replace(/[-_ ]+/g, '')
const repos = (await res.json()).filter(
  (r) =>
    !r.fork &&
    !r.archived &&
    !SKIP.test(r.name) &&
    !SKIP_NAMES.has(r.name) &&
    ALLOWED_PROJECTS.has(normalize(r.name)),
)

const toTitle = (name) =>
  name
    .replace(/^[-_]+|[-_]+$/g, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

const lines = repos.map((r) => {
  const title = toTitle(r.name)
  const year = new Date(r.updated_at).getFullYear().toString()
  const desc = (r.description || `${title} — project by ${USER} on GitHub.`).replace(/'/g, "\\'")
  const stack = r.language ? `['${r.language}']` : "['TypeScript']"
  const live = r.homepage ? `'${r.homepage}'` : 'null'
  return `  p('${title}', '${r.language || 'Full Stack'}', '${year}', '${desc}', ${stack}, 'https://github.com/${USER}/${r.name}', ${live}),`
})

const file = `import type { Project } from './projects'

function p(
  title: string,
  category: string,
  year: string,
  description: string,
  stack: string[],
  github: string,
  live: string | null = null,
): Project {
  return { title, category, year, description, stack, github, live }
}

/** Auto-synced from github.com/${USER} */
export const projects: Project[] = [
${lines.join('\n')}
]
`

writeFileSync(resolve(__dirname, '../src/data/projects.synced.ts'), file)
console.log(`Synced ${repos.length} repos from @${USER} -> src/data/projects.synced.ts`)
