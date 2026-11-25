const express = require('express')
const student_router = express.Router()
const { createStudentController, getStudentsController, updateStudentController, deleteStudentController } = require('../controllers/student_controller')
const verifyToken = require('../middlewares/auth_middleware')

student_router.post('/create', verifyToken, createStudentController)
student_router.get('/get', verifyToken, getStudentsController)
student_router.put('/update/:id', verifyToken, updateStudentController)
student_router.delete('/delete/:id', verifyToken, deleteStudentController)

module.exports = student_router