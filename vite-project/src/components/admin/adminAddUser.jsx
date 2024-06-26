

"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import {useUser} from '../../context/userContext'

function AdminAddUser({openModal,setOpenModal}) {
  // const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState("");
  const {triggerRefresh} = useUser()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setFormData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
  };
  const validateForm = () => {
    const { name, email, phone } = formData;
    // Check if any field is empty
    if (!name || !email || !phone) {
      alert("Please fill in all fields.");
      return false;
    }
    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };


  const token = localStorage.getItem("token");
  console.log("token", token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/addUser",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // Handle successful response here
      console.log(response.data);

      if (response.status === 200) {
        // Reset form data
        setFormData({
          name: "", 
          email: "",
          phone: "",
          password: "",
        });
        // Close modal after successful registration
        setOpenModal(false);
        triggerRefresh()

      } else {
        console.log("error", response.data);
      }
    } catch (error) {
      // Handle error here
      console.log("Error:", error);
    }
   
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                readOnly
                placeholder="Auto-genarate"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Phone" />
              </div>
              <TextInput
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <Button onClick={handleSubmit}>Create </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
     
    </>
  );
}
export default AdminAddUser;
