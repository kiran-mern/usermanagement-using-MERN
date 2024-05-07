// import React,{useState} from 'react'


// const RegistrationModal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     phone:''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, e.g., send data to backend
//     console.log(formData);
//     // Close modal after successful registration
//     onClose();
//   };

//   return (
//     <div className={`modal ${isOpen ? 'is-active' : ''}`}>
//       <div className="modal-background" onClick={onClose}></div>
//       <div className="modal-card">
//         <header className="modal-card-head">
//           <p className="modal-card-title">Registration</p>
//           <button className="delete" aria-label="close" onClick={onClose}></button>
//         </header>
//         <section className="modal-card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="field">
//               <label className="label">Username</label>
//               <div className="control">
//                 <input
//                   className="input"
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="field">
//               <label className="label">Email</label>
//               <div className="control">
//                 <input
//                   className="input"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="field">
//               <label className="label">Password</label>
//               <div className="control">
//                 <input
//                   className="input"
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="field">
//               <label className="label">Password</label>
//               <div className="control">
//                 <input
//                   className="input"
//                   type="text"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <button type="submit" className="button is-primary">Register</button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default RegistrationModal;



"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

 function AdminAddUser() {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState('');
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    phone:'',
    password:''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  const token = localStorage.getItem("admin");
  console.log('token',token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/admin/addUser', formData, {
        headers: {
          Authorization: token
        }
      });
      // Handle successful response here
      console.log(response.data);
      if (response.status === 200) {
        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: ''
        });
        // Close modal after successful registration
        setOpenModal(false);
      setOpenModal(false)
      }else{
        console.log('error',response.data);
      }
    } catch (error) {
      // Handle error here
      console.log('Error:', error);
    }
    // Reset form data
    // setFormData({
    //   name: '',
    //   email: '',
    //   phone: '',
    //   password: ''
    // });
  };
  

  function onCloseModal() {
    setOpenModal(false);
    // setEmail('');
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email"  />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com" name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Name" />
              </div>
              <TextInput id="name" type="text" name='name' value={formData.name} onChange={handleChange}  required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Password" />
              </div> 
              <TextInput id="password" type="password"  name='password' value={formData.password} onChange={handleChange} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label  value="Phone" />
              </div>
              <TextInput id="phone" type="tel" name='phone' value={formData.phone} onChange={handleChange} required />
            </div>
           
            <div className="w-full">
              <Button onClick={handleSubmit} >Create </Button>
            </div>
           
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AdminAddUser