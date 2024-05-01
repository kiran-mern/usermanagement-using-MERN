const mongoose=require('mongoose')
const AdminSchema=new mongoose.Schema({

    email:{
        type:String
    },
    password:{
        type:String
    }
})
const Admin=mongoose.model('admin',AdminSchema)
module.exports=Admin