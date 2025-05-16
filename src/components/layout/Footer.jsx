import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 py-12">
      <div className="container-default">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">BuzzBrain</h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
              Building powerful web experiences and intelligent systems. Let's create something amazing together.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/buzzbrain-dev"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/buzzbrain-dev"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com/buzzbrain-dev"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="mailto:buzzbrain@example.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <ScrollLink
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400 cursor-pointer"
                >
                  About Me
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="projects"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400 cursor-pointer"
                >
                  Projects
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="skills"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400 cursor-pointer"
                >
                  Skills
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400 cursor-pointer"
                >
                  Contact
                </ScrollLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Contact</h4>
            <ul className="space-y-2">
              <li className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Email:</span> buzzbrain@example.com
              </li>
              <li className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Phone:</span> +1 (234) 567-8900
              </li>
              <li className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Location:</span> Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700 text-center text-neutral-600 dark:text-neutral-400">
          <p>© {currentYear} Nduoma Chinomso Christian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer