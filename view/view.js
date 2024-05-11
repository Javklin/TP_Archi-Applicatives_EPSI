class TaskView {
  constructor() {
    this.taskList = document.getElementById("taskList");
    this.taskInput = document.getElementById("taskInput");
    this.taskForm = document.getElementById("taskForm");
    this.taskCategory = document.getElementById("prioritySelect");
    this.taskForm.addEventListener(
      "submit",
      this.handleTaskFormSubmit.bind(this)
    );
  }

  // sera redéfinit dans chaque class fille et on créera 3 instance des classes filles
  displayTasks(tasks) {
    const lowTaskView = new LowTaskView ();
    const mediumTaskView = new MediumTaskView ();
    const highTaskView = new HighTaskView ();
    highTaskView.displayTasks(tasks);
    mediumTaskView.displayTasks(tasks);
    lowTaskView.displayTasks(tasks);

  }

  handleTaskFormSubmit(event) {
    event.preventDefault();
    const taskText = this.taskInput.value.trim();
    const taskCategory = this.taskCategory.value.trim();
    if (taskText !== "" && taskCategory !== "" ) {
      const addTaskEvent = new CustomEvent("addTask", {detail: { taskText, taskCategory } });
      document.dispatchEvent(addTaskEvent);
      this.taskInput.value = "";
    }
  }
}

const taskView = new TaskView();
