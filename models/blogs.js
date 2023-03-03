const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: String,
    dec: String,
    image: String,
    totalLikes: Number,
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    totalRating: Number,
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        rating: Number,
      },
    ],
    html: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogsCategory",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", schema);
