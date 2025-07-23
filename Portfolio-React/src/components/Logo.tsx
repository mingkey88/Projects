import './Logo.css'

const Logo = () => {
  return (
    <div className="logo-container">
      <svg 
        width="56" 
        height="56" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        {/* Outer hexagonal frame */}
        <path 
          d="M20 2L32 8V24L20 30L8 24V8L20 2Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
          className="logo-frame"
        />
        
        {/* Inner core circle */}
        <circle 
          cx="20" 
          cy="16" 
          r="6" 
          fill="currentColor"
          className="logo-core"
        />
        
        {/* Circuit lines */}
        <path 
          d="M20 2V8M8 8L14 12M32 8L26 12M8 24L14 20M32 24L26 20M20 30V24" 
          stroke="currentColor" 
          strokeWidth="1.5"
          className="logo-circuits"
        />
        
        {/* Corner accent dots */}
        <circle cx="20" cy="4" r="1.5" fill="currentColor" className="logo-accent" />
        <circle cx="30" cy="10" r="1.5" fill="currentColor" className="logo-accent" />
        <circle cx="30" cy="22" r="1.5" fill="currentColor" className="logo-accent" />
        <circle cx="20" cy="28" r="1.5" fill="currentColor" className="logo-accent" />
        <circle cx="10" cy="22" r="1.5" fill="currentColor" className="logo-accent" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" className="logo-accent" />
        
        {/* Central cross/plus */}
        <path 
          d="M20 13V19M17 16H23" 
          stroke="var(--background)" 
          strokeWidth="2"
          className="logo-cross"
        />
      </svg>
      
      <div className="logo-text">
        <span className="logo-name">MingJie</span>
        <span className="logo-subtitle">.Dev</span>
      </div>
    </div>
  )
}

export default Logo