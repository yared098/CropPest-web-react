import React from 'react';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleAddNewsClick = () => {
    navigate('/add-news');
  };

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logging out...');
    // navigate to login or do a logout operation
    navigate('/');
  };

  return (
    <div className="home-container">
      <IconButton onClick={handleLogout} style={{ position: 'absolute', left: 0, top: 0 }}>
        <LogoutIcon />
      </IconButton>
      <Tabs value={false} onChange={handleChange} centered>
        <Tab label="Home" value="/home" />
        <Tab label="Farmer" value="/farmer" />
        <Tab label="History" value="/history" />
      </Tabs>
      <Fab color="primary" aria-label="add" className="fab-button" onClick={handleAddNewsClick}>
        <AddIcon />
      </Fab>
      <p>Click the button to add news.</p>
    </div>
  );
}

export default HomePage;
