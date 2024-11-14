// src/App.js
import React from 'react';
import OwnersDashboard from './components/OwnersDashboard';
//import PetsDashboard from './components/PetsDashboard';
import AddPet from './components/addPet';
//import './styles/global.css'; // Import global styles if any

function App() {
  // Example ownerId for testing purposes
  const ownerId = 1; // Replace with actual owner authentication method in production

  return (
    <div className="App">
      <h1>Pet Management System</h1>

      <OwnersDashboard ownerId={ownerId} />
    </div>
  );
}

export default App;