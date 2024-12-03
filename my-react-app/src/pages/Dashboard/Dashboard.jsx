import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Grid, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import MKButton from "../../components/MKButton";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardNavbar from "../../components/DashboardNavbar";

const Dashboard = () => {
  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    type: "",
  });
  const [editPet, setEditPet] = useState(null);
  const navigate = useNavigate();

  //console.log("Token:", token);


  // Fetch pet data and owner details
  const fetchPets = () => {
    const token = localStorage.getItem("token");
    console.log("Token fetched:", token);
    if (!token) {
      navigate("/login");  // Redirect if no token is available
      return;
    }

    axios
      .get("/api/owners/me/pets", { headers: { 'Authorization': `Bearer ${token}` } })
      .then((response) => {
        setPets(response.data.data);
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        setOwner(decodedToken);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");  // Redirect to login if unauthorized
        }
      });
  };

  // Initial pet data fetch
  useEffect(() => {
    fetchPets();
  }, []);

  // Handle form submission to add a new pet
  const handleAddPet = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing");
      return;
    }

    console.log("Adding new pet:", newPet);

    axios
      .post("/api/pets", newPet, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((response) => {
        console.log("Pet added successfully:", response);
        fetchPets(); // Fetch updated pet list
        setNewPet({
          name: "",
          breed: "",
          age: "",
          gender: "",
          weight: "",
          type: "",
        });
      })
      .catch((error) => {
        console.error("Error adding pet:", error);
      });
  };

  // Handle form submission to update a pet
  const handleUpdatePet = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing");
      return;
    }

    axios
      .put(`/api/pets/${editPet.id}`, editPet, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((response) => {
        fetchPets();
        setEditPet(null); // Close the edit form after updating
      })
      .catch((error) => {
        console.error("Error updating pet:", error);
      });
  };

  // Handle form field change (for both new and edit forms)
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (editPet) {
      setEditPet((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewPet((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle deleting a pet
  const handleDeletePet = (petId) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`/api/pets/${petId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((response) => {
        fetchPets(); // Reload pet data after deletion
      })
      .catch((error) => {
        console.error("Error deleting pet:", error);
      });
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: 3, backgroundColor: "#ffffff" }}>
        {/* Welcome Banner */}

        {/* Pet List Section */}
        <Grid container spacing={3}>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <Card sx={{ backgroundColor: "#ffffff", boxShadow: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h3" fontWeight="bold" color="black">
                      {pet.name}
                    </Typography>
                    <Typography variant="body1" color="black">
                      <strong>Breed:</strong> {pet.breed}
                    </Typography>
                    <Typography variant="body1" color="black">
                      <strong>Age:</strong> {pet.age} years
                    </Typography>
                    <Typography variant="body1" color="black">
                      <strong>Gender:</strong> {pet.gender}
                    </Typography>
                    <Typography variant="body1" color="black">
                      <strong>Weight:</strong> {pet.weight} kg
                    </Typography>
                    <Typography variant="body1" color="black">
                      <strong>Type:</strong> {pet.type}
                    </Typography>

                    {/* Edit, Delete, and View Profile Buttons */}
                    <Button
                      onClick={() => navigate(`/pets/${pet.id}`)}
                      variant="contained"
                      sx={{
                        marginTop: 1,
                        marginLeft: 1,
                        backgroundColor: "black",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#333333",
                        },
                      }}
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={() => setEditPet(pet)}
                      variant="contained"
                      sx={{
                        marginTop: 1,
                        marginLeft: 1,
                        backgroundColor: "black",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#333333",
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeletePet(pet.id)}
                      variant="contained"
                      sx={{
                        marginTop: 1,
                        marginLeft: 1,
                        backgroundColor: "black",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#333333",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" textAlign="center">
                You have no pets yet. Add one below!
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Add Pet Form Section */}
        <Box
          component="form"
          onSubmit={editPet ? handleUpdatePet : handleAddPet}
          sx={{
            marginTop: 4,
            padding: 4,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)",
            borderRadius: 2,
            backgroundColor: "black",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography variant="h5" marginBottom={2} color="black">
            {editPet ? "Edit Pet" : "Add a New Pet"}
          </Typography>
          <Grid container spacing={2}>
            {/* Input Fields for Pet Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={editPet ? editPet.name : newPet.name}
                onChange={handleFieldChange}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Breed"
                name="breed"
                value={editPet ? editPet.breed : newPet.breed}
                onChange={handleFieldChange}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Age"
                type="number"
                name="age"
                value={editPet ? editPet.age : newPet.age}
                onChange={handleFieldChange}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Gender"
                name="gender"
                value={editPet ? editPet.gender : newPet.gender}
                onChange={handleFieldChange}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Weight (kg)"
                type="number"
                name="weight"
                value={editPet ? editPet.weight : newPet.weight}
                onChange={handleFieldChange}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Type"
                name="type"
                value={editPet ? editPet.type : newPet.type}
                onChange={handleFieldChange}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <MKButton
                type="submit"
                variant="gradient"
                color="dark"
                fullWidth
                sx={{
                  padding: "16px",
                  marginTop: 2,
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                {editPet ? "Update Pet" : "Add Pet"}
              </MKButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
