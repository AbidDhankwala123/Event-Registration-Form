const express = require("express");
const router = express.Router();
const { registeredUser } = require("../controllers/userController");

router.post("/register", registeredUser);

module.exports = router