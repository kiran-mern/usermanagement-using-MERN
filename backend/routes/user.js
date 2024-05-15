var express=require('express')
var router=express.Router();
const {registerUser,loginUser,home,validate}=require('../controllers/userController')
const userAuth=require ('../middleware/userAuth')

router.post('/register',registerUser)
router.post('/user/login',loginUser)
router.get('/home',userAuth,home)
router.get('/valid',userAuth,validate)


module.exports=router;