const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require('./routes/authRoutes');
const usersRoute = require('./routes/users');
const posts = require('./routes/posts');
const path = require("path");



dotenv.config();

//database connection
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DataBase.")
);

app.use("/images", express.static(path.join(__dirname, "public/images")));


//middleware
app.use(express.json());       //this is body parser
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", posts);




app.listen(8000, (req, res) => console.log("BackEnd Server is Running!"));
