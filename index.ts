#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

var tasks: Task[] = [];

async function addTask() {
  const userInput = await inquirer.prompt([
    {
      name: "title",
      type: "string",
      message: "What task do you want to add: ",
    },
  ]);

  const newTask: Task = {
    id: tasks.length + 1,
    title: userInput.title,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
}

async function addTasks() {
  do {
    await addTask();
    var again = await inquirer.prompt([
      {
        type: "input",
        name: "restart",
        message: "Do you want to continue adding new Task to list Press y or Y",
      },
    ]);
  } while (again.restart == "y" || again.restart == "Y");
}

async function completeTask() {
  printTasks(tasks);
  const userInput = await inquirer.prompt([
    {
      name: "taskID",
      type: "number",
      message: "What task you completed today (give task id): ",
    },
  ]);

  if (userInput.taskID <= tasks.length && userInput.taskID > 0) {
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index].id;
      if (element == userInput.taskID) {
        tasks[index].completed = true;
        printTasks(tasks);
        console.log(`You just Completed task! ${userInput.taskID}`);
      }
    }
  } else {
    console.log("Given ID is not present.");
  }
}

async function deleteAllTask() {
  console.clear();
  tasks = [];
  console.log("All Tasks are Deleted!");
}

function printTasks(_tasks: Task[]) {
  if (_tasks.length == 0) {
    console.log(`No Tasks are added in Todo App!`);
  } else {
    console.log(`ID \t Todo \t\t\t Completion \t Dated`);
    for (let index = 0; index < _tasks.length; index++) {
      console.log(
        `${_tasks[index].id} \t ${_tasks[index].title} \t\t\t ${_tasks[index].completed} \t ${_tasks[index].createdAt}`
      );
    }
  }
}

async function toDoApp() {
  console.clear();
  console.log(chalk.bgBlue(`Welcome to TODO Application\n`));
  const newTodoApp = await inquirer.prompt([
    {
      name: "todoAppOptions",
      type: "list",
      message: "Choose Option Given blow : \n",
      choices: ["Show Tasks", "Add Tasks", "Complete Task", "Delete All Tasks"],
    },
  ]);

  switch (newTodoApp.todoAppOptions) {
    case "Show Tasks":
      printTasks(tasks);
      break;
    case "Add Tasks":
      await addTasks();
      break;
    case "Complete Task":
      await completeTask();
      break;
    case "Delete All Tasks":
      await deleteAllTask();
      break;
    default:
      console.log("Something went wrong");
      break;
  }
}

async function runAgain() {
  do {
    await toDoApp();
    var again = await inquirer.prompt([
      {
        type: "input",
        name: "restart",
        message: "Do you want to continue use todo app? Press y or Y",
      },
    ]);
  } while (again.restart == "y" || again.restart == "Y");
}
await runAgain();
