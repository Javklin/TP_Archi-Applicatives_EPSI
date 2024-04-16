class TaskModel {

    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
  
    addTask(taskText) {
      const task = {
        id: Date.now(), 
        createdAt: new Date().toISOString(),
        text: taskText,
      };

      this.tasks.push(task);
  
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      
      const taskAddedEvent = new CustomEvent('taskAdded', { detail: task });
      document.dispatchEvent(taskAddedEvent);
    }
  
    getTasks() {
      return this.tasks;
    }
  }
  