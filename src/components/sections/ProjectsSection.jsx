import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import projectsData from '../../data/projects.json'

const ProjectCard = ({ project, index, inView }) => {
  return (
    <motion.div 
      className="card overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-grow">{project.description}</p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between mt-auto pt-4">
          <motion.a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} className="mr-1" /> Code
          </motion.a>
          
          <motion.a 
            href={project.liveDemo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={18} className="mr-1" /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [githubProjects, setGithubProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showMore, setShowMore] = useState(false)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  // Filter categories based on unique technologies
  const filters = ['All', 'React', 'Node.js', 'MongoDB', 'Solidity', 'Python']

  useEffect(() => {
    // Load static projects from JSON
    setProjects(projectsData)
    setFilteredProjects(projectsData.filter(project => project.featured))
    
    // Fetch GitHub projects
    const fetchGitHubProjects = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('https://api.github.com/users/buzzbrain-dev/repos')
        if (response.ok) {
          const data = await response.json()
          setGithubProjects(data)
        } else {
          setError('Failed to fetch GitHub projects')
        }
      } catch (err) {
        setError('Error fetching GitHub projects: ' + err.message)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchGitHubProjects()
  }, [])

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(showMore ? projects : projects.filter(project => project.featured))
    } else {
      const filtered = projects.filter(project => 
        project.technologies.includes(activeFilter)
      )
      setFilteredProjects(filtered)
    }
  }, [activeFilter, projects, showMore])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const handleShowMore = () => {
    setShowMore(!showMore)
  }

  return (
    <section id="projects" className="section-padding bg-neutral-50 dark:bg-neutral-800/30" ref={ref}>
      <div className="container-default">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            A collection of my work showcasing my skills in web development, blockchain, AI, and design
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              inView={isInView}
            />
          ))}
        </div>

        {/* Show More/Less Button */}
        {activeFilter === 'All' && projects.length > 4 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              onClick={handleShowMore}
              className="btn btn-outline inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronRight size={18} className={`ml-1 transition-transform duration-300 ${showMore ? 'rotate-90' : ''}`} />
            </motion.button>
          </motion.div>
        )}

        {/* GitHub Projects Section */}
        {isLoading && (
          <div className="text-center mt-16">
            <p className="text-neutral-600 dark:text-neutral-400">Loading GitHub projects...</p>
          </div>
        )}

        {error && (
          <div className="text-center mt-16">
            <p className="text-error-500">Error: {error}</p>
          </div>
        )}

        {githubProjects.length > 0 && (
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">GitHub Repositories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {githubProjects.slice(0, 4).map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-6 hover:border-primary-500 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-lg font-semibold mb-2">{repo.name}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">{repo.description || 'No description provided'}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-500 dark:text-neutral-500">
                      {repo.language || 'Various'}
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-500 dark:text-neutral-500 mr-4">
                        ⭐ {repo.stargazers_count}
                      </span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-500">
                        🍴 {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            <div className="text-center mt-8">
              <motion.a
                href="https://github.com/buzzbrain-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Repositories <ExternalLink size={18} className="ml-2" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection