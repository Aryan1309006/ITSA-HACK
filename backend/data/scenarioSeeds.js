const mongoose = require("mongoose");
const Scenario = require("../models/Scenario");
require("dotenv").config();

const scenarios = [
  // ─────────────────────────────────────────────
  // SCENARIO 1 — Fake SBI OTP Call
  // ─────────────────────────────────────────────
  {
    title: "Fake SBI Bank Call",
    category: "OTP Fraud",
    type: "call",
    difficulty: "easy",
    estimatedTime: "3 mins",
    nodes: [
      {
        id: 1,
        speaker: "scammer",
        dialogue:
          "Hello, I'm calling from SBI Fraud Prevention Department. Your account has been flagged for suspicious activity. To avoid blocking, please share your OTP immediately.",
        redFlags: [
          "Bank never asks for OTP",
          "Urgency and panic pressure",
          "Unsolicited call",
        ],
        choices: [
          { text: "Share the OTP", nextNode: 2, points: -30, safe: false },
          { text: "Ask for their employee ID", nextNode: 3, points: 10, safe: true },
          { text: "Hang up and call SBI helpline", nextNode: 4, points: 20, safe: true },
        ],
      },
      {
        id: 2,
        speaker: "system",
        dialogue:
          "WRONG: You shared the OTP. Rs.48,000 was transferred from your account within seconds. Banks NEVER ask for OTPs over a call.",
        redFlags: [],
        choices: [],
      },
      {
        id: 3,
        speaker: "scammer",
        dialogue:
          "My ID is SBI-4492. Now please hurry — your account will be blocked in 10 minutes if you don't verify.",
        redFlags: [
          "Fake employee ID — SBI IDs don't follow this format",
          "Artificial countdown to force panic",
        ],
        choices: [
          { text: "Believe the ID and share OTP", nextNode: 2, points: -20, safe: false },
          { text: "Tell them you'll visit the branch personally", nextNode: 5, points: 20, safe: true },
        ],
      },
      {
        id: 4,
        speaker: "system",
        dialogue:
          "CORRECT: You hung up and called the official SBI helpline (1800-11-2211). The helpline confirmed no such alert was raised on your account. You protected yourself.",
        redFlags: [],
        choices: [],
      },
      {
        id: 5,
        speaker: "system",
        dialogue:
          "CORRECT: Scammers always resist this suggestion. The caller immediately disconnected when you said you'd visit the branch — confirming it was a fraud attempt.",
        redFlags: [],
        choices: [],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SCENARIO 2 — Fake Lottery / KBC Prize
  // ─────────────────────────────────────────────
  {
    title: "KBC Lottery Winner SMS",
    category: "Lottery Fraud",
    type: "sms",
    difficulty: "easy",
    estimatedTime: "3 mins",
    nodes: [
      {
        id: 1,
        speaker: "scammer",
        dialogue:
          "Congratulations! You have won Rs.25,00,000 in KBC Lucky Draw 2026. Your number was selected from 4 crore entries. To claim your prize, reply with your Aadhaar number and pay Rs.1,500 processing fee.",
        redFlags: [
          "You never entered any KBC lottery",
          "Asking for Aadhaar number over SMS",
          "Processing fee to claim prize — classic red flag",
        ],
        choices: [
          { text: "Reply with Aadhaar and pay the fee", nextNode: 2, points: -30, safe: false },
          { text: "Ask which number you entered from", nextNode: 3, points: 10, safe: true },
          { text: "Ignore and report the number", nextNode: 4, points: 20, safe: true },
        ],
      },
      {
        id: 2,
        speaker: "system",
        dialogue:
          "WRONG: You shared your Aadhaar and paid Rs.1,500. The scammer then asked for Rs.5,000 more for tax clearance. You never received any prize. Legitimate lotteries NEVER charge a fee to release winnings.",
        redFlags: [],
        choices: [],
      },
      {
        id: 3,
        speaker: "scammer",
        dialogue:
          "Your registered mobile number was auto-entered by Jio in the national draw. Please confirm your details to proceed with prize transfer within 24 hours.",
        redFlags: [
          "Jio does not auto-enter numbers in lotteries",
          "24-hour deadline creates false urgency",
        ],
        choices: [
          { text: "Believe it and share Aadhaar", nextNode: 2, points: -20, safe: false },
          { text: "Call Jio customer care to verify", nextNode: 5, points: 20, safe: true },
        ],
      },
      {
        id: 4,
        speaker: "system",
        dialogue:
          "CORRECT: You reported the number to the Cyber Crime helpline (1930). The number was flagged and blocked. No legitimate lottery contacts winners via SMS asking for fees.",
        redFlags: [],
        choices: [],
      },
      {
        id: 5,
        speaker: "system",
        dialogue:
          "CORRECT: Jio confirmed no such lottery exists and the SMS was fraudulent. Your Aadhaar details stayed safe from identity theft.",
        redFlags: [],
        choices: [],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SCENARIO 3 — Fake Job Offer
  // ─────────────────────────────────────────────
  {
    title: "Fake IT Job Offer on WhatsApp",
    category: "Job Fraud",
    type: "sms",
    difficulty: "medium",
    estimatedTime: "5 mins",
    nodes: [
      {
        id: 1,
        speaker: "scammer",
        dialogue:
          "Hi! I'm HR from Infosys Talent Acquisition. We found your resume on Naukri. We have a Rs.8 LPA remote job opening for you. Please share your resume, 10th marksheet, and pay Rs.2,000 registration fee to confirm the slot.",
        redFlags: [
          "Legitimate companies never charge registration fees",
          "Contacted via WhatsApp — not official email",
          "No interview process mentioned",
        ],
        choices: [
          { text: "Pay the fee and send documents", nextNode: 2, points: -30, safe: false },
          { text: "Ask for the official Infosys HR email ID", nextNode: 3, points: 10, safe: true },
          { text: "Tell them to send an official offer letter first", nextNode: 4, points: 20, safe: true },
        ],
      },
      {
        id: 2,
        speaker: "system",
        dialogue:
          "WRONG: You paid Rs.2,000 and sent your documents. The HR then asked for Rs.5,000 more for background verification. When you asked for the offer letter, they blocked you. Your documents are now exposed for identity fraud.",
        redFlags: [],
        choices: [],
      },
      {
        id: 3,
        speaker: "scammer",
        dialogue:
          "Our official email is hr.infosys.recruit@gmail.com. Due to system migration we are temporarily using Gmail. Please proceed with the registration fee to lock your slot.",
        redFlags: [
          "Infosys uses @infosys.com — never @gmail.com",
          "No company uses Gmail for official HR communication",
        ],
        choices: [
          { text: "Accept the Gmail excuse and pay", nextNode: 2, points: -20, safe: false },
          { text: "Search the Infosys careers page directly", nextNode: 5, points: 20, safe: true },
        ],
      },
      {
        id: 4,
        speaker: "system",
        dialogue:
          "CORRECT: The scammer immediately disconnected. Legitimate employers always provide official documentation before asking for anything. Asking for an offer letter first is the smartest move.",
        redFlags: [],
        choices: [],
      },
      {
        id: 5,
        speaker: "system",
        dialogue:
          "CORRECT: You found no such listing on infosys.com/careers. You reported the WhatsApp number to the National Cyber Crime portal (cybercrime.gov.in). Always verify job offers directly on the company's official website.",
        redFlags: [],
        choices: [],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SCENARIO 4 — KYC Update Scam
  // ─────────────────────────────────────────────
  {
    title: "Paytm KYC Expiry Scam",
    category: "KYC Fraud",
    type: "call",
    difficulty: "medium",
    estimatedTime: "5 mins",
    nodes: [
      {
        id: 1,
        speaker: "scammer",
        dialogue:
          "This is Paytm support. Your KYC has expired and your wallet will be blocked in 2 hours. To update, please install AnyDesk on your phone and share the 9-digit code with me.",
        redFlags: [
          "Paytm KYC is done through the app — never via calls",
          "AnyDesk gives full remote access to your phone",
          "2-hour deadline is fake urgency",
        ],
        choices: [
          { text: "Install AnyDesk and share the code", nextNode: 2, points: -30, safe: false },
          { text: "Ask them to send the request through the Paytm app", nextNode: 3, points: 10, safe: true },
          { text: "Hang up and open Paytm app to check KYC status", nextNode: 4, points: 20, safe: true },
        ],
      },
      {
        id: 2,
        speaker: "system",
        dialogue:
          "WRONG: You installed AnyDesk. The scammer gained full control of your phone. They opened your Paytm and UPI apps and transferred Rs.35,000 in under 3 minutes.",
        redFlags: [],
        choices: [],
      },
      {
        id: 3,
        speaker: "scammer",
        dialogue:
          "The app is currently under maintenance. This is why we are calling directly. Please cooperate, this is the only way to save your account right now.",
        redFlags: [
          "Classic deflection when asked for official channel",
          "Only way language removes your options intentionally",
        ],
        choices: [
          { text: "Believe the maintenance excuse", nextNode: 2, points: -20, safe: false },
          { text: "Check Paytm app yourself — ignore their claim", nextNode: 4, points: 20, safe: true },
        ],
      },
      {
        id: 4,
        speaker: "system",
        dialogue:
          "CORRECT: You opened the Paytm app. KYC status shows Active — no issue. The entire call was fabricated. Paytm and all UPI apps handle KYC entirely within the app. No legitimate call is ever needed.",
        redFlags: [],
        choices: [],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SCENARIO 5 — Phishing Email
  // ─────────────────────────────────────────────
  {
    title: "Fake Income Tax Refund Email",
    category: "Phishing",
    type: "email",
    difficulty: "hard",
    estimatedTime: "6 mins",
    nodes: [
      {
        id: 1,
        speaker: "scammer",
        dialogue:
          "Subject: URGENT — Income Tax Refund of Rs.18,500 Pending\n\nDear Taxpayer, your ITR refund of Rs.18,500 is ready. Click the link below to enter your bank account details to receive the amount within 24 hours.\n\nLink: incometax-refund-portal.in/claim",
        redFlags: [
          "Official IT refund domain is incometax.gov.in — not .in",
          "Government never asks bank details via email link",
          "Urgency: 24-hour deadline",
          "Link domain is suspicious — not gov.in",
        ],
        choices: [
          { text: "Click the link and enter bank details", nextNode: 2, points: -30, safe: false },
          { text: "Hover over the link to check the real URL", nextNode: 3, points: 10, safe: true },
          { text: "Log in directly to incometax.gov.in to check refund status", nextNode: 4, points: 20, safe: true },
        ],
      },
      {
        id: 2,
        speaker: "system",
        dialogue:
          "WRONG: You clicked the link and entered your account number and IFSC. The fake site captured your credentials. Within hours, a fraudulent NEFT request was raised using your details.",
        redFlags: [],
        choices: [],
      },
      {
        id: 3,
        speaker: "scammer",
        dialogue:
          "The URL shows: http://incometax-refund-portal.in/claim/verify?token=8x92k\n\nNo HTTPS. No gov.in domain. The site is not secured.",
        redFlags: [
          "No HTTPS — data is not encrypted",
          "Not a .gov.in domain — all Indian govt sites use .gov.in",
          "Random token in URL is a tracking mechanism",
        ],
        choices: [
          { text: "Proceed anyway since the email looks real", nextNode: 2, points: -20, safe: false },
          { text: "Close it and visit incometax.gov.in directly", nextNode: 4, points: 20, safe: true },
        ],
      },
      {
        id: 4,
        speaker: "system",
        dialogue:
          "CORRECT: On incometax.gov.in, your refund status shows Already Credited from 3 weeks ago. The email was a phishing attempt. You also reported it to report.phishing@gov.in.",
        redFlags: [],
        choices: [],
      },
    ],
  },
];

// ─── Seed Function ────────────────────────────────────────
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("Connected to MongoDB");

    await Scenario.deleteMany({});
    console.log("Cleared existing scenarios");

    await Scenario.insertMany(scenarios);
    console.log("5 scenarios seeded successfully");

    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedDB();