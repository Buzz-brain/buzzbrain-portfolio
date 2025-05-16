import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="about" className="section-padding bg-neutral-50 dark:bg-neutral-800/30" ref={ref}>
      <div className="container-default">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span 
            className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4"
            variants={itemVariants}
          >
            About Me
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Get to Know <span className="gradient-text">Buzz brain</span>
          </motion.h2>
          <motion.p 
            className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A passionate full-stack developer, AI engineer, and UI/UX designer creating innovative digital solutions
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto md:mx-0 overflow-hidden rounded-2xl shadow-xl">
              {/* Replace with actual image 
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-600 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">BuzzBrain</span>
              </div>*/}
              <img src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1747315700/6_jxkoqz.jpg" alt="my_photo" />

              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-500 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
            </div>
            
            {/* Experience highlights */}
            <motion.div 
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h4 className="text-lg font-semibold gradient-text">5+ Years</h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Professional Experience</p>
            </motion.div>
            
            <motion.div 
              className="absolute -top-6 -left-6 md:top-8 md:-left-8 bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h4 className="text-lg font-semibold gradient-text">50+</h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Projects Completed</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-3">Full Name: <span className="font-normal text-neutral-700 dark:text-neutral-300">Nduoma Chinomso Christian</span></h3>
              <h4 className="text-xl font-semibold mb-4">Nickname: <span className="gradient-text">Buzz Brain</span></h4>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-neutral-600 dark:text-neutral-400">
                I'm a passionate full-stack developer, AI engineer, and UI/UX designer with a love for creating innovative solutions. My expertise spans web development, artificial intelligence, and user experience design, allowing me to build complete, end-to-end solutions.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                Over the years, I've built a diverse portfolio including e-commerce platforms, decentralized applications, company websites, and intelligent systems. I believe in the power of technology to transform ideas into reality.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-3">Experience Highlights:</h4>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                <li>Built scalable e-commerce platforms and payment systems</li>
                <li>Developed decentralized web applications and smart contracts</li>
                <li>Created responsive company websites and corporate portals</li>
                <li>Designed and implemented food delivery platforms</li>
                <li>Built secure voting systems with blockchain technology</li>
                <li>Developed social media platforms and community websites</li>
                <li>Trained and deployed machine learning models for various applications</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <h4 className="text-xl font-semibold mb-3">Soft Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {['Team Leadership', 'Teaching', 'Communication', 'Innovation', 'Problem Solving', 'Critical Thinking', 'Adaptability'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-neutral-700 dark:text-neutral-300 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection