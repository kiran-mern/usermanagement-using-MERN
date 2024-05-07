const User=require('../models/user')
const bcrypt= require('bcrypt') 

module.exports={
    findOne:async(email)=>{
        const user=await User.findOne({email})
        return user;


    },
    dFinder:async(email)=>{
        const user=await User.findOne({_id:email})
        return user;


    },

    findUser:async()=>{
        try{
    
            const user= await User.find({})
            return user;
        }catch(error){
            console.log(error);
    
        }
    },
    findThatUser:async(data)=>{
        try{
    
            const user= await User.findOne({data})
            console.log(user,'two')
            return user;
        }catch(error){
            console.log(error);
    
        }
    },
    adminUser:async(data)=>{
        try{
    
            const user= await User.find({email:data})
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
    deleteUser:async(id)=>{
       try {
         const bin=await User.deleteOne({_id:id})
         console.log(bin);
         return bin
       } catch (error) {
        console.log(error);
        
       }

    }

}

