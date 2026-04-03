import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faMedal,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 🔥 Dummy data (replace later with backend)
    const dummyUsers = [
      { name: "Aryan", score: 320 },
      { name: "Rahul", score: 290 },
      { name: "Sneha", score: 270 },
      { name: "Amit", score: 240 },
      { name: "Priya", score: 220 },
      { name: "Karan", score: 200 },
    ];

    setUsers(dummyUsers.sort((a, b) => b.score - a.score));
  }, []);

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="min-h-screen bg-[#0B0F2A] text-white px-4 py-10 relative overflow-hidden mt-15">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-[#0B0F2A] to-black" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />

      <div className="relative max-w-5xl mx-auto">

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-gray-400 mt-2">
            Top performers in ScamShield 🚀
          </p>
        </div>

        {/* 🥇 Top 3 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {top3.map((user, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl text-center backdrop-blur-xl border border-white/10
              ${
                index === 0
                  ? "bg-yellow-500/10 shadow-yellow-400/40"
                  : index === 1
                  ? "bg-gray-400/10 shadow-gray-300/40"
                  : "bg-orange-500/10 shadow-orange-400/40"
              } shadow-lg`}
            >
              {/* Glow */}
              <div className="absolute -inset-[2px] rounded-2xl blur opacity-50 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

              <div className="relative">
                <div className="text-3xl mb-2">
                  {index === 0 && <FontAwesomeIcon icon={faCrown} />}
                  {index === 1 && <FontAwesomeIcon icon={faMedal} />}
                  {index === 2 && <FontAwesomeIcon icon={faTrophy} />}
                </div>

                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-300 mt-1">{user.score} pts</p>
              </div>
            </div>
          ))}
        </div>

        {/* 📋 Rest List */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          {rest.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 border-b border-white/10 last:border-none hover:bg-white/5 rounded-lg transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-400 w-6">
                  #{index + 4}
                </span>
                <span>{user.name}</span>
              </div>

              <span className="text-cyan-400 font-semibold">
                {user.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;