const express = require("express");
const router = express.Router();
const Session = require("../models/session");
const User = require("../models/User");
const Scenario = require("../models/scenario");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const verifyToken = require("../middleware/authMiddleware");

// POST /api/sessions  (protected)
router.post("/", verifyToken, wrapAsync(async (req, res, next) => {
  const {
    scenarioId,
    scenarioTitle,
    score,
    redFlagsSpotted,
    totalRedFlags,
    choicesMade,
    vulnerabilityType,
  } = req.body;

  if (!scenarioId || !scenarioTitle || choicesMade === undefined) {
    return next(new ExpressError(400, "scenarioId, scenarioTitle and choicesMade are required."));
  }

  const scenario = await Scenario.findById(scenarioId);
  if (!scenario) {
    return next(new ExpressError(404, "Scenario not found."));
  }

  const newSession = new Session({
    userId: req.user.id,
    scenarioId,
    scenarioTitle,
    score: score || 0,
    redFlagsSpotted: redFlagsSpotted || 0,
    totalRedFlags: totalRedFlags || 0,
    choicesMade: choicesMade || [],
    vulnerabilityType: vulnerabilityType || "None",
  });

  await newSession.save();

  await Scenario.findByIdAndUpdate(scenarioId, { $inc: { playCount: 1 } });

  await User.findByIdAndUpdate(req.user.id, {
    $inc: {
      totalScore: score || 0,
      scenariosCompleted: 1,
    },
  });

  res.status(201).json({
    success: true,
    message: "Session saved successfully.",
    session: newSession,
  });
}));

// GET /api/sessions/my  (protected)
router.get("/my", verifyToken, wrapAsync(async (req, res, next) => {
  const sessions = await Session.find({ userId: req.user.id })
    .sort({ completedAt: -1 });

  res.status(200).json({ success: true, sessions });
}));

// GET /api/sessions/:id  (protected)
router.get("/:id", verifyToken, wrapAsync(async (req, res, next) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    return next(new ExpressError(404, "Session not found."));
  }
  if (session.userId.toString() !== req.user.id) {
    return next(new ExpressError(403, "You are not authorized to view this session."));
  }
  res.status(200).json({ success: true, session });
}));

module.exports = router;