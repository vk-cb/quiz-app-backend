const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    title : {type: String, required : true},
    admin : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
    isActive : {type: Boolean, default: true},
    createdDate : {type: Date, default: Date.now},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
    updatedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'}
})

module.exports = mongoose.model('Category', CategorySchema, 'Category')