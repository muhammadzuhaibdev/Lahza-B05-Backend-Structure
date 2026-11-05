require('dotenv').config()
const express = require('express')
const app = express()
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const dbConnection = require('./config/db_connection')
const student_router = require('./routes/student_routes');

const PORT = 3000 || 8000

app.use(express.json())

dbConnection()

app.use('/students', student_router)


app.get('/', (req, res) => {
    res.json({
        message: "Server is up and running!"
    })
})

app.listen(PORT, () => {
    console.log("Server is running at port ", PORT)
})