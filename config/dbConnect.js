const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB connection is started");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
