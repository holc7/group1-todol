document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.querySelector(".add");
  const searchField = document.getElementById("search-field");
  const modal = new bootstrap.Modal(document.getElementById("solutionModal9"));
  const tasksContainer = document.querySelector('.to-do-container');
  const badgeCounter = document.querySelector(".btn-neuro-c");
  const lottieAnimation = document.getElementById('lottie-task-animation');

  let modalLottieInstance = null; // Define a variable to hold the modal lottie instance
  let tasksList = []; // Initialize tasksList array

  // Function to save tasks to local storage and update task count
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
    updateTaskCount(); // Update count after saving
  }

  // Function to render tasks
  function renderTasks() {
    tasksContainer.innerHTML = '';
    tasksList.forEach((taskObject, index) => {
      addTaskElementToDOM(taskObject.title, index);
    });
    updateTaskCount();
  }

  // Function to create and add a task element to the DOM
  function addTaskElementToDOM(task, index) {
    const taskElement = document.createElement("li");
    taskElement.className = 'to-do-list-item d-flex justify-content-around align-items-center';
    taskElement.innerHTML = `
      <p class="mb-0 w-75 task-text" contenteditable="true">${task}</p>
      <div class="to-do-confirm mx-4">
        <button class="confirm"><i class="fas fa-check"></i></button>
      </div>
      <div class="to-do-delete">
        <button class="delete"><i class="fas fa-trash"></i></button>
      </div>`;
    tasksContainer.appendChild(taskElement);
    setTimeout(() => {
      taskElement.classList.add("open");
    }, 0);
  
    // Add event listener for blur event on task text
    const taskText = taskElement.querySelector('.task-text');
    taskText.addEventListener('blur', () => {
      tasksList[index].title = taskText.textContent; // Update task title in tasksList array
      saveTasksToLocalStorage(); // Save updated tasksList to local storage
    });
  }

  // Function to add a new task to the list
  function addTask(title) {
    const newTask = { title: title };
    tasksList.push(newTask);
    addTaskElementToDOM(newTask.title, tasksList.length -1); // Add the new task to DOM
    saveTasksToLocalStorage();
    updateTaskCount();
  }

  // Function to update the visibility of the Lottie animation based on task count
  function updateLottieVisibility() {
    lottieAnimation.style.display = badgeCounter.textContent.trim() === '0' ? 'block' : 'none';
  }

  // Function to update the task count display
  function updateTaskCount() {
    const taskItems = tasksContainer.getElementsByClassName('to-do-list-item');
    badgeCounter.textContent = taskItems.length.toString();
    updateLottieVisibility();
  }

  // Event listener for adding a task through the add button
  addButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const taskValue = searchField.value.trim();
    if (taskValue === "") {
      modal.show();
    } else {
      addTask(taskValue); // Add the task to the list
      searchField.value = ""; // Clear the search field
    }
  });

  // Event listener for keypress on search field to add task on enter key press
  searchField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addButton.click(); // Trigger add button click on enter key press
    }
  });

  // Event listener for task actions like confirm and delete
  tasksContainer.addEventListener("click", (event) => {
    const taskItem = event.target.closest(".to-do-list-item"); // Find the closest task item
    if (!taskItem) return; // If no task item is found, exit the function

    // Handle delete action
    if (event.target.matches(".delete") || event.target.matches(".delete i")) {
      const taskIndex = tasksList.findIndex(task => task.title === taskItem.querySelector("p").textContent.trim());
      if (taskIndex > -1) {
        tasksList.splice(taskIndex, 1); // Remove task from the list
        taskItem.classList.add("closing"); // Add closing animation
      }
    }
    // Handle confirm action
    else if (event.target.matches(".confirm") || event.target.matches(".confirm i")) {
      taskItem.classList.toggle("task-completed"); // Toggle completion state
    }
  });

  // Event listener for the end of task deletion animation
  tasksContainer.addEventListener('animationend', (event) => {
    if (event.target.classList.contains("closing")) {
      event.target.remove(); // Remove task from DOM after animation ends
      saveTasksToLocalStorage(); // Save the updated list to local storage
      updateTaskCount(); // Update the task count display
    }
  });

  // Function to load tasks from local storage on page load
  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasksList = JSON.parse(storedTasks); // Parse stored tasks into tasksList
      renderTasks(); // Render tasks after loading
    }
  }
  loadTasksFromLocalStorage(); // Call loadTasksFromLocalStorage on page load

  // Modal animation listeners
  document.getElementById('solutionModal9').addEventListener('show.bs.modal', function() {
    if (!modalLottieInstance) {
      modalLottieInstance = lottie.loadAnimation({
        container: document.getElementById('lottie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/0714e61a-188f-4ded-aca4-6bab01248610/sUDzkr4sf2.json'
      });
    } else {
      modalLottieInstance.goToAndPlay(0);
    }
  });

  document.getElementById('solutionModal9').addEventListener('hide.bs.modal', function() {
    if (modalLottieInstance) {
      modalLottieInstance.stop();
    }
  });

  // Load the Lottie animation for tasks
  lottie.loadAnimation({
    container: lottieAnimation,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/89e0610a-b1f0-4788-a6d2-6ea7211c7e16/BAMgOQxRC3.json'
  });

  // Initialize the task count and Lottie visibility
  updateTaskCount();
});
