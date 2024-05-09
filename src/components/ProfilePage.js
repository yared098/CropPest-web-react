import React from 'react';
import CropStatus from './comp/CropStatus';
import Dashboard from './comp/Dashboard';
import NewsHistory1 from './comp/NewsHistory'; // Fixed path
import './ProfilePage.css'; // General styling for the Profile Page

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <h1>User Profile</h1>
             <CropStatus />
                <Dashboard />
                <NewsHistory1 />
        </div>
    );
};

export default ProfilePage;
