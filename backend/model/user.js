const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name : {
        required: true,
        type:String,
        trim:true
    },
    email : {
        required: true,
        type:String,
        trim:true,
        unique:true
    },
    password :{
        type:String,
        required: true,
        trim:true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model('User',User);