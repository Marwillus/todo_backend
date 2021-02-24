const User = require("../models/userSchema");

exports.createUser = async (req, res, next) => {
  try {
  } catch (err) {
    res.status(500).send({
      msg: "error while creating user",
      error: err,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id !== req.tokenUser.id) {
      return res.status(401).send("U got no rights here");
    }
    const user = await User.remove({ _id: id });
    if (user.deleteCount > 0) {
      res.status(200).send({
        msg: "file deleted",
        user: user,
      });
    } else {
      res.status(404).send("couldnt find file");
    }
  } catch (err) {
    res.status(500).send({
      msg: "couldn't delete user",
      error: err,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
  } catch (err) {
    res.status(500).send({
      msg: "error while loggin user",
      error: err,
    });
  }
};
