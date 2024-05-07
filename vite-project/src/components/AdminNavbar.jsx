import  React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import AdminAddUser from './adminAddUser'

export default function AdminNavbar() {
  const token=localStorage.getItem('token')

    const [isModalOpen,setIsModalOpen]=useState(false)
    
    const handleAddUserClick = () => {

        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

      const logOut = () => {
        localStorage.removeItem("token");
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
          <button style={{ backgroundColor: 'grey' }} onClick={handleAddUserClick}> Add User</button>
          </Typography>
          <Button color="inherit" onClick={logOut}>Login</Button>
        </Toolbar>
      </AppBar>
      {
        isModalOpen&&
      <AdminAddUser/>
      }
    </Box>
  );
}
