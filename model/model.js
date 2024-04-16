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
    }
  
    getTasks() {
      return this.tasks;
    }
  }
  