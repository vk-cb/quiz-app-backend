const jwt = require("jsonwebtoken")
const Admin = require('../../models/auth/admin/index')
const secret = process.env.JWT_SECRET
exports.adminmiddleware = async(req,res, next) =>{
    const token = req.header('token')
    if(!token){
      return res.status(401).json({msg : "please provide token"})
    }
    try {
        const decoded = jwt.verify(token,secret)
        req.admin = await Admin.findById(decoded.id)
        if(!req.user){
           return res.status(401).json({msg: "Unauthorized entry"})
        }
        next()
        
    } catch (error) {
        console.error("Token verification error:", error);
       return res.status(401).json({ msg: "Token is not valid" });
    }
}