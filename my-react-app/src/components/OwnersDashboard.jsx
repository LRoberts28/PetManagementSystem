import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnersDashboard = ({ ownerId }) => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: '', breed: '' });
  const [editPet, setEditPet] = useState(null);

  // Fetch all pets for the owner
  useEffect(() => {
    if (ownerId) {
      fetchPets();
    }
  }, [ownerId]);  // Re-fetch pets whenever the ownerId changes

  const fetchPets = async () => {
    try {
      const response = await axios.get(`http://localhost:5600/api/owners/${ownerId}/pets`);
      const petsData = response.data.data;  // Extract pets array from the "data" key
      if (Array.isArray(petsData)) {
        setPets(petsData);  // Correctly set the pets state
      } else {
        console.error('API returned invalid data:', petsData);
        setPets([]);  // Fallback to empty array if invalid data is returned
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
      setPets([]);  // Fallback to empty array if there's an error
    }
  };
  

  const addPet = async () => {
    try {
      await axios.post(`http://localhost:5600/api/owners/${ownerId}/pets`, newPet);
      fetchPets();
      setNewPet({ name: '', breed: '' });
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  const updatePet = async (petId) => {
    try {
      await axios.put(`http://localhost:5600/api/pets/${petId}`, editPet);
      fetchPets();
      setEditPet(null);
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const deletePet = async (petId) => {
    try {
      await axios.delete(`http://localhost:5600/api/pets/${petId}`);
      fetchPets();
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <div>
      <h2>Your Pets</h2>
      {pets.length > 0 ? (
        <ul>
          {pets.map((pet) => (
            <li key={pet.id}>
              {editPet?.id === pet.id ? (
                <div>
                  <input
                    type="text"
                    value={editPet.name}
                    onChange={(e) => setEditPet({ ...editPet, name: e.target.value })}
                    placeholder="Pet Name"
                  />
                  <input
                    type="text"
                    value={editPet.breed}
                    onChange={(e) => setEditPet({ ...editPet, breed: e.target.value })}
                    placeholder="Breed"
                  />
                  <button onClick={() => updatePet(pet.id)}>Save</button>
                </div>
              ) : (
                <>
                  {pet.name} - {pet.breed}
                  <button onClick={() => setEditPet(pet)}>Edit</button>
                  <button onClick={() => deletePet(pet.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pets found.</p>
      )}
      
      <h3>Add a New Pet</h3>
      <input
        type="text"
        value={newPet.name}
        onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
        placeholder="Pet Name"
      />
      <input
        type="text"
        value={newPet.breed}
        onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
        placeholder="Breed"
      />
      <button onClick={addPet}>Add Pet</button>
    </div>
  );
};

export default OwnersDashboard;
