class MediumTaskView extends TaskView {

    constructor() {        
        super();
    }

    //on redéfinit displayTask pour les taches à basse priorité    
    displayTasks(tasks) {        
        tasks.forEach((task) => {
          if (task.category=="medium")  {          
          const li = document.createElement("li");
          li.classList.add("list-group-item");
          li.style.backgroundColor= "SkyBlue";
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
    
          input.addEventListener("input", () => {
            const newText = input.value;
            const saveButton = document.getElementById(`saveButton_${task.id}`);
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
          const formattedDate = ` Le ${day}/${month}/${year} à ${hour}h${minute} et ${second}  seconds `;
    
          li.innerHTML = `ID: ${task.id} <br> ${formattedDate} `;
          li.appendChild(input);
          li.appendChild(saveButton);
          li.appendChild(deleteButton);
          this.taskList.appendChild(li);
    
          
          const dropdown = document.createElement('select');
    
          const options = [
            { value: 'low', label: 'travail' },
            { value: 'medium', label: 'maison' },
            { value: 'high', label: 'divers' }
          ];
          
    
          options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
    
            if (option.value === task.category) {
              optionElement.selected = true; 
            }
            dropdown.appendChild(optionElement);
          });
          
          dropdown.addEventListener("change", () => {
            const newText = dropdown.value;
            const saveButton = document.getElementById(`saveButton_${task.id}`);
            if (newText != task.category) {
              saveButton.style.backgroundColor = "orange";
            } else {
              saveButton.style.backgroundColor = "green";     
            }
          });
    
          li.appendChild(dropdown)
    
          saveButton.addEventListener("click", () => {
            const newText = input.value;
            const taskId = task.id;
            const newCategory = dropdown.value;
            const updateTaskEvent = new CustomEvent("updateTask", {
              detail: { taskId, newText, newCategory },
            });
            task.text=newText
            task.category=newCategory 
            document.dispatchEvent(updateTaskEvent);
            saveButton.style.backgroundColor = "green";    
          });
        }
        });
    
    }

}