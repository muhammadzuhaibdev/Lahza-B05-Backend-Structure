const StudentModel = require("../models/student_model")

const createStudentController = async (req, res) => {
    try {
        const studentData = req.body
        const newStudent = new StudentModel(studentData)
        const dbStudent = await newStudent.save()

        res.status(200).json({
            status: 'success',
            data: dbStudent,
            message: "Create Student API Called!"
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: [],
            message: error.message
        })
    }
}

const getStudentsController = async (req, res) => {
    try {
        const studentsData = await StudentModel.find()


        res.status(200).json({
            status: 'success',
            data: studentsData,
            message: "Students Data Fetched Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: [],
            message: error.message
        })
    }
}

const updateStudentController = async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body

        const updatedStudent = await StudentModel.findByIdAndUpdate(id, newData, { new: true })

        res.status(200).json({
            status: 'success',
            data: updatedStudent,
            message: "Update Student API Called!"
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: [],
            message: error.message
        })
    }
}

const deleteStudentController = async (req, res) => {
    try {
        const { id } = req.params
        await StudentModel.findByIdAndDelete(id)

        res.status(200).json({
            status: 'success',
            message: "Delete Student API Called!"
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: [],
            message: error.message
        })
    }
}

module.exports = {
    createStudentController,
    getStudentsController,
    updateStudentController,
    deleteStudentController
}