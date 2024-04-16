class TaskView {
    constructor() {
      this.taskList = document.getElementById('taskList');
  
      this.taskInput = document.getElementById('taskInput');
      this.taskForm = document.getElementById('taskForm');
  
      this.taskForm.addEventListener('submit', this.handleTaskFormSubmit.bind(this));
    }
  
      displayTasks(tasks) {
        this.taskList.innerHTML = '';
        tasks.forEach(task => {
          const li = document.createElement('li');
      
          const input = document.createElement('input');
          input.type = 'text';
          input.value = task.text;
      
          const saveButton = document.createElement('button');
          saveButton.textContent = 'Sauvegarder changement';
          saveButton.addEventListener('click', () => {
            const newText = input.value;
            const taskId = task.id;
            const updateTaskEvent = new CustomEvent('updateTask', { detail: { taskId, newText } });
            document.dispatchEvent(updateTaskEvent);
          });
      
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Supprimer';
          deleteButton.addEventListener('click', () => {
            const taskId = task.id;
            const deleteTaskEvent = new CustomEvent('deleteTask', { detail: taskId });
            document.dispatchEvent(deleteTaskEvent);
          });
      
          li.textContent = `ID: ${task.id} - Date de création: ${task.createdAt} `;
          li.appendChild(input);
          li.appendChild(saveButton);
          li.appendChild(deleteButton);
          this.taskList.appendChild(li);
        });
      }
  
    handleTaskFormSubmit(event) {
      event.preventDefault(); 
      const taskText = this.taskInput.value.trim(); 
  
      if (taskText !== '') {
        const addTaskEvent = new CustomEvent('addTask', { detail: taskText });
        document.dispatchEvent(addTaskEvent);
        this.taskInput.value = '';
      }
    }
  }
  
  const taskView = new TaskView();
  