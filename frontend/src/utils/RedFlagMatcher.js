const RED_FLAG_TRIGGERS = {
  "otp"                        : "Banks will NEVER ask for your OTP over the phone.",
  "share your otp"             : "No legitimate organisation ever asks for your OTP.",
  "verify immediately"         : "Urgency is a manipulation tactic. Legitimate institutions give you time.",
  "account will be blocked"    : "Threats of blocking are a classic scam pressure technique.",
  "account will be suspended"  : "Suspension threats create panic — exactly what scammers want.",
  "click this link"            : "Never click links from unknown or unverified senders.",
  "click here"                 : "Always navigate to official websites directly, never via links.",
  "prize money"                : "Lottery scams always require upfront payment or personal info.",
  "you have won"               : "Unsolicited prize notifications are almost always scams.",
  "processing fee"             : "Legitimate prizes never require a fee to claim.",
  "security deposit"           : "No real employer charges a deposit before hiring you.",
  "aadhaar"                    : "Government agencies contact you through official channels only.",
  "pan card"                   : "Never share PAN details over a call or unofficial link.",
  "kyc update"                 : "Banks send KYC reminders via official registered mail, not SMS links.",
  "arrest"                     : "Police and CBI never demand money over a phone call.",
  "legal action"               : "Threats of legal action over phone are a fear tactic.",
  "upi"                        : "Never transfer money via UPI to someone you cannot verify.",
  "refund"                     : "Fake refund scams ask for your card details — real refunds are automatic.",
  "remote access"              : "Never give anyone remote access to your device.",
  "anydesk"                    : "Scammers use remote access tools like AnyDesk to steal your data.",
  "password"                   : "No bank or service will ever ask for your password.",
};

// Returns array of { keyword, explanation } found in the dialogue
const matchRedFlags = (dialogue) => {
  const lower = dialogue.toLowerCase();
  const found = [];

  for (const [keyword, explanation] of Object.entries(RED_FLAG_TRIGGERS)) {
    if (lower.includes(keyword)) {
      found.push({ keyword, explanation });
    }
  }

  return found; // empty array = no red flags found
};

// Wraps matched keywords in <mark> tags for highlighting in UI
const highlightRedFlags = (dialogue) => {
  let result = dialogue;
  const lower = dialogue.toLowerCase();

  for (const keyword of Object.keys(RED_FLAG_TRIGGERS)) {
    const index = lower.indexOf(keyword);
    if (index !== -1) {
      const original = dialogue.substring(index, index + keyword.length);
      result = result.replace(
        original,
        `<mark class="red-flag" data-tip="${RED_FLAG_TRIGGERS[keyword]}">${original}</mark>`
      );
    }
  }

  return result;
};

export { matchRedFlags, highlightRedFlags, RED_FLAG_TRIGGERS };