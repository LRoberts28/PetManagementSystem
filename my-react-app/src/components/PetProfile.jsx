import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemText } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import MKBox from "./MKBox";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PetProfile = () => {
  const { petId } = useParams(); // Get the pet ID from the URL params
  const [pet, setPet] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Fetch pet details by ID
  const fetchPetDetails = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/dashboard");
      return;
    }

    axios
      .get(`/api/pets/${petId}`, { headers: { Authorization: token } })
      .then((response) => {
        setPet(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
      });
  };

  // Fetch appointments by pet ID
  const fetchAppointments = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/dashboard");
      return;
    }

    axios
      .get(`/api/pets/${petId}/appointments`, { headers: { Authorization: token } })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  // Fetch pet details and appointments on component mount
  useEffect(() => {
    fetchPetDetails();
    fetchAppointments();
  }, [petId]);

  if (!pet) return <Typography>Loading...</Typography>;

  // Data for the chart (e.g., weight over time)
  const chartData = {
    labels: appointments.map((appt) => new Date(appt.date).toLocaleDateString()), // Convert date to readable format
    datasets: [
      {
        label: "Pet Weight Over Time",
        data: appointments.map((appt) => appt.weight || 0), // Replace null with 0 or a fallback value
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  

  const handleAddAppointment = () => {
    navigate(`/pets/${petId}/appointments`);
  };

  const handleDeleteAppointment = (appointmentId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You are not logged in. Please log in to continue.");
      return;
    }
  
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios
        .delete(`/api/pets/${petId}/appointments/${appointmentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          // Filter out the deleted appointment from the state
          const updatedAppointments = appointments.filter(
            (appt) => appt.id !== appointmentId
          );
          setAppointments(updatedAppointments);
          alert("Appointment deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
          if (error.response && error.response.status === 404) {
            alert("Appointment not found or already deleted.");
          } else {
            alert("Failed to delete the appointment. Please try again.");
          }
        });
    }
  };
  

  return (
    <DashboardLayout>
      <MKBox sx={{ padding: 10, backgroundColor: "#f7f7f7" }}>
        <Typography variant="h1" fontWeight="bold" color="black" textAlign="center" gutterBottom>
          {pet.name}'s Profile
        </Typography>
        <Grid container spacing={3}>
          {/* Row 1: Pet Profile and Appointments Side by Side */}
          <Grid container item xs={12} spacing={3}>
            {/* Pet Profile */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h3" color="black" fontWeight="bold">
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
                </CardContent>
              </Card>
            </Grid>

            {/* Appointments */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" color="black" fontWeight="bold">
                    Appointments
                  </Typography>
                  <List>
                    {appointments.map((appointment) => (
                      <ListItem key={appointment.id} sx={{ borderBottom: "1px solid #eee" }}>
                        <ListItemText
                          primary={`Date: ${new Date(appointment.date).toLocaleDateString()} | Type: ${appointment.type}`}
                          secondary={`Reason: ${appointment.reason} | Weight: ${appointment.weight || "N/A"} kg`}
                        />
                        <Button
                        variant="contained"
                        sx={{
                            marginTop: 0,
                            backgroundColor: "black",
                            color: "#ffffff",
                            "&:hover": {
                            backgroundColor: "transparent",
                            color: "black",
                            },
                        }}
                        onClick={() => handleDeleteAppointment(appointment.id)} // Pass the appointment ID
                        >
                          Delete
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: 2,
                      backgroundColor: "black",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "black",
                      },
                    }}
                    onClick={handleAddAppointment} // Add redirect logic here
                  >
                    View/Add Appointments
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Row 2: Weight Over Time Graph */}
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" color="black" fontWeight="bold" gutterBottom>
                  Weight Over Time
                </Typography>
                <Line data={chartData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </DashboardLayout>
  );
};

export default PetProfile;
