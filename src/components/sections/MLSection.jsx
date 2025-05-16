import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Zap, BarChart3 } from 'lucide-react'
import mlProjectsData from '../../data/ml-projects.json'

const MLSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="ml" className="section-padding" ref={ref}>
      <div className="container-default">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4">
            Artificial Intelligence
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Machine Learning <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Exploring the frontiers of artificial intelligence with cutting-edge machine learning models
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mlProjectsData.filter(project => project.featured).map((project, index) => (
            <motion.div
              key={project.id}
              className="card overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-success-500 text-white text-sm font-medium flex items-center">
                  <Zap size={14} className="mr-1" /> 
                  {project.accuracy}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">{project.description}</p>
                
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 flex items-center">
                    <BarChart3 size={16} className="mr-2" /> 
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 text-xs font-medium bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full inline-flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Demo <ExternalLink size={16} className="ml-2" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All ML Projects */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Other Machine Learning Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mlProjectsData.filter(project => !project.featured).map((project, index) => (
              <motion.div
                key={project.id}
                className="card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                whileHover={{ y: -5 }}
              >
                <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                <div className="flex items-center mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 text-xs font-medium">
                    {project.accuracy} Accuracy
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="px-1.5 py-0.5 text-xs font-medium bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-1.5 py-0.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
                  whileHover={{ x: 2 }}
                >
                  View Project <ExternalLink size={14} className="ml-1" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MLSection