require("dotenv").config();
const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

const app = express()

connectDB()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/',(req,res)=>{
    res.send("Api working")
})

app.listen(5001,()=>{
    console.log("Server running at port 5001")
})