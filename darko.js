let main = document.querySelector(".darko-main");
let formBtn = document.querySelector('button[type="submit"]');
let formInput = document.querySelector('form input[type="text"]');
let unorderedList = document.querySelector('ul');


let todoArr = [
  {

    task: "Complete homework",
    completed: false,
  },
  {

    task: "Go to the gym",
    completed: true,
  },
  {

    task: "Read a book",
    completed: false,
  },
];


let addtoLocalStorage = () => {
  let stringifyTodo = JSON.stringify(todoArr);
  localStorage.setItem('todo', stringifyTodo)
}

let loadFromLocalStorage = () => {
  let localStorageContent = JSON.parse(localStorage.getItem('todo'));
  if (localStorageContent) {
    todoArr = localStorageContent
  } else {
    todoArr = [];
  }
  render();
}





let addTask = (event) => {
  event.preventDefault();
  let todoTaskFromInput = formInput.value;

  if (todoTaskFromInput) {
    unorderedList.innerHTML = '';
    
    todoArr.push({ task: todoTaskFromInput, completed: false })
    addtoLocalStorage();
    render();
  } else {
    alert('please enter some Task')
  }
 
  formInput.value = '';
};

let deleteTask = (li, todo) => {
  let currentCheckBox = li.querySelector('input[type="checkbox"]');
  console.log(todo.task)
  if (currentCheckBox.checked) {
    todoArr = todoArr.filter(x => todo.task !== x.task);
    addtoLocalStorage();
    unorderedList.removeChild(li)
  }
}

let createTodo = todo => {
  let todoList = document.createElement("li");
  let actionButtonWrapper = document.createElement("div");
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const todoTask = document.createElement('p');
  todoTask.classList.add('task-value')
  const deleteButton = document.createElement('button',);
  deleteButton.classList.add('delete-btn');
  const updateButton = document.createElement('button');
  updateButton.classList.add('update-btn');
  todoTask.textContent = todo.task;
  deleteButton.textContent = 'Delete';
  updateButton.textContent = 'Update';
  deleteButton.addEventListener("click", () => deleteTask(todoList,todo))
  updateButton.addEventListener('click',() => editTask(todoList, todoTask, updateButton, todo))
  todoList.setAttribute('class', 'todo-list');
  todoList.append(checkbox)
  todoList.append(todoTask)
  todoList.append(actionButtonWrapper);
  //actionButtonWrapper
  todoList.append(updateButton)
  //actionButtonWrapper
  todoList.append(deleteButton);

let editTask = (li,todoTask, updateButton, todo) =>{
  let currentCheckBox = li.querySelector('input[type="checkbox"]');

if(currentCheckBox.checked){
  const doneButton = document.createElement('button');
  
  const editTaskInput = document.createElement('input');
  doneButton.textContent = 'Done';
  doneButton.classList.add('done-btn')
  editTaskInput.type = 'text';
  editTaskInput.value = todoTask.textContent;
  editTaskInput.setAttribute('class','done-btn');
  doneButton.addEventListener('click', () => {
    const newTask = editTaskInput.value;
    const oldTask = todo.task;
    todoTask.textContent = newTask;
    todoArr = todoArr.map(x=>{
      if (x.task === oldTask) {
        return { ...x, task: newTask };
        // return { title: newTitle, isRead: b.isRead, date: b.date };
      } else {
        return x;
      }
    })
    addtoLocalStorage();
   
    li.replaceChild(todoTask, editTaskInput);
    li.replaceChild(updateButton, doneButton);
  })
  li.replaceChild(editTaskInput,todoTask);
  li.replaceChild(doneButton,updateButton);
}

}
  return todoList
}

const render = () => {
  unorderedList.innerHtml = '';
console.log(unorderedList)
  todoArr.forEach(x => {
    let list = createTodo(x);
    unorderedList.append(list)
  });
}

formBtn.addEventListener("click", addTask);

loadFromLocalStorage();