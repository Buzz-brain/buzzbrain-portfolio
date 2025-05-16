import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import designsData from '../../data/designs.json'

const DesignsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedDesign, setSelectedDesign] = useState(null)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? designsData.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === designsData.length - 1 ? 0 : prevIndex + 1
    )
  }

  const openLightbox = (design) => {
    setSelectedDesign(design)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedDesign(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <section id="designs" className="section-padding" ref={ref}>
      <div className="container-default">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4">
            Creative Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            UI/UX <span className="gradient-text">Designs</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            A collection of user interface and experience designs showcasing my creative approach to solving design challenges
          </p>
        </motion.div>

        {/* Carousel for Featured Designs */}
        <div className="relative overflow-hidden rounded-xl shadow-lg mb-16">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Navigation Arrows */}
            <motion.button
              className="absolute left-4 z-10 p-2 rounded-full bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm text-neutral-800 dark:text-neutral-200 shadow-md"
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            
            <motion.button
              className="absolute right-4 z-10 p-2 rounded-full bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm text-neutral-800 dark:text-neutral-200 shadow-md"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
            
            {/* Carousel Item */}
            <motion.div 
              key={designsData[currentIndex].id}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-video cursor-pointer" onClick={() => openLightbox(designsData[currentIndex])}>
                <img 
                  src={designsData[currentIndex].image} 
                  alt={designsData[currentIndex].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {designsData[currentIndex].title}
                  </h3>
                  <p className="text-white/90 mb-4 max-w-2xl">
                    {designsData[currentIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {designsData[currentIndex].tools.map((tool) => (
                      <span 
                        key={tool} 
                        className="px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                    <motion.a
                      href={designsData[currentIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary-500/90 text-white rounded-full ml-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Design <ExternalLink size={14} className="ml-1" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {designsData.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Grid of All Designs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designsData.map((design, index) => (
            <motion.div
              key={design.id}
              className="card overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              onClick={() => openLightbox(design)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={design.image} 
                  alt={design.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{design.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {design.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="px-2 py-0.5 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {design.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white"
                onClick={closeLightbox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
              
              <img 
                src={selectedDesign.image} 
                alt={selectedDesign.title} 
                className="max-h-[80vh] w-auto mx-auto object-contain"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{selectedDesign.title}</h3>
                <p className="text-white/90 mb-3">{selectedDesign.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {selectedDesign.tools.map((tool) => (
                      <span 
                        key={tool} 
                        className="px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href={selectedDesign.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 font-medium bg-primary-500 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Full Design <ExternalLink size={16} className="ml-2" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default DesignsSection