import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileDown, ArrowUpRight, Calendar, MapPin, User, Mail, Phone } from 'lucide-react'

const ResumeSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  // Placeholder data - replace with actual details
  const resumeData = {
    education: [
      {
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        year: "2020-2022",
        description: "Specialized in Artificial Intelligence and Machine Learning, with a focus on Neural Networks and Computer Vision. Graduated with honors."
      },
      {
        degree: "Bachelor of Science in Software Engineering",
        institution: "University of Technology",
        year: "2016-2020",
        description: "Focused on Full-Stack Development and Software Architecture. Graduated with first-class honors."
      }
    ],
    experience: [
      {
        title: "Senior Full-Stack Developer",
        company: "TechInnovate Solutions",
        location: "San Francisco, CA",
        period: "2022-Present",
        responsibilities: [
          "Leading a team of 5 developers in building scalable web applications",
          "Implementing microservices architecture using Node.js and React",
          "Designing and optimizing database schemas for high-traffic platforms",
          "Integrating machine learning models into production applications"
        ]
      },
      {
        title: "AI Engineer",
        company: "Neural Dynamics",
        location: "Boston, MA",
        period: "2020-2022",
        responsibilities: [
          "Developed image recognition models using TensorFlow and PyTorch",
          "Created natural language processing solutions for customer service chatbots",
          "Optimized machine learning models for deployment on edge devices",
          "Collaborated with product teams to integrate AI features into user workflows"
        ]
      },
      {
        title: "UI/UX Designer & Frontend Developer",
        company: "CreativeVision Studios",
        location: "New York, NY",
        period: "2018-2020",
        responsibilities: [
          "Designed user interfaces for mobile and web applications using Figma",
          "Implemented responsive front-end designs using React and CSS-in-JS",
          "Conducted user research and usability testing to improve product experience",
          "Created and maintained design systems for consistent UI implementation"
        ]
      }
    ],
    certifications: [
      "TensorFlow Developer Certification - Google",
      "AWS Certified Developer - Associate",
      "Professional UI/UX Designer - Interaction Design Foundation",
      "Certified Blockchain Developer - Ethereum",
      "Advanced React Patterns - Frontend Masters"
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Fluent" },
      { name: "French", level: "Intermediate" }
    ]
  }

  return (
    <section id="resume" className="section-padding bg-neutral-50 dark:bg-neutral-800/30" ref={ref}>
      <div className="container-default">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4">
            Curriculum Vitae
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-6">
            A comprehensive overview of my professional background, education, and achievements
          </p>
          <motion.a
            href="/resume.pdf"
            download="Nduoma_Chinomso_Christian_Resume.pdf"
            className="btn btn-primary inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileDown size={18} className="mr-2" /> Download Resume
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Personal Info & Skills */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Personal Info Card */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-6 gradient-text">Personal Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <User size={18} className="text-primary-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Full Name</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">Nduoma Chinomso Christian</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={18} className="text-primary-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">buzzbrain@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={18} className="text-primary-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">+1 234 567 8900</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={18} className="text-primary-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Languages */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-6 gradient-text">Languages</h3>
              <div className="space-y-4">
                {resumeData.languages.map((language, index) => (
                  <div key={language.name} className="flex justify-between items-center">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-sm px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certifications */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-6 gradient-text">Certifications</h3>
              <ul className="space-y-3 list-disc list-inside text-neutral-600 dark:text-neutral-400">
                {resumeData.certifications.map((cert, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    {cert}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Main content - Education & Experience */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Education Section */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-6 gradient-text">Education</h3>
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <motion.div 
                    key={index}
                    className="border-l-2 border-primary-500 pl-5 ml-2 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary-500"></div>
                    <h4 className="text-lg font-semibold">{edu.degree}</h4>
                    <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-2">
                      <span>{edu.institution}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" /> {edu.year}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Experience Section */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-6 gradient-text">Work Experience</h3>
              <div className="space-y-8">
                {resumeData.experience.map((exp, index) => (
                  <motion.div 
                    key={index}
                    className="border-l-2 border-secondary-500 pl-5 ml-2 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                  >
                    <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-secondary-500"></div>
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <div className="flex flex-wrap items-center text-neutral-600 dark:text-neutral-400 mb-2">
                      <span className="mr-2">{exp.company}</span>
                      <span className="flex items-center mr-2">
                        <MapPin size={14} className="mr-1" /> {exp.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" /> {exp.period}
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-1 mt-3">
                      {exp.responsibilities.map((resp, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.2, delay: 0.5 + (index * 0.1) + (i * 0.05) }}
                        >
                          {resp}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* View Full Resume */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline font-medium"
                whileHover={{ x: 5 }}
              >
                View Full Resume <ArrowUpRight size={18} className="ml-1" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection