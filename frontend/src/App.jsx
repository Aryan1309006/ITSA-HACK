import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./Pages/Home";
import Results from "./Pages/Results";
import Simulation from "./Pages/Simulation";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";

import Navbar from "./components/Navbar";
import Footer  from "./components/Footer";
import Leaderboard from "./components/Leaderboard";
import Auth from "./Pages/Auth";
import FakeCallUI from "./components/FakeCallUI";
import FakeSMSUI from "./components/FakeSMSUI";
import FakeEmailUI from "./components/FakeEmailUI";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/auth" replace />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return !user ? children : <Navigate to="/home" replace />;
}

function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen flex flex-col">
        
        {/* Navbar */}
        <Navbar/>

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<PublicRoute><Auth/></PublicRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/simulation" element={<ProtectedRoute><Simulation /></ProtectedRoute>} />
            <Route path="/result" element={<ProtectedRoute><Results /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard/></ProtectedRoute>} />
            <Route path="/fakecall" element={<ProtectedRoute><FakeCallUI/></ProtectedRoute>} />
            <Route path="/fakeemail" element={<ProtectedRoute><FakeEmailUI/></ProtectedRoute>} />
            <Route path="/fakesms" element={<ProtectedRoute><FakeSMSUI/></ProtectedRoute>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer/>

      </div>
    </Router>
  );
}

export default App;