var express=require('express')
var router=express.Router();
var adminAuth=require('../middleware/adminAuth')
const{adminLogin,dashboard}=require('../controllers/adminController')

router.post('/login',adminLogin)
router.get('/dashboard',adminAuth,dashboard)

module.exports=router;