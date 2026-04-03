import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faUser,
  faTrophy
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className="bg-black/70 backdrop-blur-md border-b border-cyan-500/20 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-cyan-400 text-xl font-bold">
          <FontAwesomeIcon icon={faShieldAlt} />
          <span>ScamShield</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#" className="hover:text-cyan-400 transition">Home</a>
          <a href="#" className="hover:text-cyan-400 transition">Simulations</a>
          <a href="#" className="hover:text-cyan-400 transition">Leaderboard</a>
          <a href="#" className="hover:text-cyan-400 transition">Learn</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-300 hover:text-cyan-400">
            <FontAwesomeIcon icon={faTrophy} />
            <span className="hidden md:inline">Scores</span>
          </button>

          <button className="flex items-center gap-2 bg-cyan-500 text-black px-4 py-2 rounded-lg hover:bg-cyan-400 transition">
            <FontAwesomeIcon icon={faUser} />
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}