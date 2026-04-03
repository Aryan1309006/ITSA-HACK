import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faPhoneSlash, faUserShield } from "@fortawesome/free-solid-svg-icons";

const FakeCallUI = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-white">
      <div className="w-[350px] rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl text-center">

        {/* Caller Info */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-3xl">
            <FontAwesomeIcon icon={faUserShield} />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Bank Security</h2>
          <p className="text-gray-400 text-sm">Incoming Call...</p>
        </div>

        {/* Fake Message */}
        <p className="text-sm text-gray-300 mb-6">
          "Your account is compromised. Please share OTP to secure it."
        </p>

        {/* Buttons */}
        <div className="flex justify-between px-6">
          <button className="w-14 h-14 rounded-full bg-green-500 hover:scale-110 transition">
            <FontAwesomeIcon icon={faPhone} />
          </button>

          <button className="w-14 h-14 rounded-full bg-red-500 hover:scale-110 transition">
            <FontAwesomeIcon icon={faPhoneSlash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FakeCallUI;