import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashbaord from "./Pages/Dashbaord";
import Home from "./Pages/Home";
import Results from "./Pages/Results";
import Simulation from "./Pages/Simulation";
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
            <Route path="/dashboard" element={<Dashbaord />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/result" element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard/>} />
            <Route path="/fakecall" element={<FakeCallUI/>} />
            <Route path="/fakesms" element={<FakeSMSUI/>} />
            <Route path="/dashboard" element={<Dashbaord/>} />
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