const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8","1.1.1.1"])

require("dotenv").config();
const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

const app = express()

connectDB()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/task', taskRoutes)

app.get('/',(req,res)=>{
    res.send("Api working")
})

app.listen(5001,()=>{
    console.log("Server running at port 5001")
})