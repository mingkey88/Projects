import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import QuestCard from './QuestCard'

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
  return (
    <main className="main-content">
      {/* Header with search */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/2">
          <FontAwesomeIcon icon="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search quests, categories..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="search-input"
          />
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            id="filter-button"
            onClick={onFilterClick}
          >
            <FontAwesomeIcon icon="filter" />
            <span>Filter</span>
          </button>
          <div className="user-profile">
            <img src="https://cdn.midjourney.com/b2263cde-ed7e-454b-a529-9ca52d62c2f8/0_1.png" alt="User" className="w-9 h-9 rounded-full object-cover" />
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          className={`chip ${activeFilters.category === 'all' ? 'active' : ''}`} 
          onClick={() => selectCategory('all')}
          data-category="all"
        >
          All
        </button>
        <button 
          className={`chip ${activeFilters.category === 'work' ? 'active' : ''}`} 
          onClick={() => selectCategory('work')}
          data-category="work"
        >
          Work
        </button>
        <button 
          className={`chip ${activeFilters.category === 'personal' ? 'active' : ''}`} 
          onClick={() => selectCategory('personal')}
          data-category="personal"
        >
          Personal
        </button>
        <button 
          className={`chip ${activeFilters.category === 'community' ? 'active' : ''}`} 
          onClick={() => selectCategory('community')}
          data-category="community"
        >
          Community
        </button>
        <button 
          className={`chip ${activeFilters.category === 'learning' ? 'active' : ''}`} 
          onClick={() => selectCategory('learning')}
          data-category="learning"
        >
          Learning
        </button>
        <button 
          className={`chip ${activeFilters.category === 'other' ? 'active' : ''}`} 
          onClick={() => selectCategory('other')}
          data-category="other"
        >
          Other
        </button>
      </div>

      {/* Main tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          id="tab-active" 
          className={`py-3 px-6 font-medium border-b-2 ${activeTab === 'active' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('active')}
        >
          Active Quests
        </button>
        <button 
          id="tab-completed" 
          className={`py-3 px-6 font-medium border-b-2 ${activeTab === 'completed' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Quests
        </button>
      </div>

      {/* Quest card sections */}
      <div id="active-quests-section" className={`mb-8 ${activeTab === 'active' ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold mb-4">Available Quests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="quest-grid">
          {activeQuests.length > 0 ? (
            activeQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} onClick={() => onQuestClick(quest.id)} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-4">No active quests match your filters</p>
          )}
        </div>
      </div>
      
      <div id="completed-quests-section" className={`mb-8 ${activeTab === 'completed' ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold mb-4">Completed Quests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="completed-quest-grid">
          {completedQuests.length > 0 ? (
            completedQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} onClick={() => onQuestClick(quest.id)} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-4">No completed quests yet</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default MainContent