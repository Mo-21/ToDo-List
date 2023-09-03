export default class CreateTodoItem {
  constructor(task, dueDate, description) {
    this.task = task;
    this.dueDate = dueDate;
    this.description = description;
  }
  get tasksValues() {
    console.log(newTaskItem);
  }
  set tasksValues(values) {
    items.push(values);
    console.log(items);
  }
}

