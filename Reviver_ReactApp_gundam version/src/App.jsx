import { useState, lazy, Suspense } from 'react';
import { CssBaseline, Box, CircularProgress } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ThemeModeProvider from './contexts/ThemeContext';

// Import font CSS
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// Layout components
import LeftSidebar from './components/layout/LeftSidebar';
import TopBar from './components/layout/TopBar';
import RightSidebar from './components/layout/RightSidebar';
import TaskContextProvider from './contexts/TaskContext';
import NotificationProvider from './contexts/NotificationContext';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy loading pages to improve performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Projects = lazy(() => import('./pages/Projects'));
const Profile = lazy(() => import('./pages/Profile'));
const Squad = lazy(() => import('./pages/Squad'));
const Achievements = lazy(() => import('./pages/Achievements'));

// Loading component
const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    }}
  >
    <CircularProgress 
      size={60}
      sx={{ 
        color: 'primary.main',
        '& .MuiCircularProgress-circle': {
          strokeLinecap: 'round',
        }
      }}
    />
  </Box>
);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <ThemeModeProvider>
      <CssBaseline />
      <NotificationProvider>
        <TaskContextProvider>
          <Router>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '100vh',
                bgcolor: 'background.default',
                color: 'text.secondary',
                overflow: 'hidden',
              }}
            >
              <LeftSidebar 
                mobileOpen={mobileMenuOpen}
                setMobileOpen={setMobileMenuOpen}
              />
              
              <Box
                component="main"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  overflow: 'hidden',
                }}
              >
                <TopBar onMobileMenuToggle={handleMobileMenuToggle} />
                <Box
                  sx={{
                    display: 'flex',
                    flexGrow: 1,
                    overflow: 'hidden',
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      overflow: 'auto',
                      bgcolor: 'background.default',
                    }}
                  >
                    <ErrorBoundary>
                      <Suspense fallback={<Loading />}>
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/tasks" element={<Tasks />} />
                          <Route path="/projects" element={<Projects />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/squad" element={<Squad />} />
                          <Route path="/achievements" element={<Achievements />} />
                        </Routes>
                      </Suspense>
                    </ErrorBoundary>
                  </Box>
                  <RightSidebar />
                </Box>
              </Box>
            </Box>
          </Router>
        </TaskContextProvider>
      </NotificationProvider>
    </ThemeModeProvider>
  );
}

export default App;
