const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Function to create a new task list item
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

// Function to add a new task
function addTask(description) {
  const listItem = createTaskListItem(description);
  taskList.appendChild(listItem);
}

// Function to delete a task
function deleteTask(listItem) {
  taskList.removeChild(listItem);
}

addTaskButton.addEventListener('click', () => {
  const description = taskInput.value.trim();
  if (description) {
    addTask(description);
    taskInput.value = ''; // Clear the input field
  }
});
