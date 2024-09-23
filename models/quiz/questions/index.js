const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    title : {type: String, required : true},
    type : {type: Number},
    category : {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    categoryTitle : {type: String},
    typeTitle: {type: String},
    options : [{type: String}],
    answer : [{type: String}],
    admin : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
    isActive : {type: Boolean, default: true},
    createdDate : {type: Date, default: Date.now},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
    updatedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'}
})

module.exports = mongoose.model('questions', QuestionSchema, 'questions')