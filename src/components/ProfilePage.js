import React from 'react';
import CropStatus from './comp/CropStatus';
import Dashboard from './comp/Dashboard';
import NewsHistory1 from './comp/NewsHistory';
// import Placeholder from './comp/Placeholder'; // Assuming you have a fourth component or create a new one
import './ProfilePage.css'; // General styling for the Profile Page

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <h1>Crop paste Dashboard</h1>
            <div className="grid-container">
                <CropStatus />
                <Dashboard />
                <NewsHistory1 />
                <Dashboard />  // Added fourth component for the 2x2 grid
            </div>
        </div>
    );
};

export default ProfilePage;
