var express=require('express')
var router=express.Router();
const {registerUser,loginUser,home,validate}=require('../controllers/userController')


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/home',home)
router.get('/valid',validate)


module.exports=router;