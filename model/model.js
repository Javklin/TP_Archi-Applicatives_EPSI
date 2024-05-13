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



  updateFilter(category_filtered) {
  //on affiche toutes les catégories
  if(category_filtered=="all")  {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  }
  //on affiche les catégories travail
  if(category_filtered=="low")  {
    this.tasks = (JSON.parse(localStorage.getItem("tasks")) || []).filter(task => task.category == "low");
  }
  //on affiche les catégories maison
  if(category_filtered=="medium")  {
    this.tasks = (JSON.parse(localStorage.getItem("tasks")) || []).filter(task => task.category == "medium");
  }

  //on affiche les catégories divers
  if(category_filtered=="high")  {
    this.tasks = (JSON.parse(localStorage.getItem("tasks")) || []).filter(task => task.category == "high");
  }


  }

  getTasks() {
    return this.tasks;
  }
}
