import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Grid, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import MKButton from "../../components/MKButton";
import DefaultNavbar from "../../components/Navbars/DefaultNavbar";
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
  const navigate = useNavigate();

  // Fetch user details and pets
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/dashboard");
      return;
    }

    axios
      .get("/api/owners/me/pets", { headers: { Authorization: token } })
      .then((response) => {
        setPets(response.data.data);
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        setOwner(decodedToken);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
        if (error.response && error.response.status === 401) {
          navigate("/dashboard");
        }
      });
  }, [navigate]);

  // Handle form submission to add a new pet
  const handleAddPet = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post("/api/pets", newPet, { headers: { Authorization: token } })
      .then((response) => {
        setPets((prevPets) => [...prevPets, response.data]);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ padding: 3, backgroundColor: "#f5f5f5" }}>
        {/* Welcome Banner */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
            backgroundColor: "#00796b",
            padding: "15px",
            borderRadius: 1,
          }}
        >
          <Typography variant="h2" fontWeight="" color="white">
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="h6" color="white">
            {owner ? `Logged in as: ${owner.email}` : "Loading..."}
          </Typography>
        </Box>

        {/* Pet List Section */}
        <Grid container spacing={3}>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <Card sx={{ backgroundColor: "#ffffff", boxShadow: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {pet.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Breed:</strong> {pet.breed}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Age:</strong> {pet.age} years
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Gender:</strong> {pet.gender}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Weight:</strong> {pet.weight} kg
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Type:</strong> {pet.type}
                    </Typography>
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
          onSubmit={handleAddPet}
          sx={{
            marginTop: 4,
            padding: 4,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
            backgroundColor: "white",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography variant="h5" marginBottom={2} color="primary">
            Add a New Pet
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Breed"
                value={newPet.breed}
                onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
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
                value={newPet.age}
                onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Gender"
                value={newPet.gender}
                onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
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
                value={newPet.weight}
                onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Type (e.g., Dog, Cat)"
                value={newPet.type}
                onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>
          </Grid>
          <MKButton
            type="submit"
            variant="contained"
            color="success"
            sx={{ marginTop: 2, width: "100%" }}
          >
            Add Pet
          </MKButton>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
