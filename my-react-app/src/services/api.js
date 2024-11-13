import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5600/api',
});

export const fetchPets = () => api.get('/pets');
export const addPet = (petData) => api.post('/pets', petData);
export const updatePet = (petId, petData) => api.put(`/pets/${petId}`, petData);
export const deletePet = (petId) => api.delete(`/pets/${petId}`);

export default api;
