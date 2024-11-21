import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MKTypography from "./MKTypography";

const DashboardLayout = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [fullName, setFullName] = useState(null); // To store the full name
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    // Retrieve user email from localStorage
    const storedEmail = localStorage.getItem("userEmail");

    // Log the email retrieval to debug
    console.log("Retrieved email from localStorage:", storedEmail);

    if (storedEmail) {
      setUserEmail(storedEmail); // Set email if exists
      fetchUserDetails(storedEmail); // Fetch user details after email is set
    }
  }, []);

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5600/api/user?email=${email}`);
      setFullName(`${response.data.firstName} ${response.data.lastName}`);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#242424", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <MKTypography variant="h4" noWrap sx={{ flexGrow: 2, color: "#ffffff" }}>
            My Dashboard
          </MKTypography>

          <IconButton color="white" onClick={handleProfileMenuOpen} sx={{ marginLeft: "10px" }}>
            <AccountCircle />
          </IconButton>
          
          {/* Profile Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {/* Display Full Name or Email if Full Name is unavailable */}
            <MenuItem>
              <Typography variant="body2" sx={{ textAlign: "center", color: "#000000" }}>
                {fullName ? fullName : userEmail}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={() => { /* Handle logout */ }}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Content Area */}
      <Box sx={{ paddingTop: "64px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
