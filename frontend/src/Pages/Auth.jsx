import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope, faLock, faUser, faBuilding,
  faShieldHalved, faTriangleExclamation, faArrowRight, faSpinner
} from "@fortawesome/free-solid-svg-icons";

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", password: "", institution: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password, institution: form.institution };

      const res = await API.post(endpoint, payload);
      login(res.data.user, res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setForm({ name: "", email: "", password: "", institution: "" });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-600 mb-4">
            <FontAwesomeIcon icon={faShieldHalved} className="text-white text-2xl" />
          </div>
          <h1 className="text-white text-3xl font-bold">ScamShield</h1>
          <p className="text-gray-400 text-sm mt-1">
            {isLogin ? "Log in to continue your training" : "Start your phishing awareness journey"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl p-8">

          {/* Tab Toggle */}
          <div className="flex rounded-xl bg-gray-800 p-1 mb-6">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(""); setForm({ name: "", email: "", password: "", institution: "" }); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all
                ${isLogin ? "bg-green-600 text-white shadow" : "text-gray-400 hover:text-white"}`}>
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(""); setForm({ name: "", email: "", password: "", institution: "" }); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all
                ${!isLogin ? "bg-green-600 text-white shadow" : "text-gray-400 hover:text-white"}`}>
              Sign Up
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5" role="alert">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Register-only fields */}
            {!isLogin && (
              <>
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-gray-300 text-sm font-medium">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      id="name" name="name" type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl
                        pl-10 pr-4 py-3 placeholder-gray-500
                        focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                        transition-colors"
                    />
                  </div>
                </div>

                {/* Institution */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="institution" className="text-gray-300 text-sm font-medium">
                    Institution <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faBuilding} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      id="institution" name="institution" type="text"
                      placeholder="e.g. SFIT, MIT, Google"
                      value={form.institution}
                      onChange={handleChange}
                      autoComplete="organization"
                      className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl
                        pl-10 pr-4 py-3 placeholder-gray-500
                        focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                        transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-gray-300 text-sm font-medium">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  id="email" name="email" type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl
                    pl-10 pr-4 py-3 placeholder-gray-500
                    focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                    transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-gray-300 text-sm font-medium">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  id="password" name="password" type="password"
                  placeholder={isLogin ? "Your password" : "Min. 6 characters"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl
                    pl-10 pr-4 py-3 placeholder-gray-500
                    focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                    transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-green-600 hover:bg-green-500 disabled:bg-green-800
                disabled:cursor-not-allowed text-white font-semibold text-sm
                py-3 rounded-xl flex items-center justify-center gap-2
                transition-colors active:scale-95">
              {loading
                ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Please wait...</>
                : <>{isLogin ? "Log In" : "Create Account"} <FontAwesomeIcon icon={faArrowRight} /></>
              }
            </button>

          </form>
        </div>

        {/* Bottom toggle text */}
        <p className="text-center text-gray-500 text-sm mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={switchMode} type="button"
            className="text-green-400 hover:text-green-300 font-semibold transition-colors">
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>

      </div>
    </div>
  );
}