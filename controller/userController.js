//extern dep
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// intern dep
const User = require("../models/userSchema");

exports.createUser = async (req, res, next) => {
  try {
    const existUser = await User.find({ email: req.body.email });
    if (existUser.length >= 1) {
      return res.status(422).send("user already exists");
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send("error while hashing " + err);
      }
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
        admin: req.body.admin,
      });
      user
        .save()
        .then((newUser) =>
          res.status(200).send({
            msg: "user succesfully created",
            user: newUser,
          })
        )
        .catch((err) =>
          res.status(500).send({
            msg: "could not create user",
            user: err,
          })
        );
    });
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
    const user = req.body;

    const userDb = await User.findOne({ email: user.email });
    if (userDb === null) {
      return res.status(409).send("this email don't exist");
    }
    const comparePassword = await bcrypt.compare(
      user.password,
      userDb.password
    );
    if (comparePassword) {
      const token = jwt.sign(
        {
          email: userDb.email,
          userId: userDb._id,
          isAdmin: userDb.admin,
        },
        process.env.JWT || "secret",
        { expiresIn: "3h" }
      );
      return res.status(200).send({
        msg: "login successfull",
        token: token,
      });
    }
  } catch {
    (err) => res.send(409).send("login failed");
  }
};
