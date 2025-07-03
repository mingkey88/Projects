import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Grid,
} from '@mui/material';
import { useTaskContext } from '../../contexts/TaskContext';
import { useNotification } from '../../contexts/NotificationContext';

const FeaturedMission = ({ onStartMeditation }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { setUserStats } = useTaskContext();

  const handleMeditationStart = () => {
    setIsProcessing(true);
    
    // Simulate meditation process
    setTimeout(() => {
      // Update user stats for meditation (increase insight and endurance)
      setUserStats(prev => ({
        ...prev,
        insight: prev.insight + 2,
        endurance: prev.endurance + 2
      }));
      
      setIsProcessing(false);
      
      // Trigger notification
      if (onStartMeditation) {
        onStartMeditation();
      }
    }, 1500);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        backgroundColor: 'background.card',
        borderRadius: theme => theme.shape.borderRadius.lg,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: theme => theme.shape.borderRadius.lg,
          zIndex: -1,
          background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.05), rgba(156, 39, 176, 0.05))',
        },
        animation: 'pulseGlow 3s infinite ease-in-out',
        '@keyframes pulseGlow': {
          '0%': {
            boxShadow: '0 0 5px rgba(233, 30, 99, 0.1), 0 0 15px rgba(156, 39, 176, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 15px rgba(233, 30, 99, 0.3), 0 0 30px rgba(156, 39, 176, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 5px rgba(233, 30, 99, 0.1), 0 0 15px rgba(156, 39, 176, 0.1)',
          },
        },
      }}
    >
      {/* Priority Badge */}
      <Chip 
        label="Today's Priority" 
        color="primary"
        size="small"
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          fontWeight: 600,
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 3, md: 4 },
          p: 4,
          pt: 6, // Extra padding to account for the badge
        }}
      >
        {/* Mission Information */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" color="text.primary" fontWeight={700} mb={2}>
            AI Daily Mission: Meditation Practice
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 3 }}>
            Your AI assistant has analyzed your schedule for April 29, 2025. Today's recommended priority: 15 minutes of meditation to enhance focus and mental clarity.
          </Typography>

          {/* Rewards Section */}
          <Box mb={3}>
            <Typography variant="h6" color="text.primary" mb={1}>
              Completion Rewards:
            </Typography>
            
            <Box display="flex" gap={1.5}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'background.tertiary',
                  p: 1,
                  px: 1.5,
                  borderRadius: 'shape.borderRadius.md',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    bgcolor: 'background.cardHover',
                  }
                }}
              >
                <Typography variant="h6" component="span">🧠</Typography>
                <Typography variant="body2" fontWeight={500} color="text.primary">
                  +2 Insight
                </Typography>
              </Paper>
              
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'background.tertiary',
                  p: 1,
                  px: 1.5,
                  borderRadius: 'shape.borderRadius.md',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    bgcolor: 'background.cardHover',
                  }
                }}
              >
                <Typography variant="h6" component="span">💪</Typography>
                <Typography variant="body2" fontWeight={500} color="text.primary">
                  +2 Endurance
                </Typography>
              </Paper>
            </Box>
          </Box>

          {/* Deadlines Section */}
          <Box mb={3}>
            <Typography variant="h6" color="text.primary" mb={1}>
              High Priority Deadlines:
            </Typography>
            
            <Box display="flex" flexDirection="column" gap={1}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: 'background.tertiary',
                  p: 1.5,
                  borderRadius: 'shape.borderRadius.md',
                  '&:hover': {
                    bgcolor: 'background.cardHover',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: 'error.main',
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Team meeting presentation (Apr 30, 2:00 PM)
                </Typography>
              </Paper>
              
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: 'background.tertiary',
                  p: 1.5,
                  borderRadius: 'shape.borderRadius.md',
                  '&:hover': {
                    bgcolor: 'background.cardHover',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: 'error.main',
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Project milestone review (Apr 30, 9:00 AM)
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={isProcessing}
            onClick={handleMeditationStart}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #e91e63 0%, #9c27b0 100%)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
              },
              transition: 'all 0.3s',
            }}
          >
            {isProcessing ? 'Processing...' : 'Start Meditation Session'}
          </Button>
        </Box>

        {/* Featured Image */}
        <Box
          sx={{
            flex: { xs: 'auto', md: 1 },
            maxWidth: { xs: '100%', md: 500 },
            borderRadius: 'shape.borderRadius.md',
            overflow: 'hidden',
            border: '4px solid rgba(76, 175, 80, 0.6)',
            boxShadow: '0 0 20px rgba(76, 175, 80, 0.3)',
          }}
        >
          <img
            src="https://cdn.midjourney.com/88f040f8-73c7-46f8-b731-8e99eabbbac8/0_0.png"
            alt="Meditation visualization"
            style={{ 
              width: '100%', 
              display: 'block',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              }
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default FeaturedMission;