import React from "react";
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, Avatar, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material"; // Corrected import
import { Notifications } from "@mui/icons-material"; // Corrected import
import { useState } from "react";

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Sidebar menu items
  const menuItems = [
    { text: "Dashboard", icon: <AccountCircle /> }, // Updated icon usage
    { text: "Pets", icon: <Notifications /> }, // Updated icon usage
    { text: "Settings", icon: <AccountCircle /> }, // Updated icon usage
    { text: "Logout", icon: <Notifications /> }, // Updated icon usage
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#333",
            color: "#fff",
            borderRight: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={mobileOpen}
      >
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          <Avatar sx={{ width: 60, height: 60, marginBottom: "10px" }} />
          <Typography variant="h6" color="white">PetCare App</Typography>
        </Box>
        <Divider />
        <List>
            {menuItems.map((item, index) => (
                <ListItem button key={index}> {/* Pass the button prop to ListItem, not to <li> */}
                    {item.icon}
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>


      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f4f6f8",
          padding: "24px",
          marginLeft: mobileOpen ? drawerWidth : 0,
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "blueviolet",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>

            <IconButton color="inherit">
              <Notifications />
            </IconButton>

            {/* Profile Dropdown */}
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{ marginLeft: "10px" }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box sx={{ paddingTop: "64px" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
