import React, { useState } from 'react';
import './FarmerPage.css'; // Ensure the path matches where your CSS file is saved

function FarmerPage() {
  const [farmers, setFarmers] = useState([
    { name: 'John Doe', location: 'Springfield', farmerId: 'F001', status: 'Active' },
    { name: 'Jane Smith', location: 'Rivertown', farmerId: 'F002', status: 'Inactive' },
    { name: 'Jim Bean', location: 'Eastside', farmerId: 'F003', status: 'Active' },
    { name: 'Jill Biden', location: 'Westwood', farmerId: 'F004', status: 'Pending' },
  ]);

  // Placeholder functions for button actions
  const viewProfile = (farmerId) => {
    alert(`Viewing profile for farmer ID: ${farmerId}`);
  };

  const checkStatus = (farmerId) => {
    alert(`Checking status for farmer ID: ${farmerId}`);
  };

  return (
    <div className="farmer-dashboard">
      <h1>Farmer's Dashboard</h1>
      <p>Welcome to your dashboard. Here you'll find the latest updates and tools to help you manage your farming activities.</p>
      <div className="farmers-scrollbox">
        <table className="farmers-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Farm ID</th>
              <th>Status</th>
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {farmers.map(farmer => (
              <tr key={farmer.farmerId}>
                <td>{farmer.name}</td>
                <td>{farmer.location}</td>
                <td>{farmer.farmerId}</td>
                <td>{farmer.status}</td>
                <td>
                  <button onClick={() => viewProfile(farmer.farmerId)}>View Profile</button>
                  <button onClick={() => checkStatus(farmer.farmerId)}>Check Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FarmerPage;
