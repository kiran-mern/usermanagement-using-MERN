const mongoose=require ('mongoose')
const bcrypt= require('bcrypt')
const userSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    phone:{
        type:String,
    },
    isAdmin:{
        type:String,
        default:'user'
    }
})
const User= mongoose.model('users',userSchema)
module.exports=User