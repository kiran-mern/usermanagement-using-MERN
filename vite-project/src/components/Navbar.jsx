import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
// import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          const response = await axios.get("http://localhost:3000/home", {
            headers: {
              Authorization: `${token}`,
            },
          });
          if (response.status == 200) {
            setUser(response.data.name);
          }
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }

    const logOut = () => {
      localStorage.removeItem("token");
      setUser("");
      navigate("/");
    };
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography> */}

          <Typography>
            <div >
              {user ? (
                <span>
                  User:{user}
                  <Button color="inherit" onClick={logOut}>
                    LogOut
                  </Button>
                </span>
              ) : (
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
