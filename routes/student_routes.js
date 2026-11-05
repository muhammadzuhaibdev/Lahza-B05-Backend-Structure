const express = require('express')
const student_router = express.Router()
const { createStudentController, getStudentsController, updateStudentController, deleteStudentController } = require('../controllers/student_controller')

student_router.post('/create', createStudentController)
student_router.get('/get', getStudentsController)
student_router.put('/update/:id', updateStudentController)
student_router.delete('/delete/:id', deleteStudentController)

module.exports = student_router