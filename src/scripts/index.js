// import CreateTodoItem from "./classes";
import "../styles/main.scss";
import * as bootstrap from "bootstrap";

const addButton = document.getElementById("add-button");
const container = document.querySelector(".container");
const inputs = document.querySelectorAll(".form-control");
const radioButtons = document.querySelectorAll(".btn-check");
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date-input");

let arrayOfTasks = [];
getTasksFromLocalStorage();

//Check the Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

addButton.onclick = function () {
  let inputsValuesArray = [];

  if (taskInput.value !== "" && dueDateInput.value !== "") {
    inputs.forEach((input) => {
      inputsValuesArray.push(input.value);
    });
    addTasksToArray(inputsValuesArray);
    inputs.forEach((input) => {
      input.value = "";
    });
  } else {
    const alertDiv = document.getElementById("alert");
    alertDiv.style.display = "block";
    setTimeout(() => {
      alertDiv.style.display = "none";
    }, 5000);
  }
};

function addTasksToArray(inputsValuesArray) {
  const newTaskItem = new CreateTodoItem(
    inputsValuesArray[0],
    inputsValuesArray[1],
    inputsValuesArray[2]
  );
  arrayOfTasks.push(newTaskItem);
  addTasksToScreen(arrayOfTasks);
  addTasksToLocalStorage(arrayOfTasks);
}

function addTasksToScreen(arrayOfTasks) {
  container.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    const divTask = document.createElement("div");
    divTask.setAttribute("data-id", task.id);
    divTask.className = "task";

    const divTaskTitle = document.createElement("div");
    divTaskTitle.className = "task-title";
    divTaskTitle.classList.add("editable-text");

    if (task.completed) {
      divTaskTitle.className = "task done";
    }

    divTaskTitle.appendChild(document.createTextNode(`Task: ${task.task}`));

    const spanDel = document.createElement("span");
    spanDel.className = "del";
    spanDel.appendChild(document.createTextNode("Delete"));

    const spanDone = document.createElement("span");
    spanDone.className = "done-task";
    spanDone.appendChild(document.createTextNode("Done"));

    const spanSave = document.createElement("span");
    spanSave.innerText = "Save";
    spanSave.className = "save-task";
    spanSave.style.display = "none"; // Initially, the save button is hidden
    spanSave.onclick = function () {
      saveEditedText(divTaskTitle);
    };

    const spanEdit = document.createElement("span");
    spanEdit.className = "edit-task";
    spanEdit.appendChild(document.createTextNode("Edit"));
    spanEdit.onclick = function (event) {
      editTextTitle(divTaskTitle, event);
    };

    const divTaskDueDate = document.createElement("div");
    const divTaskDescription = document.createElement("div");
    divTaskDescription.classList.add("note");
    divTaskDueDate.appendChild(
      document.createTextNode(`Due Date: ${task.dueDate}`)
    );
    divTaskDueDate.classList.add("due-date");
    divTaskDescription.appendChild(document.createTextNode(task.description));
    // Append Other Task Elements To Title Div
    divTask.appendChild(spanDel);
    divTask.appendChild(spanDone);
    divTask.appendChild(spanEdit);
    divTask.appendChild(spanSave);
    divTask.appendChild(divTaskTitle);
    divTask.appendChild(divTaskDueDate);
    divTask.appendChild(divTaskDescription);
    // Add Task Div To Tasks Container
    container.appendChild(divTask);
  });
}

//Deleting Tasks
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTasksFromStorage(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("done-task")) {
    changeTaskStatus(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.classList.toggle("done");
  }
});

function deleteTasksFromStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  console.log(arrayOfTasks);
  addTasksToLocalStorage(arrayOfTasks);
}

//toggle task status
function changeTaskStatus(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}

//edit title
// function editTextTitle(divTaskTitle, event) {
//   divTaskTitle.contentEditable = true;
//   divTaskTitle.focus();

//   const saveButton = document.querySelectorAll(".save-task");
//   saveButton.forEach((save) => {
//     if (
//       event.target.parentElement.getAttribute("data-id") ===
//       divTaskTitle.parentElement.getAttribute("data-id")
//     ) {
//       save.style.display = "inline";
//     }
//   });
// }

//save changes
// function saveEditedText(divTaskTitle) {
//   const editedText = divTaskTitle.innerText;
//   const saveButton = document.querySelectorAll(".save-task");
//   saveButton.forEach((save) =>
//     addEventListener("click", () => {
//       save.style.display = "none";
//       createNewText(save.parentElement.getAttribute("data-id"), editedText);
//     })
//   );

//   divTaskTitle.contentEditable = false;
// }

//apply changes
function createNewText(taskId, editedText) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].task = editedText;
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}

function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getTasksFromLocalStorage() {
  const data = window.localStorage.getItem("tasks");
  if (data) {
    const tasks = JSON.parse(data);
    addTasksToScreen(tasks);
  }
}

class CreateTodoItem {
  constructor(task, dueDate, description) {
    this.id = Date.now();
    this.task = task;
    this.dueDate = dueDate;
    this.description = description;
    this.completed = false;
  }
}
