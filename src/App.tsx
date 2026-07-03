import './App.css'
import ScrollBackground from './components/canvas/ScrollBackground'
import TopBar from './components/layout/TopBar'
import AboutSection from './components/sections/AboutSection'
import ContactSection from './components/sections/ContactSection'
import ExperienceSection from './components/sections/ExperienceSection'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import LoadingScreen from './components/LoadingScreen'
import { ScrollProvider } from './context/ScrollContext'

function App() {
  return (
    <ScrollProvider>
      <LoadingScreen />
      <div className="app-shell">
        <ScrollBackground />
        <TopBar />
        <main className="content">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </ScrollProvider>
  )
}

export default App
