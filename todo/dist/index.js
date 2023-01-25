"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
const inquirer = require("inquirer");
let todos = [
    new todoItem_1.TodoItem(1, "Buy flowers"),
    new todoItem_1.TodoItem(2, "Get shoes"),
    new todoItem_1.TodoItem(3, "Collect tickets"),
    new todoItem_1.TodoItem(4, "Call joe", true),
];
let collection = new todoCollection_1.TodoCollection("Adam", todos);
function displayTodoList() {
    console.log(`${collection.userName}'s Todo list ` +
        `(${collection.getItemCounts().incomplete} items to do)`);
    collection.getTodoItems(true).forEach((item) => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptUser() {
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
