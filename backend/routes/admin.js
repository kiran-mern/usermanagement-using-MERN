var express=require('express')
var router=express.Router();
const{adminLogin,dashboard}=require('../controllers/adminController')

router.post('/login',adminLogin)
router.get('/dashboard',dashboard)

module.exports=router;