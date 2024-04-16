class TaskModel {

  constructor() {
    if (TaskModel.instance) {
      return TaskModel.instance;
    }
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    TaskModel.instance= this;
  }

  addTask(taskText, taskCategory) {
    const task = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      text: taskText,
      category: taskCategory,
    };
    this.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    const taskAddedEvent = new CustomEvent("taskAdded", { detail: task });
    document.dispatchEvent(taskAddedEvent);
  }

  deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex((task) => task.id == taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  updateTask(taskId, newText, newCategory) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToUpdate = tasks.find((task) => task.id == taskId);
    if (taskToUpdate) {
      taskToUpdate.text = newText;
      taskToUpdate.category= newCategory;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }
  }

  getTasks() {
    return this.tasks;
  }
}
