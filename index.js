#! /usr/bin/env node
import inquirer from "inquirer";
const userInput = await inquirer.prompt([
    {
        name: "title",
        type: "string",
        message: "What task do you want to add today: ",
    }
]);
var tasks = [];
console.log(tasks);
var taskID = 0;
const newTask = {
    id: taskID++,
    title: userInput.title,
    completed: false,
    createdAt: new Date(),
};
tasks.push(newTask);
console.log(tasks);
