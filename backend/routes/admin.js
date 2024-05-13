var express=require('express')
var router=express.Router();
var adminAuth=require('../middleware/adminAuth')
const{adminLogin,dashboard,deleteUser,editUser,addUser,getUsers}=require('../controllers/adminController')

router.post('/login',adminLogin)
router.get('/dashboard',adminAuth,dashboard)
router.delete('/deleteuser',adminAuth,deleteUser)
router.put('/editUser',adminAuth,editUser)
router.post('/addUser',adminAuth,addUser)
router.get('/search',adminAuth,getUsers)
module.exports=router;