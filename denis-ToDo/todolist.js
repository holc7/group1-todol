document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.querySelector(".add");
  const searchField = document.getElementById("search-field");
  const modal = new bootstrap.Modal(document.getElementById("solutionModal9"));
  const tasksContainer = document.querySelector('.to-do-container');
  const badgeCounter = document.querySelector(".btn-neuro-c");
  const lottieAnimation = document.getElementById('lottie-task-animation');

  let modalLottieInstance = null; 
  let tasksList = []; 
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
    updateTaskCount(); 
  }

  function renderTasks() {
    tasksContainer.innerHTML = '';
    tasksList.forEach((taskObject, index) => {
      addTaskElementToDOM(taskObject.title, index);
    });
    updateTaskCount();
  }

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
  
    const taskText = taskElement.querySelector('.task-text');
    taskText.addEventListener('blur', () => {
      tasksList[index].title = taskText.textContent;
      saveTasksToLocalStorage(); 
    });
  }

  
  function addTask(title) {
    const newTask = { title: title };
    tasksList.push(newTask);
    addTaskElementToDOM(newTask.title, tasksList.length -1);
    saveTasksToLocalStorage();
    updateTaskCount();
  }


  function updateLottieVisibility() {
    lottieAnimation.style.display = badgeCounter.textContent.trim() === '0' ? 'block' : 'none';
  }

 
  function updateTaskCount() {
    const taskItems = tasksContainer.getElementsByClassName('to-do-list-item');
    badgeCounter.textContent = taskItems.length.toString();
    updateLottieVisibility();
  }

  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const taskValue = searchField.value.trim();
    if (taskValue === "") {
      modal.show();
    } else {
      addTask(taskValue);
      searchField.value = "";
    }
  });

  searchField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addButton.click();
    }
  });

  tasksContainer.addEventListener("click", (event) => {
    const taskItem = event.target.closest(".to-do-list-item");
    if (!taskItem) return;

    if (event.target.matches(".delete") || event.target.matches(".delete i")) {
      const taskIndex = tasksList.findIndex(task => task.title === taskItem.querySelector("p").textContent.trim());
      if (taskIndex > -1) {
        tasksList.splice(taskIndex, 1);
        taskItem.classList.add("closing");
      }
    } else if (event.target.matches(".confirm") || event.target.matches(".confirm i")) {
      taskItem.classList.toggle("task-completed");
    }
  });

  tasksContainer.addEventListener('animationend', (event) => {
    if (event.target.classList.contains("closing")) {
      event.target.remove();
      saveTasksToLocalStorage();
      updateTaskCount();
    }
  });

  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasksList = JSON.parse(storedTasks);
      renderTasks();
    }
  }
  loadTasksFromLocalStorage();

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

  lottie.loadAnimation({
    container: lottieAnimation,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/89e0610a-b1f0-4788-a6d2-6ea7211c7e16/BAMgOQxRC3.json'
  });


  updateTaskCount();
});
