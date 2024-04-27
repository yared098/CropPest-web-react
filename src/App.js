import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddNews from './components/AddNews'; // Ensure this import is correct
import FarmerPage from './components/FarmerPage';
import HistoryPage from './components/HistoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-news" element={<AddNews />} />
        <Route path="/farmer" element={<FarmerPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
