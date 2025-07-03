"use strict"; // Enforce stricter parsing and error handling

// --- DOM Elements ---
const contractForm = document.getElementById("add-contract-form");
const contractInput = document.getElementById("contract-input");
const contractList = document.getElementById("contract-list");

// --- Functions ---

/**
 * Creates the HTML structure for a single contract item.
 * @param {string} text - The description of the contract.
 * @param {boolean} isCompleted - Whether the contract is initially completed.
 * @returns {HTMLLIElement} The created list item element.
 */
const createContractElement = (text, isCompleted = false) => {
  const listItem = document.createElement("li");
  listItem.classList.add("contract-item");
  if (isCompleted) {
    listItem.classList.add("completed");
  }

  // Contract Text
  const contractText = document.createElement("span");
  contractText.textContent = text;

  // Action Buttons Container
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("contract-actions");

  // Complete Button (Mark as Fulfilled)
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.setAttribute("aria-label", "Mark contract as fulfilled");
  completeButton.title = "Mark as Fulfilled"; // Tooltip

  // Delete Button (Abandon Contract)
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.setAttribute("aria-label", "Abandon contract");
  deleteButton.title = "Abandon Contract"; // Tooltip

  // Assemble the list item
  actionsDiv.appendChild(completeButton);
  actionsDiv.appendChild(deleteButton);
  listItem.appendChild(contractText);
  listItem.appendChild(actionsDiv);

  return listItem;
};

/**
 * Adds a new contract to the list and saves to Local Storage.
 * @param {string} text - The contract description.
 */
const addContract = (text) => {
  if (!text.trim()) return; // Don't add empty contracts

  const newContract = createContractElement(text);
  contractList.appendChild(newContract);
  saveContracts(); // Save after adding
};

/**
 * Toggles the completion status of a contract item.
 * @param {Event} event - The click event object.
 */
const toggleContractComplete = (event) => {
  const item = event.target.closest(".contract-item");
  if (item) {
    item.classList.toggle("completed");
    saveContracts(); // Save after toggling
  }
};

/**
 * Deletes a contract item from the list.
 * @param {Event} event - The click event object.
 */
const deleteContract = (event) => {
  const item = event.target.closest(".contract-item");
  if (item) {
    // Optional: Add a confirmation dialog
    // if (confirm("Are you sure you want to abandon this contract?")) {
    item.remove();
    saveContracts(); // Save after deleting
    // }
  }
};

/**
 * Saves the current list of contracts to Local Storage.
 */
const saveContracts = () => {
  const contracts = [];
  contractList.querySelectorAll(".contract-item").forEach((item) => {
    const text = item.querySelector("span").textContent;
    const isCompleted = item.classList.contains("completed");
    contracts.push({ text, completed: isCompleted });
  });
  localStorage.setItem("witcherContracts", JSON.stringify(contracts));
};

/**
 * Loads contracts from Local Storage when the page loads.
 */
const loadContracts = () => {
  const savedContracts = localStorage.getItem("witcherContracts");
  if (savedContracts) {
    const contracts = JSON.parse(savedContracts);
    contracts.forEach((contract) => {
      const contractElement = createContractElement(
        contract.text,
        contract.completed,
      );
      contractList.appendChild(contractElement);
    });
  }
};

// --- Event Listeners ---

// Handle form submission
contractForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page reload
  addContract(contractInput.value);
  contractInput.value = ""; // Clear the input field
});

// Handle clicks within the contract list (for complete/delete)
// Uses event delegation for efficiency
contractList.addEventListener("click", (event) => {
  if (event.target.classList.contains("complete-btn")) {
    toggleContractComplete(event);
  } else if (event.target.classList.contains("delete-btn")) {
    deleteContract(event);
  }
});

// Load contracts when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadContracts);
