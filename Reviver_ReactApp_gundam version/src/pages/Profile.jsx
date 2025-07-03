import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  SportsEsports as GamesIcon,
  EmojiEvents as AchievementsIcon,
  History as HistoryIcon,
  Psychology as InsightIcon,
  FitnessCenter as EnduranceIcon,
  Gavel as CommandIcon,
  Whatshot as ResolveIcon,
  People as AllianceIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useTaskContext } from '../contexts/TaskContext';

const Profile = () => {
  const { userStats } = useTaskContext();
  const [tabValue, setTabValue] = useState(0);

  // Profile data
  const profile = {
    name: 'Ming Jie',
    callsign: 'Spectrum',
    rank: 'Senior Pilot',
    joinDate: 'Oct 15, 2023',
    mechaModel: 'RX-78-2 Gundam',
    level: 7,
    xp: 345,
    xpToNextLevel: 500,
    avatar: 'https://cdn.midjourney.com/1b3319f4-e681-4002-9ac5-a39a2ccb0463/0_3.png',
    banner: 'https://cdn.midjourney.com/70c84e61-34fb-4f88-9bd6-bfd70b25e1c6/0_0.png',
    bio: 'Specialized in tactical operations and advanced mecha piloting. Former squad leader of Team Nexus. Passionate about optimizing neural link efficiency and quantum shield technology.',
    recentAchievements: [
      {
        id: 1,
        title: '3-Day Streak',
        description: 'Completed tasks for 3 consecutive days',
        date: 'April 28, 2025',
        icon: <AchievementsIcon />,
      },
      {
        id: 2,
        title: 'Master Organizer',
        description: 'Completed 25 tasks in total',
        date: 'April 25, 2025',
        icon: <AchievementsIcon />,
      },
      {
        id: 3,
        title: 'Quantum Pilot',
        description: 'Reached level 7 with your mecha',
        date: 'April 20, 2025',
        icon: <GamesIcon />,
      },
    ],
    recentActivity: [
      {
        id: 1,
        action: 'Completed mission',
        target: 'Exercise for 30 minutes',
        time: '1 hour ago',
        icon: <HistoryIcon />,
      },
      {
        id: 2,
        action: 'Started operation',
        target: 'Neural Interface Algorithm',
        time: '2 days ago',
        icon: <HistoryIcon />,
      },
      {
        id: 3,
        action: 'Upgraded equipment',
        target: 'Beam Rifle Mk.II',
        time: '3 days ago',
        icon: <HistoryIcon />,
      },
    ],
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Stats definition
  const stats = [
    {
      id: 'command',
      title: 'Command',
      description: 'Ability to lead and direct operations',
      icon: <CommandIcon />,
      value: userStats.command,
      maxValue: 20,
      color: '#e91e63',
    },
    {
      id: 'insight',
      title: 'Insight',
      description: 'Problem-solving and analytical skills',
      icon: <InsightIcon />,
      value: userStats.insight,
      maxValue: 20,
      color: '#2196f3',
    },
    {
      id: 'endurance',
      title: 'Endurance',
      description: 'Physical and mental stamina',
      icon: <EnduranceIcon />,
      value: userStats.endurance,
      maxValue: 20,
      color: '#4caf50',
    },
    {
      id: 'resolve',
      title: 'Resolve',
      description: 'Determination and will to overcome obstacles',
      icon: <ResolveIcon />,
      value: userStats.resolve,
      maxValue: 20,
      color: '#ff9800',
    },
    {
      id: 'alliance',
      title: 'Alliance',
      description: 'Relationship building and team synergy',
      icon: <AllianceIcon />,
      value: userStats.alliance,
      maxValue: 20,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      {/* Profile Header with Banner */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 'shape.borderRadius.lg',
          overflow: 'hidden',
          bgcolor: 'background.card',
          position: 'relative',
          mb: 4,
        }}
      >
        {/* Banner Image */}
        <Box
          sx={{
            height: 200,
            width: '100%',
            position: 'relative',
            backgroundImage: `url(${profile.banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: 40,
              zIndex: 10,
            }}
          >
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid',
                borderColor: 'background.card',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            />
          </Box>
          
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              position: 'absolute',
              right: 16,
              bottom: 16,
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            Edit Profile
          </Button>
        </Box>

        {/* Profile Info */}
        <Box sx={{ p: 3, pt: 7 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4" color="text.primary" fontWeight={700}>
                {profile.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Callsign: {profile.callsign} | {profile.rank}
              </Typography>
              <Typography variant="body2" color="text.muted">
                Joined {profile.joinDate}
              </Typography>
            </Box>
            
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Mecha: {profile.mechaModel}
                </Typography>
                <Chip
                  label={`Level ${profile.level}`}
                  size="small"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              </Box>
              <Box sx={{ width: 200 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" color="text.muted">
                    XP to Level {profile.level + 1}
                  </Typography>
                  <Typography variant="caption" fontWeight={500} color="text.primary">
                    {profile.xp}/{profile.xpToNextLevel}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(profile.xp / profile.xpToNextLevel) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'background.tertiary',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #9c27b0, #e91e63)',
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 800 }}
          >
            {profile.bio}
          </Typography>
        </Box>

        {/* Profile Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ px: 3, borderBottom: 1, borderColor: 'border.main' }}
        >
          <Tab label="Stats" />
          <Tab label="Achievements" />
          <Tab label="Activity" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>
        {/* Stats Tab */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            {stats.map((stat) => (
              <Grid item xs={12} md={6} key={stat.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 'shape.borderRadius.lg',
                    bgcolor: 'background.card',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: `${stat.color}20`,
                      color: stat.color,
                      width: 60,
                      height: 60,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="h6" color="text.primary" fontWeight={600}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h6" color="text.primary" fontWeight={700}>
                        {stat.value}/{stat.maxValue}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      {stat.description}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(stat.value / stat.maxValue) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'background.tertiary',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: stat.color,
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Achievements Tab */}
        {tabValue === 1 && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 'shape.borderRadius.lg',
              bgcolor: 'background.card',
            }}
          >
            <Typography variant="h6" color="text.primary" fontWeight={600} sx={{ mb: 2 }}>
              Recent Achievements
            </Typography>
            <List>
              {profile.recentAchievements.map((achievement, index) => (
                <Box key={achievement.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: 0,
                    }}
                  >
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          bgcolor: 'background.tertiary',
                          color: 'gold',
                        }}
                      >
                        {achievement.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
                          {achievement.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {achievement.description}
                          </Typography>
                          <Typography variant="caption" color="text.muted">
                            Achieved on {achievement.date}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < profile.recentAchievements.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        )}

        {/* Activity Tab */}
        {tabValue === 2 && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 'shape.borderRadius.lg',
              bgcolor: 'background.card',
            }}
          >
            <Typography variant="h6" color="text.primary" fontWeight={600} sx={{ mb: 2 }}>
              Recent Activity
            </Typography>
            <List>
              {profile.recentActivity.map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: 0,
                    }}
                  >
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          bgcolor: 'background.tertiary',
                          color: 'primary.main',
                        }}
                      >
                        {activity.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
                          {activity.action}: <span style={{ color: '#e91e63' }}>{activity.target}</span>
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.muted">
                          {activity.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < profile.recentActivity.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        )}

        {/* Settings Tab */}
        {tabValue === 3 && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 'shape.borderRadius.lg',
              bgcolor: 'background.card',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Avatar
                sx={{
                  bgcolor: 'background.tertiary',
                  color: 'primary.main',
                }}
              >
                <SettingsIcon />
              </Avatar>
              <Typography variant="h6" color="text.primary" fontWeight={600}>
                Profile Settings
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 6 }}>
              Profile settings would be displayed here in the complete application.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Profile;