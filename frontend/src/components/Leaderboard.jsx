import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await API.get("/leaderboard");
        setLeaderboard(res.data.leaderboard);
        
        const rankRes = await API.get("/leaderboard/rank");
        setUserRank(rankRes.data);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F2A] text-white px-4 py-10 relative overflow-hidden mt-15">
        <div className="flex items-center justify-center h-96 text-xl">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F2A] text-white px-4 py-10 relative overflow-hidden mt-15">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-[#0B0F2A] to-black" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-gray-400 mt-2">Top performers in scam detection training</p>
        </div>

        {userRank && (
          <div className="mb-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-widest">Your Rank</p>
                <p className="text-3xl font-bold text-cyan-400"># {userRank.rank}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-widest">Your Score</p>
                <p className="text-3xl font-bold text-purple-400">{userRank.totalScore}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-widest">Scenarios Completed</p>
                <p className="text-3xl font-bold text-green-400">{userRank.scenariosCompleted}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          {leaderboard.map((user, index) => (
            <div
              key={user._id}
              className="flex items-center justify-between px-4 py-3 border-b border-white/10 last:border-none hover:bg-white/5 rounded-lg transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-400 w-6 font-bold text-lg">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                </span>
                <div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.institution || "N/A"}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 font-semibold">{user.totalScore} pts</p>
                <p className="text-gray-500 text-sm">{user.scenariosCompleted} scenarios</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}