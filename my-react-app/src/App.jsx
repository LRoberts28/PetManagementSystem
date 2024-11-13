// src/App.js
import React from 'react';
import PetsDashboard from './components/PetsDashboard';
import AddPet from './components/addPet';
//import './styles/global.css'; // Import global styles if any

function App() {
  return (
    <div className="App">
      <h1>Pet Management System</h1>
      <PetsDashboard/> {/* The main dashboard that lists pets */}
      <AddPet/> {/* Component to add a new pet */}
      {/* Other components can be added here as needed */}
    </div>
  );
}

export default App;