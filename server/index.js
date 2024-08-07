require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers/todo.route.js");
const userRouter = require("./routers/user.router.js");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

const initializationDbToServer = async () => {
  try {
    require("./db/dbConnection.js");

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(`error msg: ${error}`);
  }
};
initializationDbToServer();

app.use("/api", router);
app.use("/api", userRouter);
