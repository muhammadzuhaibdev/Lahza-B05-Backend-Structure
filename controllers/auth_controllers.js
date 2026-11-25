const AuthModel = require("../models/auth_model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const signupController = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        if (!password) { return res.status(404).json({ "msg": "Password is required!" }) }

        const hashedPassword = bcrypt.hashSync(password, 8)

        const userData = { userName, email, password: hashedPassword }

        const newUser = new AuthModel(userData)
        const dbUser = newUser.save()

        res.status(200).json({
            status: 'success',
            data: dbUser,
            message: 'User created Successfully',
        })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const siginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) { return res.json({ "msg": "email is required" }) }
        if (!password) { return res.json({ "msg": "password is required" }) }


        const findUser = await AuthModel.find({ email })

        if (findUser.length > 0) {
            const isPasswordMatched = await bcrypt.compare(password, findUser[0].password);
            if (!isPasswordMatched) { return res.json({ "msg": "password doesn't match!" }) }

            const userResult = {
                userName: findUser[0].userName,
                email: findUser[0].email,
                date: findUser[0].date,
                _id: findUser[0]._id
            }

            const token = await jwt.sign(userResult, process.env.SECRET_KEY, { expiresIn: '8h' });

            res.status(200).json({
                status: 'success',
                data: { ...userResult, token },
                message: 'User login Successfully',
            })
        } else {
            res.status(401).json({ status: 'error', message: 'User not found' })
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

module.exports = {
    signupController,
    siginController
}