import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";


export default function Footer() {
  return (
    <footer className="bg-black border-t border-cyan-500/20 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-cyan-400 text-xl font-bold flex items-center gap-2">
            <FontAwesomeIcon icon={faShieldAlt} />
            ScamShield
          </h2>
          <p className="mt-3 text-sm">
            Learn. Detect. Defend.  
            Interactive scam awareness platform.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h3 className="text-white font-semibold mb-3">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400">Simulations</a></li>
            <li><a href="#" className="hover:text-cyan-400">Leaderboard</a></li>
            <li><a href="#" className="hover:text-cyan-400">Reports</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400">Scam Alerts</a></li>
            <li><a href="#" className="hover:text-cyan-400">Safety Tips</a></li>
            <li><a href="#" className="hover:text-cyan-400">Help Center</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-lg">
            {/* <FontAwesomeIcon icon={faGithub} className="hover:text-cyan-400 cursor-pointer" />
            <FontAwesomeIcon icon={faLinkedin} className="hover:text-cyan-400 cursor-pointer" />
            <FontAwesomeIcon icon={faTwitter} className="hover:text-cyan-400 cursor-pointer" /> */}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm border-t border-gray-800 py-4">
        © 2026 ScamShield | Built for ITSA Hackathon 🚀
      </div>
    </footer>
  );
}
