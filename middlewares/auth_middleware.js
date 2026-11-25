var jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) { res.status(401).json({ status: 'error', message: "No token provided" }) }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
    } catch (error) {
        console.log('error', error)
        res.status(401).json({ status: 'failed', message: 'Unauthorized Access', error: error.message })
    }
}

module.exports = verifyToken