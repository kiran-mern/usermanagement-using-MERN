const mongoose=require('mongoose')
const AdminSchema=new mongoose.Schema({

    email:{
        type:String
    },
    password:{
        type:String
    },
    // isAdmin:{
    //     type:String,
    //     default:'user'
    // }
})
const Admin=mongoose.model('admin',AdminSchema)
module.exports=Admin