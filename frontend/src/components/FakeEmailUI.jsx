import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameSession } from "../hooks/useGameSession";
import ScenarioResult from "./ScenarioResult";

const FakeEmailUI = () => {
  const navigate = useNavigate();
  const { score, feedback, sessionComplete, submitAnswer, saveSession, resetSession } = useGameSession();
  const [selected, setSelected] = useState(null);

  const options = [
    { id: "A", text: "Open the attachment to inspect the invoice", safe: false },
    { id: "B", text: "Reply asking for more details", safe: false },
    { id: "C", text: "Verify the sender address and report the email", safe: true },
    { id: "D", text: "Click the link to update payment information", safe: false },
  ];

  const handleOptionClick = (option) => {
    setSelected(option);
    submitAnswer(option.safe);
  };

  const handleContinue = async () => {
    try {
      await saveSession({
        scenarioId: 'email-phishing',
        scenarioTitle: 'Email Phishing Expedition',
        redFlagsSpotted: selected?.safe ? 1 : 0,
        totalRedFlags: 1,
        choicesMade: [selected?.id],
        vulnerabilityType: 'Phishing',
      });
    } catch (err) {
      console.error('Failed to save session:', err);
    }
  };

  if (sessionComplete) {
    return (
      <ScenarioResult
        isCorrect={feedback?.isCorrect}
        points={feedback?.points}
        onContinue={handleContinue}
        onHome={() => {
          resetSession();
          window.location.href = "/home";
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,229,255,0.16),_transparent_25%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(191,0,255,0.12),_transparent_20%)]" />

      <div className="relative w-full max-w-3xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-slate-950/95 px-6 py-5 border-b border-white/10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Scenario · Email Phishing</p>
            <h1 className="text-2xl font-bold text-white">Score: {Math.max(0, score)}</h1>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="px-4 py-2 rounded-full bg-cyan-500 text-black text-sm font-semibold hover:bg-cyan-400 transition"
          >
            Exit
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] p-6">
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">From</p>
              <p className="mt-2 font-semibold text-white">noreply@trusted-payments.com</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Subject</p>
              <p className="mt-2 font-semibold text-white">Payment Failed: Verify your account</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Received</p>
              <p className="mt-2 text-white/80">Today · 9:22 AM</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Dear customer, your recent transaction has failed due to a payment issue. Please verify your account immediately by clicking the secure link below.
              Failure to verify may result in account suspension.
            </p>
            <div className="rounded-3xl bg-black/60 border border-white/10 p-5 mb-6">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Link</p>
              <p className="mt-2 text-cyan-300">https://trusted-payments.verify-account.com</p>
            </div>

            <div className="space-y-3">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt)}
                  disabled={selected !== null}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
                    selected?.id === opt.id
                      ? opt.safe
                        ? "border-emerald-400 bg-emerald-400/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                        : "border-red-400 bg-red-400/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                      : "border-white/10 bg-white/5 hover:border-cyan-400 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-white">{opt.id}.</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {opt.safe ? "Safe" : "Risky"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{opt.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeEmailUI;
