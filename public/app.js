const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

function createTaskListItem(description) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span>${description}</span>
    <button class="delete-button">Delete</button>
  `;
  listItem.querySelector('.delete-button').addEventListener('click', () => {
    deleteTask(listItem);
  });
  return listItem;
}


function addTask(description) {
  const listItem = createTaskListItem(description);
  taskList.appendChild(listItem);
}

function deleteTask(listItem) {
  taskList.removeChild(listItem);
}

addTaskButton.addEventListener('click', () => {
  const description = taskInput.value.trim();
  if (description) {
    addTask(description);
    taskInput.value = ''; 
  }
});
