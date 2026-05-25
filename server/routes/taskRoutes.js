const express = require('express')
const protectRoutes = require('../middleware/authMiddleware')
const {createTask} = require('../controllers/taskController')
const router = express.Router()

router.post('/',protectRoutes,createTask)

module.exports = router;