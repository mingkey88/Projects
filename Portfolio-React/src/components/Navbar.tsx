import { useState, useEffect } from 'react'
import { Menu, X, Home, User, Briefcase, Mail, Moon, Sun, Code, Phone, MapPin, Linkedin, Github } from 'lucide-react'
import './Navbar.css'

interface NavbarProps {
  isDarkTheme: boolean
  toggleTheme: () => void
}

const Navbar = ({ isDarkTheme, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#hero', icon: Home, label: 'Home' },
    { href: '#about', icon: User, label: 'About' },
    { href: '#projects', icon: Briefcase, label: 'Projects' },
    { href: '#contact', icon: Mail, label: 'Contact' },
  ]

  const contactInfo = [
    { icon: Phone, label: '+65 98278695', href: 'tel:+6598278695' },
    { icon: Mail, label: 'mingjie.tan88@gmail.com', href: 'mailto:mingjie.tan88@gmail.com' },
    { icon: MapPin, label: 'Singapore', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mingjie' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/mingkey5428' },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <Code className="logo-icon" />
          <span>Ming Jie</span>
        </div>
        
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href} className="nav-item">
                <a 
                  href={item.href} 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="nav-contact">
          {contactInfo.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="contact-item">
                <Icon size={16} />
                {item.href.startsWith('http') ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                ) : item.href !== '#' ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            )
          })}
        </div>
        
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="hamburger" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
