import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Divider
} from '@mui/material';
import { Close as CloseIcon, FilterList as FilterListIcon, RestartAlt as ResetIcon } from '@mui/icons-material';

const FilterPanel = ({ open, filters, onApply, onReset, onClose }) => {
  const [status, setStatus] = useState(filters.status);
  const [category, setCategory] = useState(filters.category);
  const [sortBy, setSortBy] = useState(filters.sortBy);
  
  const handleApply = () => {
    onApply({
      status,
      category,
      sortBy
    });
  };
  
  const handleReset = () => {
    setStatus('all');
    setCategory('all');
    setSortBy('newest');
    onReset();
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
        <Typography variant="h6">Filter & Sort</Typography>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="filter-status-label">Status</InputLabel>
            <Select
              labelId="filter-status-label"
              id="filter-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth variant="outlined">
            <InputLabel id="filter-category-label">Category</InputLabel>
            <Select
              labelId="filter-category-label"
              id="filter-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="community">Community</MenuItem>
              <MenuItem value="learning">Learning</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth variant="outlined">
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="reward-high">Highest Reward</MenuItem>
              <MenuItem value="reward-low">Lowest Reward</MenuItem>
              <MenuItem value="deadline">Upcoming Deadline</MenuItem>
            </Select>
          </FormControl>
          
          <Divider sx={{ my: 1 }} />
          
          <Stack direction="row" spacing={2}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary"
              startIcon={<FilterListIcon />}
              onClick={handleApply}
            >
              Apply Filters
            </Button>
            <Button 
              fullWidth 
              variant="outlined"
              startIcon={<ResetIcon />}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default FilterPanel;