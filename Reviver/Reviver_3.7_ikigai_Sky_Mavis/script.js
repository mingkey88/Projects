document.addEventListener('DOMContentLoaded', () => {
  // User stats (pilot attributes)
  const userStats = {
    command: 15,
    insight: 5,
    endurance: 10,
    resolve: 8,
    alliance: 12,
    streak: 3,
  };

  // Task state management
  const taskState = {
    tasks: [],
    currentFilter: 'today',
    
    // Example tasks
    initializeTasks() {
      this.tasks = [
        {
          id: 1,
          title: 'Complete project proposal',
          description: 'Finish draft and share with the team for review',
          dueDate: new Date().setHours(17, 0, 0, 0), // Today at 5pm
          priority: 'high',
          category: 'Work',
          completed: false,
          rewards: {
            xp: 100,
            items: ['Beam Rifle Part'],
            stats: {resolve: 2} // Added resolve stat to align with Work category
          }
        },
        {
          id: 2,
          title: 'Exercise for 30 minutes',
          description: 'Complete daily physical training to maintain pilot fitness',
          dueDate: new Date().setHours(23, 59, 0, 0), // Today end of day
          priority: 'medium',
          category: 'Health',
          completed: false,
          rewards: {
            xp: 50,
            stats: {endurance: 1} // Correctly gives endurance
          }
        },
        {
          id: 3,
          title: 'Read book chapter',
          description: 'Continue reading "Mobile Suit Technical Manual" chapter 3',
          dueDate: new Date().setHours(23, 59, 0, 0), // Today end of day
          priority: 'low',
          category: 'Personal',
          completed: false,
          rewards: {
            xp: 30,
            stats: {insight: 1} // This correctly gives insight
          }
        },
        // New upcoming social mission
        {
          id: 4,
          title: 'Attend Pilot Social Gathering',
          description: 'Network with other pilots at the monthly social meetup',
          dueDate: new Date('April 29, 2025').setHours(18, 0, 0, 0), // April 29, 2025 at 6pm
          priority: 'medium',
          category: 'Social',
          completed: false,
          rewards: {
            xp: 75,
            stats: {alliance: 3},
            items: ['Squad Connection Badge']
          }
        },
        // New upcoming research mission
        {
          id: 5,
          title: 'AI Defense Systems Research',
          description: 'Study latest AI developments for mecha defensive capabilities',
          dueDate: new Date('April 30, 2025').setHours(14, 0, 0, 0), // April 30, 2025 at 2pm
          priority: 'high',
          category: 'Research',
          completed: false,
          rewards: {
            xp: 90,
            stats: {insight: 3},
            items: ['Neural Interface Upgrade']
          }
        }
      ];
    }
  };
  
  // Initialize tasks
  taskState.initializeTasks();

  // Mobile sidebar toggle
  const setupMobileMenu = () => {
    const sidebar = document.querySelector('.left-sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-menu-toggle';
    toggleButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    const topBar = document.querySelector('.top-bar');
    topBar.insertBefore(toggleButton, topBar.firstChild);
    
    const toggleSidebar = () => {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    };
    
    toggleButton.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
  };
  
  // Only setup mobile menu for smaller screens
  if (window.innerWidth <= 576) {
    setupMobileMenu();
  }
  
  // Window resize handler
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 576 && !document.querySelector('.mobile-menu-toggle')) {
      setupMobileMenu();
    }
  });

  // Navigation
  const showView = (viewId) => {
    // This is a placeholder for view switching functionality
    console.log(`Switching to view: ${viewId}`);
    
    // Update active navigation item
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }

    // Additional view-specific logic could be added here
    if (viewId === 'tasks') {
      // Refresh the task list when navigating to tasks view
      renderTasks();
    }
  };

  // Attach navigation event listeners
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewToShow = link.dataset.view;
      if (viewToShow) {
        showView(viewToShow);
      }
    });
  });

  // User dropdown
  const setupUserDropdown = () => {
    const userProfile = document.querySelector('.user-profile');
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-menu';
    dropdown.innerHTML = `
      <a href="#" class="dropdown-item">Pilot Profile</a>
      <a href="#" class="dropdown-item">Mecha Customization</a>
      <a href="#" class="dropdown-item">Squad Management</a>
      <a href="#" class="dropdown-item">Settings</a>
      <a href="#" class="dropdown-item">Logout</a>
    `;
    userProfile.appendChild(dropdown);
    
    userProfile.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-profile')) {
        dropdown.classList.remove('active');
      }
    });
  };
  
  setupUserDropdown();

  // Task Management
  const renderTasks = () => {
    const tasksContainer = document.querySelector('.tasks-container');
    if (!tasksContainer) return;

    // Clear existing task items, but keep the add task button
    const addTaskContainer = tasksContainer.querySelector('.add-task-container');
    tasksContainer.innerHTML = '';
    
    // Filter tasks based on current view
    const filteredTasks = taskState.tasks.filter(task => {
      const today = new Date();
      const taskDate = new Date(task.dueDate);
      
      if (taskState.currentFilter === 'today') {
        // Tasks due today
        return taskDate.toDateString() === today.toDateString();
      } else if (taskState.currentFilter === 'upcoming') {
        // Tasks due in the future
        return taskDate > today;
      } else if (taskState.currentFilter === 'completed') {
        // Completed tasks
        return task.completed;
      }
      
      return true; // Show all by default
    });
    
    // Create task items
    filteredTasks.forEach(task => {
      const taskElement = createTaskElement(task);
      tasksContainer.appendChild(taskElement);
    });
    
    // Add the "add task" container
    const newAddTaskContainer = document.createElement('div');
    newAddTaskContainer.className = 'add-task-container';
    newAddTaskContainer.innerHTML = `
      <button class="add-task-btn">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Add new mission
      </button>
    `;
    tasksContainer.appendChild(newAddTaskContainer);
    
    // Add event listener to the new add task button
    newAddTaskContainer.querySelector('.add-task-btn').addEventListener('click', () => {
      showAddTaskModal();
    });
    
    // Update task counters and stats
    updateTaskStats();
  };
  
  const createTaskElement = (task) => {
    const taskElement = document.createElement('div');
    
    // Determine if this is an upcoming mission (future date and in upcoming view)
    const isUpcoming = new Date(task.dueDate) > new Date() && taskState.currentFilter === 'upcoming';
    
    // Apply appropriate classes including the new 'upcoming-mission' class for future tasks
    taskElement.className = `task-item priority-${task.priority}${isUpcoming ? ' upcoming-mission' : ''}`;
    taskElement.dataset.taskId = task.id;
    
    // Format due date
    const dueDate = new Date(task.dueDate);
    const isToday = dueDate.toDateString() === new Date().toDateString();
    const dueText = isToday 
      ? `Due today${dueDate.getHours() !== 0 ? ` at ${formatTime(dueDate)}` : ''}`
      : `Due ${formatDate(dueDate)}${dueDate.getHours() !== 0 ? ` at ${formatTime(dueDate)}` : ''}`;
    
    taskElement.innerHTML = `
      <div class="task-checkbox">
        <input type="checkbox" id="task${task.id}" class="task-check" ${task.completed ? 'checked' : ''}>
        <label for="task${task.id}" class="task-check-label"></label>
      </div>
      <div class="task-content">
        <h3 class="task-title">${task.title}</h3>
        <p class="task-description">${task.description}</p>
        <div class="task-meta">
          <span class="task-tag">${task.category}</span>
          <span class="task-due">${dueText}</span>
        </div>
      </div>
      <div class="task-rewards">
        <div class="reward-item">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>${task.rewards.xp} XP</span>
        </div>
        ${task.rewards.items ? task.rewards.items.map(item => `
          <div class="reward-item">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.24 12.24C21.3658 11.1142 21.9983 9.58722 21.9983 7.99504C21.9983 6.40285 21.3658 4.87588 20.24 3.75004C19.1142 2.62419 17.5872 1.9917 15.995 1.9917C14.4028 1.9917 12.8758 2.62419 11.75 3.75004L5 10.5V19H13.5L20.24 12.24Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${item}</span>
          </div>
        `).join('') : ''}
        ${task.rewards.stats ? Object.entries(task.rewards.stats).map(([stat, value]) => `
          <div class="reward-item">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${capitalize(stat)} +${value}</span>
          </div>
        `).join('') : ''}
      </div>
      <div class="task-actions">
        <button class="task-action edit-action">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="task-action delete-action">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
    
    // Add event listeners
    const checkbox = taskElement.querySelector('.task-check');
    checkbox.addEventListener('change', () => {
      toggleTaskCompletion(task.id);
    });
    
    const editButton = taskElement.querySelector('.edit-action');
    editButton.addEventListener('click', () => {
      showEditTaskModal(task.id);
    });
    
    const deleteButton = taskElement.querySelector('.delete-action');
    deleteButton.addEventListener('click', () => {
      showDeleteTaskConfirmation(task.id);
    });
    
    return taskElement;
  };
  
  const toggleTaskCompletion = (taskId) => {
    const taskIndex = taskState.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      // Toggle completion status
      taskState.tasks[taskIndex].completed = !taskState.tasks[taskIndex].completed;
      
      if (taskState.tasks[taskIndex].completed) {
        // If task is now completed, apply rewards
        applyTaskRewards(taskState.tasks[taskIndex]);
        
        // Show notification
        showNotification(`Mission Complete! Rewards acquired.`, 'success');
        
        // Re-render tasks to update the view
        setTimeout(() => {
          renderTasks();
        }, 1000);
      } else {
        // Task was unchecked, could potentially remove rewards
        renderTasks();
      }
    }
  };
  
  const applyTaskRewards = (task) => {
    if (task.rewards) {
      // Apply XP
      if (task.rewards.xp) {
        // Add XP logic here
        console.log(`Added ${task.rewards.xp} XP`);
      }
      
      // Apply stats improvements
      if (task.rewards.stats) {
        for (const [stat, value] of Object.entries(task.rewards.stats)) {
          if (userStats[stat] !== undefined) {
            userStats[stat] += value;
            console.log(`Increased ${stat} by ${value}`);
            
            // Update the UI for the stat that changed
            updatePilotStats(stat);
          }
        }
      }
      
      // Apply item rewards
      if (task.rewards.items) {
        // Add items to inventory logic here
        console.log(`Added items: ${task.rewards.items.join(', ')}`);
      }
    }
  };
  
  // New function to update the pilot stats UI
  const updatePilotStats = (changedStat) => {
    const statElement = document.querySelector(`.stat-card.stat-${changedStat} .stat-value`);
    if (statElement) {
      statElement.textContent = userStats[changedStat];
      
      // Also update the progress bar
      const progressBar = document.querySelector(`.stat-card.stat-${changedStat} .progress-bar-fill`);
      if (progressBar) {
        // Assuming max value of 20 for all stats for progress calculation
        const progressPercentage = (userStats[changedStat] / 20) * 100;
        progressBar.style.width = `${progressPercentage}%`;
      }
    }
  };

  const showAddTaskModal = () => {
    // Placeholder for add task modal
    // In a real app, create a modal with a form to add a new task
    alert('Add new task functionality would open a modal here');
  };
  
  const showEditTaskModal = (taskId) => {
    // Placeholder for edit task modal
    // In a real app, create a modal with a form to edit an existing task
    alert(`Edit task ${taskId} functionality would open a modal here`);
  };
  
  const showDeleteTaskConfirmation = (taskId) => {
    // Placeholder for delete confirmation
    const confirmed = confirm('Are you sure you want to delete this mission?');
    if (confirmed) {
      deleteTask(taskId);
    }
  };
  
  const deleteTask = (taskId) => {
    const taskIndex = taskState.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      taskState.tasks.splice(taskIndex, 1);
      renderTasks();
      showNotification('Mission deleted successfully', 'info');
    }
  };

  // Task view filters
  const setupTaskFilters = () => {
    const viewTabs = document.querySelectorAll('.view-tab');
    viewTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        viewTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update filter and re-render tasks
        taskState.currentFilter = tab.dataset.view;
        renderTasks();
      });
    });
    
    // Add task button
    const addTaskButton = document.querySelector('.add-task-button');
    if (addTaskButton) {
      addTaskButton.addEventListener('click', showAddTaskModal);
    }
  };

  // Update task statistics
  const updateTaskStats = () => {
    // Calculate task progress
    const totalTasks = taskState.tasks.length;
    const completedTasks = taskState.tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Update progress bar
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
    }
    
    // Update progress text
    const progressValue = document.querySelector('.stat-value');
    if (progressValue) {
      progressValue.textContent = `${progressPercentage}%`;
    }
  };

  // Task daily briefing button
  const setupDailyBriefing = () => {
    const briefingButton = document.querySelector('.primary-button');
    if (briefingButton) {
      briefingButton.addEventListener('click', function() {
        this.innerHTML = 'Processing...';
        this.disabled = true;
        
        setTimeout(() => {
          this.innerHTML = 'Meditation Complete!';
          this.disabled = false;
          
          // Apply meditation rewards - update both Insight and Endurance stats
          userStats.insight += 2;
          userStats.endurance += 2;
          
          // Update the UI to reflect the stat changes
          updatePilotStats('insight');
          updatePilotStats('endurance');
          
          showNotification('Meditation complete! Your Insight and Endurance stats have increased.', 'success');
          
          // Update task list
          renderTasks();
        }, 1500);
      });
    }
  };

  // Notification system
  const showNotification = (message, type = 'success') => {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification-popup');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-popup ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <svg class="notification-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="notification-message">${message}</span>
      </div>
      <button class="notification-close">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: type === 'success' ? '#4caf50' : type === 'info' ? '#2196f3' : '#f44336',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: '1000',
      minWidth: '300px',
      transform: 'translateY(100px)',
      opacity: '0',
      transition: 'all 0.3s ease'
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    }, 10);
    
    // Add close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.style.transform = 'translateY(100px)';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after delay
    setTimeout(() => {
      notification.style.transform = 'translateY(100px)';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  };

  // Utility functions
  const formatDate = (date) => {
    // Format date as "Apr 25" or similar
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const formatTime = (date) => {
    // Format time as "3:00 PM" or similar
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
  };
  
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Initialize task management
  setupTaskFilters();
  setupDailyBriefing();
  renderTasks();

  // Make window.showView available for links
  window.showView = showView;
  window.showNotification = showNotification;
});
