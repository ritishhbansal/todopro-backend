const express = require("express");
const taskRouter = express.Router();

const taskController = require("../controller/taskController");

taskRouter.post("/tasks", taskController.createTask);
taskRouter.get("/data/:id", taskController.getList);
taskRouter.get("/taskdelete/:id", taskController.taskdelete);
taskRouter.get("/edit/:id", taskController.edittask);
taskRouter.post("/updatetask/:id", taskController.updatetask);
taskRouter.get("/complete/:id", taskController.complete);

module.exports = taskRouter;