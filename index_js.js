
const todoForm = document.querySelector('.todo-form');

const todoInput = document.querySelector('.todo-input');

const addBtn = document.querySelector('[type="submit"]');

const todoItemsList = document.querySelector('.todo-items');

const dateToday = document.querySelector('.dateToday');

const clearBtn = document.querySelector('.clear');

const counterTask = document.querySelector('.counterTask');
let time;
let counter = '';
const todos = [];

function creatDataToday() {

const DayToday = document.createElement('div');
    const arrDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let day = new Date().getDay();
    
    DayToday.innerText = `Today is ${arrDay[day]}`;
    DayToday.className = 'DayToday';

const MouthToday = document.createElement('div');
    let YearToday = new Date().getFullYear();
    let mouth = new Date().getMonth();
    let date = new Date().getDate();
    const arrMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',' December']
    MouthToday.innerText = `${arrMonth[mouth]} ${date}, ${YearToday}`;
    MouthToday.className = 'MouthToday';
    time = `${arrMonth[mouth]} ${date}`;

dateToday.appendChild(DayToday);
dateToday.appendChild(MouthToday);

return dateToday;
}

creatDataToday();

todoInput.addEventListener('input',function() {
          addBtn.className ='add-button';  
});

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value); 
    addBtn.className ='opacity';
});

function addTodo(item) {
 
  if (item !== '') {

    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
      date: time
    };

    todos.push(todo);
    addToLocalStorage(todos); 
    todoInput.value = '';
  }
}


function renderTodos(todos) {

  todoItemsList.innerHTML = '';

  todos.forEach(function(item) {

    const checked = item.completed ? 'checked': null;

    const li = document.createElement('li');
 
    li.className ='item todo-item';
  
    li.setAttribute('data-key', item.id);
    
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
            <input type="checkbox" class="checkbox custom-checkbox" id = 'input ${item.id}' ${checked}>
            <label class="title" for = 'input ${item.id}'>${item.name}</label>
            <div class="data">${item.date}</div>
            <button class="delete-button button"></button>
        `;
        todoItemsList.append(li);
    });

}


function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));

  counter = todos.length;
  renderTodos(todos);
  counterTask.innerText = `Tasks ${counter}`;
}


function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
 
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
  counter = todos.length;
  counterTask.innerText = `Tasks ${counter}`;
}

function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
    addToLocalStorage(todos);
}



function deleteTodo(id) {
 
  todos = todos.filter(function(item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}


clearBtn.addEventListener('click', function (){
    todoItemsList.innerHTML= "";
    todos = [];
    localStorage.removeItem('todos');
    counter = 0;
    counterTask.innerText = `Tasks ${counter}`;
});


getFromLocalStorage();


todoItemsList.addEventListener('click', function(event) {

  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});
