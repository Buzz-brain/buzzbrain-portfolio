import { motion } from 'framer-motion'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import SkillsSection from '../components/sections/SkillsSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import DesignsSection from '../components/sections/DesignsSection'
import GitHubSection from '../components/sections/GitHubSection'
import MLSection from '../components/sections/MLSection'
import ResumeSection from '../components/sections/ResumeSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import ContactSection from '../components/sections/ContactSection'

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <DesignsSection />
      <GitHubSection />
      <MLSection />
      <ResumeSection />
      <TestimonialsSection />
      <ContactSection />
    </motion.div>
  )
}

export default HomePage