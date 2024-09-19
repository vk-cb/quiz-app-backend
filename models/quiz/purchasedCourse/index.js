const mongoose = require('mongoose')

const purchasedQuizSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    adminId : {type:mongoose.Schema.Types.ObjectId, ref: "Admin"},
    userData: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdDate : {type: Date, default: Date.now},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isActive : {type: Boolean, default: true}
})

module.exports = mongoose.model('PurchasedQuiz', purchasedQuizSchema, 'PurchasedQuiz')