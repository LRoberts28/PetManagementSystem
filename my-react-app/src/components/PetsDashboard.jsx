import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePet from './addPet';
import UpdatePet from './UpdatePet';

const PetsDashboard = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  // Fetch pets from the backend
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get('http://localhost:5600/api/pets');
      setPets(response.data.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5600/api/pets/${id}`);
      fetchPets(); // Refresh the pet list
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <div>
      <h2>Pets List</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} - {pet.breed}
            <button onClick={() => setSelectedPet(pet)}>Update</button>
            <button onClick={() => handleDelete(pet.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Create a New Pet</h2>
      <CreatePet onPetCreated={fetchPets} />

      {selectedPet && (
        <>
          <h2>Update Pet</h2>
          <UpdatePet pet={selectedPet} onPetUpdated={() => {
            setSelectedPet(null);
            fetchPets();
          }} />
        </>
      )}
    </div>
  );
};

export default PetsDashboard;
