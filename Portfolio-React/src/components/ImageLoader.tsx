import { useState } from 'react'
import './ImageLoader.css'

interface ImageLoaderProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

const ImageLoader = ({ src, alt, className = '', style }: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className={`image-loader ${className}`} style={style}>
      {isLoading && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
      {hasError ? (
        <div className="image-error">
          <span>Failed to load image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  )
}

export default ImageLoader