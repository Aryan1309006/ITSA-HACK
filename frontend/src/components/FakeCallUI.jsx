import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone, faPhoneSlash, faMicrophone
} from "@fortawesome/free-solid-svg-icons";

import { simulateScammerVoice, stopVoice } from "../utils/VoiceSimulator";
import { voiceScenarios } from "../mockData";

export default function FakeCallQuiz() {
  const navigate = useNavigate();

  const [callState, setCallState] = useState("ringing");
  const [scenario, setScenario] = useState(null);
  const [selected, setSelected] = useState(null);

  // 🎯 Load random scenario
  useEffect(() => {
    const random = voiceScenarios[Math.floor(Math.random() * voiceScenarios.length)];
    setScenario(random);
  }, []);

  // 🔊 Voice
  useEffect(() => {
    if (callState === "speaking" && scenario?.transcript) {
      simulateScammerVoice(scenario.transcript, "english", () => {
        setCallState("choosing");
      });
    }
  }, [callState, scenario]);

  // 📞 Accept / Decline
  const handleAccept = () => setCallState("speaking");

  const handleDecline = () => {
    stopVoice();
    navigate("/result", {
      state: { score: 0, result: "declined" }
    });
  };

  // 🎮 Option Click
  const handleOption = (index) => {
    setSelected(index);
    stopVoice();

    const isCorrect = index === scenario.correctIndex;

    setTimeout(() => {
      navigate("/result", {
        state: {
          score: isCorrect ? 15 : 0,
          correct: isCorrect,
          question: scenario.question,
          explanation: scenario.explanation
        }
      });
    }, 1000);
  };

  if (!scenario) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">

      <div className="w-full max-w-sm bg-gray-900 rounded-3xl p-6 flex flex-col gap-4">

        {/* 📞 RINGING */}
        {callState === "ringing" && (
          <>
            <h2 className="text-white text-xl text-center">Incoming Call</h2>
            <p className="text-gray-400 text-center">{scenario.callFrom}</p>

            <div className="flex justify-around mt-6">
              <button onClick={handleDecline} className="bg-red-500 p-4 rounded-full">
                <FontAwesomeIcon icon={faPhoneSlash} />
              </button>

              <button onClick={handleAccept} className="bg-green-500 p-4 rounded-full animate-bounce">
                <FontAwesomeIcon icon={faPhone} />
              </button>
            </div>
          </>
        )}

        {/* 🔊 SPEAKING */}
        {callState === "speaking" && (
          <>
            <p className="text-green-400 text-sm flex gap-2">
              <FontAwesomeIcon icon={faMicrophone} />
              Speaking...
            </p>

            <p className="text-white text-sm">
              {scenario.transcript}
            </p>
          </>
        )}

        {/* 🎯 QUESTION */}
        {callState === "choosing" && (
          <>
            <h3 className="text-white font-semibold">
              {scenario.question}
            </h3>

            <div className="flex flex-col gap-2 mt-2">
              {scenario.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOption(i)}
                  className={`p-3 rounded-lg text-left border
                    ${selected === i
                      ? i === scenario.correctIndex
                        ? "bg-green-600 border-green-400"
                        : "bg-red-600 border-red-400"
                      : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}