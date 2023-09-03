// import CreateTodoItem from "./classes";
import "../styles/main.scss";
import * as bootstrap from "bootstrap";

const addButton = document.getElementById("add-button");
const container = document.querySelector(".container");
const inputs = document.querySelectorAll(".form-control");
const radioButtons = document.querySelectorAll(".btn-check");

let arrayOfTasks = [];
getTasksFromLocalStorage();

//Check the Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

addButton.onclick = function () {
  let inputsValuesArray = [];
  inputs.forEach((input) => {
    inputsValuesArray.push(input.value);
  });

  // radioButtons.forEach((radioButton) => {
  //   radioButton.addEventListener("click", (e) => {
  //     // Check if the radio button is checked
  //     if (radioButton.hasAttribute('checked')) {
  //       // Get the selected value
  //       inputsValuesArray.push(e.target);
  //     }
  //   });
  // });

  addTasksToArray(inputsValuesArray);
  inputs.forEach((input) => {
    input.value = "";
  });
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
    const divTaskTitle = document.createElement("div");
    divTaskTitle.className = "task";

    if (task.completed) {
      divTaskTitle.className = "task done";
    }

    divTaskTitle.setAttribute("data-id", task.id);
    divTaskTitle.appendChild(document.createTextNode(task.task));
    const span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));

    const divTaskDueDate = document.createElement("div");
    const divTaskDescription = document.createElement("div");
    divTaskDueDate.appendChild(document.createTextNode(task.dueDate));
    divTaskDescription.appendChild(document.createTextNode(task.description));
    // Append Other Task Elements To Title Div
    divTaskTitle.appendChild(span);
    divTaskTitle.appendChild(divTaskDueDate);
    divTaskTitle.appendChild(divTaskDescription);
    // Add Task Div To Tasks Container
    container.appendChild(divTaskTitle);
  });
}

//Deleting Tasks
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTasksFromStorage(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
});

function deleteTasksFromStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  console.log(arrayOfTasks);
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
