const mongoose = require("mongoose");

const uri = process.env.mongo || "mongodb://localhost:27017/todo";

//parameter
const params = { useNewUrlParser: true, useUnifiedTopology: true };

const connectDB = () => {
  mongoose
    .connect(uri, params)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => console.log("error while connecting to DB ", err));
};

module.exports = connectDB;
