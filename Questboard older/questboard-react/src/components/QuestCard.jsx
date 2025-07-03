import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const QuestCard = ({ quest, onClick }) => {
  // Map category to icon
  const categoryIcons = {
    work: 'briefcase',
    personal: 'user',
    community: 'users',
    learning: 'book-open',
    other: 'dice-d20'
  }

  const icon = categoryIcons[quest.category] || categoryIcons.other
  
  // Create a category label
  const categoryLabel = {
    work: 'Work',
    personal: 'Personal',
    community: 'Community',
    learning: 'Learning',
    other: 'Other'
  }[quest.category || 'other']

  // Create a status label
  const statusLabel = {
    open: 'Open',
    progress: 'In Progress',
    completed: 'Completed'
  }[quest.status]

  return (
    <div 
      className={`quest-card cursor-pointer hover:translate-y-[-4px] transition-all duration-200 ${quest.status === 'completed' ? 'opacity-75' : ''}`}
      onClick={onClick}
    >
      <div className="quest-card-image">
        <div className="category-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
      <div className="quest-card-content">
        <h3 className="quest-card-title">{quest.title}</h3>
        <div className="quest-card-details">
          <span className={`category-pill ${quest.category || 'other'}`}>{categoryLabel}</span>
        </div>
        <div className="quest-card-footer">
          <span className="quest-card-reward">{quest.reward} Points</span>
          <span className={`quest-card-status px-2 py-1 rounded text-xs ${
            quest.status === 'completed' ? 'bg-green-100 text-green-800' : 
            quest.status === 'progress' ? 'bg-blue-100 text-blue-800' : 
            'bg-gray-100 text-gray-800'
          }`}>{statusLabel}</span>
        </div>
      </div>
    </div>
  )
}

export default QuestCard