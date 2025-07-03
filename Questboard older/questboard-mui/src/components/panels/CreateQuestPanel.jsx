import { useState } from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Stack
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';

const CreateQuestPanel = ({ open, onClose, onSubmit }) => {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState(10);
  const [category, setCategory] = useState('work');
  const [deadline, setDeadline] = useState('');
  
  // Get today's date for min date attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim() && description.trim() && reward > 0) {
      onSubmit(title, description, reward, category, deadline);
      
      // Reset form
      setTitle('');
      setDescription('');
      setReward(10);
      setCategory('work');
      setDeadline('');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Create New Quest</Typography>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <TextField
            label="Quest Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Water the Office Plants"
            required
            variant="outlined"
          />
          
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details about the quest..."
            required
            variant="outlined"
          />
          
          <TextField
            label="Reward Points"
            type="number"
            fullWidth
            value={reward}
            onChange={(e) => setReward(parseInt(e.target.value, 10) || 0)}
            InputProps={{ inputProps: { min: 1 } }}
            required
            variant="outlined"
          />
          
          <FormControl fullWidth variant="outlined">
            <InputLabel id="quest-category-label">Category</InputLabel>
            <Select
              labelId="quest-category-label"
              id="quest-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              required
            >
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="community">Community</MenuItem>
              <MenuItem value="learning">Learning</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Deadline (Optional)"
            type="date"
            fullWidth
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
            variant="outlined"
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
          >
            Post Quest
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CreateQuestPanel;