const mongoose=require ('mongoose')
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        minLength:[3,'Name should contain atleast 4 characters'],
        maxLength:[20,'Name should not exceed 25 characters']
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
    role:{
        type:String,
        default:'user'
    }
})
const User= mongoose.model('users',userSchema)
module.exports=User