export const scenarios = [
  {
    id: 'voice-phishing',
    title: 'Voice Phishing Attack',
    type: 'Vishing',
    difficulty: 'HARD',
    description:
      'Navigate a high-pressure vishing call simulation. Identify the scammer\'s tactics and protect sensitive information.',
    icon: '📞',
    color: 'cyan',
    path: '/fakecall',
  },
  {
    id: 'sms-smishing',
    title: 'SMS Smishing Alert',
    type: 'Smishing',
    difficulty: 'MEDIUM',
    description:
      'Analyze a series of text messages with suspicious links. Spot the smishing attempt before it\'s too late.',
    icon: '💬',
    color: 'purple',
    path: '/fakesms',
  },
  {
    id: 'email-phishing',
    title: 'Email Phishing Expedition',
    type: 'Phishing',
    difficulty: 'EASY',
    description:
      'Examine a targeted email campaign. Recognize the signs of a phishing attempt and report it correctly.',
    icon: '📧',
    color: 'cyan',
    path: '/fakeemail',
  },
  {
    id: 'investment-scam',
    title: 'Investment Scam Trap',
    type: 'Financial Fraud',
    difficulty: 'HARD',
    description:
      'Uncover a sophisticated investment scheme promising unrealistic returns. Avoid falling victim to financial fraud.',
    icon: '📈',
    color: 'purple',
    path: '/fakeemail',
  },
  {
    id: 'fake-job',
    title: 'Fake Job Offer',
    type: 'Employment Scam',
    difficulty: 'MEDIUM',
    description:
      'Identify a fraudulent job opportunity. Spot the red flags in the offer and interview process.',
    icon: '💼',
    color: 'cyan',
    path: '/fakeemail',
  },
  {
    id: 'tech-support',
    title: 'Tech Support Imposter',
    type: 'Impersonation',
    difficulty: 'EASY',
    description:
      'Respond to a simulated tech support scam. Recognize the imposter and prevent unauthorized access.',
    icon: '🖥️',
    color: 'purple',
    path: '/fakecall',
  },
];

export const filterPills = ['All Scams', 'OTP Fraud', 'Lottery Scam', 'Job Offer', 'Tech Support', 'Investment'];

export const voiceScenarios = [
  {
    id: 1,
    callFrom: 'VERIFIED BANKING CORP',
    transcript:
      '"Hello, I\'m calling from your bank\'s fraud department. We\'ve detected an urgent transfer request for $4,500. For security, please read back the one-time code I just sent..."',
    question: 'Identify the Red Flag in this caller\'s request.',
    options: [
      'The caller is using a polite and professional tone.',
      'The caller is asking you to reveal a "One-Time Password" (OTP).',
      'The call is coming from a "Verified" banking number.',
      'The caller correctly identified that you have a bank account.',
    ],
    correctIndex: 1,
    explanation:
      'Legitimate banks NEVER ask for your OTP over the phone. OTPs are personal security codes that should never be shared with anyone.',
  },
  {
    id: 2,
    callFrom: 'NATIONAL LOTTERY BOARD',
    transcript:
      '"Congratulations! You\'ve won $50,000 in our national lottery. To claim your prize, we need you to pay a processing fee of $200 first. Please provide your card details..."',
    question: 'What is the primary scam technique being used?',
    options: [
      'The caller congratulated you on winning a prize.',
      'The caller is requesting an upfront payment to release your "winnings".',
      'The caller mentioned a specific dollar amount.',
      'The caller asked for your name and address.',
    ],
    correctIndex: 1,
    explanation:
      'Advance fee fraud (or "419 scam") requires victims to pay upfront fees to claim fake prizes. Legitimate lotteries never require advance payments.',
  },
  {
    id: 3,
    callFrom: 'TAX AUTHORITY HOTLINE',
    transcript:
      '"This is Officer Johnson from the IRS. Our records show you owe $3,200 in back taxes. Failure to pay RIGHT NOW will result in immediate arrest. Pay via gift cards to avoid legal action..."',
    question: 'Which element of this call signals an impersonation scam?',
    options: [
      'They mentioned Officer Johnson by name.',
      'They referenced the IRS and tax records.',
      'They threatened immediate arrest and demanded gift card payment.',
      'They mentioned a specific amount owed.',
    ],
    correctIndex: 2,
    explanation:
      'Government agencies never demand immediate payment via gift cards. Creating urgency and threatening arrest are classic pressure tactics used by scammers to prevent critical thinking.',
  },
  {
    id: 4,
    callFrom: 'TECH SUPPORT CENTER',
    transcript:
      '"Hi, this is Microsoft Support. We\'ve detected a critical virus on your computer. We need remote access to fix it immediately. Please install this software and provide us your screen..."',
    question: 'How did this tech support scammer initiate contact?',
    options: [
      'They sent an email attachment first.',
      'They called you unsolicited claiming to detect a problem on your device.',
      'They showed a pop-up error message on your screen.',
      'They identified themselves with a badge number.',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft and other tech companies never make unsolicited calls. Receiving an unexpected call about "detected issues" is a hallmark of tech support scams targeting personal information and system access.',
  },
  {
    id: 5,
    callFrom: 'REGIONAL HEALTH AUTHORITY',
    transcript:
      '"Hello, this is Dr. Chen from the Regional Health Authority. We need to update your insurance records urgently. Please confirm your Social Security Number and date of birth for verification..."',
    question: 'What should you do when asked for personal identity information over an unsolicited call?',
    options: [
      'Provide it since the caller states they are from a legitimate authority.',
      'Ask if you can call back on the official number found independently.',
      'Provide only your name and city, not the full SSN.',
      'Hang up immediately as no legitimate authority needs it.',
    ],
    correctIndex: 1,
    explanation:
      'Best practice: Never provide SSN/personal info on unsolicited calls. Instead, hang up and call the organization back using a number from their official website — never the number the caller provides.',
  },
];

export const leaderboard = [
  { rank: 1, name: 'X_AE_A12', title: 'GRANDMASTER', score: 99.8 },
  { rank: 2, name: 'CYBER_KATE', title: 'ELITE', score: 98.4 },
  { rank: 3, name: 'NULL_PTR', title: 'GUARDIAN', score: 97.9 },
];
