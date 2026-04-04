import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone, faPhoneSlash, faMicrophone,
  faSignal, faCircle, faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { simulateScammerVoice, stopVoice } from "../utils/VoiceSimulator";
import { highlightRedFlags } from "../utils/RedFlagMatcher";

export default function FakeCallUI({
  scenario, currentNode, language = "english",
  onAccept, onDecline, onChoice, onHangUp
}) {

  const [callState, setCallState] = useState("ringing");
  const [voiceDone, setVoiceDone] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (!["active", "speaking", "choosing"].includes(callState)) return;
    const timer = setInterval(() => setCallDuration(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [callState]);

  useEffect(() => {
    if (callState === "speaking" && currentNode?.dialogue) {
      setVoiceDone(false);
      simulateScammerVoice(currentNode.dialogue, language, () => {
        setVoiceDone(true);
        setCallState("choosing");
      });
    }
  }, [currentNode, callState]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleAccept  = () => { setCallState("speaking"); onAccept?.(); };
  const handleDecline = () => { stopVoice(); setCallState("ended"); onDecline?.(); };
  const handleHangUp  = () => { stopVoice(); setCallState("ended"); onHangUp?.(); };
  const handleChoice  = (choice) => {
    stopVoice();
    setVoiceDone(false);
    setCallState("speaking");
    onChoice?.(choice);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full sm:max-w-sm bg-gradient-to-b from-gray-900 to-gray-950 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl min-h-[70vh] sm:min-h-0 flex flex-col">

        {/* ── RINGING ── */}
        {callState === "ringing" && (
          <div className="flex flex-col items-center justify-between flex-1 px-6 pt-12 pb-16">

            {/* Pulsing Avatar */}
            <div className="relative flex items-center justify-center mb-6">
              <span className="absolute inline-flex h-36 w-36 rounded-full bg-green-500/10 animate-ping" />
              <span className="absolute inline-flex h-28 w-28 rounded-full bg-green-500/20 animate-pulse" />
              <div className="relative z-10 h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-white border-4 border-green-500">
                {scenario?.callerName?.[0] || "?"}
              </div>
            </div>

            {/* Caller Info */}
            <div className="text-center mb-2">
              <p className="text-gray-400 text-sm mb-1 tracking-widest uppercase">Incoming Call</p>
              <h2 className="text-white text-2xl font-semibold">{scenario?.callerName || "Unknown"}</h2>
              <p className="text-gray-400 text-sm mt-1">{scenario?.callerNumber || "+91 XXXXX XXXXX"}</p>
              <p className="text-gray-500 text-xs mt-1 flex items-center justify-center gap-1">
                <FontAwesomeIcon icon={faSignal} className="text-gray-500" />
                Airtel India
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex gap-2 mt-4 mb-8">
              {["english", "hindi", "marathi"].map((lang) => (
                <span key={lang}
                  className={`px-3 py-1 rounded-full text-xs capitalize font-medium border
                    ${language === lang
                      ? "bg-green-600 text-white border-green-500"
                      : "bg-gray-800 text-gray-400 border-gray-700"}`}>
                  {lang === "hindi" ? "हिंदी" : lang === "marathi" ? "मराठी" : "English"}
                </span>
              ))}
            </div>

            {/* Accept / Decline */}
            <div className="flex justify-around w-full mt-auto">
              <button onClick={handleDecline} aria-label="Decline call"
                className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                  <FontAwesomeIcon icon={faPhoneSlash} className="text-white text-xl" />
                </div>
                <span className="text-gray-400 text-xs">Decline</span>
              </button>

              <button onClick={handleAccept} aria-label="Accept call"
                className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg group-active:scale-95 transition-transform animate-bounce">
                  <FontAwesomeIcon icon={faPhone} className="text-white text-xl" />
                </div>
                <span className="text-gray-400 text-xs">Accept</span>
              </button>
            </div>
          </div>
        )}

        {/* ── ACTIVE / SPEAKING / CHOOSING ── */}
        {["active", "speaking", "choosing"].includes(callState) && (
          <div className="flex flex-col flex-1 px-4 pt-8 pb-6 gap-4">

            {/* Header */}
            <div className="text-center">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-2
                ${callState === "speaking" ? "bg-red-600 text-white animate-pulse" : "bg-green-700 text-white"}`}>
                <FontAwesomeIcon icon={faCircle} className="text-[8px]" />
                {callState === "speaking" ? "Live Call" : "On Call"}
              </span>
              <p className="text-white text-3xl font-mono font-bold">{formatTime(callDuration)}</p>
              <p className="text-white font-semibold text-lg mt-1">{scenario?.callerName}</p>
              <p className="text-gray-400 text-sm">{scenario?.callerNumber}</p>
            </div>

            {/* Dialogue Bubble */}
            {currentNode?.dialogue && (
              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-4 border border-gray-700">
                <p className="text-green-400 text-xs font-semibold mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faMicrophone} />
                  {scenario?.callerName} says:
                </p>
                <p
                  className="text-gray-100 text-sm leading-relaxed
                    [&_mark]:bg-yellow-400 [&_mark]:text-black [&_mark]:rounded
                    [&_mark]:px-1 [&_mark]:cursor-pointer [&_mark]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: highlightRedFlags(currentNode.dialogue) }}
                />

                {/* Speaking Bars */}
                {callState === "speaking" && (
                  <div className="flex items-center gap-1 mt-3">
                    {[0, 150, 300].map((delay) => (
                      <span key={delay}
                        className="w-1 h-4 bg-green-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                    <span className="text-green-400 text-xs ml-2">Speaking...</span>
                  </div>
                )}
              </div>
            )}

            {/* Choices */}
            {callState === "choosing" && currentNode?.choices && (
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  How do you respond?
                </p>
                {currentNode.choices.map((choice, i) => (
                  <button key={i} onClick={() => handleChoice(choice)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gray-800 border border-gray-600
                      text-white text-sm hover:bg-gray-700 hover:border-green-500
                      active:scale-95 transition-all">
                    {choice.text}
                  </button>
                ))}
              </div>
            )}

            {/* Hang Up */}
            <button onClick={handleHangUp} aria-label="Hang up"
              className="mt-auto mx-auto flex flex-col items-center gap-1 group">
              <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                <FontAwesomeIcon icon={faPhoneSlash} className="text-white text-lg" />
              </div>
              <span className="text-gray-400 text-xs">Hang Up</span>
            </button>
          </div>
        )}

        {/* ── ENDED ── */}
        {callState === "ended" && (
          <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 gap-3">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
              <FontAwesomeIcon icon={faPhoneSlash} className="text-red-400 text-2xl" />
            </div>
            <h2 className="text-white text-xl font-semibold">Call Ended</h2>
            <p className="text-gray-400 text-lg font-mono">{formatTime(callDuration)}</p>
          </div>
        )}

      </div>
    </div>
  );
}