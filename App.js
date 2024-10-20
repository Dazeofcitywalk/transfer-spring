// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
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
        <Switch>
          <Route path="/auth/login">
            {isLoggedIn ? <Redirect to="/employees" /> : <Login onLoginSuccess={handleLoginSuccess} />}
          </Route>
          <Route path="/employees">
            {isLoggedIn ? <Employees onLogout={handleLogout} /> : <Redirect to="/auth/login" />}
          </Route>
          <Route exact path="/">
            <Redirect to="/auth/login" />
          </Route>
          <Route path="*">
            <h1>404 页面未找到</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
