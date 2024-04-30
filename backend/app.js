const express=require('express')
const bodyParser = require("body-parser")
const app= express()
const cors=require('cors')
const useRouter=require('./routes/user')
require('dotenv').config({path:'./config/.env'})
require("./config/dbconnection");

app.listen(3000,()=>{
    console.log('db connected');
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',useRouter)