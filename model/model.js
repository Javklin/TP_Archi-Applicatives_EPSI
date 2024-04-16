class TaskModel {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  addTask(taskText) {
    const task = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      text: taskText,
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

  updateTask(taskId, newText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToUpdate = tasks.find((task) => task.id == taskId);
    if (taskToUpdate) {
      taskToUpdate.text = newText;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }
  }

  getTasks() {
    return this.tasks;
  }
}
