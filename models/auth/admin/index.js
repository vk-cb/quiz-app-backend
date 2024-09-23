const mongoose = require('mongoose')

const AdminModal = new mongoose.Schema({
    firstName : {type: String , required : true},
    lastName : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    role : {type: String, default: 'admin'},
    quizes : {type : Array, default:[]},
    instructorDetail : {
        bio : {
            about : {type:String},
            shortDesTitle :{type:String},
            shortDes : {type:String},
            quizDescTitle: [{title:{type:String}, desc: {type:String}}],
            quizDes : {type:String},
        },
        default : {}
    },
    // isLocked : {type: Boolean, default: false},
    // lockUntil : {type: Date},
    // loginAttempts : {type: Number, default: 0},
    // resetPasswordToken : {type: String},
    // resetPasswordExpires : {type: Date},
    // lastLoginAttempted : {type: Date},
    // lastFailedLoginAttempted : {type: Date},
    // lastFailedLoginAttempts : {type: Number, default: 0},
    // lastFailedLoginIP : {type: String},
    // lastFailedLoginLocation : {type: String},
    isActive : {type: Boolean, default: false},
    lastLogin : {type: Date, default: Date.now},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
    updatedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'}

})

module.exports = mongoose.model('Admin', AdminModal, "Admin")