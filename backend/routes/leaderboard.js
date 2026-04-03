const express = require("express");
const router = express.Router();
const User = require("../models/User");
const wrapAsync = require("../utils/wrapAsync");
const verifyToken = require("../middleware/authMiddleware");

// GET /api/leaderboard  
router.get("/", verifyToken, wrapAsync(async (req, res, next) => {
  const topUsers = await User.find({}, "name institution totalScore scenariosCompleted")
    .sort({ totalScore: -1 })
    .limit(10);

  res.status(200).json({ success: true, leaderboard: topUsers });
}));

// GET /api/leaderboard/rank 
router.get("/rank", verifyToken, wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const rank = await User.countDocuments({
    totalScore: { $gt: user.totalScore },
  });

  res.status(200).json({
    success: true,
    rank: rank + 1,
    totalScore: user.totalScore,
    scenariosCompleted: user.scenariosCompleted,
  });
}));

module.exports = router;