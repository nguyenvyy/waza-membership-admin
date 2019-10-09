import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Admin } from './layouts/Admin';

function App() {
  return (
    <div className="App container-full">
      <Router>
        <LoginPage />
        <Admin />
      </Router>
    </div>
  );
}

export default App;

export function confirmPassword(password) {
  let result  = true;
  if(password.length >= 6) return false
  return result;

}
