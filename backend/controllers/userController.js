const User = require("../models/user");
const bcrypt=require('bcrypt')
const { token } = require("../utils/jwt");
const userH= require("../helpers/userHelper");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const datas = req.body;
      console.log(datas);
      const user = await userH.findUser(email);

      if (user) {
        res.status(400).json({ error: "User already exists" });
      } else {
        const newUser = await userH.createUser(datas);

        const Token = token(email);
        res.status(200).json({ message: "creating", token: "Token" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  loginUser: async (req, res) => {
    try{
      const{email,password}=req.body
      const user=await userH.findUser(email)

      if(!user){
        res.status(400).json({messsage:'invalid user'})
      }else{
        
        const match=await bcrypt.compare(password,user.password)
        if(match){
          const Token=token(email)
          res.status(200).json({message:'user loggedIn',token:'Token'})
        }else{
          res.status(400).json({message:'Invalid Password'})
        }
      }
    }
    catch(error){
      res.status(404).json({message:'invalid Userid'})

    }
  },
};
