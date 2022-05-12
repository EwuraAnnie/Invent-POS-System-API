const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Sinnie:Sinnie@cluster0.rnwsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected successfully"));
