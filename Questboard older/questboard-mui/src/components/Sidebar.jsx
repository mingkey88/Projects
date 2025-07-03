import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Book as BookIcon, AddCircle as AddCircleIcon, EmojiEvents as EmojiEventsIcon, Dashboard as DashboardIcon } from '@mui/icons-material';

const DRAWER_WIDTH = 240;

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const UserStatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginTop: 'auto',
  backgroundColor: theme.palette.grey[50],
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const StatsAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginRight: theme.spacing(2),
}));

const Sidebar = ({ userPoints, onCreateQuest }) => {
  return (
    <StyledDrawer variant="permanent">
      <LogoBox>
        <DashboardIcon sx={{ fontSize: 24, color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" component="div" color="text.primary" fontWeight="medium">
          QuestBoard
        </Typography>
      </LogoBox>
      
      <List sx={{ flexGrow: 1 }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BookIcon color="action" />
            </ListItemIcon>
            <ListItemText primary="My Quests" />
          </ListItemButton>
        </ListItem>
        
        <Divider sx={{ my: 1 }} />
        
        <ListItem disablePadding>
          <ListItemButton onClick={onCreateQuest}>
            <ListItemIcon>
              <AddCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Create Quest" />
          </ListItemButton>
        </ListItem>
      </List>
      
      <UserStatsBox>
        <StatsAvatar>
          <EmojiEventsIcon fontSize="small" />
        </StatsAvatar>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Your Points
          </Typography>
          <Typography variant="subtitle2" color="text.primary">
            {userPoints}
          </Typography>
        </Box>
      </UserStatsBox>
    </StyledDrawer>
  );
};

export default Sidebar;