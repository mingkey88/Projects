import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  LinearProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Divider,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Whatshot as HotstreakIcon,
  Psychology as MindsetIcon,
  BuildCircle as TalentIcon,
  PersonAdd as SocialIcon,
  Bolt as ChallengeIcon,
  CheckCircle as CompletedIcon,
  Lock as LockedIcon,
} from '@mui/icons-material';

const Achievements = () => {
  const [tabValue, setTabValue] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Achievement categories
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'recent', label: 'Recent' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'progression', label: 'Progression' },
    { id: 'combat', label: 'Combat' },
  ];

  // Achievement data
  const achievements = [
    {
      id: 1,
      title: '3-Day Streak',
      description: 'Complete tasks for 3 consecutive days',
      category: 'productivity',
      icon: <HotstreakIcon />,
      progress: 100,
      reward: '15 XP + Core Booster',
      completed: true,
      date: 'April 28, 2025',
      color: '#ff9800',
    },
    {
      id: 2,
      title: 'Master Organizer',
      description: 'Complete 25 tasks in total',
      category: 'productivity',
      icon: <MindsetIcon />,
      progress: 100,
      reward: '30 XP + Insight +2',
      completed: true,
      date: 'April 25, 2025',
      color: '#2196f3',
    },
    {
      id: 3,
      title: 'Quantum Pilot',
      description: 'Reach level 7 with your mecha',
      category: 'progression',
      icon: <TalentIcon />,
      progress: 100,
      reward: '50 XP + Beam Rifle Mk.II',
      completed: true,
      date: 'April 20, 2025',
      color: '#9c27b0',
    },
    {
      id: 4,
      title: 'Squad Pioneer',
      description: 'Complete 5 squad missions',
      category: 'social',
      icon: <SocialIcon />,
      progress: 80,
      reward: '40 XP + Alliance +2',
      completed: false,
      color: '#4caf50',
    },
    {
      id: 5,
      title: 'Neural Mastery',
      description: 'Complete the Neural Interface Algorithm project',
      category: 'progression',
      icon: <ChallengeIcon />,
      progress: 90,
      reward: '45 XP + Command +3',
      completed: false,
      color: '#e91e63',
    },
    {
      id: 6,
      title: 'Combat Veteran',
      description: 'Win 15 simulated combat scenarios',
      category: 'combat',
      icon: <TrophyIcon />,
      progress: 60,
      reward: '35 XP + Hyper Bazooka',
      completed: false,
      color: '#f44336',
    },
    {
      id: 7,
      title: 'Elite Tactician',
      description: 'Complete 10 high-priority missions without missing deadlines',
      category: 'productivity',
      icon: <MindsetIcon />,
      progress: 50,
      reward: '60 XP + Command +2, Resolve +2',
      completed: false,
      color: '#2196f3',
    },
    {
      id: 8,
      title: 'Legendary Dedication',
      description: 'Maintain a 30-day completion streak',
      category: 'productivity',
      icon: <HotstreakIcon />,
      progress: 10,
      reward: '100 XP + Legendary Equipment',
      completed: false,
      color: '#ff9800',
    },
  ];

  // Filter achievements based on the selected tab
  const getFilteredAchievements = () => {
    if (tabValue === 0) return achievements;
    if (tabValue === 1) return achievements.filter(a => a.completed);
    return achievements.filter(a => !a.completed);
  };

  const filteredAchievements = getFilteredAchievements();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Achievements
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" align="right" gutterBottom>
              Achievement Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(achievements.filter(a => a.completed).length / achievements.length) * 100}
                sx={{
                  width: 120,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'background.tertiary',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #9c27b0, #e91e63)',
                    borderRadius: 4,
                  },
                }}
              />
              <Typography variant="body2" color="text.primary" fontWeight={600}>
                {achievements.filter(a => a.completed).length}/{achievements.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Track your accomplishments, earn rewards, and showcase your skills as a mecha pilot.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 'shape.borderRadius.lg',
          bgcolor: 'background.card',
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Box sx={{ px: 3, pt: 2, borderBottom: 1, borderColor: 'border.main' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="All" />
            <Tab label="Completed" />
            <Tab label="In Progress" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.label}
                clickable
                variant={category.id === 'all' ? 'filled' : 'outlined'}
                color={category.id === 'all' ? 'primary' : 'default'}
                size="small"
                sx={{
                  height: 28,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>

          <Grid container spacing={3}>
            {filteredAchievements.map((achievement) => (
              <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 'shape.borderRadius.lg',
                    border: 1,
                    borderColor: 'border.main',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 2,
                      borderColor: achievement.color,
                    },
                  }}
                >
                  <CardActionArea>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: achievement.completed ? 'success.main' : 'background.tertiary',
                        color: achievement.completed ? 'white' : 'text.muted',
                      }}
                    >
                      {achievement.completed ? (
                        <CompletedIcon sx={{ fontSize: 16 }} />
                      ) : (
                        <LockedIcon sx={{ fontSize: 16 }} />
                      )}
                    </Box>

                    <CardContent sx={{ pt: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${achievement.color}20`,
                            color: achievement.color,
                          }}
                        >
                          {achievement.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
                            {achievement.title}
                          </Typography>
                          <Chip
                            label={achievement.category}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.625rem',
                              bgcolor: 'background.tertiary',
                              color: 'text.secondary',
                              textTransform: 'capitalize',
                            }}
                          />
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, height: 40 }}
                      >
                        {achievement.description}
                      </Typography>

                      {!achievement.completed && (
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mb: 0.5,
                            }}
                          >
                            <Typography variant="caption" color="text.muted">
                              Progress
                            </Typography>
                            <Typography variant="caption" fontWeight={500} color="text.primary">
                              {achievement.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={achievement.progress}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: 'background.tertiary',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: achievement.color,
                                borderRadius: 3,
                              },
                            }}
                          />
                        </Box>
                      )}

                      <Divider sx={{ mb: 2 }} />

                      <Box>
                        <Typography variant="caption" color="text.muted" gutterBottom>
                          Reward
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight={500}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          {achievement.reward}
                        </Typography>
                      </Box>

                      {achievement.completed && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.muted">
                            Achieved on {achievement.date}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 'shape.borderRadius.lg',
            bgcolor: 'background.card',
            backgroundImage: 'linear-gradient(135deg, rgba(233, 30, 99, 0.05), rgba(156, 39, 176, 0.05))',
            border: '1px solid',
            borderColor: 'primary.main',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 120,
              height: 120,
              background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(156, 39, 176, 0.1))',
              clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            }}
          />

          <Typography variant="h5" color="text.primary" fontWeight={700} gutterBottom>
            Achievement Challenges
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 800 }}>
            Special time-limited challenges with exclusive rewards. Complete them before they expire!
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #e91e63 0%, #9c27b0 100%)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
              },
            }}
          >
            View Challenges
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Achievements;