class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    document.addEventListener("addTask", this.handleAddTask.bind(this));
    document.addEventListener("taskAdded", this.handleTaskAdded.bind(this));
    document.addEventListener("deleteTask", this.handleDeleteTask.bind(this));
    document.addEventListener("updateTask", this.handleUpdateTask.bind(this));
    document.addEventListener("updateFilter", this.handleFilter.bind(this));

    this.view.displayTasks(this.model.getTasks());
  }

  handleAddTask(event) {
    const { taskText, taskCategory } = event.detail;
    this.model.addTask(taskText, taskCategory);
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
    const { taskId, newText, newCategory } = event.detail;
    this.model.updateTask(taskId, newText, newCategory);
  }
  

  handleFilter(event) {
    const category_filtered = event.detail;
    this.model.updateFilter(category_filtered);
    this.view.displayTasks(this.model.getTasks());
  }

}

const model = new TaskModel();
const view = new TaskView();
const controller = new TaskController(model, view);
