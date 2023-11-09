document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.querySelector(".add");
  const searchField = document.getElementById("search-field");
  const modal = new bootstrap.Modal(document.getElementById("solutionModal9"));
  const tasksContainer = document.querySelector('.to-do-container');
  const badgeCounter = document.querySelector(".btn-neuro-c");
  const lottieAnimation = document.getElementById('lottie-task-animation');

  let modalLottieInstance = null; // Define a variable to hold the modal lottie instance

  // Function to update the visibility of the Lottie animation
  function updateLottieVisibility() {
    if (badgeCounter.textContent.trim() === '0') {
      lottieAnimation.style.display = 'block'; // Show the Lottie animation
    } else {
      lottieAnimation.style.display = 'none'; // Hide the Lottie animation
    }
  }

  function updateTaskCount() {
    const taskItems = tasksContainer.querySelectorAll('.to-do-list-item');
    badgeCounter.textContent = taskItems.length;
    updateLottieVisibility();
  }

  addButton.addEventListener("click", (event) => {
    const taskValue = searchField.value.trim();
    if (taskValue === "") {
      modal.show();
    } else {
      const newTask = document.createElement("li");
      newTask.className = 'to-do-list-item d-flex justify-content-around align-items-center';
      newTask.innerHTML = `
        <p class="mb-0 w-75">${taskValue}</p>
        <div class="to-do-confirm mx-4">
          <button class="confirm"><i class="fas fa-check"></i></button>
        </div>
        <div class="to-do-delete">
          <button class="delete"><i class="fas fa-trash"></i></button>
        </div>`;
      tasksContainer.appendChild(newTask);
      searchField.value = "";

      void newTask.offsetWidth;
  
      newTask.classList.add("open");
      updateTaskCount();
    }
  });

  // Listen for the modal being opened to manage the lottie animation
  document.getElementById('solutionModal9').addEventListener('show.bs.modal', function () {
    // Only create a Lottie instance if it doesn't exist
    if (!modalLottieInstance) {
      modalLottieInstance = lottie.loadAnimation({
        container: document.getElementById('lottie'), // the correct ID of the modal container
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/0714e61a-188f-4ded-aca4-6bab01248610/sUDzkr4sf2.json'
      });
    } else {
      modalLottieInstance.goToAndPlay(0); // Restart the animation from frame 0
    }
  });

  // Listen for the modal being closed to stop the lottie animation
  document.getElementById('solutionModal9').addEventListener('hide.bs.modal', function () {
    if (modalLottieInstance) {
      modalLottieInstance.stop(); // Stop the animation when modal is closed
    }
  });

  // Handler for task item actions (confirm/delete)
  tasksContainer.addEventListener("click", (event) => {
    if (event.target.closest(".delete")) {
      const taskToDelete = event.target.closest("li");
      taskToDelete.classList.add("closing")
      taskToDelete.addEventListener('animationend', function() {
        tasksContainer.removeChild(taskToDelete);
        updateTaskCount();
      });
    }
  });

  tasksContainer.addEventListener("click", (event) => {
    if (event.target.closest(".confirm")) {
      const taskItems = event.target.closest(".to-do-list-item");
      taskItems.classList.toggle("task-completed")
      tasksContainer.removeChild(taskToDelete)
      updateTaskCount();
    }
  })

  // Load the Lottie animation for tasks when DOM is fully loaded
  lottie.loadAnimation({
    container: lottieAnimation, // the correct ID of the container for task animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/89e0610a-b1f0-4788-a6d2-6ea7211c7e16/BAMgOQxRC3.json'
  });

  // Initialize the task count and Lottie visibility
  updateTaskCount();
});
$(document).ready(function() {
  // Handle click event on the calendar icon
  $(".calendar-icon").click(function() {
      // Show the modal when the icon is clicked
      $("#calendar-modal").removeClass("hidden");

      // Initialize the datepicker within the modal
      $("#calendar-modal .modal-content").datepicker({
          // Your datepicker options here
      });
  });
});
