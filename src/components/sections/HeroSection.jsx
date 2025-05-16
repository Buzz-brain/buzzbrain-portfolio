import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ChevronDown } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'

const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <motion.section 
      id="hero" 
      ref={ref}
      className="h-screen flex items-center justify-center relative overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 opacity-30 dark:opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 opacity-30 dark:opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-500 opacity-20 dark:opacity-10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container-default text-center z-10">
        <motion.div
          className="flex flex-col gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4">
              Hello, I'm Nduoma Chinomso Christian
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="block gradient-text">Buzz</span>
              <span className="block">Brain</span>
            </h1>
          </div>
          
          <div className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-700 dark:text-neutral-300">
            <span>I am a </span>
            <TypeAnimation
              sequence={[
                'FullStack Web Developer',
                1000,
                'UI Designer',
                1000,
                'Blockchain Enthusiast',
                1000,
                'Frontend Developer',
                1000,
                'AI Engineer',
                1000,
                'Backend Developer',
                1000,
              ]}
              wrapper="span"
              speed={50}
              className="text-primary-600 dark:text-primary-400"
              repeat={Infinity}
            />
          </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 text-neutral-700 dark:text-neutral-300">
            {/* <span className="block mb-2">Full-Stack Developer | AI Engineer | UI/UX Designer</span> */}
            {/* <span className="text-neutral-600 dark:text-neutral-400 font-normal text-base sm:text-lg md:text-xl block mb-3"> */}
            <span className="text-neutral-600 dark:text-neutral-400 font-normal text-base sm:text-lg md:text-xl block mb-3">
              Building powerful web experiences and intelligent systems
            </span>
          </h2>

          <div className="flex gap-4 mt-8 justify-center">
            <ScrollLink
              to="projects"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
            </ScrollLink>
            <ScrollLink
              to="resume"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              <motion.button
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.button>
            </ScrollLink>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <ScrollLink
          to="about"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="cursor-pointer"
        >
          <ChevronDown size={32} className="text-neutral-600 dark:text-neutral-400" />
        </ScrollLink>
      </motion.div>
    </motion.section>
  )
}

export default HeroSection