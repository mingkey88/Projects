import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const QuestDetailsPanel = ({ quest, onClose, onAccept, onComplete }) => {
  if (!quest) {
    return (
      <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg z-30 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Quest Details</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-500 text-center">Select a quest to view details</p>
        </div>
      </div>
    )
  }

  // Format the deadline if it exists
  let deadlineText = 'None'
  if (quest.deadline) {
    const deadlineDate = new Date(quest.deadline)
    deadlineText = deadlineDate.toLocaleDateString()
  }

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
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg z-30 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quest Details</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <h3 className="text-xl font-medium text-gray-800">{quest.title}</h3>
        
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Description</div>
          <div className="p-3 bg-gray-50 rounded-md">{quest.description}</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Category</div>
          <div>{categoryLabel}</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Reward</div>
          <div>{quest.reward} Points</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Status</div>
          <div className={`inline-block px-2 py-1 rounded-full text-sm ${
            quest.status === 'completed' ? 'bg-green-100 text-green-800' : 
            quest.status === 'progress' ? 'bg-blue-100 text-blue-800' : 
            'bg-gray-100 text-gray-800'
          }`}>{statusLabel}</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Deadline</div>
          <div>{deadlineText}</div>
        </div>
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          {quest.status === 'open' ? (
            <button 
              className="w-full btn btn-apply py-3 flex items-center justify-center gap-2"
              onClick={() => onAccept(quest.id)}
            >
              <FontAwesomeIcon icon="check" />
              Accept Quest
            </button>
          ) : quest.status === 'progress' ? (
            <button 
              className="w-full btn btn-apply py-3 flex items-center justify-center gap-2"
              onClick={() => onComplete(quest.id)}
            >
              <FontAwesomeIcon icon="flag-checkered" />
              Complete Quest
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default QuestDetailsPanel