document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const list = document.getElementById("taskList");

  // Step 1: Load tasks from Local Storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Step 2: Function to save tasks
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Step 3: Function to display tasks
  function displayTasks() {
    list.innerHTML = ""; // Clear current list

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task + " ";

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", function() {
        tasks.splice(index, 1); // Remove from array
        saveTasks();             // Update Local Storage
        displayTasks();          // Refresh list
      });

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  // Step 4: Add button logic
  addBtn.addEventListener("click", function() {
    const taskText = input.value.trim();
    if (taskText === "") {
      alert("Please enter a task");
      return;
    }
    tasks.push(taskText);   // Add task to array
    saveTasks();            // Save in Local Storage
    displayTasks();         // Update list
    input.value = "";       // Clear input
  });

  // Step 5: Display tasks on page load
  displayTasks();
});