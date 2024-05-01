import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function createData(name, calories, fat) {
  return { name, calories, fat };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function DenseTable() {
  const [user, setUser] = React.useState("");

  const token = localStorage.setItem("admin");
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
              key={user.name}
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
                <button onClick={() => {}}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
