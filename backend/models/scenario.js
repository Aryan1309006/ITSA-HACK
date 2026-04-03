const mongoose = require("mongoose");

const choiceSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  nextNode: {
    type: Number,
    default: null,
  },
  points: {
    type: Number,
    default: 0,
  },
  safe: {
    type: Boolean,
    required: true,
  },
});

const nodeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  speaker: {
    type: String,
    enum: ["scammer", "system"],
    default: "scammer",
  },
  dialogue: {
    type: String,
    required: true,
  },
  redFlags: {
    type: [String],
    default: [],
  },
  choices: [choiceSchema],
});

const scenarioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["call", "sms", "email"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    estimatedTime: {
      type: String,
      default: "5 mins",
    },
    playCount: {
      type: Number,
      default: 0,
    },
    nodes: [nodeSchema],
  },
  { timestamps: true },
);

const Scenario = mongoose.model("Scenario", scenarioSchema);
module.exports = Scenario;
