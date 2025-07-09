import { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faScroll, faHome, faCompass, faBook, faPlusCircle, faAward,
  faSearch, faFilter, faBriefcase, faUser, faUsers, faBookOpen, faDiceD20,
  faCheck, faFlagCheckered, faTimes
} from '@fortawesome/free-solid-svg-icons'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import CreateQuestPanel from './components/panels/CreateQuestPanel'
import QuestDetailsPanel from './components/panels/QuestDetailsPanel'
import FilterPanel from './components/panels/FilterPanel'
import './App.css'

// Add Font Awesome icons to library
library.add(
  faScroll, faHome, faCompass, faBook, faPlusCircle, faAward,
  faSearch, faFilter, faBriefcase, faUser, faUsers, faBookOpen, faDiceD20,
  faCheck, faFlagCheckered, faTimes
)

function App() {
  // State management
  const [quests, setQuests] = useState([])
  const [userPoints, setUserPoints] = useState(0)
  const [nextQuestId, setNextQuestId] = useState(1)
  const [activePanel, setActivePanel] = useState(null)
  const [selectedQuestId, setSelectedQuestId] = useState(null)
  const [activeTab, setActiveTab] = useState('active')
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    category: 'all',
    sortBy: 'newest'
  })

  // Load saved state from localStorage
  useEffect(() => {
    const savedQuests = localStorage.getItem('questBoardQuests')
    const savedPoints = localStorage.getItem('questBoardUserPoints')
    const savedNextId = localStorage.getItem('questBoardNextId')

    if (savedQuests) {
      setQuests(JSON.parse(savedQuests))
    } else {
      // Add sample quests if none exist
      setTimeout(addSampleQuests, 500)
    }
    
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints, 10))
    }
    
    if (savedNextId) {
      setNextQuestId(parseInt(savedNextId, 10))
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('questBoardQuests', JSON.stringify(quests))
    localStorage.setItem('questBoardUserPoints', userPoints.toString())
    localStorage.setItem('questBoardNextId', nextQuestId.toString())
  }, [quests, userPoints, nextQuestId])

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
    }
    
    setQuests([...quests, newQuest])
    setNextQuestId(nextQuestId + 1)
    setActivePanel(null) // Close the create panel
  }

  // Accept a quest
  const acceptQuest = (questId) => {
    setQuests(quests.map(quest => 
      quest.id === questId 
        ? { ...quest, status: 'progress' } 
        : quest
    ))
  }

  // Complete a quest
  const completeQuest = (questId) => {
    const questToComplete = quests.find(q => q.id === questId)
    
    if (questToComplete && questToComplete.status === 'progress') {
      setQuests(quests.map(quest => 
        quest.id === questId 
          ? { ...quest, status: 'completed' } 
          : quest
      ))
      
      setUserPoints(userPoints + questToComplete.reward)
      setActiveTab('completed')
    }
  }

  // Sample quests for demo
  const addSampleQuests = () => {
    if (quests.length === 0) {
      const sampleQuests = [
        {
          id: 1,
          title: "Complete project documentation",
          description: "Write comprehensive documentation for the new feature we just shipped.",
          reward: 50,
          category: "work",
          deadline: "",
          status: "open",
          createdAt: new Date().toISOString(),
          assignee: null,
        },
        {
          id: 2,
          title: "Learn React Hooks",
          description: "Complete a tutorial on React Hooks and build a small demo project.",
          reward: 30,
          category: "learning",
          deadline: "",
          status: "open",
          createdAt: new Date().toISOString(),
          assignee: null,
        },
        {
          id: 3,
          title: "Weekly grocery shopping",
          description: "Buy groceries for the week including fruits, vegetables, and household items.",
          reward: 10,
          category: "personal",
          deadline: "",
          status: "open",
          createdAt: new Date().toISOString(),
          assignee: null,
        },
        {
          id: 4,
          title: "Organize community cleanup",
          description: "Organize a neighborhood cleanup event for next weekend.",
          reward: 100,
          category: "community",
          deadline: "",
          status: "open",
          createdAt: new Date().toISOString(),
          assignee: null,
        }
      ]
      
      setQuests(sampleQuests)
      setNextQuestId(5)
    }
  }

  // Show/hide panels
  const showPanel = (panel, questId = null) => {
    setActivePanel(panel)
    if (questId !== null) {
      setSelectedQuestId(questId)
    }
  }

  const hideAllPanels = () => {
    setActivePanel(null)
  }

  // Apply filters
  const applyFilters = (newFilters) => {
    setActiveFilters(newFilters)
    hideAllPanels()
  }

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      status: 'all',
      category: 'all',
      sortBy: 'newest'
    })
  }

  // Select a specific category
  const selectCategory = (category) => {
    setActiveFilters({
      ...activeFilters,
      category: category === 'all' ? 'all' : category
    })
  }

  // Filter and sort quests
  const filterAndSortQuests = () => {
    // First, filter the quests
    let filteredQuests = quests.filter(quest => {
      // Filter by status
      if (activeFilters.status !== 'all' && quest.status !== activeFilters.status) {
        return false
      }
      
      // Filter by category
      if (activeFilters.category !== 'all' && quest.category !== activeFilters.category) {
        return false
      }
      
      return true
    })
    
    // Then sort the filtered quests
    return filteredQuests.sort((a, b) => {
      switch (activeFilters.sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'reward-high':
          return b.reward - a.reward
        case 'reward-low':
          return a.reward - b.reward
        case 'deadline':
          // Sort by deadline, null values at the end
          if (!a.deadline) return 1
          if (!b.deadline) return -1
          return new Date(a.deadline) - new Date(b.deadline)
        default:
          return 0
      }
    })
  }

  // Split quests into active and completed for displaying
  const sortedQuests = filterAndSortQuests()
  const activeQuests = sortedQuests.filter(quest => quest.status !== 'completed')
  const completedQuests = sortedQuests.filter(quest => quest.status === 'completed')

  return (
    <div className="app-container">
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
      
      {/* Panels */}
      {activePanel === 'create' && (
        <CreateQuestPanel
          onClose={hideAllPanels}
          onSubmit={addQuest}
        />
      )}
      
      {activePanel === 'details' && (
        <QuestDetailsPanel
          quest={quests.find(q => q.id === selectedQuestId)}
          onClose={hideAllPanels}
          onAccept={acceptQuest}
          onComplete={completeQuest}
        />
      )}
      
      {activePanel === 'filter' && (
        <FilterPanel
          filters={activeFilters}
          onApply={applyFilters}
          onReset={resetFilters}
          onClose={hideAllPanels}
        />
      )}
      
      {/* Overlay for panels */}
      {activePanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={hideAllPanels}></div>
      )}
    </div>
  )
}

export default App
