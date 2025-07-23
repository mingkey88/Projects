import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ImageLoader from './ImageLoader'
import './SkillBar.css'

interface SkillBarProps {
  name: string
  logo: string
  level: number
  delay?: number
  upcoming?: boolean
}

const SkillBar = ({ name, logo, level, delay = 0, upcoming = false }: SkillBarProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`skill-bar-item ${upcoming ? 'upcoming' : ''}`}>
      <div className="skill-bar-header">
        <div className="skill-info">
          <ImageLoader src={logo} alt={`${name} logo`} className="skill-icon" />
          <span className="skill-name">{name}</span>
          {upcoming && <span className="skill-badge">Upcoming</span>}
        </div>
        <span className="skill-percentage">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: delay }}
        />
      </div>
    </div>
  )
}

export default SkillBar