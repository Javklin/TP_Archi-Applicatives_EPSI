class TaskView {
  constructor() {
    this.taskList = document.getElementById("taskList");
    this.taskInput = document.getElementById("taskInput");
    this.taskForm = document.getElementById("taskForm");
    this.taskForm.addEventListener(
      "submit",
      this.handleTaskFormSubmit.bind(this)
    );
  }

  displayTasks(tasks) {
    this.taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.id = `input_${task.id}`;
      const saveButton = document.createElement("button");
      saveButton.id = `saveButton_${task.id}`;
      saveButton.style.backgroundColor = "green";

      input.addEventListener("input", () => {
        const newText = input.value;
        const saveButton = document.getElementById(`saveButton_${task.id}`);
        const buttonId = `button_${task.id}`;
        if (newText !== task.text) {
          saveButton.style.backgroundColor = "red";
        } else {
          saveButton.style.backgroundColor = "green";
        }
      });

      saveButton.textContent = "Sauvegarder changement";
      saveButton.addEventListener("click", () => {
        const newText = input.value;
        const taskId = task.id;
        const updateTaskEvent = new CustomEvent("updateTask", {
          detail: { taskId, newText },
        });
        document.dispatchEvent(updateTaskEvent);
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.addEventListener("click", () => {
        const taskId = task.id;
        const deleteTaskEvent = new CustomEvent("deleteTask", {
          detail: taskId,
        });
        document.dispatchEvent(deleteTaskEvent);
      });

      const createdAtDate = new Date(task.createdAt);
      const day = createdAtDate.getDate();
      const month = createdAtDate.getMonth() + 1; // Month is zero-based, so we add 1
      const year = createdAtDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      li.textContent = `ID: ${task.id} - Date de création: ${formattedDate} `;
      li.appendChild(input);
      li.appendChild(saveButton);
      li.appendChild(deleteButton);
      this.taskList.appendChild(li);
    });
  }

  handleTaskFormSubmit(event) {
    event.preventDefault();
    const taskText = this.taskInput.value.trim();

    if (taskText !== "") {
      const addTaskEvent = new CustomEvent("addTask", { detail: taskText });
      document.dispatchEvent(addTaskEvent);
      this.taskInput.value = "";
    }
  }
}

const taskView = new TaskView();
