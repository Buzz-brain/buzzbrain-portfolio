import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Check if device has coarse pointer (touch screen)
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (hasCoarsePointer) {
      setHidden(true)
      return
    }

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseenter', onMouseEnter)
      document.addEventListener('mouseleave', onMouseLeave)
      document.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mouseup', onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, .cursor-pointer, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true))
        el.addEventListener('mouseleave', () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => {
      removeEventListeners()
    }
  }, [])

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgba(59, 130, 246, 0.5)',
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(59, 130, 246, 0.4)',
      borderColor: 'rgba(59, 130, 246, 0.8)',
    },
    hovered: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
    },
  }

  if (hidden) return null

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary-500 pointer-events-none z-50 mix-blend-difference"
        variants={cursorVariants}
        animate={clicked ? 'clicked' : linkHovered ? 'hovered' : 'default'}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      <motion.div
        className="cursor-ring fixed top-0 left-0 w-6 h-6 rounded-full bg-primary-500 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        animate={{
          scale: clicked ? 0.5 : linkHovered ? 0 : 0.2,
          opacity: clicked ? 1 : linkHovered ? 0 : 0.8,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />
    </>
  )
}

export default Cursor