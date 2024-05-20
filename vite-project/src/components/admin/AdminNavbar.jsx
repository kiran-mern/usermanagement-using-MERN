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
import axios from "axios";
import { useUser } from "../../context/userContext";


export default function AdminNavbar() {
  const navigate = useNavigate();
  const {triggerRefresh,updateSearchInput,searchInput,setSearchInput} = useUser();


  const [user, setUser] = useState("");
  // const [searchInput,setSearchInput]=useState('')

  const token = localStorage.getItem("admin");
  console.log(token,'aaaaammmmm');
const [openModal,setOpenModal]=useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUserClick = () => {
    setIsModalOpen(true);
  };
  const handleSearchInputChange = (e) => {
    // Call updateSearchInput to update the search input value
    updateSearchInput(e.target.value);
  };
  
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
           
          >
            Admin
          </button>
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            style={{ marginRight: '10px', padding: '5px' ,color:'black'}}
            value={searchInput}
            onChange={handleSearchInputChange}
            
          />
          {/* Add User Button */}
          <button
            style={{ marginRight: '30px' }}
            onClick={handleToggleModal}
          >
            Add User
          </button>
          {/* Conditional Rendering for Login/Logout Button */}
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
    <AdminAddUser openModal={openModal} setOpenModal={setOpenModal} />
  </Box>
  
  );
}
