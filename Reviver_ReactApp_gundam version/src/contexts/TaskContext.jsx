import { createContext, useContext, useState } from 'react';

// Create the context
const TaskContext = createContext();

// Custom hook to use the task context
export const useTaskContext = () => useContext(TaskContext);

// Provider component - export as default to match what App.jsx is importing
const TaskContextProvider = ({ children }) => {
  // Sample task data
  const initialTasks = [
    {
      id: 1,
      title: 'Complete mission briefing',
      description: 'Review the mission details and objectives for Operation Quantum Shield',
      completed: false,
      starred: true,
      dueDate: 'Today',
      priority: 'high',
      tags: ['briefing', 'mission'],
      reward: { xp: 15, items: ['Mission Badge'] },
      associatedProject: {
        id: 1,
        name: 'Defense System',
        image: 'https://cdn.midjourney.com/b2e4ac51-e1a9-4685-82ab-814c52200db0/0_0_32x32.png',
      },
    },
    {
      id: 2,
      title: 'Mecha maintenance check',
      description: 'Perform routine maintenance on your mecha unit before deployment',
      completed: false,
      starred: false,
      dueDate: 'Today',
      priority: 'medium',
      tags: ['maintenance', 'mecha'],
      reward: { xp: 10 },
    },
    {
      id: 3,
      title: 'Review team performance metrics',
      description: 'Analyze combat performance data from recent squad missions',
      completed: false,
      starred: false,
      dueDate: 'Tomorrow',
      priority: 'medium',
      tags: ['analysis', 'squad'],
      reward: { xp: 12 },
      associatedProject: {
        id: 3,
        name: 'Neural Interface',
        image: 'https://cdn.midjourney.com/1d0f7d4a-9547-43c7-bce5-e49587e41d2b/0_1_32x32.png',
      },
    },
    {
      id: 4,
      title: 'Tactical training session',
      description: 'Join virtual training simulation for advanced combat maneuvers',
      completed: false,
      starred: true,
      dueDate: 'May 2, 2025',
      priority: 'high',
      tags: ['training', 'combat'],
      reward: { xp: 20, items: ['Combat Badge', 'Skill Point'] },
    },
    {
      id: 5,
      title: 'Submit resource requisition form',
      description: 'Request additional quantum stabilizers for the defense system upgrade',
      completed: false,
      starred: false,
      dueDate: 'May 5, 2025',
      priority: 'low',
      tags: ['logistics'],
      reward: { xp: 5 },
      associatedProject: {
        id: 1,
        name: 'Defense System',
        image: 'https://cdn.midjourney.com/b2e4ac51-e1a9-4685-82ab-814c52200db0/0_0_32x32.png',
      },
    },
    {
      id: 6,
      title: 'Neural interface calibration',
      description: 'Fine-tune neural link parameters for optimal mecha response',
      completed: true,
      starred: false,
      dueDate: 'April 28, 2025',
      priority: 'high',
      tags: ['technical', 'neural-link'],
      reward: { xp: 18 },
      associatedProject: {
        id: 3,
        name: 'Neural Interface',
        image: 'https://cdn.midjourney.com/1d0f7d4a-9547-43c7-bce5-e49587e41d2b/0_1_32x32.png',
      },
    },
    {
      id: 7,
      title: 'Exercise for 30 minutes',
      description: 'Maintain physical fitness with daily workout routine',
      completed: true,
      starred: false,
      dueDate: 'April 28, 2025',
      priority: 'medium',
      tags: ['health', 'daily'],
      reward: { xp: 8 },
    },
  ];

  // State
  const [tasks, setTasks] = useState(initialTasks);
  const [currentFilter, setCurrentFilter] = useState('today');
  
  // User stats (for profile and other displays)
  const [userStats, setUserStats] = useState({
    command: 15,
    insight: 12,
    endurance: 10,
    resolve: 8,
    alliance: 9,
  });

  // Update user stats when tasks are completed
  const updateUserStats = (taskId, completed) => {
    if (completed) {
      // Find the task to calculate rewards
      const completedTask = tasks.find(task => task.id.toString() === taskId.toString());
      
      // Base stat increase
      const statUpdates = {
        resolve: Math.min(userStats.resolve + 1, 20),
      };
      
      // Additional rewards based on task properties
      if (completedTask && completedTask.reward) {
        // Example: Add 'command' points for high XP tasks
        if (completedTask.reward.xp >= 15) {
          statUpdates.command = Math.min(userStats.command + 1, 20);
        }
        
        // Example: Add 'insight' for specific task categories
        if (completedTask.tags && completedTask.tags.includes('analysis')) {
          statUpdates.insight = Math.min(userStats.insight + 1, 20);
        }
      }
      
      // Update stats
      setUserStats(prev => ({
        ...prev,
        ...statUpdates
      }));
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        currentFilter,
        setCurrentFilter,
        userStats,
        setUserStats,
        updateUserStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;