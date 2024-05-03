import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DenseTable() {
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const token = localStorage.getItem("admin");

  const handleDelete = (id) => {
    setOpenModal(true);
    setDeleteUserId(id);
  };

  const confirmDelete = () => {
    axios
      .delete("http://localhost:3000/admin/deleteuser", {
        headers: {
          Authorization: token,
        },
        data: {
          deleteUserId: deleteUserId,
        },
      })
      .then((response) => {
        console.log('aaa',response);
        setRefresh((prev) => prev + 1);
        setOpenModal(false); // Close the modal after successful delete
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const response = await axios.get("http://localhost:3000/admin/dashboard", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setUser(response.data.users);
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, [token, refresh]);

  return (
    <>
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
            {user.map((userData) => (
              <TableRow 
                key={userData._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {userData.name}
                </TableCell>
                <TableCell align="center">{userData.email}</TableCell>
                <TableCell align="center">{userData.phone}</TableCell>
                <TableCell align="center">
                  <button onClick={() => {}}>Edit</button>
                </TableCell>
                <TableCell align="right">
                  <button onClick={() => handleDelete(userData._id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
