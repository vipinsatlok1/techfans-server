const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.set("strictQuery", false).connect(process.env.MONGO_URI);
    console.log("database connected");
  } catch (err) {
    console.log(err.message);
    console.log("database not connected");
  }
};

module.exports = connectDb;
