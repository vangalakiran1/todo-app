const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/authentication.js");
const {
  getAllTodos,
  addNewTodo,
  getSingleTodo,
  updateTodo,
  deleteSingleTodo,
} = require("../controllers/todo.controller");

router.get("/todos", Authentication, getAllTodos);

router.get("/todos/:todoId", Authentication, getSingleTodo);

router.post("/add-todo", Authentication, addNewTodo);

router.put("/updateTodo/:todoId", Authentication, updateTodo);

router.delete("/deleteTodo/:todoId", Authentication, deleteSingleTodo);

module.exports = router;
