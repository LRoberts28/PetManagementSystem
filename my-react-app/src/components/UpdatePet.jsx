import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePet = ({ pet, onPetUpdated }) => {
  const [formData, setFormData] = useState({ ...pet });

  useEffect(() => {
    setFormData({ ...pet });
  }, [pet]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5600/api/pets/${pet.id}`, formData);
      onPetUpdated();
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
      <input type="text" name="breed" placeholder="Breed" onChange={handleChange} value={formData.breed} required />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} required />
      <input type="text" name="gender" placeholder="Gender" onChange={handleChange} value={formData.gender} required />
      <input type="number" name="weight" placeholder="Weight" onChange={handleChange} value={formData.weight} required />
      <input type="text" name="type" placeholder="Type" onChange={handleChange} value={formData.type} required />
      <input type="number" name="owner_id" placeholder="Owner ID" onChange={handleChange} value={formData.owner_id} required />
      <button type="submit">Update Pet</button>
    </form>
  );
};

export default UpdatePet;
