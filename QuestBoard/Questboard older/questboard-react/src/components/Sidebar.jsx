import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sidebar = ({ userPoints, onCreateQuest }) => {
  return (
    <nav className="sidebar">
      <div className="flex items-center gap-2 mb-8">
        <FontAwesomeIcon icon="scroll" className="text-primary text-xl" />
        <span className="text-xl font-semibold">QuestBoard</span>
      </div>
      
      <ul className="space-y-3 mb-6">
        <li>
          <a 
            href="#" 
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
            id="library-link"
          >
            <FontAwesomeIcon icon="book" />
            <span>My Quests</span>
          </a>
        </li>
        <li className="border-b border-gray-200 my-3"></li>
        <li>
          <a 
            href="#" 
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
            id="create-quest-link"
            onClick={(e) => {
              e.preventDefault()
              onCreateQuest()
            }}
          >
            <FontAwesomeIcon icon="plus-circle" className="text-primary" />
            <span>Create Quest</span>
          </a>
        </li>
      </ul>
      
      <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-3 mt-auto">
        <div className="flex justify-center items-center w-10 h-10 bg-primary bg-opacity-10 rounded-full">
          <FontAwesomeIcon icon="award" className="text-primary" />
        </div>
        <div>
          <span className="block text-xs text-gray-500">Your Points</span>
          <span className="block font-medium" id="user-points">{userPoints}</span>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar