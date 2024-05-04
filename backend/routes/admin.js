var express=require('express')
var router=express.Router();
var adminAuth=require('../middleware/adminAuth')
const{adminLogin,dashboard,deleteUser,editUser}=require('../controllers/adminController')

router.post('/login',adminLogin)
router.get('/dashboard',adminAuth,dashboard)
router.delete('/deleteuser',adminAuth,deleteUser)
router.put('/editUser',adminAuth,editUser)
module.exports=router;