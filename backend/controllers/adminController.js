const Admin = require("../models/admin");
const { token } = require("../utils/jwt");
const json = require("body-parser");
const userH = require("../helpers/userHelper");
const adminH=require('../helpers/adminHelper.js')

module.exports = {
  adminLogin: async (req, res) => {
    const { email, password } = req.body;

    const adminData = await Admin.findOne({ email });

    if (!adminData) {
      res.status(400).json({ message: "no admin" });
    } else {
      const Email = adminData.email;
      const Password = adminData.password;

      if (Email == email) {
        if (Password == password) {
          const Token = token(Email,'admin');
          res.status(200).json({ message: "admin Loggedin",role:'admin', token: Token });
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
  deleteUser:async(req,res)=>{
    const id = req.body.deleteUserId;
    try{
      const inactive=await adminH.inActive(id)

      const users=await userH.findUser();

      res.status(200).json({message:'deleted',users:users})


    }catch(error){
      console.log(error);
    }



  },
  editUser:async(req,res)=>{
    const data=req.body
    const id=req.body.id
    const update=await adminH.updateuser(id,data)
    res.status(200).json({message:'updated successfully'})

  },
  addUser:async(req,res)=>{
    try{
        const{name,email,phone}=req.body
        const password=name.slice(0,3)+phone.slice(5)
        const existingUser = await userH.adminUser(email);
        const data={name,email,password,phone}
        if(existingUser.length>0){
            res.status(400).json({message:'user already exist'})
        }
        else{
            const user=await userH.createUser(data);
            res.status(200).json({message:'user added by admin'})
        }


    }
    catch(error){
        console.log(error);

    }
  },
  getUsers:async(req,res)=>{
     try{
      if(req.query.search){
        const result=await adminH.userSearch(req.query.search)
        return res.status(200).json({data:result})

      }

    }catch(error){
      res.status(200).json({error:'Internal error'})

    }
  }
};
