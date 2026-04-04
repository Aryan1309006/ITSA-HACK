import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faTrophy } from '@fortawesome/free-solid-svg-icons';

const ScenarioResult = ({ isCorrect, points = 0, onContinue, onHome }) => {
  const navigate = useNavigate();

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full sm:max-w-md bg-linear-to-b from-gray-900 to-gray-950 rounded-3xl overflow-hidden shadow-2xl p-8">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold ${
            isCorrect 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {isCorrect ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faTimes} />
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          {isCorrect ? 'Well Protected!' : 'Vulnerable!'}
        </h1>
        <p className="text-gray-400 text-center mb-8">
          {isCorrect 
            ? 'You correctly identified the scam!'
            : 'You fell for the scam. Learn the red flags!'}
        </p>

        {/* Score */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="text-center">
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Points Earned</p>
            <p className={`text-5xl font-bold ${
              isCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrect ? '+15' : '-15'}
            </p>
            <p className="text-slate-500 text-sm mt-2">Total: {points > 0 ? points : 0} points</p>
          </div>
        </div>

        {/* Message */}
        <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-4 mb-8">
          <p className="text-sm text-slate-300 leading-relaxed">
            {isCorrect 
              ? 'Great job spotting the red flags! Stay vigilant against social engineering attempts.'
              : 'Remember: Legitimate organizations never ask for sensitive info via email or calls. Always verify independently!'}
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl transition"
          >
            Next Scenario
          </button>
          <button
            onClick={handleLeaderboard}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faTrophy} />
            View Leaderboard
          </button>
          <button
            onClick={handleHome}
            className="w-full bg-white/5 hover:bg-white/10 text-slate-300 font-semibold py-3 rounded-xl transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioResult;
