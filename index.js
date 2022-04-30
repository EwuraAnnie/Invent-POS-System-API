require("./config/dbConnect");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);

app.listen(9000, () => console.log("🚀 Server up and running"));
