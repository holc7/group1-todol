const todoInput = document.getElementById("todoInput");
const isImportant = document.getElementById("isImportant");
const todoList = document.getElementById("todo-list");
const addButton = document.getElementById("addButton");
const todoForm = document.querySelector('.add-todo-form')
let todos = [];

const loadFromLocalStorage = (() => {
    const parsedData = JSON.parse(localStorage.getItem("todos"));

    todos = parsedData ? parsedData : [];

    render();
});

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const addToDo = (event) => {
    event.preventDefault();

    //set background color based on importance
    const backgroundColor = isImportant.checked ? "#9A031E" : "";

    const todoText = todoInput.value.trim();
    if (todoText !== "") {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div style="background-color:${backgroundColor}">
            <span>${todoText}</span>
            <button class="delete">Delete</button>
            <button class="update">Update</button>
            <button class="complete">Complete</button>
            </div>
        `;
        todoList.appendChild(listItem);

        todos.push({
            text: todoText,
            isImportant: isImportant.checked,
            completed: false,
        });

        saveToLocalStorage();
    }
    render();
    event.target.reset();
};

const deleteToDo = (index) => {
    todos.splice(index, 1);
    saveToLocalStorage();
    render();
};

const updateToDo = (index) => {
    const updatedText = prompt("Enter updated text:");
    if (updatedText !== null) {
        todos[index].text = updatedText;
        saveToLocalStorage();
        render();
    }
};

const completeToDo = (index) => {
    todos[index].completed = true;
    saveToLocalStorage();
    render();
};

const render = (() => {
    todoList.innerHTML = ""; // Clear the list before rendering

    todos.forEach((todo, index) => {
        const backgroundColor = todo.isImportant ? "#9A031E" : "";
        const completedClass = todo.completed ? "completed" : "";

        const listItem = document.createElement("li");
        listItem.className = completedClass; 
        listItem.innerHTML = `
            <div style="background-color:${backgroundColor}">
            <span>${todo.text}</span>
            <button class="delete" onclick="deleteToDo(${index})">Delete</button>
            <button class="update" onclick="updateToDo(${index})">Update</button>
            <button class="complete" onclick="completeToDo(${index})">Complete</button>
            </div>
        `;
        todoList.appendChild(listItem);
    });
});

todoForm.addEventListener("submit", addToDo);

loadFromLocalStorage();
