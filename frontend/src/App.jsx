import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashbaord from "./Pages/Dashbaord";
import Home from "./Pages/Home";
import Results from "./Pages/Results";
import Simulation from "./Pages/Simulation";
// import Login from "./Pages/Login";
// import NotFound from "./Pages/NotFound";

import Navbar from "./components/Navbar";
import Footer  from "./components/Footer";

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
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/dashboard" element={<Dashbaord />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/result" element={<Results />} />
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