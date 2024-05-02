import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";



export default function DenseTable() {
  const [user, setUser] =useState([]);

  //delete user
  const[openDelete,setOpenDelete]=useState(false)
  const[deleteUSerId,setDeleteUserId]=useState('')
  const[refresh,setRefresh]=useState(0)

  const handleDelete=(id)=>{
    console.log('de',id)
    axios.delete('http://localhost:3000/admin/deleteuser',{
        headers:{
            Authorization:token
        },
        data:{
            deleteUserId:id
        }
    })
    .then((response)=>{
        console.log(response);
        setRefresh((prev)=>prev+1)
    })
  }

  const token = localStorage.getItem("admin");
  useEffect(() => {
    try {
      const fetchuser = async () => {
        const response = await axios.get(
          "http://localhost:3000/admin/dashboard",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(response);
        setUser(response.data.users);
      };
      fetchuser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            <TableRow
              key={user._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.phone}</TableCell>
              <TableCell align="center">
                <button onClick={() => {}}>Edit</button>
              </TableCell>
              <TableCell align="right">
                <button onClick={() => {handleDelete(user._id)}}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
