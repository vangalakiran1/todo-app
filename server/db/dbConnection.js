const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URL;

const connectionDbToServer = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};
connectionDbToServer();
