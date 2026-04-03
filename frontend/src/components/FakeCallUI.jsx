import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faPhoneSlash,
  faUserShield,
  faMicrophoneSlash,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

const FakeCallUI = () => {
  const [callStatus, setCallStatus] = useState("incoming");
  const [timer, setTimer] = useState(0);

  const [showQuiz, setShowQuiz] = useState(false);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let interval;
    if (callStatus === "active") {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      setTimeout(() => setShowQuiz(true), 3000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswer = (option) => {
    setSelected(option);

    if (option === "A") {
      setFeedback(
        "❌ Wrong! Sharing OTP can give attackers full access to your bank account."
      );
    } else {
      setFeedback(
        "✅ Correct! Never share OTP or sensitive data over calls."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0524] flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 shadow-2xl">

        {/* Caller Info */}
        <div className="flex flex-col items-center mt-10">
          <div className="w-32 h-32 rounded-full border-2 border-cyan-500/30 bg-slate-900 flex items-center justify-center">
            <FontAwesomeIcon icon={faUserShield} className="text-4xl text-cyan-400" />
          </div>

          <h2 className="text-white text-2xl font-bold mt-6">
            Unknown Caller
          </h2>

          <p className="text-cyan-400 text-sm font-mono mt-2">
            {callStatus === "incoming"
              ? "Incoming Secure Line..."
              : formatTime(timer)}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-16 flex justify-around items-center">
          {callStatus === "incoming" ? (
            <>
              {/* Decline */}
              <button
                onClick={() => setCallStatus("ended")}
                className="flex flex-col items-center gap-2 text-red-500"
              >
                <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
                  <FontAwesomeIcon icon={faPhoneSlash} />
                </div>
                <span className="text-xs">Decline</span>
              </button>

              {/* Accept */}
              <button
                onClick={() => setCallStatus("active")}
                className="flex flex-col items-center gap-2 text-green-500"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 animate-bounce">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <span className="text-xs">Accept</span>
              </button>
            </>
          ) : (
            <div className="grid grid-cols-3 gap-6 w-full text-center">
              
              {/* Mute */}
              <div className="flex flex-col items-center text-slate-400">
                <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                  <FontAwesomeIcon icon={faMicrophoneSlash} />
                </div>
                <span className="text-[10px]">Mute</span>
              </div>

              {/* Speaker */}
              <div className="flex flex-col items-center text-slate-400">
                <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </div>
                <span className="text-[10px]">Speaker</span>
              </div>

              {/* End Call */}
              <button
                onClick={() => {
                  setCallStatus("incoming");
                  setTimer(0);
                  setShowQuiz(false);
                  setSelected(null);
                  setFeedback("");
                }}
                className="flex flex-col items-center text-red-500"
              >
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                  <FontAwesomeIcon icon={faPhoneSlash} />
                </div>
                <span className="text-[10px]">End</span>
              </button>
            </div>
          )}
        </div>

        {/* QUIZ */}
        {showQuiz && callStatus === "active" && (
          <div className="mt-8 p-4 rounded-xl bg-white/10 border border-white/10">
            <p className="text-white text-sm mb-4">
              ⚠️ Caller asks: “Share your OTP to verify your account.”
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleAnswer("A")}
                className="bg-white/10 hover:bg-white/20 text-white py-2 rounded"
              >
                Share OTP
              </button>

              <button
                onClick={() => handleAnswer("B")}
                className="bg-white/10 hover:bg-white/20 text-white py-2 rounded"
              >
                Refuse & Hang up
              </button>
            </div>

            {feedback && (
              <div className="mt-4 text-sm text-yellow-300">
                {feedback}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeCallUI;