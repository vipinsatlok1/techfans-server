const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// // use json passer
app.use(cors({ origin: "*", credentials: true, exposedHeaders: true }));
app.use(express.json());
app.use(cookieParser());

// get home routes for check
app.get("/", (req, res) => {
  res.send("hi! tech fans server is running");
});

// uses routes
const auth = require("./routes/auth");
const blogs = require("./routes/blogs");
const tools = require("./routes/tools");
const projects = require("./routes/projects");
const projectsCategory = require("./routes/projectsCategory");
const toolsCategory = require("./routes/toolsCategory");
const blogsCategory = require("./routes/blogsCategory");
app.use("/api/auth", auth);
app.use("/api/blogs", blogs);
app.use("/api/tools", tools);
app.use("/api/projects", projects);
app.use("/api/projectsCategory", projectsCategory);
app.use("/api/toolsCategory", toolsCategory);
app.use("/api/blogsCategory", blogsCategory);

// // error middleware
const error = require("./middlewares/error");
app.use(error);

module.exports = app;
