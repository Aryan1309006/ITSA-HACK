import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#0B0F2A] text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-[#0B0F2A] to-black" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />

      {/* Content */}
      <div className="relative text-center max-w-md">

        {/* Glow Box */}
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur opacity-50" />

        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">

          {/* Icon */}
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-5 shadow-lg">
            <FontAwesomeIcon icon={faShieldHalved} className="text-white text-xl" />
          </div>

          {/* 404 Text */}
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            404
          </h1>

          <h2 className="text-xl font-semibold mt-3">
            Page Not Found
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            This page doesn’t exist or might be a scam link 👀
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/")}
            className="mt-6 flex items-center justify-center gap-2 mx-auto
            px-6 py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
            shadow-lg hover:scale-[1.05] hover:shadow-cyan-500/40
            active:scale-95 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Go Home
          </button>

        </div>
      </div>
    </div>
  );
}

export default NotFound;