const jwt = require('jsonwebtoken')
const users = require('../../models/auth/users')
const secret = process.env.JWT_SECRET
exports.userMiddlware = async (req, res, next)=>{
    const token = req.header('token')
    if(!token){
        return res.status(401).json({msg: "Authorization denied"})
    }
    try {
        const decoded = jwt.verify(token, secret)
        req.user = await users.findById(decoded.id)
        if(!decoded){
            return res.status(401).json({msg: "Token is invalid"})
        }
        next()
    } catch (error) {
        console.log("Token verification error ", error)
        return res.status(401).json({msg : "Token is not valid"})
    }

}