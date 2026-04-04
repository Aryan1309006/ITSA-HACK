import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './context/AuthContext';

import Auth from './Pages/Auth.jsx';
import Home from './Pages/Home.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Simulation from './Pages/Simulation.jsx';
import Results from './Pages/Results.jsx';
import NotFound from './Pages/NotFound.jsx';

//Animation config
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -16 },
};
const pageTransition = { duration: 0.35, ease: 'easeInOut' };

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  return user ? children : <Navigate to="/auth" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  return !user ? children : <Navigate to="/home" replace />;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{ minHeight: '100vh' }}
      >
        <Routes location={location}>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/auth" replace />} />

          {/* Public only — logged-in users bounced to /home */}
          <Route path="/auth" element={
            <PublicRoute><Auth /></PublicRoute>
          } />

          {/* Protected — must be logged in */}
          <Route path="/home" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/simulation/:type" element={
            <ProtectedRoute><Simulation /></ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute><Results /></ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── App Root ────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}