import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CreateQuestPanel from './components/panels/CreateQuestPanel';
import QuestDetailsPanel from './components/panels/QuestDetailsPanel';
import FilterPanel from './components/panels/FilterPanel';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7367F0',
      light: '#A59AFF',
      dark: '#5046CC',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#10B981',
      light: '#3FC79A',
      dark: '#0B815A',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#1A1E2C',
      paper: '#252B3C'
    },
    text: {
      primary: '#E6E8ED',
      secondary: '#A1A9BB',
      disabled: '#6B7280'
    },
    error: {
      main: '#F44336'
    },
    warning: {
      main: '#FFB020'
    },
    info: {
      main: '#42A5F5'
    },
    success: {
      main: '#26A69A'
    },
    divider: '#34384C'
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    // ...default values for the rest
  ]
});

function App() {
  // State management
  const [quests, setQuests] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [nextQuestId, setNextQuestId] = useState(1);
  const [activePanel, setActivePanel] = useState(null);
  const [selectedQuestId, setSelectedQuestId] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    category: 'all',
    sortBy: 'newest'
  });

  // Load saved state from localStorage
  useEffect(() => {
    const savedQuests = localStorage.getItem('questBoardQuests');
    const savedPoints = localStorage.getItem('questBoardUserPoints');
    const savedNextId = localStorage.getItem('questBoardNextId');

    if (savedQuests) {
      setQuests(JSON.parse(savedQuests));
    } else {
      // Add sample quests if none exist
      setTimeout(addSampleQuests, 500);
    }
    
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints, 10));
    }
    
    if (savedNextId) {
      setNextQuestId(parseInt(savedNextId, 10));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('questBoardQuests', JSON.stringify(quests));
    localStorage.setItem('questBoardUserPoints', userPoints.toString());
    localStorage.setItem('questBoardNextId', nextQuestId.toString());
  }, [quests, userPoints, nextQuestId]);

  // Add a new quest
  const addQuest = (title, description, reward, category, deadline) => {
    const newQuest = {
      id: nextQuestId,
      title,
      description,
      reward: parseInt(reward, 10),
      category,
      deadline,
      status: 'open',
      createdAt: new Date().toISOString(),
      assignee: null,
    };
    
    setQuests([...quests, newQuest]);
    setNextQuestId(nextQuestId + 1);
    setActivePanel(null); // Close the create panel
  };

  // Accept a quest
  const acceptQuest = (questId) => {
    setQuests(quests.map(quest => 
      quest.id === questId 
        ? { ...quest, status: 'progress' } 
        : quest
    ));
  };

  // Complete a quest
  const completeQuest = (questId) => {
    const questToComplete = quests.find(q => q.id === questId);
    
    if (questToComplete && questToComplete.status === 'progress') {
      setQuests(quests.map(quest => 
        quest.id === questId 
          ? { ...quest, status: 'completed' } 
          : quest
      ));
      
      setUserPoints(userPoints + questToComplete.reward);
      setActiveTab('completed');
    }
  };

  // Sample quests for demo
  const addSampleQuests = () => {
    if (quests.length === 0) {
      const sampleQuests = [
        {
          id: 1,
          title: "Complete quarterly report",
          description: "Analyze data from the past quarter and prepare a comprehensive report for the executive team. Include sales figures, customer acquisition costs, and growth metrics.",
          reward: 75,
          category: "work",
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
          status: "open",
          createdAt: new Date().toISOString(),
          assignee: null,
        },
        {
          id: 2,
          title: "Organize home office",
          description: "Declutter and reorganize home workspace for better productivity. Sort paperwork, cable management, and optimize desk layout.",
          reward: 30,
          category: "personal",
          deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
          status: "open",
          createdAt: new Date().toISOString(),
          assignee: null,
        },
        {
          id: 3,
          title: "Volunteer at local food bank",
          description: "Spend 4 hours at the neighborhood food bank helping to sort donations and prepare food packages for distribution to families in need.",
          reward: 80,
          category: "community",
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
          status: "open",
          createdAt: new Date().toISOString(),
          assignee: null,
        },
        {
          id: 4,
          title: "Complete React & Material UI course",
          description: "Finish the advanced online course on React and Material UI. Complete all exercises and build the final project to solidify knowledge.",
          reward: 60,
          category: "learning",
          deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks from now
          status: "open",
          createdAt: new Date().toISOString(),
          assignee: null,
        },
        {
          id: 5,
          title: "Gaming tournament preparation",
          description: "Prepare for the upcoming esports tournament. Practice key strategies, review past performances, and coordinate with team members.",
          reward: 45,
          category: "other",
          deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
          status: "open",
          createdAt: new Date().toISOString(),
          assignee: null,
        }
      ];
      
      setQuests(sampleQuests);
      setNextQuestId(6);
    }
  };

  // Show/hide panels
  const showPanel = (panel, questId = null) => {
    setActivePanel(panel);
    if (questId !== null) {
      setSelectedQuestId(questId);
    }
  };

  const hideAllPanels = () => {
    setActivePanel(null);
  };

  // Apply filters
  const applyFilters = (newFilters) => {
    setActiveFilters(newFilters);
    hideAllPanels();
  };

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      status: 'all',
      category: 'all',
      sortBy: 'newest'
    });
  };

  // Select a specific category
  const selectCategory = (category) => {
    setActiveFilters({
      ...activeFilters,
      category: category === 'all' ? 'all' : category
    });
  };

  // Filter and sort quests
  const filterAndSortQuests = () => {
    // First, filter the quests
    let filteredQuests = quests.filter(quest => {
      // Filter by status
      if (activeFilters.status !== 'all' && quest.status !== activeFilters.status) {
        return false;
      }
      
      // Filter by category
      if (activeFilters.category !== 'all' && quest.category !== activeFilters.category) {
        return false;
      }
      
      return true;
    });
    
    // Then sort the filtered quests
    return filteredQuests.sort((a, b) => {
      switch (activeFilters.sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'reward-high':
          return b.reward - a.reward;
        case 'reward-low':
          return a.reward - b.reward;
        case 'deadline':
          // Sort by deadline, null values at the end
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        default:
          return 0;
      }
    });
  };

  // Split quests into active and completed for displaying
  const sortedQuests = filterAndSortQuests();
  const activeQuests = sortedQuests.filter(quest => quest.status !== 'completed');
  const completedQuests = sortedQuests.filter(quest => quest.status === 'completed');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar
          userPoints={userPoints}
          onCreateQuest={() => showPanel('create')}
        />
        
        <MainContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeQuests={activeQuests}
          completedQuests={completedQuests}
          onQuestClick={(questId) => showPanel('details', questId)}
          activeFilters={activeFilters}
          selectCategory={selectCategory}
          onFilterClick={() => showPanel('filter')}
        />
        
        <CreateQuestPanel
          open={activePanel === 'create'}
          onClose={hideAllPanels}
          onSubmit={addQuest}
        />
        
        <QuestDetailsPanel
          open={activePanel === 'details'}
          quest={quests.find(q => q.id === selectedQuestId)}
          onClose={hideAllPanels}
          onAccept={acceptQuest}
          onComplete={completeQuest}
        />
        
        <FilterPanel
          open={activePanel === 'filter'}
          filters={activeFilters}
          onApply={applyFilters}
          onReset={resetFilters}
          onClose={hideAllPanels}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
