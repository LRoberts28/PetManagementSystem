import React from "react";
import AppBar from "../../node_modules/@mui/material/AppBar";
import Toolbar from "../../node_modules/@mui/material/Toolbar";
import Typography from "../../node_modules/@mui/material/Typography";
import Box from "../../node_modules/@mui/material/Box";
import Button from "../../node_modules/@mui/material/Button";

const DashboardNavbar = ({ user }) => {
  return (
    <AppBar position="static" color="white" sx={{ marginBottom: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, backgroundColor: "white" }}>
          Dashboard
        </Typography>
        <Box>
          {user && (
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Welcome, {user.first_name}!
            </Typography>
          )}
          <Button color="white">Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
