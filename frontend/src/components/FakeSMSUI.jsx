import React, { useState } from "react";

const FakeSMSUI = () => {
  const [selected, setSelected] = useState(null);

  const options = [
    { id: "A", text: "Click the link to check my account", safe: false },
    { id: "B", text: 'Reply "STOP" to unsubscribe', safe: false },
    { id: "C", text: "Call my bank using official number", safe: true },
    { id: "D", text: "Ignore the message", safe: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F2A] via-[#1a1f4d] to-[#000000] text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* 🔮 BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full bottom-10 right-10"></div>

      {/* 🔝 NAVBAR */}
      <div className="absolute top-5 w-[90%] max-w-6xl flex justify-between items-center px-6 py-3 
      bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
        <span className="text-gray-300 cursor-pointer hover:text-white">← EXIT</span>
        <span className="text-white font-semibold">Bank Alert Scam</span>
        <span className="text-cyan-400 font-semibold">SCORE 0</span>
      </div>

      {/* 📱 CENTER PHONE UI */}
      <div className="relative z-10 w-[320px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="p-4 border-b border-white/10 flex gap-3">
          <div className="w-10 h-10 bg-pink-500/30 rounded-full flex items-center justify-center shadow-md">
            🏦
          </div>
          <div>
            <p className="font-semibold">+1-800-XXX-XXXX</p>
            <p className="text-xs text-gray-400">SMS</p>
          </div>
        </div>

        {/* MESSAGE */}
        <div className="p-4">
          <div className="bg-white/10 p-3 rounded-xl text-sm leading-relaxed">
            🚨 ALERT: Your HDFC account has been suspended due to suspicious activity.
            Verify immediately to avoid permanent lock:
            <br />
            <span className="text-cyan-400">
              https://hdfc-secure-verify.com/auth
            </span>
          </div>
        </div>

        {/* OPTIONS */}
        <div className="p-4 border-t border-white/10">
          <p className="text-yellow-400 text-xs mb-2 tracking-wide">
            ▶ WHAT DO YOU DO?
          </p>

          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt)}
              className={`w-full text-left p-3 mb-2 rounded-xl border transition-all duration-300
              ${
                selected?.id === opt.id
                  ? opt.safe
                    ? "border-green-400 bg-green-400/10 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    : "border-red-400 bg-red-400/10 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  : "border-white/10 hover:border-cyan-400 hover:shadow-[0_0_10px_#00F5FF]"
              }`}
            >
              <span className="text-cyan-400 mr-2">{opt.id}.</span>
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* ⚠️ FLOATING RED FLAGS */}
      <div className="absolute right-10 top-1/3 w-[260px] 
      bg-red-500/10 border border-red-400/30 backdrop-blur-lg rounded-2xl p-4 
      shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">

        <h2 className="text-red-400 font-semibold mb-2">⚠ Red Flags</h2>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>⚠ Suspicious URL</li>
          <li>⚠ Urgency pressure</li>
          <li>⚠ No personalization</li>
        </ul>
      </div>

      {/* 🟢 FLOATING GREEN FLAGS */}
      <div className="absolute left-10 bottom-1/4 w-[260px] 
      bg-green-500/10 border border-green-400/30 backdrop-blur-lg rounded-2xl p-4 
      shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse">

        <h2 className="text-green-400 font-semibold mb-2">🟢 Safe Actions</h2>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>✔ Call official bank number</li>
          <li>✔ Ignore suspicious message</li>
          <li>✔ Avoid clicking unknown links</li>
        </ul>
      </div>

    </div>
  );
};

export default FakeSMSUI;