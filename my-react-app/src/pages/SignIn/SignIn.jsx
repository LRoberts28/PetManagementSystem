import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import axios from 'axios';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from '../../../node_modules/@mui/material/Card';
import Switch from '../../../node_modules/@mui/material/Switch';
import Grid from '../../../node_modules/@mui/material/Grid';

// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import MKInput from "../../components/MKInput";
import MKButton from "../../components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "../../components/Navbars/DefaultNavbar";
import SimpleFooter from "../../components/Footers/SimpleFooter";

// Images
import bgImage from "../../assets/bg-sign-in-basic.jpeg";
import routes from "../../config/routes";

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const navigate = useNavigate(); // To redirect the user after login

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Function to handle form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5600/api/login', { email, password });
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Redirect to the dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      // Handle errors
      if (error.response) {
        setErrorMessage(error.response.data.error || 'An error occurred. Please try again.');
      } else {
        setErrorMessage('Unable to connect to the server.');
      }
    }
  };

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={
          <MKButton
            component="a"
            href="https://www.creative-tim.com/product/material-kit-react"
            target="_blank"
            rel="noopener noreferrer"
            color="info"
          >
            Free Download
          </MKButton>
        }
        transparent
        light
      />
      
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <MKBox
        px={1}
        width="540%"
        height="100vh"
        mx="auto"
        position="relative"
        zIndex={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
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
                  Sign in
                </MKTypography>
              </MKBox>

              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSignIn}>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      required
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      required
                    />
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  {errorMessage && (
                    <MKBox mt={2}>
                      <MKTypography variant="caption" color="error">
                        {errorMessage}
                      </MKTypography>
                    </MKBox>
                  )}
                  <MKBox mt={4} mb={1}>
                    <MKButton type="submit" variant="gradient" color="info" fullWidth>
                      Sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/signUp"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;
