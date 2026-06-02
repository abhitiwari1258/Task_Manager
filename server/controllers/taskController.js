const Task = require('../models/task')

const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate} = req.body

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            user: req.user._id
        })

        res.status(201).json({ task })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getTasks = async (req, res) => {
    try {
        const task = await Task.find({
            user: req.user._id
        })

        res.json(task)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        // console.log(task.user.toString())
        // console.log(req.user._id.toString())

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.json(updated);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        await task.deleteOne();
        res.json({message:"Task deleted"});

    }catch(error){
        res.status(500).json({message:error.message});
    }

}
module.exports = { createTask, getTasks, updateTask, deleteTask }