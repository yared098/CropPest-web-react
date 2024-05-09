import React from 'react';
import './CropStatus.css';  // Specific styling for Crop Status

const CropStatus = () => {
    return (
        <div className="crop-status">
            <h2>Crop Status</h2>
            <p>Wheat: Healthy</p>
            <p>Corn: Needs Water</p>
        </div>
    );
};

export default CropStatus;
