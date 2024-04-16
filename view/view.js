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

  displayTasks(tasks) {
    this.taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      const input = document.createElement("input");
      input.classList.add("form-control");
      input.type = "text";
      input.value = task.text;
      input.id = `input_${task.id}`;
      const saveButton = document.createElement("button");
      saveButton.classList.add("btn", "btn-primary");
      saveButton.id = `saveButton_${task.id}`;
      saveButton.style.backgroundColor = "green";



      saveButton.textContent = "Sauvegarder";
      saveButton.addEventListener("click", () => {
        const newText = input.value;
        const taskId = task.id;
        const updateTaskEvent = new CustomEvent("updateTask", {
          detail: { taskId, newText },
        });
        task.text=newText
        document.dispatchEvent(updateTaskEvent);
        saveButton.style.backgroundColor = "green";    
      });

      input.addEventListener("input", () => {
        const newText = input.value;
        const saveButton = document.getElementById(`saveButton_${task.id}`);
        const buttonId = `button_${task.id}`;
        if (newText !== task.text) {
          saveButton.style.backgroundColor = "orange";
        } else {
          saveButton.style.backgroundColor = "green";     
        }
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-primary");
      deleteButton.textContent = "Supprimer";
      deleteButton.style.backgroundColor = "red"; 
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
      const hour = createdAtDate.getHours();
      const minute = createdAtDate.getMinutes();
      const second = createdAtDate.getSeconds();
      const formattedDate = ` Le ${day}-${month}-${year} à ${hour}h${minute} et ${second}  seconds `;

      li.innerHTML = `ID: ${task.id} <br> ${formattedDate} `;
      li.appendChild(input);
      li.appendChild(saveButton);
      li.appendChild(deleteButton);
      this.taskList.appendChild(li);
    });
  }

  handleTaskFormSubmit(event) {
    event.preventDefault();
    const taskText = this.taskInput.value.trim();
    // TODO on ajoute un type différent de tâche en fonction de la catégorie choisie 
    const taskCategory = this.taskCategory.value.trim();
    if (taskText !== "" && taskCategory !== "" ) {
      const addTaskEvent = new CustomEvent("addTask", {detail: { taskText, taskCategory } });
      document.dispatchEvent(addTaskEvent);
      this.taskInput.value = "";
    }
  }
}

const taskView = new TaskView();
