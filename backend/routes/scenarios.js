const express = require("express");
const router = express.Router();
const Scenario = require("../models/scenario");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const verifyToken = require("../middleware/authMiddleware");

// GET /api/scenarios 
router.get("/", verifyToken, wrapAsync(async (req, res, next) => {
  const scenarios = await Scenario.find({}, "title category type difficulty estimatedTime playCount");
  res.status(200).json({ success: true, scenarios });
}));

// GET /api/scenarios/:id  (protected)
router.get("/:id", verifyToken, wrapAsync(async (req, res, next) => {
  const scenario = await Scenario.findById(req.params.id);
  if (!scenario) {
    return next(new ExpressError(404, "Scenario not found."));
  }
  res.status(200).json({ success: true, scenario });
}));

module.exports = router;