const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`
        }
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        validate: {
            validator: (value) => {
                return value >= 0 && value <= 100;
            },
            message: (props) => `${props.value} is not a valid age!`
        }
    }
})

const StudentModel = mongoose.model('lahza-b04-db-students', studentSchema)
module.exports = StudentModel