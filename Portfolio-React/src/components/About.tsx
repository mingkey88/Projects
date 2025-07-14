import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import './About.css'
import ReactLogo from '../assets/react.svg'

const About = () => {
  const designSkills = [
    {
      name: 'Adobe Photoshop',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg'
    },
    {
      name: 'Adobe After Effects',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg'
    },
    {
      name: 'Blender',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg'
    },
    {
      name: 'Unreal Engine',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg',
      upcoming: true
    }
  ]

  const frontendSkills = [
    {
      name: 'HTML',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    {
      name: 'JavaScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    {
      name: 'CSS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    {
      name: 'React',
      logo: ReactLogo
    }
  ]
  const backendSkills = [
    {
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    {
      name: 'MongoDB',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    {
      name: 'PostgreSQL',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    }
  ]

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
                  I am a creative technologist with a track record in animation, event coordination, and financial advisory. <br />
                  Currently doing a career transition to a Full-Stack Developer.
                </p>
                
                <div className="skills-category">
                  <h4 className="skills-category-title">Design & Media</h4>
                  <div className="skills-list">
                    {designSkills.map((skill, index) => (
                      <div 
                        key={index} 
                        className={`skill-item${skill.upcoming ? ' upcoming' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <img src={skill.logo} alt={skill.name + ' logo'} style={{ width: 24, height: 24 }} />
                        <span className="skill-name">{skill.name}</span>
                        {skill.upcoming && (
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
                    <div key={index} className="skill-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={skill.logo} alt={skill.name + ' logo'} style={{ width: 24, height: 24 }} />
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="skills-category">
                <h4 className="skills-category-title">Backend</h4>
                <div className="skills-list">
                  {backendSkills.map((skill, index) => (
                    <div key={index} className="skill-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={skill.logo} alt={skill.name + ' logo'} style={{ width: 24, height: 24 }} />
                      <span className="skill-name">{skill.name}</span>
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
