require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split (' ')[1]

    if(!token){
        return res.status(401).json ({message: 'Access Token Require'})

    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({message: 'Invalid Token'})

        req.roles = decoded.roles
        req.user = decoded.id

        next()
    }
    )
}

module.exports = authenticateToken