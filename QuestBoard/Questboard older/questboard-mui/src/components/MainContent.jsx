import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Grid, Paper, Chip, styled } from '@mui/material';
import QuestCard from './QuestCard';
import Header from './Header';

const CategoryChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

const MainContent = ({ 
  activeTab, 
  setActiveTab, 
  activeQuests, 
  completedQuests, 
  onQuestClick, 
  activeFilters, 
  selectCategory, 
  onFilterClick 
}) => {
  // Map of tab values
  const tabValues = {
    active: 0,
    completed: 1
  };
  
  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue === 0 ? 'active' : 'completed');
  };

  // Category chips configuration
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'work', label: 'Work' },
    { id: 'personal', label: 'Personal' },
    { id: 'community', label: 'Community' },
    { id: 'learning', label: 'Learning' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
      {/* Header with search and user controls */}
      <Header onFilterClick={onFilterClick} />

      {/* Category chips */}
      <CategoryChipsContainer>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            onClick={() => selectCategory(category.id)}
            color={activeFilters.category === category.id ? 'primary' : 'default'}
            variant={activeFilters.category === category.id ? 'filled' : 'outlined'}
          />
        ))}
      </CategoryChipsContainer>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValues[activeTab]} 
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Active Quests" />
          <Tab label="Completed Quests" />
        </Tabs>
      </Paper>

      {/* Active quests section */}
      <Box sx={{ display: activeTab === 'active' ? 'block' : 'none' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Available Quests
        </Typography>
        <Grid container spacing={3}>
          {activeQuests.length > 0 ? (
            activeQuests.map(quest => (
              <Grid item key={quest.id} xs={12} sm={6} md={4}>
                <QuestCard quest={quest} onClick={() => onQuestClick(quest.id)} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" color="textSecondary" sx={{ py: 4 }}>
                No active quests match your filters
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      
      {/* Completed quests section */}
      <Box sx={{ display: activeTab === 'completed' ? 'block' : 'none' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Completed Quests
        </Typography>
        <Grid container spacing={3}>
          {completedQuests.length > 0 ? (
            completedQuests.map(quest => (
              <Grid item key={quest.id} xs={12} sm={6} md={4}>
                <QuestCard quest={quest} onClick={() => onQuestClick(quest.id)} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" color="textSecondary" sx={{ py: 4 }}>
                No completed quests yet
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default MainContent;