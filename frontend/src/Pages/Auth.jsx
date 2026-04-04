import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    institution: "",
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

      // Save to contexgit statust + localStorage
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
    <div className="auth-page">
      <div className="auth-card">

        {/* Header */}
        <div className="auth-header">
          <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p>{isLogin ? "Log in to continue your training" : "Start your phishing awareness journey"}</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>

          {/* Register-only fields */}
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name <span>*</span></label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="institution">Institution <span className="optional">(optional)</span></label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  placeholder="e.g. MIT, Google, SFIT"
                  value={form.institution}
                  onChange={handleChange}
                  autoComplete="organization"
                />
              </div>
            </>
          )}

          {/* Shared fields */}
          <div className="form-group">
            <label htmlFor="email">Email <span>*</span></label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password <span>*</span></label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder={isLogin ? "Your password" : "Min. 6 characters"}
              value={form.password}
              onChange={handleChange}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Log In" : "Create Account"}
          </button>

        </form>

        {/* Toggle */}
        <div className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={switchMode} type="button">
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>

      </div>
    </div>
  );
}