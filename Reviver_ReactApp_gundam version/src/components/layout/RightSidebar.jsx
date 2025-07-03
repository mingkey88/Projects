import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  Avatar,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  SportsEsports as MechaIcon,
  Extension as EquipmentIcon,
  EmojiEvents as AchievementIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const RightSidebar = () => {
  // Mecha stats
  const mechaStats = [
    { label: 'Model:', value: 'RX-78-2 Gundam' },
    { label: 'Level:', value: '7' },
    { label: 'XP to Level 8:', value: '345/500' },
  ];

  // Equipment data
  const equipment = [
    { 
      id: 1, 
      name: 'Beam Rifle Mk.II', 
      rarity: 'rare', 
      icon: <EquipmentIcon /> 
    },
    { 
      id: 2, 
      name: 'Beam Saber', 
      rarity: 'common', 
      icon: <EquipmentIcon /> 
    },
    { 
      id: 3, 
      name: 'Core Booster', 
      rarity: 'uncommon', 
      icon: <EquipmentIcon /> 
    },
    { 
      id: 4, 
      name: 'Hyper Bazooka', 
      rarity: 'locked', 
      icon: <EquipmentIcon />,
      lockMessage: 'Complete 5 high priority tasks to unlock'
    },
  ];

  // Achievements data
  const achievements = [
    {
      id: 1,
      name: '3-Day Streak',
      description: 'Completed tasks for 3 consecutive days',
      icon: <AchievementIcon />,
    },
    {
      id: 2,
      name: 'Master Organizer',
      description: 'Completed 25 tasks in total',
      icon: <AchievementIcon />,
    },
  ];

  // Upcoming deadlines
  const deadlines = [
    {
      id: 1,
      time: 'Tomorrow, 2:00 PM',
      title: 'Team meeting presentation',
      priority: 'high',
    },
    {
      id: 2,
      time: 'Apr 28, 11:59 PM',
      title: 'Submit quarterly report',
      priority: 'medium',
    },
    {
      id: 3,
      time: 'Apr 30, 9:00 AM',
      title: 'Project milestone review',
      priority: 'high',
    },
  ];

  // Get color for priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'primary';
    }
  };

  // Get color for rarity
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return '#78909c';
      case 'uncommon':
        return '#4caf50';
      case 'rare':
        return '#2196f3';
      case 'epic':
        return '#9c27b0';
      case 'legendary':
        return '#ff9800';
      default:
        return '#78909c';
    }
  };

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: '100%', md: 320 },
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderLeft: { xs: 0, md: 1 },
        borderTop: { xs: 1, md: 0 },
        borderColor: 'border.main',
        height: '100%', 
        overflow: 'auto',
        position: { xs: 'relative', md: 'sticky' },
        top: 0,
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            fontWeight: 700,
            mb: 3,
            color: 'text.primary',
          }}
        >
          Your Gundam
        </Typography>

        {/* Mecha Display */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: 'background.card',
            borderRadius: 'shape.borderRadius.lg',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 250,
              mb: 2,
              borderRadius: 'shape.borderRadius.md',
              overflow: 'hidden',
              border: '3px solid',
              borderColor: 'primary.main',
              boxShadow: '0 0 15px rgba(233, 30, 99, 0.3)',
            }}
          >
            <img
              src="https://cdn.midjourney.com/4843884b-2384-46b4-9300-614f1d0c282c/0_3.png"
              alt="Your Gundam mech"
              style={{ width: '100%', display: 'block' }}
            />
          </Box>

          <Box sx={{ width: '100%' }}>
            {mechaStats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 1,
                  borderBottom: index !== mechaStats.length - 1 ? 1 : 0,
                  borderColor: 'border.main',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="body2" color="text.primary" fontWeight={500}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Equipment Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: '1.125rem',
              fontWeight: 600,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Equipment
          </Typography>

          <List sx={{ p: 0 }}>
            {equipment.map((item) => (
              <ListItem
                key={item.id}
                disableGutters
                disablePadding
                sx={{
                  mb: 1.5,
                  bgcolor: 'background.card',
                  borderRadius: 'shape.borderRadius.md',
                  p: 1.5,
                  opacity: item.rarity === 'locked' ? 0.7 : 1,
                  '&:hover': {
                    bgcolor: 'background.cardHover',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    mr: 2,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    {item.name}
                  </Typography>
                  {item.rarity !== 'locked' ? (
                    <Chip
                      label={item.rarity}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.75rem',
                        bgcolor: getRarityColor(item.rarity),
                        color: 'white',
                        mt: 0.5,
                      }}
                    />
                  ) : (
                    <Typography variant="caption" color="text.muted">
                      {item.lockMessage}
                    </Typography>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Achievements Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: '1.125rem',
              fontWeight: 600,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Recent Achievements
          </Typography>

          <List sx={{ p: 0 }}>
            {achievements.map((item) => (
              <ListItem
                key={item.id}
                disableGutters
                disablePadding
                sx={{
                  mb: 1.5,
                  bgcolor: 'background.card',
                  borderRadius: 'shape.borderRadius.md',
                  p: 2,
                  '&:hover': {
                    bgcolor: 'background.cardHover',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 0.2s',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'background.default',
                    color: 'gold',
                    mr: 2,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Upcoming Deadlines */}
        <Box>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: '1.125rem',
              fontWeight: 600,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Upcoming Deadlines
          </Typography>

          <List sx={{ p: 0 }}>
            {deadlines.map((item) => (
              <ListItem
                key={item.id}
                disableGutters
                disablePadding
                sx={{
                  mb: 1.5,
                  bgcolor: 'background.card',
                  borderRadius: 'shape.borderRadius.md',
                  p: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  '&:hover': {
                    bgcolor: 'background.cardHover',
                  },
                }}
              >
                <Typography variant="caption" color="text.muted">
                  {item.time}
                </Typography>
                <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ my: 0.5 }}>
                  {item.title}
                </Typography>
                <Chip
                  label={`${item.priority} Priority`}
                  size="small"
                  color={getPriorityColor(item.priority)}
                  sx={{
                    height: 20,
                    fontSize: '0.75rem',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default RightSidebar;