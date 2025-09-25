const mongoose = require('mongoose');

const Saving = new mongoose.Schema({
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
}, { timestamps: true })

module.exports = mongoose.model('Saving',Saving);