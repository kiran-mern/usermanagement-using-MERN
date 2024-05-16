const User = require("../models/user");
const bcrypt=require('bcrypt')
const { token } = require("../utils/jwt");
const userH= require("../helpers/userHelper");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const pswdLength=Object.values(password).length
      const datas = req.body;
      const user = await userH.findOne(email);

      if (user) {
        res.status(400).json({ error: "User already exists" });
      } else {
        if(pswdLength>=6){

          const newUser = await userH.createUser(datas);
  
          const Token = token(email);
          res.status(200).json({ message: "creating", token:Token});
        }else{
          res.status(400).json({ message:'Password should contain atleast 6 character' });
        }
      }
    } catch (error) {
      const firstErrorKey = Object.keys(error.errors)[0]; 
      const validationMessage = error.errors[firstErrorKey].message;
      res.status(400).json({ error: validationMessage });
    }
  },
  loginUser: async (req, res) => {
    try{
      const{email,password}=req.body
      const user=await userH.findOne(email)
      console.log('one',user);

      if(!user){
        res.status(400).json({messsage:'invalid user'})
      }else{
        
        const match=await bcrypt.compare(password,user.password)
        if(match){
          const Token=token(email,user.role)
          console.log(Token,'an');
          res.status(200).json({message:'user loggedIn',role:'user',token:Token})
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
      console.log(req.user,'look');
      let email=req.user.email

      if(req.user.email && req.user.role==='user'){
        const user=await userH.findThatUser(email)
        // console.log(user,'kaanuah');
        res.status(200).json({message:'done',users:user.name})
      }
    })

  },
  validate:async(req,res)=>{
 

        res.status(200).json({message:'done'})
      
    }
  
};
