/* Global Variables */
const myInput = document.querySelector('.todo-container .add-task input'),
      tasksContainer = document.querySelector('.todo-container .tasks-box'),
      noTasksMsg = document.querySelector('.todo-container .tasks-box .no-tasks-message');


/* Helper Functions */
function getFromStorage() {
  Object.keys(localStorage).forEach(key => {
    key.slice(0, 4) === 'task' && addTask(localStorage[key], key);
  });
}
function removeFromStorage() {
  localStorage.removeItem('completed');
  Object.keys(localStorage).forEach(key => key.slice(0, 4) === 'task' && localStorage.removeItem(key));
}

function addClass(targets, className='active') {
  targets.forEach(target => target.classList.add(className));
}
function removeClass(targets, className='active') {
  targets.forEach(target => target.classList.remove(className));
}

function tasksCounter() {
  const tasksControls = document.querySelectorAll('.todo-container .tasks-controls button'),
        spanCounter = document.querySelector('.todo-container .tasks-stats .tasks-counter span');

  spanCounter.textContent = document.querySelectorAll('.todo-container .tasks-box .task').length;
  if (spanCounter.textContent == 0) {
    tasksContainer.appendChild(noTasksMsg);
    removeClass(tasksControls);
  }
  else {
    addClass(tasksControls);
  }
}
function completedTasksCounter() {
  const completeAllBtn = document.querySelector('.todo-container .tasks-controls .complete-all'),
        completedSpanCounter = document.querySelector('.todo-container .tasks-stats .completed-tasks span');

  completedSpanCounter.textContent = document.querySelectorAll('.todo-container .tasks-box .task.completed').length;
  completedSpanCounter.textContent === document.querySelector('.todo-container .tasks-stats .tasks-counter span').textContent
    ? completeAllBtn.classList.remove('active')
    : completeAllBtn.classList.add('active');  
}

function removeAll() {
  document.querySelectorAll('.todo-container .tasks-box .task').forEach(ele => ele.remove());
  completedTasksCounter();
  tasksCounter();
  removeFromStorage();
}
function completeAll(e) {
  addClass(document.querySelectorAll('.todo-container .tasks-box .task'), 'completed');
  e.classList.remove('active');
  completedTasksCounter();

  let completedStorage = [];
  document.querySelectorAll('.tasks-box .task.completed').forEach(task => {
    completedStorage.push(task.textContent.substr(6));
    localStorage.setItem('completed', completedStorage);
  });
}

function addTask(value, key='') {
  const mainDiv = document.createElement('div'),
        deleteButton = document.createElement('span');

  // Adding the delete button to the mainDiv
  deleteButton.appendChild(document.createTextNode('Delete'));
  deleteButton.className = 'delete';
  mainDiv.appendChild(deleteButton);

  // Adding the mainDiv to the tasksContainer & to the localStorage
  mainDiv.appendChild(document.createTextNode(value));
  mainDiv.className = 'task';
  noTasksMsg.remove();
  tasksContainer.appendChild(mainDiv);
  mainDiv.dataset.storageKey = key;
  localStorage.completed !== undefined && localStorage.completed.split(',').forEach(val => val === localStorage[key] && mainDiv.classList.add('completed'));

  // Final touch
  myInput.focus();
  tasksCounter();
  completedTasksCounter();
}

const handleAdding = () => {
  let adding = true,
      taskText = myInput.value;

  // Check if the input field is empty
  if (taskText === '') {
    swal('Please add the task', '', 'error'); // Sweet Alert
    adding = false;
    myInput.focus();
  }

  // Check if the task contains ","
  if (taskText.match(',')) {
    swal('Task value can\'t contains ","', '', 'warning');
    adding = false;
    myInput.focus();
  }

  // Check if the task is already exist
  document.querySelectorAll('.todo-container .tasks-box .task').forEach(text => {
    if (taskText === text.textContent.substr(6)) {
      swal('This Task is already exist', '', 'warning');
      adding = false;
      myInput.focus();
    }
  });

  // Check if any warning exist
  if (document.querySelector('.swal-overlay--show-modal') !== null) {
    adding = false;
    document.querySelector('.swal-overlay--show-modal button').focus();
  }

  // Adding the tasks
  if (adding) {
    addTask(taskText);
    myInput.value = '';
    tasksContainer.lastElementChild.dataset.storageKey = `task${Math.floor(Math.random() * 100000000000000)}`;
    localStorage.setItem(tasksContainer.lastElementChild.dataset.storageKey, taskText);
  }
};


/* Events to add & delete & complete Tasks */

// [1] Adding Tasks
window.onload = getFromStorage;
myInput.onkeyup = (e) => {e.keyCode === 13 && handleAdding()}
document.querySelector('.todo-container .add-task .add').onclick = handleAdding;


document.addEventListener('click', (e) => {
  // [2] Deleting Tasks
  if (e.target.className == 'delete') {
    localStorage.removeItem(e.target.parentNode.dataset.storageKey);
    e.target.parentNode.remove();
    tasksCounter();
    completedTasksCounter();
  }

  // [3] Completing Tasks
  if (e.target.classList.contains('task')) {
    e.target.classList.toggle('completed');
    localStorage.removeItem('completed');
    completedTasksCounter();
    
    let completedStorage = [];
    document.querySelectorAll('.tasks-box .task.completed').forEach(task => {
      completedStorage.push(task.textContent.substr(6));
      localStorage.setItem('completed', completedStorage);
    });
  }
});