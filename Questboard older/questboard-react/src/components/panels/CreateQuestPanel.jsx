import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CreateQuestPanel = ({ onClose, onSubmit }) => {
  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [reward, setReward] = useState(10)
  const [category, setCategory] = useState('work')
  const [deadline, setDeadline] = useState('')
  
  // Get today's date for min date attribute
  const today = new Date().toISOString().split('T')[0]
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (title.trim() && description.trim() && reward > 0) {
      onSubmit(title, description, reward, category, deadline)
      
      // Reset form
      setTitle('')
      setDescription('')
      setReward(10)
      setCategory('work')
      setDeadline('')
    }
  }

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg z-30 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Create New Quest</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor="quest-title" className="block text-sm font-medium text-gray-700">
            Quest Title
          </label>
          <input
            type="text"
            id="quest-title"
            placeholder="e.g., Water the Office Plants"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="quest-description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="quest-description"
            rows="3"
            placeholder="Details about the quest..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="quest-reward" className="block text-sm font-medium text-gray-700">
            Reward Points
          </label>
          <input
            type="number"
            id="quest-reward"
            min="1"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={reward}
            onChange={(e) => setReward(parseInt(e.target.value))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="quest-category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="quest-category"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="community">Community</option>
            <option value="learning">Learning</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="quest-deadline" className="block text-sm font-medium text-gray-700">
            Deadline (Optional)
          </label>
          <input
            type="date"
            id="quest-deadline"
            min={today}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        
        <button type="submit" className="w-full btn btn-post py-3 flex items-center justify-center gap-2 mt-6">
          <FontAwesomeIcon icon="plus-circle" />
          Post Quest
        </button>
      </form>
    </div>
  )
}

export default CreateQuestPanel