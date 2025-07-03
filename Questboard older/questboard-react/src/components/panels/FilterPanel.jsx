import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FilterPanel = ({ filters, onApply, onReset, onClose }) => {
  const [status, setStatus] = useState(filters.status)
  const [category, setCategory] = useState(filters.category)
  const [sortBy, setSortBy] = useState(filters.sortBy)
  
  const handleApply = () => {
    onApply({
      status,
      category,
      sortBy
    })
  }
  
  const handleReset = () => {
    setStatus('all')
    setCategory('all')
    setSortBy('newest')
    onReset()
  }

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg z-30 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Filter & Sort</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="filter-status"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="filter-category"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="community">Community</option>
            <option value="learning">Learning</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            id="sort-by"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="reward-high">Highest Reward</option>
            <option value="reward-low">Lowest Reward</option>
            <option value="deadline">Upcoming Deadline</option>
          </select>
        </div>
        
        <div className="flex gap-3 pt-4 mt-4">
          <button 
            className="flex-1 btn btn-apply py-2"
            onClick={handleApply}
          >
            Apply Filters
          </button>
          <button 
            className="flex-1 btn btn-reset py-2"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel