import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import MKInput from "../../components/MKInput";
import MKButton from "../../components/MKButton";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import bgImage from "../../assets/pawsBackground.jpg";

function SignUpBasic() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5600/api/owners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      // Redirect to login page on success
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <MKBox
      width="627%"
      height="100vh"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url(${bgImage})`, // Add the background image
        backgroundSize: "100% auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      <Grid container justifyContent="center" alignItems="center" height="100%">
        <Grid item xs={12} sm={9} md={6} lg={5} xl={4}>
          <Card sx={{ padding: 4 }}>
            <MKBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Sign up
              </MKTypography>
            </MKBox>

            <MKBox pt={4} pb={3} px={3}>
              <MKBox component="form" onSubmit={handleSubmit} role="form">
                {error && (
                  <MKTypography variant="button" color="error" mb={2}>
                    {error}
                  </MKTypography>
                )}
                <MKBox mb={2}>
                  <MKInput
                    type="text"
                    label="First Name"
                    name="first_name"
                    fullWidth
                    onChange={handleChange}
                  />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput
                    type="text"
                    label="Last Name"
                    name="last_name"
                    fullWidth
                    onChange={handleChange}
                  />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput
                    type="text"
                    label="Phone Number"
                    name="phone_number"
                    fullWidth
                    onChange={handleChange}
                  />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput
                    type="email"
                    label="Email"
                    name="email"
                    fullWidth
                    onChange={handleChange}
                  />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput
                    type="password"
                    label="Password"
                    name="password"
                    fullWidth
                    onChange={handleChange}
                  />
                </MKBox>
                <MKBox mt={4} mb={1}>
                  <MKButton variant="gradient" color="info" fullWidth type="submit">
                    Sign up
                  </MKButton>
                </MKBox>
                <MKBox textAlign="center" mt={3}>
                <MKTypography variant="body2" color="text">
                  Already have an account?{" "}
                </MKTypography>
                <MKButton
                  variant="text"
                  color="info"
                  onClick={() => navigate("/signIn")}
                >
                  Sign In
                </MKButton>
              </MKBox>
              </MKBox>
            </MKBox>
          </Card>
        </Grid>
      </Grid>
      
    </MKBox>
  );
}

export default SignUpBasic;
