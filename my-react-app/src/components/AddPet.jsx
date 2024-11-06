import React, { useState } from 'react';
import axios from 'axios';

const AddPet = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [type, setType] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post('http://localhost:5600/api/pets', {
        name,
        breed,
        age,
        gender,
        weight,
        type,
        owner_id: ownerId,
      });
      alert(`Pet added successfully with ID: ${response.data.petId}`);
      // Reset the form after submission
      setName('');
      setBreed('');
      setAge('');
      setGender('');
      setWeight('');
      setType('');
      setOwnerId('');
    } catch (error) {
      console.error('Error adding pet:', error);
      alert('Failed to add pet. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add a New Pet</h2>
      <form onSubmit={handleSubmit}>
      <ul>
        <li> <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required /></li>
        <li> <input type="text" value={breed} placeholder="Breed" onChange={(e) => setBreed(e.target.value)} required /></li>
        <li> <input type="number" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)} required /></li>
        <li> <input type="text" value={gender} placeholder="Gender" onChange={(e) => setGender(e.target.value)} required /></li>
        <li> <input type="number" value={weight} placeholder="Weight (lbs)" onChange={(e) => setWeight(e.target.value)} required /></li>
        <li> <input type="text" value={type} placeholder="Type (e.g., Dog, Cat)" onChange={(e) => setType(e.target.value)} required /></li>
        <li> <input type="number" value={ownerId} placeholder="Owner ID" onChange={(e) => setOwnerId(e.target.value)} required /></li>
      </ul>
      <button type="submit">Add Pet</button>
    </form>
    </div>
  );
};

export default AddPet;
