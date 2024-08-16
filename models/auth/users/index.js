const mongoose = require("mongoose");

const UserModal = new mongoose.Schema({
  firstName: {type: String,required: true,},
  lastName: {type: String,required: true,},
  email: {type: String,required: true,unique: true,},
  password: {type: String,required: true,},
  role: {type: String,default: "user",},
  isActive : {type: Boolean, default: true},
  lastLogin : {type: Date, default: Date.now},
  purchasedQuiz: [],
  createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  updatedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model("User", UserModal, "User");