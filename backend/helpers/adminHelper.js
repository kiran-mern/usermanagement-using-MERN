const Admin = require("../models/admin");
const DeletedUser = require("../models/deletedUser");
const User = require("../models/user");

module.exports = {
  userSoftDelete: async (deletedUser) => {
    try {
        console.log(deletedUser,'acdcd');
      const { email, phone } = deletedUser;
      const delUser = await DeletedUser.create({
        email: email,
        phone: phone,
      });
      return delUser
    } catch(error) {
        console.log(error);
    }
  },
  updateuser:async(userId,data)=>{
    try{
        const {name,phone}=data
        const update=await User.updateOne({
            _id:userId},
            {$set:{
                name:name,
                phone:phone

            }
        },{new:true})
        console.log(update,'update');
        return update
    }
    catch{(error)
        console.log(error);

    }

  }
};
