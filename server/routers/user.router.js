const express = require("express");
const router = express.Router();
const { addNewUser, loginuser } = require("../controllers/user.controller");

router.post("/login", loginuser);

router.post("/add-new-user", addNewUser);

module.exports = router;
