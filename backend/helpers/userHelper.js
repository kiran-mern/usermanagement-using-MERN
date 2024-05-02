const User=require('../models/user')
const bcrypt= require('bcrypt') 

module.exports={

    findUser:async()=>{
        try{
    
            const user= await User.find({})
            return user;
        }catch(error){
            console.log(error);
    
        }
    },
    createUser:async(data)=>{
        try{
            const{name,email,password,phone}=data
            const saltRounds=10
            const hashed=await bcrypt.hash(password,saltRounds)
            const newUser=await User.create({
                name:name,
                email:email,
                password:hashed,
                phone:phone
            })
            console.log(newUser);
            return newUser


        }catch(error){
            console.log(error)
            throw error

        }
    },

}

