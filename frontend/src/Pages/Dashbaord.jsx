import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBolt,
  faShieldHalved,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored || { name: "Guest", role: "user" });
  }, []);

  // 🔥 Dummy Data
  const stats = {
    totalScore: 320,
    scenariosPlayed: 8,
    safeChoices: 22,
    riskyChoices: 6,
  };

  const scenarios = [
    { title: "OTP Scam", status: "Completed", score: 80 },
    { title: "Lottery Scam", status: "Completed", score: 70 },
    { title: "Fake Job Offer", status: "In Progress", score: 40 },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F2A] text-white px-4 py-8 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-[#0B0F2A] to-black" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Welcome, <span className="text-cyan-400">{user?.name}</span> 👋
          </h1>
          <p className="text-gray-400">
            Track your scam awareness performance
          </p>
        </div>

        {/* 🔥 Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          {[
            { label: "Total Score", value: stats.totalScore, icon: faChartLine },
            { label: "Scenarios", value: stats.scenariosPlayed, icon: faBolt },
            { label: "Safe Choices", value: stats.safeChoices, icon: faShieldHalved },
            { label: "Risky Choices", value: stats.riskyChoices, icon: faTriangleExclamation },
          ].map((item, i) => (
            <div
              key={i}
              className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
            >
              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur opacity-30" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{item.label}</p>
                  <h2 className="text-xl font-bold mt-1">{item.value}</h2>
                </div>
                <FontAwesomeIcon icon={item.icon} className="text-cyan-400 text-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* 📊 Main Section */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Scenario Progress */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Scenario Progress</h2>

            {scenarios.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between mb-3 p-3 rounded-lg hover:bg-white/5 transition"
              >
                <div>
                  <p>{s.title}</p>
                  <span className="text-xs text-gray-400">{s.status}</span>
                </div>

                <span className="text-cyan-400 font-semibold">
                  {s.score} pts
                </span>
              </div>
            ))}
          </div>

          {/* Weak Areas */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Weak Areas</h2>

            <ul className="space-y-3 text-gray-300">
              <li>⚠️ Urgency pressure scams</li>
              <li>⚠️ OTP sharing mistakes</li>
              <li>⚠️ Clicking unknown links</li>
            </ul>
          </div>

        </div>

        {/* 📈 Recent Activity */}
        <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-3 text-gray-300">
            <p>✅ Completed OTP Scam — Score 80</p>
            <p>⚠️ Failed Lottery Scam — Score 50</p>
            <p>🎯 Improved Safe Decisions by 20%</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;