var express = require("express");
var router = express.Router();

const {
  getTodos,
  createTodo,
  deleteTodo,
} = require("../controller/todoController");

/* GET users listing. */
router.route("/").get(getTodos).post(createTodo).delete(deleteTodo);

module.exports = router;
