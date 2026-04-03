import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

function Auth() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [visible, setVisible] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      toast.error("Fill all fields");
      return;
    }

    // 🔥 Fake Auth (no backend)
    const user = {
      name: data.name || "User",
      email: data.email,
      role: data.role || "user",
    };

    localStorage.setItem("user", JSON.stringify(user));

    toast.success(isLogin ? "Login Success 🚀" : "Account Created 🎉");

    setTimeout(() => {
      navigate("/dashboard"); // change if needed
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#0B0F2A]">

      <ToastContainer position="top-center" theme="colored" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-[#0B0F2A] to-black" />

      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
          style={{
            top: `${10 + i * 10}%`,
            left: `${5 + i * 12}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Card */}
      <div
        className={`relative w-full max-w-md transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Glow */}
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur opacity-60" />

        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faBolt} className="text-white text-xl" />
            </div>

            <h2 className="text-2xl font-bold text-white mt-4">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Enter ScamShield Simulation
            </p>
          </div>

          {/* Toggle */}
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 mb-6">
            {["Login", "Register"].map((tab) => (
              <button
                key={tab}
                onClick={() => setIsLogin(tab === "Login")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    (tab === "Login") === isLogin
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "text-gray-400"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {!isLogin && (
              <input
                placeholder="Full Name"
                className="input"
                {...register("name")}
              />
            )}

            {!isLogin && (
              <input
                placeholder="Phone Number"
                className="input"
                {...register("phoneNumber")}
              />
            )}

            <input
              placeholder="Email"
              className="input"
              {...register("email")}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="input pr-10"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
              </button>
            </div>

            <select className="input text-gray-300" {...register("role")}>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold
              bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
              shadow-lg hover:scale-[1.03] hover:shadow-cyan-500/40
              active:scale-95 transition-all duration-200"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>

      {/* Tailwind reusable class */}
      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 14px;
          color: white;
          outline: none;
          transition: 0.2s;
        }
        .input:focus {
          border-color: #00F5FF;
          box-shadow: 0 0 0 2px rgba(0,245,255,0.2);
        }
      `}</style>
    </div>
  );
}

export default Auth;