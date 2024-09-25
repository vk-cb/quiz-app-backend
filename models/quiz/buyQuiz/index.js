const mongoose = require('mongoose')

const buyQuizSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    adminId : {type:mongoose.Schema.Types.ObjectId, ref: "Admin"},
    purchaseAmount : {type: Number, required: true},
    createdDate : {type: Date, default: Date.now},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isActive : {type: Boolean, default: true}
})

module.exports = mongoose.model('buyQuiz', buyQuizSchema, 'buyQuiz')