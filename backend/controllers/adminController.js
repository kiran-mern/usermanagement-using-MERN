const Admin = require("../models/admin");
const { token } = require("../utils/jwt");
const json = require("body-parser");
const userH = require("../helpers/userHelper");
const adminH=require('../helpers/adminHelper.js')

module.exports = {
  adminLogin: async (req, res) => {
    const { email, password } = req.body;

    const adminData = await Admin.findOne({ email });
    console.log(adminData);

    if (!adminData) {
      res.status(400).json({ message: "no admin" });
    } else {
      const Email = adminData.email;
      const Password = adminData.password;

      if (Email == email) {
        if (Password == password) {
          const Token = token(Email);
          res.status(200).json({ message: "admin Loggedin", token: Token });
        } else {
          res.status(400).json({ message: "Invalid Password" });
        }
      } else {
        res.status(400).json({ message: "Invalid Email" });
      }
    }
  },
  dashboard: async (req, res) => {
    const user = await userH.findUser();
    if (user) {
      res.status(200).json({ message: "user data fetched", users: user });
    } else {
      res.status(400).json({ message: "not fetched" });
    }
  },
  deleteUser: async (req, res) => {
    console.log(req.body);
    const id = req.body.deleteUserId;
    const finder=await userH.dFinder(id)
    // console.log(finder,'e');
    if(finder){
        const softDelete=await adminH.userSoftDelete(finder)
    }
    const delUser = await userH.deleteUser(id);

    res.status(200).json({message:'added'})
    // console.log(delUser);
    // res.status(200).json({ message: "User deleted successfully" });
  },
  editUser:async(req,res)=>{
    console.log(req.body,'kkk')
    const data=req.body
    const id=req.body.id
    const update=await adminH.updateuser(id,data)
    res.status(200).json({message:'updated successfully'})

  },
  addUser:async(req,res)=>{
    try{
        const data=req.body
        const password=data.name.slice(0,3)+data.phone.slice(5)
        console.log(password,'ppppp');
        const existingUser = await userH.adminUser(data.email);
        if(existingUser.length>0){
            res.status(400).json({message:'user already exist'})
        }
        else{
            const user=await adminH.addUserByAdmin(data);
            console.log('admin_user',user);
            res.status(200).json({message:'user added by admin'})
        }


    }
    catch(error){
        console.log(error);
        // res.status(400).json({message:'internal error'})

    }
  }
};
