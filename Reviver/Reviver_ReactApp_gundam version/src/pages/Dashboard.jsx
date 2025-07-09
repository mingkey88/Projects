import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress, 
  Chip, 
  Button, 
  Avatar, 
  useTheme,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import { 
  Rocket as RocketIcon, 
  EmojiEvents as TrophyIcon, 
  DonutLarge as DonutLargeIcon, 
  BarChart as BarChartIcon,
  MoreHoriz as MoreHorizIcon,
  Star as StarIcon,
  Check as CheckIcon,
  ChevronRight as ChevronRightIcon,
  CalendarToday as CalendarIcon,
  FlashOn as FlashOnIcon,
  Add as AddIcon
} from '@mui/icons-material';
import NewTaskModal from '../components/tasks/NewTaskModal';

// Mock data for dashboard
const pilotStats = {
  level: 28,
  exp: 1450,
  maxExp: 2000,
  rank: "Lieutenant Commander",
  achievements: 76,
  completedMissions: 124,
  accuracy: 88,
  nextRank: "Commander",
  nextRankExp: 3000,
  pilotSkills: [
    { id: 1, name: "Reflexes", value: 76 },
    { id: 2, name: "Focus", value: 65 },
    { id: 3, name: "Endurance", value: 82 },
    { id: 4, name: "Strategy", value: 91 }
  ]
};

const activeMissions = [
  {
    id: 1,
    title: "Calibrate Neural Interface",
    priority: "high",
    difficulty: "medium",
    dueDate: "2025-05-02T21:00:00",
    progress: 75,
    category: "Tech",
    assignedBy: "Commander Lisa"
  },
  {
    id: 2,
    title: "Optimize Reactor Efficiency",
    priority: "medium",
    difficulty: "high",
    dueDate: "2025-05-05T18:00:00",
    progress: 30,
    category: "Engineering",
    assignedBy: "Commander Harris"
  },
  {
    id: 3,
    title: "Upload Combat Simulation Data",
    priority: "low",
    difficulty: "low",
    dueDate: "2025-05-01T14:00:00",
    progress: 10,
    category: "Combat",
    assignedBy: "Lt. Marcus"
  }
];

const recentAchievements = [
  {
    id: 1,
    title: "Perfect Synchronization",
    description: "Achieved 95% neural synchronization with your mecha",
    date: "2025-04-26T10:22:31",
    icon: <FlashOnIcon />
  },
  {
    id: 2,
    title: "Mission Maestro",
    description: "Completed 10 high-priority missions in one week",
    date: "2025-04-22T16:45:12",
    icon: <StarIcon />
  }
];

const upcomingMissions = [
  {
    id: 101,
    title: "Quantum Code Encryption Protocol",
    startDate: "2025-05-01T09:00:00",
    duration: "3 days",
    team: ["Johnson", "Ming Jie", "Kabira"],
    priority: "critical"
  },
  {
    id: 102,
    title: "Neural Network Recalibration",
    startDate: "2025-05-03T13:00:00",
    duration: "1 day",
    team: ["Ming Jie", "Vasquez"],
    priority: "high"
  }
];

// Priority colors
const getPriorityColor = (priority) => {
  switch(priority) {
    case 'critical': return 'error';
    case 'high': return 'error';
    case 'medium': return 'warning';
    case 'low': return 'info';
    default: return 'default';
  }
};

// Format date to relative time (today, tomorrow, or date)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + 
           ` at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
};

const Dashboard = () => {
  const theme = useTheme();
  const [timeRemaining, setTimeRemaining] = useState('');
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [missions, setMissions] = useState(activeMissions);

  // Update time remaining for closest deadline
  useEffect(() => {
    const updateTimeRemaining = () => {
      if (missions.length === 0) return '';
      
      // Sort by due date and get the closest one
      const sortedMissions = [...missions].sort((a, b) => 
        new Date(a.dueDate) - new Date(b.dueDate)
      );
      
      const closestDueDate = new Date(sortedMissions[0].dueDate);
      const now = new Date();
      const diff = closestDueDate - now;
      
      if (diff <= 0) {
        return 'Overdue';
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${minutes}m`;
      }
    };
    
    setTimeRemaining(updateTimeRemaining());
    
    const interval = setInterval(() => {
      setTimeRemaining(updateTimeRemaining());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [missions]);

  const handleCreateTask = (newTask) => {
    // Add the new task to the missions list
    setMissions([...missions, {
      id: newTask.id,
      title: newTask.title,
      priority: newTask.priority,
      difficulty: getDifficultyFromValue(newTask.difficulty),
      dueDate: newTask.dueDate.toISOString(),
      progress: 0,
      category: newTask.category,
      assignedBy: 'You'
    }]);
  };

  const getDifficultyFromValue = (value) => {
    if (value < 25) return 'low';
    if (value < 50) return 'medium';
    if (value < 75) return 'high';
    return 'extreme';
  };

  return (
    <Box sx={{ py: 2 }}>
      {/* Welcome header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" color="text.primary" gutterBottom>
          Welcome back, Ming Jie
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your mission deck is prepared. {missions.length} missions active, next deadline in <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>{timeRemaining}</Box>
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats & Progress */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{ 
              height: '100%',
              borderRadius: 'shape.borderRadius.lg',
              background: `linear-gradient(135deg, ${theme.palette.background.card} 0%, ${theme.palette.background.paper} 100%)`,
              border: 1,
              borderColor: 'border.main',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '40%',
                height: '100%',
                backgroundImage: `radial-gradient(circle at top right, ${theme.palette.primary.dark}22, transparent 70%)`,
                zIndex: 1,
                pointerEvents: 'none',
              }
            }}
          >
            <CardContent sx={{ height: '100%', position: 'relative', zIndex: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    Pilot Status
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      src="https://cdn.midjourney.com/1b3319f4-e681-4002-9ac5-a39a2ccb0463/0_3.png" 
                      alt="User Avatar"
                      sx={{ width: 48, height: 48, mr: 2, border: `2px solid ${theme.palette.primary.main}` }}
                    />
                    <Box>
                      <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                        {pilotStats.rank}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Level {pilotStats.level}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: 'background.cardHover',
                  borderRadius: 'shape.borderRadius.md',
                  p: 1.5,
                  minWidth: 80
                }}>
                  <RocketIcon color="primary" />
                  <Typography variant="h5" color="text.primary" sx={{ mt: 1, fontWeight: 700 }}>
                    {pilotStats.accuracy}%
                  </Typography>
                  <Typography variant="caption" color="text.muted">
                    Accuracy
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    EXP Progress
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'medium' }}>
                    {pilotStats.exp}/{pilotStats.maxExp}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(pilotStats.exp / pilotStats.maxExp) * 100}
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    mb: 3,
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(255,255,255,0.1)' 
                      : 'rgba(0,0,0,0.06)'
                  }}
                />
              </Box>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 'shape.borderRadius.md', 
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'border.main',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <DonutLargeIcon color="secondary" />
                    <Typography variant="h5" color="text.primary" sx={{ my: 1, fontWeight: 600 }}>
                      {pilotStats.completedMissions}
                    </Typography>
                    <Typography variant="caption" color="text.muted" align="center">
                      Missions Completed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 'shape.borderRadius.md', 
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'border.main',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <TrophyIcon sx={{ color: theme.palette.tertiary.main }} />
                    <Typography variant="h5" color="text.primary" sx={{ my: 1, fontWeight: 600 }}>
                      {pilotStats.achievements}
                    </Typography>
                    <Typography variant="caption" color="text.muted" align="center">
                      Achievements
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Pilot Skills
                </Typography>
                <Grid container spacing={2}>
                  {pilotStats.pilotSkills.map(skill => (
                    <Grid item xs={6} key={skill.id}>
                      <Box sx={{ mb: 0.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            {skill.name}
                          </Typography>
                          <Typography variant="caption" color="text.primary" sx={{ fontWeight: 'medium' }}>
                            {skill.value}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={skill.value}
                          sx={{ 
                            height: 4, 
                            borderRadius: 2,
                            bgcolor: theme.palette.mode === 'dark' 
                              ? 'rgba(255,255,255,0.1)' 
                              : 'rgba(0,0,0,0.06)'
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Missions */}
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 'shape.borderRadius.lg',
              border: 1,
              borderColor: 'border.main',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardContent sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" color="text.primary">
                  Current Missions
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  color="primary"
                  endIcon={<ChevronRightIcon />}
                >
                  View All
                </Button>
              </Box>

              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                {missions.map(mission => (
                  <Box 
                    key={mission.id}
                    sx={{
                      p: 2,
                      borderRadius: 'shape.borderRadius.md',
                      bgcolor: 'background.paper',
                      border: 1,
                      borderColor: 'border.main',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: 1
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box>
                        <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
                          {mission.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Assigned by {mission.assignedBy} • {mission.category}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={mission.priority} 
                          size="small" 
                          color={getPriorityColor(mission.priority)}
                          sx={{ textTransform: 'capitalize' }}
                        />
                        <Chip 
                          label={mission.difficulty} 
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Box sx={{ flexGrow: 1, mr: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="caption" color="text.primary" sx={{ fontWeight: 'medium' }}>
                            {mission.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={mission.progress}
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            background: theme.palette.mode === 'dark' 
                              ? 'rgba(255,255,255,0.1)' 
                              : 'rgba(0,0,0,0.06)'
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: 'text.secondary',
                        bgcolor: 'background.default',
                        p: 0.75,
                        px: 1.5,
                        borderRadius: 'shape.borderRadius.sm',
                        border: 1,
                        borderColor: 'border.main',
                      }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                        <Typography variant="caption">
                          {formatDate(mission.dueDate)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>

            <Box sx={{ mt: 'auto', px: 2, py: 2, borderTop: 1, borderColor: 'border.main' }}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => setTaskModalOpen(true)}
                sx={{ 
                  py: 1,
                  boxShadow: `0 4px 14px 0 ${theme.palette.primary.main}40`,
                }}
              >
                Start New Mission
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Recent Achievements */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 'shape.borderRadius.lg',
              border: 1,
              borderColor: 'border.main',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="text.primary">
                  Recent Achievements
                </Typography>
                <IconButton size="small">
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
              </Box>

              {recentAchievements.map((achievement, index) => (
                <Box key={achievement.id}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      py: 2,
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: 'shape.borderRadius.md', 
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {achievement.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                        {achievement.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {achievement.description}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.muted' }}>
                        {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </Typography>
                    </Box>
                  </Box>
                  {index < recentAchievements.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Missions */}
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 'shape.borderRadius.lg',
              border: 1,
              borderColor: 'border.main',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" color="text.primary">
                  Operation Schedule
                </Typography>
                <Button variant="text" size="small" endIcon={<ChevronRightIcon />}>
                  See Calendar
                </Button>
              </Box>

              <Grid container spacing={2}>
                {upcomingMissions.map(mission => (
                  <Grid item xs={12} sm={6} key={mission.id}>
                    <Box 
                      sx={{ 
                        p: 2,
                        borderRadius: 'shape.borderRadius.md',
                        bgcolor: 'background.paper',
                        border: 1,
                        borderColor: 'border.main',
                        height: '100%',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-2px)',
                          boxShadow: 1
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                        <Chip 
                          label={mission.priority} 
                          size="small" 
                          color={getPriorityColor(mission.priority)}
                          sx={{ textTransform: 'capitalize' }}
                        />
                        <Typography variant="caption" color="text.muted">
                          {mission.duration}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {mission.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, color: 'text.secondary' }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                        <Typography variant="caption">
                          {formatDate(mission.startDate)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                          Team:
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                          {mission.team.map((member, index) => (
                            <Avatar 
                              key={index}
                              alt={member}
                              sx={{ 
                                width: 30, 
                                height: 30,
                                fontSize: '0.75rem',
                                bgcolor: `${theme.palette.primary.main}${80 - index * 20}`,
                                ml: index > 0 ? -0.75 : 0,
                                border: 1,
                                borderColor: 'background.paper'
                              }}
                            >
                              {member.charAt(0)}
                            </Avatar>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* New Task Modal */}
      <NewTaskModal 
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </Box>
  );
};

export default Dashboard;
