const mongoose = require('mongoose')
const Super = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'super'},
    isActive : {type: Boolean, default: true},
})

module.exports = mongoose.model('Super', Super, "Super")