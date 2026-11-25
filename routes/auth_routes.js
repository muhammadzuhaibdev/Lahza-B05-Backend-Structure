const express = require('express')
const authRouter = express.Router()
const { signupController, siginController } = require('../controllers/auth_controllers')

authRouter.post('/signup', signupController)
authRouter.post('/signin', siginController)

module.exports = authRouter