const userControllers = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();

router.route("/test").get(userControllers.test);

router.route("/create").post(userControllers.createUser);

module.exports = router;