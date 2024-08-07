const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginuser = async (request, response) => {
  const { username, password } = request.body;
  try {
    const usernameFromUser = username;
    const passwordFromUser = password;
    await User.find({ username: usernameFromUser })
      .then(async (data) => {
        const { username, password, _id } = data[0];

        await bcrypt.compare(passwordFromUser, password, (err, results) => {
          if (err) {
            return response.status(500).json({ msg: "failed jsonwebtoken" });
          }
          if (results) {
            const jwtToken = jwt.sign(
              { username: username, id: _id },
              process.env.JWT_SECRET_PRIVATE_KEY,
              { expiresIn: process.env.JWT_TOKEN_EXPRIES }
            );

            return response.status(200).json({ jwtToken });
          } else {
            return response.status(406).json({ err: "Password is invaild" });
          }
        });
      })
      .catch(() => {
        response.status(406).json({ msg: "Username is invaild" });
      });
  } catch (error) {
    console.log(`error msg login: ${error}`);
  }
};

const addNewUser = async (request, response) => {
  const { username, password } = request.body;
  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        response.status(500).json({ error: "Error hashing password" });
      }

      const newUserDeatails = {
        username,
        password: hash,
      };
      await User.create(newUserDeatails)
        .then(() => {
          response.status(200).json({ msg: "Account successfully created" });
        })
        .catch((error) => {
          console.log(`error in username: ${error}`);
          response.status(406).json({ msg: "Username already exists" });
        });
    });
  } catch (error) {
    console.log(`error msg user: ${error}`);
  }
};

module.exports = { addNewUser, loginuser };
