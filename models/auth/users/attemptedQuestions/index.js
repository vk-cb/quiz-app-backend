const mongoose = require('mongoose')

const attemptedSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    attemptedQuestions : [],
    createdDate : {type: Date, default: Date.now},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('AttemptedQuestions', attemptedSchema, 'AttemptedQuestions')