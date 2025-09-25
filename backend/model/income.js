const mongoose = require('mongoose');

const Income = new mongoose.Schema({
    userId : {
         type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    amount : {
        type : Number,
        required: true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Income',Income);