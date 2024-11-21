const mongoose = require('mongoose');

const PaymentModal = new mongoose.Schema({
    fullName: {type:String,required:true},
    email: {type:String, required:true},
    amount: {type:Number, required:true},
    paymentMethod: {type:String, required:true},
    // transactionId: {type:String, required:true},
    status: {type:String, default: 'pending'},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  updatedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model("Payment", PaymentModal, "Payment");