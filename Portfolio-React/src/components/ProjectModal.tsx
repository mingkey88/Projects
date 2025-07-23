import { ExternalLink, Github, Calendar, User } from 'lucide-react'
import Modal from './Modal'
import ImageLoader from './ImageLoader'
import './ProjectModal.css'

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

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  if (!project) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="project-modal">
        <div className="project-modal-header">
          <ImageLoader 
            src={project.image} 
            alt={project.title}
            className="project-modal-image"
          />
          <div className="project-modal-overlay">
            <h2 className="project-modal-title">{project.title}</h2>
            <div className="project-modal-meta">
              {project.date && (
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{project.date}</span>
                </div>
              )}
              {project.role && (
                <div className="meta-item">
                  <User size={16} />
                  <span>{project.role}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="project-modal-content">
          <div className="project-modal-section">
            <h3>About This Project</h3>
            <p>{project.fullDescription || project.description}</p>
          </div>
          
          {project.technologies && project.technologies.length > 0 && (
            <div className="project-modal-section">
              <h3>Technologies Used</h3>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}
          
          {project.features && project.features.length > 0 && (
            <div className="project-modal-section">
              <h3>Key Features</h3>
              <ul className="features-list">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="project-modal-actions">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn modal-btn-primary"
              >
                <ExternalLink size={16} />
                View Live Project
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn modal-btn-secondary"
              >
                <Github size={16} />
                View Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProjectModal