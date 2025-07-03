import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Button,
  Paper
} from '@mui/material';
import { Close as CloseIcon, Check as CheckIcon, Flag as FlagIcon } from '@mui/icons-material';

const QuestDetailsPanel = ({ open, quest, onClose, onAccept, onComplete }) => {
  // If no quest is selected, show a message
  if (!quest) {
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
          <Typography variant="h6">Quest Details</Typography>
          <IconButton onClick={onClose} size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography color="text.secondary">Select a quest to view details</Typography>
        </Box>
      </Drawer>
    );
  }

  // Format the deadline if it exists
  let deadlineText = 'None';
  if (quest.deadline) {
    const deadlineDate = new Date(quest.deadline);
    deadlineText = deadlineDate.toLocaleDateString();
  }

  // Create a category label
  const categoryLabel = {
    work: 'Work',
    personal: 'Personal',
    community: 'Community',
    learning: 'Learning',
    other: 'Other'
  }[quest.category || 'other'];

  // Create status configuration
  const statusConfig = {
    open: { label: 'Open', color: 'default' },
    progress: { label: 'In Progress', color: 'primary' },
    completed: { label: 'Completed', color: 'success' }
  }[quest.status];

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
        <Typography variant="h6">Quest Details</Typography>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>{quest.title}</Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Description
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
            <Typography variant="body2">{quest.description}</Typography>
          </Paper>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Category
          </Typography>
          <Typography variant="body1">{categoryLabel}</Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Reward
          </Typography>
          <Typography variant="body1">{quest.reward} Points</Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Status
          </Typography>
          <Chip 
            label={statusConfig.label} 
            color={statusConfig.color} 
            variant={quest.status === 'completed' ? 'filled' : 'outlined'}
            size="small"
          />
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Deadline
          </Typography>
          <Typography variant="body1">{deadlineText}</Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {quest.status === 'open' ? (
          <Button 
            fullWidth 
            variant="contained" 
            color="primary"
            startIcon={<CheckIcon />}
            onClick={() => onAccept(quest.id)}
          >
            Accept Quest
          </Button>
        ) : quest.status === 'progress' ? (
          <Button 
            fullWidth 
            variant="contained" 
            color="primary"
            startIcon={<FlagIcon />}
            onClick={() => onComplete(quest.id)}
          >
            Complete Quest
          </Button>
        ) : null}
      </Box>
    </Drawer>
  );
};

export default QuestDetailsPanel;