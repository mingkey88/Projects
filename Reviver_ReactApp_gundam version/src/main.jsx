import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Box, CircularProgress } from '@mui/material'

// Loading fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#13111c',
    }}
  >
    <CircularProgress 
      size={60}
      sx={{ 
        color: '#e91e63',
        '& .MuiCircularProgress-circle': {
          strokeLinecap: 'round',
        }
      }}
    />
  </Box>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </StrictMode>,
)
