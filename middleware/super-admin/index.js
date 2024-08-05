const jwt = require('jsonwebtoken')
const superAdmin = require('../../models/auth/super-admin')
const secret = process.env.JWT_SECRET
exports.superAdminMiddlware = async (req, res, next)=>{
    const token = req.header('token')
    if(!token){
        return res.status(401).json({msg: "Authorization denied"})
    }
    try {
        const decoded = jwt.verify(token, secret)
        req.user = await superAdmin.findById(decoded.id)
        if(!decoded){
            return res.status(401).json({msg: "Token is invalid"})
        }
        next()
    } catch (error) {
        console.log("Token verification error ", error)
        return res.status(401).json({msg : "Token is not valid"})
    }

}