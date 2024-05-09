import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';
import AdminAddUser from "./adminAddUser";
import { useNavigate } from "react-router-dom";



export default function AdminNavbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  const token = localStorage.getItem("admin");
  console.log(token,'aaaaammmmm');
const [openModal,setOpenModal]=useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUserClick = () => {
    setIsModalOpen(true);
  };
  

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };
const handleToggleModal=()=>{
  setOpenModal(!openModal)
}
  const logout = () => {
    localStorage.removeItem("admin");
    setUser("");
    navigate("/");
  };

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <button
              style={{ backgroundColor: "grey" }}
              onClick={handleToggleModal}
            >
             
              Add User
            </button>
          </Typography>
          <div >
              {token ? (
                <span>
                  {/* User:{user} */}
                  <Button color="inherit" onClick={logout}>
                    LogOut
                  </Button>
                </span>
              ) : (
                <Button color="inherit" onClick={() => navigate("/admin")}>
                  Login
                </Button>
              )}
            </div>
        </Toolbar>
      </AppBar>
      {/* {isModalOpen && <AdminAddUser openModal={openModal} setOpenModal={setOpenModal} />} */}
      <AdminAddUser openModal={openModal} setOpenModal={setOpenModal} />
    </Box>
  );
}
