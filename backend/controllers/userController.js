const User = require("../models/user");
const bcrypt=require('bcrypt')
const { token } = require("../utils/jwt");
const userH= require("../helpers/userHelper");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const datas = req.body;
      const user = await userH.findOne(email);

      if (user) {
        res.status(400).json({ error: "User already exists" });
      } else {
        const newUser = await userH.createUser(datas);

        const Token = token(email);
        res.status(200).json({ message: "creating", token:Token});
      }
    } catch (error) {
      console.log(error);
    }
  },
  loginUser: async (req, res) => {
    try{
      const{email,password}=req.body
      const user=await userH.findOne(email)

      if(!user){
        res.status(400).json({messsage:'invalid user'})
      }else{
        
        const match=await bcrypt.compare(password,user.password)
        if(match){
          const Token=token(email)
          // console.log(Token,'an');
          res.status(200).json({message:'user loggedIn',token:Token})
        }else{
          res.status(400).json({message:'Invalid Password'})
        }
      }
    }
    catch(error){
      res.status(404).json({message:'invalid Userid'})

    }
  },
  home:async(req,res)=>{
    const token=req.headers.authorization
    // console.log('kk',token);

    jwt.verify(token,process.env.secret_key, async(err,user)=>{
      if(err) return res.sendStatus(403)

      req.user=user
      console.log(req.user);

      if(req.user){
        const user=await userH.findUser(req.user.email)
      }
    })

  }
};
