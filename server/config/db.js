const mongoose = require('mongoose')

const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfull")
    }catch(error){
        console.log("Error in db", error)
    }
}

module.exports = connectToDB