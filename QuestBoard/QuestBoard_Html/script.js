"use strict";

// --- DOM Elements ---
// Form elements
const questForm = document.getElementById("add-quest-form");
const questTitleInput = document.getElementById("quest-title");
const questGiverInput = document.getElementById("quest-giver");
const questDescriptionInput = document.getElementById("quest-description");
const questRewardInput = document.getElementById("quest-reward");
const questCategoryInput = document.getElementById("quest-category");
const questDeadlineInput = document.getElementById("quest-deadline");

// Main grid elements
const questGrid = document.getElementById("quest-grid");
const completedQuestGrid = document.getElementById("completed-quest-grid");
const userPointsDisplay = document.getElementById("user-points");

// Tab and section elements
const tabActiveButton = document.getElementById("tab-active");
const tabCompletedButton = document.getElementById("tab-completed");
const activeQuestsSection = document.getElementById("active-quests-section");
const completedQuestsSection = document.getElementById("completed-quests-section");
const profileSection = document.getElementById("profile-section");

// Profile elements
const profileLink = document.getElementById("profile-link");
const libraryLink = document.getElementById("library-link");
const profilePointsDisplay = document.getElementById("profile-points");
const profileCompletedDisplay = document.getElementById("profile-completed");
const profileCreatedDisplay = document.getElementById("profile-created");

// Panel elements
const createQuestPanel = document.getElementById("create-quest-panel");
const questDetailsPanel = document.getElementById("quest-details-panel");
const filterPanel = document.getElementById("filter-panel");
const overlay = document.getElementById("overlay");
const appContainer = document.querySelector(".app-container");

// Navigation elements
const createQuestLink = document.getElementById("create-quest-link");
const closeCreatePanelBtn = document.getElementById("close-create-panel");
const closeDetailsPanelBtn = document.getElementById("close-details-panel");
const closeFilterPanelBtn = document.getElementById("close-filter-panel");
const filterButton = document.getElementById("filter-button");

// Filter elements
const filterStatusInput = document.getElementById("filter-status");
const filterCategoryInput = document.getElementById("filter-category");
const sortByInput = document.getElementById("sort-by");
const applyFiltersBtn = document.getElementById("apply-filters");
const resetFiltersBtn = document.getElementById("reset-filters");

// Category chips
const categoryChips = document.querySelectorAll(".chip");

// Details elements
const questDetailsContent = document.getElementById("quest-details-content");

// --- State ---
let quests = [];
let userPoints = 0;
let nextQuestId = 1;
let activeFilters = {
  status: "all",
  category: "all",
  sortBy: "newest"
};

// --- Functions ---

// Initialize app
const initApp = () => {
  // Set the minimum date for the deadline input
  const today = new Date().toISOString().split("T")[0];
  questDeadlineInput.min = today;
  
  // Load saved quests and settings
  loadState();
  
  // Set initial active tab
  switchMainTab(tabActiveButton);
  
  // Update profile stats
  updateProfileStats();
};

// Panel management
const showPanel = (panel) => {
  // Hide all panels first
  appContainer.classList.remove("show-create-panel", "show-details-panel", "show-filter-panel");
  
  // Show the requested panel
  if (panel === createQuestPanel) {
    appContainer.classList.add("show-create-panel");
  } else if (panel === questDetailsPanel) {
    appContainer.classList.add("show-details-panel");
  } else if (panel === filterPanel) {
    appContainer.classList.add("show-filter-panel");
  }
};

const hideAllPanels = () => {
  appContainer.classList.remove("show-create-panel", "show-details-panel", "show-filter-panel");
};

// Main content tab switching
const switchMainTab = (activeTabButton) => {
  // Remove active class from all buttons
  document.querySelectorAll(".content-tab-button").forEach((button) => {
    button.classList.remove("active");
  });
  
  // Hide all sections
  document.querySelectorAll(".quests-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Add active class to the clicked button
  activeTabButton.classList.add("active");

  // Show the corresponding section
  const targetSectionId = activeTabButton.id.replace("tab-", "") + "-quests-section";
  const targetSection = document.getElementById(targetSectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Apply filters to render the correct quests
  applyFiltersAndRender();
};

// Category selection
const selectCategory = (category) => {
  // Update the active category chip
  document.querySelectorAll(".chip").forEach(chip => {
    chip.classList.remove("active");
  });
  
  const selectedChip = document.querySelector(`.chip[data-category="${category}"]`);
  if (selectedChip) {
    selectedChip.classList.add("active");
  }
  
  // Update filter and re-render
  activeFilters.category = category === "all" ? "all" : category;
  applyFiltersAndRender();
};

// --- Quest Filtering and Sorting Functions ---
const filterQuests = (questList) => {
  return questList.filter(quest => {
    // Filter by status
    if (activeFilters.status !== "all" && quest.status !== activeFilters.status) {
      return false;
    }
    
    // Filter by category
    if (activeFilters.category !== "all" && quest.category !== activeFilters.category) {
      return false;
    }
    
    return true;
  });
};

const sortQuests = (filteredQuests) => {
  return [...filteredQuests].sort((a, b) => {
    switch (activeFilters.sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "reward-high":
        return b.reward - a.reward;
      case "reward-low":
        return a.reward - b.reward;
      case "deadline":
        // Sort by deadline, null values at the end
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      default:
        return 0;
    }
  });
};

// --- Quest Card Rendering ---
const renderQuestCard = (quest) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("quest-card", `status-${quest.status}`);
  cardDiv.dataset.id = quest.id;
  cardDiv.dataset.category = quest.category || "other"; // Add data-category attribute for CSS styling

  // Map category to icon
  const categoryIcons = {
    work: "fa-briefcase",
    personal: "fa-user",
    community: "fa-users",
    learning: "fa-book-open",
    other: "fa-dice-d20"
  };

  const icon = categoryIcons[quest.category] || categoryIcons.other;
  
  // Create a category badge label
  const categoryLabel = {
    work: 'Work',
    personal: 'Personal',
    community: 'Community',
    learning: 'Learning',
    other: 'Other'
  }[quest.category || 'other'];

  // Create a status label
  const statusLabel = {
    open: 'Open',
    progress: 'In Progress',
    completed: 'Completed'
  }[quest.status];

  // Display user information based on the quest status
  let userInfoHtml = '';
  if (quest.status === 'open') {
    userInfoHtml = `<div class="quest-user-info">Posted by: ${quest.questGiver}</div>`;
  } else if (quest.status === 'progress') {
    userInfoHtml = `<div class="quest-user-info">Posted by: ${quest.questGiver} | Taken by: ${quest.questTaker}</div>`;
  } else if (quest.status === 'completed') {
    userInfoHtml = `<div class="quest-user-info">Posted by: ${quest.questGiver} | Completed by: ${quest.completedBy}</div>`;
  }

  // Modern card with image section and content section
  cardDiv.innerHTML = `
    <div class="quest-card-image">
      <div class="category-icon">
        <i class="fas ${icon}"></i>
      </div>
    </div>
    <div class="quest-card-content">
      <h3 class="quest-card-title">${quest.title}</h3>
      ${userInfoHtml}
      <div class="quest-card-details">
        <!-- Category pill moved to footer -->
      </div>
      <div class="quest-card-footer">
        <span class="category-pill ${quest.category || 'other'}">${categoryLabel}</span>
        <span class="quest-card-reward">${quest.reward} Points</span>
        <span class="quest-card-status">${statusLabel}</span>
      </div>
    </div>
  `;

  // Add to the appropriate grid based on status
  if (quest.status === 'completed') {
    completedQuestGrid.appendChild(cardDiv);
  } else {
    questGrid.appendChild(cardDiv);
  }

  // Add click handler to the card
  cardDiv.addEventListener("click", () => {
    showQuestDetails(quest.id);
  });
};

// --- Show Quest Details in Panel ---
const showQuestDetails = (questId) => {
  const quest = quests.find(q => q.id === parseInt(questId));
  if (!quest) return;

  // Format the deadline if it exists
  let deadlineText = 'None';
  if (quest.deadline) {
    const deadlineDate = new Date(quest.deadline);
    deadlineText = deadlineDate.toLocaleDateString();
  }

  // Create a category label
  const categoryLabel = {
    work: 'Work',
    personal: 'Personal',
    community: 'Community',
    learning: 'Learning',
    other: 'Other'
  }[quest.category || 'other'];

  // Create a status label
  const statusLabel = {
    open: 'Open',
    progress: 'In Progress',
    completed: 'Completed'
  }[quest.status];

  // Create appropriate action buttons based on status
  let actionButtonsHtml = '';
  if (quest.status === 'open') {
    actionButtonsHtml = '<button class="btn btn-apply btn-accept"><i class="fas fa-check"></i> Accept Quest</button>';
  } else if (quest.status === 'progress') {
    actionButtonsHtml = '<button class="btn btn-apply btn-complete"><i class="fas fa-flag-checkered"></i> Complete Quest</button>';
  }

  // Build the detailed view HTML
  questDetailsContent.innerHTML = `
    <h3 class="details-title">${quest.title}</h3>
    
    <div class="details-section">
      <div class="details-label">Description</div>
      <div class="details-description">${quest.description}</div>
    </div>
    
    <div class="details-section">
      <div class="details-label">Category</div>
      <div class="details-value">${categoryLabel}</div>
    </div>
    
    <div class="details-section">
      <div class="details-label">Reward</div>
      <div class="details-value">${quest.reward} Points</div>
    </div>
    
    <div class="details-section">
      <div class="details-label">Status</div>
      <div class="details-value">${statusLabel}</div>
    </div>
    
    <div class="details-section">
      <div class="details-label">Deadline</div>
      <div class="details-value">${deadlineText}</div>
    </div>
    
    <div class="details-section">
      <div class="details-label">Quest Giver</div>
      <div class="details-value">${quest.questGiver || 'Unknown'}</div>
    </div>
    
    <div class="details-section">
      <div class="details-label">Quest Taker</div>
      <div class="details-value">${quest.questTaker || 'None'}</div>
    </div>
    
    <div class="details-section">
      <div class="details-label">Completed By</div>
      <div class="details-value">${quest.completedBy || 'None'}</div>
    </div>
    
    <div class="details-actions" data-quest-id="${quest.id}">
      ${actionButtonsHtml}
    </div>
  `;

  // Show the details panel
  showPanel(questDetailsPanel);
};

// Updated render function for the card layout
const renderBoard = () => {
  questGrid.innerHTML = "";
  completedQuestGrid.innerHTML = "";
  
  const filteredQuests = filterQuests(quests);
  const sortedQuests = sortQuests(filteredQuests);
  
  // Check if there are no quests to display
  if (sortedQuests.length === 0) {
    const noQuestsMsg = document.createElement('div');
    noQuestsMsg.className = 'no-quests-message';
    noQuestsMsg.textContent = 'No quests match your filters';
    questGrid.appendChild(noQuestsMsg);
    
    const noCompletedMsg = document.createElement('div');
    noCompletedMsg.className = 'no-quests-message';
    noCompletedMsg.textContent = 'No completed quests yet';
    completedQuestGrid.appendChild(noCompletedMsg);
    return;
  }
  
  sortedQuests.forEach(renderQuestCard);
  userPointsDisplay.textContent = userPoints;
};

const applyFiltersAndRender = () => {
  renderBoard();
};

// --- Quest Logic Functions ---
const addQuest = (title, description, reward, category, deadline, questGiver) => {
  const newQuest = {
    id: nextQuestId++,
    title,
    description,
    reward: parseInt(reward, 10),
    category,
    deadline,
    status: "open",
    createdAt: new Date().toISOString(),
    questGiver: questGiver, // Add quest giver
    questTaker: null,       // Initialize quest taker as null
    completedBy: null       // Initialize completedBy as null
  };
  quests.push(newQuest);
  saveState();
  applyFiltersAndRender();
};

const acceptQuest = (questId, questTaker) => {
  const quest = quests.find((q) => q.id === questId);
  if (quest && quest.status === "open") {
    quest.status = "progress";
    quest.questTaker = questTaker; // Add quest taker
    console.log(`Quest ${questId} accepted by ${questTaker}.`);
    saveState();
    applyFiltersAndRender();
  }
};

const completeQuest = (questId) => {
  const quest = quests.find((q) => q.id === questId);
  if (quest && quest.status === "progress") {
    quest.status = "completed";
    quest.completedBy = quest.questTaker; // Set completedBy to the questTaker
    userPoints += quest.reward;
    console.log(`Quest ${questId} completed by ${quest.completedBy}! Awarded ${quest.reward} points.`);
    saveState();
    applyFiltersAndRender();
  }
};

// New function to remove a quest by title
const removeQuestByTitle = (title) => {
  const initialLength = quests.length;
  quests = quests.filter(quest => quest.title !== title);
  
  // If we removed a quest, save the state
  if (quests.length < initialLength) {
    console.log(`Removed quest: ${title}`);
    saveState();
    applyFiltersAndRender();
    return true;
  }
  return false;
};

const saveState = () => {
  localStorage.setItem("questBoardQuests", JSON.stringify(quests));
  localStorage.setItem("questBoardUserPoints", userPoints.toString());
  localStorage.setItem("questBoardNextId", nextQuestId.toString());
};

const loadState = () => {
  const savedQuests = localStorage.getItem("questBoardQuests");
  const savedPoints = localStorage.getItem("questBoardUserPoints");
  const savedNextId = localStorage.getItem("questBoardNextId");

  if (savedQuests) {
    quests = JSON.parse(savedQuests);
    
    // Remove the "Buy twenty Eggs" quest if it exists
    removeQuestByTitle("Buy twenty Eggs");
  }
  if (savedPoints) {
    userPoints = parseInt(savedPoints, 10);
  }
  if (savedNextId) {
    nextQuestId = parseInt(savedNextId, 10);
  }
  renderBoard();
};

// Show profile section and hide quest sections
const showProfileSection = () => {
  // Hide quest sections
  activeQuestsSection.classList.remove("active");
  completedQuestsSection.classList.remove("active");
  profileSection.classList.add("active");
  
  // Hide content tabs
  document.querySelector(".content-tabs").style.display = "none";
  document.querySelector(".category-chips").style.display = "none";
  
  // Update active navigation
  document.querySelectorAll(".nav-links li").forEach(li => {
    li.classList.remove("active");
  });
  profileLink.parentElement.classList.add("active");
  
  // Update profile statistics
  updateProfileStats();
};

// Show quest sections and hide profile
const showQuestSections = () => {
  // Show content tabs and chips
  document.querySelector(".content-tabs").style.display = "flex";
  document.querySelector(".category-chips").style.display = "flex";
  
  // Set active tab based on which tab button is active
  if (tabActiveButton.classList.contains("active")) {
    activeQuestsSection.classList.add("active");
    completedQuestsSection.classList.remove("active");
  } else {
    activeQuestsSection.classList.remove("active");
    completedQuestsSection.classList.add("active");
  }
  
  // Hide profile section
  profileSection.classList.remove("active");
  
  // Update active navigation
  document.querySelectorAll(".nav-links li").forEach(li => {
    li.classList.remove("active");
  });
  libraryLink.parentElement.classList.add("active");
};

// Update profile statistics
const updateProfileStats = () => {
  // Calculate stats from quests
  const completedQuests = quests.filter(q => q.status === "completed").length;
  const createdQuests = quests.length;
  
  // Update profile displays
  profilePointsDisplay.textContent = userPoints;
  profileCompletedDisplay.textContent = completedQuests;
  profileCreatedDisplay.textContent = createdQuests;
};

// --- Event Listeners ---

// Handle new quest form submission
questForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = questTitleInput.value.trim();
  const description = questDescriptionInput.value.trim();
  const reward = questRewardInput.value;
  const category = questCategoryInput.value;
  const deadline = questDeadlineInput.value;
  const questGiver = questGiverInput.value.trim();

  if (title && description && reward > 0 && questGiver) {
    addQuest(title, description, reward, category, deadline, questGiver);
    questTitleInput.value = "";
    questDescriptionInput.value = "";
    questRewardInput.value = "10";
    questCategoryInput.value = "work";
    questDeadlineInput.value = "";
    questGiverInput.value = "";
    
    // Hide the create panel and show a success message
    hideAllPanels();
    // TODO: Add a toast notification system for success messages
  } else {
    alert("Please fill out all fields and provide a positive reward.");
  }
});

// Handle clicks on quest details actions
questDetailsContent.addEventListener("click", (event) => {
  if (event.target.closest(".btn-accept")) {
    const questId = parseInt(event.target.closest(".details-actions").dataset.questId, 10);
    const questTaker = prompt("Enter your name to accept the quest:");
    if (questTaker) {
      acceptQuest(questId, questTaker);
      showQuestDetails(questId); // Refresh the details view
    }
  } else if (event.target.closest(".btn-complete")) {
    const questId = parseInt(event.target.closest(".details-actions").dataset.questId, 10);
    completeQuest(questId);
    showQuestDetails(questId); // Refresh the details view
    switchMainTab(tabCompletedButton); // Switch to completed tab
  }
});

// Handle filter application
applyFiltersBtn.addEventListener("click", () => {
  activeFilters.status = filterStatusInput.value;
  activeFilters.category = filterCategoryInput.value;
  activeFilters.sortBy = sortByInput.value;
  applyFiltersAndRender();
  hideAllPanels();
});

// Handle filter reset
resetFiltersBtn.addEventListener("click", () => {
  filterStatusInput.value = "all";
  filterCategoryInput.value = "all";
  sortByInput.value = "newest";
  
  activeFilters.status = "all";
  activeFilters.category = "all";
  activeFilters.sortBy = "newest";
  
  // Also reset category chips
  document.querySelectorAll(".chip").forEach(chip => {
    chip.classList.remove("active");
  });
  document.querySelector('.chip[data-category="all"]').classList.add("active");
  
  applyFiltersAndRender();
});

// Handle category chip selection
categoryChips.forEach(chip => {
  chip.addEventListener("click", () => {
    const category = chip.dataset.category;
    selectCategory(category);
  });
});

// Panel navigation
createQuestLink.addEventListener("click", () => showPanel(createQuestPanel));
closeCreatePanelBtn.addEventListener("click", hideAllPanels);
closeDetailsPanelBtn.addEventListener("click", hideAllPanels);
closeFilterPanelBtn.addEventListener("click", hideAllPanels);
filterButton.addEventListener("click", () => showPanel(filterPanel));
overlay.addEventListener("click", hideAllPanels);

// Main tab switching
tabActiveButton.addEventListener("click", () => switchMainTab(tabActiveButton));
tabCompletedButton.addEventListener("click", () => switchMainTab(tabCompletedButton));

// Profile section navigation
profileLink.addEventListener("click", showProfileSection);
libraryLink.addEventListener("click", showQuestSections);

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);

// Add some sample quests if none exist (for demo purposes)
const addSampleQuests = () => {
  if (quests.length === 0) {
    addQuest("Complete project documentation", "Write comprehensive documentation for the new feature we just shipped.", 50, "work", "", "Manager");
    addQuest("Learn React Hooks", "Complete a tutorial on React Hooks and build a small demo project.", 30, "learning", "", "Instructor");
    addQuest("Weekly grocery shopping", "Buy groceries for the week including fruits, vegetables, and household items.", 10, "personal", "", "Self");
    addQuest("Organize community cleanup", "Organize a neighborhood cleanup event for next weekend.", 100, "community", "", "Community Leader");
  }
};

// Call this after initial load
setTimeout(addSampleQuests, 500);
