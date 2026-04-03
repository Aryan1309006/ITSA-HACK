const mongoose = require("mongoose");

const choiceMadeSchema = new mongoose.Schema({
  nodeId: { type: Number, required: true },
  choiceText: { type: String, required: true },
  safe: { type: Boolean, required: true },
  points: { type: Number, default: 0 },
});

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scenarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scenario",
      required: true,
    },
    scenarioTitle: { type: String, required: true },
    score: { type: Number, default: 0 },
    redFlagsSpotted: { type: Number, default: 0 },
    totalRedFlags: { type: Number, default: 0 },
    choicesMade: [choiceMadeSchema],
    vulnerabilityType: { type: String, default: "None" },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
