var express=require('express')
var router=express.Router();
const {registerUser,loginUser,home}=require('../controllers/userController')


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/home',home)

module.exports=router;