import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from "inquirer";
import { JsonTodoCollection } from "./jsonTodoCollection";

let todos: TodoItem[] = [
  new TodoItem(1, "Buy flowers"),
  new TodoItem(2, "Get shoes"),
  new TodoItem(3, "Collect tickets"),
  new TodoItem(4, "Call joe", true),
];

let collection: TodoCollection = new JsonTodoCollection("Adam", todos);

let showCompleted = true;

function displayTodoList(): void {
  console.log(
    `${collection.userName}'s Todo list ` +
      `(${collection.getItemCounts().incomplete} items to do)`
  );
  collection.getTodoItems(true).forEach((item) => item.printDetails());
}

enum Commands {
  Quit = "Quit",
  Add = "Add new task",
  Complete = "Complete task",
  Toggle = "Show/Hide completed",
  Purge = "Remove completed tasks",
}

function promptAdd(): void {
  console.clear();
  inquirer
    .prompt({ type: "input", name: "add", message: "Enter task:" })
    .then((answers) => {
      if (answers["add"] !== "") {
        collection.addTodo(answers["add"]);
      }
      promptUser();
    });
}

function promptComplete(): void {
  console.clear();
  inquirer
    .prompt({
      type: "checkbox",
      name: "complete",
      message: "Mark tasks complete",
      choices: collection.getTodoItems(showCompleted).map((item) => ({
        name: item.task,
        value: item.id,
        checked: item.complete,
      })),
    })
    .then((answers) => {
      let completedTasks = answers["complete"] as number[];
      collection
        .getTodoItems(true)
        .forEach((item) =>
          collection.markComplete(
            item.id,
            completedTasks.find((id) => id === item.id) != undefined
          )
        );
      promptUser();
    });
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands),
    })
    .then((answers) => {
      switch (answers["command"]) {
        case Commands.Toggle:
          showCompleted = !showCompleted;
          promptUser();
          break;
        case Commands.Add:
          promptAdd();
          break;
        case Commands.Complete:
          if (collection.getItemCounts().incomplete > 0) {
            promptComplete();
          } else {
            promptUser();
          }
          break;
        case Commands.Purge:
          collection.removeComplete();
          promptUser();
          break;
      }
    });
}

promptUser();

// console.clear();
// console.log(
//   `${collection.userName}'s todo list ` +
//     `(${collection.getItemCounts().incomplete} items to do)`
// );

// let newId = collection.addTodo("Go for run");
// let todoItem = collection.getTodoById(newId);
// todoItem.printDetails();
// collection.addTodo(todoItem);
// collection.removeComplete();

// collection.getTodoItems(true).forEach((item) => item.printDetails());
// console.log(JSON.stringify(todoItem));
