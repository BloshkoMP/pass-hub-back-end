const express = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/auth");
const router = express.Router();

router.post("/login", controller.login);

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  controller.register
);

module.exports = router;
