// Pets.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // If not authenticated, redirect to login
        return;
      }

      try {
        const response = await fetch('http://localhost:5600/api/owners/me/pets', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.data) {
          setPets(data.data);  // Set pets to state if data is received
        } else {
          setErrorMessage(data.message || 'No pets found');
        }
      } catch (error) {
        setErrorMessage('Error fetching pets');
        console.error(error);
      }
    };

    fetchPets();
  }, [navigate]);

  return (
    <div>
      <h2>Your Pets</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {pets.length === 0 ? (
          <p>You don't have any pets yet.</p>
        ) : (
          pets.map((pet) => (
            <li key={pet.id}>
              {pet.name} - {pet.breed} - {pet.age} years old
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Pets;
