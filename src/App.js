import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import { Login } from './components/Login/Login';
import { Admin } from './components/Admin/Admin';

function App() {
  return (
    <div className="App container-full">
      <Router>
        <Login />
        <Admin />
      </Router>
    </div>
  );
}

export default App;
