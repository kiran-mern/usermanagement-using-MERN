var express=require('express')
var router=express.Router();
var adminAuth=require('../middleware/adminAuth')
const{adminLogin,dashboard,deleteUser}=require('../controllers/adminController')

router.post('/login',adminLogin)
router.get('/dashboard',adminAuth,dashboard)
router.delete('/deleteuser',adminAuth,deleteUser)
module.exports=router;