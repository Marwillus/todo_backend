const mongoose = require("mongoose");

exports.getTodo = async (req, res, next) => {
  try {
    const todos = Todo.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const newTask = await new Todo({
      _id: mongoose.Types.ObjectId,
      title: req.body.title,
      deadline: req.body.deadline,
    });

    newTask
      .save()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const task = await Todo.findByIdAndRemove(req.body.id);
  } catch (error) {
    res.status(500).send(err);
  }
};
