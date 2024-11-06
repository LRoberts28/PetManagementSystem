// src/App.js
import React from 'react';
import PetsList from './components/PetsList'; // Import the PetsList component
import AddPet from './components/AddPet';

function App() {
  return (
    <div>
      <h1>Welcome to My React App</h1>
      <AddPet/> {/* */}
      <PetsList /> {/* */}
    </div>
  );
}

export default App;