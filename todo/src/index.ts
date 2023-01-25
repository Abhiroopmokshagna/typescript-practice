import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from "inquirer";

let todos: TodoItem[] = [
  new TodoItem(1, "Buy flowers"),
  new TodoItem(2, "Get shoes"),
  new TodoItem(3, "Collect tickets"),
  new TodoItem(4, "Call joe", true),
];

let collection: TodoCollection = new TodoCollection("Adam", todos);

function displayTodoList(): void {
  console.log(
    `${collection.userName}'s Todo list ` +
      `(${collection.getItemCounts().incomplete} items to do)`
  );
  collection.getTodoItems(true).forEach((item) => item.printDetails());
}

enum Commands {
  Quit = "Quit",
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
      badProperty: true,
    })
    .then((answers) => {
      if (answers["command"] !== Commands.Quit) {
        promptUser();
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
