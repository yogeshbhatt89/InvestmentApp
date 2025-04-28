import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PermIdentityIcon from "@mui/icons-material/PermIdentity"; // Hover icon
import PersonIcon from "@mui/icons-material/Person"; // Default icon
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const [icon, setIcon] = useState(<PersonIcon />); // Default icon
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const actions = [
    {
      icon: <SettingsIcon sx={{ color: "primary.main" }} />, // Set icon color to primary.main
      name: "Settings",
      onClick: () => console.log("Settings clicked"),
    },
    {
      icon: <LogoutIcon sx={{ color: "primary.main" }} />, // Set icon color to primary.main
      name: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar sx={{ position: "relative", height: 64 }}>
        {/* Left side - title */}
        <Typography variant="h6" noWrap component="div" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PriceChangeIcon sx={{ fontSize: "2rem" }} /> INVESTOGRAM
        </Typography>



        <SpeedDial
          direction="left"
          ariaLabel="User Menu"
          icon={icon}
          FabProps={{
            size: "small",
            sx: {
              bgcolor: "white",
              color: "primary.main",
              "&:hover": { bgcolor: "#f1f1f1" },
            },
          }}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1500,
            bottom: 24,
          }}
          onMouseEnter={() => setIcon(<PermIdentityIcon />)}
          onMouseLeave={() => setIcon(<PersonIcon />)}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              title={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
