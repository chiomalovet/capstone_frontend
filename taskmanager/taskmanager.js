document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
  
    // Load all tasks from the backend
    async function loadTasks() {
      try {
        const response = await fetch("http://localhost:8000/api/tasks/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const tasks = data.message; 
        console.log("Fetched tasks:", tasks);
        renderTasks(tasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    }
    
    // Render tasks to the DOM
    function renderTasks(tasks) {
      const tasksContainer = document.getElementById("tasks");
      tasksContainer.innerHTML = "";
      tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = `task-item ${task.priority}`;
        taskDiv.innerHTML = `
          <div>
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <small>Due: ${task.deadline}</small>
            <div>
              <label>
                <input type="checkbox" class="task-completed" data-id="${task._id}" ${
          task.completed ? "checked" : ""
        } /> Completed
              </label>
            </div>
          </div>
          <button class="edit-btn" data-id="${task._id}">Edit</button>
          <button class="delete-btn" data-id="${task._id}">Delete</button>
        `;
        tasksContainer.appendChild(taskDiv);
      });
  
      
      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
          const taskId = event.target.dataset.id;
          await deleteTask(taskId);
        });
      });
  
      const editButtons = document.querySelectorAll(".edit-btn");
      editButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
          const taskId = event.target.dataset.id;
          await editTask(taskId);
        });
      });
  
      const completedCheckboxes = document.querySelectorAll(".task-completed");
      completedCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", async (event) => {
          const taskId = event.target.dataset.id;
          const completed = event.target.checked;
          await updateTaskCompletion(taskId, completed);
        });
      });
    }
  
    // Create a new task
    async function createTask(event) {
      event.preventDefault();
      const title = document.getElementById("task-title").value;
      const description = document.getElementById("task-desc").value;
      const deadline = document.getElementById("task-deadline").value;
      const priority = document.getElementById("task-priority").value;
      const completed = document.getElementById("task-completed").checked;
  
      try {
        const response = await fetch("http://localhost:8000/api/tasks/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description, deadline, priority, completed }),
        });
  
        if (response.ok) {
          console.log("Task created successfully");
          loadTasks();
        } else {
          console.error("Failed to create task");
        }
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  
    // Delete a task
    async function deleteTask(taskId) {
      try {
        const response = await fetch("http://localhost:8000/api/tasks/${taskId}", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.ok) {
          console.log("Task deleted successfully");
          loadTasks();
        } else {
          console.error("Failed to delete task");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  
    // Update a task's completion status
    async function updateTaskCompletion(taskId, completed) {
      try {
        const response = await fetch("http://localhost:8000/api/tasks/${taskId}", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completed }),
        });
  
        if (response.ok) {
          console.log("Task completion status updated successfully");
          loadTasks();
        } else {
          console.error("Failed to update task completion status");
        }
      } catch (error) {
        console.error("Error updating task completion status:", error);
      }
    }
  
    
  
  
  
    async function editTask(task_id) {
      
      const title = prompt("Enter the new title for the task:");
      const description = prompt("Enter the new description for the task:");
      const deadline = prompt("Enter the new deadline (YYYY-MM-DD):");
      const priority = prompt("Enter the new priority (low, medium, high):");
      const completed = confirm("Is the task completed? Click 'OK' for true, 'Cancel' for false."); 
    
      
      if (!title || !description || !deadline || !priority || !completed) {
        alert("All fields are required. Please fill them out correctly.");
        return;
      }
    
      const validPriority = ["low", "medium", "high"];
      if (!validPriority.includes(priority)) {
        alert("Invalid priority. Allowed values are: low, medium, high.");
        return;
      }
    
      try {
        const response = await fetch("http://localhost:8000/api/tasks/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
          body: JSON.stringify({
            task_id,
            title,
            description,
            deadline,
            priority,
            completed, 
          }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          alert(data.message);
          loadTasks(); 
        } else {
          console.error(data.message || "Failed to edit task");
          alert(data.message || "Failed to edit task");
        }
      } catch (error) {
        console.error("Error editing task:", error);
        alert("An error occurred while editing the task. Please try again.");
      }
    }
    
  
    
    document.getElementById("task-form").addEventListener("submit", createTask);
  
    loadTasks();
  });