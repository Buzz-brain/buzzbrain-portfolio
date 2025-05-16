import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Skill categories and items
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "TypeScript", level: 82 },
      { name: "Vue.js", level: 75 },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "PHP", level: 75 },
      { name: "PostgreSQL", level: 78 },
      { name: "Firebase", level: 85 },
      { name: "REST API", level: 92 },
    ]
  },
  {
    name: "Design",
    skills: [
      { name: "Figma", level: 90 },
      { name: "Adobe XD", level: 85 },
      { name: "UI Design", level: 88 },
      { name: "UX Research", level: 82 },
      { name: "Prototyping", level: 86 },
      { name: "Design Systems", level: 80 },
      { name: "Wireframing", level: 92 },
      { name: "Adobe Photoshop", level: 75 },
    ]
  },
  {
    name: "Blockchain & AI",
    skills: [
      { name: "Solidity", level: 82 },
      { name: "Truffle", level: 80 },
      { name: "Smart Contracts", level: 85 },
      { name: "Web3.js", level: 78 },
      { name: "Python", level: 88 },
      { name: "TensorFlow", level: 80 },
      { name: "Machine Learning", level: 75 },
      { name: "Computer Vision", level: 72 },
    ]
  }
]

const SkillCard = ({ category, skills, inView }) => {
  return (
    <motion.div 
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl font-semibold mb-6 gradient-text">{category}</h3>
      <div className="space-y-5">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                {skill.name}
              </span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {skill.level}%
              </span>
            </div>
            <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const SkillsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container-default">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4">
            My Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            My technical toolkit has been refined over years of building real-world applications across various domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard 
              key={category.name}
              category={category.name}
              skills={category.skills}
              inView={isInView}
            />
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-6">Other Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Git', 'GitHub', 'Docker', 'AWS', 'Netlify', 'Vercel', 'GraphQL', 'Redux', 'Jest', 'Cypress', 'Webpack', 'Babel', 'Sass', 'Material UI', 'Bootstrap', 'Chakra UI', 'Stripe', 'Auth0', 'JWT', 'OAuth'].map((skill, index) => (
              <motion.span 
                key={skill}
                className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.7 + (index * 0.03) }}
                whileHover={{ scale: 1.05, backgroundColor: '#3b82f6', color: '#ffffff' }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection