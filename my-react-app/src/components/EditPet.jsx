import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Grid, TextField, Typography } from "@mui/material";
import MKButton from "../components/MKButton";
import DashboardLayout from "../components/DashboardLayout";
//import DashboardNavbar from "../../components/DashboardNavbar";

const EditPet = () => {
  const [editPet, setEditPet] = useState(null);
  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    type: "",
  });
  const navigate = useNavigate();
  const { petId } = useParams(); // Retrieve the petId from the URL

  // Fetch pet data for the edit form
  useEffect(() => {
    if (petId) {
      axios
        .get(`/api/pets/${petId}`)
        .then((response) => {
          setEditPet(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching pet data:", error);
        });
    }
  }, [petId]);

  // Handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (editPet) {
      setEditPet((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewPet((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission (Update or Add new pet)
  const handleUpdatePet = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .put(`/api/pets/${petId}`, editPet, { headers: { Authorization: token } })
      .then((response) => {
        navigate(`/pets/${petId}`); // Redirect to pet profile after update
      })
      .catch((error) => {
        console.error("Error updating pet:", error);
      });
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post("/api/pets", newPet, { headers: { Authorization: token } })
      .then((response) => {
        navigate(`/pets/${response.data.data.id}`); // Redirect to the new pet's profile
      })
      .catch((error) => {
        console.error("Error adding pet:", error);
      });
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: 3, backgroundColor: "#ffffff" }}>
        {/* Form for adding or editing a pet */}
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

export default EditPet;
