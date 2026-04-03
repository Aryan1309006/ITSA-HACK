const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

//POST /api/auth/register
router.post("/register", wrapAsync(async (req, res, next) => {
  const { name, email, password, institution } = req.body;

  if (!name || !email || !password) {
    return next(new ExpressError(400, "Name, email and password are required."));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ExpressError(409, "An account with this email already exists."));
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    passwordHash,
    institution: institution || "",
  });

  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(201).json({
    success: true,
    message: "Account created successfully.",
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      institution: newUser.institution,
      totalScore: newUser.totalScore,
      scenariosCompleted: newUser.scenariosCompleted,
    },
  });
}));

// POST /api/auth/login
router.post("/login", wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressError(400, "Email and password are required."));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ExpressError(401, "Invalid email or password."));
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return next(new ExpressError(401, "Invalid email or password."));
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    success: true,
    message: "Login successful.",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      institution: user.institution,
      totalScore: user.totalScore,
      scenariosCompleted: user.scenariosCompleted,
    },
  });
}));

// GET /api/auth/me  (protected)
const verifyToken = require("../middleware/authMiddleware");

router.get("/me", verifyToken, wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-passwordHash");
  if (!user) {
    return next(new ExpressError(404, "User not found."));
  }
  res.status(200).json({ success: true, user });
}));

module.exports = router;