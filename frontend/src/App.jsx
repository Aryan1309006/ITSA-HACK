import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Results from "./Pages/Results";
import Simulation from "./Pages/Simulation";
import Dashboard from "./Pages/Dashboard";
// import NotFound from "./Pages/NotFound";

import Navbar from "./components/Navbar";
import Footer  from "./components/Footer";
import Leaderboard from "./components/Leaderboard";
import Auth from "./Pages/Auth";
import FakeCallUI from "./components/FakeCallUI";
import FakeSMSUI from "./components/FakeSMSUI";

function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen flex flex-col">
        
        {/* Navbar */}
        <Navbar/>

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/result" element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard/>} />
            <Route path="/fakecall" element={<FakeCallUI/>} />
            <Route path="/fakesms" element={<FakeSMSUI/>} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            {/* <Route path="*" element={<NotFound/>} /> */}
          </Routes>
        </div>

        {/* Footer */}
        <Footer/>

      </div>
    </Router>
  );
}

export default App;