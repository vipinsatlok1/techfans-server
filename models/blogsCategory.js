const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    svg: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogsCategory", schema);
