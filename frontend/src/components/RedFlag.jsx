import React from "react";

const RedFlag = () => {
  const redFlags = [
    "Suspicious URL — not official HDFC domain",
    "Creates urgency with 'permanent lock'",
    "Generic message — no name used",
  ];

  return (
    <div className="bg-yellow-500/5 border border-yellow-400/30 rounded-2xl p-5 backdrop-blur-lg shadow-lg">
      <h2 className="text-yellow-400 font-semibold mb-3">
        ⚠ Red Flags Detected
      </h2>

      <ul className="space-y-2 text-sm text-gray-300">
        {redFlags.map((flag, index) => (
          <li key={index}>⚠ {flag}</li>
        ))}
      </ul>
    </div>
  );
};

export default RedFlag;