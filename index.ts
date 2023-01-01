#! /usr/bin/env node

import inquirer from "inquirer";

type Task = {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

var tasks: Task[] = [];

async function addTask () {

  const userInput = await inquirer.prompt([
    {
      name: "title",
      type: "string",
      message: "What task do you want to add: ",
    }
  ]);
  
  const newTask: Task = {
    id: tasks.length+1,
    title: userInput.title,
    completed: false,
    createdAt: new Date(),
  }

  tasks.push(newTask)
}

async function completeTask() {
  const userInput = await inquirer.prompt([
    {
      name: "taskID",
      type: "number",
      message: "What task you completed today (give task id): ",
    }
  ]);

  if(userInput.taskID <= tasks.length){
    tasks[userInput.taskID-1].completed = true;
    // console.clear();
    console.log(`You just completed task! ${userInput.taskID}`);
  } else {
    console.log("Given ID is not present.");
  }
}

async function deleteTask() {
  const userInput = await inquirer.prompt([
    {
      name: "taskID",
      type: "number",
      message: "What task you want to delete today (give task id): ",
    }
  ]);

  if(userInput.taskID <= tasks.length){
    tasks.splice(userInput.taskID-1,1)
    // console.clear();
    console.log(`You just deleted task! ${userInput.taskID}`);
  } else {
    console.log("Given ID is not present.");
  }
}

function printTasks (_tasks: Task[]){
  if(_tasks.length == 0) {
    console.log(`No Tasks are added in Todo App!`);
  } else {
    console.log(`ID \t Todo \t Completion \t Dated`);
    for (let index = 0; index < _tasks.length; index++) {
     console.log(`${_tasks[index].id} \t ${_tasks[index].title} \t ${_tasks[index].completed} \t ${_tasks[index].createdAt}`);
    }
  }
}




// do {
//   await addTask();
//   var again = await inquirer.prompt([
//       {
//           type: "input",
//           name: "restart",
//           message: "Do you want to continue using this? Press y or Y",
//       },
//   ]);
// } while (again.restart == "y" || again.restart == "Y");


// printTasks(tasks);
// await completeTask();
// await deleteTask();
// printTasks(tasks)

// console.log(addTask(userInput.title));
