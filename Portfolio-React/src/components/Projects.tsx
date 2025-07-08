import { useState } from 'react'
import './Projects.css'

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  link?: string
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects: Project[] = [
    {
      id: 1,
      title: '3D Character Design',
      description: 'A detailed 3D character model created in Blender with realistic textures and lighting.',
      image: 'https://cdn.midjourney.com/654b6e48-ea22-4c9a-8994-146f3c7be0aa/0_0.png',
      category: '3d',
      tags: ['Blender', '3D Modeling', 'Character Design']
    },
    {
      id: 2,
      title: 'Fantasy Illustration',
      description: 'Digital painting of a fantasy warrior character with intricate armor details.',
      image: 'https://cdn.midjourney.com/a4621d08-cdac-40d4-861c-8aff7faaa750/0_0.png',
      category: '2d',
      tags: ['Digital Art', 'Character Design', 'Fantasy']
    },
    {
      id: 3,
      title: 'React Portfolio Website',
      description: 'Modern portfolio website built with React, TypeScript, and Three.js.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'web',
      tags: ['React', 'TypeScript', 'Three.js']
    },
    {
      id: 4,
      title: 'Creature Concept Art',
      description: 'Original creature design with unique anatomical features and color schemes.',
      image: 'https://cdn.midjourney.com/79dd41b5-d076-4351-95c2-a47e407cc343/0_0.png',
      category: '2d',
      tags: ['Concept Art', 'Creature Design', 'Digital Painting']
    },
    {
      id: 5,
      title: 'Full Stack Web App',
      description: 'Complete web application with Node.js backend and React frontend.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'web',
      tags: ['Node.js', 'React', 'MongoDB']
    },
    {
      id: 6,
      title: 'Environment Design',
      description: 'Detailed 3D environment scene with atmospheric lighting and textures.',
      image: 'https://cdn.midjourney.com/39a7f3d1-2357-45f3-904b-35fbe5b38102/0_0.png',
      category: '3d',
      tags: ['Environment Art', '3D', 'Lighting']
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
                    <button className="btn btn-primary">View Details</button>
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
    </section>
  )
}

export default Projects
