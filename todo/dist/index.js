"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const inquirer = require("inquirer");
const jsonTodoCollection_1 = require("./jsonTodoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "Buy flowers"),
    new todoItem_1.TodoItem(2, "Get shoes"),
    new todoItem_1.TodoItem(3, "Collect tickets"),
    new todoItem_1.TodoItem(4, "Call joe", true),
];
let collection = new jsonTodoCollection_1.JsonTodoCollection("Adam", todos);
let showCompleted = true;
function displayTodoList() {
    console.log(`${collection.userName}'s Todo list ` +
        `(${collection.getItemCounts().incomplete} items to do)`);
    collection.getTodoItems(true).forEach((item) => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Quit"] = "Quit";
    Commands["Add"] = "Add new task";
    Commands["Complete"] = "Complete task";
    Commands["Toggle"] = "Show/Hide completed";
    Commands["Purge"] = "Remove completed tasks";
})(Commands || (Commands = {}));
function promptAdd() {
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
function promptComplete() {
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
        let completedTasks = answers["complete"];
        collection
            .getTodoItems(true)
            .forEach((item) => collection.markComplete(item.id, completedTasks.find((id) => id === item.id) != undefined));
        promptUser();
    });
}
function promptUser() {
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
                }
                else {
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
