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
        li.textContent = task.text;
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
  