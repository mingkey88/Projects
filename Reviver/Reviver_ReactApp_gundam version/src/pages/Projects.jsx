import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';

const Projects = () => {
  // Sample project data
  const projects = [
    {
      id: 1,
      title: 'Defense System Upgrade',
      description: 'Upgrade the mecha defense modules with new quantum shielding technology',
      progress: 75,
      status: 'In Progress',
      priority: 'high',
      starred: true,
      dueDate: 'May 15, 2025',
      image: 'https://cdn.midjourney.com/b2e4ac51-e1a9-4685-82ab-814c52200db0/0_0.png',
      teamMembers: [
        { id: 1, name: 'Ming', avatar: 'https://cdn.midjourney.com/1b3319f4-e681-4002-9ac5-a39a2ccb0463/0_3.png' },
        { id: 2, name: 'Alex', avatar: 'https://cdn.midjourney.com/4a7ac64c-c7ce-47d4-a70c-721530d39ad4/0_3.png' },
        { id: 3, name: 'Sarah', avatar: 'https://cdn.midjourney.com/fc70ecb5-8f86-492b-bb51-b619ef422605/0_0.png' },
      ],
    },
    {
      id: 2,
      title: 'Mecha Pilot Training Program',
      description: 'Develop new training protocols for next generation mecha pilots',
      progress: 40,
      status: 'Planning',
      priority: 'medium',
      starred: false,
      dueDate: 'June 10, 2025',
      image: 'https://cdn.midjourney.com/fa7b59f0-2b81-4c47-b3a6-e4b3be35aa00/0_0.png',
      teamMembers: [
        { id: 1, name: 'Ming', avatar: 'https://cdn.midjourney.com/1b3319f4-e681-4002-9ac5-a39a2ccb0463/0_3.png' },
        { id: 4, name: 'Jasper', avatar: 'https://cdn.midjourney.com/8a10a321-51e6-4ec9-9ee2-11abdc6ba3dc/0_0.png' },
      ],
    },
    {
      id: 3,
      title: 'Neural Interface Algorithm',
      description: 'Optimize neural link algorithms for faster mecha response times',
      progress: 90,
      status: 'Review',
      priority: 'high',
      starred: true,
      dueDate: 'May 5, 2025',
      image: 'https://cdn.midjourney.com/1d0f7d4a-9547-43c7-bce5-e49587e41d2b/0_1.png',
      teamMembers: [
        { id: 3, name: 'Sarah', avatar: 'https://cdn.midjourney.com/fc70ecb5-8f86-492b-bb51-b619ef422605/0_0.png' },
        { id: 5, name: 'Kevin', avatar: 'https://cdn.midjourney.com/aefdd8e4-af93-4ab1-9d38-df42c509cf84/0_0.png' },
      ],
    },
    {
      id: 4,
      title: 'Supply Chain Optimization',
      description: 'Streamline resource acquisition for mecha parts production',
      progress: 60,
      status: 'In Progress',
      priority: 'medium',
      starred: false,
      dueDate: 'May 20, 2025',
      image: 'https://cdn.midjourney.com/a96e5747-8d60-4784-a6ce-702f23b502e0/0_2.png',
      teamMembers: [
        { id: 2, name: 'Alex', avatar: 'https://cdn.midjourney.com/4a7ac64c-c7ce-47d4-a70c-721530d39ad4/0_3.png' },
        { id: 4, name: 'Jasper', avatar: 'https://cdn.midjourney.com/8a10a321-51e6-4ec9-9ee2-11abdc6ba3dc/0_0.png' },
        { id: 5, name: 'Kevin', avatar: 'https://cdn.midjourney.com/aefdd8e4-af93-4ab1-9d38-df42c509cf84/0_0.png' },
      ],
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

  // Get color for status
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
          Operations
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
          New Operation
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Overview of all active operations. Monitor progress, update statuses, and coordinate team activities.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 'shape.borderRadius.lg',
                bgcolor: 'background.card',
                overflow: 'hidden',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme => theme.shadows[1],
                },
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardActionArea>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={project.image}
                    alt={project.title}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                      }}
                    >
                      {project.starred ? (
                        <StarIcon fontSize="small" sx={{ color: '#ffc107' }} />
                      ) : (
                        <StarBorderIcon fontSize="small" sx={{ color: 'white' }} />
                      )}
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                      }}
                    >
                      <MoreVertIcon fontSize="small" sx={{ color: 'white' }} />
                    </IconButton>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" component="div" fontWeight={600} color="text.primary">
                      {project.title}
                    </Typography>

                    <Chip
                      label={project.priority}
                      size="small"
                      color={getPriorityColor(project.priority)}
                      sx={{ height: 24, fontSize: '0.75rem' }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      height: '40px',
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.muted">
                        Progress
                      </Typography>
                      <Typography variant="caption" fontWeight={500} color="text.primary">
                        {project.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'background.tertiary',
                        '& .MuiLinearProgress-bar': {
                          background: `linear-gradient(90deg, #9c27b0 0%, #e91e63 100%)`,
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        bgcolor: `${getStatusColor(project.status)}20`,
                        color: getStatusColor(project.status),
                        fontWeight: 500,
                      }}
                    />

                    <Typography variant="caption" color="text.muted">
                      Due {project.dueDate}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>

              <Box sx={{ p: 2, pt: 0, borderTop: 1, borderColor: 'border.main', mt: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.muted">
                    Team
                  </Typography>
                  <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                    {project.teamMembers.map((member) => (
                      <Tooltip title={member.name} key={member.id}>
                        <Avatar alt={member.name} src={member.avatar} />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;