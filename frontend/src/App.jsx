import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import DentistList from './components/DentistList.jsx';
import BookAppointment from './components/BookAppointment.jsx';
import AdminPanel from './components/AdminPanel.jsx';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to === '/admin' && location.pathname.startsWith('/admin'));
  
  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      {children}
    </Link>
  );
};

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🦷 Dentist Booking</h1>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/admin">Admin Panel</NavLink>
        </nav>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<DentistList />} />
          <Route path="/book/:dentistId" element={<BookAppointment />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
