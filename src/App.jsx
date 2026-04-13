import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from './compo/nav';
import Acceuil from './pages/Acceuil';
import Courses from './pages/Cours';
import Layout from './Dashboard/Layout';
import CoursManagement from './Dashboard/CoursManagement';
import Event from './Dashboard/event';
import PreInscriptions from './Dashboard/PreInscriptions';
import Dashboard from './Dashboard/Dashboard';
import Login from './pages/Login';
import About from '../src/pages/aboute';

function App() {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("adminToken")); // état de connexion admin

  return (
    <Router>
      <AppContent isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </Router>
  );
}

// Composant séparé pour utiliser useLocation
function AppContent({ isAdmin, setIsAdmin }) {
  const location = useLocation();
  const showNav = !location.pathname.startsWith("/dashboard") && location.pathname !== "/login";

  return (
    <div className="App">
      {showNav && <Nav />} {/* navbar uniquement pour le site public */}

      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Acceuil />} />
        <Route path="/NosCours" element={<Courses />} />
        <Route path="/a propos" element={<About />} />
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} /> {/* login avec setIsAdmin */}
        
        {/* dashboard protected */}
        <Route path="/dashboard" element={isAdmin ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="cours" element={<CoursManagement />} />
          <Route path="events" element={<Event />} />
          <Route path="preinscriptions" element={<PreInscriptions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
