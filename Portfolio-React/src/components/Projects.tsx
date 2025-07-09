import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, User } from 'lucide-react'
import './Projects.css'

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  link?: string
  githubLink?: string
  fullDescription?: string
  technologies?: string[]
  features?: string[]
  date?: string
  role?: string
  additionalImages?: string[]
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects: Project[] = [
    {
      id: 1,
      title: '3D Character Design',
      description: 'A detailed 3D character model created in Blender with realistic textures and lighting.',
      fullDescription: 'This project involved creating a fully rigged 3D character from concept to final render. The character features realistic skin textures, dynamic hair simulation, and advanced material shading. The project showcases expertise in character modeling, UV mapping, texturing, and lighting techniques.',
      image: 'https://cdn.midjourney.com/654b6e48-ea22-4c9a-8994-146f3c7be0aa/0_0.png',
      category: '3d',
      tags: ['Blender', '3D Modeling', 'Character Design'],
      technologies: ['Blender', 'Substance Painter', 'Photoshop', 'Cycles Renderer'],
      features: [
        'Realistic skin texturing',
        'Dynamic hair simulation',
        'Advanced material shading',
        'Fully rigged character',
        'Multiple render passes'
      ],
      date: 'March 2024',
      role: '3D Artist & Technical Artist',
      link: 'https://example.com/3d-character',
      githubLink: 'https://github.com/example/3d-character',
      additionalImages: [
        'https://cdn.midjourney.com/654b6e48-ea22-4c9a-8994-146f3c7be0aa/0_1.png',
        'https://cdn.midjourney.com/654b6e48-ea22-4c9a-8994-146f3c7be0aa/0_2.png'
      ]
    },
    {
      id: 2,
      title: 'Fantasy Illustration',
      description: 'Digital painting of a fantasy warrior character with intricate armor details.',
      fullDescription: 'An original fantasy character illustration featuring a female warrior with elaborate armor design. The artwork demonstrates advanced digital painting techniques, including atmospheric perspective, dynamic lighting, and detailed texture work. Created using a combination of traditional drawing principles and digital tools.',
      image: 'https://cdn.midjourney.com/a4621d08-cdac-40d4-861c-8aff7faaa750/0_0.png',
      category: '2d',
      tags: ['Digital Art', 'Character Design', 'Fantasy'],
      technologies: ['Photoshop', 'Procreate', 'Clip Studio Paint'],
      features: [
        'Original character design',
        'Detailed armor illustration',
        'Dynamic lighting effects',
        'Atmospheric background',
        'High-resolution artwork'
      ],
      date: 'February 2024',
      role: 'Digital Artist & Concept Designer',
      link: 'https://example.com/fantasy-art',
      additionalImages: [
        'https://cdn.midjourney.com/a4621d08-cdac-40d4-861c-8aff7faaa750/0_1.png'
      ]
    },
    {
      id: 3,
      title: 'React Portfolio Website',
      description: 'Modern portfolio website built with React, TypeScript, and Three.js.',
      fullDescription: 'A fully responsive portfolio website showcasing modern web development practices. Built with React and TypeScript for type safety, featuring smooth animations with Framer Motion, and interactive 3D elements using Three.js. The site includes a content management system and is optimized for performance and SEO.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'web',
      tags: ['React', 'TypeScript', 'Three.js'],
      technologies: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Vite', 'CSS3'],
      features: [
        'Responsive design',
        'Interactive 3D elements',
        'Smooth animations',
        'Type-safe codebase',
        'SEO optimized',
        'Performance optimized'
      ],
      date: 'January 2024',
      role: 'Full Stack Developer',
      link: 'https://example.com/portfolio',
      githubLink: 'https://github.com/example/portfolio',
      additionalImages: [
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 4,
      title: 'Creature Concept Art',
      description: 'Original creature design with unique anatomical features and color schemes.',
      fullDescription: 'A series of original creature designs exploring unique anatomical structures and evolutionary adaptations. Each design includes detailed studies of form, function, and environmental adaptation. The project demonstrates understanding of anatomy, biology, and speculative evolution in creature design.',
      image: 'https://cdn.midjourney.com/79dd41b5-d076-4351-95c2-a47e407cc343/0_0.png',
      category: '2d',
      tags: ['Concept Art', 'Creature Design', 'Digital Painting'],
      technologies: ['Photoshop', 'Procreate', 'Blender (for reference)'],
      features: [
        'Original creature designs',
        'Anatomical studies',
        'Environmental adaptations',
        'Color variations',
        'Detailed sketches'
      ],
      date: 'December 2023',
      role: 'Concept Artist',
      link: 'https://example.com/creature-art',
      additionalImages: [
        'https://cdn.midjourney.com/79dd41b5-d076-4351-95c2-a47e407cc343/0_1.png'
      ]
    },
    {
      id: 5,
      title: 'Full Stack Web App',
      description: 'Complete web application with Node.js backend and React frontend.',
      fullDescription: 'A comprehensive full-stack web application featuring user authentication, real-time data synchronization, and a modern responsive interface. The backend is built with Node.js and Express, using MongoDB for data storage, while the frontend utilizes React with a component-based architecture.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'web',
      tags: ['Node.js', 'React', 'MongoDB'],
      technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'JWT', 'Socket.io'],
      features: [
        'User authentication',
        'Real-time updates',
        'RESTful API',
        'Database integration',
        'Responsive design',
        'Security features'
      ],
      date: 'November 2023',
      role: 'Full Stack Developer',
      link: 'https://example.com/fullstack-app',
      githubLink: 'https://github.com/example/fullstack-app',
      additionalImages: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    }
  ]

  const categories = [
    { id: 'all', label: 'All' },
    { id: '2d', label: '2D Work' },
    { id: '3d', label: '3D Work' },
    { id: 'web', label: 'Web Apps' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">Explore my recent work</p>
        </div>
        
        <div className="category-chips">
          {categories.map(category => (
            <button
              key={category.id}
              className={`chip ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => openModal(project)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
              
              <div className="modal-header">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="modal-image"
                />
                <div className="modal-info">
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <div className="modal-meta">
                    {selectedProject.date && (
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>{selectedProject.date}</span>
                      </div>
                    )}
                    {selectedProject.role && (
                      <div className="meta-item">
                        <User size={16} />
                        <span>{selectedProject.role}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="modal-body">
                <div className="modal-description">
                  <h3>About This Project</h3>
                  <p>{selectedProject.fullDescription || selectedProject.description}</p>
                </div>
                
                {selectedProject.technologies && (
                  <div className="modal-section">
                    <h3>Technologies Used</h3>
                    <div className="tech-grid">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedProject.features && (
                  <div className="modal-section">
                    <h3>Key Features</h3>
                    <ul className="features-list">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="modal-actions">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <ExternalLink size={16} />
                      View Live Project
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <Github size={16} />
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
