import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
// import AdminAdd from './adminAddUser'

export default function DenseTable() {
  const navigate=useNavigate()
  const [users, setUsers] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const { triggerRefresh, updateSearchInput, searchInput } = useUser();

  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const token = localStorage.getItem("admin");

  const handleDelete = (id) => {
    setOpenModal(true);
    setDeleteUserId(id);
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    setEditUser({
      id: id,
      name: userToEdit.name,
      email: userToEdit.email,
      phone: userToEdit.phone,
    });
    setOpenEditModal(true);
  };

  const submitEdit = () => {
    axios
      .put(`http://localhost:3000/admin/editUser`, editUser, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        triggerRefresh();
        setOpenEditModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
        console.log("aaa", response);
        triggerRefresh();
        setOpenModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/admin/search${
  //           searchInput ? `?search=${searchInput}` : ""
  //         }`,
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       console.log(response.data, "sssss");
  //       setUsers(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData(); 

  // }, [searchInput, token]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     if (token) {
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:3000/admin/dashboard",
  //           {
  //             headers: {
  //               Authorization: token,
  //             },
  //             params: {
  //               search: searchInput,
  //             },
  //           }
  //         );
  //         setUsers(response.data.users);
  //       } catch (error) {
  //         console.log(error);
  //         navigate("/admin");
  //       }
  //     } else {
  //       navigate("/admin");
  //     }
  //   };
  //   fetchUsers();
  // }, [token, triggerRefresh,searchInput]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/admin/search${
  //           searchInput ? `?search=${searchInput}` : ""
  //         }`,
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       console.log(response.data, "sssss");
  //       setUsers(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData(); 

  // }, [searchInput, token]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          let url = "http://localhost:3000/admin/dashboard";
          if (searchInput) {
            url = `http://localhost:3000/admin/search?search=${searchInput}`;
          }
  
          const response = await axios.get(url, {
            headers: {
              Authorization: token,
            },
          });
  
          const users = searchInput ? response.data.data : response.data.users;
          setUsers(users);
        } catch (error) {
          console.error("Error fetching data:", error);
          navigate("/admin");
        }
      } else {
        navigate("/admin");
      }
    };
  
    fetchData();
  }, [token, searchInput, triggerRefresh]);
  



 

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center"> Phone</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell
                  align="center"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    display: "flex",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(user._id)}
                    // startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(user._id)}
                    // startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div className="modal-content">
          <HiOutlineExclamationCircle className="modal-icon" />
          <h2 id="delete-modal-title">
            Are you sure you want to delete this user?
          </h2>
          <div className="modal-buttons">
            <Button variant="contained" color="primary" onClick={confirmDelete}>
              Yes, I'm sure
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <div className="modal-content">
          <input
            type="text"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            type="tel"
            value={editUser.phone}
            onChange={(e) =>
              setEditUser({ ...editUser, phone: e.target.value })
            }
            placeholder="Phone"
          />
          <Button variant="contained" color="primary" onClick={submitEdit}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
}
