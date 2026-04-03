import { useEffect, useState, useContext } from "react";

// If using FontAwesome, import the icons here
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBullseye, faShieldHalved, faTriangleExclamation, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ResultsCard = () => {
   useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  return (
    <div className="min-h-screen bg-[#0f0524] flex items-center justify-center p-4 pt-25 font-sans selection:bg-cyan-500/30">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-[120px]" />

      {/* Main Glass Card */}
      <div className="relative w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50">
        
        {/* Grade Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-green-500/50 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
            <span className="text-4xl font-bold text-green-400">A</span>
          </div>
        </div>

        {/* Header Text */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">Well Protected</h1>
          <p className="text-slate-400 mt-1 uppercase tracking-widest text-xs font-semibold">Bank Alert Scam</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {/* Score */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center group hover:border-cyan-500/50 transition-colors">
            <div className="text-cyan-400 mb-2 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="6"/></svg>
            </div>
            <div className="text-2xl font-bold text-white">83%</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Score</div>
          </div>

          {/* Correct */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center group hover:border-green-500/50 transition-colors">
            <div className="text-green-400 mb-2 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            <div className="text-2xl font-bold text-white">2/2</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Correct</div>
          </div>

          {/* Flags */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center group hover:border-orange-500/50 transition-colors">
            <div className="text-orange-400 mb-2 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div className="text-2xl font-bold text-white">6</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Flags Found</div>
          </div>
        </div>

        {/* Security Tips Section */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm">
            <span>📋</span>
            <span className="uppercase tracking-wider">Security Tips</span>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-slate-300 leading-relaxed">
              <span className="text-cyan-400 mt-1">▶</span>
              Never share personal information through unsolicited messages or calls.
            </li>
            <li className="flex gap-3 text-sm text-slate-300 leading-relaxed">
              <span className="text-cyan-400 mt-1">▶</span>
              When in doubt, contact the organization directly using their official website.
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.4)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Scenarios
        </button>

      </div>
    </div>
  );
};

export default ResultsCard;