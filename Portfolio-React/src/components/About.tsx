import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import './About.css'

const About = () => {
  const designSkills = [
    'Adobe Photoshop',
    'Adobe After Effects',
    'Blender',
    { name: 'Unreal Engine', upcoming: true }
  ]

  const frontendSkills = ['React', 'JavaScript', 'CSS']
  const backendSkills = ['Node.js', 'Python', 'MongoDB']

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me & Skills</h2>
          <p className="section-subtitle">Get to know me and what I work with</p>
        </div>
        
        <div className="about-skills-container">
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-info">
                <h3 className="profile-name">Ming Jie</h3>
                <p className="profile-tagline">CG artist & Full Stack Web Developer</p>
                <p className="profile-description">
                  Passionate developer with expertise in modern web technologies. 
                  I love creating innovative solutions and bringing ideas to life through code.
                </p>
                
                <div className="skills-category">
                  <h4 className="skills-category-title">Design & Media</h4>
                  <div className="skills-list">
                    {designSkills.map((skill, index) => (
                      <div 
                        key={index} 
                        className={`skill-item ${typeof skill === 'object' && skill.upcoming ? 'upcoming' : ''}`}
                      >
                        <span className="skill-name">
                          {typeof skill === 'string' ? skill : skill.name}
                        </span>
                        {typeof skill === 'object' && skill.upcoming && (
                          <span className="skill-badge">Upcoming</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="social-links">
                  <a href="https://github.com/mingkey88" className="social-icon" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/tan-ming-jie-641022b1" className="social-icon" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="social-icon" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                  <a 
                    href="https://www.instagram.com/mingkey88/" 
                    className="social-icon"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="skills-section">
            <h3 className="skills-section-title">Technologies & Skills</h3>
            <div className="skills-container">
              <div className="skills-category">
                <h4 className="skills-category-title">Frontend</h4>
                <div className="skills-list">
                  {frontendSkills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="skills-category">
                <h4 className="skills-category-title">Backend</h4>
                <div className="skills-list">
                  {backendSkills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
