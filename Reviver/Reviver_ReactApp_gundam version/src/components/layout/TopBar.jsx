import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Badge,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '../../contexts/ThemeContext';

const TopBar = ({ onMobileMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleTheme } = useThemeMode();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          backgroundColor: 'background.card',
          border: '1px solid',
          borderColor: 'border.main',
          borderRadius: 'shape.borderRadius.md',
          minWidth: 180,
        }
      }}
    >
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>Pilot Profile</MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>Mecha Customization</MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>Squad Management</MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>Logout</MenuItem>
    </Menu>
  );

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: 1, 
        borderColor: 'border.main', 
        backgroundColor: 'background.default'
      }}
    >
      <Toolbar sx={{ height: 70, px: { xs: 2, sm: 3 } }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onMobileMenuToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Search bar */}
        <Box 
          sx={{ 
            position: 'relative',
            borderRadius: 20,
            backgroundColor: alpha(theme.palette.background.paper, 0.15),
            '&:hover': {
              backgroundColor: alpha(theme.palette.background.paper, 0.25),
            },
            border: '1px solid',
            borderColor: 'border.main',
            width: { xs: '100%', sm: 320 },
            mr: { xs: 0, sm: 2 }
          }}
        >
          <Box sx={{ position: 'absolute', height: '100%', display: 'flex', alignItems: 'center', pl: 2, pointerEvents: 'none' }}>
            <SearchIcon sx={{ color: 'text.muted' }} />
          </Box>
          <InputBase
            placeholder="Search for missions..."
            inputProps={{ 'aria-label': 'search' }}
            sx={{
              color: 'text.primary',
              fontSize: '0.875rem',
              pl: 5,
              pr: 1,
              py: 1,
              width: '100%',
              '& .MuiInputBase-input': {
                transition: theme.transitions.create('width'),
              }
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right section with icons and user profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          {/* Theme Toggle Button */}
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton 
              size="large" 
              color="inherit" 
              onClick={toggleTheme}
              sx={{
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'rotate(30deg)' }
              }}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <IconButton size="large" color="inherit">
            <Badge color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User profile */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 0.75,
              px: 0.75,
              borderRadius: 'shape.borderRadius.md',
              backgroundColor: 'background.paper',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'background.card',
              }
            }}
            onClick={handleProfileMenuOpen}
          >
            <Avatar 
              src="https://cdn.midjourney.com/1b3319f4-e681-4002-9ac5-a39a2ccb0463/0_3.png" 
              alt="User Avatar"
              sx={{ width: 36, height: 36 }}
            />
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                Ming Jie
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.muted' }}>
                @mingkey88
              </Typography>
            </Box>
            <IconButton 
              size="small"
              sx={{ display: { xs: 'none', sm: 'flex' }, p: 0 }}
            >
              <ExpandMoreIcon fontSize="small" sx={{ color: 'text.muted' }} />
            </IconButton>
          </Box>

          <IconButton size="large" color="inherit">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default TopBar;