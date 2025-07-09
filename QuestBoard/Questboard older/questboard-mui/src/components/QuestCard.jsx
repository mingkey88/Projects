import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Work, Person, People, School, Casino } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 120,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[50],
}));

const QuestCard = ({ quest, onClick }) => {
  // Map category to icon
  const categoryIcons = {
    work: <Work fontSize="large" color="primary" />,
    personal: <Person fontSize="large" color="primary" />,
    community: <People fontSize="large" color="primary" />,
    learning: <School fontSize="large" color="primary" />,
    other: <Casino fontSize="large" color="primary" />
  };

  const icon = categoryIcons[quest.category] || categoryIcons.other;
  
  // Create a category label
  const categoryLabel = {
    work: 'Work',
    personal: 'Personal',
    community: 'Community',
    learning: 'Learning',
    other: 'Other'
  }[quest.category || 'other'];

  // Create a status label and color
  const statusConfig = {
    open: { label: 'Open', color: 'default' },
    progress: { label: 'In Progress', color: 'primary' },
    completed: { label: 'Completed', color: 'success' }
  }[quest.status];

  return (
    <StyledCard onClick={onClick} sx={{ opacity: quest.status === 'completed' ? 0.75 : 1 }}>
      <StyledCardMedia>
        {icon}
      </StyledCardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {quest.title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={categoryLabel} 
            size="small"
            sx={{ 
              bgcolor: quest.category === 'work' ? 'info.light' :
                      quest.category === 'personal' ? 'secondary.light' :
                      quest.category === 'community' ? 'success.light' :
                      quest.category === 'learning' ? 'warning.light' : 'grey.400',
              color: 'white'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {quest.reward} Points
          </Typography>
          <Chip 
            label={statusConfig.label}
            size="small"
            color={statusConfig.color}
            variant="outlined"
          />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default QuestCard;