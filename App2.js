// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Login from './Login';
import Employees from './Employees';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Routes> 
          <Route path="/auth/login" element={
            isLoggedIn ? <Navigate to="/employees" /> : <Login onLoginSuccess={handleLoginSuccess} />
          } />
          <Route path="/employees" element={
            isLoggedIn ? <Employees onLogout={handleLogout} /> : <Navigate to="/auth/login" />
          } />
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="*" element={<h1>404 页面未找到</h1>} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
