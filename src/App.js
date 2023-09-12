import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Views
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Dashboard}/>
      </Routes>
    </Router>
  );
}

export default App;
