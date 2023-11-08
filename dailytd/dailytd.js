document.addEventListener('DOMContentLoaded', () => {
    
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTask');
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');

     // Check if the user has already accepted cookies
     if (localStorage.getItem('cookiesAccepted') === 'true') {
        cookieBanner.style.display = 'none';
    }

    acceptCookiesBtn.addEventListener('click', () => {
        // Set a localStorage flag to indicate that the user has accepted cookies
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
    });
    
    // Function to load tasks from local storage
    const loadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(taskText => {
            const listItem = createTaskItem(taskText);
            taskList.appendChild(listItem);
        });
    };

    const createTaskItem = (taskText) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-around align-items-center';
        
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.className = 'form-control text-black fs-6 border-primary-subtle w-auto bg-primary-subtle bg-gradient p-2';
        
        
        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.value = taskText;
        taskInput.className = 'form-control w-50 p-1 fs-4';
        taskInput.disabled = true;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input p-3 shadow-sm ';

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'btn btn-primary edit-btn py-2 px-3';

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'btn btn-danger delete-btn p-2 px-3';

        listItem.appendChild(checkbox);
        listItem.appendChild(timeInput);
        listItem.appendChild(taskInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    };

    // Load tasks from local storage during page load
    loadTasks();

    const saveTasksToLocalStorage = () => {
        const tasks = Array.from(taskList.children).map(item => item.querySelector('input[type="text"]').value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            return;
        }

        const listItem = createTaskItem(taskText);
        taskList.appendChild(listItem);
        taskInput.value = '';

        // Save tasks to local storage whenever a new task is added
        saveTasksToLocalStorage();

        // Event listener for checkbox change
        const checkbox = listItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
        });
    };


    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (event) => {
        const { target } = event;
        const listItem = target.closest('.list-group-item');
        if (target.classList.contains('edit-btn')) {
            const taskInput = listItem.querySelector('input[type="text"]');
            const editButton = listItem.querySelector('.edit-btn');
            if (taskInput.disabled) {
                taskInput.disabled = false;
                editButton.innerText = 'Done';
                editButton.className = 'btn btn-success edit-btn';
                taskInput.focus();
            } else {
                taskInput.disabled = true;
                editButton.innerText = 'Edit';
                editButton.className = 'btn btn-primary edit-btn';
                taskInput.focus(); // Set focus back to the input after editing
            }
        } else if (target.classList.contains('delete-btn')) {
            listItem.remove();
        }
        saveTasksToLocalStorage();
    });
    
});
