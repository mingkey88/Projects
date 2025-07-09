import { Box, Grid, Paper, Typography, LinearProgress } from '@mui/material';
import {
  Psychology as InsightIcon,
  FitnessCenter as EnduranceIcon,
  Gavel as CommandIcon,
  Whatshot as ResolveIcon,
  People as AllianceIcon,
} from '@mui/icons-material';

const PilotStats = ({ userStats }) => {
  // Define the stat cards with their icons and colors
  const statCards = [
    {
      id: 'command',
      title: 'Command',
      description: 'Ability to lead and direct operations',
      icon: <CommandIcon />,
      colorClass: 'command',
      value: userStats.command,
      maxValue: 20,
      color: '#e91e63',
      gradientStart: '#e91e63',
      gradientEnd: '#f06292',
    },
    {
      id: 'insight',
      title: 'Insight',
      description: 'Problem-solving and analytical skills',
      icon: <InsightIcon />,
      colorClass: 'insight',
      value: userStats.insight,
      maxValue: 20,
      color: '#2196f3',
      gradientStart: '#2196f3',
      gradientEnd: '#64b5f6',
    },
    {
      id: 'endurance',
      title: 'Endurance',
      description: 'Physical and mental stamina',
      icon: <EnduranceIcon />,
      colorClass: 'endurance',
      value: userStats.endurance,
      maxValue: 20,
      color: '#4caf50',
      gradientStart: '#4caf50',
      gradientEnd: '#81c784',
    },
    {
      id: 'resolve',
      title: 'Resolve',
      description: 'Determination and will to overcome obstacles',
      icon: <ResolveIcon />,
      colorClass: 'resolve',
      value: userStats.resolve,
      maxValue: 20,
      color: '#ff9800',
      gradientStart: '#ff9800',
      gradientEnd: '#ffb74d',
    },
    {
      id: 'alliance',
      title: 'Alliance',
      description: 'Relationship building and team synergy',
      icon: <AllianceIcon />,
      colorClass: 'alliance',
      value: userStats.alliance,
      maxValue: 20,
      color: '#9c27b0',
      gradientStart: '#9c27b0',
      gradientEnd: '#ba68c8',
    },
  ];

  return (
    <Grid container spacing={3}>
      {statCards.map((stat) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={stat.id}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'background.card',
              borderRadius: 'shape.borderRadius.lg',
              borderLeft: '4px solid',
              borderLeftColor: stat.color,
              transition: 'all 0.2s',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                backgroundColor: 'background.cardHover',
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                color: stat.color,
                backgroundColor: `${stat.color}10`,
              }}
            >
              {stat.icon}
            </Box>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight={600}
              sx={{ mb: 0.5 }}
            >
              {stat.title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              color="text.primary"
              sx={{ mb: 1.5 }}
            >
              {stat.value}
            </Typography>

            <Box sx={{ width: '100%', mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(stat.value / stat.maxValue) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'background.tertiary',
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${stat.gradientStart}, ${stat.gradientEnd})`,
                    borderRadius: 3,
                  },
                }}
              />
            </Box>

            <Typography
              variant="caption"
              color="text.muted"
              sx={{
                mt: 'auto',
                pt: 1,
                backgroundColor: `${stat.color}10`,
                color: stat.color,
                borderRadius: 1,
                px: 1,
                py: 0.5,
                display: 'inline-block',
                alignSelf: 'flex-start',
              }}
            >
              {stat.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PilotStats;