const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");
const { validationResult } = require("express-validator");

module.exports.login = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.jwt,
        { expiresIn: 3600 }
      );
      res.status(200).json({ token: `Bearer ${token}` });
    } else {
      res.status(401).json({ message: "Incorrect password, try again!" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports.register = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors?.array() });
  }

  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({ message: "User already exists" });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
