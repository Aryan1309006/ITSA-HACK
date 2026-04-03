import React from "react";

const GreenFlagsPanel = () => {
  const greenFlags = [
    "Calling official bank number is safe",
    "Ignoring suspicious messages prevents fraud",
    "Never click unknown links",
  ];

  return (
    <div className="bg-green-500/5 border border-green-400/30 rounded-2xl p-5 backdrop-blur-lg shadow-lg">
      <h2 className="text-green-400 font-semibold mb-3">
        🟢 Safe Actions
      </h2>

      <ul className="space-y-2 text-sm text-gray-300">
        {greenFlags.map((flag, index) => (
          <li key={index}>✔ {flag}</li>
        ))}
      </ul>
    </div>
  );
};

export default GreenFlagsPanel;