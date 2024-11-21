import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import MKBox from "./MKBox";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PetProfile = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    type: "",
  });
  const [appointmentForm, setAppointmentForm] = useState({
    date: "",
    type: "",
    reason: "",
    weight: "",
  });
  const [editAppointment, setEditAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

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
        setFormData({
          name: response.data.name,
          breed: response.data.breed,
          age: response.data.age,
          gender: response.data.gender,
          weight: response.data.weight,
          type: response.data.type,
        });
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
      });
  };

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

  useEffect(() => {
    fetchPetDetails();
    fetchAppointments();
  }, [petId]);

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAppointmentFieldChange = (e) => {
    setAppointmentForm({
      ...appointmentForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePet = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/dashboard");
      return;
    }
    axios
      .put(`/api/pets/${petId}`, formData, { headers: { Authorization: token } })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating pet:", error);
      });
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/dashboard");
      return;
    }

    const appointmentData = {
      date: appointmentForm.date,
      type: appointmentForm.type,
      reason: appointmentForm.reason,
      weight: appointmentForm.weight,
    };

    // If editing an existing appointment, we update it
    if (editAppointment) {
      axios
        .put(`/api/pets/${petId}/appointments/${editAppointment.id}`, appointmentData, { headers: { Authorization: token } })
        .then((response) => {
          setOpenDialog(false);
          setEditAppointment(null); // Reset edit state
          fetchAppointments(); // Refresh appointments list
        })
        .catch((error) => {
          console.error("Error updating appointment:", error);
        });
    } else {
      // If creating a new appointment
      axios
        .post(`/api/pets/${petId}/appointments`, appointmentData, { headers: { Authorization: token } })
        .then((response) => {
          setOpenDialog(false);
          fetchAppointments(); // Refresh appointments list
        })
        .catch((error) => {
          console.error("Error creating appointment:", error);
        });
    }
  };

  const handleDeleteAppointment = (appointmentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/dashboard");
      return;
    }

    axios
      .delete(`/api/pets/${petId}/appointments/${appointmentId}`, { headers: { Authorization: token } })
      .then((response) => {
        fetchAppointments(); // Refresh appointments list after delete
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  if (!pet) return <Typography>Loading...</Typography>;

  const chartData = {
    labels: appointments.map((appt) => new Date(appt.date).toLocaleDateString()),
    datasets: [
      {
        label: "Pet Weight Over Time",
        data: appointments.map((appt) => appt.weight),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <DashboardLayout>
      <MKBox sx={{ padding: 10, backgroundColor: "#f7f7f7" }}>
        <Typography variant="h3" fontWeight="bold" color="black" textAlign="center" gutterBottom>
          {pet.name}'s Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h5" color="black" fontWeight="bold">
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
                  >
                    Edit Pet
                  </Button>
                </CardContent>
              </Card>
            </Grid>

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
                          secondary={`Reason: ${appointment.reason} | Weight: ${appointment.weight} kg`}
                        />
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteAppointment(appointment.id)}
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
                        backgroundColor: "#ffffff",
                        color: "black",
                      },
                    }}
                    onClick={() => setOpenDialog(true)}
                  >
                    Add Appointment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="black" gutterBottom>
                  Weight History Chart
                </Typography>
                <Line data={chartData} options={{ responsive: true }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Appointment Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{editAppointment ? "Edit Appointment" : "Add Appointment"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleAppointmentSubmit}>
              <Box sx={{ marginBottom: 2 }}>
                <input
                  type="date"
                  name="date"
                  value={appointmentForm.date}
                  onChange={handleAppointmentFieldChange}
                  required
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <input
                  type="text"
                  name="type"
                  placeholder="Appointment Type"
                  value={appointmentForm.type}
                  onChange={handleAppointmentFieldChange}
                  required
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <input
                  type="text"
                  name="reason"
                  placeholder="Reason"
                  value={appointmentForm.reason}
                  onChange={handleAppointmentFieldChange}
                  required
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight"
                  value={appointmentForm.weight}
                  onChange={handleAppointmentFieldChange}
                  required
                />
              </Box>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </MKBox>
    </DashboardLayout>
  );
};

export default PetProfile;
