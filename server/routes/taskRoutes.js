const express = require('express')
const protectRoutes = require('../middleware/authMiddleware')
const {createTask, getTasks, updateTask, deleteTask} = require('../controllers/taskController')
const router = express.Router()

router.post('/',protectRoutes,createTask)
router.get('/',protectRoutes,getTasks)
router.put('/:id',protectRoutes,updateTask)
router.delete('/:id',protectRoutes,deleteTask)

module.exports = router;