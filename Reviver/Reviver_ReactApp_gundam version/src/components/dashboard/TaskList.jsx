import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Chip,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Fade,
  Badge,
  Divider,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Flag as FlagIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as RewardIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useTaskContext } from '../../contexts/TaskContext';
import { useNotification } from '../../contexts/NotificationContext';

const TaskList = () => {
  const { tasks, setTasks, currentFilter, updateUserStats } = useTaskContext();
  const { showNotification } = useNotification();
  const [localTasks, setLocalTasks] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  
  const openMenu = Boolean(menuAnchorEl);

  useEffect(() => {
    // Filter tasks based on currentFilter
    if (currentFilter === 'today') {
      setLocalTasks(tasks.filter(task => !task.completed && task.dueDate === 'Today'));
    } else if (currentFilter === 'upcoming') {
      setLocalTasks(tasks.filter(task => !task.completed && task.dueDate !== 'Today'));
    } else if (currentFilter === 'completed') {
      setLocalTasks(tasks.filter(task => task.completed));
    } else {
      setLocalTasks(tasks);
    }
  }, [tasks, currentFilter]);

  const handleMenuOpen = (event, taskId) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleToggleStar = (event, id) => {
    event.stopPropagation();
    const newTasks = tasks.map(task =>
      task.id.toString() === id.toString() ? { ...task, starred: !task.starred } : task
    );
    setTasks(newTasks);
    
    const starredTask = tasks.find(task => task.id.toString() === id.toString());
    if (starredTask) {
      showNotification(`Task ${starredTask.starred ? 'removed from' : 'added to'} starred`, 'info');
    }
  };

  const handleToggleComplete = (event, id) => {
    event.stopPropagation();
    const taskToUpdate = tasks.find(task => task.id.toString() === id.toString());
    const wasCompleted = taskToUpdate ? taskToUpdate.completed : false;
    
    const newTasks = tasks.map(task =>
      task.id.toString() === id.toString() ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    
    // Call the function to update user stats
    updateUserStats(id, !wasCompleted);
    
    // Show reward notification if task is being completed
    if (taskToUpdate && !wasCompleted && taskToUpdate.reward) {
      const rewardText = taskToUpdate.reward.xp 
        ? `+${taskToUpdate.reward.xp} XP` 
        : '';
      
      const itemText = taskToUpdate.reward.items && taskToUpdate.reward.items.length > 0
        ? ` and ${taskToUpdate.reward.items.join(', ')}`
        : '';
        
      showNotification(`Mission complete! Earned ${rewardText}${itemText}`, 'success');
    }
  };
  
  const handleTaskClick = (task) => {
    // Handle task click - could show a detailed view
    console.log('Task clicked:', task);
  };
  
  const handleDeleteTask = () => {
    if (selectedTaskId) {
      setTasks(tasks.filter(task => task.id.toString() !== selectedTaskId.toString()));
      showNotification('Mission deleted successfully', 'success');
      handleMenuClose();
    }
  };
  
  const handleEditTask = () => {
    console.log('Edit task:', selectedTaskId);
    showNotification('Edit feature coming soon', 'info');
    handleMenuClose();
  };
  
  const handleChangePriority = (priority) => {
    if (selectedTaskId) {
      setTasks(tasks.map(task => 
        task.id.toString() === selectedTaskId.toString() ? { ...task, priority } : task
      ));
      showNotification(`Priority changed to ${priority}`, 'success');
      handleMenuClose();
    }
  };

  // Render empty state if no tasks match the filter
  if (localTasks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          textAlign: 'center',
          backgroundColor: 'background.paper',
          borderRadius: 'shape.borderRadius.lg',
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: 'border.main',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 6,
          }}
        >
          <AssignmentIcon sx={{ fontSize: 60, color: 'text.muted', mb: 2, opacity: 0.7 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {currentFilter === 'today' 
              ? "No missions scheduled for today" 
              : currentFilter === 'upcoming' 
                ? "Your mission schedule is clear"
                : "No completed missions yet"}
          </Typography>
          <Typography variant="body2" color="text.muted" sx={{ maxWidth: 400, mb: 3 }}>
            {currentFilter === 'today'
              ? "Your mission list for today is empty. Add a new mission to get started."
              : currentFilter === 'upcoming'
                ? "You don't have any upcoming missions scheduled. Time to plan ahead!"
                : "Complete missions to see them listed here and earn rewards."}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <List sx={{ width: '100%', p: 0 }}>
        {localTasks.map((task) => (
          <ListItem
            key={task.id}
            disablePadding
            secondaryAction={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton edge="end" onClick={(e) => handleToggleStar(e, task.id)}>
                  {task.starred ? (
                    <StarIcon sx={{ color: '#ffc107' }} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
                <IconButton edge="end" onClick={(e) => handleMenuOpen(e, task.id)}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            }
            sx={{
              mb: 1.5,
              bgcolor: 'background.paper',
              borderRadius: 'shape.borderRadius.md',
              border: 1,
              borderColor: task.starred ? 'primary.main' : 'border.main',
              '&:hover': {
                boxShadow: 1,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <ListItemButton
              role={undefined}
              dense
              onClick={() => handleTaskClick(task)}
              sx={{
                py: 1.5,
                borderRadius: 'shape.borderRadius.md',
              }}
            >
              <ListItemIcon sx={{ minWidth: 42 }}>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onClick={(e) => handleToggleComplete(e, task.id)}
                  sx={{
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontWeight={600}
                        sx={{
                          mr: 1,
                          textDecoration: task.completed ? 'line-through' : 'none',
                          color: task.completed ? 'text.disabled' : 'text.primary',
                        }}
                      >
                        {task.title}
                      </Typography>
                      <Chip
                        label={task.priority}
                        size="small"
                        color={
                          task.priority === 'high'
                            ? 'error'
                            : task.priority === 'medium'
                            ? 'warning'
                            : 'success'
                        }
                        sx={{ height: 20, fontSize: '0.625rem', mr: 1 }}
                      />
                      
                      {task.reward && !task.completed && (
                        <Tooltip title={`Reward: ${task.reward.xp} XP${task.reward.items ? ` + ${task.reward.items.join(', ')}` : ''}`}>
                          <Chip
                            icon={<RewardIcon sx={{ fontSize: '0.875rem !important' }} />}
                            label={`${task.reward.xp} XP`}
                            size="small"
                            sx={{
                              height: 20, 
                              fontSize: '0.625rem',
                              bgcolor: 'primary.main',
                              color: 'white',
                            }}
                          />
                        </Tooltip>
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      color={task.completed ? 'text.disabled' : 'text.secondary'}
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.description}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Chip
                        label={`Due: ${task.dueDate}`}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          height: 20, 
                          fontSize: '0.625rem', 
                          mr: 1,
                          color: task.dueDate === 'Today' ? 'error.main' : 'text.primary',
                        }}
                      />
                      {task.tags && task.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.625rem',
                            mr: 1,
                            bgcolor: 'background.tertiary',
                          }}
                        />
                      ))}
                    </Box>
                    {task.associatedProject && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.muted" sx={{ mr: 1 }}>
                          Project:
                        </Typography>
                        <Chip
                          label={task.associatedProject.name}
                          size="small"
                          avatar={
                            <Avatar
                              alt={task.associatedProject.name}
                              src={task.associatedProject.image}
                              sx={{ width: 16, height: 16 }}
                            />
                          }
                          sx={{ height: 20, fontSize: '0.625rem' }}
                        />
                      </Box>
                    )}
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Context Menu */}
      <Menu
        id="task-menu"
        anchorEl={menuAnchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 2,
          sx: {
            minWidth: 180,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'border.main',
          }
        }}
      >
        <MenuItem onClick={handleEditTask} dense>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Task</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleChangePriority('high')}
          dense
          sx={{
            '& .MuiListItemIcon-root': {
              color: 'error.main'
            }
          }}
        >
          <ListItemIcon>
            <FlagIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set High Priority</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleChangePriority('medium')}
          dense
          sx={{
            '& .MuiListItemIcon-root': {
              color: 'warning.main'
            }
          }}
        >
          <ListItemIcon>
            <FlagIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set Medium Priority</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleChangePriority('low')}
          dense
          sx={{
            '& .MuiListItemIcon-root': {
              color: 'success.main'
            }
          }}
        >
          <ListItemIcon>
            <FlagIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set Low Priority</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleDeleteTask} dense sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Task</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TaskList;