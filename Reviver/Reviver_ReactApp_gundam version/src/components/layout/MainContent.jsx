import { Box } from '@mui/material';
import Dashboard from '../../pages/Dashboard';
import Tasks from '../../pages/Tasks';
import Projects from '../../pages/Projects';
import Profile from '../../pages/Profile';
import Squad from '../../pages/Squad';
import Achievements from '../../pages/Achievements';

const MainContent = ({ currentView }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        overflow: 'auto',
        bgcolor: 'background.default',
      }}
    >
      {/* Display components based on the current view */}
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'tasks' && <Tasks />}
      {currentView === 'projects' && <Projects />}
      {currentView === 'profile' && <Profile />}
      {currentView === 'squad' && <Squad />}
      {currentView === 'achievements' && <Achievements />}
    </Box>
  );
};

export default MainContent;