import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import DashboardLayout from "../../components/DashboardLayout";
import MKBox from "../../components/MKBox";

const AppointmentsPage = () => {
  const { petId } = useParams(); // Get the pet ID from the URL params
  const [pet, setPet] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentForm, setAppointmentForm] = useState({
    type: "",
    date: "",
    reason: "",
  });
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

  // Handle appointment form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add new appointment
  const handleAddAppointment = () => {
    const token = localStorage.getItem("token");

    if (appointmentForm.type && appointmentForm.date && appointmentForm.reason) {
      axios
        .post(
          `/api/pets/${petId}/appointments`,
          {
            type: appointmentForm.type,
            date: appointmentForm.date,
            reason: appointmentForm.reason,
          },
          { headers: { Authorization: token } }
        )
        .then(() => {
          fetchAppointments(); // Refresh appointments
          setAppointmentForm({ type: "", date: "", reason: "" }); // Clear the form
        })
        .catch((error) => console.error("Error adding appointment:", error));
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Delete appointment
  const handleDeleteAppointment = (id) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`/api/pets/${petId}/appointments/${id}`, { headers: { Authorization: token } })
      .then(() => fetchAppointments()) // Refresh appointments
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  // Fetch data on mount
  useEffect(() => {
    fetchPetDetails();
    fetchAppointments();
  }, [petId]);

  if (!pet) return <Typography>Loading...</Typography>;

  return (
    <DashboardLayout>
      <MKBox sx={{ padding: 10, backgroundColor: "#f7f7f7" }}>
        <Typography variant="h2" fontWeight="bold" color="black" textAlign="center" gutterBottom>
          {pet.name}'s Appointments
        </Typography>
        <Grid container spacing={3}>
          {/* Pet Profile Section */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h4" color="black" fontWeight="bold">
                  {pet.name}
                </Typography>
                <Typography variant="body1" color="black">
                  <strong>Breed:</strong> {pet.breed}
                </Typography>
                <Typography variant="body1" color="black">
                  <strong>Age:</strong> {pet.age} years
                </Typography>
                <Typography variant="body1" color="black">
                  <strong>Weight:</strong> {pet.weight} kg
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Appointments Section */}
          <Grid item xs={12} sm={8}>
            <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="black">
                  Appointments
                </Typography>
                {appointments.length > 0 ? (
                  <List>
                    {appointments.map((appointment) => (
                      <ListItem key={appointment.id} sx={{ borderBottom: "1px solid #eee" }}>
                        <ListItemText
                          primary={`Date: ${new Date(appointment.date).toLocaleDateString()} | Type: ${appointment.type}`}
                          secondary={`Reason: ${appointment.reason}`}
                        />
                        <Button
                            variant="contained"
                            sx={{
                            marginTop: 0,
                            backgroundColor: "black",
                            color: "#ffffff",
                            "&:hover": {
                                backgroundColor: "black",
                                color: "black",
                            },
                            }}
                        >
                            Edit Pet
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>No appointments found for {pet.name}.</Typography>
                )}

                {/* Add Appointment Form */}
                <Box sx={{ marginTop: 3 }}>
                  <Typography variant="h6" fontWeight="bold" color="black">
                    Add New Appointment
                  </Typography>
                  <TextField
                    label="Appointment Type"
                    name="type"
                    value={appointmentForm.type}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Date"
                    name="date"
                    type="date"
                    value={appointmentForm.date}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Reason"
                    name="reason"
                    value={appointmentForm.reason}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: 2,
                      backgroundColor: "black",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: "black",
                      },
                    }}
                    onClick={handleAddAppointment}
                  >
                    Add Appointment
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </DashboardLayout>
  );
};

export default AppointmentsPage;
