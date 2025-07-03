import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  IconButton,
  CircularProgress,
  Divider,
  Chip,
  Grid,
  LinearProgress,
  alpha,
  Container,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { 
  Add as AddIcon, 
  FilterList as FilterIcon,
  BarChart as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircleOutline as CheckCircleIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  Timeline as TimelineIcon,
  AccessTime as ClockIcon,
} from '@mui/icons-material';
import { useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/dashboard/TaskList';
import NewTaskModal from '../components/tasks/NewTaskModal';
import { useTheme } from '@mui/material/styles';

const Tasks = () => {
  const theme = useTheme();
  const { currentFilter, setCurrentFilter, tasks } = useTaskContext();
  const [tabValue, setTabValue] = useState(currentFilter === 'today' ? 0 : currentFilter === 'upcoming' ? 1 : 2);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const todayTasks = tasks.filter(task => !task.completed && task.dueDate === 'Today').length;
  const upcomingTasks = tasks.filter(task => !task.completed && task.dueDate !== 'Today').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate next deadline
  const getNextDeadline = () => {
    const today = new Date();
    const todayStr = today.toDateString();
    const nonCompletedTasks = tasks.filter(task => !task.completed);
    
    if (nonCompletedTasks.length === 0) return null;
    
    // Try to find tasks due today first
    const todayTasks = nonCompletedTasks.filter(task => task.dueDate === 'Today');
    if (todayTasks.length > 0) return '2d 0h 40m';
    
    return '3d 12h 20m';
  };

  const nextDeadline = getNextDeadline();

  useEffect(() => {
    // Simulate loading tasks
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event, newValue) => {
    try {
      setTabValue(newValue);
      setCurrentFilter(newValue === 0 ? 'today' : newValue === 1 ? 'upcoming' : 'completed');
    } catch (error) {
      console.error("Error changing tabs:", error);
      setHasError(true);
    }
  };

  const handleOpenNewTaskModal = () => {
    setOpenNewTaskModal(true);
  };

  const handleCloseNewTaskModal = () => {
    setOpenNewTaskModal(false);
  };

  // Simplified error UI
  if (hasError) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Something went wrong
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Reload Page
        </Button>
      </Box>
    );
  }

  // Simplified loading indicator
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: '100%', 
      overflow: 'hidden',
      pb: 4,
    }}>
      {/* Welcome Section */}
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography 
          variant="h4" 
          fontWeight={700} 
          color="text.primary"
          sx={{ mb: 0.5 }}
        >
          Welcome back, Ming Jie
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 0.5
          }}
        >
          Your mission deck is prepared. {todayTasks + upcomingTasks} missions active, next deadline in 
          <Box 
            component="span" 
            sx={{ 
              color: 'error.main',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              ml: 0.5
            }}
          >
            <ClockIcon fontSize="small" sx={{ mr: 0.5 }} />
            {nextDeadline || '2d 0h 40m'}
          </Box>
        </Typography>
      </Box>

      {/* Status Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          {/* Pilot Status Card */}
          <Paper
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                background: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.15)}, transparent 70%)`,
                pointerEvents: 'none',
              }
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                fontWeight={600} 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  pb: 1
                }}
              >
                <DashboardIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                Pilot Status
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5, mt: 1.5 }}>
                <Box
                  component="img"
                  src="https://cdn.midjourney.com/1b3319f4-e681-4002-9ac5-a39a2ccb0463/0_3.png"
                  alt="Ming Jie"
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    mr: 2,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`,
                  }}
                />
                <Box>
                  <Typography variant="body1" fontWeight={600}>Lieutenant Commander</Typography>
                  <Typography variant="body2" color="text.secondary">Level 28</Typography>
                </Box>
                <Box sx={{ 
                  ml: 'auto', 
                  textAlign: 'center',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: 1,
                  px: 2,
                  py: 0.5
                }}>
                  <Typography variant="h6" fontWeight={700}>88%</Typography>
                  <Typography variant="caption" color="text.secondary">Accuracy</Typography>
                </Box>
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                EXP Progress
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={72.5} // 1450/2000
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'primary.main',
                        background: 'linear-gradient(90deg, #e91e63, #9c27b0)',
                      }
                    }}
                  />
                </Box>
                <Typography variant="body2" fontWeight={600}>1450/2000</Typography>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 3,
                  pt: 2,
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={700}>124</Typography>
                  <Typography variant="caption" color="text.secondary">Missions Completed</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={700}>76</Typography>
                  <Typography variant="caption" color="text.secondary">Achievements</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Pilot Skills
                </Typography>
                
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">Reflexes</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress
                          variant="determinate"
                          value={76}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            flexGrow: 1,
                            mr: 1,
                            bgcolor: alpha(theme.palette.error.main, 0.2),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'error.main',
                            }
                          }}
                        />
                        <Typography variant="body2" fontWeight={600}>76%</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">Focus</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress
                          variant="determinate"
                          value={85}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            flexGrow: 1,
                            mr: 1,
                            bgcolor: alpha(theme.palette.warning.main, 0.2),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'warning.main',
                            }
                          }}
                        />
                        <Typography variant="body2" fontWeight={600}>85%</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">Endurance</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress
                          variant="determinate"
                          value={82}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            flexGrow: 1,
                            mr: 1,
                            bgcolor: alpha(theme.palette.info.main, 0.2),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'info.main',
                            }
                          }}
                        />
                        <Typography variant="body2" fontWeight={600}>82%</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">Strategy</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress
                          variant="determinate"
                          value={91}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            flexGrow: 1,
                            mr: 1,
                            bgcolor: alpha(theme.palette.success.main, 0.2),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'success.main',
                            }
                          }}
                        />
                        <Typography variant="body2" fontWeight={600}>91%</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          {/* Current Missions */}
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              backdropFilter: 'blur(20px)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ 
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimelineIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Current Missions
                </Typography>
              </Box>
              
              <Button 
                variant="text"
                size="small"
                sx={{ 
                  color: 'primary.main',
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                }}
              >
                View All
              </Button>
            </Box>
            
            <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
              {/* Mission Item */}
              <Box sx={{ 
                mb: 2.5, 
                p: 2,
                borderRadius: 1,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight={600}>
                    Calibrate Neural Interface
                  </Typography>
                  <Chip 
                    label="High" 
                    size="small"
                    sx={{ 
                      bgcolor: alpha(theme.palette.error.main, 0.2),
                      color: theme.palette.error.main,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 1.5, fontSize: '0.875rem' }}
                >
                  Assigned by Commander Lisa • Tech
                </Typography>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Progress</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <LinearProgress
                      variant="determinate"
                      value={75}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        flexGrow: 1,
                        mr: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'primary.main',
                        }
                      }}
                    />
                    <Typography variant="body2" fontWeight={600}>75%</Typography>
                  </Box>
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 1,
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                  }}>
                    <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                    May 2 at 09:00 PM
                  </Box>
                </Box>
              </Box>
              
              {/* Mission Item */}
              <Box sx={{ 
                mb: 2.5, 
                p: 2,
                borderRadius: 1,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight={600}>
                    Optimize Reactor Efficiency
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label="Medium" 
                      size="small"
                      sx={{ 
                        bgcolor: alpha(theme.palette.warning.main, 0.2),
                        color: theme.palette.warning.main,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                    <Chip 
                      label="High" 
                      size="small"
                      sx={{ 
                        bgcolor: alpha(theme.palette.error.main, 0.2),
                        color: theme.palette.error.main,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 1.5, fontSize: '0.875rem' }}
                >
                  Assigned by Commander Harris • Engineering
                </Typography>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Progress</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <LinearProgress
                      variant="determinate"
                      value={30}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        flexGrow: 1,
                        mr: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'warning.main',
                        }
                      }}
                    />
                    <Typography variant="body2" fontWeight={600}>30%</Typography>
                  </Box>
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 1,
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                  }}>
                    <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                    May 5 at 06:00 PM
                  </Box>
                </Box>
              </Box>
              
              {/* Mission Item */}
              <Box sx={{ 
                mb: 0, 
                p: 2,
                borderRadius: 1,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight={600}>
                    Upload Combat Simulation Data
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label="Low" 
                      size="small"
                      sx={{ 
                        bgcolor: alpha(theme.palette.info.main, 0.2),
                        color: theme.palette.info.main,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                    <Chip 
                      label="Low" 
                      size="small"
                      sx={{ 
                        bgcolor: alpha(theme.palette.info.main, 0.2),
                        color: theme.palette.info.main,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 1.5, fontSize: '0.875rem' }}
                >
                  Assigned by Lt. Marcus • Combat
                </Typography>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Progress</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <LinearProgress
                      variant="determinate"
                      value={10}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        flexGrow: 1,
                        mr: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'info.main',
                        }
                      }}
                    />
                    <Typography variant="body2" fontWeight={600}>10%</Typography>
                  </Box>
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 1,
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                  }}>
                    <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                    May 1 at 02:00 PM
                  </Box>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ 
              p: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                fullWidth
                onClick={handleOpenNewTaskModal}
                sx={{
                  fontWeight: 600,
                  py: 1,
                  borderRadius: 'shape.borderRadius.md',
                  background: 'linear-gradient(45deg, #e91e63 30%, #9c27b0 90%)',
                  boxShadow: '0 3px 10px rgba(233, 30, 99, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 15px rgba(233, 30, 99, 0.4)',
                  },
                }}
              >
                Start New Mission
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Task List Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 'shape.borderRadius.lg',
          mb: 4,
          overflow: 'hidden',
          backgroundColor: alpha(theme.palette.background.paper, 0.6),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backdropFilter: 'blur(20px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            py: 1.5,
            borderBottom: 1,
            borderColor: alpha(theme.palette.divider, 0.1),
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                minWidth: { xs: 'auto', sm: 120 },
                fontWeight: 500,
                fontSize: '0.95rem',
                px: { xs: 1.5, sm: 2 },
                py: 1.5,
              },
              '& .Mui-selected': {
                fontWeight: 600,
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '2px 2px 0 0',
                backgroundColor: 'primary.main',
              }
            }}
          >
            <Tab icon={<NotificationsIcon fontSize="small" />} iconPosition="start" label="Today" />
            <Tab icon={<CalendarIcon fontSize="small" />} iconPosition="start" label="Upcoming" />
            <Tab icon={<CheckCircleIcon fontSize="small" />} iconPosition="start" label="Completed" />
          </Tabs>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterIcon fontSize="small" />}
              sx={{
                borderRadius: 'shape.borderRadius.sm',
                borderColor: alpha(theme.palette.divider, 0.3),
                color: 'text.secondary',
                px: 2,
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }
              }}
            >
              Filter
            </Button>
            <IconButton 
              size="small" 
              sx={{ 
                display: { xs: 'flex', sm: 'none' },
                color: 'text.secondary',
              }}
            >
              <FilterIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                textAlign: 'justify',
                fontSize: '0.95rem',
              }}
            >
              {tabValue === 0 
                ? "Today's missions that need your immediate attention. Complete these high-priority tasks to maintain optimal operational efficiency." 
                : tabValue === 1 
                  ? "Upcoming missions scheduled for future dates. Plan ahead and prepare necessary resources for these operations." 
                  : "Missions you've already completed. Review your past achievements and gather insights for future missions."}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                mt: 2,
              }}
            >
              <Typography 
                variant="h6" 
                color="text.primary" 
                fontWeight={600}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  position: 'relative',
                  pl: 1.5,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: 24,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                  }
                }}
              >
                {tabValue === 0 
                  ? "Today's Missions" 
                  : tabValue === 1 
                    ? "Future Operations" 
                    : "Completed Missions"}
              </Typography>
            </Box>
          </Box>

          <TaskList />
        </Box>
      </Paper>

      <NewTaskModal open={openNewTaskModal} onClose={handleCloseNewTaskModal} />
    </Box>
  );
};

export default Tasks;