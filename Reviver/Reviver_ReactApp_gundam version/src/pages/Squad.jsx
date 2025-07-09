import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Tabs,
  Tab,
  AvatarGroup,
  Badge,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Message as MessageIcon,
  MoreVert as MoreVertIcon,
  EmojiEvents as TrophyIcon,
  Diversity3 as TeamIcon,
  Analytics as AnalyticsIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
  FormatListBulleted as MissionIcon,
  Psychology as InsightIcon,
  FitnessCenter as EnduranceIcon,
  Gavel as CommandIcon,
  Whatshot as ResolveIcon,
  People as AllianceIcon,
} from '@mui/icons-material';
import { useTaskContext } from '../contexts/TaskContext';
import { useNotification } from '../contexts/NotificationContext';

const Squad = () => {
  const { showNotification } = useNotification();
  const [tabValue, setTabValue] = useState(0);
  const [selectedMemberId, setSelectedMemberId] = useState(1); // Default to the user's profile

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Squad members data
  const squadMembers = [
    {
      id: 1,
      name: 'Ming Jie',
      callsign: 'Spectrum',
      role: 'Squad Leader',
      specialization: 'Tactical Operations',
      level: 7,
      online: true,
      avatar: 'https://cdn.midjourney.com/1b3319f4-e681-4002-9ac5-a39a2ccb0463/0_3.png',
      stats: {
        command: 15,
        endurance: 10,
        resolve: 8,
        insight: 12,
        alliance: 9,
      },
    },
    {
      id: 2,
      name: 'Alex Johnson',
      callsign: 'Phantom',
      role: 'Assault Specialist',
      specialization: 'Close Combat',
      level: 6,
      online: true,
      avatar: 'https://cdn.midjourney.com/4a7ac64c-c7ce-47d4-a70c-721530d39ad4/0_3.png',
      stats: {
        command: 8,
        insight: 12,
        endurance: 14,
        resolve: 13,
        alliance: 11,
      },
    },
    {
      id: 3,
      name: 'Sarah Chen',
      callsign: 'Oracle',
      role: 'Tech Specialist',
      specialization: 'Systems Hacking',
      level: 8,
      online: false,
      avatar: 'https://cdn.midjourney.com/fc70ecb5-8f86-492b-bb51-b619ef422605/0_0.png',
      stats: {
        command: 7,
        insight: 17,
        endurance: 9,
        resolve: 11,
        alliance: 14,
      },
    },
    {
      id: 4,
      name: 'Jasper Rodriguez',
      callsign: 'Vortex',
      role: 'Support Specialist',
      specialization: 'Defense Systems',
      level: 5,
      online: false,
      avatar: 'https://cdn.midjourney.com/8a10a321-51e6-4ec9-9ee2-11abdc6ba3dc/0_0.png',
      stats: {
        command: 9,
        insight: 8,
        endurance: 12,
        resolve: 10,
        alliance: 15,
      },
    },
  ];

  // Squad missions data
  const squadMissions = [
    {
      id: 1,
      title: 'Nexus Defense Initiative',
      description: 'Coordinate with team members to strengthen base defenses against potential threats.',
      progress: 65,
      dueDate: 'May 10, 2025',
      priority: 'high',
      members: [1, 2, 4],
      rewards: {
        xp: 500,
        items: ['Advanced Shield Generator', 'Team Synergy Booster'],
      },
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Neural Network Optimization',
      description: 'Improve mecha response times through team neural link calibration.',
      progress: 40,
      dueDate: 'May 18, 2025',
      priority: 'medium',
      members: [1, 3],
      rewards: {
        xp: 350,
        items: ['Neural Enhancement Module'],
      },
      status: 'Planning',
    },
    {
      id: 3,
      title: 'Joint Combat Training',
      description: 'Participate in simulated combat scenarios to improve team coordination.',
      progress: 90,
      dueDate: 'May 3, 2025',
      priority: 'medium',
      members: [1, 2, 3, 4],
      rewards: {
        xp: 400,
        items: ['Combat Efficiency Badge', 'Team Maneuver Protocol'],
      },
      status: 'Review',
    },
  ];

  // Squad analytics data
  const squadAnalytics = {
    missionsCompleted: 12,
    successRate: 87,
    averageCompletionTime: '4.2 days',
    totalXpEarned: 3750,
    synergyStat: 72,
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning':
        return '#673ab7'; // purple
      case 'In Progress':
        return '#2196f3'; // blue
      case 'Review':
        return '#ff9800'; // orange
      case 'Completed':
        return '#4caf50'; // green
      default:
        return '#9e9e9e'; // grey
    }
  };

  const handleJoinMission = (missionId) => {
    showNotification('Mission joined successfully', 'success');
  };

  const getStatColor = (statName) => {
    switch (statName) {
      case 'command':
        return '#e91e63';
      case 'insight':
        return '#2196f3';
      case 'endurance':
        return '#4caf50';
      case 'resolve':
        return '#ff9800';
      case 'alliance':
        return '#9c27b0';
      default:
        return '#9e9e9e';
    }
  };

  const getStatIcon = (statName) => {
    switch (statName) {
      case 'command':
        return <CommandIcon sx={{ fontSize: '0.875rem' }} />;
      case 'insight':
        return <InsightIcon sx={{ fontSize: '0.875rem' }} />;
      case 'endurance':
        return <EnduranceIcon sx={{ fontSize: '0.875rem' }} />;
      case 'resolve':
        return <ResolveIcon sx={{ fontSize: '0.875rem' }} />;
      case 'alliance':
        return <AllianceIcon sx={{ fontSize: '0.875rem' }} />;
      default:
        return null;
    }
  };

  const getMemberById = (id) => {
    return squadMembers.find(member => member.id === id) || null;
  };

  const selectedMember = getMemberById(selectedMemberId);

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
          Squad Operations
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            fontWeight: 600,
            px: 2,
            background: 'linear-gradient(90deg, #e91e63 0%, #9c27b0 100%)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
            },
          }}
        >
          Form New Squad
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Coordinate with your squad members, manage joint missions, and track your team's performance metrics.
        </Typography>
      </Box>

      {/* Tabs for different squad sections */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 'shape.borderRadius.lg',
          bgcolor: 'background.card',
          mb: 3,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'border.main' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              px: 2,
              pt: 1,
              '& .MuiTab-root': {
                minWidth: 100,
              },
            }}
          >
            <Tab 
              icon={<TeamIcon />} 
              iconPosition="start" 
              label="Squad Members" 
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              icon={<MissionIcon />} 
              iconPosition="start" 
              label="Joint Missions" 
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              icon={<AnalyticsIcon />} 
              iconPosition="start" 
              label="Squad Analytics" 
              sx={{ textTransform: 'none' }}
            />
          </Tabs>
        </Box>

        {/* Squad Members Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                {/* Squad Member List */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 'shape.borderRadius.md',
                    border: '1px solid',
                    borderColor: 'border.main',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ 
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'border.main',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Typography variant="h6" fontWeight={600}>
                      Team Roster
                    </Typography>
                    <Badge badgeContent={squadMembers.filter(m => m.online).length} color="success">
                      <Chip label={`${squadMembers.length} Members`} size="small" />
                    </Badge>
                  </Box>
                  <List sx={{ py: 0 }}>
                    {squadMembers.map((member) => (
                      <ListItem
                        key={member.id}
                        button
                        selected={selectedMemberId === member.id}
                        onClick={() => setSelectedMemberId(member.id)}
                        sx={{
                          borderBottom: '1px solid',
                          borderColor: 'border.main',
                          py: 1.5,
                          '&.Mui-selected': {
                            bgcolor: 'background.cardHover',
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            color={member.online ? 'success' : 'default'}
                          >
                            <Avatar 
                              src={member.avatar} 
                              alt={member.name}
                              sx={{ 
                                width: 45, 
                                height: 45,
                                border: selectedMemberId === member.id ? '2px solid' : 'none',
                                borderColor: 'primary.main',
                              }}
                            />
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight={600} color="text.primary">
                              {member.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography variant="caption" color="text.secondary">
                                {member.callsign}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chip
                                  label={`Lvl ${member.level}`}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{ height: 18, fontSize: '0.7rem', mr: 1 }}
                                />
                                <Typography variant="caption" color="text.muted">
                                  {member.role}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                        <ArrowForwardIcon 
                          fontSize="small" 
                          color="action" 
                          sx={{ 
                            opacity: 0.5,
                            visibility: selectedMemberId === member.id ? 'visible' : 'hidden',
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8}>
                {/* Selected Squad Member Details */}
                {selectedMember && (
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 'shape.borderRadius.md',
                      border: '1px solid',
                      borderColor: 'border.main',
                      p: 3,
                    }}
                  >
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Avatar
                        src={selectedMember.avatar}
                        alt={selectedMember.name}
                        sx={{ width: 90, height: 90, mr: 3 }}
                      />

                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="h5" fontWeight={700} color="text.primary">
                            {selectedMember.name}
                          </Typography>
                          <Badge
                            color={selectedMember.online ? 'success' : 'default'}
                            variant="dot"
                            sx={{ '& .MuiBadge-badge': { boxShadow: '0 0 0 2px #2a2438' } }}
                          >
                            <Chip
                              label={selectedMember.online ? 'Online' : 'Offline'}
                              size="small"
                              color={selectedMember.online ? 'success' : 'default'}
                              variant="outlined"
                              sx={{ height: 24 }}
                            />
                          </Badge>
                        </Box>

                        <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                          "{selectedMember.callsign}"
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          <Chip 
                            label={`Level ${selectedMember.level}`} 
                            size="small" 
                            color="primary"
                            sx={{ height: 24 }}
                          />
                          <Chip 
                            label={selectedMember.role} 
                            size="small" 
                            sx={{ height: 24 }}
                          />
                          <Chip 
                            icon={<PersonIcon sx={{ fontSize: '0.875rem !important' }} />}
                            label={selectedMember.specialization} 
                            size="small" 
                            variant="outlined"
                            sx={{ height: 24 }}
                          />
                        </Box>
                      </Box>

                      {selectedMember.id !== 1 && (
                        <Box sx={{ ml: 'auto' }}>
                          <IconButton color="primary" size="small">
                            <MessageIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
                      Pilot Statistics
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {Object.entries(selectedMember.stats).map(([statName, value]) => (
                        <Grid item xs={12} sm={6} key={statName}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: `${getStatColor(statName)}20`,
                                color: getStatColor(statName),
                                mr: 1,
                              }}
                            >
                              {getStatIcon(statName)}
                            </Box>
                            <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                              {statName}
                            </Typography>
                            <Typography variant="body2" fontWeight={700} sx={{ ml: 'auto' }}>
                              {value}/20
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(value / 20) * 100}
                            sx={{
                              height: 8,
                              borderRadius: 1,
                              bgcolor: 'background.tertiary',
                              mb: 1,
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 1,
                                backgroundColor: getStatColor(statName),
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
                      Active Joint Missions
                    </Typography>

                    <Grid container spacing={2}>
                      {squadMissions
                        .filter(mission => mission.members.includes(selectedMember.id))
                        .map(mission => (
                          <Grid item xs={12} sm={6} key={mission.id}>
                            <Card elevation={0} sx={{ 
                              bgcolor: 'background.default',
                              border: '1px solid',
                              borderColor: 'border.main',
                              borderRadius: 'shape.borderRadius.md',
                              '&:hover': {
                                boxShadow: 1,
                                borderColor: 'primary.main',
                              },
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                            }}>
                              <CardContent sx={{ p: 2, pb: 0 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                  <Typography variant="subtitle1" fontWeight={600}>
                                    {mission.title}
                                  </Typography>
                                  <Chip
                                    label={mission.status}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: '0.625rem',
                                      bgcolor: `${getStatusColor(mission.status)}20`,
                                      color: getStatusColor(mission.status),
                                    }}
                                  />
                                </Box>
                                
                                <Typography variant="caption" color="text.muted" component="div" sx={{ mb: 1 }}>
                                  Due: {mission.dueDate}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                    Progress:
                                  </Typography>
                                  <Typography variant="caption" fontWeight={600} sx={{ mr: 1 }}>
                                    {mission.progress}%
                                  </Typography>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={mission.progress} 
                                    sx={{ 
                                      flexGrow: 1, 
                                      height: 4, 
                                      borderRadius: 2,
                                      bgcolor: 'background.tertiary',
                                    }} 
                                  />
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                    Squad:
                                  </Typography>
                                  <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 20, height: 20, fontSize: '0.625rem' } }}>
                                    {mission.members.map(memberId => {
                                      const member = getMemberById(memberId);
                                      return member ? (
                                        <Tooltip title={member.name} key={memberId}>
                                          <Avatar alt={member.name} src={member.avatar} />
                                        </Tooltip>
                                      ) : null;
                                    })}
                                  </AvatarGroup>
                                </Box>
                              </CardContent>
                              <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
                                <Chip
                                  icon={<TrophyIcon sx={{ fontSize: '0.75rem !important' }} />}
                                  label={`${mission.rewards.xp} XP`}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: '0.625rem',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                  }}
                                />
                              </CardActions>
                            </Card>
                          </Grid>
                        ))}
                    </Grid>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Joint Missions Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Active Squad Missions
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddIcon />}
              >
                New Mission
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              {squadMissions.map((mission) => (
                <Grid item xs={12} md={6} lg={4} key={mission.id}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 'shape.borderRadius.md',
                      border: '1px solid',
                      borderColor: 'border.main',
                      '&:hover': {
                        boxShadow: 1,
                        borderColor: 'primary.main',
                      },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardContent sx={{ p: 3, pb: 1, flexGrow: 1 }}>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h6" fontWeight={600} gutterBottom>
                            {mission.title}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Chip
                              label={mission.priority}
                              size="small"
                              color={getPriorityColor(mission.priority)}
                              sx={{ height: 24 }}
                            />
                            <Chip
                              label={mission.status}
                              size="small"
                              sx={{
                                height: 24,
                                bgcolor: `${getStatusColor(mission.status)}20`,
                                color: getStatusColor(mission.status),
                              }}
                            />
                          </Box>
                        </Box>
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {mission.description}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="text.muted">
                            Progress
                          </Typography>
                          <Typography variant="caption" fontWeight={500} color="text.primary">
                            {mission.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={mission.progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'background.tertiary',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              background: `linear-gradient(90deg, #9c27b0 0%, #e91e63 100%)`,
                            },
                          }}
                        />
                      </Box>

                      <Typography variant="caption" color="text.muted" component="div" gutterBottom>
                        Due: {mission.dueDate}
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.muted" component="div" gutterBottom>
                          Squad Members:
                        </Typography>
                        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                          {mission.members.map(memberId => {
                            const member = getMemberById(memberId);
                            return member ? (
                              <Tooltip title={member.name} key={memberId}>
                                <Avatar alt={member.name} src={member.avatar} />
                              </Tooltip>
                            ) : null;
                          })}
                        </AvatarGroup>
                      </Box>
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Tooltip 
                          title={`Rewards: ${mission.rewards.xp} XP ${mission.rewards.items ? '+ ' + mission.rewards.items.join(', ') : ''}`}
                        >
                          <Chip
                            icon={<TrophyIcon sx={{ fontSize: '0.875rem !important' }} />}
                            label={`${mission.rewards.xp} XP`}
                            size="small"
                            color="primary"
                            sx={{ height: 24 }}
                          />
                        </Tooltip>
                      </Box>
                      
                      {!mission.members.includes(1) && (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          onClick={() => handleJoinMission(mission.id)}
                        >
                          Join Mission
                        </Button>
                      )}
                      
                      {mission.members.includes(1) && (
                        <Button 
                          size="small" 
                          color="success" 
                          variant="outlined" 
                          startIcon={<CheckCircleIcon />}
                          sx={{ pointerEvents: 'none' }}
                        >
                          Joined
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Squad Analytics Tab */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
              Squad Performance Metrics
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={2.4}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 'shape.borderRadius.md',
                    border: '1px solid',
                    borderColor: 'border.main',
                    p: 2,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.muted" textTransform="uppercase" letterSpacing={0.5}>
                    Missions Completed
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ my: 1 }}>
                    {squadAnalytics.missionsCompleted}
                  </Typography>
                  <Chip
                    label="+3 this month"
                    size="small"
                    color="success"
                    sx={{ alignSelf: 'center' }}
                  />
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 'shape.borderRadius.md',
                    border: '1px solid',
                    borderColor: 'border.main',
                    p: 2,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.muted" textTransform="uppercase" letterSpacing={0.5}>
                    Success Rate
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ my: 1 }}>
                    {squadAnalytics.successRate}%
                  </Typography>
                  <Chip
                    label="+5% from last month"
                    size="small"
                    color="success"
                    sx={{ alignSelf: 'center' }}
                  />
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 'shape.borderRadius.md',
                    border: '1px solid',
                    borderColor: 'border.main',
                    p: 2,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.muted" textTransform="uppercase" letterSpacing={0.5}>
                    Avg. Completion Time
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ my: 1 }}>
                    {squadAnalytics.averageCompletionTime}
                  </Typography>
                  <Chip
                    label="-0.8 days improvement"
                    size="small"
                    color="success"
                    sx={{ alignSelf: 'center' }}
                  />
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 'shape.borderRadius.md',
                    border: '1px solid',
                    borderColor: 'border.main',
                    p: 2,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.muted" textTransform="uppercase" letterSpacing={0.5}>
                    Total XP Earned
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ my: 1 }}>
                    {squadAnalytics.totalXpEarned}
                  </Typography>
                  <Chip
                    label="+750 this month"
                    size="small"
                    color="success"
                    sx={{ alignSelf: 'center' }}
                  />
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 'shape.borderRadius.md',
                    border: '1px solid',
                    borderColor: 'border.main',
                    p: 2,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.muted" textTransform="uppercase" letterSpacing={0.5}>
                    Team Synergy
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ my: 1 }}>
                    {squadAnalytics.synergyStat}/100
                  </Typography>
                  <Chip
                    label="+8 points increase"
                    size="small"
                    color="success"
                    sx={{ alignSelf: 'center' }}
                  />
                </Paper>
              </Grid>
            </Grid>
            
            <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
              Squad Stat Distribution
            </Typography>
            
            <Paper
              elevation={0}
              sx={{
                borderRadius: 'shape.borderRadius.md',
                border: '1px solid',
                borderColor: 'border.main',
                p: 3,
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, flexWrap: 'wrap' }}>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['command', 'insight', 'endurance', 'resolve', 'alliance'].map(stat => (
                    <Chip
                      key={stat}
                      icon={getStatIcon(stat)}
                      label={stat.charAt(0).toUpperCase() + stat.slice(1)}
                      sx={{
                        bgcolor: `${getStatColor(stat)}20`,
                        color: getStatColor(stat),
                        fontWeight: 600,
                        m: 0.5,
                      }}
                    />
                  ))}
                </Stack>
              </Box>
              
              {/* Squad stats by member */}
              <Box>
                {squadMembers.map(member => (
                  <Box key={member.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar 
                        src={member.avatar} 
                        alt={member.name}
                        sx={{ width: 28, height: 28, mr: 1 }}
                      />
                      <Typography variant="body2" fontWeight={600}>
                        {member.name}
                      </Typography>
                      <Typography variant="caption" color="text.muted" sx={{ ml: 1 }}>
                        {member.callsign}
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                      {Object.entries(member.stats).map(([statName, value]) => (
                        <Grid item xs={12} sm={6} md={2.4} key={`${member.id}-${statName}`}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Box
                              component="span"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: `${getStatColor(statName)}20`,
                                color: getStatColor(statName),
                                mr: 0.5,
                                fontSize: '0.625rem',
                              }}
                            >
                              {getStatIcon(statName)}
                            </Box>
                            <Typography variant="caption" sx={{ fontSize: '0.625rem', textTransform: 'capitalize' }}>
                              {statName}
                            </Typography>
                            <Typography variant="caption" fontWeight={600} sx={{ ml: 'auto' }}>
                              {value}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(value / 20) * 100}
                            sx={{
                              height: 4,
                              borderRadius: 1,
                              bgcolor: 'background.tertiary',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 1,
                                backgroundColor: getStatColor(statName),
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Paper>
            
            <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
              Recent Joint Activity
            </Typography>
            
            <Paper
              elevation={0}
              sx={{
                borderRadius: 'shape.borderRadius.md',
                border: '1px solid',
                borderColor: 'border.main',
                p: 3,
              }}
            >
              <List sx={{ p: 0 }}>
                {[
                  { 
                    id: 1, 
                    avatar: 'https://cdn.midjourney.com/4a7ac64c-c7ce-47d4-a70c-721530d39ad4/0_3.png',
                    name: 'Alex Johnson',
                    action: 'completed a joint mission',
                    target: 'Defense Module Installation',
                    time: '2 hours ago',
                    xp: 150
                  },
                  { 
                    id: 2, 
                    avatar: 'https://cdn.midjourney.com/fc70ecb5-8f86-492b-bb51-b619ef422605/0_0.png',
                    name: 'Sarah Chen',
                    action: 'updated progress on',
                    target: 'Neural Network Optimization',
                    time: 'yesterday',
                    xp: 75
                  },
                  { 
                    id: 3, 
                    avatar: 'https://cdn.midjourney.com/1b3319f4-e681-4002-9ac5-a39a2ccb0463/0_3.png',
                    name: 'Ming Jie',
                    action: 'joined the squad mission',
                    target: 'Joint Combat Training',
                    time: '2 days ago',
                    xp: 50
                  },
                ].map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <ListItemAvatar>
                        <Avatar src={activity.avatar} alt={activity.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box component="span">
                            <Typography component="span" fontWeight={600}>
                              {activity.name}
                            </Typography>{' '}
                            <Typography component="span" color="text.secondary">
                              {activity.action}{' '}
                            </Typography>
                            <Typography component="span" fontWeight={500} color="primary">
                              {activity.target}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" color="text.muted">
                            {activity.time}
                          </Typography>
                        }
                      />
                      <Chip
                        icon={<TrophyIcon sx={{ fontSize: '0.75rem !important' }} />}
                        label={`+${activity.xp} XP`}
                        size="small"
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </ListItem>
                    {index < 2 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Squad;