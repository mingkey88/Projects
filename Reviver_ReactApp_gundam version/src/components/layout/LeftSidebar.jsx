import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Button,
  Avatar,
  Drawer,
  useMediaQuery,
  useTheme,
  IconButton,
  Badge
} from '@mui/material';
import { 
  Home as HomeIcon,
  CheckCircleOutline as TasksIcon,
  Folder as ProjectsIcon,
  Person as PersonIcon,
  Group as TeamIcon,
  EmojiEvents as AchievementsIcon,
  ExitToApp as LogoutIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Custom 3D cube icon for the logo
const CubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeftSidebar = ({ mobileOpen, setMobileOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const navItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Command Deck', icon: <HomeIcon /> },
    { id: 'tasks', path: '/tasks', label: 'Mission Control', icon: <TasksIcon /> },
    { id: 'projects', path: '/projects', label: 'Operations', icon: <ProjectsIcon /> },
    { id: 'profile', path: '/profile', label: 'Pilot Profile', icon: <PersonIcon /> },
    { id: 'squad', path: '/squad', label: 'Squad', icon: <TeamIcon /> },
    { id: 'achievements', path: '/achievements', label: 'Achievements', icon: <AchievementsIcon /> },
  ];

  const onlinePlayers = [
    { id: 1, name: 'Johnson', avatar: 'https://cdn.midjourney.com/4a7ac64c-c7ce-47d4-a70c-721530d39ad4/0_3.png', online: true },
    { id: 2, name: 'Manfred', avatar: 'https://cdn.midjourney.com/fc70ecb5-8f86-492b-bb51-b619ef422605/0_0.png', online: true },
  ];

  const sidebarContent = (
    <>
      {/* Logo Area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          px: 2.5,
          py: 2.5,
          borderBottom: 1,
          borderColor: 'border.main',
        }}
      >
        <Box 
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
          onClick={() => handleNavigation('/dashboard')}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main',
            }}
          >
            <CubeIcon />
          </Box>
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            ReviveR
          </Typography>
        </Box>
        
        {isMobile && (
          <IconButton onClick={handleDrawerClose} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation */}
      <List component="nav" aria-label="main navigation" sx={{ px: 1.5, py: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 'shape.borderRadius.md',
                '&.Mui-selected': {
                  bgcolor: 'background.card',
                  color: 'text.primary',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
                '&:hover': {
                  bgcolor: 'background.card',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Online Players */}
      <Box sx={{ mt: 3, px: 2.5 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: 'text.muted',
            letterSpacing: 0.5,
            mb: 2,
            display: 'block',
          }}
        >
          ONLINE PLAYERS
        </Typography>
        <List dense sx={{ mt: 1 }}>
          {onlinePlayers.map((player) => (
            <ListItem key={player.id} sx={{ px: 0, py: 1 }}>
              <Box
                sx={{
                  position: 'relative',
                  mr: 1.5,
                }}
              >
                <Avatar
                  src={player.avatar}
                  alt={player.name}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1.5,
                    border: '1px solid #e91e63',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    bgcolor: player.online ? '#4caf50' : 'grey.500',
                    borderRadius: '50%',
                    bottom: 0,
                    right: 0,
                    border: '2px solid',
                    borderColor: 'background.paper',
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {player.name}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Button */}
      <Box
        sx={{
          mt: 'auto',
          borderTop: 1,
          borderColor: 'border.main',
          p: 2.5,
        }}
      >
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          sx={{
            justifyContent: 'flex-start',
            color: 'text.secondary',
            borderRadius: 'shape.borderRadius.md',
            px: 1.5,
            py: 1,
            '&:hover': {
              bgcolor: 'background.card',
              color: 'text.primary',
            },
          }}
        >
          Log Out
        </Button>
      </Box>
    </>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { 
          width: 240,
          bgcolor: 'background.paper',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  ) : (
    <Box
      component="aside"
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'border.main',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto',
        position: 'relative',
        zIndex: 1200,
      }}
    >
      {sidebarContent}
    </Box>
  );
};

export default LeftSidebar;