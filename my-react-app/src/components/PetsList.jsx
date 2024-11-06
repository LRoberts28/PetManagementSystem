// src/components/PetsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PetsList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Change the URL to match your API endpoint for pets
    axios.get('http://localhost:5600/api/pets')
      .then(response => {
        setPets(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
  }, []);

  return (
    <div>
      <h1>Pets List</h1>
      <ul>
        {pets.map(pet => (
          <li key={pet.id}>
            {pet.name} - {pet.breed}, {pet.age} years old, {pet.gender}, {pet.weight} lbs
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetsList;
