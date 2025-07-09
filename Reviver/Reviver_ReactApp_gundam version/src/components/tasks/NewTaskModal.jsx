import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  useTheme,
  Avatar,
  Divider,
  styled
} from '@mui/material';
import { 
  Close as CloseIcon,
  Add as AddIcon,
  AttachFile as AttachFileIcon,
  Flag as FlagIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTaskContext } from '../../contexts/TaskContext';
import { useNotification } from '../../contexts/NotificationContext';

// Demo data for squad members
const squadMembers = [
  { id: 1, name: 'Ming Jie', avatar: 'https://cdn.midjourney.com/1b3319f4-e681-4002-9ac5-a39a2ccb0463/0_3.png' },
  { id: 2, name: 'Kabira', avatar: 'https://cdn.midjourney.com/943726b8-a45c-4a11-9e47-bb5f3e48a431/0_0.png' },
  { id: 3, name: 'Johnson', avatar: 'https://cdn.midjourney.com/b32e0c7d-f1b3-4bd4-970c-300ce4d2d984/0_0.png' },
  { id: 4, name: 'Vasquez', avatar: 'https://cdn.midjourney.com/5a6c0a3d-bba9-43a1-9c5d-dfc21b3e2352/0_3.png' },
  { id: 5, name: 'Marcus', avatar: 'https://cdn.midjourney.com/cb2cb33a-70a5-4320-bc5b-f6e39b1589e1/0_0.png' },
];

// Categories for tasks
const taskCategories = [
  'Tech', 'Combat', 'Engineering', 'Intelligence', 'Logistics', 'Research'
];

// Styled component for priority selection
const PriorityButton = styled(Button)(({ theme, selected, priority }) => {
  const getPriorityColor = () => {
    if (!selected) return theme.palette.action.disabled;
    
    switch (priority) {
      case 'critical': return theme.palette.error.main;
      case 'high': return theme.palette.error.light;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.info.main;
      default: return theme.palette.primary.main;
    }
  };
  
  return {
    textTransform: 'capitalize',
    borderColor: selected ? getPriorityColor() : theme.palette.divider,
    color: selected ? getPriorityColor() : theme.palette.text.secondary,
    backgroundColor: selected ? `${getPriorityColor()}15` : 'transparent',
    '&:hover': {
      backgroundColor: selected ? `${getPriorityColor()}25` : theme.palette.action.hover,
      borderColor: selected ? getPriorityColor() : theme.palette.divider,
    },
  };
});

const NewTaskModal = ({ open, onClose }) => {
  const theme = useTheme();
  const { tasks, setTasks } = useTaskContext();
  const { showNotification } = useNotification();
  
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    difficulty: 50,
    dueDate: null,
    assignees: [],
  });
  
  const handleChange = (field) => (event) => {
    setTaskData({ ...taskData, [field]: event.target.value });
  };
  
  const handleDateChange = (newDate) => {
    setTaskData({ ...taskData, dueDate: newDate });
  };
  
  const handlePriorityChange = (priority) => {
    setTaskData({ ...taskData, priority });
  };
  
  const handleDifficultyChange = (event, newValue) => {
    setTaskData({ ...taskData, difficulty: newValue });
  };
  
  const toggleAssignee = (memberId) => {
    const currentAssignees = [...taskData.assignees];
    const index = currentAssignees.indexOf(memberId);
    
    if (index === -1) {
      currentAssignees.push(memberId);
    } else {
      currentAssignees.splice(index, 1);
    }
    
    setTaskData({ ...taskData, assignees: currentAssignees });
  };
  
  const getDifficultyLabel = () => {
    if (taskData.difficulty < 25) return 'Easy';
    if (taskData.difficulty < 50) return 'Moderate';
    if (taskData.difficulty < 75) return 'Challenging';
    return 'Extreme';
  };
  
  const handleSubmit = () => {
    // Format the date to be "Today" or a specific date string
    const today = new Date();
    let formattedDueDate = 'Today';
    
    if (taskData.dueDate) {
      // If not today, format it as a string
      if (taskData.dueDate.toDateString() !== today.toDateString()) {
        formattedDueDate = taskData.dueDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        });
      }
    }
    
    // Calculate XP reward based on difficulty
    const xpReward = Math.floor(taskData.difficulty * 2.5);
    
    // Assemble the final task data
    const newTask = {
      id: Date.now().toString(), // Temporary ID, would come from server in real app
      title: taskData.title,
      description: taskData.description || 'No description provided',
      completed: false,
      starred: false,
      dueDate: formattedDueDate,
      priority: taskData.priority === 'critical' ? 'high' : taskData.priority,
      tags: [taskData.category],
      reward: {
        xp: xpReward,
        items: []
      }
    };
    
    // Add the new task to the list
    setTasks([newTask, ...tasks]);
    
    // Show success notification
    showNotification('New mission created successfully', 'success');
    
    // Close the modal
    onClose();
    
    // Reset form
    setTaskData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      difficulty: 50,
      dueDate: null,
      assignees: [],
    });
  };
  
  const isFormValid = () => {
    return taskData.title.trim() !== '' && 
           taskData.category !== '';
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 'shape.borderRadius.lg',
          bgcolor: 'background.default',
          backgroundImage: `radial-gradient(ellipse at top right, ${theme.palette.primary.main}10, transparent 70%)`,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'border.main',
        p: 3,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AssignmentIcon sx={{ mr: 1.5, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            Create New Mission
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose}
          aria-label="close"
          size="small"
          sx={{ 
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.card' } 
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Mission Title"
              fullWidth
              variant="outlined"
              value={taskData.title}
              onChange={handleChange('title')}
              placeholder="Enter the mission name"
              InputProps={{
                sx: { 
                  borderRadius: 'shape.borderRadius.md',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Mission Briefing"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={taskData.description}
              onChange={handleChange('description')}
              placeholder="Describe mission objectives and key details"
              InputProps={{
                sx: { borderRadius: 'shape.borderRadius.md' }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={taskData.category}
                onChange={handleChange('category')}
                label="Category"
                sx={{ borderRadius: 'shape.borderRadius.md' }}
              >
                {taskCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due Date"
                value={taskData.dueDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    sx: { borderRadius: 'shape.borderRadius.md' }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              gutterBottom
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 1.5,
                '& svg': { mr: 1, opacity: 0.7 } 
              }}
            >
              <FlagIcon fontSize="small" /> Priority Level
            </Typography>
            <Stack direction="row" spacing={1}>
              {['low', 'medium', 'high', 'critical'].map((priority) => (
                <PriorityButton
                  key={priority}
                  variant="outlined"
                  size="small"
                  priority={priority}
                  selected={taskData.priority === priority}
                  onClick={() => handlePriorityChange(priority)}
                >
                  {priority}
                </PriorityButton>
              ))}
            </Stack>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ mb: 1 }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                Difficulty: <Box component="span" sx={{ fontWeight: 500, ml: 0.5, color: 'text.primary' }}>{getDifficultyLabel()}</Box>
              </Typography>
            </Box>
            <Slider
              value={taskData.difficulty}
              onChange={handleDifficultyChange}
              valueLabelDisplay="auto"
              min={10}
              max={100}
              sx={{
                '& .MuiSlider-track': {
                  background: `linear-gradient(to right, ${theme.palette.info.main}, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
                },
                '& .MuiSlider-thumb': {
                  width: 20,
                  height: 20,
                  '&:before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                  }
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              gutterBottom
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mt: 2,
                mb: 2,
                '& svg': { mr: 1, opacity: 0.7 } 
              }}
            >
              <PersonIcon fontSize="small" /> Assign Squad Members
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {squadMembers.map((member) => {
                const isSelected = taskData.assignees.includes(member.id);
                
                return (
                  <Box
                    key={member.id}
                    onClick={() => toggleAssignee(member.id)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 1,
                      width: 80,
                      borderRadius: 'shape.borderRadius.md',
                      border: 1,
                      borderColor: isSelected ? 'primary.main' : 'border.main',
                      bgcolor: isSelected ? 'primary.main' + '15' : 'background.paper',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{
                        width: 48,
                        height: 48,
                        mb: 1,
                        border: isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
                      }}
                    />
                    <Typography
                      variant="caption"
                      align="center"
                      sx={{
                        color: isSelected ? 'primary.main' : 'text.primary',
                        fontWeight: isSelected ? 500 : 400,
                      }}
                    >
                      {member.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ 
              mt: 1,
              p: 2,
              borderRadius: 'shape.borderRadius.md',
              bgcolor: 'background.paper',
              border: '1px dashed',
              borderColor: 'border.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'background.card',
              }
            }}>
              <AttachFileIcon sx={{ mr: 1, color: 'primary.light' }} />
              <Typography variant="body2" color="text.secondary">
                Attach files or references (optional)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ 
        px: 3, 
        py: 2,
        borderTop: 1,
        borderColor: 'border.main',
      }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ borderRadius: 'shape.borderRadius.sm' }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={!isFormValid()}
          startIcon={<AddIcon />}
          sx={{ 
            borderRadius: 'shape.borderRadius.sm',
            px: 3,
            boxShadow: `0 4px 14px 0 ${theme.palette.primary.main}40`,
          }}
        >
          Create Mission
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTaskModal;