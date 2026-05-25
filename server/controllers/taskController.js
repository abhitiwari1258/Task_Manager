const Task = require('../models/task')

const createTask = async(req,res)=>{
    try{
        const {title, description,priority} = req.body

        const task = await Task.create({
            title,
            description,
            priority,
            user: req.user._id
        })

        res.status(201).json({task})

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}

module.exports = {createTask}