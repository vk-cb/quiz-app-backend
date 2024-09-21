const User = require("../../models/auth/users");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { status } = require("../../utils/statuscodes");
const secret = process.env.JWT_SECRET;
 exports.userSignupController = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    switch (true) {
      case !firstName:
        return res.status(400).json({ msg: "Please enter first name" });
      case !lastName:
        return res.status(400).json({ msg: "Please enter last name" });
      case !email:
        return res.status(400).json({ msg: "Please enter email" });
      case !password:
        return res.status(400).json({ msg: "Please enter password" });
    }
    try {
        const findUser = await User.findOne({email})
        if(findUser){return res.status(400).json({msg : "Email already exists please use another email"})}
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User( {
            firstName, lastName, email, password:hashedPassword
        })
        await newUser.save()
        return res.status(201).json({msg: "User registered successfully", data: newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg : "Server Error"})
    }
  };

  exports.userLoginController = async (req, res) =>{
    const {email, password} = req.body;
    if(!email ||!password){
        return res.status(400).json({msg : "Please provide both email and password"})
    }
    try {
        const findUser = await User.findOne({email})
        if(!findUser){
            return res.status(404).json({msg : "User not found please try another email"})
        }
        const isMatch = await bcrypt.compare(password, findUser.password)
        if(!isMatch){
            return res.status(400).json({msg : "Invalid password"})
        }
        findUser.lastLogin = Date.now();
        await findUser.save();

        const payload = {
            id: findUser._id,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            email: findUser.email,
            role: findUser.role,
            purchasedQuiz: findUser.purchasedQuiz,
            isActive: findUser.isActive,
            lastLogin : findUser.lastLogin,
            createdBy: findUser.createdBy,
            updatedBy: findUser.updatedBy,
        }
        const token = jwt.sign(payload, secret)
        return res.status(status.success).json({msg: "User Login Successfully", data: payload, status: status.success, token})
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "Server Error"})
    }
  }

