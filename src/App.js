import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';

function App() {
  return (
    <div className="App container-full">
      <Router>
        <LoginPage />
      </Router>
    </div>
  );
}

export default App;
