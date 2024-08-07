const Todo = require("../models/todo.model.js");
const User = require("../models/user.model.js");

// get all todos
const getAllTodos = async (request, response) => {
  const { user } = request;
  const { category } = request.query;

  let query = {};

  query.createdBy = user.id;

  if (category && category.trim() !== "") {
    query.category = { $regex: new RegExp(category, "i") };
  }

  try {
    const getUserTodoData = await Todo.find(query);
    //   {
    //   createdBy: user.id,
    //   $or: [{ category: { $regex: request.params.category } }],
    //   $text: { $search: request.params.category },
    // }

    response.json({ todos: getUserTodoData });
  } catch (error) {
    response.json({ error });
  }
};

// add new todo
const addNewTodo = async (request, response) => {
  const { heading, todo, category } = request.body;
  const { user } = request;

  if (!heading) return response.status(400).json({ msg: "heading required" });
  if (!todo) return response.status(400).json({ msg: "todo required" });

  try {
    const userDetails = await User.findById(user.id);

    if (!userDetails) return response.json({ msg: "Login first" });

    const todoDetails = {
      heading,
      todo,
      category,
      createdBy: userDetails._id,
    };
    await Todo.create(todoDetails);
    response.json({ msg: "new todo added" });
  } catch (error) {
    console.log(`error msg: ${error}`);
    return response.status(500).json({ error: "An error occurred" });
  }
};

// get single data
const getSingleTodo = async (request, response) => {
  const { todoId } = request.params;
  const getTodo = await Todo.findOne({ _id: todoId });

  response.json({ todoDetails: getTodo });
};

// update todo
const updateTodo = async (request, response) => {
  const { heading, todo, category, isStarChecked } = request.body;
  const { user } = request;
  const { todoId } = request.params;

  if (!heading) return response.status(400).json({ msg: "heading required" });
  if (!todo) return response.status(400).json({ msg: "todo required" });

  try {
    const userDetails = await User.findById(user.id);

    if (!userDetails) return response.json({ msg: "Login first" });

    const todoDetails = {
      heading,
      todo,
      category,
      isStarChecked,
    };

    const getTodo = await Todo.findByIdAndUpdate(todoId, todoDetails);
    if (!getTodo)
      return response.status(500).json({ msg: "something went wrong" });

    await getTodo.save();
    response.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.log(`error msg: ${error}`);
    return response.status(500).json({ error: "An error occurred" });
  }
};

// Delete todo
const deleteSingleTodo = async (request, response) => {
  const { todoId } = request.params;
  const getData = await Todo.findByIdAndDelete(todoId);

  if (!getData)
    return response.status(500).json({ error: "An error occurred delete" });

  response.json({ msg: "Deleted successfully" });
};

module.exports = {
  getAllTodos,
  addNewTodo,
  getSingleTodo,
  updateTodo,
  deleteSingleTodo,
};
