import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import testimonialsData from '../../data/testimonials.json'

const TestimonialsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    )
    setAutoplay(false)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    )
    setAutoplay(false)
  }

  // Auto advance testimonials
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [autoplay])

  // Variants for testimonial animations
  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="section-padding" ref={ref}>
      <div className="container-default">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Feedback from clients and colleagues about my work and collaboration
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 shadow-lg min-h-[320px] md:min-h-[280px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/4">
                    <div className="relative">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white dark:border-neutral-700 shadow-md mx-auto">
                        <img 
                          src={testimonialsData[currentIndex].avatar} 
                          alt={testimonialsData[currentIndex].name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-primary-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                        <Quote size={16} />
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <h4 className="font-semibold text-lg">{testimonialsData[currentIndex].name}</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">{testimonialsData[currentIndex].position}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <blockquote className="text-neutral-700 dark:text-neutral-300 italic text-lg leading-relaxed relative">
                      <Quote size={40} className="absolute -top-6 -left-4 text-primary-200 dark:text-primary-900/30 opacity-50 rotate-180" />
                      "{testimonialsData[currentIndex].testimonial}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              className="p-2 rounded-full bg-white dark:bg-neutral-800 shadow-md text-neutral-800 dark:text-neutral-200"
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index 
                      ? 'bg-primary-500' 
                      : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                    setAutoplay(false)
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            
            <motion.button
              className="p-2 rounded-full bg-white dark:bg-neutral-800 shadow-md text-neutral-800 dark:text-neutral-200"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection