const Admin = require("../models/admin");
const { token } = require("../utils/jwt");
const json = require("body-parser");
const userH = require("../helpers/userHelper");
const adminH=require('../helpers/adminHelper.js')

module.exports = {
  adminLogin: async (req, res) => {
    const { email, password } = req.body;

    const adminData = await Admin.findOne({ email });
    console.log(adminData,'datatatatat');

    if (!adminData) {
      res.status(400).json({ message: "no admin" });
    } else {
      const Email = adminData.email;
      const Password = adminData.password;

      if (Email == email) {
        if (Password == password) {
          const Token = token(Email,'admin');
          console.log(Token,'www');
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
    console.log('seerr');
    const user = await userH.findUser();
    if (user) {
      res.status(200).json({ message: "user data fetched", users: user });
    } else {
      res.status(400).json({ message: "not fetched" });
    }
  },
  // deleteUser: async (req, res) => {
  //   console.log(req.body);
  //   const id = req.body.deleteUserId;
  //   const finder=await userH.dFinder(id)
  //   // console.log(finder,'e');
  //   if(finder){
  //       const softDelete=await adminH.userSoftDelete(finder)
  //   }
  //   const delUser = await userH.deleteUser(id);

  //   res.status(200).json({message:'added'})
  //   // console.log(delUser);
  //   // res.status(200).json({ message: "User deleted successfully" });
  // },
  deleteUser:async(req,res)=>{
    const id = req.body.deleteUserId;
    console.log(id,'id');
    try{
      const inactive=await adminH.inActive(id)
      console.log(inactive,'id');

      const users=await userH.findUser();
      console.log(users,'id');

      res.status(200).json({message:'deleted',users:users})


    }catch(error){
      console.log(error);
    }



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
        const{name,email,phone}=req.body
        const password=name.slice(0,3)+phone.slice(5)
        console.log(password,'ppppp');
        const existingUser = await userH.adminUser(email);
        const data={name,email,password,phone}
        if(existingUser.length>0){
            res.status(400).json({message:'user already exist'})
        }
        else{
            const user=await userH.createUser(data);
            console.log('admin_user',user);
            res.status(200).json({message:'user added by admin'})
        }


    }
    catch(error){
        console.log(error);
        // res.status(400).json({message:'internal error'})

    }
  },
  getUsers:async(req,res)=>{
     try{
      if(req.query.search){
        const result=await adminH.userSearch(req.query.search)
        // console.log(result,'lol');
        return res.status(200).json({data:result})

      }

    }catch(error){
      res.status(200).json({error:'Internal error'})

    }
  }
};
