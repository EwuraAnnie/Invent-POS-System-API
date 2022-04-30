const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/invent")
  .then(() => console.log("Database connected successfully"));
