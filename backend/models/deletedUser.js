const mongoose=require ('mongoose')
const deletedUserSchema= new mongoose.Schema({
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
const DeletedUser= mongoose.model('DeletedUsers',deletedUserSchema)
module.exports=DeletedUser