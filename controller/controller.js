class TaskController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      document.addEventListener('addTask', this.handleAddTask.bind(this));
      document.addEventListener('taskAdded', this.handleTaskAdded.bind(this));
      document.addEventListener('deleteTask', this.handleDeleteTask.bind(this));
      document.addEventListener('updateTask', this.handleUpdateTask.bind(this));
      
      this.view.displayTasks(this.model.getTasks());
    }
  
    handleAddTask(event) {
      const taskText = event.detail;
      this.model.addTask(taskText);
    }
  
    handleTaskAdded(event) {
      const task = event.detail;
      this.view.displayTasks(this.model.getTasks());
    }

    handleDeleteTask(event) {
        this.model.deleteTask(event.detail);
        this.view.displayTasks(this.model.getTasks());
      }
      
    handleUpdateTask(event) {
        const { taskId, newText } = event.detail; 
        this.model.updateTask(taskId,newText);
    }

  }
  
  const model = new TaskModel();
  const view = new TaskView();
  const controller = new TaskController(model, view);
  