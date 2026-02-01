const Todo = require("../models/todo");
const {ObjectId} = require('mongodb');

exports.createTask =async  (req, res, next) => {
    let { tasktitle, category, priority, duedate,userid} = req.body;
    // console.log("Tasks: ", req.body);

    const task = new Todo(tasktitle, category, priority, duedate,userid);
    const result= await task.save();
    res.json(result);
}

exports.getList = async (req, res, next) => {
    const id=req.params.id;
    const result = await Todo.fetchbyid(id);
    res.json(result);
}

exports.taskdelete = async (req, res, next) => {
    const id = req.params.id;
    const result = await Todo.deleteById(id);
    res.json(result);
}

exports.edittask = async(req, res, next) => {
    const id = req.params.id;

    const result =await  Todo.findById(id);

    res.json(result);
}

exports.updatetask = async (req, res, next) => {
    const id=req.params.id;
    const data=req.body;
    console.log("my data is ",data);
    const result = await Todo.updateSave(data,id);
    console.log("task updated", result);
    res.json(result);
}

exports.complete = async (req, res, next) => {
    const id = req.params.id;
    console.log("Complete id ", id);
    const result = await Todo.deleteById(id);
    res.json(result);
}