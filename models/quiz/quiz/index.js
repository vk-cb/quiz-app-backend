
const Admin = require('../../../models/quiz/category/index')
const mongoose = require('mongoose')
const QuizCategory = new mongoose.Schema({
    category : {type: String, required : true},
    admin : ref(Admin),
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
    updatedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'}
})