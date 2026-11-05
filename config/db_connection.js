const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("MongoDB Connected Successfully!")
    } catch (error) {
        console.log("Error connecting MongoDB", error.message)
    }
}

module.exports = dbConnection